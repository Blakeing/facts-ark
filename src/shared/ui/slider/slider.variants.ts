/**
 * Slider component - variant definitions
 *
 * Design inspired by Park UI's slider component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Slider variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Multiple status colors
 * - Smooth thumb interactions
 * - Multiple sizes
 */
export const sliderVariants = tv({
  slots: {
    root: 'w-full',

    label: 'flex items-center justify-between mb-2',

    labelText: 'text-sm font-medium text-foreground',

    valueText: 'text-sm font-medium text-foreground',

    control: 'relative flex items-center w-full',

    track: 'relative w-full overflow-hidden rounded-full bg-muted',

    range: 'absolute h-full',

    thumb: [
      'block rounded-full bg-background shadow-sm',
      'ring-2 ring-offset-2',
      'transition-shadow',
      'hover:shadow-md',
      'focus:outline-none focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
    ],
  },
  variants: {
    variant: {
      default: {
        range: 'bg-primary',
        thumb: 'ring-primary focus:ring-primary',
      },
      success: {
        range: 'bg-success',
        thumb: 'ring-success focus:ring-success',
      },
      warning: {
        range: 'bg-warning',
        thumb: 'ring-warning focus:ring-warning',
      },
      danger: {
        range: 'bg-destructive',
        thumb: 'ring-destructive focus:ring-destructive',
      },
    },
    size: {
      sm: {
        track: 'h-1',
        thumb: 'h-3 w-3',
      },
      md: {
        track: 'h-2',
        thumb: 'h-4 w-4',
      },
      lg: {
        track: 'h-3',
        thumb: 'h-5 w-5',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
