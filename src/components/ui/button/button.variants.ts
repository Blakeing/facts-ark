/**
 * Button component - variant definitions
 *
 * Buttons are presentational - minimal Ark UI involvement, mostly Tailwind styling
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Button variant definitions
 */
export const variantStyles = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-500 disabled:bg-indigo-400',
  secondary:
    'bg-white text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:bg-gray-100',
  outline:
    'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 disabled:bg-transparent',
  ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 disabled:bg-transparent',
  danger: 'bg-red-600 text-white hover:bg-red-500 disabled:bg-red-400',
} as const

export const sizeStyles = {
  sm: 'px-2.5 py-1.5 text-sm',
  md: 'px-3.5 py-2.5 text-sm',
  lg: 'px-4 py-3 text-base',
} as const

export const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-x-2 rounded-md font-semibold shadow-sm',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  variants: {
    variant: variantStyles,
    size: sizeStyles,
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    fullWidth: false,
  },
})
