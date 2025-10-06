<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Switch } from '@ark-ui/vue/switch'
import { computed } from 'vue'
import { switchVariants } from './switch.variants'
import type { SwitchProps, SwitchRootEmits } from './switch.types'

/**
 * A closed Switch component for toggling between two states.
 *
 * @example
 * <Switch label="Enable notifications" />
 * <Switch label="Dark mode" size="lg" />
 * <Switch label="Disabled" disabled />
 */

const props = defineProps<SwitchProps>()
const emits = defineEmits<SwitchRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  switchVariants({
    size: props.size,
  })
)
</script>

<template>
  <Switch.Root v-bind="forwarded" :class="[styles.root(), props.class]">
    <Switch.Control :class="styles.control()">
      <Switch.Thumb :class="styles.thumb()" />
    </Switch.Control>
    <Switch.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </Switch.Label>
    <Switch.HiddenInput />
  </Switch.Root>
</template>
