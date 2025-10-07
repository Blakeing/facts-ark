<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { NumberInput } from '@ark-ui/vue/number-input'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { numberInputVariants } from './number-input.variants'
import type { NumberInputProps, NumberInputRootEmits } from './number-input.types'

const props = withDefaults(defineProps<NumberInputProps>(), {
  variant: 'default',
  size: 'md',
  min: 0,
  max: 100,
  step: 1,
})

const emits = defineEmits<NumberInputRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  numberInputVariants({
    variant: props.variant,
    size: props.size,
  })
)
</script>

<template>
  <NumberInput.Root v-bind="forwarded" :class="cn(styles.root(), props.class)">
    <NumberInput.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </NumberInput.Label>

    <NumberInput.Control :class="styles.control()">
      <NumberInput.Input :class="styles.input()" />
      <NumberInput.IncrementTrigger :class="styles.incrementTrigger()">
        <ChevronUp class="h-3 w-3" />
      </NumberInput.IncrementTrigger>
      <NumberInput.DecrementTrigger :class="styles.decrementTrigger()">
        <ChevronDown class="h-3 w-3" />
      </NumberInput.DecrementTrigger>
    </NumberInput.Control>
  </NumberInput.Root>
</template>
