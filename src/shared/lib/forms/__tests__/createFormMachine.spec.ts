import { describe, expect, it, vi, beforeEach } from 'vitest'
import { createActor, waitFor } from 'xstate'
import { z } from 'zod'
import { createFormMachine } from '../createFormMachine'

const testSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  count: z.number().min(0).optional(),
})

describe('createFormMachine', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a machine with initial idle state', () => {
    const machine = createFormMachine({ schema: testSchema })
    const actor = createActor(machine)
    actor.start()

    expect(actor.getSnapshot().value).toBe('idle')

    actor.stop()
  })

  it('initializes with provided initial data', () => {
    const initialData = {
      title: 'Initial Title',
      description: 'Initial Description',
      count: 5,
    }

    const machine = createFormMachine({
      schema: testSchema,
      initialData,
    })
    const actor = createActor(machine)
    actor.start()

    const context = actor.getSnapshot().context
    expect(context.formData.title).toBe('Initial Title')
    expect(context.formData.description).toBe('Initial Description')
    expect(context.formData.count).toBe(5)

    actor.stop()
  })

  it('updates form data on UPDATE_FORM_DATA event', () => {
    const machine = createFormMachine({ schema: testSchema })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: 'Updated Title' },
    })

    const context = actor.getSnapshot().context
    expect(context.formData.title).toBe('Updated Title')

    actor.stop()
  })

  it('merges partial data on UPDATE_FORM_DATA', () => {
    const machine = createFormMachine({
      schema: testSchema,
      initialData: {
        title: 'Original',
        description: 'Original Desc',
      },
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: 'New Title' },
    })

    const context = actor.getSnapshot().context
    expect(context.formData.title).toBe('New Title')
    expect(context.formData.description).toBe('Original Desc')

    actor.stop()
  })

  it('transitions to validating on SUBMIT event', () => {
    const machine = createFormMachine({
      schema: testSchema,
      initialData: { title: 'Valid Title' },
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'SUBMIT',
      data: { title: 'Valid Title' },
    })

    // Should transition through validating to submitting
    expect(['validating', 'submitting', 'success']).toContain(actor.getSnapshot().value)

    actor.stop()
  })

  it('validates form data and stores errors in context', () => {
    const machine = createFormMachine({
      schema: testSchema,
      initialData: { title: '' }, // Invalid
    })
    const actor = createActor(machine)
    actor.start()

    // Trigger validation through UPDATE_FORM_DATA
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: '' },
    })

    const context = actor.getSnapshot().context
    expect(context.errors).toBeDefined()
    // Empty title should produce validation error
    expect(context.errors.title).toBeDefined()

    actor.stop()
  })

  it('calls onSubmit callback when form is valid', async () => {
    const onSubmit = vi.fn()
    const machine = createFormMachine({
      schema: testSchema,
      initialData: { title: 'Valid Title' },
      onSubmit,
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'SUBMIT',
      data: { title: 'Valid Title' },
    })

    // Wait for the submission to complete
    await waitFor(actor, (snapshot) => snapshot.value === 'success', { timeout: 1000 })

    expect(onSubmit).toHaveBeenCalledExactlyOnceWith({ title: 'Valid Title' })

    actor.stop()
  })

  it('transitions to success state after successful submission', async () => {
    const machine = createFormMachine({
      schema: testSchema,
      initialData: { title: 'Valid Title' },
      onSubmit: async () => {
        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 10))
      },
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'SUBMIT',
      data: { title: 'Valid Title' },
    })

    // Wait for success state
    await waitFor(actor, (snapshot) => snapshot.value === 'success', { timeout: 1000 })

    expect(actor.getSnapshot().value).toBe('success')

    actor.stop()
  })

  it('handles submission errors and returns to idle', async () => {
    const errorMessage = 'Submission failed'
    const machine = createFormMachine({
      schema: testSchema,
      initialData: { title: 'Valid Title' },
      onSubmit: async () => {
        throw new Error(errorMessage)
      },
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'SUBMIT',
      data: { title: 'Valid Title' },
    })

    // Wait for error handling to complete and return to idle
    await waitFor(actor, (snapshot) => snapshot.value === 'idle', { timeout: 1000 })

    const context = actor.getSnapshot().context
    expect(actor.getSnapshot().value).toBe('idle')
    expect(context.submitError).toBe(errorMessage)

    actor.stop()
  })

  it('resets form on RESET event from success state', async () => {
    const machine = createFormMachine({
      schema: testSchema,
      initialData: { title: 'Initial' },
      onSubmit: async () => {},
    })
    const actor = createActor(machine)
    actor.start()

    // Submit to reach success state
    actor.send({
      type: 'SUBMIT',
      data: { title: 'Submitted' },
    })

    await waitFor(actor, (snapshot) => snapshot.value === 'success', { timeout: 1000 })

    // Reset form
    actor.send({ type: 'RESET' })

    const context = actor.getSnapshot().context
    expect(actor.getSnapshot().value).toBe('idle')
    expect(context.formData.title).toBe('Initial')
    expect(context.errors).toEqual({})
    expect(context.submitError).toBeNull()

    actor.stop()
  })

  it('does not transition to submitting if validation fails', async () => {
    const onSubmit = vi.fn()
    const machine = createFormMachine({
      schema: testSchema,
      initialData: { title: '' }, // Invalid
      onSubmit,
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'SUBMIT',
      data: { title: '' },
    })

    // Wait a bit to ensure no transition happens
    await new Promise((resolve) => setTimeout(resolve, 50))

    // Should still be in idle after validation fails
    expect(actor.getSnapshot().value).toBe('idle')
    expect(onSubmit).not.toHaveBeenCalled()

    actor.stop()
  })

  it('clears errors on successful submission', async () => {
    const machine = createFormMachine({
      schema: testSchema,
      initialData: { title: '' },
      onSubmit: async () => {},
    })
    const actor = createActor(machine)
    actor.start()

    // Set invalid data to generate errors
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: '' },
    })

    let context = actor.getSnapshot().context
    expect(Object.keys(context.errors).length).toBeGreaterThan(0)

    // Now submit with valid data
    actor.send({
      type: 'SUBMIT',
      data: { title: 'Valid Title' },
    })

    await waitFor(actor, (snapshot) => snapshot.value === 'success', { timeout: 1000 })

    context = actor.getSnapshot().context
    expect(context.errors).toEqual({})
    expect(context.submitError).toBeNull()

    actor.stop()
  })

  it('handles UPDATE_FORM_META event', () => {
    const machine = createFormMachine({ schema: testSchema })
    const actor = createActor(machine)
    actor.start()

    // Send meta update
    actor.send({
      type: 'UPDATE_FORM_META',
      meta: {
        dirty: true,
        touched: true,
        valid: true,
        pending: false,
      },
    })

    // Machine should remain in idle state
    expect(actor.getSnapshot().value).toBe('idle')

    actor.stop()
  })
})
