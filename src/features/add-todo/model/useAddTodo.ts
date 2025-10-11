/**
 * Add Todo Feature - ViewModel (Pinia Colada)
 *
 * Alternate implementation using Pinia Colada.
 * Demonstrates the simpler Vue-native approach.
 */

import { computed, ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm } from 'vee-validate'
import {
  useCreateTodo,
  createTodoSchema,
  type CreateTodoFormValues,
  type CreateTodoDto,
} from '@/entities/todo'

export function useAddTodo() {
  const form = useForm<CreateTodoFormValues>({
    validationSchema: toTypedSchema(createTodoSchema),
    initialValues: {
      title: '',
      description: '',
    },
  })

  const mutation = useCreateTodo()
  const hasBeenCalled = ref(false)

  // Pinia Colada mutations start with status 'pending' even before being called
  // We need to track if we've actually triggered the mutation
  const isPending = computed(() => {
    return hasBeenCalled.value && mutation.status.value === 'pending'
  })
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

      hasBeenCalled.value = true
      try {
        await mutation.mutate(dto)
        await form.resetForm({
          values: {
            title: '',
            description: '',
          },
        })
        onSuccess?.()
      } catch (err) {
        console.error('Failed to create todo:', err)
        throw err
      } finally {
        hasBeenCalled.value = false
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
