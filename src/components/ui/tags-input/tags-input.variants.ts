/**
 * TagsInput component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

export const tagsInputVariants = tv({
  slots: {
    root: 'w-full',
    label: 'block text-sm font-medium text-gray-700 mb-2',
    control:
      'flex flex-wrap items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500',
    item: 'inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-900',
    itemText: 'text-sm',
    itemDeleteTrigger:
      'inline-flex items-center justify-center rounded-sm text-gray-500 hover:text-gray-700',
    input: 'flex-1 bg-transparent outline-none placeholder:text-gray-400 min-w-[120px]',
    clearTrigger:
      'inline-flex items-center justify-center rounded-sm text-gray-500 hover:text-gray-700',
  },
  variants: {
    variant: {
      default: {},
      outline: {
        item: 'border border-gray-300 bg-white',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
