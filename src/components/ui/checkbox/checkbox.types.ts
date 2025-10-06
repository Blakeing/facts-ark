/**
 * Checkbox component - type definitions
 */

import type { CheckboxRootProps, CheckboxRootEmits } from '@ark-ui/vue/checkbox'
import type { sizeStyles } from './checkbox.variants'

/**
 * Checkbox props
 */
export interface CheckboxProps extends CheckboxRootProps {
  /** Checkbox label text */
  label?: string
  /** Size variant */
  size?: keyof typeof sizeStyles
  /** Additional CSS classes */
  class?: string
}

export type { CheckboxRootEmits }
