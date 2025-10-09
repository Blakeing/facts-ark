/**
 * Password Input component - variant definitions
 *
 * Design inspired by Park UI's password input component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Password Input variants matching Park UI's design system
 */
export const passwordInputVariants = tv({
  slots: {
    root: ['w-full'],

    label: [
      'text-sm font-medium leading-none',
      'text-foreground',
      'peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
    ],

    control: ['relative flex items-center', 'mt-2'],

    input: [
      // Layout
      'flex-1 w-full',
      'h-10 rounded-md px-3 py-2',
      'pr-10', // Space for the visibility toggle

      // Colors & borders
      'bg-background',
      'border border-input',
      'text-foreground',
      'placeholder:text-muted-foreground',

      // Typography
      'text-sm',

      // Focus
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-0',

      // States
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',

      // Transitions
      'transition-colors',
    ],

    visibilityTrigger: [
      // Position
      'absolute right-0 top-0',

      // Layout
      'inline-flex items-center justify-center',
      'h-10 w-10',

      // Colors
      'text-muted-foreground hover:text-foreground',

      // States
      'disabled:pointer-events-none disabled:opacity-50',

      // Focus
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-0',
      'rounded-md',

      // Transitions
      'transition-colors',
    ],

    indicator: ['size-4'],
  },
  variants: {
    size: {
      sm: {
        input: 'h-8 text-xs px-2',
        visibilityTrigger: 'h-8 w-8',
      },
      md: {
        input: 'h-10 text-sm px-3',
        visibilityTrigger: 'h-10 w-10',
      },
      lg: {
        input: 'h-12 text-base px-4',
        visibilityTrigger: 'h-12 w-12',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
