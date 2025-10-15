/**
 * Checkbox component - variant definitions
 *
 * Design inspired by Park UI's checkbox component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Checkbox variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens
 * - Proper focus states with ring
 * - Smooth transitions
 * - Accessible by default (Ark UI)
 */
export const checkboxVariants = tv({
  slots: {
    root: 'flex items-center gap-2',

    control: [
      // Layout
      'flex items-center justify-center',

      // Visual
      'rounded border-2',

      // Colors
      'border-input bg-background',
      'data-[state=checked]:bg-primary data-[state=checked]:border-primary',

      // Focus states (using new focus-ring system)
      'focus-ring',

      // States
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',

      // Animations & Transitions (using new design system)
      'transition-colors-smooth',
      'active:scale-95',
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
        control: 'size-4',
        label: 'text-xs',
      },
      md: {
        control: 'size-5',
        label: 'text-sm',
      },
      lg: {
        control: 'size-6',
        label: 'text-base',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
