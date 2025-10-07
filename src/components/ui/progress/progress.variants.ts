/**
 * Progress component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

export const progressVariants = tv({
  slots: {
    root: 'w-full',
    label: 'flex items-center justify-between mb-2',
    labelText: 'text-sm font-medium text-gray-700',
    valueText: 'text-sm font-medium text-gray-700',
    track: 'overflow-hidden rounded-full bg-gray-200',
    range: 'h-full transition-all duration-300 ease-in-out',
  },
  variants: {
    variant: {
      default: {
        range: 'bg-indigo-600',
      },
      success: {
        range: 'bg-green-600',
      },
      warning: {
        range: 'bg-yellow-500',
      },
      danger: {
        range: 'bg-red-600',
      },
    },
    size: {
      sm: {
        track: 'h-1',
      },
      md: {
        track: 'h-2',
      },
      lg: {
        track: 'h-3',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
