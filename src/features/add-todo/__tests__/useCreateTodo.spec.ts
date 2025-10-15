import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { withSetup } from '@/__tests__/helpers/withSetup'
import { useCreateTodo } from '../model/useCreateTodo'
import * as todoApi from '@/entities/todo'
import { TodoStatus } from '@/entities/todo'

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

describe('useCreateTodo (Unified Pattern)', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('initializes form with correct schema', () => {
    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    expect(createTodo.form).toBeDefined()
    expect(createTodo.form.values).toBeDefined()
    expect(createTodo.form.errors).toBeDefined()
    expect(createTodo.form.meta).toBeDefined()

    unmount()
  })

  it('initializes with provided initial values', () => {
    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    expect(createTodo.form.values.status).toBe('draft')
    expect(createTodo.form.values.priority).toBe('medium')
    expect(createTodo.form.values.category).toBe('work')

    unmount()
  })

  it('state machine starts in idle state', () => {
    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    expect(createTodo.state.value.value).toBe('idle')

    unmount()
  })

  it('exposes computed properties', () => {
    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    expect(createTodo.isValid).toBeDefined()
    expect(createTodo.isSubmitting).toBeDefined()
    expect(createTodo.isCreating).toBeDefined()
    expect(createTodo.canSubmit).toBeDefined()
    expect(createTodo.handleSubmit).toBeTypeOf('function')

    unmount()
  })

  it('valid form data makes canSubmit true', async () => {
    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    createTodo.form.setFieldValue('title', 'Test Todo')
    await nextTick()
    await createTodo.form.validate()
    await nextTick()

    expect(createTodo.isValid.value).toBe(true)
    expect(createTodo.canSubmit.value).toBe(true)

    unmount()
  })

  it('invalid form data makes canSubmit false', async () => {
    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    createTodo.form.setFieldValue('title', '')
    await nextTick()
    await createTodo.form.validate()
    await nextTick()

    expect(createTodo.isValid.value).toBe(false)
    expect(createTodo.canSubmit.value).toBe(false)

    unmount()
  })

  it('calls createTodo API on valid submission', async () => {
    const createdTodo = {
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      status: TodoStatus.PENDING,
      priority: 'medium' as const,
      category: 'work' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const createTodoSpy = vi
      .spyOn(todoApi, 'createTodo')
      .mockResolvedValue({ data: createdTodo, status: 201 })

    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    createTodo.form.setFieldValue('title', 'Test Todo')
    createTodo.form.setFieldValue('description', 'Test Description')
    await nextTick()

    await createTodo.handleSubmit()
    await nextTick()
    await nextTick()

    expect(createTodoSpy).toHaveBeenCalledExactlyOnceWith({
      title: 'Test Todo',
      description: 'Test Description',
    })

    unmount()
  })

  it('shows success toast after successful submission', async () => {
    const createdTodo = {
      id: '1',
      title: 'Test Todo',
      status: TodoStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    vi.spyOn(todoApi, 'createTodo').mockResolvedValue({ data: createdTodo, status: 201 })

    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    createTodo.form.setFieldValue('title', 'Test Todo')
    await nextTick()

    await createTodo.handleSubmit()
    await nextTick()
    await nextTick()
    await nextTick()

    // With loadingToast, toast.promise is called instead of toast.success
    expect(mockToast.promise).toHaveBeenCalledTimes(1)
    expect(mockToast.promise).toHaveBeenCalledExactlyOnceWith(
      expect.any(Promise),
      expect.objectContaining({
        loading: 'Creating todo...',
        success: expect.any(Function),
        error: expect.any(Function),
      }),
    )

    unmount()
  })

  it('transitions to success state after successful submission', async () => {
    const createdTodo = {
      id: '1',
      title: 'Test Todo',
      status: TodoStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    vi.spyOn(todoApi, 'createTodo').mockResolvedValue({ data: createdTodo, status: 201 })

    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    createTodo.form.setFieldValue('title', 'Test Todo')
    await nextTick()

    await createTodo.handleSubmit()
    await nextTick()
    await nextTick()
    await nextTick()

    // Give time for state machine to transition
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(createTodo.state.value.value).toBe('success')

    unmount()
  })

  it('does not call API when form is invalid', async () => {
    const createTodoSpy = vi.spyOn(todoApi, 'createTodo')

    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    createTodo.form.setFieldValue('title', '')
    await nextTick()

    await createTodo.handleSubmit().catch(() => {})
    await nextTick()

    expect(createTodoSpy).not.toHaveBeenCalled()

    unmount()
  })

  it('handles API errors correctly', async () => {
    const errorMessage = 'Failed to create todo'
    vi.spyOn(todoApi, 'createTodo').mockRejectedValue(new Error(errorMessage))

    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    createTodo.form.setFieldValue('title', 'Test Todo')
    await nextTick()

    await createTodo.handleSubmit().catch(() => {})
    await nextTick()
    await nextTick()
    await nextTick()

    // Give time for error handling
    await new Promise((resolve) => setTimeout(resolve, 100))

    // Should return to idle state after error
    expect(createTodo.state.value.value).toBe('idle')

    unmount()
  })

  it('isCreating is alias for isSubmitting', () => {
    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    expect(createTodo.isCreating.value).toBe(createTodo.isSubmitting.value)

    unmount()
  })

  it('prevents submission while already submitting', async () => {
    const createdTodo = {
      id: '1',
      title: 'Test Todo',
      status: TodoStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    vi.spyOn(todoApi, 'createTodo').mockImplementation(
      () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ data: createdTodo, status: 201 }), 100)
        }),
    )

    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    createTodo.form.setFieldValue('title', 'Test Todo')
    await nextTick()

    // Start first submission
    const firstSubmit = createTodo.handleSubmit()
    await nextTick()
    await nextTick()

    // Should be submitting now
    expect(createTodo.isSubmitting.value).toBe(true)
    expect(createTodo.canSubmit.value).toBe(false)

    await firstSubmit

    unmount()
  })

  it('exposes form manipulation methods', () => {
    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    expect(createTodo.setFieldValue).toBeTypeOf('function')
    expect(createTodo.setFieldTouched).toBeTypeOf('function')
    expect(createTodo.setFieldError).toBeTypeOf('function')
    expect(createTodo.resetForm).toBeTypeOf('function')
    expect(createTodo.validate).toBeTypeOf('function')

    unmount()
  })

  it('updates form values reactively', async () => {
    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    expect(createTodo.form.values.title).toBeUndefined()

    createTodo.form.setFieldValue('title', 'New Title')
    await nextTick()

    expect(createTodo.form.values.title).toBe('New Title')

    unmount()
  })

  it('auto-resets form after successful submission', async () => {
    const createdTodo = {
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      status: TodoStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    vi.spyOn(todoApi, 'createTodo').mockResolvedValue({ data: createdTodo, status: 201 })

    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    // Set form values
    createTodo.form.setFieldValue('title', 'Test Todo')
    createTodo.form.setFieldValue('description', 'Test Description')
    await nextTick()

    // Submit form
    await createTodo.handleSubmit()
    await nextTick()
    await nextTick()
    await nextTick()

    // Wait for state machine to transition to success
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(createTodo.state.value.value).toBe('success')

    // Wait for auto-reset (500ms delay + buffer)
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Should be back to idle state
    expect(createTodo.state.value.value).toBe('idle')

    // Form should be reset to initial values
    await nextTick()
    expect(createTodo.form.values.title).toBeUndefined()
    expect(createTodo.form.values.description).toBeUndefined()
    expect(createTodo.form.values.status).toBe('draft')
    expect(createTodo.form.values.priority).toBe('medium')
    expect(createTodo.form.values.category).toBe('work')

    unmount()
  })

  it('allows multiple submissions in succession', async () => {
    const createdTodo = {
      id: '1',
      title: 'Test Todo',
      status: TodoStatus.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const createTodoSpy = vi
      .spyOn(todoApi, 'createTodo')
      .mockResolvedValue({ data: createdTodo, status: 201 })

    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    // First submission
    createTodo.form.setFieldValue('title', 'First Todo')
    await nextTick()
    await createTodo.handleSubmit()
    await nextTick()
    await nextTick()

    // Wait for auto-reset
    await new Promise((resolve) => setTimeout(resolve, 600))

    // Second submission
    createTodo.form.setFieldValue('title', 'Second Todo')
    await nextTick()
    await createTodo.handleSubmit()
    await nextTick()
    await nextTick()

    // Both submissions should have succeeded
    expect(createTodoSpy).toHaveBeenCalledTimes(2)
    expect(createTodoSpy).toHaveBeenNthCalledWith(1, { title: 'First Todo' })
    expect(createTodoSpy).toHaveBeenNthCalledWith(2, { title: 'Second Todo' })

    unmount()
  })
})
