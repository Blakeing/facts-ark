/**
 * useTodoMachine
 *
 * Vue composable for using the todo lifecycle machine.
 * Provides reactive state and type-safe event sending.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useTodoMachine } from '@/entities/todo'
 *
 * const { state, send, can } = useTodoMachine({ todo })
 *
 * // Check current state
 * console.log(state.value) // 'pending' | 'in_progress' | etc.
 *
 * // Send events
 * send({ type: 'START' })
 * send({ type: 'UPDATE_PROGRESS', progress: 50 })
 *
 * // Check if transition is possible
 * if (can('COMPLETE')) {
 *   send({ type: 'COMPLETE' })
 * }
 * </script>
 * ```
 */

import { onMounted, onUnmounted, computed, type Ref, ref } from 'vue'
import { createActor } from 'xstate'
import { getDefaultActorOptions } from '@/shared/lib/machines'
import { todoLifecycleMachine } from './machines/todo-lifecycle.machine'
import type { TodoMachineInput, TodoMachineEvent, TodoWorkflowState } from './machines/types'
import type { Todo } from './types'

/**
 * Composable return type
 */
export interface UseTodoMachineReturn {
  /** Current state value */
  state: Ref<TodoWorkflowState>
  /** Full snapshot (for advanced use) */
  snapshot: Ref<
    ReturnType<ReturnType<typeof createActor<typeof todoLifecycleMachine>>['getSnapshot']>
  >
  /** Send event to machine */
  send: (event: TodoMachineEvent) => void
  /** Check if event can be sent (transition exists) */
  can: (eventType: TodoMachineEvent['type']) => boolean
  /** Current context */
  context: Ref<
    ReturnType<
      ReturnType<typeof createActor<typeof todoLifecycleMachine>>['getSnapshot']
    >['context']
  >
  /** Current todo */
  todo: Ref<Todo | null>
  /** Progress (0-100) */
  progress: Ref<number>
  /** Error if any */
  error: Ref<Error | string | undefined>
  /** Blocked reason if blocked */
  blockedReason: Ref<string | undefined>
  /** Is in specific state */
  isInState: (state: TodoWorkflowState) => boolean
  /** Is in any of the states */
  isInAnyState: (states: TodoWorkflowState[]) => boolean
  /** Convenience flags */
  isDraft: Ref<boolean>
  isPending: Ref<boolean>
  isInProgress: Ref<boolean>
  isBlocked: Ref<boolean>
  isInReview: Ref<boolean>
  isCompleted: Ref<boolean>
  isArchived: Ref<boolean>
}

/**
 * Use todo lifecycle machine
 *
 * @param input - Machine input (optional todo and initial state)
 * @returns Machine state and controls
 */
export function useTodoMachine(input?: TodoMachineInput): UseTodoMachineReturn {
  // Create actor with options
  const actor = createActor(todoLifecycleMachine, {
    ...getDefaultActorOptions(),
    input,
  })

  // Create reactive snapshot
  const snapshot = ref(actor.getSnapshot())

  // Start actor and subscribe to changes
  onMounted(() => {
    actor.start()
    actor.subscribe((snap) => {
      snapshot.value = snap
    })
  })

  // Stop actor on unmount
  onUnmounted(() => {
    actor.stop()
  })

  // Send events to actor
  function send(event: TodoMachineEvent) {
    actor.send(event)
  }

  // Extract state value
  const state = computed(() => snapshot.value.value as TodoWorkflowState)

  // Context shortcuts
  const context = computed(() => snapshot.value.context)
  const todo = computed(() => context.value.todo)
  const progress = computed(() => context.value.progress ?? 0)
  const error = computed(() => context.value.error)
  const blockedReason = computed(() => context.value.blockedReason)

  // Check if event can be sent
  function can(eventType: TodoMachineEvent['type']): boolean {
    // Get transitions for current state
    const transitions = snapshot.value.can({ type: eventType } as any)
    return transitions
  }

  // Check if in specific state
  function isInState(targetState: TodoWorkflowState): boolean {
    return state.value === targetState
  }

  // Check if in any of the states
  function isInAnyState(states: TodoWorkflowState[]): boolean {
    return states.includes(state.value)
  }

  // Convenience state flags
  const isDraft = computed(() => isInState('draft'))
  const isPending = computed(() => isInState('pending'))
  const isInProgress = computed(() => isInState('in_progress'))
  const isBlocked = computed(() => isInState('blocked'))
  const isInReview = computed(() => isInState('review'))
  const isCompleted = computed(() => isInState('completed'))
  const isArchived = computed(() => isInState('archived'))

  return {
    state,
    snapshot,
    send,
    can,
    context,
    todo,
    progress,
    error,
    blockedReason,
    isInState,
    isInAnyState,
    isDraft,
    isPending,
    isInProgress,
    isBlocked,
    isInReview,
    isCompleted,
    isArchived,
  }
}
