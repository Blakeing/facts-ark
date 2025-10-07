/**
 * Tooltip component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

export const tooltipVariants = tv({
  slots: {
    trigger: 'inline-flex',
    positioner: 'z-50',
    content:
      'z-50 overflow-hidden rounded-md px-3 py-1.5 text-xs shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
  },
  variants: {
    variant: {
      default: {
        content: 'bg-gray-900 text-gray-50',
      },
      inverse: {
        content: 'bg-white text-gray-900 border border-gray-200',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
