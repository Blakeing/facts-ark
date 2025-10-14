/**
 * Delete Todo Feature - ViewModel
 *
 * Business logic for deleting todos.
 * Now using mutation factory pattern to reduce boilerplate.
 */

import { deleteTodo as deleteTodoApi, todoQueriesKeys, type Todo } from '@/entities/todo'
import { createMutationFactory } from '@/shared/lib/mutation'

export function useDeleteTodo() {
  const mutation = createMutationFactory({
    mutationFn: async (id: Todo['id']) => {
      await deleteTodoApi(id)
      return id
    },
    optimisticUpdate: (cache, id: Todo['id']) => {
      const rollbackData = cache.optimisticRemove<Todo>(todoQueriesKeys.list, id)

      return {
        rollback: () => cache.rollback(todoQueriesKeys.list, rollbackData),
      }
    },
    invalidateKeys: [todoQueriesKeys.list, todoQueriesKeys.stats],
    successToast: {
      title: 'Todo deleted',
      description: 'The todo has been successfully deleted.',
    },
    errorToast: {
      title: 'Failed to delete todo',
      description: 'An error occurred while deleting the todo.',
    },
  })

  async function deleteTodo(id: string, onSuccess?: () => void) {
    await mutation.mutate(id)
    onSuccess?.()
  }

  return {
    deleteTodo,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}
