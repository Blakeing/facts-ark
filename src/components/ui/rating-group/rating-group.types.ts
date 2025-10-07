/**
 * RatingGroup component - type definitions
 */

import type { RatingGroupRootProps, RatingGroupRootEmits } from '@ark-ui/vue/rating-group'

/**
 * RatingGroup props
 */
export interface RatingGroupProps extends RatingGroupRootProps {
  /** Visual variant */
  variant?: 'default' | 'yellow'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Label text */
  label?: string
  /** Additional CSS classes */
  class?: string
}

export type { RatingGroupRootEmits }
