<script setup lang="ts">
/**
 * DeleteTodoButton Component
 *
 * Button for deleting a todo.
 * Can be used standalone or within other components.
 */

import { ref } from 'vue'
import { Button } from '@/shared/ui/button'
import { ConfirmDialog } from '@/shared/ui/patterns'
import { useDeleteTodo } from '../model/useDeleteTodo'
import { useToast } from '@/shared/ui/toast'

interface Props {
  todoId: number
  variant?: 'solid' | 'outline' | 'ghost' | 'secondary'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  confirmDelete?: boolean
}

interface Emits {
  (e: 'deleted'): void
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'ghost',
  size: 'sm',
  confirmDelete: true,
})

const emit = defineEmits<Emits>()

const { deleteTodo, isPending } = useDeleteTodo()
const { toast } = useToast()
const openConfirm = ref(false)

function handleDelete() {
  deleteTodo(props.todoId, () => {
    toast.success({
      title: 'Todo deleted',
      description: 'The todo has been removed.',
    })
    openConfirm.value = false
    emit('deleted')
  })
}
</script>

<template>
  <span class="inline-flex items-center">
    <Button
      :variant="variant"
      :size="size"
      :loading="isPending"
      :disabled="isPending"
      @click="props.confirmDelete ? (openConfirm = true) : handleDelete()"
      type="button"
    >
      <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      <slot>Delete</slot>
    </Button>

    <ConfirmDialog
      v-model:open="openConfirm"
      title="Delete Todo"
      description="Are you sure you want to delete this todo? This action cannot be undone."
      confirm-text="Delete"
      variant="danger"
      :loading="isPending"
      @confirm="handleDelete"
      @cancel="openConfirm = false"
    />
  </span>
</template>

