/**
 * Dialog component - type definitions
 */

import type { DialogRootProps, DialogRootEmits } from '@ark-ui/vue/dialog'
import type { VariantProps } from 'tailwind-variants'
import type { dialogVariants } from './dialog.variants'

/**
 * Dialog variant props extracted from dialogVariants
 */
type DialogVariantProps = VariantProps<typeof dialogVariants>

/**
 * Dialog props
 */
export interface DialogProps extends DialogRootProps {
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: DialogVariantProps['variant']

  /** Dialog title */
  title?: string

  /** Dialog description */
  description?: string

  /** Trigger button text */
  trigger?: string

  /** Show close button */
  showClose?: boolean

  /** Additional CSS classes */
  class?: string
}

export type { DialogRootEmits }
