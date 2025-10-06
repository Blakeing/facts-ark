/**
 * Button component - type definitions
 */

import type { variantStyles, sizeStyles } from './button.variants'

/**
 * Button props
 */
export interface ButtonProps {
  /** Visual style variant */
  variant?: keyof typeof variantStyles
  /** Size variant */
  size?: keyof typeof sizeStyles
  /** Whether the button should take full width */
  fullWidth?: boolean
  /** Loading state - shows spinner and disables button */
  loading?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset'
  /** Additional CSS classes */
  class?: string
}
