/**
 * Switch component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Switch size variants
 */
export const sizeStyles = {
  sm: {
    width: 'w-9',
    height: 'h-5',
    thumb: 'size-4',
  },
  md: {
    width: 'w-11',
    height: 'h-6',
    thumb: 'size-5',
  },
  lg: {
    width: 'w-14',
    height: 'h-7',
    thumb: 'size-6',
  },
} as const

/**
 * Switch variant definitions
 */
export const switchVariants = tv({
  slots: {
    root: 'flex items-center gap-2',
    control:
      'relative inline-flex shrink-0 cursor-pointer rounded-full bg-gray-200 data-[state=checked]:bg-indigo-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    thumb: 'inline-block rounded-full bg-white shadow data-[state=checked]:translate-x-full',
    label:
      'text-sm font-medium text-gray-700 cursor-pointer data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
  },
  variants: {
    size: {
      sm: {
        control: `${sizeStyles.sm.width} ${sizeStyles.sm.height}`,
        thumb: sizeStyles.sm.thumb,
        label: 'text-xs',
      },
      md: {
        control: `${sizeStyles.md.width} ${sizeStyles.md.height}`,
        thumb: sizeStyles.md.thumb,
        label: 'text-sm',
      },
      lg: {
        control: `${sizeStyles.lg.width} ${sizeStyles.lg.height}`,
        thumb: sizeStyles.lg.thumb,
        label: 'text-base',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
