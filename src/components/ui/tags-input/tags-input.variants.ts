/**
 * TagsInput component - variant definitions
 *
 * Design inspired by Park UI's tags input component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Tags Input variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Proper focus states with ring
 * - Two tag styles (default filled, outline)
 * - Consistent with Input component styling
 */
export const tagsInputVariants = tv({
  slots: {
    root: 'w-full',

    label: 'block text-sm font-medium text-foreground mb-2',

    control: [
      // Layout
      'flex flex-wrap items-center gap-1.5 rounded-md px-3 py-2',

      // Colors
      'border border-input bg-background',

      // Typography
      'text-sm',

      // Focus states
      'focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2',

      // Visual
      'shadow-sm',

      // Transition
      'transition-colors',
    ],

    item: [
      // Layout
      'inline-flex items-center gap-1 rounded-md px-2 py-1',

      // Typography
      'text-sm',

      // Colors
      'bg-secondary text-secondary-foreground',

      // Transition
      'transition-colors',
    ],

    itemText: 'text-sm',

    itemDeleteTrigger: [
      'inline-flex items-center justify-center rounded-sm',
      'text-secondary-foreground/60 hover:text-secondary-foreground',
      'transition-colors',
    ],

    input: [
      'flex-1 bg-transparent outline-none min-w-[120px]',
      'placeholder:text-muted-foreground',
      'text-foreground',
    ],

    clearTrigger: [
      'inline-flex items-center justify-center rounded-sm',
      'text-muted-foreground hover:text-foreground',
      'transition-colors',
    ],
  },
  variants: {
    variant: {
      default: {},
      outline: {
        item: 'border border-input bg-background',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
