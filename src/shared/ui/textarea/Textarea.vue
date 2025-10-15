<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import { Field, FieldTextarea } from '../field'
import type { TextareaProps } from './textarea.types'

/**
 * Textarea - Form-integrated textarea with VeeValidate
 *
 * This is a unified form component that automatically integrates with VeeValidate.
 * Requires a `name` prop for form binding.
 *
 * @example
 * <Textarea
 *   name="description"
 *   label="Description"
 *   placeholder="Enter description"
 *   rows="4"
 * />
 *
 * @example
 * // With validation
 * <Textarea
 *   name="notes"
 *   label="Notes"
 *   required
 * />
 */

const props = withDefaults(defineProps<TextareaProps>(), {
  size: 'md',
  resize: 'vertical',
  rows: 3,
})

defineOptions({
  inheritAttrs: false,
})

// VeeValidate integration
const field = useField(() => props.name, {
  validateOnValueUpdate: false,
})

// Separate Field props from Textarea props
const fieldProps = computed(() => ({
  label: props.label,
  helperText: props.helperText,
  errorText: field.errorMessage.value || props.errorText,
  invalid: !field.meta.valid && field.meta.touched,
  required: !!props.required,
  disabled: !!props.disabled,
  id: props.id,
}))

const textareaProps = computed(() => ({
  size: props.size,
  variant: props.variant,
  resize: props.resize,
  rows: props.rows,
  placeholder: props.placeholder,
  disabled: props.disabled,
  readonly: props.readonly,
  required: props.required,
  class: props.class,
  name: props.name,
}))
</script>

<template>
  <Field v-bind="fieldProps">
    <FieldTextarea
      v-model="field.value.value"
      v-bind="{ ...textareaProps, ...$attrs }"
      @blur="field.handleBlur"
    />
  </Field>
</template>
