/**
 * Toggle Todo Feature - ViewModel
 *
 * Business logic for toggling todo status.
 * Now using mutation factory pattern to reduce boilerplate.
 */

import { TodoStatus, toggleTodoStatus, todoQueriesKeys, type Todo } from '@/entities/todo'
import { createMutationFactory } from '@/shared/lib/mutation'

export function useToggleTodo() {
  const mutation = createMutationFactory({
    mutationFn: async (id: Todo['id']) => {
      const response = await toggleTodoStatus(id)
      return response.data
    },
    optimisticUpdate: (cache, id: Todo['id']) => {
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
    invalidateKeys: [todoQueriesKeys.list, todoQueriesKeys.stats],
    successToast: {
      title: 'Todo updated',
      description: 'Status toggled successfully.',
    },
    errorToast: {
      title: 'Failed to update todo',
      description: 'An error occurred while toggling the todo status.',
    },
  })

  async function toggleTodo(id: string, onSuccess?: () => void) {
    await mutation.mutate(id)
    onSuccess?.()
  }

  return {
    toggleTodo,
    isPending: mutation.isPending,
  }
}
