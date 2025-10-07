/**
 * Input component - type definitions
 */

import type { InputHTMLAttributes } from 'vue'
import type { VariantProps } from 'tailwind-variants'
import type { inputVariants } from './input.variants'

/**
 * Input variant props extracted from inputVariants
 */
type InputVariantProps = VariantProps<typeof inputVariants>

/**
 * Input props
 */
export interface InputProps extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'size'> {
  /**
   * Input size variant
   * @default 'md'
   */
  size?: InputVariantProps['size']

  /**
   * Input variant
   * @default 'default'
   */
  variant?: InputVariantProps['variant']

  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'file'

  /** Additional CSS classes */
  class?: string
}
