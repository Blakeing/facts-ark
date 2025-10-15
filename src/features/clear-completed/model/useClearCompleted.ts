import { clearCompletedTodos, TodoStatus, todoQueriesKeys, type Todo } from '@/entities/todo'
import { createMutationFactory } from '@/shared/lib/mutation'

export function useClearCompleted() {
  const mutation = createMutationFactory<number, void, Error>({
    mutationFn: async () => {
      const response = await clearCompletedTodos()
      return response.data
    },
    optimisticUpdate: (cache) => {
      const rollbackData = cache.optimisticFilter<Todo>(
        todoQueriesKeys.list,
        (todo) => todo.status !== TodoStatus.COMPLETED,
      )

      return {
        rollback: () => cache.rollback(todoQueriesKeys.list, rollbackData),
      }
    },
    invalidateKeys: [todoQueriesKeys.list],
    // Silent optimistic - only show error toast on rollback
    errorToast: {
      title: 'Failed to clear completed todos',
      description: 'Completed todos have been restored. Please try again.',
    },
  })

  async function clearCompleted(onSuccess?: (count: number) => void) {
    const count = await mutation.mutate(undefined)
    onSuccess?.(count)
  }

  return {
    clearCompleted,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}

export type UseClearCompletedReturn = ReturnType<typeof useClearCompleted>
