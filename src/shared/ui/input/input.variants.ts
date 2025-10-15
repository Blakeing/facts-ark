/**
 * Input component - variant definitions
 *
 * Design inspired by Park UI's input component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Input variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens
 * - Proper focus states with ring
 * - File upload styling
 * - Disabled and readonly states
 */
export const inputVariants = tv({
  base: [
    // Layout
    'flex w-full rounded-md',

    // Border & Background
    'border border-input bg-background',

    // Typography
    'text-sm text-foreground',

    // Padding
    'px-3 py-2',

    // File input styling
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',

    // Placeholder
    'placeholder:text-muted-foreground',

    // Focus states (using new focus-ring system)
    'focus-ring',

    // Disabled state
    'disabled:cursor-not-allowed disabled:opacity-50',

    // Readonly state
    'read-only:opacity-50',

    // Animations & Transitions (using new design system)
    'transition-colors-smooth',
  ],
  variants: {
    size: {
      sm: 'h-9 px-2 text-xs',
      md: 'h-10 px-3 text-sm',
      lg: 'h-11 px-4 text-base',
    },
    variant: {
      default: '',
      error: 'border-destructive focus-visible:ring-destructive',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})
