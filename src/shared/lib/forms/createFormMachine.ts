import { setup, assign, fromPromise } from 'xstate'
import type { z } from 'zod'

export interface FormMachineConfig<TSchema extends z.ZodType> {
  schema: TSchema
  initialData?: Partial<z.infer<TSchema>>
  onSubmit?: (data: z.infer<TSchema>) => Promise<void>
}

/**
 * Factory for creating standardized form state machines
 *
 * Creates a machine with standard states:
 * - idle: Form is ready for input
 * - validating: Validating form data
 * - submitting: Submitting to server
 * - success: Submission successful
 *
 * @example
 * const todoFormMachine = createFormMachine({
 *   schema: todoSchema,
 *   initialData: { priority: 'medium' },
 *   onSubmit: async (data) => {
 *     await api.createTodo(data)
 *   }
 * })
 */
export function createFormMachine<TSchema extends z.ZodType>(config: FormMachineConfig<TSchema>) {
  type FormData = z.infer<TSchema>

  return setup({
    types: {
      context: {} as {
        formData: FormData
        errors: Record<string, string[]>
        submitError: string | null
      },
      events: {} as
        | { type: 'UPDATE_FORM_DATA'; data: Partial<FormData> }
        | {
            type: 'UPDATE_FORM_META'
            meta: { dirty: boolean; touched: boolean; valid: boolean; pending: boolean }
          }
        | { type: 'SUBMIT'; data: FormData }
        | { type: 'RESET' },
    },

    actions: {
      updateFormData: assign({
        formData: ({ context, event }) => ({
          ...context.formData,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...(event as any).data,
        }),
      }),

      validateForm: assign(({ context }) => {
        const result = config.schema.safeParse(context.formData)
        if (!result.success) {
          return {
            errors: result.error.flatten().fieldErrors as Record<string, string[]>,
          }
        }
        return { errors: {} }
      }),

      clearErrors: assign({ errors: {}, submitError: null }),

      setSubmitError: assign({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        submitError: ({ event }) => (event as any).error?.message || 'Submission failed',
      }),

      resetForm: assign({
        formData: config.initialData || ({} as FormData),
        errors: {},
        submitError: null,
      }),
    },

    guards: {
      isValid: ({ context }) => Object.keys(context.errors).length === 0,
    },

    actors: {
      submitForm: fromPromise(async ({ input }: { input: FormData }) => {
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
      formData: config.initialData || ({} as FormData),
      errors: {},
      submitError: null,
    },

    states: {
      idle: {
        on: {
          UPDATE_FORM_DATA: {
            actions: ['updateFormData', 'validateForm'],
          },
          UPDATE_FORM_META: {
            // Just receive meta updates from VeeValidate
          },
          SUBMIT: {
            target: 'validating',
          },
        },
      },

      validating: {
        entry: 'validateForm',
        always: [{ target: 'submitting', guard: 'isValid' }, { target: 'idle' }],
      },

      submitting: {
        // @ts-expect-error - XState invoke input type inference issue
        invoke: {
          src: 'submitForm',
          input: ({
            context,
          }: {
            context: {
              formData: FormData
              errors: Record<string, string[]>
              submitError: string | null
            }
          }) => context.formData,
          onDone: {
            target: 'success',
            actions: 'clearErrors',
          },
          onError: {
            target: 'idle',
            actions: 'setSubmitError',
          },
        },
      },

      success: {
        after: {
          500: {
            // Auto-reset after 500ms to allow multiple submissions
            target: 'idle',
            actions: 'resetForm',
          },
        },
        on: {
          RESET: {
            target: 'idle',
            actions: 'resetForm',
          },
        },
      },
    },
  })
}
