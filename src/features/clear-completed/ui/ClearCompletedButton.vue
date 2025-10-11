<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button } from '@/shared/ui/button'
import { ConfirmDialog } from '@/shared/ui/patterns'
import { useClearCompleted } from '../model/useClearCompleted'
import { useTodos } from '@/entities/todo'

const { data: todos } = useTodos()
const { clearCompleted, isPending } = useClearCompleted()

const completedCount = computed(() => todos.value?.filter((todo) => todo.status === 'completed').length ?? 0)
const openConfirm = ref(false)

function handleClear() {
  clearCompleted(() => {
    openConfirm.value = false
  })
}
</script>

<template>
  <span class="inline-flex items-center">
    <Button
      variant="outline"
      size="sm"
      :disabled="completedCount === 0 || isPending"
      :loading="isPending"
      @click="openConfirm = true"
      type="button"
    >
      Clear Completed ({{ completedCount }})
    </Button>

    <ConfirmDialog
      v-model:open="openConfirm"
      title="Clear Completed Todos"
      :description="`Are you sure you want to delete ${completedCount} completed todo${completedCount === 1 ? '' : 's'}? This action cannot be undone.`"
      confirm-text="Clear All"
      variant="danger"
      :loading="isPending"
      @confirm="handleClear"
      @cancel="openConfirm = false"
    />
  </span>
</template>

