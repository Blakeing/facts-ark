<template>
  <div class="space-y-12 p-8">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Action Components</h1>
      <p class="text-gray-600">
        Interactive elements that trigger actions and operations.
      </p>
    </div>

    <!-- Button Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Button</h2>

      <Card variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">Variants, Sizes & States</h3>
        </template>

        <div class="space-y-6">
          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Variants</p>
            <div class="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Sizes</p>
            <div class="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">States</p>
            <div class="flex flex-wrap items-center gap-3">
              <Button variant="primary" :loading="true">Loading</Button>
              <Button variant="primary" :disabled="true">Disabled</Button>
              <Button variant="primary" :loading="isLoading" @click="handleSubmit">
                {{ isLoading ? 'Submitting...' : 'Submit' }}
              </Button>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Full Width</p>
            <Button variant="primary" :full-width="true">Full Width Button</Button>
          </div>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Button variant="primary" :loading="isLoading" @click="handleClick"&gt;Submit&lt;/Button&gt;</code></pre>
        </template>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Card } from '@/components/ui'

const isLoading = ref(false)

const handleSubmit = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    alert('Submitted!')
  }, 2000)
}
</script>
