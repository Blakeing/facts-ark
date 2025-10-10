<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Checkbox } from '@ark-ui/vue/checkbox'
import { Check } from 'lucide-vue-next'
import { computed } from 'vue'
import { cn } from '@/shared/lib/utils'
import { checkboxVariants } from './checkbox.variants'
import type { CheckboxProps, CheckboxRootEmits } from './checkbox.types'

/**
 * A closed Checkbox component for boolean selections.
 *
 * @example
 * <Checkbox label="Accept terms" />
 * <Checkbox label="Subscribe" size="lg" />
 * <Checkbox label="Disabled" disabled />
 */

const props = defineProps<CheckboxProps>()
const emits = defineEmits<CheckboxRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  checkboxVariants({
    size: props.size,
  })
)

const iconSizes = { sm: 12, md: 16, lg: 20 } as const
</script>

<template>
  <Checkbox.Root v-bind="forwarded" :class="cn(styles.root(), props.class)">
    <Checkbox.Control :class="styles.control()">
      <Checkbox.Indicator>
        <Check :size="iconSizes[props.size ?? 'md']" class="text-white" />
      </Checkbox.Indicator>
    </Checkbox.Control>
    <Checkbox.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </Checkbox.Label>
    <Checkbox.HiddenInput />
  </Checkbox.Root>
</template>
