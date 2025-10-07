/**
 * Dialog component - variant definitions
 *
 * Design inspired by Park UI's dialog component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Dialog variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Smooth animations for open/close
 * - Multiple layout variants
 * - Accessible focus management
 */
export const dialogVariants = tv({
  slots: {
    trigger: [
      // Layout
      'inline-flex items-center justify-center rounded-md px-4 py-2',

      // Colors
      'bg-primary text-primary-foreground',

      // Typography
      'text-sm font-semibold',

      // States
      'shadow-sm hover:bg-primary/90',

      // Focus
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

      // Transitions
      'transition-colors',
    ],

    backdrop: [
      // Position
      'fixed inset-0',

      // Colors
      'bg-black/80',

      // Visual effects
      'backdrop-blur-sm',

      // Animations
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
    ],

    positioner: 'fixed inset-0 z-50 flex items-center justify-center p-4',

    content: [
      // Position & Layout
      'relative',

      // Colors
      'bg-background border border-border',

      // Typography
      'text-foreground',

      // Visual
      'rounded-lg shadow-lg',

      // Animations
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
      'data-[state=closed]:slide-out-to-bottom-[2%] data-[state=open]:slide-in-from-bottom-[2%]',

      // Focus
      'focus:outline-none',
    ],

    title: 'text-lg font-semibold leading-none tracking-tight text-foreground',

    description: 'mt-2 text-sm text-muted-foreground',

    closeTrigger: [
      // Position
      'absolute right-4 top-4',

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
      default: {
        content: 'w-full max-w-lg p-6',
      },
      centered: {
        content: 'w-full max-w-md p-8 text-center',
        title: 'text-center',
        description: 'text-center',
      },
      fullscreen: {
        positioner: 'p-0',
        content: 'w-full h-full max-w-none rounded-none p-8',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
