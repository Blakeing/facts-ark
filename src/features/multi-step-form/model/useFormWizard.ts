/**
 * useFormWizard
 *
 * Vue composable for the form wizard machine.
 * Demonstrates integration with Pinia Colada for API submission.
 *
 * @example
 * ```vue
 * <script setup>
 * import { useFormWizard } from '@/features/multi-step-form'
 *
 * const wizard = useFormWizard()
 *
 * function handleNext() {
 *   if (wizard.canGoNext.value) {
 *     wizard.next()
 *   }
 * }
 * </script>
 * ```
 */

import { onMounted, onUnmounted, computed, type Ref, ref } from 'vue'
import { createActor } from 'xstate'
import { getDefaultActorOptions } from '@/shared/lib/machines'
import { formWizardMachine } from './machines/form-wizard.machine'
import type {
  FormWizardInput,
  FormWizardEvent,
  FormWizardContext,
  BasicInfoData,
  DetailsData,
  AdditionalData,
} from './machines/types'

/**
 * State union type
 */
type WizardState = 'step1' | 'step2' | 'step3' | 'review' | 'submitting' | 'success' | 'error'

/**
 * Composable return type
 */
export interface UseFormWizardReturn {
  /** Current state */
  state: Ref<WizardState>
  /** Full snapshot */
  snapshot: Ref<ReturnType<ReturnType<typeof createActor<typeof formWizardMachine>>['getSnapshot']>>
  /** Send event */
  send: (event: FormWizardEvent) => void
  /** Current context */
  context: Ref<FormWizardContext>
  /** Current step number */
  currentStep: Ref<number>
  /** Total steps */
  totalSteps: Ref<number>
  /** Progress percentage */
  progress: Ref<number>
  /** Form data */
  formData: Ref<FormWizardContext['formData']>
  /** Error if any */
  error: Ref<Error | string | undefined>
  /** Validation errors */
  validationErrors: Ref<Record<string, string> | undefined>

  // Navigation
  /** Go to next step */
  next: () => void
  /** Go to previous step */
  back: () => void
  /** Go to specific step */
  goToStep: (step: number) => void
  /** Submit form */
  submit: () => void
  /** Reset wizard */
  reset: () => void

  // Update methods
  /** Update basic info */
  updateBasicInfo: (data: BasicInfoData) => void
  /** Update details */
  updateDetails: (data: DetailsData) => void
  /** Update additional data */
  updateAdditional: (data: AdditionalData) => void

  // State checks
  /** Can go to next step */
  canGoNext: Ref<boolean>
  /** Can go back */
  canGoBack: Ref<boolean>
  /** Is on first step */
  isFirstStep: Ref<boolean>
  /** Is on last step */
  isLastStep: Ref<boolean>
  /** Is submitting */
  isSubmitting: Ref<boolean>
  /** Is success */
  isSuccess: Ref<boolean>
  /** Is error */
  isError: Ref<boolean>
  /** Is on review step */
  isReview: Ref<boolean>
}

/**
 * Use form wizard
 */
export function useFormWizard(input?: FormWizardInput): UseFormWizardReturn {
  // Create actor
  const actor = createActor(formWizardMachine, {
    ...getDefaultActorOptions(),
    input,
  })

  // Create reactive snapshot
  const snapshot = ref(actor.getSnapshot())

  // Start/stop lifecycle
  onMounted(() => {
    actor.start()
    actor.subscribe((snap) => {
      snapshot.value = snap
    })
  })

  onUnmounted(() => {
    actor.stop()
  })

  // Send events to actor
  function send(event: FormWizardEvent) {
    actor.send(event)
  }

  // Extract state and context
  const state = computed(() => snapshot.value.value as WizardState)
  const context = computed(() => snapshot.value.context)

  // Context shortcuts
  const currentStep = computed(() => context.value.currentStep)
  const totalSteps = computed(() => context.value.totalSteps)
  const progress = computed(() => Math.round((currentStep.value / totalSteps.value) * 100))
  const formData = computed(() => context.value.formData)
  const error = computed(() => context.value.error)
  const validationErrors = computed(() => context.value.validationErrors)

  // Navigation methods
  function next() {
    send({ type: 'NEXT' })
  }

  function back() {
    send({ type: 'BACK' })
  }

  function goToStep(step: number) {
    send({ type: 'GOTO_STEP', step })
  }

  function submit() {
    send({ type: 'SUBMIT' })
  }

  function reset() {
    send({ type: 'RESET' })
  }

  // Update methods
  function updateBasicInfo(data: BasicInfoData) {
    send({ type: 'UPDATE_BASIC_INFO', data })
  }

  function updateDetails(data: DetailsData) {
    send({ type: 'UPDATE_DETAILS', data })
  }

  function updateAdditional(data: AdditionalData) {
    send({ type: 'UPDATE_ADDITIONAL', data })
  }

  // State checks
  const canGoNext = computed(() => {
    return snapshot.value.can({ type: 'NEXT' })
  })

  const canGoBack = computed(() => {
    return snapshot.value.can({ type: 'BACK' })
  })

  const isFirstStep = computed(() => currentStep.value === 1)
  const isLastStep = computed(() => state.value === 'review')
  const isSubmitting = computed(() => state.value === 'submitting')
  const isSuccess = computed(() => state.value === 'success')
  const isError = computed(() => state.value === 'error')
  const isReview = computed(() => state.value === 'review')

  return {
    state,
    snapshot,
    send,
    context,
    currentStep,
    totalSteps,
    progress,
    formData,
    error,
    validationErrors,
    next,
    back,
    goToStep,
    submit,
    reset,
    updateBasicInfo,
    updateDetails,
    updateAdditional,
    canGoNext,
    canGoBack,
    isFirstStep,
    isLastStep,
    isSubmitting,
    isSuccess,
    isError,
    isReview,
  }
}
