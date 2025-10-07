/**
 * HoverCard component - type definitions
 */

import type { HoverCardRootProps, HoverCardRootEmits } from '@ark-ui/vue/hover-card'

/**
 * HoverCard props
 */
export interface HoverCardProps extends HoverCardRootProps {
  /** Visual variant */
  variant?: 'default'
  /** Content to display in the hover card */
  content?: string
  /** Trigger text/content */
  trigger?: string
  /** Additional CSS classes */
  class?: string
}

export type { HoverCardRootEmits }
