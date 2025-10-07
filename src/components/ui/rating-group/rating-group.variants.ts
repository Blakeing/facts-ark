/**
 * RatingGroup component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

export const ratingGroupVariants = tv({
  slots: {
    root: 'inline-flex flex-col gap-2',
    label: 'text-sm font-medium text-gray-700',
    control: 'inline-flex gap-1',
    item: 'cursor-pointer transition-colors hover:scale-110 data-[highlighted]:scale-110',
  },
  variants: {
    variant: {
      default: {
        item: 'text-gray-300 data-[highlighted]:text-indigo-500',
      },
      yellow: {
        item: 'text-gray-300 data-[highlighted]:text-yellow-400',
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
