/**
 * Progress component - type definitions
 */

import type { ProgressRootProps, ProgressRootEmits } from '@ark-ui/vue/progress'

/**
 * Progress props
 */
export interface ProgressProps extends ProgressRootProps {
  /** Visual variant */
  variant?: 'default' | 'success' | 'warning' | 'danger'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Label text */
  label?: string
  /** Whether to show the value text */
  showValue?: boolean
  /** Additional CSS classes */
  class?: string
}

export type { ProgressRootEmits }
