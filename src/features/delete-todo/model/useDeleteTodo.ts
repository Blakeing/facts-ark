/**
 * Delete Todo Feature - ViewModel
 *
 * Business logic for deleting todos.
 */

import { computed } from 'vue'
import { useMutation, useQueryCache } from '@pinia/colada'
import { type Todo } from '@/entities/todo'
import * as todoApi from '@/entities/todo/api/todoApi'
import { todoQueriesKeys } from '@/entities/todo/api/todoQueries'

export function useDeleteTodo() {
  const queryCache = useQueryCache()

  const deleteTodoMutation = useMutation({
    mutation: async (id: Todo['id']) => {
      await todoApi.deleteTodo(id)
      return id
    },
    onMutate: async (id: Todo['id']) => {
      const previousTodos = queryCache.getQueryData([todoQueriesKeys.list]) as Todo[] | undefined

      queryCache.setQueryData([todoQueriesKeys.list], (old: Todo[] | undefined) => {
        if (!old) return old
        return old.filter((todo) => todo.id !== id)
      })

      return { previousTodos }
    },
    onError: (_error: Error, _variables: Todo['id'], context?: { previousTodos?: Todo[] }) => {
      if (context?.previousTodos) {
        queryCache.setQueryData([todoQueriesKeys.list], context.previousTodos)
      }
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: [todoQueriesKeys.list] })
      queryCache.invalidateQueries({ key: [todoQueriesKeys.stats] })
    },
  })

  // Use asyncStatus for checking if operation is in progress
  const isPending = computed(() => deleteTodoMutation.asyncStatus.value === 'loading')
  const isError = computed(() => deleteTodoMutation.status.value === 'error')

  async function deleteTodo(id: string, onSuccess?: () => void) {
    await deleteTodoMutation.mutateAsync(id)
    onSuccess?.()
  }

  return {
    deleteTodo,
    isPending,
    isError,
    error: deleteTodoMutation.error,
  }
}
