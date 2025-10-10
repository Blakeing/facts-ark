<!--
  Empty State Pattern

  Consistent empty states across the app.
  Use when there's no data to display.
-->
<script setup lang="ts">
import type { Component as VueComponent } from 'vue'
import Button from '@/shared/ui/button/Button.vue'

interface Props {
  icon?: VueComponent
  title: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

defineProps<Props>()
const emit = defineEmits<{
  action: []
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <!-- Icon -->
    <div
      v-if="icon"
      class="mb-4 rounded-full bg-muted p-3 text-muted-foreground animate-fade-in"
    >
      <component :is="icon" class="size-8" />
    </div>

    <!-- Content -->
    <div class="max-w-md space-y-2 animate-slide-fade-in">
      <h3 class="text-lg font-semibold text-foreground">
        {{ title }}
      </h3>
      <p v-if="description" class="text-sm text-muted-foreground">
        {{ description }}
      </p>
    </div>

    <!-- Action -->
    <div v-if="actionLabel" class="mt-6 animate-fade-in" style="animation-delay: 100ms">
      <Button
        v-if="actionHref"
        :as="'a'"
        :href="actionHref"
        variant="solid"
      >
        {{ actionLabel }}
      </Button>
      <Button
        v-else
        variant="solid"
        @click="emit('action')"
      >
        {{ actionLabel }}
      </Button>
    </div>
  </div>
</template>
