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
 * - Semantic color tokens
 * - Proper focus states with ring
 * - Disabled and readonly states
 * - Resize options
 */
export const textareaVariants = tv({
  base: [
    // Layout
    'flex min-h-[80px] w-full rounded-md',

    // Border & Background
    'border border-input bg-background',

    // Typography
    'text-sm text-foreground',

    // Padding
    'px-3 py-2',

    // Placeholder
    'placeholder:text-muted-foreground',

    // Focus states
    'focus-ring',

    // Disabled state
    'disabled:cursor-not-allowed disabled:opacity-50',

    // Readonly state
    'read-only:opacity-50',

    // Animations & Transitions
    'transition-colors-smooth',
  ],
  variants: {
    size: {
      sm: 'min-h-[60px] px-2 py-1 text-xs',
      md: 'min-h-[80px] px-3 py-2 text-sm',
      lg: 'min-h-[100px] px-4 py-3 text-base',
    },
    variant: {
      default: '',
      error: 'border-destructive focus-visible:ring-destructive',
    },
    resize: {
      none: 'resize-none',
      vertical: 'resize-y',
      horizontal: 'resize-x',
      both: 'resize',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
    resize: 'vertical',
  },
})
