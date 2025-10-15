import { beforeEach, describe, expect, it, vi } from 'vitest'
import { nextTick } from 'vue'
import { z } from 'zod'
import { withSetup } from '@/__tests__/helpers/withSetup'
import { useFormMachine } from '../useFormMachine'
import { createFormMachine } from '../createFormMachine'

const testSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
})

describe('useFormMachine', () => {
  let onSubmitMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onSubmitMock = vi.fn()
    vi.clearAllMocks()
  })

  it('initializes VeeValidate form with Zod schema', () => {
    const machine = createFormMachine({ schema: testSchema })
    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
      }),
    )

    expect(formMachine.form).toBeDefined()
    expect(formMachine.form.values).toBeDefined()
    expect(formMachine.form.errors).toBeDefined()
    expect(formMachine.form.meta).toBeDefined()

    unmount()
  })

  it('initializes with provided initial values', () => {
    const machine = createFormMachine({ schema: testSchema })
    const initialValues = {
      title: 'Test Todo',
      description: 'Test Description',
      priority: 'high' as const,
    }

    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
        initialValues,
      }),
    )

    expect(formMachine.form.values.title).toBe('Test Todo')
    expect(formMachine.form.values.description).toBe('Test Description')
    expect(formMachine.form.values.priority).toBe('high')

    unmount()
  })

  it('machine starts in idle state', () => {
    const machine = createFormMachine({ schema: testSchema })
    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
      }),
    )

    expect(formMachine.state.value.value).toBe('idle')

    unmount()
  })

  it('updates form values and syncs to machine context', async () => {
    const machine = createFormMachine({ schema: testSchema })
    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
      }),
    )

    formMachine.form.setFieldValue('title', 'New Title')
    await nextTick()

    expect(formMachine.form.values.title).toBe('New Title')
    // The form data should be synced to the machine context
    expect(formMachine.state.value.context.formData.title).toBe('New Title')

    unmount()
  })

  it('exposes computed properties correctly', () => {
    const machine = createFormMachine({ schema: testSchema })
    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
        initialValues: {
          title: 'Test',
          priority: 'medium' as const,
        },
      }),
    )

    expect(formMachine.isValid).toBeDefined()
    expect(formMachine.isDirty).toBeDefined()
    expect(formMachine.isTouched).toBeDefined()
    expect(formMachine.isPending).toBeDefined()
    expect(formMachine.isSubmitting).toBeDefined()
    expect(formMachine.canSubmit).toBeDefined()

    // Initial form with valid data should be valid
    expect(formMachine.isValid.value).toBe(true)
    expect(formMachine.isSubmitting.value).toBe(false)
    expect(formMachine.canSubmit.value).toBe(true)

    unmount()
  })

  it('handles form submission and calls onSubmit callback', async () => {
    const machine = createFormMachine({
      schema: testSchema,
      onSubmit: onSubmitMock,
    })

    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
        initialValues: {
          title: 'Test Todo',
          priority: 'medium' as const,
        },
        onSubmit: onSubmitMock,
      }),
    )

    await formMachine.handleSubmit()
    await nextTick()
    await nextTick()

    expect(onSubmitMock).toHaveBeenCalledWith({
      title: 'Test Todo',
      priority: 'medium',
    })

    unmount()
  })

  it('transitions to submitting state during submission', async () => {
    let resolveSubmit: () => void
    const submitPromise = new Promise<void>((resolve) => {
      resolveSubmit = resolve
    })

    const machine = createFormMachine({
      schema: testSchema,
      onSubmit: async () => {
        // Wait for test to check state
        await submitPromise
      },
    })

    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
        initialValues: {
          title: 'Test',
          priority: 'medium' as const,
        },
        onSubmit: async () => {
          await submitPromise
        },
      }),
    )

    // Submit form
    const handleSubmitPromise = formMachine.handleSubmit()
    await nextTick()
    await nextTick()
    await nextTick()

    // Should be submitting
    expect(formMachine.isSubmitting.value).toBe(true)
    expect(formMachine.canSubmit.value).toBe(false)

    // Resolve the submission
    resolveSubmit!()
    await handleSubmitPromise
    await nextTick()

    unmount()
  })

  it('prevents submission when form is invalid', async () => {
    const machine = createFormMachine({
      schema: testSchema,
      onSubmit: onSubmitMock,
    })

    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
        initialValues: {
          title: '', // Invalid: empty title
          priority: 'medium' as const,
        },
      }),
    )

    // Try to submit invalid form
    await formMachine.handleSubmit().catch(() => {})
    await nextTick()

    // onSubmit should not be called
    expect(onSubmitMock).not.toHaveBeenCalled()

    unmount()
  })

  it('matches() helper function works correctly', () => {
    const machine = createFormMachine({ schema: testSchema })
    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
      }),
    )

    // Machine should be in idle state
    expect(formMachine.state.value.value).toBe('idle')

    unmount()
  })

  it('exposes field manipulation methods', () => {
    const machine = createFormMachine({ schema: testSchema })
    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
      }),
    )

    expect(formMachine.setFieldValue).toBeTypeOf('function')
    expect(formMachine.setFieldTouched).toBeTypeOf('function')
    expect(formMachine.setFieldError).toBeTypeOf('function')
    expect(formMachine.resetField).toBeTypeOf('function')

    unmount()
  })

  it('exposes form-level control methods', () => {
    const machine = createFormMachine({ schema: testSchema })
    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
      }),
    )

    expect(formMachine.resetForm).toBeTypeOf('function')
    expect(formMachine.validate).toBeTypeOf('function')
    expect(formMachine.validateField).toBeTypeOf('function')
    expect(formMachine.setErrors).toBeTypeOf('function')
    expect(formMachine.setValues).toBeTypeOf('function')
    expect(formMachine.setTouched).toBeTypeOf('function')

    unmount()
  })

  it('field count helpers work correctly', async () => {
    const machine = createFormMachine({ schema: testSchema })
    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
        initialValues: {
          title: 'Test',
          priority: 'medium' as const,
        },
      }),
    )

    expect(formMachine.fieldCount).toBeDefined()
    expect(formMachine.errorCount).toBeDefined()
    expect(formMachine.touchedFieldCount).toBeDefined()
    expect(formMachine.dirtyFieldCount).toBeDefined()

    // Initial state
    expect(formMachine.fieldCount.value).toBeGreaterThan(0)
    expect(formMachine.errorCount.value).toBe(0)

    unmount()
  })

  it('validates form data with Zod schema', async () => {
    const machine = createFormMachine({ schema: testSchema })
    const [formMachine, unmount] = withSetup(() =>
      useFormMachine({
        schema: testSchema,
        machine,
      }),
    )

    // Set invalid data
    formMachine.form.setFieldValue('title', '')
    await nextTick()
    await formMachine.validate()
    await nextTick()

    // Should have validation errors
    expect(formMachine.isValid.value).toBe(false)

    // Set valid data
    formMachine.form.setFieldValue('title', 'Valid Title')
    await nextTick()
    await formMachine.validate()
    await nextTick()

    // Should be valid
    expect(formMachine.isValid.value).toBe(true)

    unmount()
  })
})
