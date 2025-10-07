/**
 * TagsInput component - type definitions
 */

import type { TagsInputRootProps, TagsInputRootEmits } from '@ark-ui/vue/tags-input'
import type { VariantProps } from 'tailwind-variants'
import type { tagsInputVariants } from './tags-input.variants'

/**
 * Tags Input variant props extracted from tagsInputVariants
 */
type TagsInputVariantProps = VariantProps<typeof tagsInputVariants>

/**
 * TagsInput props
 */
export interface TagsInputProps extends TagsInputRootProps {
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: TagsInputVariantProps['variant']

  /** Label text */
  label?: string

  /** Placeholder text */
  placeholder?: string

  /** Additional CSS classes */
  class?: string
}

export type { TagsInputRootEmits }
