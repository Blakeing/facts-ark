<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Dialog } from '@ark-ui/vue/dialog'
import { X } from 'lucide-vue-next'
import { computed } from 'vue'
import { dialogVariants } from './dialog.variants'
import type { DialogProps, DialogRootEmits } from './dialog.types'

/**
 * A closed Dialog component for modal dialogs.
 *
 * Supports multiple variants:
 * - default: Standard modal dialog
 * - centered: Centered content layout
 * - fullscreen: Full-screen modal
 *
 * Features:
 * - Modal backdrop
 * - Focus trap
 * - Escape key to close
 * - Click outside to close
 * - Custom trigger button
 * - Customizable content via slots
 *
 * @example
 * // Simple usage
 * <Dialog
 *   variant="default"
 *   trigger="Open Dialog"
 *   title="Dialog Title"
 *   description="This is a dialog description"
 * >
 *   <template #content>
 *     <p>Dialog content goes here</p>
 *   </template>
 * </Dialog>
 *
 * @example
 * // Centered dialog
 * <Dialog
 *   variant="centered"
 *   trigger="Confirm Action"
 *   title="Are you sure?"
 *   description="This action cannot be undone"
 * />
 */

const props = withDefaults(defineProps<DialogProps>(), {
  variant: 'default',
  showClose: true,
  modal: true,
  closeOnEscape: true,
  closeOnInteractOutside: true,
})

const emits = defineEmits<DialogRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  dialogVariants({
    variant: props.variant,
  })
)
</script>

<template>
  <Dialog.Root v-bind="forwarded">
    <Dialog.Trigger v-if="props.trigger" :class="[styles.trigger(), props.class]">
      <slot name="trigger">
        {{ props.trigger }}
      </slot>
    </Dialog.Trigger>

    <Teleport to="body">
      <Dialog.Backdrop :class="styles.backdrop()" />
      <Dialog.Positioner :class="styles.positioner()">
        <Dialog.Content :class="styles.content()">
          <Dialog.Title v-if="props.title" :class="styles.title()">
            {{ props.title }}
          </Dialog.Title>

          <Dialog.Description v-if="props.description" :class="styles.description()">
            {{ props.description }}
          </Dialog.Description>

          <!-- Custom content slot -->
          <div v-if="$slots.content" class="mt-4">
            <slot name="content" />
          </div>

          <!-- Close button -->
          <Dialog.CloseTrigger v-if="props.showClose" :class="styles.closeTrigger()">
            <X class="h-4 w-4" />
            <span class="sr-only">Close</span>
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Teleport>
  </Dialog.Root>
</template>
