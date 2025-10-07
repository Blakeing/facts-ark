/**
 * Slider component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

export const sliderVariants = tv({
  slots: {
    root: 'w-full',
    label: 'flex items-center justify-between mb-2',
    labelText: 'text-sm font-medium text-gray-700',
    valueText: 'text-sm font-medium text-gray-700',
    control: 'relative flex items-center w-full',
    track: 'relative w-full overflow-hidden rounded-full bg-gray-200',
    range: 'absolute h-full',
    thumb:
      'block rounded-full bg-white shadow-sm ring-2 ring-offset-2 transition-shadow hover:shadow-md focus:outline-none focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  },
  variants: {
    variant: {
      default: {
        range: 'bg-indigo-600',
        thumb: 'ring-indigo-600 focus:ring-indigo-600',
      },
      success: {
        range: 'bg-green-600',
        thumb: 'ring-green-600 focus:ring-green-600',
      },
      warning: {
        range: 'bg-yellow-500',
        thumb: 'ring-yellow-500 focus:ring-yellow-500',
      },
      danger: {
        range: 'bg-red-600',
        thumb: 'ring-red-600 focus:ring-red-600',
      },
    },
    size: {
      sm: {
        track: 'h-1',
        thumb: 'h-3 w-3',
      },
      md: {
        track: 'h-2',
        thumb: 'h-4 w-4',
      },
      lg: {
        track: 'h-3',
        thumb: 'h-5 w-5',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
