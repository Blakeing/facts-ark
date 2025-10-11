<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts" generic="T extends ComboboxItem">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Combobox, useListCollection } from '@ark-ui/vue/combobox'
import { useFilter } from '@ark-ui/vue/locale'
import { ChevronDown, X, Check } from 'lucide-vue-next'
import { computed } from 'vue'
import { useOmitProps } from '@/shared/lib/useOmitProps'
import { comboboxVariants } from './combobox.variants'
import type { ComboboxProps, ComboboxRootEmits, ComboboxItem } from './combobox.types'

/**
 * A Combobox component with search and autocomplete.
 *
 * Features:
 * - Search/filter items
 * - Keyboard navigation
 * - Single or multiple selection
 * - Custom item rendering
 * - Fully accessible
 *
 * @example
 * <Combobox
 *   label="Select framework"
 *   :items="frameworks"
 *   placeholder="Search frameworks..."
 * />
 *
 * @example
 * // Multiple selection
 * <Combobox
 *   label="Select frameworks"
 *   :items="frameworks"
 *   :multiple="true"
 * />
 */

const props = withDefaults(defineProps<ComboboxProps<T>>(), {
  size: 'md',
  placeholder: 'Search...',
  itemToString: (item: T) => (item as ComboboxItem).label,
  itemToValue: (item: T) => (item as ComboboxItem).value,
})

const emits = defineEmits<ComboboxRootEmits<string>>()

// Setup filter
const filters = useFilter({ sensitivity: 'base' })

// Setup collection
const { collection, filter } = useListCollection({
  initialItems: props.items,
  filter: filters.value.contains,
  itemToString: props.itemToString,
  itemToValue: props.itemToValue,
})

// Handle input changes for filtering
const handleInputChange = (details: Combobox.InputValueChangeDetails) => {
  filter(details.inputValue)
}

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  [
    'size',
    'label',
    'placeholder',
    'items',
    'itemToString',
    'itemToValue',
    'helperText',
    'error',
    'class',
  ] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() =>
  comboboxVariants({
    size: props.size,
  })
)

// Determine if the input is invalid
const isInvalid = computed(() => !!props.error || props.invalid)
</script>

<template>
  <Combobox.Root
    v-bind="forwarded"
    :collection="collection"
    :invalid="isInvalid"
    :class="[styles.root(), props.class]"
    @input-value-change="handleInputChange"
  >
    <!-- Label -->
    <Combobox.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </Combobox.Label>

    <!-- Control with input, trigger, and clear -->
    <Combobox.Control :class="styles.control()">
      <Combobox.Input :placeholder="props.placeholder" :class="styles.input()" />

      <Combobox.Trigger :class="styles.trigger()">
        <ChevronDown class="size-4" />
      </Combobox.Trigger>

      <Combobox.ClearTrigger :class="styles.clearTrigger()">
        <X class="size-4" />
      </Combobox.ClearTrigger>
    </Combobox.Control>

    <!-- Dropdown content -->
    <Teleport to="body">
      <Combobox.Positioner :class="styles.positioner()">
        <Combobox.Content :class="styles.content()">
          <Combobox.ItemGroup :class="styles.itemGroup()">
            <Combobox.Item
              v-for="item in collection.items"
              :key="props.itemToValue(item)"
              :item="item"
              :class="styles.item()"
            >
              <Combobox.ItemIndicator :class="styles.itemIndicator()">
                <Check class="size-4" />
              </Combobox.ItemIndicator>
              <Combobox.ItemText :class="styles.itemText()">
                {{ props.itemToString(item) }}
              </Combobox.ItemText>
            </Combobox.Item>
          </Combobox.ItemGroup>
        </Combobox.Content>
      </Combobox.Positioner>
    </Teleport>

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
  </Combobox.Root>
</template>

