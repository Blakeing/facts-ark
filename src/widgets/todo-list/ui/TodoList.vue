<script setup lang="ts">
/**
 * TodoList Widget
 *
 * Composed widget that displays a list of todos with all interactions.
 * Integrates TodoItem, ToggleTodo, and DeleteTodo features.
 * Handles loading, empty, and error states.
 */

import { computed } from 'vue'
import { useTodos, TodoItem } from '@/entities/todo'
import { ToggleTodo } from '@/features/toggle-todo'
import { DeleteTodoButton } from '@/features/delete-todo'
import { useFilterTodos } from '@/features/filter-todos'
import LoadingState from '@/shared/ui/patterns/LoadingState.vue'
import EmptyState from '@/shared/ui/patterns/EmptyState.vue'
import ErrorState from '@/shared/ui/patterns/ErrorState.vue'
import { Card } from '@/shared/ui/card'

const { data: todos, status, error, refresh } = useTodos()
const isLoading = computed(() => status.value === 'pending')
const isError = computed(() => status.value === 'error')

const allTodos = computed(() => todos.value || [])
const { filteredTodos, currentFilter } = useFilterTodos(allTodos)

const emptyMessage = computed(() => {
  if (currentFilter.value === 'completed') {
    return 'No completed todos yet'
  }
  if (currentFilter.value === 'pending') {
    return 'No active todos'
  }
  return 'No todos yet. Create one to get started!'
})
</script>

<template>
  <div class="space-y-4">
    <!-- Loading State -->
    <LoadingState v-if="isLoading" />

    <!-- Error State -->
    <ErrorState
      v-else-if="isError"
      :message="error?.message || 'Failed to load todos'"
      title="Failed to load todos"
      @retry="refresh"
    />

    <!-- Empty State -->
    <EmptyState
      v-else-if="!filteredTodos || filteredTodos.length === 0"
      :title="emptyMessage"
      description="Todos help you organize and track your tasks."
    >
      <template #icon>
        <svg
          class="h-12 w-12 text-fg-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        </svg>
      </template>
    </EmptyState>

    <!-- Todo List -->
    <div v-else class="space-y-3">
      <Card v-for="todo in filteredTodos" :key="todo.id" variant="outline" class="p-0">
        <TodoItem :todo="todo">
          <!-- Custom checkbox using ToggleTodo feature -->
          <template #checkbox="{ todo: todoItem }">
            <ToggleTodo :todo="todoItem" />
          </template>

          <!-- Custom actions with DeleteTodo feature -->
          <template #actions="{ todo: todoItem }">
            <DeleteTodoButton :todo-id="todoItem.id" variant="ghost" size="sm" />
          </template>
        </TodoItem>
      </Card>
    </div>
  </div>
</template>

