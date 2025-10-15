/**
 * Mutation Factory Types
 *
 * Type definitions for the mutation factory pattern.
 * Provides a consistent interface for creating mutations with optimistic updates.
 */

import type { QueryCacheFacade, QueryKey } from '@/shared/lib/cache'

/**
 * Toast notification configuration
 */
export interface ToastConfig {
  title: string
  description?: string
}

/**
 * Context returned from optimistic update for rollback
 */
export interface OptimisticContext<TData = unknown> {
  rollback?: () => void | Promise<void>
  data?: TData
}

/**
 * Optimistic update function
 */
export type OptimisticUpdateFn<TVariables, TData> = (
  cache: QueryCacheFacade,
  variables: TVariables,
) => OptimisticContext<TData> | void

/**
 * Configuration for creating a mutation with the factory
 */
export interface MutationFactoryConfig<TData, TVariables, TError = Error> {
  /**
   * The mutation function to execute
   */
  mutationFn: (variables: TVariables) => Promise<TData>

  /**
   * Query keys to invalidate after mutation settles
   */
  invalidateKeys?: QueryKey[]

  /**
   * Optional optimistic update function
   * Should return the previous data for rollback
   */
  optimisticUpdate?: OptimisticUpdateFn<TVariables, unknown>

  /**
   * Success toast configuration
   */
  successToast?: ToastConfig | ((data: TData, variables: TVariables) => ToastConfig)

  /**
   * Error toast configuration
   */
  errorToast?: ToastConfig | ((error: TError, variables: TVariables) => ToastConfig)

  /**
   * Promise-based loading toast (replaces successToast/errorToast)
   * When provided, shows loading → success/error toast progression
   *
   * ⚠️ Best Practice Guide:
   * - ✅ Use for non-optimistic operations (form submissions, create, etc.)
   * - ❌ Avoid with optimistic updates (toggle, delete, etc.)
   *
   * Why avoid with optimistic updates?
   * - UI already updated instantly (optimistic)
   * - Toast shows "Loading..." (UX mismatch!)
   * - Use silent pattern (errorToast only) or instant successToast instead
   *
   * @example
   * // Non-optimistic (form submission) ✅
   * {
   *   loadingToast: {
   *     loading: 'Creating todo...',
   *     success: 'Todo created!',
   *     error: 'Failed to create todo'
   *   }
   * }
   *
   * @example
   * // Optimistic - Silent pattern (recommended) ✅
   * {
   *   optimisticUpdate: (cache, id) => { ... },
   *   errorToast: {
   *     title: 'Failed to update',
   *     description: 'Changes have been reverted'
   *   }
   *   // No successToast, no loadingToast
   * }
   *
   * @example
   * // Optimistic - Instant confirmation (alternative) ✅
   * {
   *   optimisticUpdate: (cache, id) => { ... },
   *   successToast: { title: 'Updated!', description: 'Changes saved' },
   *   errorToast: { title: 'Failed', description: 'Changes reverted' }
   *   // No loadingToast
   * }
   */
  loadingToast?: {
    loading: string
    success: string | ((data: TData) => string)
    error: string | ((error: TError) => string)
  }

  /**
   * Additional onMutate handler (runs after optimistic update)
   */
  onMutate?: (variables: TVariables) => void | Promise<void>

  /**
   * Additional onSuccess handler (runs before toast)
   */
  onSuccess?: (data: TData, variables: TVariables) => void | Promise<void>

  /**
   * Additional onError handler (runs before toast)
   */
  onError?: (error: TError, variables: TVariables) => void | Promise<void>

  /**
   * Additional onSettled handler (runs before invalidation)
   */
  onSettled?: (
    data: TData | undefined,
    error: TError | null,
    variables: TVariables,
  ) => void | Promise<void>
}

/**
 * Return type from the mutation factory
 */
export interface MutationFactoryReturn<TData, TVariables, TError = Error> {
  /**
   * Execute the mutation
   */
  mutate: (variables: TVariables) => Promise<TData>

  /**
   * Is mutation currently pending
   */
  isPending: { value: boolean }

  /**
   * Is mutation in error state
   */
  isError: { value: boolean }

  /**
   * Is mutation successful
   */
  isSuccess: { value: boolean }

  /**
   * Current mutation error
   */
  error: { value: TError | null }

  /**
   * Mutation data
   */
  data: { value: TData | undefined }

  /**
   * Reset mutation state
   */
  reset: () => void
}
