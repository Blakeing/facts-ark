<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'
import { Field } from '../field'
import { Select } from '../select'
import type { SelectFieldProps } from './select-field.types'

/**
 * SelectField - Form-integrated select with VeeValidate
 *
 * This is a unified form component that automatically integrates with VeeValidate.
 * Requires a `name` prop for form binding.
 *
 * @example
 * <SelectField
 *   name="category"
 *   label="Category"
 *   :items="[
 *     { value: 'work', label: 'Work' },
 *     { value: 'personal', label: 'Personal' }
 *   ]"
 * />
 *
 * @example
 * // With validation
 * <SelectField
 *   name="priority"
 *   label="Priority"
 *   :items="items"
 *   required
 * />
 */

const props = withDefaults(defineProps<SelectFieldProps>(), {
  size: 'md',
  placeholder: 'Select an option',
  indicatorPosition: 'right',
})

defineOptions({
  inheritAttrs: false,
})

// VeeValidate integration
const field = useField(() => props.name, {
  validateOnValueUpdate: false,
})

// Separate Field props from Select props
const fieldProps = computed(() => ({
  label: props.label,
  helperText: props.helperText,
  errorText: field.errorMessage.value || props.errorText,
  invalid: !field.meta.valid && field.meta.touched,
  required: !!props.required,
  disabled: !!props.disabled,
  id: props.id,
}))

const selectProps = computed(() => ({
  items: props.items,
  placeholder: props.placeholder,
  size: props.size,
  indicatorPosition: props.indicatorPosition,
  disabled: props.disabled,
  class: props.class,
  name: props.name,
}))

// Handle value change from Select component
const handleValueChange = (details: { value: string[] }) => {
  field.value.value = details.value[0] || ''
}
</script>

<template>
  <Field v-bind="fieldProps">
    <Select
      :model-value="field.value.value ? [String(field.value.value)] : undefined"
      @value-change="handleValueChange"
      v-bind="{ ...selectProps, ...$attrs }"
    />
  </Field>
</template>
