/**
 * Switch component - variant definitions
 *
 * Design inspired by Park UI's switch component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Switch variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens
 * - Proper focus states with ring
 * - Smooth transitions
 * - Accessible by default (Ark UI)
 */
export const switchVariants = tv({
  slots: {
    root: 'flex items-center gap-2',

    control: [
      // Layout
      'relative inline-flex shrink-0 items-center',

      // Padding for thumb spacing
      'p-0.5',

      // Visual
      'rounded-full',

      // Colors
      'bg-input',
      'data-[state=checked]:bg-primary',

      // Interaction
      'cursor-pointer',

      // Focus states (using new focus-ring system)
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',

      // States
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',

      // Animations & Transitions (using new design system)
      'transition-colors',
      'active:scale-95',
    ],

    thumb: [
      // Layout
      'inline-block pointer-events-none',

      // Visual
      'rounded-full bg-background shadow-lg ring-0',

      // Animations & Transitions (using new design system)
      'transition-transform duration-200',
    ],

    label: [
      // Typography
      'font-medium text-foreground',

      // Interaction
      'cursor-pointer select-none',

      // States
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    ],
  },
  variants: {
    size: {
      sm: {
        control: 'w-9 h-5',
        thumb: 'size-4 data-[state=checked]:translate-x-4',
        label: 'text-xs',
      },
      md: {
        control: 'w-11 h-6',
        thumb: 'size-5 data-[state=checked]:translate-x-5',
        label: 'text-sm',
      },
      lg: {
        control: 'w-14 h-7',
        thumb: 'size-6 data-[state=checked]:translate-x-7',
        label: 'text-base',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
