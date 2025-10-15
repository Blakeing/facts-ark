/**
 * ToggleGroup component - type definitions
 */

import type { ToggleGroupRootProps, ToggleGroupRootEmits } from '@ark-ui/vue/toggle-group'
import type { Component } from 'vue'

/**
 * Individual toggle option definition
 */
export interface ToggleOption {
  /** Unique value identifier for the toggle */
  value: string
  /** Display label for the toggle */
  label: string
  /** Optional icon component */
  icon?: Component
  /** Whether this toggle is disabled */
  disabled?: boolean
}

/**
 * ToggleGroup props
 */
export interface ToggleGroupProps extends ToggleGroupRootProps {
  /** Array of toggle options to render */
  options: ToggleOption[]
  /** Visual variant */
  variant?: 'default' | 'outline'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  class?: string
}

export type { ToggleGroupRootEmits }
