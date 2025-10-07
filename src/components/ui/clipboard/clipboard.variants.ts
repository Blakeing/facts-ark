/**
 * Clipboard component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

export const clipboardVariants = tv({
  slots: {
    root: 'w-full',
    label: 'block text-sm font-medium text-gray-700 mb-2',
    control: 'flex gap-2',
    input:
      'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
    trigger:
      'inline-flex items-center justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50',
    indicator: 'flex items-center',
  },
  variants: {
    variant: {
      default: {
        control: 'flex gap-2',
        input: 'flex-1',
        trigger: 'shrink-0',
      },
      inline: {
        control: 'inline-flex gap-1',
        input: 'flex-1 max-w-xs',
        trigger: 'shrink-0 px-2 py-1 text-xs',
      },
      button: {
        root: 'inline-block',
        control: 'inline-flex',
        input: 'sr-only',
        trigger: 'inline-flex items-center gap-2',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
