/**
 * Menu component - type definitions
 */

import type { MenuRootProps, MenuRootEmits } from '@ark-ui/vue/menu'
import type { Component } from 'vue'

/**
 * Individual menu item definition
 */
export interface MenuItem {
  /** Unique value identifier for the menu item */
  value: string
  /** Display label for the menu item */
  label: string
  /** Whether this menu item is disabled */
  disabled?: boolean
  /** Optional icon component */
  icon?: Component
  /** Optional keyboard shortcut text */
  shortcut?: string
}

/**
 * Menu props
 */
export interface MenuProps extends MenuRootProps {
  /** Array of menu items to render */
  items?: MenuItem[]
  /** Trigger button text */
  trigger?: string
  /** Visual variant */
  variant?: 'default'
  /** Additional CSS classes */
  class?: string
}

export type { MenuRootEmits }
