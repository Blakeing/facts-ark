<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { PinInput } from '@ark-ui/vue/pin-input'
import { computed } from 'vue'
import { useOmitProps } from '@/lib/useOmitProps'
import { pinInputVariants } from './pin-input.variants'
import type { PinInputProps, PinInputRootEmits } from './pin-input.types'

/**
 * A Pin Input component for entering verification codes, OTPs, etc.
 *
 * Features:
 * - Multiple sizes
 * - OTP mode for security
 * - Numeric, alphanumeric, or alphabetic input
 * - Optional masking
 * - Auto-focus and auto-advance
 * - Paste support
 * - Fully accessible
 *
 * @example
 * <PinInput label="Enter verification code" :length="6" />
 *
 * @example
 * // Masked OTP input
 * <PinInput
 *   label="Enter OTP"
 *   :length="6"
 *   :otp="true"
 *   :mask="true"
 * />
 */

const props = withDefaults(defineProps<PinInputProps>(), {
  size: 'md',
  length: 6,
  otp: true,
  type: 'numeric',
  mask: false,
})

const emits = defineEmits<PinInputRootEmits>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  ['size', 'label', 'length', 'helperText', 'error', 'class'] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() =>
  pinInputVariants({
    size: props.size,
  })
)

// Create array of indices for the input fields
const indices = computed(() => Array.from({ length: props.length }, (_, i) => i))

// Determine if the input is invalid
const isInvalid = computed(() => !!props.error || props.invalid)
</script>

<template>
  <PinInput.Root
    v-bind="forwarded"
    :invalid="isInvalid"
    :class="[styles.root(), props.class]"
  >
    <!-- Label -->
    <PinInput.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </PinInput.Label>

    <!-- Pin input controls -->
    <PinInput.Control :class="styles.control()">
      <PinInput.Input
        v-for="index in indices"
        :key="index"
        :index="index"
        :class="styles.input()"
      />
    </PinInput.Control>

    <!-- Hidden input for form submission -->
    <PinInput.HiddenInput />

    <!-- Helper text or error message -->
    <p
      v-if="props.helperText || props.error"
      :class="[
        'text-xs',
        props.error ? 'text-destructive' : 'text-muted-foreground',
      ]"
    >
      {{ props.error || props.helperText }}
    </p>
  </PinInput.Root>
</template>

