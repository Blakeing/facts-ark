import { setup, assign, fromPromise } from 'xstate'
import type { z } from 'zod'

export interface WizardStep<TSchema extends z.ZodType> {
  id: string
  schema: TSchema
  fields: string[]
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface WizardMachineConfig<TSteps extends WizardStep<any>[]> {
  steps: TSteps
  onComplete?: (data: any) => Promise<void>
}

/**
 * Factory for creating multi-step wizard form machines
 *
 * Creates a machine with:
 * - One state per step
 * - Step-by-step validation
 * - Back/Next navigation
 * - Final validation before submission
 *
 * Note: Uses 'any' types for flexibility in wizard configuration.
 * Type safety is maintained through Zod schemas at runtime.
 *
 * @example
 * const wizardMachine = createWizardMachine({
 *   steps: [
 *     { id: 'step1', schema: step1Schema, fields: ['title', 'category'] },
 *     { id: 'step2', schema: step2Schema, fields: ['description'] }
 *   ],
 *   onComplete: async (data) => {
 *     await api.submitWizard(data)
 *   }
 * })
 */
export function createWizardMachine<TSteps extends WizardStep<any>[]>(
  config: WizardMachineConfig<TSteps>,
) {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  // Generate states for each step
  const states = config.steps.reduce(
    (acc, step, index) => {
      const isLast = index === config.steps.length - 1
      const nextStep = config.steps[index + 1]
      const prevStep = config.steps[index - 1]

      acc[step.id] = {
        on: {
          UPDATE_FORM_DATA: {
            actions: 'updateFormData',
          },
          UPDATE_FORM_META: {
            // Receive meta updates from VeeValidate
          },
          NEXT: {
            target: isLast ? 'validating' : (nextStep?.id ?? 'validating'),
            actions: 'validateCurrentStep',
            guard: 'currentStepValid',
          },
          BACK:
            index > 0 && prevStep
              ? {
                  target: prevStep.id,
                }
              : undefined,
          SUBMIT: {
            target: 'validating',
          },
        },
      }

      return acc
    },
    {} as Record<string, any>,
  )

  const lastStep = config.steps[config.steps.length - 1]
  const lastStepId = lastStep?.id ?? config.steps[0]?.id ?? 'step1'

  // Add completion states
  states.validating = {
    entry: 'validateAllSteps',
    always: [{ target: 'submitting', guard: 'allStepsValid' }, { target: lastStepId }],
  }

  states.submitting = {
    invoke: {
      src: 'completeWizard',
      input: ({ context }: any) => context.formData,
      onDone: 'success',
      onError: {
        target: lastStepId,
        actions: 'setSubmitError',
      },
    },
  }

  states.success = {
    type: 'final' as const,
  }

  return setup({
    types: {
      context: {} as {
        formData: Record<string, any>
        errors: Record<string, string[]>
        currentStep: string
        submitError: string | null
      },
      events: {} as
        | { type: 'UPDATE_FORM_DATA'; data: Record<string, any> }
        | {
            type: 'UPDATE_FORM_META'
            meta: { dirty: boolean; touched: boolean; valid: boolean; pending: boolean }
          }
        | { type: 'NEXT' }
        | { type: 'BACK' }
        | { type: 'SUBMIT'; data: Record<string, any> }
        | { type: 'RESET' },
    },

    actions: {
      updateFormData: assign({
        formData: ({ context, event }) => ({
          ...context.formData,
          ...(event as any).data,
        }),
      }),

      validateCurrentStep: assign(({ context }) => {
        const currentStepConfig = config.steps.find((s) => s.id === context.currentStep)
        if (!currentStepConfig) return {}

        const stepData = currentStepConfig.fields.reduce(
          (acc, field) => {
            acc[field] = context.formData[field]
            return acc
          },
          {} as Record<string, any>,
        )

        const result = currentStepConfig.schema.safeParse(stepData)
        if (!result.success) {
          return {
            errors: result.error.flatten().fieldErrors as Record<string, string[]>,
          }
        }
        return { errors: {} }
      }),

      validateAllSteps: assign(({ context }) => {
        const allErrors: Record<string, string[]> = {}

        for (const step of config.steps) {
          const stepData = step.fields.reduce(
            (acc, field) => {
              acc[field] = context.formData[field]
              return acc
            },
            {} as Record<string, any>,
          )

          const result = step.schema.safeParse(stepData)
          if (!result.success) {
            const errors = result.error.flatten().fieldErrors as Record<string, string[]>
            Object.assign(allErrors, errors)
          }
        }

        return { errors: allErrors }
      }),

      setSubmitError: assign({
        submitError: ({ event }) => (event as any).error?.message || 'Submission failed',
      }),

      updateCurrentStep: assign({
        currentStep: (_assignArgs, params: { step: string }) => params.step,
      }),
    },

    guards: {
      currentStepValid: ({ context }) => Object.keys(context.errors).length === 0,
      allStepsValid: ({ context }) => {
        // Validate all steps
        return config.steps.every((step) => {
          const stepData = step.fields.reduce(
            (acc, field) => {
              acc[field] = context.formData[field]
              return acc
            },
            {} as Record<string, any>,
          )
          return step.schema.safeParse(stepData).success
        })
      },
    },

    actors: {
      completeWizard: fromPromise(async ({ input }: { input: Record<string, any> }) => {
        if (config.onComplete) {
          await config.onComplete(input)
        }
        return input
      }),
    },
  }).createMachine({
    id: 'wizardMachine',
    initial: config.steps[0]?.id ?? 'step1',
    context: {
      formData: {},
      errors: {},
      currentStep: config.steps[0]?.id ?? 'step1',
      submitError: null,
    },
    states,
  })
  /* eslint-enable @typescript-eslint/no-explicit-any */
}
