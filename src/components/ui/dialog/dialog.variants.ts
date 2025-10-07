/**
 * Dialog component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

export const dialogVariants = tv({
  slots: {
    trigger:
      'inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
    backdrop:
      'fixed inset-0 bg-gray-500/75 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    positioner: 'fixed inset-0 z-50 flex items-center justify-center p-4',
    content:
      'relative bg-white rounded-lg shadow-xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    title: 'text-lg font-semibold text-gray-900',
    description: 'mt-2 text-sm text-gray-500',
    closeTrigger:
      'absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2',
  },
  variants: {
    variant: {
      default: {
        content: 'w-full max-w-lg p-6',
      },
      centered: {
        content: 'w-full max-w-md p-8 text-center',
        title: 'text-center',
        description: 'text-center',
      },
      fullscreen: {
        positioner: 'p-0',
        content: 'w-full h-full max-w-none rounded-none p-8',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
