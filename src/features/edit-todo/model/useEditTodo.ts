/**
 * Edit Todo Feature - ViewModel
 *
 * Provides form state and mutation handling for editing an existing todo.
 */

import { computed, watch, toValue, type MaybeRef } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useMutation, useQueryCache } from '@pinia/colada'
import {
  createTodoSchema,
  type CreateTodoFormValues,
  type UpdateTodoDto,
  type Todo,
} from '@/entities/todo'
import * as todoApi from '@/entities/todo/api/todoApi'
import { todoQueriesKeys } from '@/entities/todo/api/todoQueries'
import { useToast } from '@/shared/ui/toast'

interface UseEditTodoOptions {
  /**
   * Optional callback fired after a successful update.
   */
  onSuccess?: () => void
}

export function useEditTodo(todo: MaybeRef<Todo>, options: UseEditTodoOptions = {}) {
  const queryCache = useQueryCache()
  const { toast } = useToast()
  const initialTodo = toValue(todo)

  const form = useForm<CreateTodoFormValues>({
    validationSchema: toTypedSchema(createTodoSchema),
    initialValues: {
      title: initialTodo.title,
      description: initialTodo.description ?? '',
    },
  })

  const mutation = useMutation({
    mutation: async ({ id, dto }: { id: Todo['id']; dto: UpdateTodoDto }) => {
      const response = await todoApi.updateTodo(id, dto)
      return response.data
    },
    onMutate: async ({ id, dto }: { id: Todo['id']; dto: UpdateTodoDto }) => {
      const previousTodos = queryCache.getQueryData([todoQueriesKeys.list]) as Todo[] | undefined

      queryCache.setQueryData([todoQueriesKeys.list], (old: Todo[] | undefined) => {
        if (!old) return old
        return old.map((todo) =>
          todo.id === id
            ? {
                ...todo,
                title: dto.title ?? todo.title,
                description: dto.description ?? todo.description,
                status: dto.status ?? todo.status,
                updatedAt: new Date().toISOString(),
              }
            : todo,
        )
      })

      return { previousTodos }
    },
    onError: (
      _error: Error | null,
      _variables: { id: Todo['id']; dto: UpdateTodoDto },
      context?: { previousTodos?: Todo[] },
    ) => {
      if (context?.previousTodos) {
        queryCache.setQueryData([todoQueriesKeys.list], context.previousTodos)
      }
    },
    onSettled: (
      _data: Todo | undefined,
      _error: Error | null | undefined,
      { id }: { id: Todo['id']; dto: UpdateTodoDto },
    ) => {
      queryCache.invalidateQueries({ key: [todoQueriesKeys.list] })
      queryCache.invalidateQueries({ key: [todoQueriesKeys.detail(id)] })
      queryCache.invalidateQueries({ key: [todoQueriesKeys.stats] })
    },
  })

  // Use asyncStatus for checking if operation is in progress
  const isPending = computed(() => mutation.asyncStatus.value === 'loading')
  const isError = computed(() => mutation.status.value === 'error')
  const isValid = computed(() => form.meta.value.valid)
  const canSubmit = computed(() => isValid.value && !isPending.value && form.meta.value.dirty)

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

      try {
        await mutation.mutateAsync({ id: currentTodo.id, dto })
        toast.success({
          title: 'Todo updated',
          description: 'Changes saved successfully.',
        })

        onSuccess?.()
        options.onSuccess?.()
      } catch (error) {
        toast.error({
          title: 'Failed to update todo',
          description: error instanceof Error ? error.message : 'Unknown error occurred',
        })
        throw error
      }
    })

    await submit()
  }

  return {
    form,
    errors: form.errors,
    isValid,
    canSubmit,
    isPending,
    isError,
    error: mutation.error,
    handleSubmit,
  }
}

export type UseEditTodoReturn = ReturnType<typeof useEditTodo>
