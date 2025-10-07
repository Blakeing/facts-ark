/**
 * Badge component - variant definitions
 *
 * Design inspired by Park UI's badge component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Badge variants matching Park UI's design system
 *
 * Variants:
 * - solid: Filled badge with solid background
 * - subtle: Badge with subtle background
 * - outline: Badge with border only
 */
export const badgeVariants = tv({
  base: [
    // Layout
    'inline-flex items-center gap-1',

    // Typography
    'font-medium',

    // Visual
    'rounded-md',

    // Transition
    'transition-colors',
  ],
  variants: {
    variant: {
      // Default - subtle gray
      default: ['bg-secondary text-secondary-foreground'],

      // Primary - brand color
      primary: ['bg-primary text-primary-foreground'],

      // Secondary - subtle
      secondary: ['bg-secondary text-secondary-foreground'],

      // Destructive - errors/warnings
      destructive: ['bg-destructive text-destructive-foreground'],

      // Outline - bordered
      outline: ['border border-input bg-background text-foreground'],

      // Success - uses accent color system
      success: ['bg-accent/10 text-accent-foreground dark:bg-accent/20'],

      // Warning - uses muted with amber tint
      warning: ['bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-100'],

      // Info - uses muted color system
      info: ['bg-muted text-muted-foreground'],
    },
    size: {
      sm: 'px-1.5 py-0.5 text-xs',
      md: 'px-2 py-1 text-sm',
      lg: 'px-2.5 py-1.5 text-base',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
