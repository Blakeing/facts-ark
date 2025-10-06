/**
 * Input component - variant definitions
 *
 * Minimal styling approach - rely on native browser behavior
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Input size variants
 */
export const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
} as const

/**
 * Input variant definitions
 */
export const inputVariants = tv({
  base: [
    'w-full rounded-md border border-gray-300 bg-white text-gray-900',
    'placeholder:text-gray-400',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
    'read-only:bg-gray-50',
  ],
  variants: {
    size: sizeStyles,
    invalid: {
      true: 'border-red-500',
      false: '',
    },
  },
  defaultVariants: {
    size: 'md',
    invalid: false,
  },
})
