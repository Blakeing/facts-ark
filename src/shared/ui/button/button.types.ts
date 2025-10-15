/**
 * Button component - type definitions
 */

import type { VariantProps } from 'tailwind-variants'
import type { buttonVariants } from './button.variants'

/**
 * Button variant props extracted from buttonVariants
 */
type ButtonVariantProps = VariantProps<typeof buttonVariants>

/**
 * Button props
 */
export interface ButtonProps {
  /**
   * Visual style variant
   * @default 'solid'
   */
  variant?: ButtonVariantProps['variant']

  /**
   * Size variant
   * @default 'md'
   */
  size?: ButtonVariantProps['size']

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
