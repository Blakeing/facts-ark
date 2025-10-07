/**
 * RadioGroup component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

export const radioGroupVariants = tv({
  slots: {
    root: 'space-y-3',
    label: 'block text-sm font-medium text-gray-900 mb-3',
    indicator: '',
    item: 'flex items-start',
    itemControl:
      'mt-0.5 h-4 w-4 rounded-full border border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2 data-[state=checked]:border-indigo-600 data-[state=checked]:bg-indigo-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    itemText: 'ml-3 block text-sm font-medium text-gray-900 data-[disabled]:opacity-50',
    itemDescription: 'text-sm text-gray-500',
  },
  variants: {
    variant: {
      default: {
        item: 'flex items-start',
      },
      cards: {
        root: 'grid gap-3',
        item: 'relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm hover:border-gray-400 focus:outline-none data-[state=checked]:border-indigo-600 data-[state=checked]:ring-2 data-[state=checked]:ring-indigo-600',
        itemControl: 'absolute right-4 top-4',
        itemText: 'ml-0 block text-sm font-medium text-gray-900',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
