/**
 * Field component - type definitions
 */

import type { FieldRootProps } from '@ark-ui/vue/field'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'vue'
import type { VariantProps } from 'tailwind-variants'
import type { inputVariants } from '../input/input.variants'
import type { textareaVariants } from '../textarea/textarea.variants'

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

/**
 * Textarea variant props extracted from textareaVariants
 */
type TextareaVariantProps = VariantProps<typeof textareaVariants>

/**
 * FieldTextarea props - combines Field context with Textarea styling
 */
export interface FieldTextareaProps extends /* @vue-ignore */ Omit<TextareaHTMLAttributes, 'size'> {
  /**
   * Textarea size variant
   * @default 'md'
   */
  size?: TextareaVariantProps['size']

  /**
   * Textarea variant (auto-detects 'error' from Field context if not provided)
   * @default 'default'
   */
  variant?: TextareaVariantProps['variant']

  /**
   * Textarea resize behavior
   * @default 'vertical'
   */
  resize?: TextareaVariantProps['resize']

  /** Number of visible rows */
  rows?: number

  /** Additional CSS classes */
  class?: string
}
