/**
 * Tabs component - type definitions
 */

import type { TabsRootProps, TabsRootEmits } from '@ark-ui/vue/tabs'
import type { VariantProps } from 'tailwind-variants'
import type { Component } from 'vue'
import type { tabsVariants } from './tabs.variants'

/**
 * Tabs variant props extracted from tabsVariants
 */
type TabsVariantProps = VariantProps<typeof tabsVariants>

/**
 * Individual tab item definition
 */
export interface TabItem {
  /** Unique value identifier for the tab */
  value: string
  /** Display label for the tab trigger */
  label: string
  /** Whether this tab is disabled */
  disabled?: boolean
  /** Optional icon component (from lucide-vue-next or similar) */
  icon?: Component
  /** Optional badge count or text */
  badge?: string | number
  /** Content to display when tab is active (can be string or slot content) */
  content?: string
}

/**
 * Tabs props
 */
export interface TabsProps extends TabsRootProps {
  /** Array of tab items to render */
  items: TabItem[]

  /**
   * Visual variant
   * @default 'line'
   */
  variant?: TabsVariantProps['variant']

  /** Whether to show the indicator (only works with 'bar' variant) */
  indicator?: boolean

  /** Whether to show mobile select dropdown on small screens */
  responsive?: boolean

  /** Additional CSS classes */
  class?: string
}

export type { TabsRootEmits }
