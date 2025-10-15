import { describe, expect, it, vi, beforeEach } from 'vitest'
import { createActor, waitFor } from 'xstate'
import { createFormMachine } from '../createFormMachine'

describe('createFormMachine', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates a machine with initial idle state', () => {
    const machine = createFormMachine({})
    const actor = createActor(machine)
    actor.start()

    expect(actor.getSnapshot().value).toBe('idle')

    actor.stop()
  })

  it('transitions to submitting on SUBMIT event', () => {
    const machine = createFormMachine({
      onSubmit: async () => {},
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'SUBMIT',
      data: { title: 'Valid Title' },
    })

    // Should transition to submitting
    expect(['submitting', 'success']).toContain(actor.getSnapshot().value)

    actor.stop()
  })

  it('calls onSubmit callback with submitted data', async () => {
    const onSubmit = vi.fn()
    const machine = createFormMachine({
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

  it('handles submission errors and transitions to error state', async () => {
    const errorMessage = 'Submission failed'
    const machine = createFormMachine({
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

    // Wait for error handling to complete
    await waitFor(actor, (snapshot) => snapshot.value === 'error', { timeout: 1000 })

    const context = actor.getSnapshot().context
    expect(actor.getSnapshot().value).toBe('error')
    expect(context.submitError).toBe(errorMessage)

    actor.stop()
  })

  it('transitions to idle on RESET event from success state', async () => {
    const machine = createFormMachine({
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

    // Reset to idle
    actor.send({ type: 'RESET' })

    expect(actor.getSnapshot().value).toBe('idle')
    expect(actor.getSnapshot().context.submitError).toBeNull()

    actor.stop()
  })

  it('clears error on RESET from error state', async () => {
    const machine = createFormMachine({
      onSubmit: async () => {
        throw new Error('Test error')
      },
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'SUBMIT',
      data: { title: 'Test' },
    })

    await waitFor(actor, (snapshot) => snapshot.value === 'error', { timeout: 1000 })

    expect(actor.getSnapshot().context.submitError).toBe('Test error')

    actor.send({ type: 'RESET' })

    expect(actor.getSnapshot().value).toBe('idle')
    expect(actor.getSnapshot().context.submitError).toBeNull()

    actor.stop()
  })

  it('auto-transitions from success to idle after 500ms', async () => {
    const machine = createFormMachine({
      onSubmit: async () => {},
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'SUBMIT',
      data: { title: 'Valid Title' },
    })

    await waitFor(actor, (snapshot) => snapshot.value === 'success', { timeout: 1000 })

    // Wait for auto-transition
    await waitFor(actor, (snapshot) => snapshot.value === 'idle', { timeout: 1000 })

    expect(actor.getSnapshot().value).toBe('idle')

    actor.stop()
  })

  it('can retry submission from error state', async () => {
    let failFirst = true
    const machine = createFormMachine({
      onSubmit: async () => {
        if (failFirst) {
          failFirst = false
          throw new Error('First attempt failed')
        }
      },
    })
    const actor = createActor(machine)
    actor.start()

    // First attempt fails
    actor.send({
      type: 'SUBMIT',
      data: { title: 'Test' },
    })

    await waitFor(actor, (snapshot) => snapshot.value === 'error', { timeout: 1000 })

    // Retry submission
    actor.send({
      type: 'SUBMIT',
      data: { title: 'Test' },
    })

    await waitFor(actor, (snapshot) => snapshot.value === 'success', { timeout: 1000 })

    expect(actor.getSnapshot().value).toBe('success')

    actor.stop()
  })
})
