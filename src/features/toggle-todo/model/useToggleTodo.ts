/**
 * Toggle Todo Feature - ViewModel
 *
 * Business logic for toggling todo status.
 * Now using mutation factory pattern to reduce boilerplate.
 */

import { TodoStatus, toggleTodoStatus, todoQueriesKeys, type Todo } from '@/entities/todo'
import { createMutationFactory } from '@/shared/lib/mutation'

export function useToggleTodo() {
  const mutation = createMutationFactory<
    Todo,
    { id: Todo['id']; currentStatus: TodoStatus },
    Error
  >({
    mutationFn: async ({ id, currentStatus }) => {
      const response = await toggleTodoStatus(id, currentStatus)
      return response.data
    },
    optimisticUpdate: (cache, { id }: { id: Todo['id']; currentStatus: TodoStatus }) => {
      const rollbackData = cache.optimisticUpdate(todoQueriesKeys.list, id, (todo: Todo) => {
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

      return {
        rollback: () => cache.rollback(todoQueriesKeys.list, rollbackData),
      }
    },
    invalidateKeys: [todoQueriesKeys.list],
    // Silent optimistic - only show error toast on rollback
    errorToast: {
      title: 'Failed to update todo',
      description: 'Changes have been reverted. Please try again.',
    },
  })

  async function toggleTodo(id: string, currentStatus: TodoStatus, onSuccess?: () => void) {
    await mutation.mutate({ id, currentStatus })
    onSuccess?.()
  }

  return {
    toggleTodo,
    isPending: mutation.isPending,
  }
}
