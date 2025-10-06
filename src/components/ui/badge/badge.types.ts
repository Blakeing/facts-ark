/**
 * Badge component - type definitions
 */

import type { variantStyles, sizeStyles } from './badge.variants'

/**
 * Badge props
 */
export interface BadgeProps {
  /** Visual style variant */
  variant?: keyof typeof variantStyles
  /** Size variant */
  size?: keyof typeof sizeStyles
  /** Additional CSS classes */
  class?: string
}
