<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Tabs } from '@ark-ui/vue/tabs'
import { computed, ref } from 'vue'
import { Select } from '../select'
import { tabsVariants } from './tabs.variants'
import type { TabsProps, TabsRootEmits } from './tabs.types'
import type { SelectItem } from '../select/select.types'

/**
 * A closed Tabs component for organizing content into multiple panels.
 *
 * Supports multiple variants inspired by Tailwind UI:
 * - line: Classic underline tabs
 * - pills: Rounded pill-style tabs
 * - enclosed: Tab-like appearance with borders
 * - bar: Full-width segmented control with dividers
 *
 * Features:
 * - Responsive mobile dropdown (optional)
 * - Icon support
 * - Badge support
 * - Disabled tabs
 * - Custom slot content
 *
 * @example
 * // Simple usage
 * <Tabs
 *   variant="line"
 *   :items="[
 *     { value: 'tab1', label: 'Tab 1', content: 'Content 1' },
 *     { value: 'tab2', label: 'Tab 2', content: 'Content 2' }
 *   ]"
 * />
 *
 * @example
 * // With icons and responsive mobile select
 * <Tabs
 *   variant="line"
 *   :responsive="true"
 *   :items="[
 *     { value: 'account', label: 'Account', icon: UserIcon },
 *     { value: 'settings', label: 'Settings', icon: SettingsIcon }
 *   ]"
 * />
 */

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'line',
  indicator: false,
  responsive: false,
})

const emits = defineEmits<TabsRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  tabsVariants({
    variant: props.variant,
  })
)

// For mobile select - convert tab items to select items
const selectItems = computed<SelectItem[]>(() =>
  props.items.map(item => ({
    value: item.value,
    label: item.label,
    disabled: item.disabled,
  }))
)

const selectedValue = ref(props.modelValue || props.items.find(item => !item.disabled)?.value)

const handleMobileChange = (details: { value: string[] }) => {
  const newValue = details.value[0]
  if (newValue) {
    selectedValue.value = newValue
    // Emit value change using Ark UI's v-model event
    emits('update:modelValue', newValue)
  }
}
</script>

<template>
  <div :class="styles.root()">
    <!-- Mobile Select Dropdown -->
    <div v-if="props.responsive" class="sm:hidden">
      <Select
        :items="selectItems"
        :model-value="selectedValue ? [selectedValue] : []"
        placeholder="Select a tab"
        @value-change="handleMobileChange"
      />
    </div>

    <!-- Desktop Tabs -->
    <div :class="props.responsive ? styles.desktopWrapper() : ''">
      <Tabs.Root v-bind="forwarded" :class="props.class">
        <Tabs.List :class="styles.list()">
          <Tabs.Trigger
            v-for="item in props.items"
            :key="item.value"
            :value="item.value"
            :disabled="item.disabled"
            :class="styles.trigger()"
          >
            <!-- Icon -->
            <component
              :is="item.icon"
              v-if="item.icon"
              class="mr-2 -ml-0.5 size-5 text-gray-400 group-hover:text-gray-500 group-data-[selected]:text-indigo-500"
              aria-hidden="true"
            />

            <!-- Label -->
            <span>{{ item.label }}</span>

            <!-- Badge -->
            <span
              v-if="item.badge"
              class="ml-2 rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-900"
            >
              {{ item.badge }}
            </span>

            <!-- Indicator for bar variant -->
            <span
              v-if="props.variant === 'bar' && props.indicator"
              :class="styles.indicator()"
              aria-hidden="true"
            />
          </Tabs.Trigger>

          <!-- Animated indicator for line variant -->
          <Tabs.Indicator
            v-if="props.variant === 'line' && props.indicator"
            :class="styles.indicator()"
          />
        </Tabs.List>

        <Tabs.Content
          v-for="item in props.items"
          :key="item.value"
          :value="item.value"
          :class="styles.content()"
        >
          <!-- Use slot if provided, otherwise use content prop -->
          <slot :name="item.value">
            {{ item.content }}
          </slot>
        </Tabs.Content>
      </Tabs.Root>
    </div>
  </div>
</template>
