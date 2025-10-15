<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import type { ToasterProps } from 'vue-sonner'
import { Toaster as Sonner } from 'vue-sonner'
import { getToastClasses } from './toast.variants'

/**
 * Toast Component - shadcn-vue style with tailwind-variants
 *
 * Combines the best of both approaches:
 * - Simple shadcn pattern (no custom components)
 * - Tailwind-variants for organized, type-safe styling
 *
 * Styling is defined in toast.variants.ts and applied via
 * vue-sonner's toastOptions.classes for consistency with
 * our other components (Button, Card, etc.)
 *
 * IMPORTANT: Requires 'vue-sonner/style.css' import in main.css for:
 * - Toast animations (slide in/out, fade)
 * - Positioning and stacking
 * - Transitions and transforms
 *
 * @see https://github.com/xiaoluoboding/vue-sonner
 * @see https://ui.shadcn.com/docs/components/sonner
 */

const props = withDefaults(defineProps<ToasterProps>(), {
  position: 'bottom-right',
  richColors: true,
  duration: 5000,
  closeButton: true,
  closeButtonPosition: 'top-right',
})

// Get toast classes from tailwind-variants
const toastClasses = getToastClasses()
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :toast-options="{
      classes: toastClasses,
    }"
  />
</template>
