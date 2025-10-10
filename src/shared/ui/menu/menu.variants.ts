/**
 * Menu component - variant definitions
 *
 * Design inspired by Park UI's menu component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Menu variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Smooth animations
 * - Keyboard navigation support
 * - Disabled state support
 */
export const menuVariants = tv({
  slots: {
    trigger: [
      // Layout
      'inline-flex items-center justify-center gap-2 rounded-md px-4 py-2',

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
      'min-w-[12rem] overflow-hidden rounded-md p-1',

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

    item: [
      // Layout
      'relative flex cursor-pointer select-none items-center gap-2 rounded-sm px-2 py-1.5',

      // Typography
      'text-sm',

      // Colors & States
      'outline-none transition-colors',
      'hover:bg-accent hover:text-accent-foreground',
      'focus:bg-accent focus:text-accent-foreground',
      'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',

      // Disabled
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    ],

    itemIcon: 'h-4 w-4 text-muted-foreground',

    itemShortcut: 'ml-auto text-xs text-muted-foreground',

    separator: 'my-1 h-px bg-border',
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
