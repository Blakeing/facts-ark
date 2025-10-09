/**
 * Combobox component - type definitions
 */

import type { ComboboxRootProps, ComboboxRootEmits } from '@ark-ui/vue/combobox'
import type { VariantProps } from 'tailwind-variants'
import type { comboboxVariants } from './combobox.variants'

/**
 * Combobox variant props
 */
type ComboboxVariantProps = VariantProps<typeof comboboxVariants>

/**
 * Generic item type for combobox
 */
export interface ComboboxItem {
  label: string
  value: string
  disabled?: boolean
}

/**
 * Combobox props
 */
export interface ComboboxProps<T = ComboboxItem> extends Omit<ComboboxRootProps<T>, 'collection'> {
  /**
   * Size variant
   * @default 'md'
   */
  size?: ComboboxVariantProps['size']

  /**
   * Label text
   */
  label?: string

  /**
   * Placeholder text
   */
  placeholder?: string

  /**
   * Items to display in the combobox
   */
  items: T[]

  /**
   * Function to get the label from an item
   * @default (item) => item.label
   */
  itemToString?: (item: T) => string

  /**
   * Function to get the value from an item
   * @default (item) => item.value
   */
  itemToValue?: (item: T) => string

  /**
   * Helper text displayed below the input
   */
  helperText?: string

  /**
   * Error message
   */
  error?: string

  /**
   * Additional CSS classes
   */
  class?: string
}

export type { ComboboxRootEmits }
