import { useFormMachine, createFormMachineWithMutation } from '@/shared/lib/forms'
import { contactSchema } from './contactSchema'

/**
 * Form composable for contact form
 *
 * Architecture:
 * - VeeValidate: Handles all field state and validation (via contactSchema)
 * - XState: Orchestrates submission flow only
 * - Mutation factory: Handles API calls and toast notifications
 *
 * Features:
 * - Auto-resets after successful submission
 * - Shows success/error toasts
 * - Simulates API submission
 *
 * @example
 * const { form, handleSubmit, isSubmitting, state } = useContactForm()
 *
 * // In template:
 * <form @submit="handleSubmit">
 *   <TextField name="name" label="Name" required />
 *   <TextField name="email" label="Email" type="email" required />
 *   <Button type="submit" :disabled="!isValid || isSubmitting">
 *     Send Message
 *   </Button>
 * </form>
 */
export function useContactForm() {
  // Create submission machine with integrated mutation factory
  const { machine } = createFormMachineWithMutation({
    mutationFn: async (values) => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log('Contact form submitted:', values)
      return { success: true, ...values }
    },
    // No queries to invalidate for contact form
    invalidateKeys: [],
    // Promise-based toast for instant feedback during submission
    loadingToast: {
      loading: 'Sending message...',
      success: 'Message sent successfully!',
      error: 'Failed to send message',
    },
  })

  // Use unified form machine with VeeValidate integration
  const formMachine = useFormMachine({
    schema: contactSchema,
    machine,
    initialValues: {},
  })

  return {
    ...formMachine,
    // Alias for convenience
    isSending: formMachine.isSubmitting,
  }
}
