<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { computed } from 'vue'
import { badgeVariants } from './badge.variants'
import type { BadgeProps } from './badge.types'

/**
 * A closed Badge component for displaying status, categories, or short text labels.
 *
 * @example
 * <Badge>Default</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="warning" size="lg">Warning</Badge>
 */

const props = defineProps<BadgeProps>()

const badgeClass = computed(() =>
  badgeVariants({
    variant: props.variant,
    size: props.size,
    class: props.class,
  })
)
</script>

<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>

