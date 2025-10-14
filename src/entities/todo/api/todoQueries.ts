/**
 * Todo Queries (Pinia Colada)
 *
 * Pinia Colada composables for todo data fetching.
 * Provides a Vue-native alternative to Vue Query with simpler API.
 */

import { useQuery } from '@pinia/colada'
import { toValue, type MaybeRefOrGetter } from 'vue'
import * as todoApi from './todoApi'

// Query keys - type-safe and consistent
export const todoQueriesKeys = {
  all: ['todos'] as const,
  list: ['todos', 'list'] as const,
  detail: (id: string) => ['todos', 'detail', id] as const,
  stats: ['todos', 'stats'] as const,
}

/**
 * Fetch all todos
 */
export function useTodos() {
  return useQuery({
    key: () => [...todoQueriesKeys.list],
    query: async () => {
      const response = await todoApi.fetchTodos()
      return response.data
    },
  })
}

/**
 * Fetch a single todo by ID
 */
export function useTodoById(id: MaybeRefOrGetter<string>) {
  return useQuery({
    key: () => [...todoQueriesKeys.detail(toValue(id))],
    query: async () => {
      const response = await todoApi.fetchTodoById(toValue(id))
      return response.data
    },
  })
}

/**
 * Fetch todo statistics
 */
export function useTodoStats() {
  return useQuery({
    key: () => [...todoQueriesKeys.stats],
    query: async () => {
      const response = await todoApi.fetchTodoStats()
      return response.data
    },
  })
}
