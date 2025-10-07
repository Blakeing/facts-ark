/**
 * SegmentGroup component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

export const segmentGroupVariants = tv({
  slots: {
    root: 'space-y-2',
    label: 'block text-sm font-medium text-gray-700',
    itemsWrapper: 'relative inline-flex bg-gray-100 rounded-lg p-1',
    item: 'relative z-10 inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=checked]:text-gray-900',
    indicator: 'absolute bg-white shadow-sm rounded-md transition-all duration-200 ease-out z-0',
  },
  variants: {
    variant: {
      default: {
        itemsWrapper: 'bg-gray-100',
        indicator: 'bg-white',
      },
      pills: {
        itemsWrapper: 'bg-transparent gap-1',
        item: 'data-[state=checked]:bg-indigo-100 data-[state=checked]:text-indigo-700 rounded-lg',
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
