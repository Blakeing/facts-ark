/**
 * Avatar component - type definitions
 */

import type { AvatarRootProps, AvatarRootEmits } from '@ark-ui/vue/avatar'
import type { VariantProps } from 'tailwind-variants'
import type { avatarVariants } from './avatar.variants'

/**
 * Avatar variant props extracted from avatarVariants
 */
type AvatarVariantProps = VariantProps<typeof avatarVariants>

/**
 * Avatar props
 */
export interface AvatarProps extends AvatarRootProps {
  /** User's full name - used for alt text and generating initials */
  name: string

  /** Image source URL */
  src?: string

  /**
   * Avatar size variant
   * @default 'md'
   */
  size?: AvatarVariantProps['size']

  /** Additional CSS classes */
  class?: string
}

export type { AvatarRootEmits }
