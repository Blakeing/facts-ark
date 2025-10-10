/**
 * HoverCard component - type definitions
 */

import type { HoverCardRootProps, HoverCardRootEmits } from '@ark-ui/vue/hover-card'
import type { VariantProps } from 'tailwind-variants'
import type { hoverCardVariants } from './hover-card.variants'

/**
 * Hover Card variant props extracted from hoverCardVariants
 */
type HoverCardVariantProps = VariantProps<typeof hoverCardVariants>

/**
 * HoverCard props
 */
export interface HoverCardProps extends HoverCardRootProps {
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: HoverCardVariantProps['variant']

  /** Content to display in the hover card */
  content?: string

  /** Trigger text/content */
  trigger?: string

  /** Additional CSS classes */
  class?: string
}

export type { HoverCardRootEmits }
