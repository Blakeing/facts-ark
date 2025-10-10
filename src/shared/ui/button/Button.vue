<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'
import { Loader2 } from 'lucide-vue-next'
import { buttonVariants } from './button.variants'
import type { ButtonProps } from './button.types'

/**
 * A closed Button component with variants, sizes, and loading states.
 *
 * @example
 * <Button>Click me</Button>
 * <Button variant="outline" size="lg">Large</Button>
 * <Button :loading="isLoading" :disabled="isLoading">Submit</Button>
 */

const props = withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  loading: false,
  disabled: false,
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClass = computed(() =>
  buttonVariants({
    variant: props.variant,
    size: props.size,
    fullWidth: props.fullWidth,
    class: props.class,
  })
)

const isDisabled = computed(() => props.disabled || props.loading)

const handleClick = (event: MouseEvent) => {
  if (!isDisabled.value) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :class="buttonClass"
    :disabled="isDisabled"
    @click="handleClick"
  >
    <Loader2
      v-if="loading"
      class="size-4 animate-spin"
      aria-hidden="true"
    />
    <slot />
  </button>
</template>

