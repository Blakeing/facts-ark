/**
 * Field component - type definitions
 */

import type { FieldRootProps } from '@ark-ui/vue/field'

/**
 * Field props
 */
export interface FieldProps extends FieldRootProps {
  /** Label text */
  label?: string
  /** Helper text */
  helperText?: string
  /** Error message */
  errorText?: string
  /** Additional CSS classes */
  class?: string
}
