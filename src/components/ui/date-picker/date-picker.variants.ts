/**
 * Date Picker component - variant definitions
 *
 * Design inspired by Park UI's date-picker component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Date Picker variants matching Park UI's design system
 */
export const datePickerVariants = tv({
  slots: {
    root: ['w-full'],

    label: ['text-sm font-medium leading-none', 'text-foreground', 'mb-2', 'block'],

    control: ['relative flex items-center gap-2'],

    input: [
      'flex-1 w-full',
      'h-10 rounded-md px-3 py-2',
      'bg-background',
      'border border-input',
      'text-foreground text-sm',
      'placeholder:text-muted-foreground',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'focus-visible:ring-offset-0',
      'disabled:cursor-not-allowed',
      'disabled:opacity-50',
      'transition-colors',
    ],

    trigger: [
      'inline-flex items-center justify-center',
      'h-10 w-10',
      'rounded-md',
      'text-muted-foreground hover:text-foreground',
      'hover:bg-muted',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'transition-colors',
    ],

    clearTrigger: [
      'inline-flex items-center justify-center',
      'h-8 px-2',
      'rounded-md',
      'text-xs font-medium',
      'text-muted-foreground hover:text-foreground',
      'hover:bg-muted',
      'transition-colors',
    ],

    positioner: ['relative z-50'],

    content: [
      'mt-1',
      'rounded-md',
      'border border-border',
      'bg-popover',
      'text-popover-foreground',
      'shadow-md',
      'p-3',
      'data-[state=open]:animate-in',
      'data-[state=open]:fade-in-0',
      'data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
      'data-[state=closed]:zoom-out-95',
    ],

    viewControl: ['flex items-center justify-between', 'mb-3'],

    prevTrigger: [
      'inline-flex items-center justify-center',
      'size-8',
      'rounded-md',
      'hover:bg-accent',
      'hover:text-accent-foreground',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
      'transition-colors',
    ],

    nextTrigger: [
      'inline-flex items-center justify-center',
      'size-8',
      'rounded-md',
      'hover:bg-accent',
      'hover:text-accent-foreground',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
      'transition-colors',
    ],

    viewTrigger: [
      'inline-flex items-center justify-center',
      'rounded-md',
      'px-3 py-1.5',
      'text-sm font-medium',
      'hover:bg-accent',
      'hover:text-accent-foreground',
      'transition-colors',
    ],

    rangeText: ['text-sm font-medium'],

    table: ['w-full border-collapse', 'mt-2'],

    tableHead: [],

    tableHeader: ['w-8 text-center', 'text-xs font-medium text-muted-foreground', 'pb-2'],

    tableBody: [],

    tableRow: ['flex w-full gap-1', 'mb-1'],

    tableCell: ['flex-1', 'text-center'],

    tableCellTrigger: [
      'inline-flex items-center justify-center',
      'size-8',
      'rounded-md',
      'text-sm',
      'font-normal',
      'text-foreground',
      'hover:bg-accent',
      'hover:text-accent-foreground',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'disabled:pointer-events-none',
      'disabled:opacity-50',
      'data-[selected]:bg-primary',
      'data-[selected]:text-primary-foreground',
      'data-[selected]:hover:bg-primary',
      'data-[selected]:hover:text-primary-foreground',
      'data-[today]:border data-[today]:border-border',
      'data-[outside-range]:text-muted-foreground',
      'data-[outside-range]:opacity-50',
      'transition-colors',
    ],
  },
})
