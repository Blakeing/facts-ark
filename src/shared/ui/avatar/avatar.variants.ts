/**
 * Avatar component - variant definitions
 *
 * Design inspired by Park UI's avatar component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Avatar variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens for background
 * - Consistent sizing scale
 * - Rounded corners
 */
export const avatarVariants = tv({
  base: [
    // Layout
    'relative inline-flex items-center justify-center',

    // Visual
    'overflow-hidden rounded-full',

    // Colors
    'bg-muted text-muted-foreground',
  ],
  variants: {
    size: {
      sm: 'size-8 text-xs',
      md: 'size-10 text-sm',
      lg: 'size-12 text-base',
      xl: 'size-16 text-lg',
      '2xl': 'size-20 text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
