<!--
  Error State Pattern

  Consistent error states across the app.
  Use when something goes wrong.
-->
<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'
import Button from '@/shared/ui/button/Button.vue'

interface Props {
  title?: string
  message: string
  retryLabel?: string
  showRetry?: boolean
}

withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  retryLabel: 'Try Again',
  showRetry: true,
})

const emit = defineEmits<{
  retry: []
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
    <!-- Error Icon -->
    <div class="mb-4 rounded-full bg-destructive/10 p-3 text-destructive animate-shake">
      <AlertCircle class="size-8" />
    </div>

    <!-- Content -->
    <div class="max-w-md space-y-2 animate-fade-in">
      <h3 class="text-lg font-semibold text-foreground">
        {{ title }}
      </h3>
      <p class="text-sm text-muted-foreground">
        {{ message }}
      </p>
    </div>

    <!-- Retry Button -->
    <div v-if="showRetry" class="mt-6 animate-fade-in" style="animation-delay: 100ms">
      <Button variant="outline" @click="emit('retry')">
        {{ retryLabel }}
      </Button>
    </div>
  </div>
</template>
