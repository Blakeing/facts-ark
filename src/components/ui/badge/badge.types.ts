/**
 * Badge component - type definitions
 */

import type { VariantProps } from 'tailwind-variants'
import type { badgeVariants } from './badge.variants'

/**
 * Badge variant props extracted from badgeVariants
 */
type BadgeVariantProps = VariantProps<typeof badgeVariants>

/**
 * Badge props
 */
export interface BadgeProps {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: BadgeVariantProps['variant']

  /**
   * Size variant
   * @default 'md'
   */
  size?: BadgeVariantProps['size']

  /** Additional CSS classes */
  class?: string
}
