/**
 * Collapsible component - variant definitions
 *
 * Design inspired by Park UI's collapsible component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Collapsible variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Multiple visual styles
 * - Smooth animations
 * - Disabled state support
 */
export const collapsibleVariants = tv({
  slots: {
    root: 'w-full',

    trigger: [
      'group flex w-full items-center justify-between',
      'text-left text-sm font-medium text-foreground',
      'hover:text-primary',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors',
    ],

    triggerIcon: 'mr-2 text-muted-foreground group-hover:text-primary transition-colors',

    indicator: [
      'ml-2 h-5 w-5 text-muted-foreground',
      'transition-transform duration-200',
      'data-[state=open]:rotate-180',
    ],

    content: [
      'overflow-hidden text-sm text-muted-foreground',
      'data-[state=closed]:animate-collapsible-up',
      'data-[state=open]:animate-collapsible-down',
    ],
  },
  variants: {
    variant: {
      default: {
        root: 'space-y-2',
        trigger: 'py-3',
        content: 'pt-2 pb-3',
      },
      bordered: {
        root: 'rounded-lg border border-border p-4 space-y-2',
        trigger: 'py-2',
        content: 'pt-3',
      },
      ghost: {
        root: 'space-y-1',
        trigger: 'py-2 hover:bg-accent px-2 rounded-md -mx-2',
        content: 'px-2',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
