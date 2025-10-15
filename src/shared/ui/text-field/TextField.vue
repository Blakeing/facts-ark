<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import { Field, FieldInput } from '../field'
import type { TextFieldProps } from './text-field.types'

/**
 * TextField - Form-integrated text input with VeeValidate
 *
 * This is a unified form component that automatically integrates with VeeValidate.
 * Requires a `name` prop for form binding.
 *
 * @example
 * <TextField
 *   name="email"
 *   label="Email"
 *   placeholder="Enter your email"
 *   helperText="We'll never share your email"
 * />
 *
 * @example
 * // With validation
 * <TextField
 *   name="password"
 *   label="Password"
 *   type="password"
 *   required
 * />
 */

const props = withDefaults(defineProps<TextFieldProps>(), {
  type: 'text',
  size: 'md',
})

defineOptions({
  inheritAttrs: false,
})

// VeeValidate integration
const field = useField(() => props.name, {
  validateOnValueUpdate: false,
})

// Separate Field props from Input props
const fieldProps = computed(() => ({
  label: props.label,
  helperText: props.helperText,
  errorText: field.errorMessage.value || props.errorText,
  invalid: !field.meta.valid && field.meta.touched,
  required: !!props.required,
  disabled: !!props.disabled,
  id: props.id,
}))

const inputProps = computed(() => ({
  type: props.type,
  size: props.size,
  variant: props.variant,
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
    <FieldInput
      v-model="field.value.value"
      v-bind="{ ...inputProps, ...$attrs }"
      @blur="field.handleBlur"
    />
  </Field>
</template>
