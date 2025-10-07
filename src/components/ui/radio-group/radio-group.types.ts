/**
 * RadioGroup component - type definitions
 */

import type { RadioGroupRootProps, RadioGroupRootEmits } from '@ark-ui/vue/radio-group'
import type { VariantProps } from 'tailwind-variants'
import type { radioGroupVariants } from './radio-group.variants'

/**
 * Radio Group variant props extracted from radioGroupVariants
 */
type RadioGroupVariantProps = VariantProps<typeof radioGroupVariants>

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

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: RadioGroupVariantProps['variant']

  /** Label for the radio group */
  label?: string

  /** Additional CSS classes */
  class?: string
}

export type { RadioGroupRootEmits }
