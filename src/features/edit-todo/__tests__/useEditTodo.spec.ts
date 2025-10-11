import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useEditTodo } from '../model/useEditTodo'
import * as todoApi from '@/entities/todo/api/todoApi'
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
    Object.defineProperty(form.meta.value, 'valid', { value: true, writable: true })
    form.setFieldValue('title', 'Updated title')

    await handleSubmit()

    expect(todoApi.updateTodo).toHaveBeenCalledWithExactlyOnceWith('1', {
      title: 'Updated title',
    })

    expect(mockToast.success).toHaveBeenCalledExactlyOnceWith({
      title: 'Todo updated',
      description: 'Changes saved successfully.',
    })

    unmount()
  })

  it('does not submit when form is invalid', async () => {
    const updateTodoSpy = vi.spyOn(todoApi, 'updateTodo')
    const [{ handleSubmit, form }, unmount] = withSetup(() => useEditTodo(originalTodo))
    Object.defineProperty(form.meta.value, 'valid', { value: false, writable: true })

    await handleSubmit()

    expect(updateTodoSpy).not.toHaveBeenCalled()

    unmount()
  })

  it('shows error toast when API call fails', async () => {
    vi.spyOn(todoApi, 'updateTodo').mockRejectedValue(new Error('Network error'))

    const [{ form, handleSubmit }, unmount] = withSetup(() => useEditTodo(originalTodo))
    Object.defineProperty(form.meta.value, 'valid', { value: true, writable: true })
    form.setFieldValue('title', 'Updated title')

    await expect(handleSubmit()).rejects.toThrow('Network error')

    expect(mockToast.error).toHaveBeenCalledExactlyOnceWith({
      title: 'Failed to update todo',
      description: 'Network error',
    })

    unmount()
  })
})
