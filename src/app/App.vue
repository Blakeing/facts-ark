<!--
  Application Root Component

  This is the top-level component that wraps the entire application.
  It provides the AppLayout wrapper which includes the sidebar and header,
  and renders route-specific content via RouterView.

  Structure:
  - AppLayout: Provides consistent sidebar and header across all pages
  - RouterView: Dynamically renders the current route's component
  - Toast: Global toast notifications

  Vue Query and Pinia Colada are configured as plugins in main.ts.

  @see ./components/AppLayout.vue for layout implementation
  @see ./router/index.ts for route definitions
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from './layouts/AppLayout.vue'
import { Toast } from '@/shared/ui/toast'
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>

  <!-- Global toast notifications (vue-sonner) -->
  <Toast />
</template>
