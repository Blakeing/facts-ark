/**
 * Steps component - variant definitions
 *
 * Design inspired by Park UI's steps component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Steps variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - State-based styling (incomplete, current, complete)
 * - Visual progress indicator
 * - Accessible navigation
 */
export const stepsVariants = tv({
  slots: {
    root: 'w-full',

    list: 'flex items-center justify-between',

    item: 'flex items-center',

    trigger: 'group flex items-center gap-2 cursor-pointer',

    indicator: [
      'flex items-center justify-center rounded-full border-2',
      'transition-colors',
      'data-[state=incomplete]:border-muted data-[state=incomplete]:bg-background data-[state=incomplete]:text-muted-foreground',
      'data-[state=current]:border-primary data-[state=current]:bg-primary data-[state=current]:text-primary-foreground',
      'data-[state=complete]:border-primary data-[state=complete]:bg-primary data-[state=complete]:text-primary-foreground',
    ],

    title: [
      'font-medium text-sm',
      'data-[state=incomplete]:text-muted-foreground',
      'data-[state=current]:text-foreground',
      'data-[state=complete]:text-foreground',
    ],

    description: 'text-xs text-muted-foreground',

    separator: ['flex-1 h-0.5 mx-4', 'bg-muted', 'data-[state=complete]:bg-primary'],

    content: 'mt-8 p-6 bg-background rounded-lg border border-border',

    completedContent: 'mt-8 p-6 bg-success/10 rounded-lg border border-success',

    navigation: 'mt-6 flex gap-3',

    prevButton: [
      'inline-flex items-center justify-center rounded-md px-4 py-2',
      'text-sm font-semibold',
      'bg-background text-foreground',
      'shadow-sm ring-1 ring-inset ring-border',
      'hover:bg-accent',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],

    nextButton: [
      'inline-flex items-center justify-center rounded-md px-4 py-2',
      'text-sm font-semibold',
      'bg-primary text-primary-foreground',
      'shadow-sm',
      'hover:bg-primary/90',
      'disabled:cursor-not-allowed disabled:opacity-50',
    ],
  },
  variants: {
    variant: {
      default: {
        indicator: 'h-10 w-10',
      },
      circles: {
        indicator: 'h-12 w-12',
        title: 'text-base',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
