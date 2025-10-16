<script setup lang="ts" generic="TFormValues">
import { ref, computed } from 'vue'
import { Dialog } from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import ConfirmDialog from '@/shared/ui/patterns/ConfirmDialog.vue'

interface Props {
  /** Dialog open state */
  open: boolean
  /** Dialog title */
  title: string
  /** Whether form has unsaved changes */
  hasChanges: boolean
  /** Whether save operation is in progress */
  isLoading: boolean
  /** Submit button text */
  submitText?: string
  /** Cancel button text */
  cancelText?: string
  /** Whether to show unsaved changes warning */
  showUnsavedWarning?: boolean
}

interface Emits {
  /** Dialog open state changed */
  (e: 'update:open', value: boolean): void
  /** Save button clicked */
  (e: 'save'): void
  /** Cancel button clicked */
  (e: 'cancel'): void
  /** Dialog close requested (X button, ESC, backdrop) */
  (e: 'close'): void
}

const props = withDefaults(defineProps<Props>(), {
  submitText: 'Save',
  cancelText: 'Cancel',
  showUnsavedWarning: true,
})

const emit = defineEmits<Emits>()

// Confirmation dialog state
const showConfirmDialog = ref(false)

// Computed properties
const isOpen = computed({
  get: () => props.open,
  set: (value: boolean) => emit('update:open', value)
})

const submitButtonText = computed(() => {
  if (props.isLoading) {
    return props.submitText === 'Save' ? 'Saving...' : props.submitText
  }
  return props.submitText
})

// Event handlers
function handleSave() {
  emit('save')
}

function handleCancel() {
  emit('cancel')
}

function handleClose() {
  emit('close')
}

async function handleOpenChange(details: { open: boolean }) {
  if (!details.open && isOpen.value) {
    // Trying to close the dialog
    if (props.hasChanges) {
      // Prevent closing and show confirmation dialog
      isOpen.value = true
      showConfirmDialog.value = true
    } else {
      // No changes, allow close
      isOpen.value = false
      handleClose()
    }
  }
}

function handleConfirmClose() {
  showConfirmDialog.value = false
  isOpen.value = false
  handleClose()
}

function handleCancelClose() {
  showConfirmDialog.value = false
}
</script>

<template>
  <Dialog
    v-model:open="isOpen"
    :title="title"
    @openChange="handleOpenChange"
  >
    <template #content>
      <form @submit.prevent="handleSave" class="space-y-4">
        <!-- Form content slot -->
        <slot />

        <!-- Unsaved changes warning -->
        <div
          v-if="hasChanges && showUnsavedWarning"
          class="rounded bg-yellow-100 p-2 text-sm text-yellow-800"
        >
          ⚠️ You have unsaved changes
        </div>

        <!-- Action buttons -->
        <div class="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            :disabled="isLoading"
            @click="handleCancel"
          >
            {{ cancelText }}
          </Button>
          <Button
            type="submit"
            :disabled="!hasChanges || isLoading"
            :loading="isLoading"
          >
            {{ submitButtonText }}
          </Button>
        </div>
      </form>
    </template>
  </Dialog>

  <!-- Unsaved changes confirmation dialog -->
  <ConfirmDialog
    v-model:open="showConfirmDialog"
    title="Unsaved Changes"
    description="You have unsaved changes. Are you sure you want to close without saving?"
    confirmText="Discard Changes"
    cancelText="Keep Editing"
    variant="danger"
    :loading="isLoading"
    @confirm="handleConfirmClose"
    @cancel="handleCancelClose"
  />
</template>
