<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Toggle } from '@ark-ui/vue/toggle'
import { computed } from 'vue'
import { useOmitProps } from '@/lib/useOmitProps'
import { toggleVariants } from './toggle.variants'
import type { ToggleProps, ToggleRootEmits } from './toggle.types'

/**
 * A Toggle component for toolbar buttons and binary states.
 *
 * Toggle is different from Switch:
 * - Toggle: For toolbar buttons (bold, italic, etc.)
 * - Switch: For settings/preferences (on/off states)
 *
 * Features:
 * - Multiple variants (default, outline, subtle)
 * - Multiple sizes
 * - Fully accessible
 * - Supports icons or text
 *
 * @example
 * <Toggle aria-label="Toggle bold">
 *   <BoldIcon />
 * </Toggle>
 *
 * @example
 * // With text
 * <Toggle aria-label="Toggle italic">
 *   Italic
 * </Toggle>
 */

const props = withDefaults(defineProps<ToggleProps>(), {
  variant: 'default',
  size: 'md',
})

const emits = defineEmits<ToggleRootEmits>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(props, ['variant', 'size', 'class'] as const)
const forwarded = useForwardPropsEmits(arkProps, emits)

const toggleClass = computed(() =>
  toggleVariants({
    variant: props.variant,
    size: props.size,
    class: props.class,
  })
)
</script>

<template>
  <Toggle.Root v-bind="forwarded" :class="toggleClass">
    <slot />
  </Toggle.Root>
</template>

