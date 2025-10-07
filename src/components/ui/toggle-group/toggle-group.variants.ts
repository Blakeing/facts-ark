/**
 * ToggleGroup component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

export const toggleGroupVariants = tv({
  slots: {
    root: 'inline-flex rounded-md shadow-sm',
    // Common item styles shared by all variants
    item: [
      'inline-flex items-center justify-center font-medium',
      'transition-colors focus-ring',
      'disabled:pointer-events-none disabled:opacity-50',
      'data-[state=on]:bg-primary data-[state=on]:text-primary-foreground',
      // Common positioning for group
      'first:rounded-l-md last:rounded-r-md -ml-px first:ml-0',
    ],
  },
  variants: {
    variant: {
      default: {
        item: 'bg-background text-foreground hover:bg-muted border border-border',
      },
      outline: {
        item: 'border border-border bg-transparent hover:bg-muted',
      },
    },
    size: {
      sm: {
        item: 'px-3 py-1.5 text-xs gap-1.5',
      },
      md: {
        item: 'px-4 py-2 text-sm gap-2',
      },
      lg: {
        item: 'px-6 py-3 text-base gap-2',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
