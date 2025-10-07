/**
 * Card component - variant definitions
 *
 * Design inspired by Park UI's card component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Card variants matching Park UI's design system
 *
 * Variants:
 * - outline: Card with border (default)
 * - elevated: Card with shadow, no border
 * - filled: Card with subtle background
 */
export const cardVariants = tv({
  base: [
    // Layout
    'rounded-lg',

    // Typography
    'text-card-foreground',

    // Animations & Transitions (using new design system)
    'transition-smooth',
  ],
  variants: {
    variant: {
      // Outline - default with border
      outline: ['bg-card', 'border border-border', 'shadow-sm'],

      // Elevated - shadow instead of border
      elevated: ['bg-card', 'shadow-md'],

      // Filled - subtle background
      filled: ['bg-muted', 'border-0'],
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
    interactive: {
      true: 'hover-lift cursor-pointer',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'outline',
    padding: 'md',
    interactive: false,
  },
})
