<!--
  Loading State Pattern

  Consistent loading states across the app.
  Use when data is being fetched.
-->
<script setup lang="ts">
interface Props {
  variant?: 'spinner' | 'skeleton' | 'pulse'
  message?: string
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), {
  variant: 'spinner',
  size: 'md',
})

const sizeClasses = {
  sm: 'size-4',
  md: 'size-8',
  lg: 'size-12',
}
</script>

<template>
  <div class="flex flex-col items-center justify-center py-12 px-4">
    <!-- Spinner Variant -->
    <div v-if="variant === 'spinner'" class="animate-fade-in">
      <div
        :class="[
          'border-4 border-muted border-t-primary rounded-full animate-spin',
          sizeClasses[size],
        ]"
      />
    </div>

    <!-- Skeleton Variant -->
    <div v-else-if="variant === 'skeleton'" class="w-full max-w-md space-y-4">
      <div class="skeleton skeleton-heading" />
      <div class="skeleton skeleton-text" />
      <div class="skeleton skeleton-text" style="width: 80%" />
      <div class="skeleton skeleton-button" />
    </div>

    <!-- Pulse Variant -->
    <div v-else-if="variant === 'pulse'" class="animate-pulse">
      <div :class="['rounded-full bg-primary', sizeClasses[size]]" />
    </div>

    <!-- Loading Message -->
    <p
      v-if="message"
      class="mt-4 text-sm text-muted-foreground animate-fade-in"
      style="animation-delay: 200ms"
    >
      {{ message }}
    </p>
  </div>
</template>
