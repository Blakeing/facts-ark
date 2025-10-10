/**
 * Toggle Todo Feature - ViewModel
 *
 * Business logic for toggling todo status.
 */

import { computed } from 'vue'
import { useToggleTodo as useToggleTodoMutation } from '@/entities/todo'

export function useToggleTodo() {
  const toggleTodoMutation = useToggleTodoMutation()

  function toggleTodo(id: string, onSuccess?: () => void) {
    toggleTodoMutation.mutate(id)
    if (onSuccess) {
      onSuccess()
    }
  }

  return {
    toggleTodo,
    isPending: computed(() => toggleTodoMutation.status.value === 'pending'),
  }
}
