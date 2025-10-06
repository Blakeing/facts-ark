<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'
import { textareaVariants } from './textarea.variants'
import type { TextareaProps } from './textarea.types'

/**
 * A simple textarea component with minimal styling.
 *
 * @example
 * <Textarea v-model="value" placeholder="Enter text" />
 * <Textarea rows="5" resize="none" />
 * <Textarea size="lg" invalid />
 */

const props = withDefaults(defineProps<TextareaProps>(), {
  size: 'md',
  invalid: false,
  resize: 'vertical',
  rows: 3,
})

const textareaClass = computed(() =>
  textareaVariants({
    size: props.size,
    invalid: props.invalid,
    resize: props.resize,
    class: props.class,
  })
)
</script>

<template>
  <textarea
    :class="textareaClass"
    :disabled="props.disabled"
    :readonly="props.readonly"
    :required="props.required"
    :placeholder="props.placeholder"
    :rows="props.rows"
    v-bind="$attrs"
  />
</template>
