/**
 * Clipboard component - type definitions
 */

import type { ClipboardRootProps, ClipboardRootEmits } from '@ark-ui/vue/clipboard'

/**
 * Clipboard props
 */
export interface ClipboardProps extends ClipboardRootProps {
  /** Visual variant */
  variant?: 'default' | 'inline' | 'button'
  /** Label text */
  label?: string
  /** Whether to show the input field */
  showInput?: boolean
  /** Placeholder text for input */
  placeholder?: string
  /** Additional CSS classes */
  class?: string
}

export type { ClipboardRootEmits }
