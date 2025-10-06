/**
 * Avatar component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Avatar size variants definition
 */
const sizeVariants = {
  sm: 'size-8 text-xs',
  md: 'size-10 text-sm',
  lg: 'size-12 text-base',
  xl: 'size-16 text-lg',
} as const

/**
 * Avatar variant definitions
 */
export const avatarVariants = tv({
  base: 'relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-100',
  variants: {
    size: sizeVariants,
  },
  defaultVariants: {
    size: 'md',
  },
})

export { sizeVariants }
