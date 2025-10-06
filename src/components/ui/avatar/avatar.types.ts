/**
 * Avatar component - type definitions
 */

import type { AvatarRootProps, AvatarRootEmits } from '@ark-ui/vue/avatar'
import type { sizeVariants } from './avatar.variants'

/**
 * Avatar props
 */
export interface AvatarProps extends AvatarRootProps {
  /** User's full name - used for alt text and generating initials */
  name: string
  /** Image source URL */
  src?: string
  /** Avatar size variant */
  size?: keyof typeof sizeVariants
  /** Additional CSS classes */
  class?: string
}

export type { AvatarRootEmits }
