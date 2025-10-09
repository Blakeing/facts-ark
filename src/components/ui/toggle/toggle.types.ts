/**
 * Toggle component - type definitions
 */

import type { ToggleRootProps, ToggleRootEmits } from '@ark-ui/vue/toggle'
import type { VariantProps } from 'tailwind-variants'
import type { toggleVariants } from './toggle.variants'

/**
 * Toggle variant props
 */
type ToggleVariantProps = VariantProps<typeof toggleVariants>

/**
 * Toggle props
 */
export interface ToggleProps extends ToggleRootProps {
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: ToggleVariantProps['variant']

  /**
   * Size variant
   * @default 'md'
   */
  size?: ToggleVariantProps['size']

  /**
   * Aria label for the toggle
   */
  'aria-label'?: string

  /**
   * Additional CSS classes
   */
  class?: string
}

export type { ToggleRootEmits }
