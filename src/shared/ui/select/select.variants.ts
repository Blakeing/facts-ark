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
 * - Semantic color tokens
 * - Proper focus states with ring
 * - Disabled states
 * - Indicator positioning
 */
export const selectVariants = tv({
  slots: {
    root: '',
    control: [
      // Layout
      'grid w-full grid-cols-[1fr_auto] items-center gap-3',

      // Sizing
      'min-h-10',
    ],
    trigger: [
      // Layout
      'flex w-full items-center justify-between gap-2 rounded-md',

      // Border & Background
      'border border-input bg-background',

      // Typography
      'text-sm text-foreground',

      // Padding
      'px-3 py-2',

      // Focus states
      'focus-ring',

      // Disabled state
      'disabled:cursor-not-allowed disabled:opacity-50',

      // Placeholder state
      '[&[data-placeholder-shown]]:text-muted-foreground',

      // Animations
      'transition-colors-smooth',
    ],
    valueText: '',
    indicator: ['h-4 w-4 shrink-0 text-muted-foreground'],
    positioner: '',
    content: [
      // Layout
      'z-50 min-w-[8rem] overflow-hidden rounded-md',

      // Border & Background
      'border border-border bg-popover',

      // Shadow
      'shadow-md',

      // Animation
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
      'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
    ],
    hiddenSelect: ['hidden'],
    item: [
      // Layout
      'relative flex w-full cursor-pointer select-none items-center rounded-sm',

      // Padding
      'py-1.5 pl-8 pr-2',

      // Typography
      'text-sm',

      // Outline
      'outline-none',

      // Focus state
      'focus:bg-accent focus:text-accent-foreground',

      // Disabled state
      'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
    ],
    itemIndicator: ['absolute left-2 flex h-3.5 w-3.5 items-center justify-center'],
    itemText: '',
    itemContent: ['flex w-full items-center gap-3'],
    itemAvatar: ['h-6 w-6 min-h-6 min-w-6 rounded-full object-cover'],
    itemStatus: ['h-2.5 w-2.5 rounded-full'],
    itemDescription: ['block text-xs text-muted-foreground'],
    itemGroup: '',
    itemGroupLabel: ['px-2 py-1.5 text-sm font-semibold text-muted-foreground'],
  },
  variants: {
    size: {
      sm: {
        trigger: 'h-9 px-2 text-xs',
      },
      md: {
        trigger: 'h-10 px-3 text-sm',
      },
      lg: {
        trigger: 'h-11 px-4 text-base',
      },
    },
    indicatorPosition: {
      left: {
        trigger: 'flex-row-reverse',
      },
      right: {
        trigger: 'flex-row',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    indicatorPosition: 'right',
  },
})
