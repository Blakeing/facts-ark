/**
 * Tooltip component - type definitions
 */

import type { TooltipRootProps, TooltipRootEmits } from '@ark-ui/vue/tooltip'
import type { VariantProps } from 'tailwind-variants'
import type { tooltipVariants } from './tooltip.variants'

/**
 * Tooltip variant props extracted from tooltipVariants
 */
type TooltipVariantProps = VariantProps<typeof tooltipVariants>

/**
 * Tooltip props
 */
export interface TooltipProps extends TooltipRootProps {
  /** Content to display in the tooltip */
  content?: string

  /** Trigger text/content */
  trigger?: string

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: TooltipVariantProps['variant']

  /** Additional CSS classes */
  class?: string
}

export type { TooltipRootEmits }
