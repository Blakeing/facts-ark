import { vi } from 'vitest'
import { ref, computed, type Ref } from 'vue'

type CacheUpdater<T> = (current: T | undefined) => T | undefined

interface MockQueryCacheOptions<TData> {
  initialData?: TData
}

export function createMockQueryCache<TData>({ initialData }: MockQueryCacheOptions<TData> = {}) {
  const store = new Map<string, Ref<TData | undefined>>()

  if (initialData !== undefined) {
    store.set('todos-list', ref(initialData))
  }

  return {
    getQueryData: vi.fn((key: string[]) => {
      const entry = store.get(key.join('-'))
      return entry?.value
    }),
    setQueryData: vi.fn((key: string[], updater: CacheUpdater<TData>) => {
      const cacheKey = key.join('-')
      const entry = store.get(cacheKey) ?? ref<TData | undefined>(undefined)
      entry.value = updater(entry.value)
      store.set(cacheKey, entry)
      return entry.value
    }),
    invalidateQueries: vi.fn(),
    clear: () => store.clear(),
  }
}

interface MockMutationOptions<TData, TVariables> {
  mutation?: (variables: TVariables) => Promise<TData>
  onMutate?: (variables: TVariables) => Promise<unknown> | unknown
  onError?: (error: unknown, variables: TVariables, context: unknown) => void
  onSettled?: () => void
}

export function createMockMutationFactory<TData, TVariables>() {
  return (options: MockMutationOptions<TData, TVariables> = {}) => {
    const asyncStatus = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
    const status = computed(() => asyncStatus.value)
    const error = ref<unknown>(null)

    const mutateAsync = vi.fn(async (variables: TVariables) => {
      asyncStatus.value = 'loading'
      try {
        const _context = (await options.onMutate?.(variables)) ?? {}
        const result = await options.mutation?.(variables)
        asyncStatus.value = 'success'
        await options.onSettled?.()
        return result
      } catch (err) {
        error.value = err
        asyncStatus.value = 'error'
        await options.onError?.(err, variables, {})
        await options.onSettled?.()
        throw err
      }
    })

    return {
      asyncStatus,
      status,
      error,
      mutateAsync,
    }
  }
}

export function createMockToast() {
  return {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
  }
}
