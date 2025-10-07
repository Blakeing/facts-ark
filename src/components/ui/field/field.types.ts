/**
 * Field component - type definitions
 */

import type { FieldRootProps } from '@ark-ui/vue/field'
import type { InputHTMLAttributes } from 'vue'
import type { VariantProps } from 'tailwind-variants'
import type { inputVariants } from '../input/input.variants'

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

/**
 * Input variant props extracted from inputVariants
 */
type InputVariantProps = VariantProps<typeof inputVariants>

/**
 * FieldInput props - combines Field context with Input styling
 */
export interface FieldInputProps extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'size'> {
  /**
   * Input size variant
   * @default 'md'
   */
  size?: InputVariantProps['size']

  /**
   * Input variant (auto-detects 'error' from Field context if not provided)
   * @default 'default'
   */
  variant?: InputVariantProps['variant']

  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'file'

  /** Additional CSS classes */
  class?: string
}
