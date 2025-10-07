/**
 * ToggleGroup component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

export const toggleGroupVariants = tv({
  slots: {
    root: 'inline-flex rounded-md shadow-sm',
    item: 'inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-indigo-600 data-[state=on]:text-white',
  },
  variants: {
    variant: {
      default: {
        item: 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 first:rounded-l-md last:rounded-r-md -ml-px first:ml-0',
      },
      outline: {
        item: 'border border-gray-300 bg-transparent hover:bg-gray-100 first:rounded-l-md last:rounded-r-md -ml-px first:ml-0',
      },
    },
    size: {
      sm: {
        item: 'px-3 py-1.5 text-xs gap-1.5',
      },
      md: {
        item: 'px-4 py-2 text-sm gap-2',
      },
      lg: {
        item: 'px-6 py-3 text-base gap-2',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
