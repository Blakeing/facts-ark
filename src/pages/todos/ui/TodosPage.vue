<script setup lang="ts">
/**
 * Todos Page (Entity Dialog Pattern)
 *
 * Demonstrates the new Entity Dialog Pattern - drastically reduced boilerplate!
 * Same functionality as before but with ~90% less code.
 */

import { ref, computed, watch } from 'vue'
import { useTodoEntity, todoStatusEnum, type Todo, type CreateTodoDto } from '@/entities/todo'
import { useEntityDialog } from '@/shared/lib/entity'
import { createTodoSchema } from '@/entities/todo'
import { useFilterTodos } from '@/features/filter-todos'
import { TodoFilters } from '@/features/filter-todos'
import { TodoStats } from '@/widgets/todo-stats'
import LoadingState from '@/shared/ui/patterns/LoadingState.vue'
import EmptyState from '@/shared/ui/patterns/EmptyState.vue'
import ErrorState from '@/shared/ui/patterns/ErrorState.vue'
import EntityDialog from '@/shared/ui/patterns/EntityDialog.vue'
import { Card } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { TextField, Textarea } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import ConfirmDialog from '@/shared/ui/patterns/ConfirmDialog.vue'

// Universal Entity Pattern - Same API everywhere!
const todo = useTodoEntity()

// DEBUG: Log the state
console.log('🔍 Todo Entity State:', {
  data: todo.data.value,
  status: todo.status.value,
  error: todo.error.value,
  isLoading: todo.isLoading.value,
  isEmpty: todo.isEmpty.value,
  isMutating: todo.isMutating.value,
})

// DEBUG: Watch for state changes
watch(() => todo.status.value, (newStatus, oldStatus) => {
  console.log('📊 Status changed:', { oldStatus, newStatus })
})

watch(() => todo.data.value, (newData) => {
  console.log('📦 Data changed:', newData)
})

watch(() => todo.error.value, (newError) => {
  console.log('❌ Error changed:', newError)
})

// 🎉 NEW PATTERN: Entity Dialog with minimal setup!
const todoDialog = useEntityDialog({
  entity: todo,
  schema: createTodoSchema,
  emptyForm: { title: '', description: '' },
  getId: (t: Todo) => t.id,
  toDto: (values) => values as CreateTodoDto,
  fromModel: (t: Todo) => ({
    title: t.title,
    description: t.description || ''
  }),
})
// That's it! No need to manually create field bindings anymore!

// Filtering (existing)
const { filteredTodos, currentFilter } = useFilterTodos(
  computed(() => todo.data.value as Todo[] || [])
)

// Delete confirmation state
const isDeleteDialogOpen = ref(false)
const todoToDelete = ref<string | null>(null)

// Delete handler
const handleDelete = (id: string) => {
  todoToDelete.value = id
  isDeleteDialogOpen.value = true
}

const confirmDelete = async () => {
  if (todoToDelete.value) {
    await todo.delete?.(todoToDelete.value)
    isDeleteDialogOpen.value = false
    todoToDelete.value = null
  }
}

