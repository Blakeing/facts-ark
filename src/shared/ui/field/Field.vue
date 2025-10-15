<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Field as ArkField } from '@ark-ui/vue/field'
import { computed } from 'vue'
import { fieldVariants } from './field.variants'
import type { FieldProps } from './field.types'

/**
 * Field - Form field wrapper with label, helper text, and error messages
 *
 * Provides complete form field structure with accessibility built-in.
 * Uses Ark UI's Field component for proper ARIA attributes and IDs.
 *
 * @example
 * <Field label="Email" required helperText="We'll never share your email">
 *   <FieldInput v-model="email" type="email" />
 * </Field>
 *
 * @example
 * // With error
 * <Field label="Password" :invalid="hasError" errorText="Password is required">
 *   <FieldInput type="password" v-model="password" />
 * </Field>
 */

const props = withDefaults(defineProps<FieldProps>(), {
  required: false,
  invalid: false,
  disabled: false,
  readOnly: false,
})

const styles = computed(() =>
  fieldVariants({
    class: props.class,
  })
)
</script>

<template>
  <ArkField.Root
    :class="styles.base()"
    :invalid="props.invalid"
    :disabled="props.disabled"
    :required="props.required"
    :read-only="props.readOnly"
    :id="props.id"
  >
    <ArkField.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
      <span v-if="props.required" class="field-required">*</span>
    </ArkField.Label>

    <slot />

    <ArkField.HelperText v-if="props.helperText && !props.invalid" :class="styles.helperText()">
      {{ props.helperText }}
    </ArkField.HelperText>

    <ArkField.ErrorText v-if="props.errorText && props.invalid" :class="styles.errorText()">
      {{ props.errorText }}
    </ArkField.ErrorText>

    <slot v-if="!props.helperText && !props.invalid" name="helperText" />
    <slot v-if="!props.errorText && props.invalid" name="errorText" />
  </ArkField.Root>
</template>

