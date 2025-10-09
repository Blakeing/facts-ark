/**
 * Combobox component - variant definitions
 *
 * Design inspired by Park UI's combobox component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Combobox variants matching Park UI's design system
 */
export const comboboxVariants = tv({
  slots: {
    root: ['w-full'],

    label: [
      'text-sm font-medium leading-none',
      'text-foreground',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-70',
    ],

    control: ['relative flex items-center', 'mt-2'],

    input: [
      // Layout
      'flex-1 w-full',
      'h-10 rounded-md px-3 py-2',
      'pr-20', // Space for trigger and clear button

      // Colors & borders
      'bg-background',
      'border border-input',
      'text-foreground',
      'placeholder:text-muted-foreground',

      // Typography
      'text-sm',

      // Focus
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-0',

      // States
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      'data-[invalid]:border-destructive',

      // Transitions
      'transition-colors',
    ],

    trigger: [
      // Position
      'absolute right-10 top-0',

      // Layout
      'inline-flex items-center justify-center',
      'h-10 w-10',

      // Colors
      'text-muted-foreground hover:text-foreground',

      // States
      'disabled:pointer-events-none disabled:opacity-50',

      // Focus
      'focus:outline-none',

      // Transitions
      'transition-colors',
    ],

    clearTrigger: [
      // Position
      'absolute right-0 top-0',

      // Layout
      'inline-flex items-center justify-center',
      'h-10 w-10',

      // Colors
      'text-muted-foreground hover:text-foreground',

      // States
      'disabled:pointer-events-none disabled:opacity-50',

      // Focus
      'focus:outline-none',

      // Transitions
      'transition-colors',
    ],

    positioner: ['relative'],

    content: [
      // Position & Layout
      'absolute z-50',
      'mt-1',
      'w-full',
      'min-w-[var(--reference-width)]',

      // Colors
      'bg-popover border border-border',
      'text-popover-foreground',

      // Visual
      'rounded-md shadow-md',

      // Max height & scroll
      'max-h-96 overflow-auto',

      // Animations
      'data-[state=open]:animate-in',
      'data-[state=open]:fade-in-0',
      'data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
      'data-[state=closed]:zoom-out-95',
    ],

    itemGroup: ['p-1'],

    itemGroupLabel: ['px-2 py-1.5', 'text-xs font-semibold', 'text-muted-foreground'],

    item: [
      // Layout
      'relative flex items-center',
      'w-full',
      'rounded-sm',
      'px-2 py-1.5',
      'pl-8', // Space for indicator

      // Typography
      'text-sm',

      // Colors
      'text-foreground',

      // States
      'outline-none',
      'cursor-pointer',
      'select-none',
      'data-[disabled]:pointer-events-none',
      'data-[disabled]:opacity-50',
      'data-[highlighted]:bg-accent',
      'data-[highlighted]:text-accent-foreground',
      'data-[state=checked]:font-medium',

      // Transitions
      'transition-colors',
    ],

    itemText: ['flex-1'],

    itemIndicator: ['absolute left-2', 'inline-flex items-center justify-center', 'size-4'],
  },
  variants: {
    size: {
      sm: {
        input: 'h-8 text-xs px-2 pr-16',
        trigger: 'h-8 w-8 right-8',
        clearTrigger: 'h-8 w-8',
      },
      md: {
        input: 'h-10 text-sm px-3 pr-20',
        trigger: 'h-10 w-10 right-10',
        clearTrigger: 'h-10 w-10',
      },
      lg: {
        input: 'h-12 text-base px-4 pr-24',
        trigger: 'h-12 w-12 right-12',
        clearTrigger: 'h-12 w-12',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
