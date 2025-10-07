/**
 * RatingGroup component - type definitions
 */

import type { RatingGroupRootProps, RatingGroupRootEmits } from '@ark-ui/vue/rating-group'
import type { VariantProps } from 'tailwind-variants'
import type { ratingGroupVariants } from './rating-group.variants'

/**
 * Rating Group variant props extracted from ratingGroupVariants
 */
type RatingGroupVariantProps = VariantProps<typeof ratingGroupVariants>

/**
 * RatingGroup props
 */
export interface RatingGroupProps extends RatingGroupRootProps {
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: RatingGroupVariantProps['variant']

  /**
   * Size variant
   * @default 'md'
   */
  size?: RatingGroupVariantProps['size']

  /** Label text */
  label?: string

  /** Additional CSS classes */
  class?: string
}

export type { RatingGroupRootEmits }
