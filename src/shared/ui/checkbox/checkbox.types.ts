/**
 * Checkbox component - type definitions
 */

import type { CheckboxRootProps, CheckboxRootEmits } from '@ark-ui/vue/checkbox'
import type { VariantProps } from 'tailwind-variants'
import type { checkboxVariants } from './checkbox.variants'

/**
 * Checkbox variant props extracted from checkboxVariants
 */
type CheckboxVariantProps = VariantProps<typeof checkboxVariants>

/**
 * Checkbox props
 */
export interface CheckboxProps extends CheckboxRootProps {
  /** Checkbox label text */
  label?: string

  /**
   * Size variant
   * @default 'md'
   */
  size?: CheckboxVariantProps['size']

  /** Additional CSS classes */
  class?: string
}

export type { CheckboxRootEmits }
