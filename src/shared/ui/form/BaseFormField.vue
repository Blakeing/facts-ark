<script setup lang="ts">
import { computed, reactive, watchEffect } from 'vue'
import { useFormContext, useField } from 'vee-validate'
import type { FieldMeta, FieldOptions } from 'vee-validate'
import { Field, FieldInput } from '@/shared/ui/field'

interface BaseFormFieldProps {
  name: string
  label?: string
  description?: string
  required?: boolean
  options?: Partial<FieldOptions<string>>
}

const props = defineProps<BaseFormFieldProps>()

const form = useFormContext()

if (!form) {
  throw new Error('BaseFormField must be used inside a vee-validate form context')
}

const { value, meta, errorMessage, handleBlur, handleChange } = useField<string>(
  props.name,
  undefined,
  props.options,
)

const fieldValue = computed(() => value.value ?? '')

const currentMeta = meta

const fieldBinding = reactive({
  name: props.name,
  value: fieldValue.value,
  modelValue: fieldValue.value,
  onInput: handleChange,
  onChange: handleChange,
  'onUpdate:modelValue': handleChange,
  onBlur: handleBlur,
})

watchEffect(() => {
  fieldBinding.value = fieldValue.value
  fieldBinding.modelValue = fieldValue.value
})

const currentError = computed(() => errorMessage.value ?? undefined)
const isInvalid = computed(() => currentMeta.touched && !!currentError.value)

defineSlots<{
  default: (slotProps: {
    field: typeof fieldBinding
    meta: FieldMeta<string>
    errorMessage: string | undefined
    value: string
  }) => unknown
  label?: (slotProps: { label?: string; required?: boolean }) => unknown
  description?: (slotProps: {
    description?: string
    meta: FieldMeta<string>
    field: typeof fieldBinding
    value: string
    errorMessage: string | undefined
  }) => unknown
  error?: (slotProps: { errorMessage?: string; meta: FieldMeta<string> }) => unknown
}>()
</script>

<template>
  <Field :label="label" :invalid="isInvalid" :required="required" class="flex flex-col gap-2">
    <slot
      :field="fieldBinding"
      :meta="currentMeta"
      :error-message="currentError"
      :value="fieldValue"
    >
      <FieldInput v-bind="fieldBinding" />
    </slot>

    <template v-if="(description || $slots.description) && !currentError" #helperText>
      <slot
        name="description"
        :description="description"
        :meta="currentMeta"
        :field="fieldBinding"
        :value="fieldValue"
        :error-message="currentError"
      >
        {{ description }}
      </slot>
    </template>

    <template v-if="(currentError || $slots.error) && currentMeta.touched" #errorText>
      <slot name="error" :error-message="currentError" :meta="currentMeta">
        {{ currentError }}
      </slot>
    </template>
  </Field>
</template>

