<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Select, createListCollection } from '@ark-ui/vue/select'
import { ChevronDown, Check } from 'lucide-vue-next'
import { computed } from 'vue'
import { selectVariants } from './select.variants'
import type { SelectProps, SelectRootEmits, SelectItem, SelectItemGroup } from './select.types'

/**
 * A closed Select component for choosing from a list of options.
 *
 * Features:
 * - Single or grouped items
 * - Keyboard navigation
 * - Search/filter support
 * - Accessible by default (Ark UI)
 * - Customizable sizes
 *
 * @example
 * // Simple usage
 * <Select
 *   label="Framework"
 *   placeholder="Select a framework"
 *   :items="[
 *     { value: 'react', label: 'React' },
 *     { value: 'vue', label: 'Vue' }
 *   ]"
 * />
 *
 * @example
 * // With groups
 * <Select
 *   label="Technology"
 *   :items="[
 *     {
 *       label: 'Frontend',
 *       items: [
 *         { value: 'react', label: 'React' },
 *         { value: 'vue', label: 'Vue' }
 *       ]
 *     }
 *   ]"
 * />
 */

const props = withDefaults(defineProps<SelectProps>(), {
  size: 'md',
  placeholder: 'Select an option',
  indicatorPosition: 'right',
})

const emits = defineEmits<SelectRootEmits<SelectItem>>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  selectVariants({
    size: props.size,
    indicatorPosition: props.indicatorPosition,
  })
)

// Get the currently selected item for display
const selectedItem = computed(() => {
  const value = props.modelValue?.[0]
  if (!value) return null

  if (isGrouped.value) {
    for (const group of props.items as SelectItemGroup[]) {
      const found = group.items?.find(item => item.value === value)
      if (found) return found
    }
  } else {
    return (props.items as SelectItem[]).find(item => item.value === value)
  }
  return null
})

// Check if items are grouped
const isGrouped = computed(() => {
  return props.items.length > 0 && props.items[0] && 'items' in props.items[0]
})

// Create collection from items
const collection = computed(() => {
  if (isGrouped.value) {
    // Flatten grouped items for collection
    const flatItems = (props.items as SelectItemGroup[]).flatMap(group => group.items || [])
    return createListCollection({ items: flatItems })
  }
  return createListCollection({ items: (props.items as SelectItem[]) || [] })
})
</script>

<template>
  <Select.Root v-bind="forwarded" :collection="collection" :class="[styles.root(), props.class]">
    <Select.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </Select.Label>
    <Select.Control :class="styles.control()">
      <Select.Trigger :class="styles.trigger()">
        <span class="col-start-1 row-start-1 flex items-center gap-3 pr-6">
          <!-- Avatar -->
          <img
            v-if="selectedItem?.avatar"
            :src="selectedItem.avatar"
            :alt="selectedItem.label"
            :class="styles.itemAvatar()"
          />
          <!-- Status Indicator -->
          <span
            v-else-if="selectedItem?.status !== undefined"
            :aria-label="selectedItem.status === true || selectedItem.status === 'online' ? 'Online' : 'Offline'"
            :class="[
              selectedItem.status === true || selectedItem.status === 'online'
                ? 'bg-green-400'
                : 'bg-gray-200',
              styles.itemStatus(),
            ]"
          />
          <!-- Label -->
          <span class="block truncate">
            <Select.ValueText :placeholder="props.placeholder" />
          </span>
          <!-- Description -->
          <span v-if="selectedItem?.description" class="truncate text-gray-500">
            {{ selectedItem.description }}
          </span>
        </span>
        <Select.Indicator :class="styles.indicator()">
          <ChevronDown class="size-5 text-gray-400" />
        </Select.Indicator>
      </Select.Trigger>
    </Select.Control>

    <Teleport to="body">
      <Select.Positioner :class="styles.positioner()">
        <Select.Content :class="styles.content()">
          <!-- Grouped items -->
          <template v-if="isGrouped">
            <Select.ItemGroup
              v-for="(group, idx) in (props.items as SelectItemGroup[])"
              :key="idx"
              :id="`group-${idx}`"
              :class="styles.itemGroup()"
            >
              <Select.ItemGroupLabel :class="styles.itemGroupLabel()">
                {{ group.label }}
              </Select.ItemGroupLabel>
              <Select.Item
                v-for="item in group.items"
                :key="item.value"
                :item="item"
                :class="styles.item()"
              >
                <div :class="styles.itemContent()">
                  <!-- Avatar -->
                  <img
                    v-if="item.avatar"
                    :src="item.avatar"
                    :alt="item.label"
                    :class="styles.itemAvatar()"
                  />
                  <!-- Status Indicator -->
                  <span
                    v-else-if="item.status !== undefined"
                    :class="[
                      item.status === true || item.status === 'online'
                        ? 'bg-green-400'
                        : 'bg-gray-200',
                      styles.itemStatus(),
                    ]"
                    aria-hidden="true"
                  />
                  <!-- Label & Description -->
                  <Select.ItemText :class="styles.itemText()">
                    {{ item.label }}
                    <span v-if="item.description" :class="styles.itemDescription()">
                      {{ item.description }}
                    </span>
                  </Select.ItemText>
                </div>
                <Select.ItemIndicator :class="styles.itemIndicator()">
                  <Check class="size-5" />
                </Select.ItemIndicator>
              </Select.Item>
            </Select.ItemGroup>
          </template>

          <!-- Flat items -->
          <template v-else>
            <Select.Item
              v-for="item in (props.items as SelectItem[])"
              :key="item.value"
              :item="item"
              :class="styles.item()"
            >
              <div :class="styles.itemContent()">
                <!-- Avatar -->
                <img
                  v-if="item.avatar"
                  :src="item.avatar"
                  :alt="item.label"
                  :class="styles.itemAvatar()"
                />
                <!-- Status Indicator -->
                <span
                  v-else-if="item.status !== undefined"
                  :class="[
                    item.status === true || item.status === 'online'
                      ? 'bg-green-400'
                      : 'bg-gray-200',
                    styles.itemStatus(),
                  ]"
                  aria-hidden="true"
                />
                <!-- Label & Description -->
                <Select.ItemText :class="styles.itemText()">
                  {{ item.label }}
                  <span v-if="item.description" :class="styles.itemDescription()">
                    {{ item.description }}
                  </span>
                </Select.ItemText>
              </div>
              <Select.ItemIndicator :class="styles.itemIndicator()">
                <Check class="size-5" />
              </Select.ItemIndicator>
            </Select.Item>
          </template>
        </Select.Content>
      </Select.Positioner>
    </Teleport>

    <Select.HiddenSelect />
  </Select.Root>
</template>
