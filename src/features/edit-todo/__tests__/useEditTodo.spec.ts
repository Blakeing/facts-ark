import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useEditTodo } from '../model/useEditTodo'
import * as todoApi from '@/entities/todo'
import { TodoStatus, type Todo } from '@/entities/todo'
import { withSetup } from '@/__tests__/helpers/withSetup'

const mockToast = vi.hoisted(() => ({
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  promise: vi.fn((promise, { success, error }) => {
    promise.then(() => success()).catch(() => error())
    return promise
  }),
}))

vi.mock('@/shared/ui/toast', () => ({
  useToast: () => ({ toast: mockToast }),
  toast: mockToast,
}))

describe('useEditTodo', () => {
  const originalTodo: Todo = {
    id: '1',
    title: 'Original title',
    description: 'Original description',
    status: TodoStatus.PENDING,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes form with existing todo data', () => {
    const [{ form }, unmount] = withSetup(() => useEditTodo(originalTodo))

    expect(form.values.title).toBe(originalTodo.title)
    expect(form.values.description).toBe(originalTodo.description)

    unmount()
  })

  it('updates todo successfully and shows success toast', async () => {
    const updatedTodo: Todo = {
      ...originalTodo,
      title: 'Updated title',
      updatedAt: '2025-01-02T00:00:00.000Z',
    }

    vi.spyOn(todoApi, 'updateTodo').mockResolvedValue({ data: updatedTodo, status: 200 })

    const [{ form, handleSubmit }, unmount] = withSetup(() => useEditTodo(originalTodo))
    form.setFieldValue('title', 'Updated title')

    await handleSubmit()

    expect(todoApi.updateTodo).toHaveBeenCalledTimes(1)
    expect(todoApi.updateTodo).toHaveBeenCalledWith('1', {
      title: 'Updated title',
    })

    // With loadingToast, toast.promise is called instead of toast.success
    expect(mockToast.promise).toHaveBeenCalledTimes(1)
    expect(mockToast.promise).toHaveBeenCalledWith(
      expect.any(Promise),
      expect.objectContaining({
        loading: 'Saving changes...',
        success: expect.any(Function),
        error: expect.any(Function),
      }),
    )

    unmount()
  })

  it('does not submit when form is invalid', async () => {
    const updateTodoSpy = vi.spyOn(todoApi, 'updateTodo')
    const [{ handleSubmit, form }, unmount] = withSetup(() => useEditTodo(originalTodo))
    // Set invalid title (empty after trim)
    form.setFieldValue('title', '   ')

    await handleSubmit().catch(() => {})

    expect(updateTodoSpy).not.toHaveBeenCalled()

    unmount()
  })

  it('shows error toast when API call fails', async () => {
    vi.spyOn(todoApi, 'updateTodo').mockRejectedValue(new Error('Network error'))

    const [{ form, handleSubmit }, unmount] = withSetup(() => useEditTodo(originalTodo))
    form.setFieldValue('title', 'Updated title')

    await expect(handleSubmit()).rejects.toThrow('Network error')

    // With loadingToast, toast.promise is called (which internally calls error callback)
    expect(mockToast.promise).toHaveBeenCalledTimes(1)
    expect(mockToast.promise).toHaveBeenCalledWith(
      expect.any(Promise),
      expect.objectContaining({
        loading: 'Saving changes...',
        success: expect.any(Function),
        error: expect.any(Function),
      }),
    )

    unmount()
  })
})
