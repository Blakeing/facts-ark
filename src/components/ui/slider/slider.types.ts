/**
 * Slider component - type definitions
 */

import type { SliderRootProps, SliderRootEmits } from '@ark-ui/vue/slider'

/**
 * Slider props
 */
export interface SliderProps extends SliderRootProps {
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'danger'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Label text */
  label?: string
  /** Whether to show the value text */
  showValue?: boolean
  /** Additional CSS classes */
  class?: string
}

export type { SliderRootEmits }
