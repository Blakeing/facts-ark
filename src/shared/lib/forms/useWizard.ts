import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { z } from 'zod'

export interface WizardStep {
  id: string
  fields: string[]
}

export interface UseWizardOptions<TSchema extends z.ZodType> {
  schema: TSchema
  steps: WizardStep[]
  onComplete?: (values: z.infer<TSchema>) => void | Promise<void>
  initialValues?: Partial<z.infer<TSchema>>
}

/**
 * Lightweight wizard composable using VeeValidate for field state
 *
 * This replaces the complex XState wizard machine with a simple Vue composable.
 * VeeValidate handles all validation and field state, while this composable
 * manages step navigation and completion logic.
 *
 * @example
 * const { form, currentStep, next, back, handleComplete, canGoNext } = useWizard({
 *   schema: todoSchema,
 *   steps: [
 *     { id: 'step1', fields: ['title', 'category'] },
 *     { id: 'step2', fields: ['description', 'priority'] }
 *   ],
 *   onComplete: async (data) => {
 *     await api.submitWizard(data)
 *   }
 * })
 *
 * // In template:
 * <div v-if="currentStepId === 'step1'">
 *   <TextField name="title" label="Title" />
 *   <Button @click="next" :disabled="!canGoNext">Next</Button>
 * </div>
 */
export function useWizard<TSchema extends z.ZodType>(options: UseWizardOptions<TSchema>) {
  const form = useForm({
    validationSchema: toTypedSchema(options.schema),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialValues: options.initialValues as any,
  })

  const currentStepIndex = ref(0)

  const currentStep = computed(() => options.steps[currentStepIndex.value])
  const currentStepId = computed(() => currentStep.value?.id ?? '')
  const isFirstStep = computed(() => currentStepIndex.value === 0)
  const isLastStep = computed(() => currentStepIndex.value === options.steps.length - 1)

  // Check if current step fields are valid
  const canGoNext = computed(() => {
    if (!currentStep.value) return false

    const stepFields = currentStep.value.fields
    // Check if all fields for this step are valid (no errors)
    return stepFields.every((field) => !form.errors.value[field])
  })

  const next = () => {
    if (!canGoNext.value) return
    if (isLastStep.value) return

    currentStepIndex.value++
  }

  const back = () => {
    if (isFirstStep.value) return
    currentStepIndex.value--
  }

  const goToStep = (stepId: string) => {
    const index = options.steps.findIndex((s) => s.id === stepId)
    if (index !== -1) {
      currentStepIndex.value = index
    }
  }

  const handleComplete = form.handleSubmit(async (values) => {
    await options.onComplete?.(values)
  })

  // Progress tracking
  const progress = computed(() => {
    return ((currentStepIndex.value + 1) / options.steps.length) * 100
  })

  return {
    // Form API
    form,
    handleComplete,

    // Step navigation
    currentStep,
    currentStepId,
    currentStepIndex: computed(() => currentStepIndex.value),
    totalSteps: options.steps.length,

    // Navigation actions
    next,
    back,
    goToStep,

    // Navigation state
    canGoNext,
    canGoBack: computed(() => !isFirstStep.value),
    isFirstStep,
    isLastStep,

    // Progress
    progress,

    // Field helpers for current step
    currentStepFields: computed(() => currentStep.value?.fields ?? []),
    isCurrentStepValid: canGoNext,

    // Convenience re-exports from form
    values: computed(() => form.values as z.infer<TSchema>),
    errors: computed(() => form.errors.value),
    meta: computed(() => form.meta.value),
    isValid: computed(() => form.meta.value.valid),
    setFieldValue: form.setFieldValue,
    resetForm: form.resetForm,
  }
}
