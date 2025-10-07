/**
 * Tooltip component - type definitions
 */

import type { TooltipRootProps, TooltipRootEmits } from '@ark-ui/vue/tooltip'

/**
 * Tooltip props
 */
export interface TooltipProps extends TooltipRootProps {
  /** Content to display in the tooltip */
  content?: string
  /** Trigger text/content */
  trigger?: string
  /** Visual variant */
  variant?: 'default' | 'inverse'
  /** Additional CSS classes */
  class?: string
}

export type { TooltipRootEmits }
