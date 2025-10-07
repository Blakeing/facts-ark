/**
 * Textarea component - type definitions
 */

import type { TextareaHTMLAttributes } from 'vue'
import type { VariantProps } from 'tailwind-variants'
import type { textareaVariants } from './textarea.variants'

/**
 * Textarea variant props extracted from textareaVariants
 */
type TextareaVariantProps = VariantProps<typeof textareaVariants>

/**
 * Textarea props
 */
export interface TextareaProps extends /* @vue-ignore */ TextareaHTMLAttributes {
  /**
   * Textarea size variant
   * @default 'md'
   */
  size?: TextareaVariantProps['size']

  /**
   * Textarea variant
   * @default 'default'
   */
  variant?: TextareaVariantProps['variant']

  /**
   * Resize behavior
   * @default 'vertical'
   */
  resize?: TextareaVariantProps['resize']

  /** Additional CSS classes */
  class?: string
}
