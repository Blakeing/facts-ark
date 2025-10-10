<script setup lang="ts">
/**
 * AddTodoForm Component
 *
 * Form for creating a new todo.
 * Uses Input and Button components from the design system.
 */

import { FieldInput } from '@/shared/ui/field'
import { Button } from '@/shared/ui/button'
import { Field } from '@/shared/ui/field'
import { useAddTodo } from '../model/useAddTodo'

interface Emits {
  (e: 'success'): void
}

const emit = defineEmits<Emits>()

const { title, description, isValid, canSubmit, isPending, isError, error, handleSubmit } =
  useAddTodo()

function onSubmit() {
  handleSubmit(() => {
    emit('success')
  })
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <!-- Title Field -->
    <Field label="Title" required :invalid="!isValid && title.length > 0">
      <FieldInput
        v-model="title"
        placeholder="What needs to be done?"
        :disabled="isPending"
        maxlength="200"
        required
      />
      <template #helperText>
        <span>{{ title.length }}/200 characters</span>
      </template>
      <template #errorText>
        <span>Title must be between 1 and 200 characters</span>
      </template>
    </Field>

    <!-- Description Field -->
    <Field label="Description (optional)">
      <FieldInput
        v-model="description"
        placeholder="Add more details..."
        :disabled="isPending"
        maxlength="1000"
      />
      <template #helperText>
        <span>{{ description.length }}/1000 characters</span>
      </template>
    </Field>

    <!-- Error Message -->
    <div v-if="isError" class="rounded-md bg-bg-error-subtle p-3 text-sm text-fg-error">
      <div class="flex items-start gap-2">
        <svg class="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ error?.message || 'Failed to create todo' }}</span>
      </div>
    </div>

    <!-- Debug Info -->
    <pre class="mt-4 rounded bg-gray-100 p-2 text-xs ">{{
      JSON.stringify(
        {
          title: title,
          description: description,
          titleLength: title.length,
          isValid: isValid,
          canSubmit: canSubmit,
          isPending: isPending,
          isError: isError,
        },
        null,
        2
      )
    }}</pre>

    <!-- Submit Button -->
    <div class="flex justify-end">
      <Button type="submit" :disabled="!canSubmit" :loading="isPending">
        {{ isPending ? 'Creating...' : 'Add Todo' }}
      </Button>
    </div>
  </form>
</template>

