/**
 * Slider component - type definitions
 */

import type { SliderRootProps, SliderRootEmits } from '@ark-ui/vue/slider'
import type { VariantProps } from 'tailwind-variants'
import type { sliderVariants } from './slider.variants'

/**
 * Slider variant props extracted from sliderVariants
 */
type SliderVariantProps = VariantProps<typeof sliderVariants>

/**
 * Slider props
 */
export interface SliderProps extends SliderRootProps {
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: SliderVariantProps['variant']

  /**
   * Size variant
   * @default 'md'
   */
  size?: SliderVariantProps['size']

  /** Label text */
  label?: string

  /** Whether to show the value text */
  showValue?: boolean

  /** Additional CSS classes */
  class?: string
}

export type { SliderRootEmits }