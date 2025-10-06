/**
 * Card component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Card variant definitions
 */
export const variantStyles = {
  default: 'bg-white border border-gray-200',
  bordered: 'bg-white border-2 border-gray-300',
  elevated: 'bg-white shadow-lg border border-transparent',
} as const

export const paddingStyles = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
} as const

export const cardVariants = tv({
  base: 'rounded-lg overflow-hidden',
  variants: {
    variant: variantStyles,
    padding: paddingStyles,
  },
  defaultVariants: {
    variant: 'default',
    padding: 'md',
  },
})
