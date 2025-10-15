import { useFormMachine, createFormMachineWithMutation } from '@/shared/lib/forms'
import { todoSchema, todoQueriesKeys } from '@/entities/todo'
import { createTodo } from '@/entities/todo'

/**
 * Unified form composable for creating todos
 *
 * Uses:
 * - Zod schema for validation (todoSchema)
 * - XState machine for state management
 * - VeeValidate for UI integration
 * - Mutation factory for automatic query invalidation
 *
 * Features:
 * - Auto-resets after successful submission
 * - Automatically invalidates todo queries
 * - Shows success/error toasts
 * - Optimized for multiple submissions
 *
 * @example
 * const { form, handleSubmit, isCreating, state } = useCreateTodo()
 *
 * // In template:
 * <form @submit="handleSubmit">
 *   <TextField name="title" label="Title" required />
 *   <Button type="submit" :disabled="!form.meta.value.valid || isCreating">
 *     Create Todo
 *   </Button>
 * </form>
 */
export function useCreateTodo() {
  // Create form machine with integrated mutation factory
  const { machine } = createFormMachineWithMutation({
    schema: todoSchema,
    initialData: {
      status: 'draft' as const,
      priority: 'medium' as const,
      category: 'work' as const,
    },
    mutationFn: async (values) => {
      const response = await createTodo({
        title: values.title,
        description: values.description,
      })
      return response.data
    },
    // Automatically invalidate queries on success
    // Note: Stats are computed from todos list, so only need to invalidate list
    invalidateKeys: [todoQueriesKeys.list],
    // Promise-based toast for better UX (shows loading → success/error)
    loadingToast: {
      loading: 'Creating todo...',
      success: 'Todo created successfully!',
      error: 'Failed to create todo',
    },
  })

  // Use unified form machine with VeeValidate integration
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
    // Alias for convenience
    isCreating: formMachine.isSubmitting,
  }
}
