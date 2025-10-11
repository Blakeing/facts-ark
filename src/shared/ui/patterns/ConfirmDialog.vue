<script setup lang="ts">
import { computed } from 'vue'
import { Dialog } from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'

interface Props {
  title?: string
  description?: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'default'
  loading?: boolean
}

interface Emits {
  (e: 'confirm'): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Are you sure?',
  description: 'This action cannot be undone.',
  confirmText: 'Confirm',
  cancelText: 'Cancel',
  variant: 'default',
  loading: false,
})

const emit = defineEmits<Emits>()

const open = defineModel<boolean>('open', { required: true })

function handleConfirm() {
  emit('confirm')
}

function handleCancel() {
  if (props.loading) return
  open.value = false
  emit('cancel')
}

const primaryVariant = computed(() => (props.variant === 'danger' ? 'destructive' : 'solid'))
</script>

<template>
  <Dialog
    v-model:open="open"
    :title="title"
    :description="description"
    :closeOnInteractOutside="!loading"
    :closeOnEscape="!loading"
    :showClose="false"
  >
    <template #content>
      <div class="flex justify-end gap-2 mt-4">
        <Button type="button" variant="outline" :disabled="loading" @click="handleCancel">
          {{ cancelText }}
        </Button>
        <Button
          type="button"
          :variant="primaryVariant"
          :disabled="loading"
          :loading="loading"
          @click="handleConfirm"
        >
          {{ confirmText }}
        </Button>
      </div>
    </template>
  </Dialog>
</template>

