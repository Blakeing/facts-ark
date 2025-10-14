/**
 * Machine Factory
 *
 * Type-safe factory for creating state machines with common patterns.
 * Provides helpers for integrating with Vue, Pinia, and Pinia Colada.
 */

import { setup, type ActorOptions } from 'xstate'
import { getInspectConfig } from './utils/devtools'

/**
 * Base machine context with common fields
 */
export interface BaseMachineContext {
  error?: Error | string
  retryCount?: number
  timestamp?: string
}

/**
 * Create a machine with inspect enabled in development
 *
 * Wrapper around setup() that automatically enables inspection.
 *
 * @param config - Machine configuration
 * @returns Machine setup
 *
 * @example
 * ```ts
 * const machine = createMachine({
 *   types: {} as {
 *     context: { count: number }
 *     events: { type: 'INCREMENT' } | { type: 'DECREMENT' }
 *   },
 *   context: { count: 0 },
 *   initial: 'active',
 *   states: {
 *     active: {
 *       on: {
 *         INCREMENT: {
 *           actions: assign({ count: ({ context }) => context.count + 1 })
 *         }
 *       }
 *     }
 *   }
 * })
 * ```
 */
export function createMachine<
  TContext,
  TEvent extends { type: string },
  TActors = any,
  TActions = any,
  TGuards = any,
  TDelay = any,
>(
  config: Parameters<
    typeof setup<{
      context: TContext
      events: TEvent
      actors?: TActors
      actions?: TActions
      guards?: TGuards
      delays?: TDelay
    }>
  >[0],
) {
  return setup(config)
}

/**
 * Default actor options with inspection enabled
 *
 * Use this to create actors with consistent options.
 *
 * @param options - Additional actor options
 * @returns Actor options with inspection
 *
 * @example
 * ```ts
 * const actor = createActor(machine, getDefaultActorOptions())
 * ```
 */
export function getDefaultActorOptions<TInput = any>(
  options?: Partial<ActorOptions<any, any, TInput, any, any>>,
): Partial<ActorOptions<any, any, TInput, any, any>> {
  return {
    inspect: getInspectConfig(),
    ...options,
  }
}

/**
 * Create actor options with common patterns
 *
 * @param config - Configuration options
 * @returns Actor options
 *
 * @example
 * ```ts
 * const actor = createActor(
 *   machine,
 *   createActorOptions({
 *     input: { userId: '123' },
 *     onSnapshot: (snapshot) => console.log(snapshot),
 *     devtools: true
 *   })
 * )
 * ```
 */
export function createActorOptions<TInput = any>(config: {
  input?: TInput
  onSnapshot?: (snapshot: any) => void
  devtools?: boolean
}): Partial<ActorOptions<any, any, TInput, any, any>> {
  const options: Partial<ActorOptions<any, any, TInput, any, any>> = {}

  if (config.input !== undefined) {
    options.input = config.input
  }

  if (config.devtools !== false) {
    options.inspect = getInspectConfig()
  }

  return options
}

/**
 * Common machine patterns
 */
export const MachinePatterns = {
  /**
   * Loading state pattern
   */
  loading: {
    initial: 'idle' as const,
    states: {
      idle: {
        on: {
          LOAD: 'loading',
        },
      },
      loading: {
        on: {
          SUCCESS: 'success',
          ERROR: 'error',
        },
      },
      success: {
        on: {
          RELOAD: 'loading',
          RESET: 'idle',
        },
      },
      error: {
        on: {
          RETRY: 'loading',
          RESET: 'idle',
        },
      },
    },
  },

  /**
   * Form state pattern
   */
  form: {
    initial: 'editing' as const,
    states: {
      editing: {
        on: {
          SUBMIT: {
            target: 'validating',
          },
          RESET: {
            target: 'editing',
            reenter: true,
          },
        },
      },
      validating: {
        on: {
          VALID: 'submitting',
          INVALID: 'editing',
        },
      },
      submitting: {
        on: {
          SUCCESS: 'success',
          ERROR: 'error',
        },
      },
      success: {
        on: {
          NEW: 'editing',
        },
      },
      error: {
        on: {
          RETRY: 'validating',
          EDIT: 'editing',
        },
      },
    },
  },

  /**
   * Wizard/stepper pattern
   */
  wizard: (steps: string[]) => ({
    initial: steps[0],
    states: Object.fromEntries(
      steps.map((step, index) => [
        step,
        {
          on: {
            ...(index > 0 && { BACK: steps[index - 1] }),
            ...(index < steps.length - 1 && { NEXT: steps[index + 1] }),
            RESET: steps[0],
          },
        },
      ]),
    ),
  }),
}
