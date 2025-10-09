/**
 * Color Picker component - type definitions
 */

import type { ColorPickerRootProps, ColorPickerRootEmits } from '@ark-ui/vue/color-picker'

/**
 * Color Picker props
 */
export interface ColorPickerProps extends ColorPickerRootProps {
  /**
   * Label text
   */
  label?: string

  /**
   * Show eyedropper tool
   * @default true
   */
  showEyeDropper?: boolean

  /**
   * Preset color swatches
   */
  swatches?: string[]

  /**
   * Helper text displayed below the picker
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

export type { ColorPickerRootEmits }
