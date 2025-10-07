/**
 * Dialog component - type definitions
 */

import type { DialogRootProps, DialogRootEmits } from '@ark-ui/vue/dialog'

/**
 * Dialog props
 */
export interface DialogProps extends DialogRootProps {
  /** Visual variant */
  variant?: 'default' | 'centered' | 'fullscreen'
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
