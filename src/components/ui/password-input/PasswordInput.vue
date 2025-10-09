<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { PasswordInput } from '@ark-ui/vue/password-input'
import { Eye, EyeOff } from 'lucide-vue-next'
import { computed } from 'vue'
import { useOmitProps } from '@/lib/useOmitProps'
import { passwordInputVariants } from './password-input.variants'
import type { PasswordInputProps } from './password-input.types'

/**
 * A Password Input component with show/hide toggle.
 *
 * Features:
 * - Show/hide password visibility
 * - Multiple sizes
 * - Label and helper text
 * - Error states
 * - Fully accessible
 *
 * @example
 * <PasswordInput
 *   label="Password"
 *   placeholder="Enter your password"
 *   v-model="password"
 * />
 *
 * @example
 * // With validation error
 * <PasswordInput
 *   label="Password"
 *   :error="passwordError"
 *   v-model="password"
 * />
 */

const props = withDefaults(defineProps<PasswordInputProps>(), {
  size: 'md',
  placeholder: 'Enter password',
})

const emits = defineEmits<{
  /**
   * Emitted when the v-model value changes
   */
  'update:modelValue': [value: string]
}>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  ['size', 'label', 'placeholder', 'helperText', 'error', 'class'] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() =>
  passwordInputVariants({
    size: props.size,
  })
)
</script>

<template>
  <PasswordInput.Root v-bind="forwarded" :class="styles.root()">
    <!-- Label -->
    <PasswordInput.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </PasswordInput.Label>

    <!-- Input with visibility toggle -->
    <PasswordInput.Control :class="styles.control()">
      <PasswordInput.Input
        :placeholder="props.placeholder"
        :class="[styles.input(), props.class]"
      />

      <PasswordInput.VisibilityTrigger :class="styles.visibilityTrigger()">
        <PasswordInput.Indicator :class="styles.indicator()">
          <Eye aria-label="Show password" />
          <template #fallback>
            <EyeOff aria-label="Hide password" />
          </template>
        </PasswordInput.Indicator>
      </PasswordInput.VisibilityTrigger>
    </PasswordInput.Control>

    <!-- Helper text or error message -->
    <p
      v-if="props.helperText || props.error"
      :class="[
        'text-xs mt-2',
        props.error ? 'text-destructive' : 'text-muted-foreground',
      ]"
    >
      {{ props.error || props.helperText }}
    </p>
  </PasswordInput.Root>
</template>

