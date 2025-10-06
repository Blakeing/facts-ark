/**
 * Card component - type definitions
 */

import type { variantStyles, paddingStyles } from './card.variants'

/**
 * Card props
 */
export interface CardProps {
  /** Visual variant */
  variant?: keyof typeof variantStyles
  /** Padding size */
  padding?: keyof typeof paddingStyles
  /** Additional CSS classes */
  class?: string
}
