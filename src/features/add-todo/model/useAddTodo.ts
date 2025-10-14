/**
 * Add Todo Feature - ViewModel (Pinia Colada)
 *
 * Handles form state and todo creation with optimistic updates.
 * Now using mutation factory pattern to reduce boilerplate.
 */

import { computed } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import {
  createTodoSchema,
  TodoStatus,
  createTodo,
  todoQueriesKeys,
  type CreateTodoFormValues,
  type CreateTodoDto,
  type Todo,
} from '@/entities/todo'
import { createMutationFactory } from '@/shared/lib/mutation'

export function useAddTodo() {
  const form = useForm<CreateTodoFormValues>({
    validationSchema: toTypedSchema(createTodoSchema),
    initialValues: {
      title: '',
      description: '',
    },
  })

  // Use mutation factory pattern - much cleaner!
  const mutation = createMutationFactory({
    mutationFn: async (dto: CreateTodoDto) => {
      const response = await createTodo(dto)
      return response.data
    },
    optimisticUpdate: (cache, dto: CreateTodoDto) => {
      const optimisticTodo: Todo = {
        id: `temp-${Date.now()}`,
        title: dto.title,
        description: dto.description,
        status: TodoStatus.PENDING,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      const rollbackData = cache.optimisticAdd([...todoQueriesKeys.list], optimisticTodo)

      return {
        rollback: () => cache.rollback([...todoQueriesKeys.list], rollbackData),
      }
    },
    invalidateKeys: [todoQueriesKeys.list, todoQueriesKeys.stats],
    successToast: {
      title: 'Todo created',
      description: 'Your todo has been added to the list.',
    },
    errorToast: {
      title: 'Failed to create todo',
      description: 'An error occurred while creating the todo.',
    },
  })

  const isValid = computed(() => form.meta.value.valid)

  const canSubmit = computed(() => {
    return isValid.value && !mutation.isPending.value
  })

  async function handleSubmit(onSuccess?: () => void) {
    const submit = form.handleSubmit(async (values) => {
      const dto: CreateTodoDto = {
        title: values.title,
        description: values.description || undefined,
      }

      await mutation.mutate(dto)
      await form.resetForm({
        values: {
          title: '',
          description: '',
        },
      })
      onSuccess?.()
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
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    handleSubmit,
    clearForm,
  }
}
