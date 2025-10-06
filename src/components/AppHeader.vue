<!--
  Application Header

  Sticky header component that provides:
  - Mobile menu button (hidden on desktop)
  - Search bar with icon
  - Actions slot for additional header content

  Features:
  - Sticky positioning (always visible at top)
  - Responsive padding
  - Accessible search input with proper labeling
  - Emits 'open-sidebar' event for mobile menu toggle

  Slots:
  - actions: Add custom actions/buttons to the right side of header

  @emits open-sidebar - Triggered when mobile menu button is clicked
-->
<script setup lang="ts">
import { Menu, Search } from 'lucide-vue-next'

defineEmits<{
  'open-sidebar': []
}>()
</script>

<template>
  <div
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-gray-200 bg-white px-4 shadow-sm sm:px-6 lg:px-8"
  >
    <!-- Mobile menu button (hidden on desktop) -->
    <button
      type="button"
      class="-m-2.5 p-2.5 text-gray-900 lg:hidden"
      @click="$emit('open-sidebar')"
    >
      <span class="sr-only">Open sidebar</span>
      <Menu class="size-5" aria-hidden="true" />
    </button>

    <!-- Search and actions -->
    <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
      <!-- Search bar -->
      <form class="grid flex-1 grid-cols-1" action="#" method="GET">
        <label for="search-field" class="sr-only">Search</label>
        <input
          id="search-field"
          name="search"
          type="search"
          placeholder="Search"
          class="col-start-1 row-start-1 block size-full bg-transparent pl-8 text-base text-gray-900 outline-none placeholder:text-gray-400 sm:text-sm/6"
        />
        <Search
          class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-gray-400"
          aria-hidden="true"
        />
      </form>

      <!-- Custom actions slot -->
      <div class="flex items-center gap-x-4 lg:gap-x-6">
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
