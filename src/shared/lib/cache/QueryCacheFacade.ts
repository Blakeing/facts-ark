/**
 * QueryCacheFacade
 *
 * Facade pattern that simplifies common query cache operations.
 * Provides a cleaner API over Pinia Colada's query cache manipulation.
 *
 * @example
 * ```ts
 * const cache = new QueryCacheFacade(queryCache)
 *
 * // Optimistic add
 * const prev = cache.optimisticAdd(['todos'], newTodo)
 *
 * // Optimistic update
 * cache.optimisticUpdate(['todos'], todo.id, { status: 'completed' })
 *
 * // Optimistic remove
 * cache.optimisticRemove(['todos'], todoId)
 *
 * // Rollback on error
 * cache.rollback(['todos'], prev)
 * ```
 */

import type { QueryCache } from '@pinia/colada'

/**
 * JSON-serializable value (matches Pinia Colada's JSONValue)
 */
type JSONPrimitive = string | number | boolean | null
type JSONValue = JSONPrimitive | JSONValue[] | { [key: string]: JSONValue }

/**
 * Entry key compatible with Pinia Colada
 */
type EntryKey = JSONValue[]

/**
 * Query key type (array or string)
 */
export type QueryKey = string | readonly (string | number | boolean | null)[]

/**
 * Type guard to check if a value is JSON serializable
 */
function isJSONValue(value: unknown): value is JSONValue {
  if (value === null) return true
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean')
    return true
  if (Array.isArray(value)) return value.every(isJSONValue)
  if (typeof value === 'object') {
    return Object.values(value).every(isJSONValue)
  }
  return false
}

/**
 * Convert a QueryKey to Pinia Colada's EntryKey format
 */
function toEntryKey(key: QueryKey): EntryKey {
  const normalized = Array.isArray(key) ? key : [key]

  // Validate that all elements are JSON-serializable
  if (!normalized.every(isJSONValue)) {
    throw new Error('Query key must contain only JSON-serializable values')
  }

  return normalized as EntryKey
}

/**
 * Predicate function for finding items
 */
export type ItemPredicate<T> = (item: T) => boolean

/**
 * Update function for modifying items
 */
export type ItemUpdater<T> = (item: T) => T

export class QueryCacheFacade {
  constructor(private readonly queryCache: QueryCache) {}

  /**
   * Get query data for a key
   */
  getData<T>(key: QueryKey): T | undefined {
    const entryKey = toEntryKey(key)
    return this.queryCache.getQueryData(entryKey) as T | undefined
  }

  /**
   * Set query data for a key
   */
  setData<T>(key: QueryKey, data: T | ((old: T | undefined) => T | undefined)): void {
    const entryKey = toEntryKey(key)
    this.queryCache.setQueryData(entryKey, data)
  }

  /**
   * Optimistically add an item to an array query
   * Returns the previous data for rollback
   */
  optimisticAdd<T extends { id: string | number }>(
    key: QueryKey,
    item: T,
    position: 'start' | 'end' = 'start',
  ): T[] | undefined {
    const previousData = this.getData<T[]>(key)

    this.setData<T[]>(key, (old) => {
      if (!old) return [item]
      return position === 'start' ? [item, ...old] : [...old, item]
    })

    return previousData
  }

  /**
   * Optimistically update an item in an array query
   * Returns the previous data for rollback
   */
  optimisticUpdate<T extends { id: string | number }>(
    key: QueryKey,
    id: string | number,
    updates: Partial<T> | ItemUpdater<T>,
  ): T[] | undefined {
    const previousData = this.getData<T[]>(key)

    this.setData<T[]>(key, (old) => {
      if (!old) return old

      return old.map((item) => {
        if (item.id !== id) return item

        if (typeof updates === 'function') {
          return updates(item)
        }

        return { ...item, ...updates }
      })
    })

    return previousData
  }

  /**
   * Optimistically remove an item from an array query
   * Returns the previous data for rollback
   */
  optimisticRemove<T extends { id: string | number }>(
    key: QueryKey,
    id: string | number,
  ): T[] | undefined {
    const previousData = this.getData<T[]>(key)

    this.setData<T[]>(key, (old) => {
      if (!old) return old
      return old.filter((item) => item.id !== id)
    })

    return previousData
  }

  /**
   * Optimistically filter items in an array query
   * Returns the previous data for rollback
   */
  optimisticFilter<T>(key: QueryKey, predicate: ItemPredicate<T>): T[] | undefined {
    const previousData = this.getData<T[]>(key)

    this.setData<T[]>(key, (old) => {
      if (!old) return old
      return old.filter(predicate)
    })

    return previousData
  }

  /**
   * Rollback query data to a previous state
   */
  rollback<T>(key: QueryKey, previousData: T | undefined): void {
    if (previousData !== undefined) {
      this.setData(key, previousData)
    }
  }

  /**
   * Invalidate one or more query keys
   */
  async invalidate(...keys: QueryKey[]): Promise<void> {
    for (const key of keys) {
      const entryKey = toEntryKey(key)
      await this.queryCache.invalidateQueries({ key: entryKey })
    }
  }

  /**
   * Invalidate all queries
   */
  async invalidateAll(): Promise<void> {
    await this.queryCache.invalidateQueries({})
  }

  /**
   * Clear query data for a key
   */
  clear(key: QueryKey): void {
    const entryKey = toEntryKey(key)
    this.queryCache.setQueryData(entryKey, undefined)
  }
}

/**
 * Create a QueryCacheFacade instance
 */
export function createQueryCacheFacade(queryCache: QueryCache): QueryCacheFacade {
  return new QueryCacheFacade(queryCache)
}
