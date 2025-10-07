/**
 * Steps component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

export const stepsVariants = tv({
  slots: {
    root: 'w-full',
    list: 'flex items-center justify-between',
    item: 'flex items-center',
    trigger: 'group flex items-center gap-2 cursor-pointer',
    indicator:
      'flex items-center justify-center rounded-full border-2 transition-colors data-[state=incomplete]:border-gray-300 data-[state=incomplete]:bg-white data-[state=incomplete]:text-gray-500 data-[state=current]:border-indigo-600 data-[state=current]:bg-indigo-600 data-[state=current]:text-white data-[state=complete]:border-indigo-600 data-[state=complete]:bg-indigo-600 data-[state=complete]:text-white',
    title:
      'font-medium text-sm data-[state=incomplete]:text-gray-500 data-[state=current]:text-gray-900 data-[state=complete]:text-gray-900',
    description: 'text-xs text-gray-500',
    separator: 'flex-1 h-0.5 mx-4 bg-gray-200 data-[state=complete]:bg-indigo-600',
    content: 'mt-8 p-6 bg-white rounded-lg border border-gray-200',
    completedContent: 'mt-8 p-6 bg-green-50 rounded-lg border border-green-200',
    navigation: 'mt-6 flex gap-3',
    prevButton:
      'inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50',
    nextButton:
      'inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-50',
  },
  variants: {
    variant: {
      default: {
        indicator: 'h-10 w-10',
      },
      circles: {
        indicator: 'h-12 w-12',
        title: 'text-base',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
