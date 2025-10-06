<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'
import { inputVariants } from './input.variants'
import type { InputProps } from './input.types'

/**
 * A simple input component with minimal styling.
 *
 * @example
 * <Input v-model="value" placeholder="Enter text" />
 * <Input type="email" required />
 * <Input size="lg" invalid />
 */

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  size: 'md',
  invalid: false,
})

const inputClass = computed(() =>
  inputVariants({
    size: props.size,
    invalid: props.invalid,
    class: props.class,
  })
)
</script>

<template>
  <input
    :type="props.type"
    :class="inputClass"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :required="props.required"
    :placeholder="props.placeholder"
    v-bind="$attrs"
  />
</template>
