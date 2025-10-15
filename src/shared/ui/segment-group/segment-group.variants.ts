/**
 * SegmentGroup component - variant definitions
 *
 * Design inspired by Park UI's segment group component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Segment Group variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Multiple visual styles
 * - Smooth indicator animation
 * - Multiple sizes
 */
export const segmentGroupVariants = tv({
  slots: {
    root: 'space-y-2',

    label: 'block text-sm font-medium text-foreground',

    itemsWrapper: 'relative inline-flex bg-muted rounded-lg p-1',

    item: [
      'relative z-10 inline-flex items-center justify-center font-medium',
      'transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=checked]:text-foreground',
    ],

    indicator: [
      'absolute bg-background shadow-sm rounded-md',
      'transition-all duration-200 ease-out',
      'z-0',
    ],
  },
  variants: {
    variant: {
      default: {
        itemsWrapper: 'bg-muted',
        indicator: 'bg-background',
      },
      pills: {
        itemsWrapper: 'bg-transparent gap-1',
        item: 'data-[state=checked]:bg-secondary data-[state=checked]:text-secondary-foreground rounded-lg',
        indicator: 'hidden',
      },
    },
    size: {
      sm: {
        item: 'px-3 py-1.5 text-xs',
      },
      md: {
        item: 'px-4 py-2 text-sm',
      },
      lg: {
        item: 'px-6 py-3 text-base',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
