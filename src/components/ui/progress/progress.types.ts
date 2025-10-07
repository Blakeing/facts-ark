/**
 * Progress component - type definitions
 */

import type { ProgressRootProps, ProgressRootEmits } from '@ark-ui/vue/progress'
import type { VariantProps } from 'tailwind-variants'
import type { progressVariants } from './progress.variants'

/**
 * Progress variant props extracted from progressVariants
 */
type ProgressVariantProps = VariantProps<typeof progressVariants>

/**
 * Progress props
 */
export interface ProgressProps extends ProgressRootProps {
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: ProgressVariantProps['variant']

  /**
   * Size variant
   * @default 'md'
   */
  size?: ProgressVariantProps['size']

  /** Label text */
  label?: string

  /** Whether to show the value text */
  showValue?: boolean

  /** Additional CSS classes */
  class?: string
}

export type { ProgressRootEmits }
