<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Progress } from '@ark-ui/vue/progress'
import { computed } from 'vue'
import { progressVariants } from './progress.variants'
import type { ProgressProps, ProgressRootEmits } from './progress.types'

/**
 * A closed Progress component for displaying progress indicators.
 *
 * Supports multiple variants:
 * - default: Standard indigo progress bar
 * - success: Green progress bar
 * - warning: Yellow progress bar
 * - danger: Red progress bar
 *
 * Features:
 * - Multiple sizes (sm, md, lg)
 * - Optional label
 * - Optional value display
 * - Smooth animations
 * - Accessible
 *
 * @example
 * // Simple usage
 * <Progress
 *   variant="default"
 *   :model-value="50"
 * />
 *
 * @example
 * // With label and value
 * <Progress
 *   variant="success"
 *   label="Upload progress"
 *   :show-value="true"
 *   :model-value="75"
 * />
 */

const props = withDefaults(defineProps<ProgressProps>(), {
  variant: 'default',
  size: 'md',
  showValue: false,
  min: 0,
  max: 100,
})

const emits = defineEmits<ProgressRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  progressVariants({
    variant: props.variant,
    size: props.size,
  })
)
</script>

<template>
  <Progress.Root v-bind="forwarded" :class="[styles.root(), props.class]">
    <div v-if="props.label || props.showValue" :class="styles.label()">
      <Progress.Label v-if="props.label" :class="styles.labelText()">
        {{ props.label }}
      </Progress.Label>
      <Progress.ValueText v-if="props.showValue" :class="styles.valueText()" />
    </div>
    <Progress.Track :class="styles.track()">
      <Progress.Range :class="styles.range()" />
    </Progress.Track>
  </Progress.Root>
</template>
