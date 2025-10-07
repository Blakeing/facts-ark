/**
 * TagsInput component - type definitions
 */

import type { TagsInputRootProps, TagsInputRootEmits } from '@ark-ui/vue/tags-input'

/**
 * TagsInput props
 */
export interface TagsInputProps extends TagsInputRootProps {
  /** Visual variant */
  variant?: 'default' | 'outline'
  /** Label text */
  label?: string
  /** Placeholder text */
  placeholder?: string
  /** Additional CSS classes */
  class?: string
}

export type { TagsInputRootEmits }
