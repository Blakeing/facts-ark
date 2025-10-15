/**
 * Pin Input component - type definitions
 */

import type { PinInputRootProps, PinInputRootEmits } from '@ark-ui/vue/pin-input'
import type { VariantProps } from 'tailwind-variants'
import type { pinInputVariants } from './pin-input.variants'

/**
 * Pin Input variant props
 */
type PinInputVariantProps = VariantProps<typeof pinInputVariants>

/**
 * Pin Input props
 */
export interface PinInputProps extends PinInputRootProps {
  /**
   * Size variant
   * @default 'md'
   */
  size?: PinInputVariantProps['size']

  /**
   * Label text
   */
  label?: string

  /**
   * Number of input fields
   * @default 6
   */
  length?: number

  /**
   * Whether to use OTP mode (one-time password)
   * @default true
   */
  otp?: boolean

  /**
   * Type of input
   * @default 'numeric'
   */
  type?: 'numeric' | 'alphanumeric' | 'alphabetic'

  /**
   * Whether to mask the input (show dots instead of characters)
   * @default false
   */
  mask?: boolean

  /**
   * Helper text displayed below the input
   */
  helperText?: string

  /**
   * Error message
   */
  error?: string

  /**
   * Additional CSS classes
   */
  class?: string
}

export type { PinInputRootEmits }
