/**
 * Field component - variant definitions
 *
 * Design inspired by Park UI's field component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Field container variants
 *
 * Provides base styling for the field wrapper and its child elements
 */
export const fieldVariants = tv({
  base: [
    // Layout
    'flex flex-col gap-1.5',
  ],
  slots: {
    label: [
      // Typography
      'text-sm font-medium text-foreground',

      // Required indicator
      '[&_.field-required]:text-destructive [&_.field-required]:ml-1',
    ],
    helperText: [
      // Typography
      'text-sm text-muted-foreground',
    ],
    errorText: [
      // Typography
      'text-sm text-destructive',
    ],
  },
})
