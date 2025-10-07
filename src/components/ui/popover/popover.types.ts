/**
 * Popover component - type definitions
 */

import type { PopoverRootProps, PopoverRootEmits } from '@ark-ui/vue/popover'

/**
 * Popover props
 */
export interface PopoverProps extends PopoverRootProps {
  /** Visual variant */
  variant?: 'default'
  /** Title text */
  title?: string
  /** Description text */
  description?: string
  /** Trigger button text */
  trigger?: string
  /** Show close button */
  showClose?: boolean
  /** Additional CSS classes */
  class?: string
}

export type { PopoverRootEmits }
