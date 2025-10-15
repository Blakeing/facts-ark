import { setup, assign, fromPromise } from 'xstate'

export interface FormMachineConfig {
  onSubmit?: (data: unknown) => Promise<void>
}

/**
 * Factory for creating standardized form submission state machines
 *
 * This machine only orchestrates the submission flow, NOT form data or validation.
 * VeeValidate handles all field-level state and validation.
 *
 * Creates a machine with standard states:
 * - idle: Ready to submit
 * - submitting: Submitting to server
 * - success: Submission successful
 * - error: Submission failed
 *
 * @example
 * const submissionMachine = createFormMachine({
 *   onSubmit: async (data) => {
 *     await api.createTodo(data)
 *   }
 * })
 */
export function createFormMachine(config: FormMachineConfig) {
  return setup({
    types: {
      context: {} as {
        submitError: string | null
      },
      events: {} as { type: 'SUBMIT'; data: unknown } | { type: 'RESET' },
    },

    actions: {
      clearError: assign({ submitError: null }),

      setSubmitError: assign({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        submitError: ({ event }) => (event as any).error?.message || 'Submission failed',
      }),
    },

    actors: {
      submitForm: fromPromise(async ({ input }: { input: unknown }) => {
        if (config.onSubmit) {
          await config.onSubmit(input)
        }
        return input
      }),
    },
  }).createMachine({
    id: 'formMachine',
    initial: 'idle',
    context: {
      submitError: null,
    },

    states: {
      idle: {
        on: {
          SUBMIT: {
            target: 'submitting',
          },
        },
      },

      submitting: {
        entry: 'clearError',
        invoke: {
          src: 'submitForm',
          input: ({ event }: { event: { type: 'SUBMIT'; data: unknown } }) => event.data,
          onDone: {
            target: 'success',
          },
          onError: {
            target: 'error',
            actions: 'setSubmitError',
          },
        },
      },

      success: {
        after: {
          500: {
            // Auto-transition back to idle after brief success state
            target: 'idle',
          },
        },
        on: {
          RESET: {
            target: 'idle',
          },
        },
      },

      error: {
        on: {
          SUBMIT: {
            target: 'submitting',
          },
          RESET: {
            target: 'idle',
            actions: 'clearError',
          },
        },
      },
    },
  })
}
