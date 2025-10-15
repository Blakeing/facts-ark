/**
 * Popover component - type definitions
 */

import type { PopoverRootProps, PopoverRootEmits } from '@ark-ui/vue/popover'
import type { VariantProps } from 'tailwind-variants'
import type { popoverVariants } from './popover.variants'

/**
 * Popover variant props extracted from popoverVariants
 */
type PopoverVariantProps = VariantProps<typeof popoverVariants>

/**
 * Popover props
 */
export interface PopoverProps extends PopoverRootProps {
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: PopoverVariantProps['variant']

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
