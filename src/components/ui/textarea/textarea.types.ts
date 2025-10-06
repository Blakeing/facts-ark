/**
 * Textarea component - type definitions
 */

import type { TextareaHTMLAttributes } from 'vue'
import type { sizeStyles } from './textarea.variants'

/**
 * Textarea props
 */
export interface TextareaProps extends /* @vue-ignore */ TextareaHTMLAttributes {
  /** Textarea size variant */
  size?: keyof typeof sizeStyles
  /** Whether the textarea is invalid */
  invalid?: boolean
  /** Resize behavior */
  resize?: 'none' | 'both' | 'vertical' | 'horizontal'
  /** Additional CSS classes */
  class?: string
}
