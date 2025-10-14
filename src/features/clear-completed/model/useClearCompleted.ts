import { clearCompletedTodos, TodoStatus, todoQueriesKeys, type Todo } from '@/entities/todo'
import { createMutationFactory } from '@/shared/lib/mutation'

export function useClearCompleted() {
  const mutation = createMutationFactory({
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
    invalidateKeys: [todoQueriesKeys.list, todoQueriesKeys.stats],
    successToast: (count) => ({
      title: 'Completed todos cleared',
      description: `${count} completed todo${count === 1 ? '' : 's'} removed.`,
    }),
    errorToast: {
      title: 'Failed to clear todos',
      description: 'An error occurred while clearing completed todos.',
    },
  })

  async function clearCompleted(onSuccess?: (count: number) => void) {
    const count = await mutation.mutate(undefined as any)
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
