/**
 * Popover component - variant definitions
 *
 * Design inspired by Park UI's popover component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Popover variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Smooth animations for open/close
 * - Lightweight and non-modal
 * - Proper positioning and z-index management
 */
export const popoverVariants = tv({
  slots: {
    trigger: [
      // Layout
      'inline-flex items-center justify-center rounded-md px-4 py-2',

      // Colors
      'bg-background text-foreground',

      // Visual
      'shadow-sm ring-1 ring-inset ring-border',

      // Typography
      'text-sm font-semibold',

      // States
      'hover:bg-accent hover:text-accent-foreground',

      // Focus
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

      // Transitions
      'transition-colors',
    ],

    positioner: 'z-50',

    content: [
      // Position
      'z-50',

      // Layout
      'w-80 rounded-lg p-4',

      // Colors
      'bg-popover text-popover-foreground border border-border',

      // Visual
      'shadow-md',

      // Animations
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',

      // Focus
      'focus:outline-none',
    ],

    title: 'text-base font-semibold leading-none tracking-tight text-foreground',

    description: 'mt-2 text-sm text-muted-foreground',

    closeTrigger: [
      // Position
      'absolute right-2 top-2',

      // Layout
      'rounded-sm',

      // Colors
      'text-muted-foreground hover:text-foreground',

      // States
      'opacity-70 hover:opacity-100',

      // Focus
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
      'ring-offset-background',

      // Transitions
      'transition-all',

      // Disabled state
      'disabled:pointer-events-none disabled:opacity-50',
    ],
  },
  variants: {
    variant: {
      default: {},
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
