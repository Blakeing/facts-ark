/**
 * Textarea component - variant definitions
 *
 * Minimal styling approach - rely on native browser behavior
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Textarea size variants
 */
export const sizeStyles = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
} as const

/**
 * Textarea variant definitions
 */
export const textareaVariants = tv({
  base: [
    'w-full rounded-md border border-gray-300 bg-white text-gray-900',
    'placeholder:text-gray-400',
    'disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-gray-50',
    'read-only:bg-gray-50',
    'resize-y',
  ],
  variants: {
    size: sizeStyles,
    invalid: {
      true: 'border-red-500',
      false: '',
    },
    resize: {
      none: 'resize-none',
      both: 'resize',
      vertical: 'resize-y',
      horizontal: 'resize-x',
    },
  },
  defaultVariants: {
    size: 'md',
    invalid: false,
    resize: 'vertical',
  },
})
