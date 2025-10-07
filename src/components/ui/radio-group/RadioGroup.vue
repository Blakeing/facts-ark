<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { RadioGroup } from '@ark-ui/vue/radio-group'
import { computed } from 'vue'
import { radioGroupVariants } from './radio-group.variants'
import type { RadioGroupProps, RadioGroupRootEmits } from './radio-group.types'

/**
 * A closed RadioGroup component for selecting a single option.
 *
 * Supports multiple variants:
 * - default: Standard radio list
 * - cards: Card-style radio options
 *
 * Features:
 * - Single selection
 * - Disabled options
 * - Optional descriptions
 * - Keyboard navigation
 * - Form integration
 *
 * @example
 * // Simple usage
 * <RadioGroup
 *   variant="default"
 *   label="Choose an option"
 *   :options="[
 *     { value: 'option1', label: 'Option 1' },
 *     { value: 'option2', label: 'Option 2' }
 *   ]"
 * />
 *
 * @example
 * // Card variant with descriptions
 * <RadioGroup
 *   variant="cards"
 *   label="Select plan"
 *   :options="[
 *     { value: 'basic', label: 'Basic', description: '$9/month' },
 *     { value: 'pro', label: 'Pro', description: '$29/month' }
 *   ]"
 * />
 */

const props = withDefaults(defineProps<RadioGroupProps>(), {
  variant: 'default',
})

const emits = defineEmits<RadioGroupRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  radioGroupVariants({
    variant: props.variant,
  })
)
</script>

<template>
  <RadioGroup.Root v-bind="forwarded" :class="[styles.root(), props.class]">
    <RadioGroup.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </RadioGroup.Label>

    <RadioGroup.Indicator :class="styles.indicator()" />

    <RadioGroup.Item
      v-for="option in props.options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
      :class="styles.item()"
    >
      <RadioGroup.ItemControl :class="styles.itemControl()" />
      <div>
        <RadioGroup.ItemText :class="styles.itemText()">
          {{ option.label }}
        </RadioGroup.ItemText>
        <p v-if="option.description" :class="styles.itemDescription()">
          {{ option.description }}
        </p>
      </div>
      <RadioGroup.ItemHiddenInput />
    </RadioGroup.Item>
  </RadioGroup.Root>
</template>
