<script setup lang="ts">
/**
 * AddTodoForm Component
 *
 * Form for creating a new todo.
 * Uses Input and Button components from the design system.
 */

import { FieldInput } from '@/shared/ui/field'
import { Button } from '@/shared/ui/button'
import { BaseForm, BaseFormField } from '@/shared/ui/form'
import { useAddTodo } from '../model/useAddTodo'

interface Emits {
  (e: 'success'): void
}

const emit = defineEmits<Emits>()

const { form, canSubmit, isPending, isError, error, handleSubmit } = useAddTodo()

function onSubmit() {
  handleSubmit(() => {
    emit('success')
  })
}
</script>

<template>
  <BaseForm :form="form" :on-submit="onSubmit" class="space-y-4">
    <!-- Title Field -->
    <BaseFormField name="title" label="Title" required>
      <template #default="{ field }">
        <FieldInput
          placeholder="What needs to be done?"
          :disabled="isPending"
          maxlength="200"
          required
          v-bind="field"
        />
      </template>
      <template #description="{ meta, value, errorMessage }">
        <span v-if="errorMessage" class="text-xs text-fg-error">{{ errorMessage }}</span>
        <span v-else-if="!meta.touched" class="text-xs text-muted-foreground">1-200 characters</span>
        <span v-else class="text-xs text-muted-foreground">{{ value.length }}/200 characters</span>
      </template>
    </BaseFormField>

    <!-- Description Field -->
    <BaseFormField name="description" label="Description (optional)">
      <template #default="{ field }">
        <FieldInput
          placeholder="Add more details..."
          :disabled="isPending"
          maxlength="1000"
          v-bind="field"
        />
      </template>
      <template #description="{ value }">
        <span class="text-xs text-muted-foreground">{{ value.length }}/1000 characters</span>
      </template>
    </BaseFormField>

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

    <!-- Submit Button -->
    <div class="flex justify-end">
      <Button type="submit" :disabled="!canSubmit" :loading="isPending">
        {{ isPending ? 'Creating...' : 'Add Todo' }}
      </Button>
    </div>
  </BaseForm>
</template>

