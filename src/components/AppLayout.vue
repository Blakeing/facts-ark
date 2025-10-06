<!--
  Main Application Layout

  Provides the consistent layout structure for all pages, including:
  - Responsive sidebar (mobile overlay + desktop fixed)
  - Sticky header with search and mobile menu button
  - Main content area with proper spacing

  Layout Structure:
  - Mobile: Sidebar is a Dialog overlay, toggled by header menu button
  - Desktop (lg+): Sidebar is fixed on left, content area has left padding

  State Management:
  - sidebarOpen: Controls mobile sidebar visibility

  @see AppSidebar.vue for sidebar implementation
  @see AppHeader.vue for header implementation
-->
<script setup lang="ts">
import { ref } from 'vue'
import AppSidebar from './AppSidebar.vue'
import AppHeader from './AppHeader.vue'

const sidebarOpen = ref(false)
</script>

<template>
  <div>
    <!-- Sidebar (mobile + desktop) -->
    <AppSidebar v-model:open="sidebarOpen" />

    <!-- Main content area -->
    <div class="lg:pl-72">
      <!-- Sticky header -->
      <AppHeader @open-sidebar="sidebarOpen = true" />

      <!-- Page content -->
      <main>
        <slot />
      </main>
    </div>
  </div>
</template>

