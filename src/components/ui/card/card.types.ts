/**
 * Card component - type definitions
 */

import type { VariantProps } from 'tailwind-variants'
import type { cardVariants } from './card.variants'

/**
 * Card variant props extracted from cardVariants
 */
type CardVariantProps = VariantProps<typeof cardVariants>

/**
 * Card props
 */
export interface CardProps {
  /**
   * Visual variant
   * @default 'outline'
   */
  variant?: CardVariantProps['variant']

  /**
   * Padding size
   * @default 'md'
   */
  padding?: CardVariantProps['padding']

  /**
   * Makes the card interactive with hover lift effect
   * @default false
   */
  interactive?: CardVariantProps['interactive']

  /** Additional CSS classes */
  class?: string
}
