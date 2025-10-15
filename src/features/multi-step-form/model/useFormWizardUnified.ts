import { useFormMachine, createWizardMachine } from '@/shared/lib/forms'
import {
  todoBasicInfoSchema,
  todoDetailsSchema,
  todoAdditionalSchema,
  todoSchema,
} from '@/entities/todo'
import { useToast } from '@/shared/ui'

/**
 * Unified wizard composable using XState + Zod + VeeValidate
 *
 * This replaces the old useFormWizard with the unified pattern.
 *
 * @example
 * const { form, state, send, isValid } = useFormWizardUnified()
 *
 * // In template:
 * <form @submit.prevent="handleSubmit">
 *   <div v-if="state.value.matches('step1')">
 *     <TextField name="title" label="Title" required />
 *     <SelectField name="category" label="Category" :items="[...]" />
 *     <Button @click="send({ type: 'NEXT' })">Next</Button>
 *   </div>
 * </form>
 */
export function useFormWizardUnified() {
  const { toast } = useToast()

  // Create wizard machine
  const machine = createWizardMachine({
    steps: [
      {
        id: 'step1',
        schema: todoBasicInfoSchema,
        fields: ['title', 'category'],
      },
      {
        id: 'step2',
        schema: todoDetailsSchema,
        fields: ['description', 'priority'],
      },
      {
        id: 'step3',
        schema: todoAdditionalSchema,
        fields: ['tags', 'notes'],
      },
    ],
    onComplete: async (data) => {
      console.log('Wizard complete:', data)
      // Use vue-sonner API: toast.success(title, { description })
      toast.success('Success!', {
        description: 'Wizard completed successfully!',
      })
    },
  })

  // Use unified form machine
  const formMachine = useFormMachine({
    schema: todoSchema,
    machine,
    initialValues: {
      status: 'draft' as const,
      priority: 'medium' as const,
      category: 'work' as const,
    },
  })

  return {
    ...formMachine,
    // Alias for clarity in wizard context
    isCompleting: formMachine.isSubmitting,
  }
}
