<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { computed, useSlots } from 'vue'
import { cn } from '@/shared/lib/utils'
import { fieldVariants } from './field.variants'
import type { FieldProps } from './field.types'

/**
 * A Field component that wraps form inputs with label, helper text, and error messages.
 * Uses Ark UI for accessibility and state management.
 * Supports both props and slots for helper/error text.
 *
 * @example
 * <Field label="Email" required>
 *   <Input type="email" />
 * </Field>
 *
 * @example
 * <Field label="Username" helperText="Choose a unique username" invalid errorText="Username is taken">
 *   <Input />
 * </Field>
 *
 * @example
 * <Field label="Password" :invalid="hasError">
 *   <Input type="password" />
 *   <template #helperText>Must be at least 8 characters</template>
 *   <template #errorText>Password is required</template>
 * </Field>
 */

const props = defineProps<FieldProps>()
const slots = useSlots()

const styles = computed(() => fieldVariants())
</script>

<template>
  <Field.Root v-bind="props" :class="cn(styles.root(), props.class)">
    <Field.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
      <Field.RequiredIndicator v-if="props.required" :class="styles.requiredIndicator()">
        *
      </Field.RequiredIndicator>
    </Field.Label>

    <slot />

    <!-- Helper Text: Use slot if provided, otherwise use prop -->
    <Field.HelperText v-if="(slots.helperText || props.helperText) && !props.invalid" :class="styles.helperText()">
      <slot name="helperText">{{ props.helperText }}</slot>
    </Field.HelperText>

    <!-- Error Text: Use slot if provided, otherwise use prop -->
    <Field.ErrorText v-if="(slots.errorText || props.errorText) && props.invalid" :class="styles.errorText()">
      <slot name="errorText">{{ props.errorText }}</slot>
    </Field.ErrorText>
  </Field.Root>
</template>
