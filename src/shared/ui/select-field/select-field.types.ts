/**
 * SelectField component - type definitions
 */

import type { SelectItem, SelectItemGroup, SelectProps } from '../select/select.types'
import type { VariantProps } from 'tailwind-variants'
import type { selectVariants } from '../select/select.variants'

/**
 * Re-export Select types for convenience
 */
export type { SelectItem, SelectItemGroup }

/**
 * Select variant props
 */
type SelectVariantProps = VariantProps<typeof selectVariants>

/**
 * SelectField props - form-integrated select with VeeValidate
 *
 * This is a unified form component that requires a name prop and automatically
 * integrates with VeeValidate for validation and state management.
 *
 * For non-form usage, use Field + Select directly.
 */
export interface SelectFieldProps extends Omit<SelectProps, 'class' | 'name'> {
  /**
   * Field name for VeeValidate integration (required)
   */
  name: string

  /**
   * Label text
   */
  label?: string

  /**
   * Helper text displayed below the select
   */
  helperText?: string

  /**
   * Error message displayed when invalid (overrides VeeValidate errors)
   */
  errorText?: string

  /**
   * Whether the field is required
   */
  required?: boolean

  /**
   * Array of select items or grouped items
   */
  items: SelectItem[] | SelectItemGroup[]

  /**
   * Placeholder text when no value is selected
   */
  placeholder?: string

  /**
   * Select size variant
   * @default 'md'
   */
  size?: SelectVariantProps['size']

  /**
   * Position of check indicator
   * @default 'right'
   */
  indicatorPosition?: SelectVariantProps['indicatorPosition']

  /**
   * Additional CSS classes
   */
  class?: string
}
