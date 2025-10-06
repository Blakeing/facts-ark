/**
 * Select component - type definitions
 */

import type { SelectRootProps, SelectRootEmits } from '@ark-ui/vue/select'
import type { sizeStyles } from './select.variants'

/**
 * Select item definition
 */
export interface SelectItem {
  /** Unique value for the item */
  value: string
  /** Display label for the item */
  label: string
  /** Whether this item is disabled */
  disabled?: boolean
  /** Optional avatar image URL */
  avatar?: string
  /** Optional secondary text (e.g., username, email) */
  description?: string
  /** Optional status indicator (e.g., online/offline) */
  status?: 'online' | 'offline' | boolean
}

/**
 * Select item group definition
 */
export interface SelectItemGroup {
  /** Group label */
  label: string
  /** Items in this group */
  items: SelectItem[]
}

/**
 * Select props
 */
export interface SelectProps extends Omit<SelectRootProps<SelectItem>, 'collection'> {
  /** Array of select items or grouped items */
  items: SelectItem[] | SelectItemGroup[]
  /** Label for the select */
  label?: string
  /** Placeholder text when no value is selected */
  placeholder?: string
  /** Size variant */
  size?: keyof typeof sizeStyles
  /** Position of check indicator */
  indicatorPosition?: 'left' | 'right'
  /** Additional CSS classes */
  class?: string
}

export type { SelectRootEmits }
