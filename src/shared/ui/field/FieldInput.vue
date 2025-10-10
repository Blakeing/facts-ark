<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { inputVariants } from '../input/input.variants'
import type { FieldInputProps } from './field.types'

/**
 * FieldInput - A specialized input that integrates with Field context
 *
 * This component combines:
 * - Ark UI Field's accessibility and context
 * - Our custom Input styling
 *
 * Best practice: Use this inside a Field component for automatic
 * accessibility, validation state, and ID management.
 *
 * @example
 * <Field label="Email" invalid errorText="Invalid email">
 *   <FieldInput type="email" placeholder="you@example.com" />
 * </Field>
 */

const props = withDefaults(defineProps<FieldInputProps>(), {
  type: 'text',
  size: 'md',
})
</script>

<template>
  <Field.Context v-slot="field">
    <Field.Input
      :type="props.type"
      :class="inputVariants({
        size: props.size,
        variant: props.variant || (field.invalid ? 'error' : 'default'),
        class: props.class,
      })"
      :disabled="props.disabled"
      :readonly="props.readonly"
      :required="props.required"
      :placeholder="props.placeholder"
      v-bind="$attrs"
    />
  </Field.Context>
</template>
–