<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { Fieldset } from '@ark-ui/vue/fieldset'
import { computed } from 'vue'
import { fieldsetVariants } from './fieldset.variants'
import type { FieldsetProps } from './fieldset.types'

/**
 * A Fieldset component that groups related form controls.
 * Uses Ark UI for accessibility and state management.
 *
 * @example
 * <Fieldset legend="Personal Information">
 *   <Field label="First Name">
 *     <Input />
 *   </Field>
 *   <Field label="Last Name">
 *     <Input />
 *   </Field>
 * </Fieldset>
 */

const props = defineProps<FieldsetProps>()

const styles = computed(() => fieldsetVariants())
</script>

<template>
  <Fieldset.Root v-bind="props" :class="[styles.root(), props.class]">
    <Fieldset.Legend v-if="props.legend" :class="styles.legend()">
      {{ props.legend }}
    </Fieldset.Legend>

    <slot />

    <Fieldset.HelperText v-if="props.helperText && !props.invalid" :class="styles.helperText()">
      {{ props.helperText }}
    </Fieldset.HelperText>

    <Fieldset.ErrorText v-if="props.errorText && props.invalid" :class="styles.errorText()">
      {{ props.errorText }}
    </Fieldset.ErrorText>
  </Fieldset.Root>
</template>
