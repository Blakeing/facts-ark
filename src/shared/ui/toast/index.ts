/**
 * Toast module exports
 *
 * Vue Sonner implementation with shadcn-vue styling + tailwind-variants
 */

export { default as Toast } from './Toast.vue'
export { toast, useToast } from './useToast'
export { toastVariants, getToastClasses } from './toast.variants'

// Re-export vue-sonner types for convenience
export type { ExternalToast, ToastT } from 'vue-sonner'
