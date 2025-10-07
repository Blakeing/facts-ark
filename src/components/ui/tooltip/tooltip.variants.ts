/**
 * Tooltip component - variant definitions
 *
 * Design inspired by Park UI's tooltip component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Tooltip variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Quick, subtle animations
 * - Two variants (default dark, inverse light)
 * - Minimal and unobtrusive
 */
export const tooltipVariants = tv({
  slots: {
    trigger: 'inline-flex cursor-default',

    positioner: 'z-50',

    content: [
      // Position
      'z-50',

      // Layout
      'overflow-hidden rounded-md px-3 py-1.5',

      // Typography
      'text-xs',

      // Visual
      'shadow-md',

      // Animations
      'animate-in fade-in-0 zoom-in-95',
      'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    ],
  },
  variants: {
    variant: {
      default: {
        content: 'bg-primary text-primary-foreground',
      },
      inverse: {
        content: 'bg-popover text-popover-foreground border border-border',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
