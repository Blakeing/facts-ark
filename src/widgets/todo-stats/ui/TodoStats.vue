<script setup lang="ts">
/**
 * TodoStats Widget
 *
 * Displays statistics about todos (total, pending, completed).
 * Uses Badge components for visual representation.
 */

import { computed } from 'vue'
import { useTodoStats } from '@/entities/todo'
import { Badge } from '@/shared/ui/badge'
import { Card } from '@/shared/ui/card'

const { data: stats, status } = useTodoStats()
const isLoading = computed(() => status.value === 'pending')
</script>

<template>
  <Card variant="outline">
    <div class="flex items-center justify-between">
      <h3 class="text-sm font-medium text-fg-muted">Statistics</h3>

      <div v-if="isLoading" class="flex gap-2">
        <div class="h-6 w-16 animate-pulse rounded bg-bg-subtle" />
        <div class="h-6 w-16 animate-pulse rounded bg-bg-subtle" />
        <div class="h-6 w-16 animate-pulse rounded bg-bg-subtle" />
      </div>

      <div v-else-if="stats" class="flex gap-2">
        <Badge variant="outline">
          <svg class="mr-1.5 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
          Total: {{ stats.total }}
        </Badge>

        <Badge variant="info" colorPalette="blue">
          <svg class="mr-1.5 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Active: {{ stats.pending }}
        </Badge>

        <Badge variant="success" colorPalette="green">
          <svg class="mr-1.5 h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          Completed: {{ stats.completed }}
        </Badge>
      </div>
    </div>
  </Card>
</template>

