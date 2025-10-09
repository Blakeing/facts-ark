/**
 * Password Input component - type definitions
 */

import type { PasswordInputRootProps } from '@ark-ui/vue/password-input'
import type { VariantProps } from 'tailwind-variants'
import type { passwordInputVariants } from './password-input.variants'

/**
 * Password Input variant props
 */
type PasswordInputVariantProps = VariantProps<typeof passwordInputVariants>

/**
 * Password Input props
 */
export interface PasswordInputProps extends PasswordInputRootProps {
  /**
   * Size variant
   * @default 'md'
   */
  size?: PasswordInputVariantProps['size']

  /**
   * Label text
   */
  label?: string

  /**
   * Placeholder text
   */
  placeholder?: string

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
