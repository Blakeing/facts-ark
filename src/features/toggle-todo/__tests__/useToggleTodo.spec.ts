import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'

import { useToggleTodo } from '../model/useToggleTodo'
import * as todoApi from '@/entities/todo'
import { TodoStatus, type Todo } from '@/entities/todo'
import { withSetup } from '@/__tests__/helpers/withSetup'

const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
}

vi.mock('@/shared/ui/toast', () => ({
  useToast: () => ({ toast: mockToast }),
}))

describe('useToggleTodo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-01-01T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('toggles todo successfully (silent - no success toast)', async () => {
    const toggledTodo: Todo = {
      id: '1',
      title: 'Test',
      status: TodoStatus.COMPLETED,
      completedAt: '2025-01-01T00:00:00.000Z',
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    }

    vi.spyOn(todoApi, 'toggleTodoStatus').mockResolvedValue({ data: toggledTodo, status: 200 })

    const [{ toggleTodo, isPending }, unmount] = withSetup(() => useToggleTodo())

    const promise = toggleTodo('1', TodoStatus.PENDING)
    expect(isPending.value).toBe(true)

    await promise

    expect(todoApi.toggleTodoStatus).toHaveBeenCalledTimes(1)
    expect(todoApi.toggleTodoStatus).toHaveBeenCalledExactlyOnceWith('1', TodoStatus.PENDING)
    // Silent optimistic - no success toast
    expect(mockToast.success).not.toHaveBeenCalled()
    expect(isPending.value).toBe(false)

    unmount()
  })

  it('shows error toast when mutation fails (with rollback)', async () => {
    vi.spyOn(todoApi, 'toggleTodoStatus').mockRejectedValue(new Error('Network error'))

    const [{ toggleTodo }, unmount] = withSetup(() => useToggleTodo())

    await expect(toggleTodo('1', TodoStatus.PENDING)).rejects.toThrow('Network error')

    expect(mockToast.error).toHaveBeenCalledTimes(1)
    expect(mockToast.error).toHaveBeenCalledExactlyOnceWith('Failed to update todo', {
      description: 'Changes have been reverted. Please try again.',
    })

    unmount()
  })

  it('handles error state correctly', async () => {
    vi.spyOn(todoApi, 'toggleTodoStatus').mockRejectedValue(new Error('Network error'))

    const [{ toggleTodo, isPending }, unmount] = withSetup(() => useToggleTodo())

    await expect(toggleTodo('1', TodoStatus.PENDING)).rejects.toThrow()

    expect(isPending.value).toBe(false)

    unmount()
  })
})
