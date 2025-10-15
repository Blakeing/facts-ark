<script setup lang="ts">
/**
 * ToggleTodo Component
 *
 * Checkbox for toggling todo status.
 * Wraps the Checkbox component with todo-specific logic.
 */

import { computed } from 'vue'
import { Checkbox } from '@/shared/ui/checkbox'
import { useToggleTodo } from '../model/useToggleTodo'
import type { Todo } from '@/entities/todo'

interface Props {
  todo: Todo
}

interface Emits {
  (e: 'toggle'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const { toggleTodo, isPending } = useToggleTodo()
const isLoading = computed(() => isPending.value)

function handleToggle() {
  toggleTodo(props.todo.id, props.todo.status, () => {
    emit('toggle')
  })
}
</script>

<template>
  <Checkbox
    :checked="todo.status === 'completed'"
    :disabled="isLoading"
    @update:checked="handleToggle"
  />
</template>

