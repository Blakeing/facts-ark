/**
 * Form Machine with Mutation Factory Integration
 *
 * Combines XState form machine with Pinia Colada mutation factory
 * for automatic query invalidation, optimistic updates, and error handling.
 *
 * @example
 * ```ts
 * const { machine, mutation } = createFormMachineWithMutation({
 *   schema: todoSchema,
 *   initialData: { priority: 'medium' },
 *   mutationFn: async (data) => {
 *     const response = await createTodo(data)
 *     return response.data
 *   },
 *   invalidateKeys: [todoKeys.list, todoKeys.stats],
 *   successToast: { title: 'Todo created!' },
 *   errorToast: { title: 'Failed to create todo' },
 * })
 * ```
 */

import type { z } from 'zod'
import { createFormMachine } from './createFormMachine'
import { createMutationFactory } from '../mutation'
import type { QueryKey } from '@/shared/lib/cache'
import type { OptimisticUpdateFn, ToastConfig } from '../mutation/MutationConfig.types'

export interface FormMachineWithMutationConfig<TSchema extends z.ZodType, TResponse> {
  /**
   * Zod schema for form validation
   */
  schema: TSchema

  /**
   * Initial form data
   */
  initialData?: Partial<z.infer<TSchema>>

  /**
   * Mutation function to execute on form submission
   */
  mutationFn: (data: z.infer<TSchema>) => Promise<TResponse>

  /**
   * Query keys to invalidate after successful mutation
   */
  invalidateKeys: QueryKey[]

  /**
   * Optional optimistic update function
   */
  optimisticUpdate?: OptimisticUpdateFn<z.infer<TSchema>, TResponse>

  /**
   * Success toast configuration (optional if using loadingToast)
   */
  successToast?: ToastConfig | ((data: TResponse, variables: z.infer<TSchema>) => ToastConfig)

  /**
   * Error toast configuration (optional if using loadingToast)
   */
  errorToast?: ToastConfig | ((error: Error, variables: z.infer<TSchema>) => ToastConfig)

  /**
   * Promise-based loading toast (replaces successToast/errorToast)
   * When provided, shows loading → success/error toast progression
   */
  loadingToast?: {
    loading: string
    success: string | ((data: TResponse) => string)
    error: string | ((error: Error) => string)
  }

  /**
   * Additional onSuccess handler
   */
  onSuccess?: (data: TResponse, variables: z.infer<TSchema>) => void | Promise<void>

  /**
   * Additional onError handler
   */
  onError?: (error: Error, variables: z.infer<TSchema>) => void | Promise<void>
}

/**
 * Creates a form machine integrated with mutation factory
 *
 * This provides:
 * - Automatic query invalidation on success
 * - Optimistic updates with rollback on error
 * - Toast notifications
 * - Form auto-reset after success
 * - Unified error handling
 */
export function createFormMachineWithMutation<TSchema extends z.ZodType, TResponse>(
  config: FormMachineWithMutationConfig<TSchema, TResponse>,
) {
  type FormData = z.infer<TSchema>

  // Create mutation with factory
  const mutation = createMutationFactory<TResponse, FormData, Error>({
    mutationFn: config.mutationFn,
    invalidateKeys: config.invalidateKeys,
    optimisticUpdate: config.optimisticUpdate,
    successToast: config.successToast,
    errorToast: config.errorToast,
    loadingToast: config.loadingToast,
    onSuccess: config.onSuccess,
    onError: config.onError,
  })

  // Create form machine that uses the mutation
  const machine = createFormMachine({
    schema: config.schema,
    initialData: config.initialData,
    onSubmit: async (data: FormData) => {
      // Execute mutation which handles invalidation, toasts, etc.
      await mutation.mutate(data)
    },
  })

  return {
    machine,
    mutation,
  }
}
