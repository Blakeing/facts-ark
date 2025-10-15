<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { HoverCard } from '@ark-ui/vue/hover-card'
import { computed } from 'vue'
import { cn } from '@/shared/lib/utils'
import { useOmitProps } from '@/shared/lib/useOmitProps'
import { hoverCardVariants } from './hover-card.variants'
import type { HoverCardProps, HoverCardRootEmits } from './hover-card.types'

/**
 * A closed HoverCard component for displaying rich content on hover.
 *
 * Features:
 * - Configurable delays
 * - Positioning options
 * - Smooth animations
 * - Accessible
 *
 * @example
 * // Simple usage
 * <HoverCard
 *   trigger="Hover me"
 *   content="Additional information"
 * />
 */

const props = withDefaults(defineProps<HoverCardProps>(), {
  variant: 'default',
  openDelay: 700,
  closeDelay: 300,
})

const emits = defineEmits<HoverCardRootEmits>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  ['variant', 'content', 'trigger', 'class'] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() => hoverCardVariants({ variant: props.variant }))
</script>

<template>
  <HoverCard.Root v-bind="forwarded">
    <HoverCard.Trigger :class="cn(styles.trigger(), props.class)">
      <slot name="trigger">
        {{ props.trigger }}
      </slot>
    </HoverCard.Trigger>

    <Teleport to="body">
      <HoverCard.Positioner :class="styles.positioner()">
        <HoverCard.Content :class="styles.content()">
          <slot>
            {{ props.content }}
          </slot>
        </HoverCard.Content>
      </HoverCard.Positioner>
    </Teleport>
  </HoverCard.Root>
</template>
