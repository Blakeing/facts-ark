/**
 * Switch component - type definitions
 */

import type { SwitchRootProps, SwitchRootEmits } from '@ark-ui/vue/switch'
import type { VariantProps } from 'tailwind-variants'
import type { switchVariants } from './switch.variants'

/**
 * Switch variant props extracted from switchVariants
 */
type SwitchVariantProps = VariantProps<typeof switchVariants>

/**
 * Switch props
 */
export interface SwitchProps extends SwitchRootProps {
  /** Switch label text */
  label?: string

  /**
   * Size variant
   * @default 'md'
   */
  size?: SwitchVariantProps['size']

  /** Additional CSS classes */
  class?: string
}

export type { SwitchRootEmits }
