<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Clipboard } from '@ark-ui/vue/clipboard'
import { Check, Copy } from 'lucide-vue-next'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { clipboardVariants } from './clipboard.variants'
import type { ClipboardProps, ClipboardRootEmits } from './clipboard.types'

/**
 * A closed Clipboard component for copying text to the clipboard.
 *
 * Supports multiple variants:
 * - default: Full-width with label and input
 * - inline: Compact inline form
 * - button: Simple copy button (input hidden)
 *
 * Features:
 * - Copy to clipboard
 * - Visual feedback on copy
 * - Customizable timeout
 * - Optional label and input display
 *
 * @example
 * // Simple usage
 * <Clipboard
 *   variant="default"
 *   label="Share this link"
 *   default-value="https://example.com"
 * />
 *
 * @example
 * // Button only
 * <Clipboard
 *   variant="button"
 *   default-value="Copy me!"
 * />
 */

const props = withDefaults(defineProps<ClipboardProps>(), {
  variant: 'default',
  showInput: true,
  timeout: 3000,
})

const emits = defineEmits<ClipboardRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  clipboardVariants({
    variant: props.variant,
  })
)
</script>

<template>
  <Clipboard.Root v-bind="forwarded" :class="cn(styles.root(), props.class)">
    <Clipboard.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </Clipboard.Label>
    <Clipboard.Control :class="styles.control()">
      <Clipboard.Input
        v-if="props.showInput"
        :placeholder="props.placeholder"
        :class="styles.input()"
      />
      <Clipboard.Trigger :class="styles.trigger()">
        <Clipboard.Indicator :class="styles.indicator()">
          <Copy class="h-4 w-4" />
          <template #copied>
            <Check class="h-4 w-4" />
          </template>
        </Clipboard.Indicator>
        <span class="ml-1">
          <Clipboard.Indicator>
            Copy
            <template #copied>Copied!</template>
          </Clipboard.Indicator>
        </span>
      </Clipboard.Trigger>
    </Clipboard.Control>
  </Clipboard.Root>
</template>
