/**
 * Select component - variant definitions
 *
 * Design inspired by Park UI's select component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Select variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Proper focus states with ring
 * - Consistent sizing with Input component
 * - Accessible by default (Ark UI)
 */
export const selectVariants = tv({
  slots: {
    root: 'relative',

    label: 'block text-sm font-medium text-foreground mb-1',

    control: 'relative',

    trigger: [
      // Layout
      'relative w-full cursor-pointer rounded-md pr-8 text-left',

      // Colors
      'bg-background text-foreground',
      'border border-input',

      // Focus states
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

      // States
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',

      // Transition
      'transition-colors',
    ],

    valueText: 'block truncate',

    indicator:
      'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-muted-foreground',

    positioner: 'z-50',

    content: [
      // Layout
      'mt-1 max-h-60 w-[var(--reference-width)] overflow-auto rounded-md py-1',

      // Colors
      'bg-popover text-popover-foreground',
      'border border-border',

      // Shadow
      'shadow-lg',
    ],

    itemGroup: '',

    itemGroupLabel:
      'px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider',

    item: [
      // Layout
      'relative cursor-pointer select-none py-2',

      // Colors
      'text-foreground',
      'data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground',

      // States
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',

      // Transition
      'transition-colors',
    ],

    itemText: 'block truncate',

    itemIndicator: [
      'absolute inset-y-0 flex items-center',
      'text-primary',
      'data-[highlighted]:text-accent-foreground',
    ],

    itemContent: 'flex items-center gap-3',

    itemAvatar: 'size-5 shrink-0 rounded-full',

    itemStatus: 'inline-block size-2 shrink-0 rounded-full',

    itemDescription:
      'ml-2 truncate text-muted-foreground data-[highlighted]:text-accent-foreground',
  },
  variants: {
    size: {
      sm: {
        trigger: 'h-9 px-2 text-xs',
        content: 'text-xs',
      },
      md: {
        trigger: 'h-10 px-3 text-sm',
        content: 'text-sm',
      },
      lg: {
        trigger: 'h-11 px-4 text-base',
        content: 'text-base',
      },
    },
    indicatorPosition: {
      left: {
        item: 'pl-8 pr-4',
        itemIndicator: 'left-0 pl-1.5',
      },
      right: {
        item: 'pl-3 pr-9',
        itemIndicator: 'right-0 pr-4',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    indicatorPosition: 'right',
  },
})
