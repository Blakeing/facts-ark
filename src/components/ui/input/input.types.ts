/**
 * Input component - type definitions
 */

import type { InputHTMLAttributes } from 'vue'
import type { sizeStyles } from './input.variants'

/**
 * Input props
 */
export interface InputProps extends /* @vue-ignore */ Omit<InputHTMLAttributes, 'size'> {
  /** Input size variant */
  size?: keyof typeof sizeStyles
  /** Whether the input is invalid */
  invalid?: boolean
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  /** Additional CSS classes */
  class?: string
}
