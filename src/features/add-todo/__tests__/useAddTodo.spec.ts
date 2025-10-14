import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAddTodo } from '../model/useAddTodo'
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

describe('useAddTodo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('exposes form and computed properties', () => {
    const [addTodo, unmount] = withSetup(() => useAddTodo())

    expect(addTodo.form).toBeDefined()
    expect(addTodo.canSubmit).toBeDefined()
    expect(addTodo.isPending).toBeDefined()
    expect(addTodo.handleSubmit).toBeTypeOf('function')

    unmount()
  })

  it('calls API when form is submitted with valid data', async () => {
    const createdTodo: Todo = {
      id: '10',
      title: 'Test',
      status: TodoStatus.PENDING,
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    }

    const createTodoSpy = vi
      .spyOn(todoApi, 'createTodo')
      .mockResolvedValue({ data: createdTodo, status: 201 })

    const [addTodo, unmount] = withSetup(() => useAddTodo())
    addTodo.form.setFieldValue('title', 'Test')

    // Submit the form (validation runs internally)
    await addTodo.handleSubmit()

    expect(createTodoSpy).toHaveBeenCalledExactlyOnceWith({
      title: 'Test',
      description: undefined,
    })

    unmount()
  })

  it('does not call API when form is invalid', async () => {
    const createTodoSpy = vi.spyOn(todoApi, 'createTodo')

    const [addTodo, unmount] = withSetup(() => useAddTodo())
    // Set invalid title (empty after trim)
    addTodo.form.setFieldValue('title', '   ')

    await addTodo.handleSubmit().catch(() => {})

    expect(createTodoSpy).not.toHaveBeenCalled()

    unmount()
  })
})
