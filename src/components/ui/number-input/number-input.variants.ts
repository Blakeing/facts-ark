/**
 * NumberInput component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

export const numberInputVariants = tv({
  slots: {
    root: 'w-full',
    label: 'block text-sm font-medium text-gray-700 mb-2',
    control: 'relative inline-flex',
    input:
      'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500',
    incrementTrigger:
      'absolute right-0 top-0 inline-flex items-center justify-center border-l border-gray-300 bg-gray-50 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50',
    decrementTrigger:
      'absolute right-0 bottom-0 inline-flex items-center justify-center border-l border-t border-gray-300 bg-gray-50 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50',
  },
  variants: {
    variant: {
      default: {},
      outline: {
        input: 'border-2',
      },
    },
    size: {
      sm: {
        input: 'h-8 text-sm pr-16',
        incrementTrigger: 'h-4 w-8',
        decrementTrigger: 'h-4 w-8',
      },
      md: {
        input: 'h-10 text-sm pr-20',
        incrementTrigger: 'h-5 w-10',
        decrementTrigger: 'h-5 w-10',
      },
      lg: {
        input: 'h-12 text-base pr-24',
        incrementTrigger: 'h-6 w-12',
        decrementTrigger: 'h-6 w-12',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
