/**
 * Collapsible component - type definitions
 */

import type { CollapsibleRootProps, CollapsibleRootEmits } from '@ark-ui/vue/collapsible'
import type { VariantProps } from 'tailwind-variants'
import type { Component } from 'vue'
import type { collapsibleVariants } from './collapsible.variants'

/**
 * Collapsible variant props extracted from collapsibleVariants
 */
type CollapsibleVariantProps = VariantProps<typeof collapsibleVariants>

/**
 * Collapsible props
 */
export interface CollapsibleProps extends CollapsibleRootProps {
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: CollapsibleVariantProps['variant']

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
