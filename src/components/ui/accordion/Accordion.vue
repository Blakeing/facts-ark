<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Accordion } from '@ark-ui/vue/accordion'
import { ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { useOmitProps } from '@/lib/useOmitProps'
import { accordionVariants } from './accordion.variants'
import type { AccordionProps, AccordionRootEmits } from './accordion.types'

/**
 * A closed Accordion component for organizing collapsible content.
 *
 * Supports multiple variants:
 * - default: Simple divided list
 * - bordered: Contained with border
 * - separated: Individual bordered items
 * - contained: Individual items with background
 *
 * Features:
 * - Single or multiple expanded items
 * - Collapsible mode
 * - Disabled items
 * - Optional icons
 * - Custom slot content
 *
 * @example
 * // Simple usage
 * <Accordion
 *   variant="default"
 *   :items="[
 *     { value: 'item1', title: 'What is Vue?', content: 'Vue is a framework...' },
 *     { value: 'item2', title: 'What is React?', content: 'React is a library...' }
 *   ]"
 * />
 *
 * @example
 * // Multiple expanded items
 * <Accordion
 *   variant="separated"
 *   :multiple="true"
 *   :items="items"
 * />
 */

const props = withDefaults(defineProps<AccordionProps>(), {
  variant: 'default',
  collapsible: true,
  multiple: false,
})

const emits = defineEmits<AccordionRootEmits>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  ['items', 'variant', 'class'] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() =>
  accordionVariants({
    variant: props.variant,
  })
)
</script>

<template>
  <Accordion.Root v-bind="forwarded" :class="cn(styles.root(), props.class)">
    <Accordion.Item
      v-for="item in props.items"
      :key="item.value"
      :value="item.value"
      :disabled="item.disabled"
      :class="styles.item()"
    >
      <Accordion.ItemTrigger :class="styles.trigger()">
        <!-- Optional icon -->
        <component
          :is="item.icon"
          v-if="item.icon"
          :class="styles.triggerIcon()"
          aria-hidden="true"
        />

        <!-- Title -->
        <span class="flex-1">{{ item.title }}</span>

        <!-- Chevron indicator -->
        <Accordion.ItemIndicator :class="styles.indicator()">
          <ChevronRight />
        </Accordion.ItemIndicator>
      </Accordion.ItemTrigger>

      <Accordion.ItemContent :class="styles.content()">
        <!-- Use slot if provided, otherwise use content prop -->
        <slot :name="item.value">
          {{ item.content }}
        </slot>
      </Accordion.ItemContent>
    </Accordion.Item>
  </Accordion.Root>
</template>
