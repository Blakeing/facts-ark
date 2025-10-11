<script setup lang="ts">
/**
 * EditTodoDialog Component
 *
 * Modal dialog for editing an existing todo item.
 */

import { computed } from 'vue'
import { Dialog } from '@/shared/ui/dialog'
import { FieldInput } from '@/shared/ui/field'
import { Button } from '@/shared/ui/button'
import { BaseForm, BaseFormField } from '@/shared/ui/form'
import { useEditTodo } from '../model/useEditTodo'
import type { Todo } from '@/entities/todo'

interface Props {
  todo: Todo
}

interface Emits {
  (e: 'success'): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const open = defineModel<boolean>('open', { required: true })

const { form, canSubmit, isPending, isError, error, handleSubmit } = useEditTodo(props.todo, {
  onSuccess: () => emit('success'),
})

const titleLength = computed(() => form.values.title?.length ?? 0)
const descriptionLength = computed(() => form.values.description?.length ?? 0)

function onClose() {
  if (isPending.value) return
  open.value = false
  emit('cancel')
}

async function onSubmit() {
  await handleSubmit(() => {
    open.value = false
  })
}
</script>

<template>
  <Dialog
    v-model:open="open"
    title="Edit Todo"
    description="Update your todo details"
    :closeOnInteractOutside="!isPending"
    :closeOnEscape="!isPending"
    :showClose="false"
  >
    <template #content>
      <BaseForm :form="form" :on-submit="onSubmit" class="space-y-4">
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
          <template #description="{ errorMessage }">
            <span v-if="errorMessage" class="text-xs text-fg-error">{{ errorMessage }}</span>
            <span v-else class="text-xs text-muted-foreground">{{ titleLength }}/200 characters</span>
          </template>
        </BaseFormField>

        <BaseFormField name="description" label="Description (optional)">
          <template #default="{ field }">
            <FieldInput
              placeholder="Add more details..."
              :disabled="isPending"
              maxlength="1000"
              v-bind="field"
            />
          </template>
          <template #description>
            <span class="text-xs text-muted-foreground">{{ descriptionLength }}/1000 characters</span>
          </template>
        </BaseFormField>

        <div v-if="isError" class="rounded-md bg-bg-error-subtle p-3 text-sm text-fg-error">
          <div class="flex items-start gap-2">
            <svg class="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clip-rule="evenodd"
              />
            </svg>
            <span>{{ error?.message || 'Failed to update todo' }}</span>
          </div>
        </div>

        <div class="flex justify-end gap-2">
          <Button type="button" variant="outline" :disabled="isPending" @click="onClose">
            Cancel
          </Button>
          <Button type="submit" variant="solid" :disabled="!canSubmit" :loading="isPending">
            {{ isPending ? 'Saving...' : 'Save Changes' }}
          </Button>
        </div>
      </BaseForm>
    </template>
  </Dialog>
</template>

