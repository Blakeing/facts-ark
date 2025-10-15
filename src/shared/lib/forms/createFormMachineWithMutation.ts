/**
 * Form Machine with Mutation Factory Integration
 *
 * Combines XState form submission machine with Pinia Colada mutation factory
 * for automatic query invalidation, optimistic updates, and error handling.
 *
 * Note: This only handles submission flow. VeeValidate handles validation and field state.
 *
 * @example
 * ```ts
 * const { machine, mutation } = createFormMachineWithMutation({
 *   mutationFn: async (data) => {
 *     const response = await createTodo(data)
 *     return response.data
 *   },
 *   invalidateKeys: [todoKeys.list, todoKeys.stats],
 *   loadingToast: {
 *     loading: 'Creating todo...',
 *     success: 'Todo created!',
 *     error: 'Failed to create todo'
 *   }
 * })
 * ```
 */

import { createFormMachine } from './createFormMachine'
import { createMutationFactory } from '../mutation'
import type { QueryKey } from '@/shared/lib/cache'
import type { OptimisticUpdateFn, ToastConfig } from '../mutation/MutationConfig.types'

export interface FormMachineWithMutationConfig<TData, TResponse> {
  /**
   * Mutation function to execute on form submission
   */
  mutationFn: (data: TData) => Promise<TResponse>

  /**
   * Query keys to invalidate after successful mutation
   */
  invalidateKeys: QueryKey[]

  /**
   * Optional optimistic update function
   */
  optimisticUpdate?: OptimisticUpdateFn<TData, TResponse>

  /**
   * Success toast configuration (optional if using loadingToast)
   */
  successToast?: ToastConfig | ((data: TResponse, variables: TData) => ToastConfig)

  /**
   * Error toast configuration (optional if using loadingToast)
   */
  errorToast?: ToastConfig | ((error: Error, variables: TData) => ToastConfig)

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
  onSuccess?: (data: TResponse, variables: TData) => void | Promise<void>

  /**
   * Additional onError handler
   */
  onError?: (error: Error, variables: TData) => void | Promise<void>
}

/**
 * Creates a form submission machine integrated with mutation factory
 *
 * This provides:
 * - Submission flow orchestration (idle → submitting → success/error)
 * - Automatic query invalidation on success
 * - Optimistic updates with rollback on error
 * - Toast notifications
 * - Unified error handling
 *
 * Note: Form validation and field state are handled by VeeValidate.
 */
export function createFormMachineWithMutation<TData = unknown, TResponse = unknown>(
  config: FormMachineWithMutationConfig<TData, TResponse>,
) {
  // Create mutation with factory
  const mutation = createMutationFactory<TResponse, TData, Error>({
    mutationFn: config.mutationFn,
    invalidateKeys: config.invalidateKeys,
    optimisticUpdate: config.optimisticUpdate,
    successToast: config.successToast,
    errorToast: config.errorToast,
    loadingToast: config.loadingToast,
    onSuccess: config.onSuccess,
    onError: config.onError,
  })

  // Create form submission machine that uses the mutation
  const machine = createFormMachine({
    onSubmit: async (data: unknown) => {
      // Execute mutation which handles invalidation, toasts, etc.
      await mutation.mutate(data as TData)
    },
  })

  return {
    machine,
    mutation,
  }
}
