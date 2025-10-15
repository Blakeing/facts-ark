<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { SegmentGroup } from '@ark-ui/vue/segment-group'
import { computed } from 'vue'
import { cn } from '@/shared/lib/utils'
import { segmentGroupVariants } from './segment-group.variants'
import type { SegmentGroupProps, SegmentGroupRootEmits } from './segment-group.types'

/**
 * A closed SegmentGroup component for single selection among options.
 *
 * Features:
 * - Animated indicator
 * - Single selection
 * - Keyboard navigation
 * - Accessible
 *
 * @example
 * <SegmentGroup
 *   :options="[
 *     { value: 'react', label: 'React' },
 *     { value: 'vue', label: 'Vue' }
 *   ]"
 * />
 */

const props = withDefaults(defineProps<SegmentGroupProps>(), {
  variant: 'default',
  size: 'md',
})

const emits = defineEmits<SegmentGroupRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  segmentGroupVariants({
    variant: props.variant,
    size: props.size,
  })
)
</script>

<template>
  <SegmentGroup.Root v-bind="forwarded" :class="cn(styles.root(), props.class)">
    <SegmentGroup.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </SegmentGroup.Label>

    <div :class="styles.itemsWrapper()">
      <SegmentGroup.Indicator :class="styles.indicator()" />
      <SegmentGroup.Item
        v-for="option in props.options"
        :key="option.value"
        :value="option.value"
        :disabled="option.disabled"
        :class="styles.item()"
      >
        <SegmentGroup.ItemText>{{ option.label }}</SegmentGroup.ItemText>
        <SegmentGroup.ItemControl />
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    </div>
  </SegmentGroup.Root>
</template>
