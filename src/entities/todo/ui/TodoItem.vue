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

interface Props {
  todo: Todo
  isSelected?: boolean
}

interface Emits {
  (e: 'toggle', id: string): void
  (e: 'delete', id: string): void
  (e: 'edit', id: string): void
  (e: 'select', id: string): void
}

const props = withDefaults(defineProps<Props>(), {
  isSelected: false,
})

const emit = defineEmits<Emits>()

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
        <button
          type="button"
          class="flex h-5 w-5 items-center justify-center rounded border border-border transition-colors hover:border-accent-default"
          :class="{
            'border-accent-default bg-accent-default': isCompleted,
          }"
          @click="emit('toggle', todo.id)"
        >
          <svg
            v-if="isCompleted"
            class="h-3 w-3 text-fg-on-accent"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="3"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </button>
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
        <button
          type="button"
          class="rounded p-1.5 text-fg-muted transition-colors hover:bg-bg-muted hover:text-fg-default"
          @click="emit('edit', todo.id)"
          title="Edit"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          type="button"
          class="rounded p-1.5 text-fg-muted transition-colors hover:bg-bg-error-subtle hover:text-fg-error"
          @click="emit('delete', todo.id)"
          title="Delete"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </slot>
    </div>
  </div>
</template>

