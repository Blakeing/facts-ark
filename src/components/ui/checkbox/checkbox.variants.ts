/**
 * Checkbox component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Checkbox size variants
 */
export const sizeStyles = {
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
} as const

/**
 * Checkbox variant definitions
 */
export const checkboxVariants = tv({
  slots: {
    root: 'flex items-center gap-2',
    control:
      'flex items-center justify-center rounded border-2 border-gray-300 bg-white data-[state=checked]:bg-indigo-600 data-[state=checked]:border-indigo-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    label:
      'text-sm font-medium text-gray-700 cursor-pointer data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
  },
  variants: {
    size: {
      sm: {
        control: sizeStyles.sm,
        label: 'text-xs',
      },
      md: {
        control: sizeStyles.md,
        label: 'text-sm',
      },
      lg: {
        control: sizeStyles.lg,
        label: 'text-base',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
