<script setup lang="ts">
/**
 * Todos Page (Pinia Colada Version)
 *
 * Alternative implementation using Pinia Colada for comparison.
 * Demonstrates the Vue-native data fetching approach.
 */

import { computed, ref } from 'vue'
import { useTodos, TodoItem, type Todo } from '@/entities/todo'
import { ToggleTodo } from '@/features/toggle-todo'
import { DeleteTodoButton } from '@/features/delete-todo'
import { useFilterTodos } from '@/features/filter-todos'
import { TodoFilters } from '@/features/filter-todos'
import { TodoStats } from '@/widgets/todo-stats'
import LoadingState from '@/shared/ui/patterns/LoadingState.vue'
import EmptyState from '@/shared/ui/patterns/EmptyState.vue'
import ErrorState from '@/shared/ui/patterns/ErrorState.vue'
import { Card } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { TextField, Textarea } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { useCreateTodo } from '@/features/add-todo'
import { EditTodoDialog } from '@/features/edit-todo'
import { ClearCompletedButton } from '@/features/clear-completed'

// Data fetching with Pinia Colada
const { data: todos, status, error, refresh } = useTodos()
const isLoading = computed(() => status.value === 'pending')

// Add todo form - using unified pattern with auto-reset and auto-invalidation
const { form, handleSubmit, isSubmitting, canSubmit, state } = useCreateTodo()

// Helper to show character count
const titleValue = computed(() => form.values.title || '')
const descriptionValue = computed(() => form.values.description || '')

// Filtering
const { filteredTodos, currentFilter } = useFilterTodos(computed(() => todos.value || []))

const editingTodo = ref<Todo | null>(null)
const isEditDialogOpen = ref(false)

function openEdit(todo: Todo) {
  editingTodo.value = todo
  isEditDialogOpen.value = true
}

function closeEdit() {
  editingTodo.value = null
  isEditDialogOpen.value = false
}

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
  <div class="container mx-auto max-w-4xl space-y-6 py-8">
    <!-- Page Header -->
    <div class="space-y-2">
      <div class="flex items-center gap-3">
        <h1 class="text-3xl font-bold text-fg-default">Todos</h1>
        <Badge variant="primary" colorPalette="purple" size="sm">Pinia Colada</Badge>
      </div>
      <p class="text-fg-muted">
        Alternative implementation using Pinia Colada for Vue-native data fetching.
      </p>
    </div>

    <!-- Stats Widget -->
    <TodoStats />

    <!-- Add Todo Section -->
    <Card>
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-fg-default">Create New Todo</h2>

        <form @submit="handleSubmit" class="space-y-4">
          <TextField
            name="title"
            label="Title"
            placeholder="What needs to be done?"
            :disabled="isSubmitting"
            required
            :helper-text="`${titleValue.length}/200 characters`"
          />

          <Textarea
            name="description"
            label="Description (optional)"
            placeholder="Add more details..."
            :disabled="isSubmitting"
            :rows="3"
            :helper-text="`${descriptionValue.length}/1000 characters`"
          />

          <div v-if="state.value.context?.submitError" class="rounded-md bg-bg-error-subtle p-3 text-sm text-fg-error">
            {{ state.value.context.submitError }}
          </div>

          <div class="flex justify-end">
            <Button type="submit" variant="solid" :disabled="!canSubmit" :loading="isSubmitting">
              {{ isSubmitting ? 'Creating...' : 'Add Todo' }}
            </Button>
          </div>
        </form>
      </div>
    </Card>

    <!-- Todo List Section -->
    <div class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-lg font-semibold text-fg-default">Your Todos</h2>
        <div class="flex items-center gap-2">
          <TodoFilters :todos="todos || []" />
          <ClearCompletedButton />
        </div>
      </div>

      <!-- Loading State -->
      <LoadingState v-if="isLoading" />

      <!-- Error State -->
      <ErrorState
        v-else-if="error"
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
          <TodoItem :todo="todo" @edit="openEdit(todo)">
            <template #checkbox="{ todo: todoItem }">
              <ToggleTodo :todo="todoItem" />
            </template>
            <template #actions="{ todo: todoItem }">
              <DeleteTodoButton :todo-id="todoItem.id" variant="ghost" size="sm" />
            </template>
          </TodoItem>
        </Card>
      </div>
    </div>

    <EditTodoDialog v-if="editingTodo" v-model:open="isEditDialogOpen" :todo="editingTodo" @cancel="closeEdit" @success="closeEdit" />

    <!-- Comparison Info -->
    <Card variant="filled" class="mt-8">
      <div class="space-y-2">
        <h3 class="text-sm font-semibold text-fg-default">Pinia Colada Benefits</h3>
        <ul class="space-y-1 text-sm text-fg-muted">
          <li>✓ Simpler API with less boilerplate</li>
          <li>✓ Better TypeScript inference for Vue</li>
          <li>✓ Seamless Pinia integration</li>
          <li>✓ Vue-first, optimized for Vue 3 reactivity</li>
          <li>✓ Smaller bundle size</li>
        </ul>
      </div>
    </Card>
  </div>
</template>

