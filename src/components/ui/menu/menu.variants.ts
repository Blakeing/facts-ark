/**
 * Menu component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

export const menuVariants = tv({
  slots: {
    trigger:
      'inline-flex items-center justify-center gap-2 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50',
    positioner: 'z-50',
    content:
      'z-50 min-w-[12rem] overflow-hidden rounded-md border border-gray-200 bg-white p-1 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    item: 'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-gray-100 focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    itemIcon: 'h-4 w-4 text-gray-500',
    itemShortcut: 'ml-auto text-xs text-gray-500',
    separator: 'my-1 h-px bg-gray-200',
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
