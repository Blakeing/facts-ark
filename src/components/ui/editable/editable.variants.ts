/**
 * Editable component - variant definitions
 *
 * Design inspired by Park UI's editable component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Editable variants matching Park UI's design system
 */
export const editableVariants = tv({
  slots: {
    root: ['w-full'],

    label: [
      'text-sm font-medium leading-none',
      'text-foreground',
      'data-[invalid]:text-destructive',
      'mb-2',
    ],

    area: [
      'relative',
      'min-h-[2.5rem]',
      'rounded-md',
      'border border-input',
      'bg-background',
      'px-3 py-2',
      'text-sm',
      'data-[focus]:border-ring',
      'data-[focus]:ring-2',
      'data-[focus]:ring-ring',
      'data-[focus]:ring-offset-0',
      'data-[disabled]:cursor-not-allowed',
      'data-[disabled]:opacity-50',
      'data-[invalid]:border-destructive',
      'transition-colors',
    ],

    input: [
      'w-full',
      'bg-transparent',
      'outline-none',
      'text-foreground',
      'placeholder:text-muted-foreground',
      'data-[disabled]:cursor-not-allowed',
    ],

    preview: [
      'w-full',
      'break-words',
      'text-foreground',
      'data-[placeholder-shown]:text-muted-foreground',
      'data-[disabled]:cursor-not-allowed',
    ],

    control: ['flex items-center gap-2', 'mt-2'],

    editTrigger: [
      // Layout
      'inline-flex items-center justify-center',
      'rounded-md',
      'px-3 py-1.5',

      // Typography
      'text-xs font-medium',

      // Colors
      'text-muted-foreground',
      'hover:text-foreground',
      'hover:bg-muted',

      // Focus
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',

      // Transitions
      'transition-colors',
    ],

    submitTrigger: [
      // Layout
      'inline-flex items-center justify-center',
      'rounded-md',
      'px-3 py-1.5',

      // Typography
      'text-xs font-medium',

      // Colors
      'bg-primary text-primary-foreground',
      'hover:bg-primary/90',

      // Focus
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',

      // Transitions
      'transition-colors',
    ],

    cancelTrigger: [
      // Layout
      'inline-flex items-center justify-center',
      'rounded-md',
      'px-3 py-1.5',

      // Typography
      'text-xs font-medium',

      // Colors
      'text-muted-foreground',
      'hover:text-foreground',
      'hover:bg-muted',

      // Focus
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',

      // Transitions
      'transition-colors',
    ],
  },
})
