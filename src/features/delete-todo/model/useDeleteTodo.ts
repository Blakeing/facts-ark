/**
 * Delete Todo Feature - ViewModel
 *
 * Business logic for deleting todos.
 * Includes optimistic updates for immediate UI feedback.
 */

import { computed } from 'vue'
import { useDeleteTodo as useDeleteTodoMutation } from '@/entities/todo'

export function useDeleteTodo() {
  const deleteTodoMutation = useDeleteTodoMutation()

  function deleteTodo(id: string, onSuccess?: () => void) {
    deleteTodoMutation.mutate(id)
    if (onSuccess) {
      onSuccess()
    }
  }

  return {
    deleteTodo,
    isPending: computed(() => deleteTodoMutation.status.value === 'pending'),
    isError: computed(() => deleteTodoMutation.status.value === 'error'),
    error: deleteTodoMutation.error,
  }
}
