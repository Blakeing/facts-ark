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

  it('toggles todo successfully with success toast', async () => {
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

    const promise = toggleTodo('1')
    expect(isPending.value).toBe(true)

    await promise

    expect(todoApi.toggleTodoStatus).toHaveBeenCalledOnce()
    expect(todoApi.toggleTodoStatus).toHaveBeenCalledWith('1')
    expect(mockToast.success).toHaveBeenCalledOnce()
    expect(mockToast.success).toHaveBeenCalledWith({
      title: 'Todo updated',
      description: 'Status toggled successfully.',
    })
    expect(isPending.value).toBe(false)

    unmount()
  })

  it('shows error toast when mutation fails', async () => {
    vi.spyOn(todoApi, 'toggleTodoStatus').mockRejectedValue(new Error('Network error'))

    const [{ toggleTodo }, unmount] = withSetup(() => useToggleTodo())

    await expect(toggleTodo('1')).rejects.toThrow('Network error')

    expect(mockToast.error).toHaveBeenCalledOnce()
    expect(mockToast.error).toHaveBeenCalledWith({
      title: 'Failed to update todo',
      description: 'An error occurred while toggling the todo status.',
    })

    unmount()
  })

  it('handles error state correctly', async () => {
    vi.spyOn(todoApi, 'toggleTodoStatus').mockRejectedValue(new Error('Network error'))

    const [{ toggleTodo, isPending }, unmount] = withSetup(() => useToggleTodo())

    await expect(toggleTodo('1')).rejects.toThrow()

    expect(isPending.value).toBe(false)

    unmount()
  })
})
