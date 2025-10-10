/**
 * Todo Queries (Pinia Colada)
 *
 * Pinia Colada composables for todo data fetching.
 * Provides a Vue-native alternative to Vue Query with simpler API.
 */

import { useQuery, useMutation, useQueryCache } from '@pinia/colada'
import type { MaybeRefOrGetter } from 'vue'
import { toValue } from 'vue'
import * as todoApi from './todoApi'
import type { CreateTodoDto, UpdateTodoDto } from '../model/types'

// Query keys
export const todoQueriesKeys = {
  all: 'todos',
  list: 'todos-list',
  detail: (id: string) => `todos-detail-${id}`,
  stats: 'todos-stats',
}

/**
 * Fetch all todos
 */
export function useTodos() {
  return useQuery({
    key: () => [todoQueriesKeys.list],
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
    key: () => [todoQueriesKeys.detail(toValue(id))],
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
    key: () => [todoQueriesKeys.stats],
    query: async () => {
      const response = await todoApi.fetchTodoStats()
      return response.data
    },
  })
}

/**
 * Create a new todo
 */
export function useCreateTodo() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: async (dto: CreateTodoDto) => {
      const response = await todoApi.createTodo(dto)
      return response.data
    },
    onSettled: () => {
      // Invalidate todos list
      queryCache.invalidateQueries({ key: [todoQueriesKeys.list] })
      queryCache.invalidateQueries({ key: [todoQueriesKeys.stats] })
    },
  })
}

/**
 * Update a todo
 */
export function useUpdateTodo() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: async ({ id, dto }: { id: string; dto: UpdateTodoDto }) => {
      const response = await todoApi.updateTodo(id, dto)
      return response.data
    },
    onSettled: (_data, _error, { id }) => {
      queryCache.invalidateQueries({ key: [todoQueriesKeys.list] })
      queryCache.invalidateQueries({ key: [todoQueriesKeys.detail(id)] })
      queryCache.invalidateQueries({ key: [todoQueriesKeys.stats] })
    },
  })
}

/**
 * Delete a todo
 */
export function useDeleteTodo() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: async (id: string) => {
      await todoApi.deleteTodo(id)
      return id
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: [todoQueriesKeys.list] })
      queryCache.invalidateQueries({ key: [todoQueriesKeys.stats] })
    },
  })
}

/**
 * Toggle todo status
 */
export function useToggleTodo() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: async (id: string) => {
      const response = await todoApi.toggleTodoStatus(id)
      return response.data
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: [todoQueriesKeys.list] })
      queryCache.invalidateQueries({ key: [todoQueriesKeys.stats] })
    },
  })
}

/**
 * Clear all completed todos
 */
export function useClearCompleted() {
  const queryCache = useQueryCache()

  return useMutation({
    mutation: async () => {
      const response = await todoApi.clearCompletedTodos()
      return response.data
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: [todoQueriesKeys.list] })
      queryCache.invalidateQueries({ key: [todoQueriesKeys.stats] })
    },
  })
}
