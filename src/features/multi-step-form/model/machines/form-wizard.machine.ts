/**
 * Form Wizard State Machine
 *
 * Multi-step form with validation, navigation, and submission.
 * Demonstrates complex workflow management with XState.
 *
 * Flow: step1 (Basic Info) → step2 (Details) → step3 (Additional) → review → submitting → success
 */

import { assign, setup } from 'xstate'
import type { FormWizardContext, FormWizardEvent, FormWizardInput } from './types'

/**
 * Form wizard machine
 */
export const formWizardMachine = setup({
  types: {} as {
    context: FormWizardContext
    events: FormWizardEvent
    input: FormWizardInput
  },
  guards: {
    /**
     * Check if basic info is complete
     */
    hasBasicInfo: ({ context }) => {
      return Boolean(context.formData.basicInfo?.title && context.formData.basicInfo?.category)
    },

    /**
     * Check if details are complete
     */
    hasDetails: ({ context }) => {
      return Boolean(context.formData.details?.description && context.formData.details?.priority)
    },

    /**
     * Check if on first step
     */
    isFirstStep: ({ context }) => {
      return context.currentStep === 1
    },

    /**
     * Check if on last step before review
     */
    isLastDataStep: ({ context }) => {
      return context.currentStep === context.totalSteps - 1 // -1 for review step
    },
  },
}).createMachine({
  id: 'formWizard',

  context: ({ input }: { input: FormWizardInput }) => ({
    formData: {
      basicInfo: input?.initialData?.basicInfo ?? null,
      details: input?.initialData?.details ?? null,
      additional: input?.initialData?.additional ?? null,
    },
    currentStep: input?.startStep ?? 1,
    totalSteps: 4, // step1, step2, step3, review
    error: undefined,
    validationErrors: undefined,
  }),

  initial: 'step1',

  states: {
    /**
     * Step 1: Basic Information
     */
    step1: {
      entry: assign({
        currentStep: 1,
        error: undefined,
        validationErrors: undefined,
      }),
      on: {
        UPDATE_BASIC_INFO: {
          actions: assign({
            formData: ({ context, event }) => ({
              ...context.formData,
              basicInfo: event.data,
            }),
            validationErrors: undefined,
          }),
        },
        NEXT: {
          target: 'step2',
          guard: 'hasBasicInfo',
        },
        VALIDATION_ERROR: {
          actions: assign({
            validationErrors: ({ event }) => event.errors,
          }),
        },
        RESET: {
          target: 'step1',
          reenter: true,
        },
      },
    },

    /**
     * Step 2: Details
     */
    step2: {
      entry: assign({
        currentStep: 2,
        error: undefined,
        validationErrors: undefined,
      }),
      on: {
        UPDATE_DETAILS: {
          actions: assign({
            formData: ({ context, event }) => ({
              ...context.formData,
              details: event.data,
            }),
            validationErrors: undefined,
          }),
        },
        NEXT: {
          target: 'step3',
          guard: 'hasDetails',
        },
        BACK: {
          target: 'step1',
        },
        VALIDATION_ERROR: {
          actions: assign({
            validationErrors: ({ event }) => event.errors,
          }),
        },
        GOTO_STEP: [
          {
            target: 'step1',
            guard: ({ event }) => event.step === 1,
          },
        ],
      },
    },

    /**
     * Step 3: Additional Information
     */
    step3: {
      entry: assign({
        currentStep: 3,
        error: undefined,
        validationErrors: undefined,
      }),
      on: {
        UPDATE_ADDITIONAL: {
          actions: assign({
            formData: ({ context, event }) => ({
              ...context.formData,
              additional: event.data,
            }),
            validationErrors: undefined,
          }),
        },
        NEXT: {
          target: 'review',
        },
        BACK: {
          target: 'step2',
        },
        GOTO_STEP: [
          {
            target: 'step1',
            guard: ({ event }) => event.step === 1,
          },
          {
            target: 'step2',
            guard: ({ event }) => event.step === 2,
          },
        ],
      },
    },

    /**
     * Review: Final review before submission
     */
    review: {
      entry: assign({
        currentStep: 4,
        error: undefined,
      }),
      on: {
        SUBMIT: {
          target: 'submitting',
        },
        BACK: {
          target: 'step3',
        },
        GOTO_STEP: [
          {
            target: 'step1',
            guard: ({ event }) => event.step === 1,
          },
          {
            target: 'step2',
            guard: ({ event }) => event.step === 2,
          },
          {
            target: 'step3',
            guard: ({ event }) => event.step === 3,
          },
        ],
      },
    },

    /**
     * Submitting: API call in progress
     */
    submitting: {
      on: {
        SUCCESS: {
          target: 'success',
        },
        ERROR: {
          target: 'error',
          actions: assign({
            error: ({ event }) => event.error,
          }),
        },
      },
    },

    /**
     * Success: Form submitted successfully
     */
    success: {
      type: 'final',
      entry: assign({
        currentStep: 5,
      }),
    },

    /**
     * Error: Submission failed
     */
    error: {
      on: {
        RETRY: {
          target: 'submitting',
          actions: assign({
            error: undefined,
          }),
        },
        BACK: {
          target: 'review',
          actions: assign({
            error: undefined,
          }),
        },
        RESET: {
          target: 'step1',
          reenter: true,
          actions: assign({
            error: undefined,
            formData: {
              basicInfo: null,
              details: null,
              additional: null,
            },
          }),
        },
      },
    },
  },
})

/**
 * Type helpers
 */
export type FormWizardMachine = typeof formWizardMachine
export type FormWizardActor = ReturnType<typeof import('xstate').createActor<FormWizardMachine>>
export type FormWizardSnapshot = ReturnType<FormWizardActor['getSnapshot']>
