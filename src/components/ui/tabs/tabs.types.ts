/**
 * Tabs component - type definitions
 */

import type { TabsRootProps, TabsRootEmits } from '@ark-ui/vue/tabs'
import type { Component } from 'vue'

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
  /** Visual variant */
  variant?: 'line' | 'pills' | 'enclosed' | 'bar'
  /** Whether to show the indicator (only works with 'bar' variant) */
  indicator?: boolean
  /** Whether to show mobile select dropdown on small screens */
  responsive?: boolean
  /** Additional CSS classes */
  class?: string
}

export type { TabsRootEmits }
