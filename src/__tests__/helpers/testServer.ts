import { spawn, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { mkdirSync, copyFileSync, existsSync, unlinkSync, writeFileSync } from 'node:fs'
import path from 'node:path'

const DEFAULT_TEST_PORT = Number(process.env.TEST_API_PORT ?? 3002)
const ROOT_DIR = process.cwd()
const FIXTURE_PATH = path.resolve(ROOT_DIR, 'tests/fixtures/todos.json')
const TMP_DIR = path.resolve(ROOT_DIR, 'tests/tmp')
const DB_PATH = path.join(TMP_DIR, 'db.test.json')

let serverProcess: ChildProcessWithoutNullStreams | null = null
let activePort = DEFAULT_TEST_PORT

function ensureTempDb() {
  mkdirSync(TMP_DIR, { recursive: true })
  copyFileSync(FIXTURE_PATH, DB_PATH)
}

async function waitForServer(url: string, timeoutMs = 5000) {
  const start = Date.now()

  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(`${url}/todos`)
      if (response.ok) return
    } catch {
      // Ignore errors while server boots
    }
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  throw new Error(`json-server failed to start within ${timeoutMs}ms`)
}

export function getTestDbPath() {
  return DB_PATH
}

export function getTestApiUrl(port = activePort) {
  return `http://127.0.0.1:${port}`
}

export async function startTestServer(port = DEFAULT_TEST_PORT) {
  if (serverProcess) {
    await stopTestServer()
  }

  if (!existsSync(FIXTURE_PATH)) {
    throw new Error(`Missing fixture file at ${FIXTURE_PATH}. Run tests/fixtures setup first.`)
  }

  ensureTempDb()

  const bin = path.resolve(
    ROOT_DIR,
    'node_modules',
    '.bin',
    process.platform === 'win32' ? 'json-server.cmd' : 'json-server',
  )

  serverProcess = spawn(bin, [DB_PATH, '--port', String(port), '--host', '127.0.0.1'], {
    cwd: ROOT_DIR,
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  serverProcess.on('exit', (code, signal) => {
    if (code !== 0 && signal === null) {
      console.warn(`json-server exited unexpectedly with code ${code}`)
    }
    serverProcess = null
  })

  activePort = port
  await waitForServer(getTestApiUrl(port))
}

export async function stopTestServer() {
  if (!serverProcess) return

  await new Promise<void>((resolve) => {
    if (!serverProcess) {
      resolve()
      return
    }

    serverProcess.once('exit', () => resolve())

    serverProcess.kill('SIGTERM')
  })

  serverProcess = null

  if (existsSync(DB_PATH)) {
    try {
      unlinkSync(DB_PATH)
    } catch (error) {
      console.warn('Failed to remove temporary test database', error)
    }
  }
}

export async function resetTestDb() {
  if (!existsSync(FIXTURE_PATH)) {
    throw new Error('Todo fixture missing. Ensure tests/fixtures/todos.json exists.')
  }

  ensureTempDb()
}

export async function writeTestDb(data: unknown) {
  mkdirSync(TMP_DIR, { recursive: true })
  writeFileSync(DB_PATH, JSON.stringify(data, null, 2))
}

export const TEST_API_PORT = DEFAULT_TEST_PORT
