/**
 * Badge component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Badge variant definitions
 */
export const variantStyles = {
  default: 'bg-gray-100 text-gray-800 ring-gray-500/10',
  success: 'bg-green-50 text-green-700 ring-green-600/20',
  warning: 'bg-yellow-50 text-yellow-800 ring-yellow-600/20',
  error: 'bg-red-50 text-red-700 ring-red-600/20',
  info: 'bg-blue-50 text-blue-700 ring-blue-600/20',
} as const

export const sizeStyles = {
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-1 text-sm',
  lg: 'px-2.5 py-1.5 text-base',
} as const

export const badgeVariants = tv({
  base: 'inline-flex items-center rounded-md font-medium ring-1 ring-inset',
  variants: {
    variant: variantStyles,
    size: sizeStyles,
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
