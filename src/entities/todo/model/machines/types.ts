/**
 * Todo Lifecycle Machine Types
 *
 * Type definitions for the todo entity state machine.
 * Demonstrates extended workflow states beyond simple pending/completed.
 */

import type { Todo } from '../types'

/**
 * Extended todo workflow states
 *
 * This extends the basic TodoStatus with additional workflow states
 * for enterprise scenarios like drafts, review, archival, etc.
 */
export type TodoWorkflowState =
  | 'draft' // Being edited, not yet saved
  | 'pending' // Active todo, waiting to be done
  | 'in_progress' // Currently being worked on
  | 'blocked' // Blocked by dependencies
  | 'review' // Under review before completion
  | 'completed' // Finished
  | 'archived' // Archived for historical record

/**
 * Machine context
 */
export interface TodoMachineContext {
  todo: Todo | null
  error?: Error | string
  blockedReason?: string
  reviewNotes?: string
  progress?: number // 0-100
  startedAt?: string
  blockedAt?: string
  reviewedAt?: string
  archivedAt?: string
}

/**
 * Machine events
 */
export type TodoMachineEvent =
  | { type: 'CREATE'; todo: Todo }
  | { type: 'START' }
  | { type: 'PAUSE' }
  | { type: 'BLOCK'; reason: string }
  | { type: 'UNBLOCK' }
  | { type: 'REQUEST_REVIEW'; notes?: string }
  | { type: 'APPROVE' }
  | { type: 'REJECT'; feedback: string }
  | { type: 'COMPLETE' }
  | { type: 'ARCHIVE' }
  | { type: 'RESTORE' }
  | { type: 'UPDATE_PROGRESS'; progress: number }
  | { type: 'ERROR'; error: Error | string }
  | { type: 'RESET' }

/**
 * Machine input (when creating actor)
 */
export interface TodoMachineInput {
  todo?: Todo
  initialState?: TodoWorkflowState
}

/**
 * Machine output (when reaching final state)
 */
export interface TodoMachineOutput {
  todo: Todo
  finalState: TodoWorkflowState
}
