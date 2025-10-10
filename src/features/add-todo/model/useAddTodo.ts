/**
 * Add Todo Feature - ViewModel (Pinia Colada)
 *
 * Alternate implementation using Pinia Colada.
 * Demonstrates the simpler Vue-native approach.
 */

import { ref, computed } from 'vue'
import { useCreateTodo } from '@/entities/todo'
import type { CreateTodoDto } from '@/entities/todo'

export function useAddTodo() {
  const title = ref('')
  const description = ref('')

  const mutation = useCreateTodo()
  const hasBeenCalled = ref(false)

  // Pinia Colada mutations start with status 'pending' even before being called
  // We need to track if we've actually triggered the mutation
  const isPending = computed(() => {
    return hasBeenCalled.value && mutation.status.value === 'pending'
  })
  const isError = computed(() => mutation.status.value === 'error')

  const isValid = computed(() => {
    return title.value.trim().length > 0 && title.value.trim().length <= 200
  })

  const canSubmit = computed(() => {
    return isValid.value && !isPending.value
  })

  async function handleSubmit(onSuccess?: () => void) {
    if (!canSubmit.value) return

    const dto: CreateTodoDto = {
      title: title.value.trim(),
      description: description.value.trim() || undefined,
    }

    try {
      hasBeenCalled.value = true
      await mutation.mutate(dto)
      // Clear form on success
      title.value = ''
      description.value = ''
      hasBeenCalled.value = false
      onSuccess?.()
    } catch (err) {
      // Error is handled by Pinia Colada
      hasBeenCalled.value = false
      console.error('Failed to create todo:', err)
    }
  }

  function clearForm() {
    title.value = ''
    description.value = ''
  }

  return {
    // Form state
    title,
    description,

    // Computed
    isValid,
    canSubmit,
    isPending,
    isError,
    error: mutation.error,

    // Actions
    handleSubmit,
    clearForm,
  }
}
