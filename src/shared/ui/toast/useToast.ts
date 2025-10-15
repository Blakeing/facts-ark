/**
 * Toast composable - shadcn-vue style
 *
 * Simple re-export of vue-sonner's toast API.
 * Styled via Toast.vue component using toastOptions.classes.
 *
 * @example
 * import { toast } from '@/shared/ui/toast'
 *
 * // Basic toasts
 * toast.success('Success!')
 * toast.error('Error occurred')
 * toast.warning('Warning!')
 * toast.info('Information')
 *
 * // With description
 * toast.success('Success!', {
 *   description: 'Your changes have been saved.'
 * })
 *
 * // With action button
 * toast('Event created', {
 *   action: {
 *     label: 'Undo',
 *     onClick: () => console.log('Undo clicked')
 *   }
 * })
 *
 * // Persistent toast
 * toast('Important message', { duration: Infinity })
 *
 * // Dismiss toasts
 * const id = toast.success('Message')
 * toast.dismiss(id) // Dismiss specific
 * toast.dismiss() // Dismiss all
 *
 * @see https://github.com/xiaoluoboding/vue-sonner
 */

import { toast } from 'vue-sonner'

/**
 * Export toast function directly from vue-sonner
 * All styling handled via Toast.vue component
 */
export { toast }

/**
 * For backwards compatibility, also export as useToast composable
 */
export function useToast() {
  return { toast }
}

/**
 * Re-export types
 */
export type { ExternalToast, ToastT } from 'vue-sonner'
