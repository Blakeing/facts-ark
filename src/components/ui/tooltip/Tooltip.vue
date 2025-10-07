<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Tooltip } from '@ark-ui/vue/tooltip'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { useOmitProps } from '@/lib/useOmitProps'
import { tooltipVariants } from './tooltip.variants'
import type { TooltipProps, TooltipRootEmits } from './tooltip.types'

/**
 * A closed Tooltip component for displaying contextual information.
 *
 * Supports multiple variants:
 * - default: Dark tooltip on light background
 * - inverse: Light tooltip on dark background
 *
 * Features:
 * - Configurable delays
 * - Positioning options
 * - Interactive mode
 * - Keyboard support
 * - Accessible
 *
 * @example
 * // Simple usage
 * <Tooltip
 *   trigger="Hover me"
 *   content="Tooltip content"
 * />
 *
 * @example
 * // With custom delay
 * <Tooltip
 *   trigger="Hover me"
 *   content="This appears quickly"
 *   :open-delay="200"
 * />
 */

const props = withDefaults(defineProps<TooltipProps>(), {
  variant: 'default',
  openDelay: 700,
  closeDelay: 300,
})

const emits = defineEmits<TooltipRootEmits>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  ['content', 'trigger', 'variant', 'class'] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() =>
  tooltipVariants({
    variant: props.variant,
  })
)
</script>

<template>
  <Tooltip.Root v-bind="forwarded">
    <Tooltip.Trigger :class="cn(styles.trigger(), props.class)">
      <slot name="trigger">
        {{ props.trigger }}
      </slot>
    </Tooltip.Trigger>
    <Teleport to="body">
      <Tooltip.Positioner :class="styles.positioner()">
        <Tooltip.Content :class="styles.content()">
          <slot>
            {{ props.content }}
          </slot>
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Teleport>
  </Tooltip.Root>
</template>
