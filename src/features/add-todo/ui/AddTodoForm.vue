<script setup lang="ts">
/**
 * AddTodoForm Component
 *
 * Form for creating a new todo.
 * Uses unified form pattern with TextField/Textarea components.
 */

import { TextField, Textarea } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { useCreateTodo } from '../model/useCreateTodo'
import { computed } from 'vue'

interface Emits {
  (e: 'success'): void
}

const emit = defineEmits<Emits>()

const { form, handleSubmit, isSubmitting, canSubmit, state } = useCreateTodo()

// Helper to show character count
const titleValue = computed(() => form.values.title || '')
const descriptionValue = computed(() => form.values.description || '')

async function onSubmit() {
  await handleSubmit()
  if (state.value.value === 'success') {
    emit('success')
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <!-- Title Field -->
    <TextField
      name="title"
      label="Title"
      placeholder="What needs to be done?"
      :disabled="isSubmitting"
      required
      :helper-text="`${titleValue.length}/200 characters`"
    />

    <!-- Description Field -->
    <Textarea
      name="description"
      label="Description (optional)"
      placeholder="Add more details..."
      :disabled="isSubmitting"
      :rows="3"
      :helper-text="`${descriptionValue.length}/1000 characters`"
    />

    <!-- Error Message -->
    <div v-if="state.value.context?.submitError" class="rounded-md bg-bg-error-subtle p-3 text-sm text-fg-error">
      <div class="flex items-start gap-2">
        <svg class="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ state.value.context.submitError }}</span>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end">
      <Button type="submit" :disabled="!canSubmit" :loading="isSubmitting">
        {{ isSubmitting ? 'Creating...' : 'Add Todo' }}
      </Button>
    </div>
  </form>
</template>

