/**
 * Textarea component - variant definitions
 *
 * Design inspired by Park UI's textarea component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Textarea variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens (matching Input component)
 * - Proper focus states with ring
 * - Flexible resize options
 * - Accessible by default
 */
export const textareaVariants = tv({
  base: [
    // Layout
    'flex w-full rounded-md',

    // Border & Background
    'border border-input bg-background',

    // Typography
    'text-sm text-foreground',

    // Padding
    'px-3 py-2',

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
      sm: 'px-2 py-1.5 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-3 text-base',
    },
    variant: {
      default: '',
      error: 'border-destructive focus-visible:ring-destructive',
    },
    resize: {
      none: 'resize-none',
      both: 'resize',
      vertical: 'resize-y',
      horizontal: 'resize-x',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    resize: 'vertical',
  },
})
