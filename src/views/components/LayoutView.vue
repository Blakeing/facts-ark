<template>
  <div class="space-y-12 p-8">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Layout Components</h1>
      <p class="text-gray-600">
        Structural components for organizing and containing content.
      </p>
    </div>

    <!-- Card Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Card</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card variant="default">
          <template #header>
            <h3 class="text-lg font-semibold">Default Card</h3>
          </template>
          <p class="text-gray-600">
            This is a default card with a clean white background.
          </p>
          <template #footer>
            <Button variant="primary" size="sm">Action</Button>
          </template>
        </Card>

        <Card variant="bordered">
          <template #header>
            <h3 class="text-lg font-semibold">Bordered Card</h3>
          </template>
          <p class="text-gray-600">
            This card has a subtle border for better definition.
          </p>
          <template #footer>
            <Button variant="outline" size="sm">Action</Button>
          </template>
        </Card>

        <Card variant="elevated">
          <template #header>
            <h3 class="text-lg font-semibold">Elevated Card</h3>
          </template>
          <p class="text-gray-600">
            This card has a shadow for a lifted appearance.
          </p>
          <template #footer>
            <Button variant="secondary" size="sm">Action</Button>
          </template>
        </Card>
      </div>

      <Card variant="bordered">
        <template #header>
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-lg font-semibold">User Profile</h3>
              <p class="text-sm text-gray-500 mt-1">Example combining multiple components</p>
            </div>
            <Badge variant="success">Active</Badge>
          </div>
        </template>

        <div class="flex items-start gap-4">
          <Avatar
            name="Sarah Johnson"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256"
            size="xl"
          />
          <div class="flex-1">
            <h4 class="text-lg font-semibold text-gray-900">Sarah Johnson</h4>
            <p class="text-sm text-gray-600">Product Designer</p>
            <div class="mt-4 flex flex-wrap gap-2">
              <Badge variant="info" size="sm">Design</Badge>
              <Badge variant="info" size="sm">UX</Badge>
              <Badge variant="info" size="sm">Prototyping</Badge>
            </div>
          </div>
        </div>

        <template #footer>
          <div class="flex gap-2">
            <Button variant="primary" size="sm">View Profile</Button>
            <Button variant="outline" size="sm">Send Message</Button>
          </div>
        </template>
      </Card>

      <div class="mt-6">
        <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto border border-gray-200"><code>&lt;Card variant="bordered"&gt;
  &lt;template #header&gt;Card Title&lt;/template&gt;
  Card content goes here
  &lt;template #footer&gt;
    &lt;Button&gt;Action&lt;/Button&gt;
  &lt;/template&gt;
&lt;/Card&gt;</code></pre>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Avatar, Badge, Button, Card } from '@/components/ui'
</script>
