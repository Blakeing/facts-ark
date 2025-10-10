/**
 * Filter Todos Feature - ViewModel
 *
 * Business logic for filtering todos.
 * Manages filter state and provides filtered todo list.
 */

import { computed, unref, type MaybeRef } from 'vue'
import { useTodoStore } from '@/entities/todo'
import type { Todo, TodoFilter } from '@/entities/todo'

export function useFilterTodos(todos: MaybeRef<Todo[]>) {
  const store = useTodoStore()

  const currentFilter = computed(() => store.currentFilter)
  const searchQuery = computed(() => store.searchQuery)

  const filteredTodos = computed(() => {
    return store.filterTodos(unref(todos))
  })

  const filterOptions: { value: TodoFilter; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'pending', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ]

  function setFilter(filter: TodoFilter) {
    store.setFilter(filter)
  }

  function setSearchQuery(query: string) {
    store.setSearchQuery(query)
  }

  return {
    currentFilter,
    searchQuery,
    filteredTodos,
    filterOptions,
    setFilter,
    setSearchQuery,
  }
}
