/**
 * Select component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Select size variants
 */
export const sizeStyles = {
  sm: {
    trigger: 'px-3 py-1.5 text-sm',
    content: 'text-sm',
  },
  md: {
    trigger: 'px-3 py-2 text-base',
    content: 'text-base',
  },
  lg: {
    trigger: 'px-4 py-3 text-lg',
    content: 'text-lg',
  },
} as const

/**
 * Select variant definitions
 *
 * Philosophy: Minimal custom styles, let Ark UI handle behavior
 */
export const selectVariants = tv({
  slots: {
    root: 'relative',
    label: 'block text-sm font-medium text-gray-700 mb-1',
    control: 'relative',
    trigger:
      'relative w-full cursor-pointer rounded-md bg-white pr-8 text-left text-gray-900 border border-gray-300 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    valueText: 'block truncate',
    indicator:
      'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-400',
    positioner: 'z-10',
    content:
      'mt-1 max-h-60 w-[var(--reference-width)] overflow-auto rounded-md bg-white py-1 shadow-lg border border-gray-200',
    itemGroup: '',
    itemGroupLabel: 'px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider',
    item: 'relative cursor-pointer select-none py-2 text-gray-900 data-[highlighted]:bg-indigo-600 data-[highlighted]:text-white data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
    itemText: 'block truncate',
    itemIndicator:
      'absolute inset-y-0 flex items-center text-indigo-600 data-[highlighted]:text-white',
    itemContent: 'flex items-center gap-3',
    itemAvatar: 'size-5 shrink-0 rounded-full',
    itemStatus: 'inline-block size-2 shrink-0 rounded-full',
    itemDescription: 'ml-2 truncate text-gray-500 data-[highlighted]:text-indigo-200',
  },
  variants: {
    size: {
      sm: {
        trigger: sizeStyles.sm.trigger,
        content: sizeStyles.sm.content,
      },
      md: {
        trigger: sizeStyles.md.trigger,
        content: sizeStyles.md.content,
      },
      lg: {
        trigger: sizeStyles.lg.trigger,
        content: sizeStyles.lg.content,
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
