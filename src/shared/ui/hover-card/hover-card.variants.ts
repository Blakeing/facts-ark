/**
 * HoverCard component - variant definitions
 *
 * Design inspired by Park UI's hover card component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Hover Card variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Smooth animations for show/hide
 * - Lightweight and non-intrusive
 * - Proper z-index management
 */
export const hoverCardVariants = tv({
  slots: {
    trigger: 'inline-flex cursor-default',

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
