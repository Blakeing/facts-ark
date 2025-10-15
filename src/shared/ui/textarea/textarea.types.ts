/**
 * Textarea component - type definitions
 */

import type { VariantProps } from 'tailwind-variants'
import type { textareaVariants } from './textarea.variants'

/**
 * Textarea variant props
 */
type TextareaVariantProps = VariantProps<typeof textareaVariants>

/**
 * Textarea props - form-integrated textarea with VeeValidate
 *
 * This is a unified form component that requires a name prop and automatically
 * integrates with VeeValidate for validation and state management.
 *
 * For non-form usage, use Field + FieldTextarea directly.
 */
export interface TextareaProps {
  /**
   * Field name for VeeValidate integration (required)
   */
  name: string

  /**
   * Label text
   */
  label?: string

  /**
   * Helper text displayed below the textarea
   */
  helperText?: string

  /**
   * Error message displayed when invalid (overrides VeeValidate errors)
   */
  errorText?: string

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Whether the textarea is disabled
   */
  disabled?: boolean

  /**
   * Whether the textarea is readonly
   */
  readonly?: boolean

  /**
   * Whether the textarea is required
   */
  required?: boolean

  /**
   * Textarea size variant
   * @default 'md'
   */
  size?: TextareaVariantProps['size']

  /**
   * Textarea variant
   */
  variant?: TextareaVariantProps['variant']

  /**
   * Resize behavior
   * @default 'vertical'
   */
  resize?: TextareaVariantProps['resize']

  /**
   * Number of visible rows
   * @default 3
   */
  rows?: number

  /**
   * Field ID
   */
  id?: string

  /**
   * Additional CSS classes
   */
  class?: string
}
