/**
 * File Upload component - variant definitions
 *
 * Design inspired by Park UI's file-upload component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * File Upload variants matching Park UI's design system
 */
export const fileUploadVariants = tv({
  slots: {
    root: ['w-full'],

    label: ['text-sm font-medium leading-none', 'text-foreground', 'mb-2', 'block'],

    dropzone: [
      // Layout
      'relative flex flex-col items-center justify-center',
      'min-h-[200px] w-full',
      'rounded-lg',
      'px-6 py-8',

      // Colors & borders
      'border-2 border-dashed border-input',
      'bg-muted/50',

      // States
      'data-[dragging]:border-primary',
      'data-[dragging]:bg-primary/5',
      'data-[disabled]:cursor-not-allowed',
      'data-[disabled]:opacity-50',
      'data-[invalid]:border-destructive',

      // Cursor & Transitions
      'cursor-pointer',
      'transition-all',
    ],

    dropzoneIcon: ['size-10 text-muted-foreground', 'mb-3'],

    dropzoneText: ['text-sm text-muted-foreground', 'text-center'],

    trigger: [
      // Layout
      'inline-flex items-center justify-center',
      'rounded-md',
      'px-4 py-2',
      'mt-4',

      // Typography
      'text-sm font-medium',

      // Colors
      'bg-primary text-primary-foreground',
      'hover:bg-primary/90',

      // States
      'disabled:pointer-events-none',
      'disabled:opacity-50',

      // Focus
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-2',

      // Transitions
      'transition-colors',
    ],

    itemGroup: ['mt-4 space-y-3'],

    item: [
      // Layout
      'flex items-center gap-3',
      'rounded-md',
      'border border-border',
      'bg-background',
      'p-3',

      // States
      'data-[disabled]:opacity-50',
    ],

    itemPreview: ['flex-shrink-0', 'size-12', 'rounded', 'overflow-hidden', 'bg-muted'],

    itemPreviewImage: ['size-full', 'object-cover'],

    itemContent: ['flex-1 min-w-0'],

    itemName: ['text-sm font-medium', 'text-foreground', 'truncate'],

    itemSizeText: ['text-xs text-muted-foreground'],

    itemDeleteTrigger: [
      // Layout
      'inline-flex items-center justify-center',
      'rounded-md',
      'size-8',
      'flex-shrink-0',

      // Colors
      'text-muted-foreground',
      'hover:text-foreground',
      'hover:bg-muted',

      // States
      'disabled:pointer-events-none',
      'disabled:opacity-50',

      // Focus
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',

      // Transitions
      'transition-colors',
    ],

    clearTrigger: [
      // Layout
      'inline-flex items-center justify-center',
      'rounded-md',
      'px-3 py-1.5',
      'mt-4',

      // Typography
      'text-xs font-medium',

      // Colors
      'text-muted-foreground',
      'hover:text-foreground',
      'hover:bg-muted',

      // States
      'disabled:pointer-events-none',
      'disabled:opacity-50',

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
