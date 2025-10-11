import { beforeEach, describe, expect, it, vi } from 'vitest'
import { ref } from 'vue'

import { useTodos, useTodoById, useTodoStats, todoQueriesKeys } from '../todoQueries'
import * as todoApi from '../todoApi'

vi.mock('../todoApi', () => ({
  fetchTodos: vi.fn(),
  fetchTodoById: vi.fn(),
  fetchTodoStats: vi.fn(),
}))

vi.mock('@pinia/colada', async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    useQuery: vi.fn((options) => {
      return {
        data: ref(undefined),
        status: ref('idle'),
        error: ref(null),
        refresh: vi.fn(),
        options,
      }
    }),
  }
})

describe('todoQueries', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('useTodos configures query with list key', async () => {
    vi.mocked(todoApi.fetchTodos).mockResolvedValue({ data: [], status: 200 })

    const query = useTodos()
    const [key] = query.options.key()
    await query.options.query()

    expect(key).toEqual(todoQueriesKeys.list)
    expect(todoApi.fetchTodos).toHaveBeenCalled()
  })

  it('useTodoById configures query with detail key', async () => {
    vi.mocked(todoApi.fetchTodoById).mockResolvedValue({ data: { id: '1' }, status: 200 } as any)

    const query = useTodoById(ref('1'))
    const [key] = query.options.key()
    await query.options.query()

    expect(key).toBe(todoQueriesKeys.detail('1'))
    expect(todoApi.fetchTodoById).toHaveBeenCalledWith('1')
  })

  it('useTodoStats configures query with stats key', async () => {
    vi.mocked(todoApi.fetchTodoStats).mockResolvedValue({
      data: { total: 1, completed: 0, pending: 1 },
      status: 200,
    })

    const query = useTodoStats()
    const [key] = query.options.key()
    await query.options.query()

    expect(key).toEqual(todoQueriesKeys.stats)
    expect(todoApi.fetchTodoStats).toHaveBeenCalled()
  })
})
