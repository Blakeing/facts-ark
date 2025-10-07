/**
 * Collapsible component - type definitions
 */

import type { CollapsibleRootProps, CollapsibleRootEmits } from '@ark-ui/vue/collapsible'
import type { Component } from 'vue'

/**
 * Collapsible props
 */
export interface CollapsibleProps extends CollapsibleRootProps {
  /** Visual variant */
  variant?: 'default' | 'bordered' | 'ghost'
  /** Trigger button text */
  trigger?: string
  /** Content to display when expanded */
  content?: string
  /** Optional icon component for trigger */
  icon?: Component
  /** Additional CSS classes */
  class?: string
}

export type { CollapsibleRootEmits }
