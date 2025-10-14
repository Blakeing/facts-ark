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
