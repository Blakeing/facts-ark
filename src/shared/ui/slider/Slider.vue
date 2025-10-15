<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Slider } from '@ark-ui/vue/slider'
import { computed } from 'vue'
import { cn } from '@/shared/lib/utils'
import { sliderVariants } from './slider.variants'
import type { SliderProps, SliderRootEmits } from './slider.types'

/**
 * A closed Slider component for selecting values from a range.
 *
 * Supports multiple variants:
 * - default: Standard indigo slider
 * - success: Green slider
 * - warning: Yellow slider
 * - danger: Red slider
 *
 * Features:
 * - Multiple sizes (sm, md, lg)
 * - Single or multiple thumbs
 * - Optional label and value display
 * - Keyboard support
 * - Min/max/step configuration
 * - Accessible
 *
 * @example
 * // Simple usage
 * <Slider
 *   variant="default"
 *   :min="0"
 *   :max="100"
 *   :default-value="[50]"
 * />
 *
 * @example
 * // With label and value
 * <Slider
 *   variant="default"
 *   label="Volume"
 *   :show-value="true"
 *   :min="0"
 *   :max="100"
 *   :default-value="[75]"
 * />
 */

const props = withDefaults(defineProps<SliderProps>(), {
  variant: 'default',
  size: 'md',
  showValue: false,
  min: 0,
  max: 100,
  step: 1,
})

const emits = defineEmits<SliderRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  sliderVariants({
    variant: props.variant,
    size: props.size,
  })
)

// Calculate the number of thumbs based on modelValue or defaultValue
const thumbCount = computed(() => {
  const values = props.modelValue || props.defaultValue || [0]
  return values.length
})
</script>

<template>
  <Slider.Root v-bind="forwarded" :class="cn(styles.root(), props.class)">
    <div v-if="props.label || props.showValue" :class="styles.label()">
      <Slider.Label v-if="props.label" :class="styles.labelText()">
        {{ props.label }}
      </Slider.Label>
      <Slider.ValueText v-if="props.showValue" :class="styles.valueText()" />
    </div>
    <Slider.Control :class="styles.control()">
      <Slider.Track :class="styles.track()">
        <Slider.Range :class="styles.range()" />
      </Slider.Track>
      <Slider.Thumb
        v-for="index in thumbCount"
        :key="index"
        :index="index - 1"
        :class="styles.thumb()"
      >
        <Slider.HiddenInput />
      </Slider.Thumb>
    </Slider.Control>
  </Slider.Root>
</template>
