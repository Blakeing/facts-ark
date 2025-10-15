/**
 * Toast component - variant definitions
 *
 * Tailwind-variants for vue-sonner toast styling
 * Used via toastOptions.classes in Toast.vue
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Toast variants with semantic color tokens
 *
 * These classes are applied via vue-sonner's toastOptions.classes
 * using group selectors for proper scoping
 */
export const toastVariants = tv({
  slots: {
    toast: [
      'group toast',
      'group-[.toaster]:bg-card',
      'group-[.toaster]:text-card-foreground',
      'group-[.toaster]:border-border',
      'group-[.toaster]:shadow-lg',
      'group-[.toaster]:rounded-lg',
    ],
    description: ['group-[.toast]:text-muted-foreground'],
    actionButton: [
      'group-[.toast]:bg-primary',
      'group-[.toast]:text-primary-foreground',
      'group-[.toast]:rounded-md',
      'group-[.toast]:px-3',
      'group-[.toast]:py-1.5',
      'group-[.toast]:text-sm',
      'group-[.toast]:font-medium',
      'group-[.toast]:transition-colors',
    ],
    cancelButton: [
      'group-[.toast]:bg-muted',
      'group-[.toast]:text-muted-foreground',
      'group-[.toast]:rounded-md',
      'group-[.toast]:px-3',
      'group-[.toast]:py-1.5',
      'group-[.toast]:text-sm',
      'group-[.toast]:transition-colors',
    ],
    closeButton: [
      'group-[.toast]:bg-transparent',
      'group-[.toast]:text-muted-foreground',
      'hover:group-[.toast]:text-foreground',
      'group-[.toast]:transition-colors',
    ],
    error: [
      'group-[.toaster]:bg-bg-error-subtle',
      'group-[.toaster]:text-fg-error',
      'group-[.toaster]:border-border-error',
    ],
    success: [
      'group-[.toaster]:bg-bg-success-subtle',
      'group-[.toaster]:text-fg-success',
      'group-[.toaster]:border-border-success',
    ],
    warning: [
      'group-[.toaster]:bg-bg-warning-subtle',
      'group-[.toaster]:text-fg-warning',
      'group-[.toaster]:border-border-warning',
    ],
    info: [
      'group-[.toaster]:bg-bg-info-subtle',
      'group-[.toaster]:text-fg-info',
      'group-[.toaster]:border-border-info',
    ],
  },
})

/**
 * Helper to get toast classes for vue-sonner's toastOptions
 */
export function getToastClasses() {
  const styles = toastVariants()

  return {
    toast: styles.toast(),
    description: styles.description(),
    actionButton: styles.actionButton(),
    cancelButton: styles.cancelButton(),
    closeButton: styles.closeButton(),
    error: styles.error(),
    success: styles.success(),
    warning: styles.warning(),
    info: styles.info(),
  }
}
