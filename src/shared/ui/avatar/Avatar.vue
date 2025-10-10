<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Avatar } from '@ark-ui/vue/avatar'
import { UserIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { avatarVariants } from './avatar.variants'
import type { AvatarProps, AvatarRootEmits } from './avatar.types'

/**
 * A closed Avatar component that displays a user's profile picture with automatic fallback to initials.
 *
 * @example
 * <Avatar name="John Doe" src="https://example.com/avatar.jpg" />
 * <Avatar name="Jane Smith" size="lg" />
 * <Avatar name="Bob" /> <!-- Shows icon if name too short -->
 */

const props = defineProps<AvatarProps>()

const emits = defineEmits<AvatarRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

/**
 * Extract initials from a name (first 2 letters of first 2 words)
 */
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

const initials = computed(() => getInitials(props.name))

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32,
  '2xl': 40,
} as const

const avatarClass = computed(() =>
  avatarVariants({
    size: props.size,
    class: props.class,
  })
)
</script>

<template>
  <Avatar.Root v-bind="forwarded" :class="avatarClass">
    <Avatar.Fallback
      class="flex size-full items-center justify-center bg-muted text-muted-foreground font-medium"
    >
      <template v-if="initials && initials.length >= 2">
        {{ initials }}
      </template>
      <UserIcon v-else :size="iconSizes[size ?? 'md']" class="opacity-50" />
    </Avatar.Fallback>
    <Avatar.Image
      v-if="src"
      :src="src"
      :alt="name"
      class="size-full rounded-full object-cover"
    />
  </Avatar.Root>
</template>

