/**
 * Edit Todo Feature - ViewModel
 *
 * Provides form state and mutation handling for editing an existing todo.
 * Now using mutation factory pattern to reduce boilerplate.
 */

import { computed, watch, toValue, type MaybeRef } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useQueryCache } from '@pinia/colada'
import {
  createTodoSchema,
  updateTodo,
  todoQueriesKeys,
  type CreateTodoFormValues,
  type UpdateTodoDto,
  type Todo,
} from '@/entities/todo'
import { createMutationFactory } from '@/shared/lib/mutation'

interface UseEditTodoOptions {
  /**
   * Optional callback fired after a successful update.
   */
  onSuccess?: () => void
}

export function useEditTodo(todo: MaybeRef<Todo>, options: UseEditTodoOptions = {}) {
  const queryCache = useQueryCache()
  const initialTodo = toValue(todo)

  const form = useForm<CreateTodoFormValues>({
    validationSchema: toTypedSchema(createTodoSchema),
    initialValues: {
      title: initialTodo.title,
      description: initialTodo.description ?? '',
    },
  })

  const mutation = createMutationFactory({
    mutationFn: async ({ id, dto }: { id: Todo['id']; dto: UpdateTodoDto }) => {
      const response = await updateTodo(id, dto)
      return response.data
    },
    optimisticUpdate: (cache, { id, dto }: { id: Todo['id']; dto: UpdateTodoDto }) => {
      const rollbackData = cache.optimisticUpdate(todoQueriesKeys.list, id, (todo: Todo) => ({
        ...todo,
        title: dto.title ?? todo.title,
        description: dto.description ?? todo.description,
        status: dto.status ?? todo.status,
        updatedAt: new Date().toISOString(),
      }))

      return {
        rollback: () => cache.rollback(todoQueriesKeys.list, rollbackData),
      }
    },
    invalidateKeys: [todoQueriesKeys.list],
    // Promise-based toast for instant feedback
    loadingToast: {
      loading: 'Saving changes...',
      success: 'Changes saved successfully!',
      error: 'Failed to save changes',
    },
    onSettled: async (_data, _error, variables) => {
      // Also invalidate the detail query
      await queryCache.invalidateQueries({ key: [...todoQueriesKeys.detail(variables.id)] })
    },
  })

  const isValid = computed(() => form.meta.value.valid)
  const canSubmit = computed(
    () => isValid.value && !mutation.isPending.value && form.meta.value.dirty,
  )

  watch(
    () => toValue(todo),
    (next) => {
      form.resetForm({
        values: {
          title: next.title,
          description: next.description ?? '',
        },
      })
    },
  )

  async function handleSubmit(onSuccess?: () => void) {
    const submit = form.handleSubmit(async (values) => {
      const currentTodo = toValue(todo)
      const dto: UpdateTodoDto = {}

      if (values.title.trim() !== currentTodo.title.trim()) {
        dto.title = values.title
      }

      const description = values.description?.trim()
      const currentDescription = currentTodo.description?.trim() ?? ''
      if ((description ?? '') !== currentDescription) {
        dto.description = description || undefined
      }

      await mutation.mutate({ id: currentTodo.id, dto })
      onSuccess?.()
      options.onSuccess?.()
    })

    await submit()
  }

  return {
    form,
    errors: form.errors,
    isValid,
    canSubmit,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    handleSubmit,
  }
}

export type UseEditTodoReturn = ReturnType<typeof useEditTodo>
