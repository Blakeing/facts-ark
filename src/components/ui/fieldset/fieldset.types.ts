/**
 * Fieldset component - type definitions
 */

import type { FieldsetRootProps } from '@ark-ui/vue/fieldset'

/**
 * Fieldset props
 */
export interface FieldsetProps extends FieldsetRootProps {
  /** Legend text */
  legend?: string
  /** Helper text */
  helperText?: string
  /** Error message */
  errorText?: string
  /** Additional CSS classes */
  class?: string
}
