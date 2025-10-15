import { useWizard } from '@/shared/lib/forms'
import { todoSchema } from '@/entities/todo'
import { useToast } from '@/shared/ui'

/**
 * Wizard composable using lightweight VeeValidate-based wizard
 *
 * This uses the new simplified wizard pattern - no XState complexity,
 * just VeeValidate for validation and simple step navigation.
 *
 * @example
 * const { form, currentStepId, next, back, handleComplete, canGoNext } = useFormWizardUnified()
 *
 * // In template:
 * <form @submit.prevent="handleComplete">
 *   <div v-if="currentStepId === 'step1'">
 *     <TextField name="title" label="Title" required />
 *     <SelectField name="category" label="Category" :items="[...]" />
 *     <Button @click="next" :disabled="!canGoNext">Next</Button>
 *   </div>
 * </form>
 */
export function useFormWizardUnified() {
  const { toast } = useToast()

  // Use lightweight wizard composable
  const wizard = useWizard({
    schema: todoSchema,
    steps: [
      {
        id: 'step1',
        fields: ['title', 'category'],
      },
      {
        id: 'step2',
        fields: ['description', 'priority'],
      },
      {
        id: 'step3',
        fields: ['tags', 'notes'],
      },
    ],
    initialValues: {
      status: 'draft' as const,
      priority: 'medium' as const,
      category: 'work' as const,
    },
    onComplete: async (data) => {
      console.log('Wizard complete:', data)
      // Use vue-sonner API: toast.success(title, { description })
      toast.success('Success!', {
        description: 'Wizard completed successfully!',
      })
    },
  })

  return {
    ...wizard,
    // Alias for clarity in wizard context
    isCompleting: false, // No submission state in simple wizard
  }
}
