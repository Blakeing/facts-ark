/**
 * RadioGroup component - type definitions
 */

import type { RadioGroupRootProps, RadioGroupRootEmits } from '@ark-ui/vue/radio-group'

/**
 * Individual radio option definition
 */
export interface RadioOption {
  /** Unique value identifier for the radio option */
  value: string
  /** Display label for the radio option */
  label: string
  /** Optional description text */
  description?: string
  /** Whether this radio option is disabled */
  disabled?: boolean
}

/**
 * RadioGroup props
 */
export interface RadioGroupProps extends RadioGroupRootProps {
  /** Array of radio options to render */
  options: RadioOption[]
  /** Visual variant */
  variant?: 'default' | 'cards'
  /** Label for the radio group */
  label?: string
  /** Additional CSS classes */
  class?: string
}

export type { RadioGroupRootEmits }
