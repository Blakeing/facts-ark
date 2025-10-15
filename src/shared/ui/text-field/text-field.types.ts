/**
 * TextField component - type definitions
 */

import type { VariantProps } from 'tailwind-variants'
import type { inputVariants } from '../input/input.variants'

/**
 * Input variant props
 */
type InputVariantProps = VariantProps<typeof inputVariants>

/**
 * TextField props - form-integrated text field with VeeValidate
 *
 * This is a unified form component that requires a name prop and automatically
 * integrates with VeeValidate for validation and state management.
 *
 * For non-form usage, use Field + FieldInput directly.
 */
export interface TextFieldProps {
  /**
   * Field name for VeeValidate integration (required)
   */
  name: string

  /**
   * Label text
   */
  label?: string

  /**
   * Helper text displayed below the input
   */
  helperText?: string

  /**
   * Error message displayed when invalid (overrides VeeValidate errors)
   */
  errorText?: string

  /**
   * Input type
   * @default 'text'
   */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'file'

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Whether the input is disabled
   */
  disabled?: boolean

  /**
   * Whether the input is readonly
   */
  readonly?: boolean

  /**
   * Whether the input is required
   */
  required?: boolean

  /**
   * Input size variant
   * @default 'md'
   */
  size?: InputVariantProps['size']

  /**
   * Input variant
   */
  variant?: InputVariantProps['variant']

  /**
   * Field ID
   */
  id?: string

  /**
   * Additional CSS classes
   */
  class?: string
}
