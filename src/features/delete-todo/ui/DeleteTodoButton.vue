<script setup lang="ts">
/**
 * DeleteTodoButton Component
 *
 * Button for deleting a todo.
 * Can be used standalone or within other components.
 */

import { Button } from '@/shared/ui/button'
import { useDeleteTodo } from '../model/useDeleteTodo'

interface Props {
  todoId: string
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

function handleDelete() {
  if (props.confirmDelete) {
    if (!confirm('Are you sure you want to delete this todo?')) {
      return
    }
  }

  deleteTodo(props.todoId, () => {
    emit('deleted')
  })
}
</script>

<template>
  <Button
    :variant="variant"
    :size="size"
    :loading="isPending"
    :disabled="isPending"
    @click="handleDelete"
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
</template>

