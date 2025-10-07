/**
 * Collapsible component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

export const collapsibleVariants = tv({
  slots: {
    root: 'w-full',
    trigger:
      'group flex w-full items-center justify-between text-left text-sm font-medium text-gray-900 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50',
    triggerIcon: 'mr-2 text-gray-400 group-hover:text-indigo-500',
    indicator:
      'ml-2 h-5 w-5 text-gray-500 transition-transform duration-200 data-[state=open]:rotate-180',
    content:
      'overflow-hidden text-sm text-gray-600 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
  },
  variants: {
    variant: {
      default: {
        root: 'space-y-2',
        trigger: 'py-3',
        content: 'pt-2 pb-3',
      },
      bordered: {
        root: 'rounded-lg border border-gray-200 p-4 space-y-2',
        trigger: 'py-2',
        content: 'pt-3',
      },
      ghost: {
        root: 'space-y-1',
        trigger: 'py-2 hover:bg-gray-50 px-2 rounded-md -mx-2',
        content: 'px-2',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
