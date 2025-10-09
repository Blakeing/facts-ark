<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Toast, Toaster } from '@ark-ui/vue/toast'
import { X, Info, CircleCheck, CircleAlert, TriangleAlert } from 'lucide-vue-next'
import { computed } from 'vue'
import { toastVariants } from './toast.variants'
import type { ToasterProps, ToastType } from './toast.types'

/**
 * A Toast component for displaying temporary notifications.
 *
 * This is a closed component that wraps Ark UI's Toast with consistent styling.
 *
 * Features:
 * - Multiple toast types (success, error, warning, info)
 * - Automatic stacking and positioning
 * - Action buttons
 * - Customizable duration
 * - Keyboard accessible
 * - Automatic dismissal
 *
 * @example
 * // In your component setup
 * import { createToaster } from '@ark-ui/vue/toast'
 * import { Toast } from '@/components/ui/toast'
 *
 * const toaster = createToaster({
 *   placement: 'bottom-end',
 *   overlap: true,
 *   gap: 16,
 * })
 *
 * // Create a toast
 * toaster.success({
 *   title: 'Success!',
 *   description: 'Your changes have been saved.',
 * })
 *
 * // In your template
 * <Toast :toaster="toaster" />
 */

const props = defineProps<ToasterProps>()

// Icon map for different toast types
const iconMap = {
  success: CircleCheck,
  error: CircleAlert,
  warning: TriangleAlert,
  info: Info,
  default: Info,
}

const getToastType = (type?: string): ToastType => {
  if (type && ['success', 'error', 'warning', 'info'].includes(type)) {
    return type as ToastType
  }
  return 'default'
}

const getIcon = (type?: string) => {
  const toastType = getToastType(type)
  return iconMap[toastType]
}

const getStyles = (type?: string) => {
  const toastType = getToastType(type)
  return toastVariants({ type: toastType })
}
</script>

<template>
  <Toaster :toaster="props.toaster">
    <template #default="toast">
      <Toast.Root :class="getStyles(toast.type).root()">
        <!-- Icon based on toast type -->
        <component
          :is="getIcon(toast.type)"
          :class="getStyles(toast.type).icon()"
          aria-hidden="true"
        />

        <!-- Toast content -->
        <div :class="getStyles(toast.type).content()">
          <Toast.Title :class="getStyles(toast.type).title()">
            {{ toast.title }}
          </Toast.Title>
          <Toast.Description
            v-if="toast.description"
            :class="getStyles(toast.type).description()"
          >
            {{ toast.description }}
          </Toast.Description>
        </div>

        <!-- Action button (optional) -->
        <Toast.ActionTrigger
          v-if="toast.action"
          :class="getStyles(toast.type).actionTrigger()"
        >
          {{ toast.action.label }}
        </Toast.ActionTrigger>

        <!-- Close button -->
        <Toast.CloseTrigger :class="getStyles(toast.type).closeTrigger()">
          <X class="size-4" />
          <span class="sr-only">Close</span>
        </Toast.CloseTrigger>
      </Toast.Root>
    </template>
  </Toaster>
</template>

