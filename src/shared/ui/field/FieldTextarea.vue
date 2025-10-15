<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { textareaVariants } from '../textarea/textarea.variants'
import type { FieldTextareaProps } from './field.types'

/**
 * FieldTextarea - A specialized textarea that integrates with Field context
 *
 * This component combines:
 * - Ark UI Field's accessibility and context
 * - Our custom Textarea styling
 *
 * Best practice: Use this inside a Field component for automatic
 * accessibility, validation state, and ID management.
 *
 * @example
 * <Field label="Description" invalid errorText="Description is required">
 *   <FieldTextarea rows="4" placeholder="Enter description..." />
 * </Field>
 */

const props = withDefaults(defineProps<FieldTextareaProps>(), {
  size: 'md',
  resize: 'vertical',
  rows: 3,
})
</script>

<template>
  <Field.Context v-slot="field">
    <Field.Textarea
      :class="textareaVariants({
        size: props.size,
        variant: props.variant || (field.invalid ? 'error' : 'default'),
        resize: props.resize,
        class: props.class,
      })"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :placeholder="props.placeholder"
      :rows="props.rows"
      v-bind="$attrs"
    />
  </Field.Context>
</template>

