/**
 * Date Picker component - type definitions
 */

import type { DatePickerRootProps, DatePickerRootEmits } from '@ark-ui/vue/date-picker'

/**
 * Date Picker props
 */
export interface DatePickerProps extends DatePickerRootProps {
  /**
   * Label text
   */
  label?: string

  /**
   * Placeholder text
   * @default 'Select date'
   */
  placeholder?: string

  /**
   * Show clear button
   * @default true
   */
  showClear?: boolean

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

export type { DatePickerRootEmits }
