/**
 * RadioGroup component - variant definitions
 *
 * Design inspired by Park UI's radio group component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Radio Group variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens
 * - Proper focus states with ring
 * - Two display variants (default list, cards)
 * - Accessible by default (Ark UI)
 */
export const radioGroupVariants = tv({
  slots: {
    root: 'space-y-3',

    label: 'block text-sm font-medium text-foreground mb-3',

    indicator: '',

    item: 'flex items-start',

    itemControl: [
      // Layout
      'mt-0.5 size-4 rounded-full',

      // Visual
      'border',

      // Colors
      'border-input',
      'data-[state=checked]:border-primary data-[state=checked]:bg-primary',

      // Focus states
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

      // States
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',

      // Transition
      'transition-colors',
    ],

    itemText: ['ml-3 block text-sm font-medium text-foreground', 'data-[disabled]:opacity-50'],

    itemDescription: 'text-sm text-muted-foreground',
  },
  variants: {
    variant: {
      default: {
        item: 'flex items-start',
      },
      cards: {
        root: 'grid gap-3',
        item: [
          // Layout
          'relative flex cursor-pointer rounded-lg p-4',

          // Colors
          'border border-input bg-background',

          // States
          'hover:border-accent',
          'data-[state=checked]:border-primary data-[state=checked]:ring-2 data-[state=checked]:ring-primary',

          // Visual
          'shadow-sm',

          // Focus
          'focus:outline-none',

          // Transition
          'transition-colors',
        ],
        itemControl: 'absolute right-4 top-4',
        itemText: 'ml-0 block text-sm font-medium text-foreground',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
