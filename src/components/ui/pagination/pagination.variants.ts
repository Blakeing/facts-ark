/**
 * Pagination component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

export const paginationVariants = tv({
  slots: {
    root: 'flex items-center justify-center gap-2',
    prevTrigger:
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50',
    nextTrigger:
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 disabled:pointer-events-none disabled:opacity-50',
    item: 'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-gray-100 data-[selected]:bg-indigo-600 data-[selected]:text-white data-[selected]:hover:bg-indigo-700',
    ellipsis: 'flex items-center justify-center text-gray-500',
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
