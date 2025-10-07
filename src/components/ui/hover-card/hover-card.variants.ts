/**
 * HoverCard component - variant definitions
 */

import { tv } from 'tailwind-variants/lite'

export const hoverCardVariants = tv({
  slots: {
    trigger: 'inline-flex',
    positioner: 'z-50',
    content:
      'z-50 w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
  },
  variants: {
    variant: {
      default: {},
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
