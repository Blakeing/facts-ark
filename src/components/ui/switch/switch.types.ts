/**
 * Switch component - type definitions
 */

import type { SwitchRootProps, SwitchRootEmits } from '@ark-ui/vue/switch'
import type { sizeStyles } from './switch.variants'

/**
 * Switch props
 */
export interface SwitchProps extends SwitchRootProps {
  /** Switch label text */
  label?: string
  /** Size variant */
  size?: keyof typeof sizeStyles
  /** Additional CSS classes */
  class?: string
}

export type { SwitchRootEmits }
