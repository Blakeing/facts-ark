/**
 * Field component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Field variant definitions
 */
export const fieldVariants = tv({
  slots: {
    root: 'space-y-2',
    label: 'block text-sm font-medium text-gray-700',
    helperText: 'text-sm text-gray-500',
    errorText: 'text-sm text-red-600',
    requiredIndicator: 'text-red-500 ml-1',
  },
})
