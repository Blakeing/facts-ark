/**
 * Progress component - variant definitions
 *
 * Design inspired by Park UI's progress component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Progress variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Multiple status colors
 * - Smooth animations
 * - Multiple sizes
 */
export const progressVariants = tv({
  slots: {
    root: 'w-full',

    label: 'flex items-center justify-between mb-2',

    labelText: 'text-sm font-medium text-foreground',

    valueText: 'text-sm font-medium text-foreground',

    track: 'overflow-hidden rounded-full bg-muted',

    range: 'h-full transition-all duration-300 ease-in-out',
  },
  variants: {
    variant: {
      default: {
        range: 'bg-primary',
      },
      success: {
        range: 'bg-success',
      },
      warning: {
        range: 'bg-warning',
      },
      danger: {
        range: 'bg-destructive',
      },
    },
    size: {
      sm: {
        track: 'h-1',
      },
      md: {
        track: 'h-2',
      },
      lg: {
        track: 'h-3',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
