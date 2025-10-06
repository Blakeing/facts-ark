<template>
  <div class="space-y-12 p-8">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Data Display Components</h1>
      <p class="text-gray-600">
        Components for displaying user information, status, and visual indicators.
      </p>
    </div>

    <!-- Avatar Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Avatar</h2>

      <Card variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">Sizes & Variants</h3>
        </template>

        <div class="space-y-6">
          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">With Image</p>
            <div class="flex items-center gap-4">
              <Avatar
                name="Christian Schröter"
                src="https://avatars.githubusercontent.com/u/1846056?v=4"
                size="sm"
              />
              <Avatar
                name="Christian Schröter"
                src="https://avatars.githubusercontent.com/u/1846056?v=4"
                size="md"
              />
              <Avatar
                name="Christian Schröter"
                src="https://avatars.githubusercontent.com/u/1846056?v=4"
                size="lg"
              />
              <Avatar
                name="Christian Schröter"
                src="https://avatars.githubusercontent.com/u/1846056?v=4"
                size="xl"
              />
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">With Initials (No Image)</p>
            <div class="flex items-center gap-4">
              <Avatar name="John Doe" size="sm" />
              <Avatar name="Jane Smith" size="md" />
              <Avatar name="Bob Wilson" size="lg" />
              <Avatar name="Alice Johnson" size="xl" />
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Icon Fallback (Short Name)</p>
            <div class="flex items-center gap-4">
              <Avatar name="A" size="sm" />
              <Avatar name="B" size="md" />
              <Avatar name="C" size="lg" />
              <Avatar name="X" size="xl" />
            </div>
          </div>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Avatar name="John Doe" src="https://..." size="md" /&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Badge Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Badge</h2>

      <Card variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">Variants & Sizes</h3>
        </template>

        <div class="space-y-6">
          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Variants</p>
            <div class="flex flex-wrap items-center gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Sizes</p>
            <div class="flex flex-wrap items-center gap-3">
              <Badge variant="success" size="sm">Small</Badge>
              <Badge variant="success" size="md">Medium</Badge>
              <Badge variant="success" size="lg">Large</Badge>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Use Cases</p>
            <div class="flex flex-wrap items-center gap-3">
              <Badge variant="success">Active</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="error">Inactive</Badge>
              <Badge variant="info">New</Badge>
              <Badge variant="default">Draft</Badge>
            </div>
          </div>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Badge variant="success" size="md"&gt;Active&lt;/Badge&gt;</code></pre>
        </template>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Avatar, Badge, Card } from '@/components/ui'
</script>
