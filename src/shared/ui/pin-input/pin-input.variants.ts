/**
 * Pin Input component - variant definitions
 *
 * Design inspired by Park UI's pin input component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Pin Input variants matching Park UI's design system
 */
export const pinInputVariants = tv({
  slots: {
    root: ['flex flex-col gap-2'],

    label: [
      'text-sm font-medium leading-none',
      'text-foreground',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70',
    ],

    control: ['flex gap-2'],

    input: [
      // Layout
      'flex items-center justify-center',
      'rounded-md',

      // Size
      'w-12 h-12',

      // Colors & borders
      'bg-background',
      'border border-input',
      'text-foreground text-center',

      // Typography
      'text-base font-medium',

      // Focus
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-ring',
      'focus:ring-offset-0',
      'focus:border-transparent',

      // States
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      'data-[complete]:border-primary',
      'data-[invalid]:border-destructive',

      // Transitions
      'transition-all',
    ],
  },
  variants: {
    size: {
      sm: {
        input: 'w-9 h-9 text-sm',
      },
      md: {
        input: 'w-12 h-12 text-base',
      },
      lg: {
        input: 'w-14 h-14 text-lg',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
