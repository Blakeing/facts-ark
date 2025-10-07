/**
 * SegmentGroup component - type definitions
 */

import type { SegmentGroupRootProps, SegmentGroupRootEmits } from '@ark-ui/vue/segment-group'

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
  /** Visual variant */
  variant?: 'default' | 'pills'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Label text */
  label?: string
  /** Additional CSS classes */
  class?: string
}

export type { SegmentGroupRootEmits }
