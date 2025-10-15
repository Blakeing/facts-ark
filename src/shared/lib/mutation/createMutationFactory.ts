/**
 * Mutation Factory
 *
 * Factory pattern for creating consistent mutations with:
 * - Optimistic updates
 * - Error rollback
 * - Cache invalidation
 * - Toast notifications
 * - Consistent error handling
 *
 * @example
 * ```ts
 * const { mutate, isPending } = createMutationFactory({
 *   mutationFn: async (id) => await deleteTodo(id),
 *   optimisticUpdate: (cache, id) => {
 *     const prev = cache.getQueryData(['todos'])
 *     cache.setQueryData(['todos'], old => old.filter(t => t.id !== id))
 *     return prev
 *   },
 *   invalidateKeys: [['todos'], ['stats']],
 *   successToast: { title: 'Todo deleted' }
 * })
 * ```
 */

import { computed } from 'vue'
import { useMutation, useQueryCache } from '@pinia/colada'
import { useToast } from '@/shared/ui/toast'
import { QueryCacheFacade } from '@/shared/lib/cache'
import type {
  MutationFactoryConfig,
  MutationFactoryReturn,
  OptimisticContext,
} from './MutationConfig.types'

export function createMutationFactory<TData, TVariables, TError = Error>(
  config: MutationFactoryConfig<TData, TVariables, TError>,
): MutationFactoryReturn<TData, TVariables, TError> {
  const queryCache = useQueryCache()
  const cacheFacade = new QueryCacheFacade(queryCache)
  const { toast } = useToast()

  // Wrap mutation with promise toast if configured
  const wrappedMutationFn = config.loadingToast
    ? (variables: TVariables): Promise<TData> => {
        const loadingToastConfig = config.loadingToast!
        const promise = config.mutationFn(variables)

        // Show promise toast and unwrap to get actual promise
        toast.promise(promise, {
          loading: loadingToastConfig.loading,
          success: (data: TData) => {
            const msg = loadingToastConfig.success
            return typeof msg === 'function' ? msg(data) : msg
          },
          error: (error: TError) => {
            const msg = loadingToastConfig.error
            return typeof msg === 'function' ? msg(error) : msg
          },
        })

        // Return the original promise for Pinia Colada
        return promise
      }
    : config.mutationFn

  const mutation = useMutation({
    mutation: wrappedMutationFn,

    // Optimistic update with context preservation
    onMutate: async (variables: TVariables) => {
      let context: OptimisticContext | undefined

      // Perform optimistic update if provided
      if (config.optimisticUpdate) {
        const optimisticContext = config.optimisticUpdate(cacheFacade, variables)
        if (optimisticContext) {
          context = optimisticContext
        }
      }

      // Call additional onMutate handler
      if (config.onMutate) {
        await config.onMutate(variables)
      }

      return context
    },

    // Success handler with toast
    onSuccess: async (data: TData, variables: TVariables) => {
      // Call additional onSuccess handler
      if (config.onSuccess) {
        await config.onSuccess(data, variables)
      }

      // Show success toast (skip if using loadingToast)
      if (config.successToast && !config.loadingToast) {
        const toastConfig =
          typeof config.successToast === 'function'
            ? config.successToast(data, variables)
            : config.successToast

        toast.success(toastConfig.title, {
          description: toastConfig.description,
        })
      }
    },

    // Error handler with rollback and toast
    onError: async (error: TError | null, variables: TVariables, context?: unknown) => {
      const ctx = context as OptimisticContext | undefined

      // Execute rollback if provided
      if (ctx?.rollback) {
        await ctx.rollback()
      }

      // Call additional onError handler
      if (config.onError && error) {
        await config.onError(error, variables)
      }

      // Show error toast (skip if using loadingToast)
      if (config.errorToast && error && !config.loadingToast) {
        const toastConfig =
          typeof config.errorToast === 'function'
            ? config.errorToast(error, variables)
            : config.errorToast

        toast.error(toastConfig.title, {
          description: toastConfig.description,
        })
      }
    },

    // Settled handler with cache invalidation
    onSettled: async (
      data: TData | undefined,
      error: TError | null | undefined,
      variables: TVariables,
    ) => {
      // Call additional onSettled handler
      if (config.onSettled && error !== undefined) {
        await config.onSettled(data, error, variables)
      }

      // Invalidate specified query keys
      if (config.invalidateKeys) {
        await cacheFacade.invalidate(...config.invalidateKeys)
      }
    },
  })

  // Computed properties for mutation state
  const isPending = computed(() => mutation.asyncStatus.value === 'loading')
  const isError = computed(() => mutation.status.value === 'error')
  const isSuccess = computed(() => mutation.status.value === 'success')

  return {
    mutate: mutation.mutateAsync,
    isPending,
    isError,
    isSuccess,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}