const cancelDelete = () => {
  isDeleteDialogOpen.value = false
  todoToDelete.value = null
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
        <Badge variant="primary" colorPalette="purple" size="sm">Entity Dialog Pattern</Badge>
      </div>
      <p class="text-fg-muted">
        Demonstrates the new Entity Dialog Pattern - drastically reduced boilerplate!
      </p>
    </div>

    <!-- Stats Widget -->
    <TodoStats />

    <!-- DEBUG Panel -->
    <Card variant="filled" class="bg-gray-900 text-white">
      <div class="space-y-2 text-xs font-mono">
        <h3 class="text-sm font-bold text-yellow-400">🔍 DEBUG STATE</h3>
        <div class="grid grid-cols-2 gap-2">
          <div>
            <strong>Status:</strong> {{ todo.status.value }}
          </div>
          <div>
            <strong>isLoading:</strong> {{ todo.isLoading.value }}
          </div>
          <div>
            <strong>isEmpty:</strong> {{ todo.isEmpty.value }}
          </div>
          <div>
            <strong>isMutating:</strong> {{ todo.isMutating.value }}
          </div>
          <div>
            <strong>Data Length:</strong> {{ todo.data.value?.length || 0 }}
          </div>
          <div>
            <strong>Error:</strong> {{ todo.error.value?.message || 'none' }}
          </div>
        </div>
        <div>
          <strong>Data:</strong>
          <pre class="mt-1 overflow-auto bg-black p-2 text-xs">{{ JSON.stringify(todo.data.value, null, 2) }}</pre>
        </div>
      </div>
    </Card>

    <!-- Add Todo Section -->
    <Card>
      <div class="space-y-4">
        <h2 class="text-lg font-semibold text-fg-default">Create New Todo</h2>

        <Button @click="todoDialog.openAdd" :disabled="todo.isMutating.value">
          Add Todo
        </Button>
      </div>
    </Card>

    <!-- Todo List Section -->
    <div class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-lg font-semibold text-fg-default">Your Todos</h2>
        <div class="flex items-center gap-2">
          <TodoFilters :todos="(todo.data.value as Todo[]) || []" />
        </div>
      </div>

      <!-- Loading State (Pinia Colada) -->
      <LoadingState v-if="todo.isLoading.value" />

      <!-- Error State (Pinia Colada) -->
      <ErrorState
        v-else-if="todo.error.value"
        :message="todo.error.value?.message || 'Failed to load todos'"
        @retry="todo.refresh"
      />

      <!-- Empty State -->
      <EmptyState
        v-else-if="todo.isEmpty.value"
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
        <Card v-for="item in filteredTodos" :key="item.id" variant="outline" class="p-4">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="font-medium">{{ item.title }}</h3>
              <p class="text-sm text-gray-600">{{ item.description }}</p>
              <span class="text-xs text-gray-500">
                Status: {{ todoStatusEnum.getDescription(item.status) }}
              </span>
            </div>
            <div class="flex gap-2">
              <Button
                @click="todoDialog.openEdit(item)"
                size="sm"
                variant="outline"
                :disabled="todo.isUpdating.value"
              >
                Edit
              </Button>
              <Button
                @click="handleDelete(item.id)"
                size="sm"
                variant="outline"
                :disabled="todo.isDeleting.value"
              >
                Delete
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>

    <!-- 🎉 NEW PATTERN: Entity Dialog - All the complexity is hidden! -->
    <EntityDialog
      v-model:open="todoDialog.isOpen.value"
      :title="todoDialog.isEditMode.value ? 'Edit Todo' : 'Add Todo'"
      :has-changes="todoDialog.hasChanges.value"
      :is-loading="todoDialog.isLoading.value"
      :submit-text="todoDialog.isEditMode.value ? 'Update' : 'Create'"
      @save="todoDialog.save"
      @cancel="todoDialog.forceClose"
      @close="todoDialog.close"
    >
      <template #default>
        <!-- 🎉 Clean field bindings with single v-bind! -->
        <TextField
          v-bind="todoDialog.field('title')"
          label="Title"
          required
        />

        <Textarea
          v-bind="todoDialog.field('description')"
          label="Description"
        />
      </template>
    </EntityDialog>

    <!-- Benefits Card -->
    <Card variant="filled" class="mt-8">
      <div class="space-y-2">
        <h3 class="text-sm font-semibold text-fg-default">Entity Dialog Pattern Benefits</h3>
        <ul class="space-y-1 text-sm text-fg-muted">
          <li>✓ ~90% less boilerplate code</li>
          <li>✓ Automatic dirty checking</li>
          <li>✓ Built-in unsaved changes confirmation</li>
          <li>✓ Consistent UX across all dialogs</li>
          <li>✓ Type-safe with full TypeScript support</li>
          <li>✓ Easy to test and maintain</li>
          <li>✓ Inspired by Facts app's proven patterns</li>
        </ul>
      </div>
    </Card>

    <!-- Delete Confirmation Dialog -->
    <ConfirmDialog
      v-model:open="isDeleteDialogOpen"
      title="Delete Todo"
      description="Are you sure you want to delete this todo? This action cannot be undone."
      confirmText="Delete"
      cancelText="Cancel"
      variant="danger"
      :loading="todo.isDeleting.value"
      @confirm="confirmDelete"
      @cancel="cancelDelete"
    />
  </div>
</template>
