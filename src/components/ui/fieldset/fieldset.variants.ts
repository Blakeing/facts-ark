/**
 * Fieldset component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Fieldset variant definitions
 */
export const fieldsetVariants = tv({
  slots: {
    root: 'space-y-4 border border-gray-300 rounded-md p-4',
    legend: 'text-base font-semibold text-gray-900 px-2',
    helperText: 'text-sm text-gray-500',
    errorText: 'text-sm text-red-600',
  },
})
