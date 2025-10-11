/**
 * Toggle Todo Feature - ViewModel
 *
 * Business logic for toggling todo status.
 */

import { computed } from 'vue'
import { useMutation, useQueryCache } from '@pinia/colada'
import { TodoStatus, type Todo } from '@/entities/todo'
import * as todoApi from '@/entities/todo/api/todoApi'
import { todoQueriesKeys } from '@/entities/todo/api/todoQueries'
import { useToast } from '@/shared/ui/toast'

export function useToggleTodo() {
  const queryCache = useQueryCache()
  const { toast } = useToast()

  const toggleTodoMutation = useMutation({
    mutation: async (id: Todo['id']) => {
      const response = await todoApi.toggleTodoStatus(id)
      return response.data
    },
    onMutate: async (id: Todo['id']) => {
      const previousTodos = queryCache.getQueryData([todoQueriesKeys.list]) as Todo[] | undefined

      queryCache.setQueryData([todoQueriesKeys.list], (old: Todo[] | undefined) => {
        if (!old) return old

        return old.map((todo) => {
          if (todo.id !== id) return todo

          const toggledStatus =
            todo.status === TodoStatus.COMPLETED ? TodoStatus.PENDING : TodoStatus.COMPLETED

          return {
            ...todo,
            status: toggledStatus,
            completedAt:
              toggledStatus === TodoStatus.COMPLETED ? new Date().toISOString() : undefined,
            updatedAt: new Date().toISOString(),
          }
        })
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
  const isPending = computed(() => toggleTodoMutation.asyncStatus.value === 'loading')

  async function toggleTodo(id: number, onSuccess?: () => void) {
    try {
      await toggleTodoMutation.mutateAsync(id)
      toast.success({
        title: 'Todo updated',
        description: 'Status toggled successfully.',
      })
      onSuccess?.()
    } catch (error) {
      toast.error({
        title: 'Failed to update todo',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
      })
      throw error
    }
  }

  return {
    toggleTodo,
    isPending,
  }
}
