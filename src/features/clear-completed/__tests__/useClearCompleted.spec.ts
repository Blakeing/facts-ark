import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useClearCompleted } from '../model/useClearCompleted'
import * as todoApi from '@/entities/todo/api/todoApi'
import { withSetup } from '@/__tests__/helpers/withSetup'

const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
}

vi.mock('@/shared/ui/toast', () => ({
  useToast: () => ({ toast: mockToast }),
}))

describe('useClearCompleted', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('clears completed todos successfully with success toast', async () => {
    vi.spyOn(todoApi, 'clearCompletedTodos').mockResolvedValue({ data: 2, status: 200 })

    const [{ clearCompleted, isPending }, unmount] = withSetup(() => useClearCompleted())

    const promise = clearCompleted()
    expect(isPending.value).toBe(true)

    await promise

    expect(todoApi.clearCompletedTodos).toHaveBeenCalled()
    expect(mockToast.success).toHaveBeenCalledWithExactlyOnceWith({
      title: 'Completed todos cleared',
      description: '2 completed todos removed.',
    })
    expect(isPending.value).toBe(false)

    unmount()
  })

  it('shows error toast when clearing fails', async () => {
    vi.spyOn(todoApi, 'clearCompletedTodos').mockRejectedValue(new Error('Network error'))

    const [{ clearCompleted }, unmount] = withSetup(() => useClearCompleted())

    await expect(clearCompleted()).rejects.toThrow('Network error')

    expect(mockToast.error).toHaveBeenCalledExactlyOnceWith({
      title: 'Failed to clear todos',
      description: 'Network error',
    })

    unmount()
  })

  it('exposes error state when mutation fails', async () => {
    const networkError = new Error('Network error')
    vi.spyOn(todoApi, 'clearCompletedTodos').mockRejectedValue(networkError)

    const [{ clearCompleted, isError, error }, unmount] = withSetup(() => useClearCompleted())

    await expect(clearCompleted()).rejects.toThrow()

    expect(isError.value).toBe(true)
    expect(error.value).toBe(networkError)

    unmount()
  })
})
