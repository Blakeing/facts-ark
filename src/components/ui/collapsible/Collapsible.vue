<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Collapsible } from '@ark-ui/vue/collapsible'
import { ChevronDown } from 'lucide-vue-next'
import { computed } from 'vue'
import { collapsibleVariants } from './collapsible.variants'
import type { CollapsibleProps, CollapsibleRootEmits } from './collapsible.types'

/**
 * A closed Collapsible component for showing and hiding content.
 *
 * Supports multiple variants:
 * - default: Simple collapsible with spacing
 * - bordered: With border and padding
 * - ghost: Subtle hover effect
 *
 * Features:
 * - Smooth expand/collapse animation
 * - Disabled state
 * - Custom trigger content
 * - Optional icons
 * - Lazy mounting support
 *
 * @example
 * // Simple usage
 * <Collapsible
 *   variant="default"
 *   trigger="Show more"
 *   content="This is the hidden content"
 * />
 *
 * @example
 * // With custom content
 * <Collapsible variant="bordered" trigger="Details">
 *   <template #content>
 *     <p>Custom content here</p>
 *   </template>
 * </Collapsible>
 */

const props = withDefaults(defineProps<CollapsibleProps>(), {
  variant: 'default',
  defaultOpen: false,
})

const emits = defineEmits<CollapsibleRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  collapsibleVariants({
    variant: props.variant,
  })
)
</script>

<template>
  <Collapsible.Root v-bind="forwarded" :class="[styles.root(), props.class]">
    <Collapsible.Trigger :class="styles.trigger()">
      <!-- Optional icon -->
      <component
        :is="props.icon"
        v-if="props.icon"
        :class="styles.triggerIcon()"
        aria-hidden="true"
      />

      <!-- Trigger content -->
      <span class="flex-1">
        <slot name="trigger">
          {{ props.trigger }}
        </slot>
      </span>

      <!-- Chevron indicator -->
      <Collapsible.Indicator :class="styles.indicator()">
        <ChevronDown />
      </Collapsible.Indicator>
    </Collapsible.Trigger>

    <Collapsible.Content :class="styles.content()">
      <!-- Use slot if provided, otherwise use content prop -->
      <slot name="content">
        {{ props.content }}
      </slot>
    </Collapsible.Content>
  </Collapsible.Root>
</template>
