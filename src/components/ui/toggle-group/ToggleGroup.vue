<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { ToggleGroup } from '@ark-ui/vue/toggle-group'
import { computed } from 'vue'
import { toggleGroupVariants } from './toggle-group.variants'
import type { ToggleGroupProps, ToggleGroupRootEmits } from './toggle-group.types'

const props = withDefaults(defineProps<ToggleGroupProps>(), {
  variant: 'default',
  size: 'md',
  multiple: false,
})

const emits = defineEmits<ToggleGroupRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  toggleGroupVariants({
    variant: props.variant,
    size: props.size,
  })
)
</script>

<template>
  <ToggleGroup.Root v-bind="forwarded" :class="[styles.root(), props.class]">
    <ToggleGroup.Item
      v-for="option in props.options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
      :class="styles.item()"
    >
      <component :is="option.icon" v-if="option.icon" class="h-4 w-4" />
      {{ option.label }}
    </ToggleGroup.Item>
  </ToggleGroup.Root>
</template>
