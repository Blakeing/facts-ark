<script setup lang="ts">
/**
 * TodoItem Component
 *
 * Displays a single todo item.
 * Presentational component - receives data via props, emits events for actions.
 */

import { computed } from 'vue'
import { formatRelativeTime } from '@/shared/lib/date'
import type { Todo } from '../model/types'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Checkbox } from '@/shared/ui/checkbox'
import { PencilIcon, Trash2Icon } from 'lucide-vue-next'

const props = withDefaults(
  defineProps<{ todo: Todo; isSelected?: boolean }>(),
  {
    isSelected: false,
  },
)

const emit = defineEmits<{
  (e: 'toggle', id: Todo['id']): void
  (e: 'delete', id: Todo['id']): void
  (e: 'edit', id: Todo['id']): void
  (e: 'select', id: Todo['id']): void
}>()

const isCompleted = computed(() => props.todo.status === 'completed')
const formattedDate = computed(() => formatRelativeTime(props.todo.createdAt))
</script>

<template>
  <div
    class="group flex items-start gap-3 rounded-lg border border-border bg-bg-default p-4 transition-colors hover:bg-bg-subtle"
    :class="{ 'border-accent-default': isSelected }"
  >
    <!-- Checkbox Slot -->
    <div class="pt-0.5">
      <slot name="checkbox" :todo="todo">
        <Checkbox
          :checked="isCompleted"
          aria-label="Toggle todo completion"
          @update:checked="emit('toggle', todo.id)"
        />
      </slot>
    </div>

    <!-- Content -->
    <div class="min-w-0 flex-1">
      <div class="flex items-start justify-between gap-2">
        <div class="min-w-0 flex-1">
          <h3
            class="text-base font-medium text-fg-default transition-colors"
            :class="{
              'line-through text-fg-muted': isCompleted,
            }"
          >
            {{ todo.title }}
          </h3>
          <p
            v-if="todo.description"
            class="mt-1 text-sm text-fg-muted"
            :class="{
              'line-through': isCompleted,
            }"
          >
            {{ todo.description }}
          </p>
        </div>

        <!-- Status Badge -->
        <Badge :variant="isCompleted ? 'secondary' : 'outline'" size="sm">
          {{ todo.status }}
        </Badge>
      </div>

      <!-- Meta Info -->
      <div class="mt-2 flex items-center gap-4 text-xs text-fg-muted">
        <span>{{ formattedDate }}</span>
        <span v-if="todo.completedAt">
          Completed {{ formatRelativeTime(todo.completedAt) }}
        </span>
      </div>
    </div>

    <!-- Actions Slot -->
    <div class="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
      <slot name="actions" :todo="todo">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          class="h-8 w-8 p-0"
          @click="emit('edit', todo.id)"
          title="Edit"
        >
          <PencilIcon class="h-4 w-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          class="h-8 w-8 p-0 text-fg-muted hover:text-fg-error"
          @click="emit('delete', todo.id)"
          title="Delete"
        >
          <Trash2Icon class="h-4 w-4" />
        </Button>
      </slot>
    </div>
  </div>
</template>

