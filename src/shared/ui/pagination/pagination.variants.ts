/**
 * Pagination component - variant definitions
 *
 * Design inspired by Park UI's pagination component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Pagination variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Multiple sizes
 * - Simple variant for minimal UI
 * - Smooth transitions
 */
export const paginationVariants = tv({
  slots: {
    root: 'flex items-center justify-center gap-2',

    prevTrigger: [
      'inline-flex items-center justify-center rounded-md',
      'text-sm font-medium',
      'text-foreground',
      'transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'disabled:pointer-events-none disabled:opacity-50',
    ],

    nextTrigger: [
      'inline-flex items-center justify-center rounded-md',
      'text-sm font-medium',
      'text-foreground',
      'transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'disabled:pointer-events-none disabled:opacity-50',
    ],

    item: [
      'inline-flex items-center justify-center rounded-md',
      'text-sm font-medium',
      'text-foreground',
      'transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'data-[selected]:bg-primary data-[selected]:text-primary-foreground',
      'data-[selected]:hover:bg-primary/90',
    ],

    ellipsis: 'flex items-center justify-center text-muted-foreground',
  },
  variants: {
    variant: {
      default: {},
      simple: {
        item: 'hidden',
        ellipsis: 'hidden',
      },
    },
    size: {
      sm: {
        prevTrigger: 'h-8 px-2',
        nextTrigger: 'h-8 px-2',
        item: 'h-8 w-8',
      },
      md: {
        prevTrigger: 'h-10 px-3',
        nextTrigger: 'h-10 px-3',
        item: 'h-10 w-10',
      },
      lg: {
        prevTrigger: 'h-12 px-4',
        nextTrigger: 'h-12 px-4',
        item: 'h-12 w-12',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
