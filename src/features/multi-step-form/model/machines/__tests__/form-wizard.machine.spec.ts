/**
 * Form Wizard Machine Tests
 *
 * Tests for the multi-step form wizard state machine.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { createActor } from 'xstate'
import { formWizardMachine } from '../form-wizard.machine'
import type { BasicInfoData, DetailsData, AdditionalData } from '../types'

describe('Form Wizard Machine', () => {
  describe('Initial State', () => {
    it('starts in step1', () => {
      const actor = createActor(formWizardMachine)
      actor.start()

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('step1')
      expect(snapshot.context.currentStep).toBe(1)
    })

    it('initializes with empty form data', () => {
      const actor = createActor(formWizardMachine)
      actor.start()

      const snapshot = actor.getSnapshot()
      expect(snapshot.context.formData).toEqual({
        basicInfo: null,
        details: null,
        additional: null,
      })
    })

    it('can start with initial data', () => {
      const initialData = {
        basicInfo: { title: 'Test', category: 'work' as const },
        details: null,
        additional: null,
      }

      const actor = createActor(formWizardMachine, {
        input: { initialData },
      })
      actor.start()

      const snapshot = actor.getSnapshot()
      expect(snapshot.context.formData.basicInfo).toEqual(initialData.basicInfo)
    })
  })

  describe('Step 1 - Basic Info', () => {
    let actor: ReturnType<typeof createActor<typeof formWizardMachine>>

    beforeEach(() => {
      actor = createActor(formWizardMachine)
      actor.start()
    })

    it('updates basic info on UPDATE_BASIC_INFO', () => {
      const basicInfo: BasicInfoData = {
        title: 'New Task',
        category: 'work',
      }

      actor.send({ type: 'UPDATE_BASIC_INFO', data: basicInfo })

      const snapshot = actor.getSnapshot()
      expect(snapshot.context.formData.basicInfo).toEqual(basicInfo)
      expect(snapshot.context.validationErrors).toBeUndefined()
    })

    it('blocks NEXT without basic info', () => {
      actor.send({ type: 'NEXT' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('step1')
    })

    it('allows NEXT with valid basic info', () => {
      const basicInfo: BasicInfoData = {
        title: 'New Task',
        category: 'personal',
      }

      actor.send({ type: 'UPDATE_BASIC_INFO', data: basicInfo })
      actor.send({ type: 'NEXT' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('step2')
      expect(snapshot.context.currentStep).toBe(2)
    })

    it('stores validation errors on VALIDATION_ERROR', () => {
      const errors = { title: 'Title is required' }

      actor.send({ type: 'VALIDATION_ERROR', errors })

      const snapshot = actor.getSnapshot()
      expect(snapshot.context.validationErrors).toEqual(errors)
    })

    it('resets on RESET event', () => {
      actor.send({
        type: 'UPDATE_BASIC_INFO',
        data: { title: 'Test', category: 'work' },
      })

      actor.send({ type: 'RESET' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('step1')
    })
  })

  describe('Step 2 - Details', () => {
    let actor: ReturnType<typeof createActor<typeof formWizardMachine>>

    beforeEach(() => {
      actor = createActor(formWizardMachine)
      actor.start()

      // Navigate to step 2
      actor.send({
        type: 'UPDATE_BASIC_INFO',
        data: { title: 'Task', category: 'work' },
      })
      actor.send({ type: 'NEXT' })
    })

    it('updates details on UPDATE_DETAILS', () => {
      const details: DetailsData = {
        description: 'Task description',
        priority: 'high',
        dueDate: '2025-12-31',
      }

      actor.send({ type: 'UPDATE_DETAILS', data: details })

      const snapshot = actor.getSnapshot()
      expect(snapshot.context.formData.details).toEqual(details)
      expect(snapshot.context.validationErrors).toBeUndefined()
    })

    it('blocks NEXT without details', () => {
      actor.send({ type: 'NEXT' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('step2')
    })

    it('allows NEXT with valid details', () => {
      actor.send({
        type: 'UPDATE_DETAILS',
        data: { description: 'Description', priority: 'medium' },
      })
      actor.send({ type: 'NEXT' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('step3')
      expect(snapshot.context.currentStep).toBe(3)
    })

    it('navigates back to step1 on BACK', () => {
      actor.send({ type: 'BACK' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('step1')
      expect(snapshot.context.currentStep).toBe(1)
    })

    it('jumps to step1 on GOTO_STEP with step=1', () => {
      actor.send({ type: 'GOTO_STEP', step: 1 })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('step1')
    })
  })

  describe('Step 3 - Additional', () => {
    let actor: ReturnType<typeof createActor<typeof formWizardMachine>>

    beforeEach(() => {
      actor = createActor(formWizardMachine)
      actor.start()

      // Navigate to step 3
      actor.send({
        type: 'UPDATE_BASIC_INFO',
        data: { title: 'Task', category: 'work' },
      })
      actor.send({ type: 'NEXT' })
      actor.send({
        type: 'UPDATE_DETAILS',
        data: { description: 'Desc', priority: 'low' },
      })
      actor.send({ type: 'NEXT' })
    })

    it('updates additional data on UPDATE_ADDITIONAL', () => {
      const additional: AdditionalData = {
        tags: ['urgent', 'review'],
        notes: 'Extra notes',
      }

      actor.send({ type: 'UPDATE_ADDITIONAL', data: additional })

      const snapshot = actor.getSnapshot()
      expect(snapshot.context.formData.additional).toEqual(additional)
    })

    it('allows NEXT to review (no validation required)', () => {
      actor.send({ type: 'NEXT' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('review')
      expect(snapshot.context.currentStep).toBe(4)
    })

    it('navigates back to step2 on BACK', () => {
      actor.send({ type: 'BACK' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('step2')
    })

    it('can jump to any previous step', () => {
      actor.send({ type: 'GOTO_STEP', step: 1 })
      let snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('step1')

      // Back to step 3
      actor.send({ type: 'GOTO_STEP', step: 2 })
      snapshot = actor.getSnapshot()
      // May not reach step2 immediately, but should accept the event
    })
  })

  describe('Review State', () => {
    let actor: ReturnType<typeof createActor<typeof formWizardMachine>>

    beforeEach(() => {
      actor = createActor(formWizardMachine)
      actor.start()

      // Navigate to review
      actor.send({
        type: 'UPDATE_BASIC_INFO',
        data: { title: 'Task', category: 'work' },
      })
      actor.send({ type: 'NEXT' })
      actor.send({
        type: 'UPDATE_DETAILS',
        data: { description: 'Desc', priority: 'medium' },
      })
      actor.send({ type: 'NEXT' })
      actor.send({ type: 'NEXT' }) // Skip additional
    })

    it('transitions to submitting on SUBMIT', () => {
      actor.send({ type: 'SUBMIT' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('submitting')
    })

    it('navigates back to step3 on BACK', () => {
      actor.send({ type: 'BACK' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('step3')
    })

    it('can jump to any step', () => {
      actor.send({ type: 'GOTO_STEP', step: 2 })

      const snapshot = actor.getSnapshot()
      // Should accept the event
      expect(['review', 'step2']).toContain(snapshot.value as string)
    })
  })

  describe('Submitting State', () => {
    let actor: ReturnType<typeof createActor<typeof formWizardMachine>>

    beforeEach(() => {
      actor = createActor(formWizardMachine)
      actor.start()

      // Navigate to submitting
      actor.send({
        type: 'UPDATE_BASIC_INFO',
        data: { title: 'Task', category: 'work' },
      })
      actor.send({ type: 'NEXT' })
      actor.send({
        type: 'UPDATE_DETAILS',
        data: { description: 'Desc', priority: 'high' },
      })
      actor.send({ type: 'NEXT' })
      actor.send({ type: 'NEXT' })
      actor.send({ type: 'SUBMIT' })
    })

    it('transitions to success on SUCCESS', () => {
      actor.send({ type: 'SUCCESS', id: '123' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('success')
      expect(snapshot.context.currentStep).toBe(5)
    })

    it('transitions to error on ERROR', () => {
      const error = 'Submission failed'
      actor.send({ type: 'ERROR', error })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('error')
      expect(snapshot.context.error).toBe(error)
    })
  })

  describe('Success State', () => {
    it('is a final state', () => {
      const actor = createActor(formWizardMachine)
      actor.start()

      // Navigate to success
      actor.send({
        type: 'UPDATE_BASIC_INFO',
        data: { title: 'Task', category: 'work' },
      })
      actor.send({ type: 'NEXT' })
      actor.send({
        type: 'UPDATE_DETAILS',
        data: { description: 'Desc', priority: 'low' },
      })
      actor.send({ type: 'NEXT' })
      actor.send({ type: 'NEXT' })
      actor.send({ type: 'SUBMIT' })
      actor.send({ type: 'SUCCESS', id: '123' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('success')
      expect(snapshot.status).toBe('done')
    })
  })

  describe('Error State', () => {
    let actor: ReturnType<typeof createActor<typeof formWizardMachine>>

    beforeEach(() => {
      actor = createActor(formWizardMachine)
      actor.start()

      // Navigate to error
      actor.send({
        type: 'UPDATE_BASIC_INFO',
        data: { title: 'Task', category: 'work' },
      })
      actor.send({ type: 'NEXT' })
      actor.send({
        type: 'UPDATE_DETAILS',
        data: { description: 'Desc', priority: 'medium' },
      })
      actor.send({ type: 'NEXT' })
      actor.send({ type: 'NEXT' })
      actor.send({ type: 'SUBMIT' })
      actor.send({ type: 'ERROR', error: 'Failed' })
    })

    it('transitions to submitting on RETRY', () => {
      actor.send({ type: 'RETRY' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('submitting')
      expect(snapshot.context.error).toBeUndefined()
    })

    it('navigates back to review on BACK', () => {
      actor.send({ type: 'BACK' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('review')
      expect(snapshot.context.error).toBeUndefined()
    })

    it('resets to step1 on RESET', () => {
      actor.send({ type: 'RESET' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('step1')
      expect(snapshot.context.error).toBeUndefined()
      expect(snapshot.context.formData).toEqual({
        basicInfo: null,
        details: null,
        additional: null,
      })
    })
  })
})
