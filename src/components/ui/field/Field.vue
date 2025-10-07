<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Field } from '@ark-ui/vue/field'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { fieldVariants } from './field.variants'
import type { FieldProps } from './field.types'

/**
 * A Field component that wraps form inputs with label, helper text, and error messages.
 * Uses Ark UI for accessibility and state management.
 *
 * @example
 * <Field label="Email" required>
 *   <Field.Input type="email" />
 * </Field>
 *
 * @example
 * <Field label="Username" helperText="Choose a unique username" invalid errorText="Username is taken">
 *   <Field.Input />
 * </Field>
 */

const props = defineProps<FieldProps>()

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

    <Field.HelperText v-if="props.helperText && !props.invalid" :class="styles.helperText()">
      {{ props.helperText }}
    </Field.HelperText>

    <Field.ErrorText v-if="props.errorText && props.invalid" :class="styles.errorText()">
      {{ props.errorText }}
    </Field.ErrorText>
  </Field.Root>
</template>
