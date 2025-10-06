<!--
  Application Root Component

  This is the top-level component that wraps the entire application.
  It provides the AppLayout wrapper which includes the sidebar and header,
  and renders route-specific content via RouterView.

  Structure:
  - AppLayout: Provides consistent sidebar and header across all pages
  - RouterView: Dynamically renders the current route's component

  @see ./components/AppLayout.vue for layout implementation
  @see ./router/index.ts for route definitions
-->
<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppLayout from './components/AppLayout.vue'
</script>

<template>
  <AppLayout>
    <RouterView />
  </AppLayout>
</template>
