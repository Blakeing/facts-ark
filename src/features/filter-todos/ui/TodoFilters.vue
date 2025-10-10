<script setup lang="ts">
/**
 * TodoFilters Component
 *
 * UI for filtering todos by status.
 * Uses SegmentGroup component from the design system.
 */

import { toRef } from 'vue'
import { SegmentGroup } from '@/shared/ui/segment-group'
import { useFilterTodos } from '../model/useFilterTodos'
import type { Todo, TodoFilter } from '@/entities/todo'

interface Props {
  todos: Todo[]
}

const props = defineProps<Props>()

const { currentFilter, filterOptions, setFilter } = useFilterTodos(toRef(props, 'todos'))
</script>

<template>
  <div class="flex items-center justify-between">
    <SegmentGroup
      :options="filterOptions"
      :modelValue="currentFilter"
      @update:modelValue="(value) => setFilter(value as TodoFilter)"
    />

    <!-- Optional: Search input can be added here in the future -->
  </div>
</template>

