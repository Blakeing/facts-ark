<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Editable } from '@ark-ui/vue/editable'
import { computed } from 'vue'
import { useOmitProps } from '@/lib/useOmitProps'
import { editableVariants } from './editable.variants'
import type { EditableProps, EditableRootEmits } from './editable.types'

/**
 * An Editable component for inline text editing.
 *
 * Features:
 * - Click to edit inline
 * - Double-click to activate
 * - Auto-save on blur
 * - Cancel/Save controls
 * - Keyboard shortcuts (Enter to save, Esc to cancel)
 * - Fully accessible
 *
 * @example
 * <Editable
 *   label="Task name"
 *   v-model="taskName"
 *   placeholder="Enter task name..."
 * />
 *
 * @example
 * // Without controls (auto-save on blur)
 * <Editable
 *   v-model="title"
 *   :show-controls="false"
 * />
 */

const props = withDefaults(defineProps<EditableProps>(), {
  showControls: true,
  editText: 'Edit',
  saveText: 'Save',
  cancelText: 'Cancel',
  placeholder: 'Enter text...',
})

const emits = defineEmits<EditableRootEmits>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  ['label', 'showControls', 'editText', 'saveText', 'cancelText', 'class'] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() => editableVariants())
</script>

<template>
  <Editable.Root v-bind="forwarded" :class="[styles.root(), props.class]">
    <!-- Label -->
    <Editable.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </Editable.Label>

    <!-- Editable area -->
    <Editable.Area :class="styles.area()">
      <Editable.Input :class="styles.input()" />
      <Editable.Preview :class="styles.preview()" />
    </Editable.Area>

    <!-- Controls -->
    <Editable.Context v-if="props.showControls" v-slot="{ editing }">
      <!-- Edit mode controls -->
      <Editable.Control v-if="editing" :class="styles.control()">
        <Editable.SubmitTrigger :class="styles.submitTrigger()">
          {{ props.saveText }}
        </Editable.SubmitTrigger>
        <Editable.CancelTrigger :class="styles.cancelTrigger()">
          {{ props.cancelText }}
        </Editable.CancelTrigger>
      </Editable.Control>

      <!-- Preview mode controls -->
      <Editable.Control v-else :class="styles.control()">
        <Editable.EditTrigger :class="styles.editTrigger()">
          {{ props.editText }}
        </Editable.EditTrigger>
      </Editable.Control>
    </Editable.Context>
  </Editable.Root>
</template>

