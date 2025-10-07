/**
 * NumberInput component - type definitions
 */

import type { NumberInputRootProps, NumberInputRootEmits } from '@ark-ui/vue/number-input'

/**
 * NumberInput props
 */
export interface NumberInputProps extends NumberInputRootProps {
  /** Visual variant */
  variant?: 'default' | 'outline'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Label text */
  label?: string
  /** Additional CSS classes */
  class?: string
}

export type { NumberInputRootEmits }
