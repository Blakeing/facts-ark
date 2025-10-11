/**
 * Add Todo Feature - ViewModel (Pinia Colada)
 *
 * Handles form state and todo creation with optimistic updates.
 */

import { computed } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import { useMutation, useQueryCache } from '@pinia/colada'
import {
  createTodoSchema,
  TodoStatus,
  type CreateTodoFormValues,
  type CreateTodoDto,
  type Todo,
} from '@/entities/todo'
import * as todoApi from '@/entities/todo/api/todoApi'
import { todoQueriesKeys } from '@/entities/todo/api/todoQueries'
import { useToast } from '@/shared/ui/toast'

export function useAddTodo() {
  const queryCache = useQueryCache()
  const { toast } = useToast()

  const form = useForm<CreateTodoFormValues>({
    validationSchema: toTypedSchema(createTodoSchema),
    initialValues: {
      title: '',
      description: '',
    },
  })

  const mutation = useMutation({
    mutation: async (dto: CreateTodoDto) => {
      const response = await todoApi.createTodo(dto)
      return response.data
    },
    onMutate: async (dto: CreateTodoDto) => {
      const previousTodos = queryCache.getQueryData([todoQueriesKeys.list]) as Todo[] | undefined

      const optimisticTodo: Todo = {
        id: -Date.now(),
        title: dto.title,
        description: dto.description,
        status: TodoStatus.PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      queryCache.setQueryData([todoQueriesKeys.list], (old: Todo[] | undefined) => {
        if (!old) return [optimisticTodo]
        return [optimisticTodo, ...old]
      })

      return { previousTodos }
    },
    onError: (_error: Error, _variables: CreateTodoDto, context?: { previousTodos?: Todo[] }) => {
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

  const isValid = computed(() => form.meta.value.valid)

  const canSubmit = computed(() => {
    return isValid.value && !isPending.value
  })

  async function handleSubmit(onSuccess?: () => void) {
    const submit = form.handleSubmit(async (values) => {
      const dto: CreateTodoDto = {
        title: values.title,
        description: values.description || undefined,
      }

      try {
        await mutation.mutateAsync(dto)
        await form.resetForm({
          values: {
            title: '',
            description: '',
          },
        })
        toast.success({
          title: 'Todo created',
          description: 'Your todo has been added to the list.',
        })
        onSuccess?.()
      } catch (err) {
        toast.error({
          title: 'Failed to create todo',
          description: err instanceof Error ? err.message : 'Unknown error occurred',
        })
        throw err
      }
    })

    await submit()
  }

  function clearForm() {
    form.resetForm({
      values: {
        title: '',
        description: '',
      },
    })
  }

  return {
    form,
    errors: form.errors,
    values: form.values,
    meta: form.meta,
    isValid,
    canSubmit,
    isPending,
    isError,
    error: mutation.error,
    handleSubmit,
    clearForm,
  }
}
