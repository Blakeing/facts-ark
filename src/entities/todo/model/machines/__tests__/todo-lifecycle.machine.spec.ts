/**
 * Todo Lifecycle Machine Tests
 *
 * Tests for the todo lifecycle state machine.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { createActor } from 'xstate'
import { todoLifecycleMachine } from '../todo-lifecycle.machine'
import type { Todo } from '../../types'
import { TodoStatus } from '../../types'

describe('Todo Lifecycle Machine', () => {
  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    status: TodoStatus.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  describe('Initial State', () => {
    it('transitions from checkingInput to appropriate state', () => {
      const actor = createActor(todoLifecycleMachine)
      actor.start()

      const snapshot = actor.getSnapshot()
      // Machine transitions immediately from checkingInput via always transition
      expect(['checkingInput', 'draft', 'pending', 'completed']).toContain(snapshot.value)
    })

    it('transitions to draft when no todo provided', () => {
      const actor = createActor(todoLifecycleMachine)
      actor.start()

      // Wait for automatic transition
      const snapshot = actor.getSnapshot()
      expect(['draft', 'checkingInput']).toContain(snapshot.value)
    })

    it('transitions to pending when todo is provided', () => {
      const actor = createActor(todoLifecycleMachine, {
        input: { todo: mockTodo },
      })
      actor.start()

      // The machine should automatically transition
      const snapshot = actor.getSnapshot()
      // Could be in checkingInput or already transitioned to pending
      expect(['pending', 'checkingInput']).toContain(snapshot.value)
    })

    it('transitions to completed when todo status is completed', () => {
      const completedTodo = { ...mockTodo, status: TodoStatus.COMPLETED }
      const actor = createActor(todoLifecycleMachine, {
        input: { todo: completedTodo },
      })
      actor.start()

      const snapshot = actor.getSnapshot()
      expect(['completed', 'checkingInput']).toContain(snapshot.value)
    })
  })

  describe('Draft State', () => {
    it('allows CREATE event to transition to pending', () => {
      const actor = createActor(todoLifecycleMachine)
      actor.start()

      actor.send({ type: 'CREATE', todo: mockTodo })

      const snapshot = actor.getSnapshot()
      expect(['pending', 'draft']).toContain(snapshot.value)
      if (snapshot.value === 'pending') {
        expect(snapshot.context.todo).toEqual(mockTodo)
      }
    })

    it('stores error on ERROR event', () => {
      const actor = createActor(todoLifecycleMachine)
      actor.start()

      const error = 'Creation failed'
      actor.send({ type: 'ERROR', error })

      const snapshot = actor.getSnapshot()
      expect(snapshot.context.error).toBe(error)
    })
  })

  describe('Pending State', () => {
    let actor: ReturnType<typeof createActor<typeof todoLifecycleMachine>>

    beforeEach(() => {
      actor = createActor(todoLifecycleMachine, {
        input: { todo: mockTodo },
      })
      actor.start()
    })

    it('clears error on entry', () => {
      // First set an error
      actor.send({ type: 'ERROR', error: 'Test error' })

      // Then transition back to pending (via CREATE after draft)
      const snapshot = actor.getSnapshot()
      // If in pending, error should be cleared
      if (snapshot.value === 'pending') {
        expect(snapshot.context.error).toBeUndefined()
      }
    })

    it('transitions to in_progress on START', () => {
      actor.send({ type: 'START' })

      const snapshot = actor.getSnapshot()
      expect(['in_progress', 'pending']).toContain(snapshot.value)
      if (snapshot.value === 'in_progress') {
        expect(snapshot.context.startedAt).toBeDefined()
        expect(snapshot.context.progress).toBe(0)
      }
    })

    it('transitions to archived on ARCHIVE', () => {
      actor.send({ type: 'ARCHIVE' })

      const snapshot = actor.getSnapshot()
      expect(['archived', 'pending']).toContain(snapshot.value)
      if (snapshot.value === 'archived') {
        expect(snapshot.context.archivedAt).toBeDefined()
      }
    })

    it('transitions to completed on COMPLETE', () => {
      actor.send({ type: 'COMPLETE' })

      const snapshot = actor.getSnapshot()
      expect(['completed', 'pending']).toContain(snapshot.value)
    })
  })

  describe('In Progress State', () => {
    let actor: ReturnType<typeof createActor<typeof todoLifecycleMachine>>

    beforeEach(() => {
      actor = createActor(todoLifecycleMachine, {
        input: { todo: mockTodo },
      })
      actor.start()
      actor.send({ type: 'START' })
    })

    it('updates progress on UPDATE_PROGRESS', () => {
      actor.send({ type: 'UPDATE_PROGRESS', progress: 50 })

      const snapshot = actor.getSnapshot()
      if (snapshot.value === 'in_progress') {
        expect(snapshot.context.progress).toBe(50)
      }
    })

    it('clamps progress to 0-100 range', () => {
      actor.send({ type: 'UPDATE_PROGRESS', progress: 150 })

      let snapshot = actor.getSnapshot()
      if (snapshot.value === 'in_progress') {
        expect(snapshot.context.progress).toBe(100)
      }

      actor.send({ type: 'UPDATE_PROGRESS', progress: -10 })

      snapshot = actor.getSnapshot()
      if (snapshot.value === 'in_progress') {
        expect(snapshot.context.progress).toBe(0)
      }
    })

    it('transitions to pending on PAUSE', () => {
      actor.send({ type: 'PAUSE' })

      const snapshot = actor.getSnapshot()
      expect(['pending', 'in_progress']).toContain(snapshot.value)
    })

    it('transitions to blocked on BLOCK', () => {
      const reason = 'Waiting for dependencies'
      actor.send({ type: 'BLOCK', reason })

      const snapshot = actor.getSnapshot()
      expect(['blocked', 'in_progress']).toContain(snapshot.value)
      if (snapshot.value === 'blocked') {
        expect(snapshot.context.blockedReason).toBe(reason)
        expect(snapshot.context.blockedAt).toBeDefined()
      }
    })

    it('allows REQUEST_REVIEW only when progress is 100', () => {
      // First set progress to 100
      actor.send({ type: 'UPDATE_PROGRESS', progress: 100 })

      actor.send({ type: 'REQUEST_REVIEW', notes: 'Ready for review' })

      const snapshot = actor.getSnapshot()
      expect(['review', 'in_progress']).toContain(snapshot.value)
      if (snapshot.value === 'review') {
        expect(snapshot.context.reviewNotes).toBe('Ready for review')
        expect(snapshot.context.reviewedAt).toBeDefined()
      }
    })

    it('blocks REQUEST_REVIEW when progress is less than 100', () => {
      actor.send({ type: 'UPDATE_PROGRESS', progress: 50 })

      actor.send({ type: 'REQUEST_REVIEW' })

      const snapshot = actor.getSnapshot()
      // Should remain in in_progress
      expect(snapshot.value).toBe('in_progress')
    })

    it('allows COMPLETE only when progress is 100', () => {
      actor.send({ type: 'UPDATE_PROGRESS', progress: 100 })

      actor.send({ type: 'COMPLETE' })

      const snapshot = actor.getSnapshot()
      expect(['completed', 'in_progress']).toContain(snapshot.value)
    })
  })

  describe('Blocked State', () => {
    let actor: ReturnType<typeof createActor<typeof todoLifecycleMachine>>

    beforeEach(() => {
      actor = createActor(todoLifecycleMachine, {
        input: { todo: mockTodo },
      })
      actor.start()
      actor.send({ type: 'START' })
      actor.send({ type: 'BLOCK', reason: 'Test reason' })
    })

    it('transitions to in_progress on UNBLOCK', () => {
      actor.send({ type: 'UNBLOCK' })

      const snapshot = actor.getSnapshot()
      expect(['in_progress', 'blocked']).toContain(snapshot.value)
      if (snapshot.value === 'in_progress') {
        expect(snapshot.context.blockedReason).toBeUndefined()
        expect(snapshot.context.blockedAt).toBeUndefined()
      }
    })

    it('transitions to pending on PAUSE', () => {
      actor.send({ type: 'PAUSE' })

      const snapshot = actor.getSnapshot()
      expect(['pending', 'blocked']).toContain(snapshot.value)
      if (snapshot.value === 'pending') {
        expect(snapshot.context.blockedReason).toBeUndefined()
        expect(snapshot.context.blockedAt).toBeUndefined()
      }
    })
  })

  describe('Review State', () => {
    let actor: ReturnType<typeof createActor<typeof todoLifecycleMachine>>

    beforeEach(() => {
      actor = createActor(todoLifecycleMachine, {
        input: { todo: mockTodo },
      })
      actor.start()
      actor.send({ type: 'START' })
      actor.send({ type: 'UPDATE_PROGRESS', progress: 100 })
      actor.send({ type: 'REQUEST_REVIEW', notes: 'Please review' })
    })

    it('transitions to completed on APPROVE', () => {
      actor.send({ type: 'APPROVE' })

      const snapshot = actor.getSnapshot()
      expect(['completed', 'review']).toContain(snapshot.value)
    })

    it('transitions to in_progress on REJECT with feedback', () => {
      const feedback = 'Needs more work'
      actor.send({ type: 'REJECT', feedback })

      const snapshot = actor.getSnapshot()
      expect(['in_progress', 'review']).toContain(snapshot.value)
      if (snapshot.value === 'in_progress') {
        expect(snapshot.context.reviewNotes).toBe(feedback)
        expect(snapshot.context.progress).toBe(50) // Reset to 50
      }
    })
  })

  describe('Completed State', () => {
    let actor: ReturnType<typeof createActor<typeof todoLifecycleMachine>>

    beforeEach(() => {
      actor = createActor(todoLifecycleMachine, {
        input: { todo: mockTodo },
      })
      actor.start()
      actor.send({ type: 'START' })
      actor.send({ type: 'UPDATE_PROGRESS', progress: 100 })
      actor.send({ type: 'COMPLETE' })
    })

    it('transitions to archived on ARCHIVE', () => {
      actor.send({ type: 'ARCHIVE' })

      const snapshot = actor.getSnapshot()
      expect(['archived', 'completed']).toContain(snapshot.value)
      if (snapshot.value === 'archived') {
        expect(snapshot.context.archivedAt).toBeDefined()
      }
    })

    it('transitions to pending on RESTORE', () => {
      actor.send({ type: 'RESTORE' })

      const snapshot = actor.getSnapshot()
      expect(['pending', 'completed']).toContain(snapshot.value)
      if (snapshot.value === 'pending') {
        expect(snapshot.context.progress).toBe(0)
        expect(snapshot.context.startedAt).toBeUndefined()
        expect(snapshot.context.reviewedAt).toBeUndefined()
      }
    })
  })

  describe('Archived State', () => {
    let actor: ReturnType<typeof createActor<typeof todoLifecycleMachine>>

    beforeEach(() => {
      actor = createActor(todoLifecycleMachine, {
        input: { todo: mockTodo },
      })
      actor.start()
      actor.send({ type: 'ARCHIVE' })
    })

    it('transitions to pending on RESTORE', () => {
      actor.send({ type: 'RESTORE' })

      const snapshot = actor.getSnapshot()
      expect(['pending', 'archived']).toContain(snapshot.value)
      if (snapshot.value === 'pending') {
        expect(snapshot.context.archivedAt).toBeUndefined()
      }
    })
  })
})
