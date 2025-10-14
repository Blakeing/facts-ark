/**
 * Todo Lifecycle State Machine
 *
 * Manages the complete lifecycle of a todo item through various workflow states.
 * Demonstrates XState's power for handling complex entity state transitions.
 *
 * State Flow:
 * draft → pending → in_progress → review → completed → archived
 *                       ↓
 *                     blocked
 *
 * @see https://stately.ai/docs/machines
 */

import { assign, setup } from 'xstate'
import type { TodoMachineContext, TodoMachineEvent, TodoMachineInput } from './types'

/**
 * Todo lifecycle machine
 *
 * Manages todo workflow with guards, actions, and state transitions.
 */
export const todoLifecycleMachine = setup({
  types: {} as {
    context: TodoMachineContext
    events: TodoMachineEvent
    input: TodoMachineInput
  },
}).createMachine({
  /** Machine ID for debugging */
  id: 'todoLifecycle',

  /** Initial context */
  context: ({ input }: { input: TodoMachineInput }) => ({
    todo: input?.todo ?? null,
    error: undefined,
    blockedReason: undefined,
    reviewNotes: undefined,
    progress: 0,
    startedAt: undefined,
    blockedAt: undefined,
    reviewedAt: undefined,
    archivedAt: undefined,
  }),

  /** Initial state */
  initial: 'checkingInput',

  /** States definition */
  states: {
    /**
     * Entry state - determine initial state based on input
     */
    checkingInput: {
      always: [
        {
          guard: ({ context }: { context: TodoMachineContext }) => context.todo === null,
          target: 'draft',
        },
        {
          guard: ({ context }: { context: TodoMachineContext }) =>
            context.todo?.status === 'completed',
          target: 'completed',
        },
        {
          target: 'pending',
        },
      ],
    },

    /**
     * Draft - Todo is being created/edited
     */
    draft: {
      on: {
        CREATE: {
          target: 'pending',
          actions: assign({
            todo: ({ event }: { event: Extract<TodoMachineEvent, { type: 'CREATE' }> }) =>
              event.todo,
            error: undefined,
          }),
        },
        ERROR: {
          actions: assign({
            error: ({ event }: { event: Extract<TodoMachineEvent, { type: 'ERROR' }> }) =>
              event.error,
          }),
        },
      },
    },

    /**
     * Pending - Todo is active, waiting to be started
     */
    pending: {
      entry: assign({
        error: undefined,
      }),
      on: {
        START: {
          target: 'in_progress',
          actions: assign({
            startedAt: () => new Date().toISOString(),
            progress: 0,
          }),
        },
        ARCHIVE: {
          target: 'archived',
          actions: assign({
            archivedAt: () => new Date().toISOString(),
          }),
        },
        COMPLETE: {
          target: 'completed',
        },
      },
    },

    /**
     * In Progress - Todo is actively being worked on
     */
    in_progress: {
      on: {
        UPDATE_PROGRESS: {
          actions: assign({
            progress: ({
              event,
            }: {
              event: Extract<TodoMachineEvent, { type: 'UPDATE_PROGRESS' }>
            }) => Math.max(0, Math.min(100, event.progress)),
          }),
        },
        PAUSE: {
          target: 'pending',
        },
        BLOCK: {
          target: 'blocked',
          actions: assign({
            blockedAt: () => new Date().toISOString(),
            blockedReason: ({ event }: { event: Extract<TodoMachineEvent, { type: 'BLOCK' }> }) =>
              event.reason,
          }),
        },
        REQUEST_REVIEW: {
          target: 'review',
          guard: ({ context }: { context: TodoMachineContext }) => (context.progress ?? 0) >= 100,
          actions: assign({
            reviewedAt: () => new Date().toISOString(),
            reviewNotes: ({
              event,
            }: {
              event: Extract<TodoMachineEvent, { type: 'REQUEST_REVIEW' }>
            }) => event.notes,
          }),
        },
        COMPLETE: {
          target: 'completed',
          guard: ({ context }: { context: TodoMachineContext }) => (context.progress ?? 0) >= 100,
        },
      },
    },

    /**
     * Blocked - Todo is blocked by dependencies or issues
     */
    blocked: {
      on: {
        UNBLOCK: {
          target: 'in_progress',
          actions: assign({
            blockedReason: undefined,
            blockedAt: undefined,
          }),
        },
        PAUSE: {
          target: 'pending',
          actions: assign({
            blockedReason: undefined,
            blockedAt: undefined,
          }),
        },
      },
    },

    /**
     * Review - Todo is under review before completion
     */
    review: {
      on: {
        APPROVE: {
          target: 'completed',
        },
        REJECT: {
          target: 'in_progress',
          actions: assign({
            reviewNotes: ({ event }: { event: Extract<TodoMachineEvent, { type: 'REJECT' }> }) =>
              event.feedback,
            progress: 50, // Reset progress on rejection
          }),
        },
      },
    },

    /**
     * Completed - Todo is finished
     */
    completed: {
      on: {
        ARCHIVE: {
          target: 'archived',
          actions: assign({
            archivedAt: () => new Date().toISOString(),
          }),
        },
        RESTORE: {
          target: 'pending',
          actions: assign({
            progress: 0,
            startedAt: undefined,
            reviewedAt: undefined,
          }),
        },
      },
    },

    /**
     * Archived - Todo is archived (final state)
     */
    archived: {
      on: {
        RESTORE: {
          target: 'pending',
          actions: assign({
            archivedAt: undefined,
          }),
        },
      },
    },
  },
})

/**
 * Type helpers
 */
export type TodoLifecycleMachine = typeof todoLifecycleMachine
export type TodoLifecycleActor = ReturnType<
  typeof import('xstate').createActor<TodoLifecycleMachine>
>
export type TodoLifecycleSnapshot = ReturnType<TodoLifecycleActor['getSnapshot']>
