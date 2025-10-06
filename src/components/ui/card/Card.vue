<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'
import { cardVariants } from './card.variants'
import type { CardProps } from './card.types'

/**
 * A closed Card component for displaying content in a contained box.
 *
 * @example
 * <Card>
 *   <template #header>Card Title</template>
 *   <template #default>Card content goes here</template>
 *   <template #footer>
 *     <Button>Action</Button>
 *   </template>
 * </Card>
 */

const props = defineProps<CardProps>()

const cardClass = computed(() =>
  cardVariants({
    variant: props.variant,
    padding: props.padding,
    class: props.class,
  })
)
</script>

<template>
  <div :class="cardClass">
    <div v-if="$slots.header" class="mb-4 border-b border-gray-200 pb-4">
      <slot name="header" />
    </div>

    <div>
      <slot />
    </div>

    <div v-if="$slots.footer" class="mt-4 border-t border-gray-200 pt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

