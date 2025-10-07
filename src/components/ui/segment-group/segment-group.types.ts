/**
 * SegmentGroup component - type definitions
 */

import type { SegmentGroupRootProps, SegmentGroupRootEmits } from '@ark-ui/vue/segment-group'
import type { VariantProps } from 'tailwind-variants'
import type { segmentGroupVariants } from './segment-group.variants'

/**
 * Segment Group variant props extracted from segmentGroupVariants
 */
type SegmentGroupVariantProps = VariantProps<typeof segmentGroupVariants>

/**
 * Individual segment option definition
 */
export interface SegmentOption {
  /** Unique value identifier for the segment */
  value: string
  /** Display label for the segment */
  label: string
  /** Whether this segment is disabled */
  disabled?: boolean
}

/**
 * SegmentGroup props
 */
export interface SegmentGroupProps extends SegmentGroupRootProps {
  /** Array of segment options to render */
  options: SegmentOption[]

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: SegmentGroupVariantProps['variant']

  /**
   * Size variant
   * @default 'md'
   */
  size?: SegmentGroupVariantProps['size']

  /** Label text */
  label?: string

  /** Additional CSS classes */
  class?: string
}

export type { SegmentGroupRootEmits }