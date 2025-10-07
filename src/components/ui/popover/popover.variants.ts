/**
 * Popover component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

export const popoverVariants = tv({
  slots: {
    trigger:
      'inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
    positioner: 'z-50',
    content:
      'z-50 w-80 rounded-lg bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    title: 'text-base font-semibold text-gray-900',
    description: 'mt-2 text-sm text-gray-500',
    closeTrigger:
      'absolute right-2 top-2 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2',
  },
  variants: {
    variant: {
      default: {},
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
