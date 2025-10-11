import { beforeAll, afterAll, beforeEach } from 'vitest'
import {
  startTestServer,
  stopTestServer,
  resetTestDb,
  getTestApiUrl,
  TEST_API_PORT,
} from './helpers/testServer'

beforeAll(async () => {
  await startTestServer(TEST_API_PORT)
  process.env.VITE_API_BASE_URL = getTestApiUrl(TEST_API_PORT)
})

beforeEach(async () => {
  await resetTestDb()
})

afterAll(async () => {
  await stopTestServer()
})
