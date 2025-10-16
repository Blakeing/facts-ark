import { useMutation, useQuery, useQueryCache } from '@pinia/colada'
import { computed } from 'vue'

export interface EntityHooks<TModel, TResult> {
  beforeSave?: (model: TModel) => Promise<void> | void
  afterSave?: (model: TModel, result: TResult) => Promise<void> | void
  beforeDelete?: (id: string) => Promise<void> | void
  afterDelete?: (id: string) => Promise<void> | void
}

export interface EntityApi<TModel, TResult, TListItem = TResult> {
  list: () => Promise<TListItem[]>
  get?: (id: string) => Promise<TResult>
  create: (data: TModel) => Promise<TResult>
  update: (id: string, data: TModel) => Promise<TResult>
  delete?: (id: string) => Promise<void>
}

export function useEntity<TModel, TResult, TListItem = TResult>(
  entityName: string,
  api: EntityApi<TModel, TResult, TListItem>,
  hooks?: EntityHooks<TModel, TResult>,
) {
  // Pinia Colada for queries (always)
  const queryKey = [entityName, 'list']
  const queryCache = useQueryCache()

  console.log('🚀 useEntity initialized:', { entityName, queryKey })

  const { data, status, error, refresh } = useQuery({
    key: queryKey,
    query: async () => {
      console.log('📡 Fetching data for:', entityName)
      try {
        const result = await api.list()
        console.log('✅ Fetch success:', entityName, result)
        return result
      } catch (err) {
        console.error('❌ Fetch error:', entityName, err)
        throw err
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Create mutation with lifecycle hooks
  const { mutate: createMutate, asyncStatus: createAsyncStatus } = useMutation({
    mutation: async (model: TModel) => {
      // beforeSave hook (if provided)
      if (hooks?.beforeSave) await hooks.beforeSave(model)

      // Perform API call
      const result = await api.create(model)

      // afterSave hook (if provided)
      if (hooks?.afterSave) await hooks.afterSave(model, result)

      return result
    },
    onSettled: async () => {
      // Invalidate and refetch the query
      await queryCache.invalidateQueries({ key: queryKey })
    },
  })

  // Update mutation with lifecycle hooks
  const { mutate: updateMutate, asyncStatus: updateAsyncStatus } = useMutation({
    mutation: async ({ id, model }: { id: string; model: TModel }) => {
      // beforeSave hook (if provided)
      if (hooks?.beforeSave) await hooks.beforeSave(model)

      // Perform API call
      const result = await api.update(id, model)

      // afterSave hook (if provided)
      if (hooks?.afterSave) await hooks.afterSave(model, result)

      return result
    },
    onSettled: async () => {
      // Invalidate and refetch the query
      await queryCache.invalidateQueries({ key: queryKey })
    },
  })

  // Delete mutation with lifecycle hooks
  const { mutate: deleteMutate, asyncStatus: deleteAsyncStatus } = useMutation({
    mutation: async (id: string) => {
      // beforeDelete hook (if provided)
      if (hooks?.beforeDelete) await hooks.beforeDelete(id)

      // Perform API call
      if (api.delete) await api.delete(id)

      // afterDelete hook (if provided)
      if (hooks?.afterDelete) await hooks.afterDelete(id)
    },
    onSettled: async () => {
      // Invalidate and refetch the query
      await queryCache.invalidateQueries({ key: queryKey })
    },
  })

  console.log('📊 Mutation statuses:', {
    entityName,
    createAsyncStatus: createAsyncStatus.value,
    updateAsyncStatus: updateAsyncStatus.value,
    deleteAsyncStatus: deleteAsyncStatus.value,
  })

  return {
    // Query state (Pinia Colada)
    data,
    status,
    error,
    refresh,
    isLoading: computed(() => status.value === 'pending'),
    isEmpty: computed(() => !data.value || data.value.length === 0),

    // Mutations (with automatic hooks)
    create: async (model: TModel) => {
      // @ts-expect-error - Pinia Colada mutation types are complex
      return await createMutate(model)
    },
    update: async (id: string, model: TModel) => {
      return await updateMutate({ id, model })
    },
    delete: api.delete
      ? async (id: string) => {
          await deleteMutate(id)
        }
      : undefined,

    // Mutation states
    isCreating: computed(() => createAsyncStatus.value === 'loading'),
    isUpdating: computed(() => updateAsyncStatus.value === 'loading'),
    isDeleting: computed(() => deleteAsyncStatus.value === 'loading'),
    isMutating: computed(
      () =>
        createAsyncStatus.value === 'loading' ||
        updateAsyncStatus.value === 'loading' ||
        deleteAsyncStatus.value === 'loading',
    ),
  }
}
