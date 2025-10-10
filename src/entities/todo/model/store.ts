/**
 * Todo Store
 *
 * Pinia store for managing local UI state related to todos.
 * Handles filters, selection, and other transient UI state.
 * Does NOT handle todo data itself (that's managed by Vue Query/Pinia Colada).
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { TodoFilter, Todo } from './types'

export const useTodoStore = defineStore('todo', () => {
  // State
  const currentFilter = ref<TodoFilter>('all')
  const selectedTodoIds = ref<Set<string>>(new Set())
  const searchQuery = ref('')

  // Computed
  const hasSelectedTodos = computed(() => selectedTodoIds.value.size > 0)
  const selectedCount = computed(() => selectedTodoIds.value.size)

  // Actions
  function setFilter(filter: TodoFilter) {
    currentFilter.value = filter
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function selectTodo(id: string) {
    selectedTodoIds.value.add(id)
  }

  function deselectTodo(id: string) {
    selectedTodoIds.value.delete(id)
  }

  function toggleTodoSelection(id: string) {
    if (selectedTodoIds.value.has(id)) {
      deselectTodo(id)
    } else {
      selectTodo(id)
    }
  }

  function clearSelection() {
    selectedTodoIds.value.clear()
  }

  function isTodoSelected(id: string): boolean {
    return selectedTodoIds.value.has(id)
  }

  /**
   * Filter todos based on current filter and search query
   */
  function filterTodos(todos: Todo[]): Todo[] {
    let filtered = [...todos]

    // Apply status filter
    if (currentFilter.value === 'pending') {
      filtered = filtered.filter((todo) => todo.status === 'pending')
    } else if (currentFilter.value === 'completed') {
      filtered = filtered.filter((todo) => todo.status === 'completed')
    }

    // Apply search query
    if (searchQuery.value.trim()) {
      const query = searchQuery.value.toLowerCase()
      filtered = filtered.filter(
        (todo) =>
          todo.title.toLowerCase().includes(query) ||
          todo.description?.toLowerCase().includes(query),
      )
    }

    return filtered
  }

  return {
    // State
    currentFilter,
    selectedTodoIds,
    searchQuery,

    // Computed
    hasSelectedTodos,
    selectedCount,

    // Actions
    setFilter,
    setSearchQuery,
    selectTodo,
    deselectTodo,
    toggleTodoSelection,
    clearSelection,
    isTodoSelected,
    filterTodos,
  }
})
