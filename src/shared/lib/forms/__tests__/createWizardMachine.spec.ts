import { describe, expect, it, vi, beforeEach } from 'vitest'
import { createActor, waitFor } from 'xstate'
import { z } from 'zod'
import { createWizardMachine } from '../createWizardMachine'

const step1Schema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.enum(['work', 'personal', 'other']),
})

const step2Schema = z.object({
  description: z.string().min(5, 'Description must be at least 5 characters'),
  priority: z.enum(['low', 'medium', 'high']),
})

const step3Schema = z.object({
  tags: z.string().optional(),
  notes: z.string().optional(),
})

describe('createWizardMachine', () => {
  let onCompleteMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    onCompleteMock = vi.fn()
    vi.clearAllMocks()
  })

  it('creates a machine with initial step', () => {
    const machine = createWizardMachine({
      steps: [
        { id: 'step1', schema: step1Schema, fields: ['title', 'category'] },
        { id: 'step2', schema: step2Schema, fields: ['description', 'priority'] },
      ],
    })
    const actor = createActor(machine)
    actor.start()

    expect(actor.getSnapshot().value).toBe('step1')
    expect(actor.getSnapshot().context.currentStep).toBe('step1')

    actor.stop()
  })

  it('navigates to next step on NEXT event when current step is valid', () => {
    const machine = createWizardMachine({
      steps: [
        { id: 'step1', schema: step1Schema, fields: ['title', 'category'] },
        { id: 'step2', schema: step2Schema, fields: ['description', 'priority'] },
      ],
    })
    const actor = createActor(machine)
    actor.start()

    // Set valid data for step 1
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: 'Test Title', category: 'work' },
    })

    // Move to next step
    actor.send({ type: 'NEXT' })

    expect(actor.getSnapshot().value).toBe('step2')

    actor.stop()
  })

  it('does not navigate to next step if current step is invalid', () => {
    const machine = createWizardMachine({
      steps: [
        { id: 'step1', schema: step1Schema, fields: ['title', 'category'] },
        { id: 'step2', schema: step2Schema, fields: ['description', 'priority'] },
      ],
    })
    const actor = createActor(machine)
    actor.start()

    // Set invalid data for step 1
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: '', category: 'work' }, // Empty title is invalid
    })

    // Try to move to next step
    actor.send({ type: 'NEXT' })

    // Should remain in step1
    expect(actor.getSnapshot().value).toBe('step1')

    actor.stop()
  })

  it('navigates back to previous step on BACK event', () => {
    const machine = createWizardMachine({
      steps: [
        { id: 'step1', schema: step1Schema, fields: ['title', 'category'] },
        { id: 'step2', schema: step2Schema, fields: ['description', 'priority'] },
      ],
    })
    const actor = createActor(machine)
    actor.start()

    // Navigate forward first
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: 'Test Title', category: 'work' },
    })
    actor.send({ type: 'NEXT' })

    expect(actor.getSnapshot().value).toBe('step2')

    // Navigate back
    actor.send({ type: 'BACK' })

    expect(actor.getSnapshot().value).toBe('step1')

    actor.stop()
  })

  it('accumulates form data across steps', () => {
    const machine = createWizardMachine({
      steps: [
        { id: 'step1', schema: step1Schema, fields: ['title', 'category'] },
        { id: 'step2', schema: step2Schema, fields: ['description', 'priority'] },
      ],
    })
    const actor = createActor(machine)
    actor.start()

    // Add data in step 1
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: 'Test Title', category: 'work' },
    })
    actor.send({ type: 'NEXT' })

    // Add data in step 2
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { description: 'Test Description', priority: 'high' },
    })

    const context = actor.getSnapshot().context
    expect(context.formData.title).toBe('Test Title')
    expect(context.formData.category).toBe('work')
    expect(context.formData.description).toBe('Test Description')
    expect(context.formData.priority).toBe('high')

    actor.stop()
  })

  it('validates all steps before final submission', async () => {
    const machine = createWizardMachine({
      steps: [
        { id: 'step1', schema: step1Schema, fields: ['title', 'category'] },
        { id: 'step2', schema: step2Schema, fields: ['description', 'priority'] },
      ],
      onComplete: onCompleteMock,
    })
    const actor = createActor(machine)
    actor.start()

    // Complete step 1
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: 'Test Title', category: 'work' },
    })
    actor.send({ type: 'NEXT' })

    // Complete step 2 and submit
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { description: 'Test Description', priority: 'high' },
    })

    const currentFormData = actor.getSnapshot().context.formData
    actor.send({ type: 'SUBMIT', data: currentFormData })

    // Wait for submission to complete
    await waitFor(actor, (snapshot) => snapshot.matches('success'), { timeout: 1000 })

    expect(onCompleteMock).toHaveBeenCalledExactlyOnceWith({
      title: 'Test Title',
      category: 'work',
      description: 'Test Description',
      priority: 'high',
    })

    actor.stop()
  })

  it('calls onComplete with accumulated data on successful submission', async () => {
    const machine = createWizardMachine({
      steps: [
        { id: 'step1', schema: step1Schema, fields: ['title', 'category'] },
        { id: 'step2', schema: step2Schema, fields: ['description', 'priority'] },
        { id: 'step3', schema: step3Schema, fields: ['tags', 'notes'] },
      ],
      onComplete: onCompleteMock,
    })
    const actor = createActor(machine)
    actor.start()

    // Complete all steps
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: 'Test Title', category: 'work' },
    })
    actor.send({ type: 'NEXT' })

    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { description: 'Test Description', priority: 'high' },
    })
    actor.send({ type: 'NEXT' })

    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { tags: 'test', notes: 'some notes' },
    })

    const currentFormData = actor.getSnapshot().context.formData
    actor.send({ type: 'SUBMIT', data: currentFormData })

    await waitFor(actor, (snapshot) => snapshot.matches('success'), { timeout: 1000 })

    expect(onCompleteMock).toHaveBeenCalledExactlyOnceWith({
      title: 'Test Title',
      category: 'work',
      description: 'Test Description',
      priority: 'high',
      tags: 'test',
      notes: 'some notes',
    })

    actor.stop()
  })

  it('returns to last step on submission error', async () => {
    const machine = createWizardMachine({
      steps: [
        { id: 'step1', schema: step1Schema, fields: ['title', 'category'] },
        { id: 'step2', schema: step2Schema, fields: ['description', 'priority'] },
      ],
      onComplete: async () => {
        throw new Error('Submission failed')
      },
    })
    const actor = createActor(machine)
    actor.start()

    // Complete steps
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: 'Test Title', category: 'work' },
    })
    actor.send({ type: 'NEXT' })

    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { description: 'Test Description', priority: 'high' },
    })

    const currentFormData = actor.getSnapshot().context.formData
    actor.send({ type: 'SUBMIT', data: currentFormData })

    // Wait for error handling
    await waitFor(actor, (snapshot) => snapshot.matches('step2'), { timeout: 1000 })

    expect(actor.getSnapshot().value).toBe('step2')
    expect(actor.getSnapshot().context.submitError).toBe('Submission failed')

    actor.stop()
  })

  it('handles NEXT from last step by transitioning to validation', () => {
    const machine = createWizardMachine({
      steps: [
        { id: 'step1', schema: step1Schema, fields: ['title', 'category'] },
        { id: 'step2', schema: step2Schema, fields: ['description', 'priority'] },
      ],
      onComplete: async () => {},
    })
    const actor = createActor(machine)
    actor.start()

    // Navigate to last step
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: 'Test Title', category: 'work' },
    })
    actor.send({ type: 'NEXT' })

    // From last step, NEXT should trigger validation/submission
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { description: 'Test Description', priority: 'high' },
    })
    actor.send({ type: 'NEXT' })

    // Should transition to validating or submitting
    const currentState = actor.getSnapshot().value
    expect(['validating', 'submitting', 'success']).toContain(currentState)

    actor.stop()
  })

  it('does not allow BACK from first step', () => {
    const machine = createWizardMachine({
      steps: [
        { id: 'step1', schema: step1Schema, fields: ['title', 'category'] },
        { id: 'step2', schema: step2Schema, fields: ['description', 'priority'] },
      ],
    })
    const actor = createActor(machine)
    actor.start()

    // Try to go back from first step
    actor.send({ type: 'BACK' })

    // Should remain in step1
    expect(actor.getSnapshot().value).toBe('step1')

    actor.stop()
  })

  it('validates current step data before allowing navigation', () => {
    const machine = createWizardMachine({
      steps: [
        { id: 'step1', schema: step1Schema, fields: ['title', 'category'] },
        { id: 'step2', schema: step2Schema, fields: ['description', 'priority'] },
      ],
    })
    const actor = createActor(machine)
    actor.start()

    // Set invalid data
    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: '', category: 'work' }, // Empty title is invalid
    })

    // Try to navigate
    actor.send({ type: 'NEXT' })

    // Should stay in step1 due to validation error
    expect(actor.getSnapshot().value).toBe('step1')
    expect(Object.keys(actor.getSnapshot().context.errors).length).toBeGreaterThan(0)

    actor.stop()
  })

  it('handles UPDATE_FORM_META event', () => {
    const machine = createWizardMachine({
      steps: [{ id: 'step1', schema: step1Schema, fields: ['title', 'category'] }],
    })
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

    // Machine should remain in current step
    expect(actor.getSnapshot().value).toBe('step1')

    actor.stop()
  })

  it('reaches success as final state', async () => {
    const machine = createWizardMachine({
      steps: [{ id: 'step1', schema: step1Schema, fields: ['title', 'category'] }],
      onComplete: async () => {},
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { title: 'Test Title', category: 'work' },
    })

    const currentFormData = actor.getSnapshot().context.formData
    actor.send({ type: 'SUBMIT', data: currentFormData })

    await waitFor(actor, (snapshot) => snapshot.matches('success'), { timeout: 1000 })

    expect(actor.getSnapshot().value).toBe('success')

    actor.stop()
  })
})
