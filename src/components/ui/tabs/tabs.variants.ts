/**
 * Tabs component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

export const tabsVariants = tv({
  slots: {
    root: '',
    mobileWrapper: 'grid grid-cols-1 sm:hidden',
    desktopWrapper: 'hidden sm:block',
    list: '',
    trigger: '',
    triggerIcon: '',
    content: 'pt-4',
    indicator: '',
  },
  variants: {
    variant: {
      line: {
        list: 'border-b border-gray-200 flex space-x-8',
        trigger:
          'group inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 data-[selected]:border-indigo-500 data-[selected]:text-indigo-600',
        triggerIcon:
          'text-gray-400 group-hover:text-gray-500 group-data-[selected]:text-indigo-500',
        indicator: 'absolute inset-x-0 bottom-0 h-0.5 bg-indigo-500',
      },
      pills: {
        list: 'flex space-x-4',
        trigger:
          'group rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 data-[selected]:bg-gray-100 data-[selected]:text-gray-700',
        triggerIcon: 'text-gray-400 group-hover:text-gray-500 group-data-[selected]:text-gray-700',
      },
      enclosed: {
        list: 'flex gap-1 border-b border-gray-200',
        trigger:
          'group px-4 py-2 text-sm font-medium text-gray-500 rounded-t-lg hover:text-gray-700 data-[selected]:bg-white data-[selected]:text-indigo-600 data-[selected]:border data-[selected]:border-gray-200 data-[selected]:border-b-white data-[selected]:-mb-px',
        triggerIcon:
          'text-gray-400 group-hover:text-gray-500 group-data-[selected]:text-indigo-600',
      },
      bar: {
        list: 'isolate flex divide-x divide-gray-200 rounded-lg bg-white shadow-sm',
        trigger:
          'group relative min-w-0 flex-1 overflow-hidden px-4 py-4 text-center text-sm font-medium hover:bg-gray-50 first:rounded-l-lg last:rounded-r-lg text-gray-500 hover:text-gray-700 data-[selected]:text-gray-900',
        triggerIcon: 'text-gray-400 group-hover:text-gray-500 group-data-[selected]:text-gray-900',
        indicator: 'absolute inset-x-0 bottom-0 h-0.5 data-[selected]:bg-indigo-500',
      },
    },
  },
  defaultVariants: {
    variant: 'line',
  },
})
