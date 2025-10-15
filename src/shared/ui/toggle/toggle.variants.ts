/**
 * Toggle component - variant definitions
 *
 * Design inspired by Park UI's toggle component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Toggle variants matching Park UI's design system
 *
 * Toggle is different from Switch - it's for toolbar buttons (like bold, italic)
 */
export const toggleVariants = tv({
  base: [
    // Layout
    'inline-flex items-center justify-center',
    'rounded-md',

    // Typography
    'text-sm font-medium',

    // States
    'disabled:pointer-events-none disabled:opacity-50',

    // Focus
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

    // Transitions
    'transition-colors',
  ],
  variants: {
    variant: {
      default: [
        'bg-transparent hover:bg-muted hover:text-muted-foreground',
        'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
      ],
      outline: [
        'border border-input bg-transparent',
        'hover:bg-accent hover:text-accent-foreground',
        'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
      ],
      subtle: [
        'bg-muted/50 text-muted-foreground',
        'hover:bg-muted hover:text-foreground',
        'data-[state=on]:bg-accent data-[state=on]:text-accent-foreground',
      ],
    },
    size: {
      sm: 'h-8 px-2 min-w-8',
      md: 'h-9 px-2.5 min-w-9',
      lg: 'h-10 px-3 min-w-10',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
