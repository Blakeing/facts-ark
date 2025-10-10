/**
 * Toast component - variant definitions
 *
 * Design inspired by Park UI's toast component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Toast variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Smooth animations for toasts
 * - Type-based color variants (success, error, warning, info)
 * - Stack positioning
 */
export const toastVariants = tv({
  slots: {
    root: [
      // Layout
      'relative flex items-start gap-3 p-4 rounded-lg shadow-lg',
      'w-full max-w-sm',

      // Colors
      'bg-background border border-border',

      // Typography
      'text-foreground',

      // Focus
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

      // Required CSS variables for animation
      // These are set by Ark UI and must be included
      '[translate:var(--x)_var(--y)]',
      '[scale:var(--scale)]',
      '[z-index:var(--z-index)]',
      '[height:var(--height)]',
      '[opacity:var(--opacity)]',
      '[will-change:translate,opacity,scale]',

      // Transitions
      'transition-all duration-400 ease-[cubic-bezier(0.21,1.02,0.73,1)]',

      // Closed state transition
      'data-[state=closed]:duration-400 data-[state=closed]:ease-[cubic-bezier(0.06,0.71,0.55,1)]',

      // Stacking
      'data-[overlap]:shadow-sm',
    ],

    icon: ['flex-shrink-0', 'size-5'],

    content: ['flex-1 min-w-0'],

    title: ['text-sm font-semibold leading-tight', 'text-foreground'],

    description: ['mt-1 text-sm', 'text-muted-foreground'],

    actionTrigger: [
      // Layout
      'inline-flex items-center justify-center rounded-md',
      'px-3 py-1.5',

      // Typography
      'text-xs font-medium',

      // Colors
      'bg-primary text-primary-foreground',

      // States
      'hover:bg-primary/90',

      // Focus
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',

      // Transitions
      'transition-colors',
    ],

    closeTrigger: [
      // Layout
      'inline-flex items-center justify-center',
      'rounded-md',
      'flex-shrink-0',
      'ml-auto',

      // Size
      'size-6',

      // Colors
      'text-muted-foreground hover:text-foreground',

      // States
      'opacity-70 hover:opacity-100',

      // Focus
      'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',

      // Transitions
      'transition-all',
    ],
  },
  variants: {
    type: {
      info: {
        root: 'border-blue-200 dark:border-blue-800',
        icon: 'text-blue-600 dark:text-blue-400',
      },
      success: {
        root: 'border-green-200 dark:border-green-800',
        icon: 'text-green-600 dark:text-green-400',
      },
      warning: {
        root: 'border-yellow-200 dark:border-yellow-800',
        icon: 'text-yellow-600 dark:text-yellow-400',
      },
      error: {
        root: 'border-red-200 dark:border-red-800',
        icon: 'text-red-600 dark:text-red-400',
      },
      default: {
        root: '',
        icon: 'text-foreground',
      },
    },
  },
  defaultVariants: {
    type: 'default',
  },
})
