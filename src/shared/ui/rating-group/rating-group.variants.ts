/**
 * RatingGroup component - variant definitions
 *
 * Design inspired by Park UI's rating group component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Rating Group variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Multiple color variants
 * - Hover and scale effects
 * - Multiple sizes
 */
export const ratingGroupVariants = tv({
  slots: {
    root: 'inline-flex flex-col gap-2',

    label: 'text-sm font-medium text-foreground',

    control: 'inline-flex gap-1',

    item: ['cursor-pointer transition-all', 'hover:scale-110', 'data-[highlighted]:scale-110'],
  },
  variants: {
    variant: {
      default: {
        item: 'text-muted data-[highlighted]:text-primary',
      },
      yellow: {
        item: 'text-muted data-[highlighted]:text-warning',
      },
    },
    size: {
      sm: {
        item: 'h-4 w-4',
      },
      md: {
        item: 'h-6 w-6',
      },
      lg: {
        item: 'h-8 w-8',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
