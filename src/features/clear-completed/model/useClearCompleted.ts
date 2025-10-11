import { computed } from 'vue'
import { useMutation, useQueryCache } from '@pinia/colada'
import { TodoStatus, type Todo } from '@/entities/todo'
import * as todoApi from '@/entities/todo/api/todoApi'
import { todoQueriesKeys } from '@/entities/todo/api/todoQueries'
import { useToast } from '@/shared/ui/toast'

export function useClearCompleted() {
  const queryCache = useQueryCache()
  const { toast } = useToast()

  const mutation = useMutation({
    mutation: async () => {
      const response = await todoApi.clearCompletedTodos()
      return response.data
    },
    onMutate: async () => {
      const previousTodos = queryCache.getQueryData([todoQueriesKeys.list]) as Todo[] | undefined

      queryCache.setQueryData([todoQueriesKeys.list], (old: Todo[] | undefined) => {
        if (!old) return old
        return old.filter((todo) => todo.status !== TodoStatus.COMPLETED)
      })

      return { previousTodos }
    },
    onError: (_error: Error, _variables: void, context?: { previousTodos?: Todo[] }) => {
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
  const isPending = computed(() => mutation.asyncStatus.value === 'loading')
  const isError = computed(() => mutation.status.value === 'error')

  async function clearCompleted(onSuccess?: (count: number) => void) {
    try {
      const count = await mutation.mutateAsync()
      toast.success({
        title: 'Completed todos cleared',
        description: `${count} completed todo${count === 1 ? '' : 's'} removed.`,
      })
      onSuccess?.(count)
    } catch (err) {
      toast.error({
        title: 'Failed to clear todos',
        description: err instanceof Error ? err.message : 'Unknown error occurred',
      })
      throw err
    }
  }

  return {
    clearCompleted,
    isPending,
    isError,
    error: mutation.error,
  }
}

export type UseClearCompletedReturn = ReturnType<typeof useClearCompleted>
