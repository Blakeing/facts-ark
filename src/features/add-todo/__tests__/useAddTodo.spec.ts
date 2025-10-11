import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import { flushPromises } from '@vue/test-utils'

import { useAddTodo } from '../model/useAddTodo'
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

describe('useAddTodo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2025-01-01T00:00:00.000Z'))
  })

  afterEach(() => {
    vi.useRealTimers()
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
    Object.defineProperty(addTodo.meta.value, 'valid', { value: true, writable: true })
    addTodo.form.setFieldValue('title', 'Test')

    // Don't await - just trigger it
    const promise = addTodo.handleSubmit()

    // Wait for all promises to resolve
    await flushPromises()

    expect(createTodoSpy).toHaveBeenCalledWithExactlyOnceWith({
      title: 'Test',
      description: undefined,
    })

    unmount()

    // Clean up the promise
    await promise.catch(() => {})
  })

  it('does not call API when form is invalid', async () => {
    const createTodoSpy = vi.spyOn(todoApi, 'createTodo')

    const [addTodo, unmount] = withSetup(() => useAddTodo())
    Object.defineProperty(addTodo.meta.value, 'valid', { value: false, writable: true })

    await addTodo.handleSubmit().catch(() => {})

    expect(createTodoSpy).not.toHaveBeenCalled()

    unmount()
  })
})
