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
    root: '',
    label: 'block text-sm font-medium text-foreground mb-3',
    indicator: '',
    item: '',
    itemControl: [
      // Size
      'size-4 rounded-full',

      // Visual - outer ring
      'border border-input bg-background',
      'data-[state=checked]:border-primary',

      // Inner indicator dot (pseudo-element)
      'relative',
      'after:content-[""] after:absolute after:inset-0 after:rounded-full',
      'after:scale-0 after:transition-transform',
      'data-[state=checked]:after:scale-50 data-[state=checked]:after:bg-primary',

      // Focus states
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

      // States
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',

      // Transition
      'transition-colors',
    ],
    itemText: 'block text-sm font-medium text-foreground data-[disabled]:opacity-50',
    itemDescription: 'text-sm text-muted-foreground',
  },
  variants: {
    variant: {
      default: {
        root: 'space-y-3',
        item: 'flex items-start',
        itemControl: 'mt-0.5',
        itemText: 'ml-3',
      },
      cards: {
        root: 'grid gap-3',
        item: 'relative flex items-center justify-between cursor-pointer rounded-lg p-4 border border-input bg-background hover:border-accent data-[state=checked]:border-primary data-[state=checked]:ring-2 data-[state=checked]:ring-primary shadow-sm focus:outline-none transition-colors',
        itemControl: 'order-2 flex-shrink-0',
        itemText: 'order-1',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
