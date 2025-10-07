<!--
  Application Header

  Sticky header component that provides:
  - Mobile menu button (hidden on desktop)
  - Search bar with icon
  - Dark mode toggle
  - Actions slot for additional header content

  Features:
  - Sticky positioning (always visible at top)
  - Responsive padding
  - Accessible search input with proper labeling
  - Dark mode support with system preference detection
  - Emits 'open-sidebar' event for mobile menu toggle

  Slots:
  - actions: Add custom actions/buttons to the right side of header

  @emits open-sidebar - Triggered when mobile menu button is clicked
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Menu, Search, Moon, Sun } from 'lucide-vue-next'
import ThemeSwitcher from './ThemeSwitcher.vue'

defineEmits<{
  'open-sidebar': []
}>()

const isDark = ref(false)

// Initialize dark mode from localStorage (defaults to light mode)
onMounted(() => {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark') {
    isDark.value = true
    document.documentElement.classList.add('dark')
  } else {
    // Default to light mode
    isDark.value = false
    document.documentElement.classList.remove('dark')
  }
})

function toggleDarkMode() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}
</script>

<template>
  <div
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-border bg-background px-4 shadow-sm sm:px-6 lg:px-8"
  >
    <!-- Mobile menu button (hidden on desktop) -->
    <button
      type="button"
      class="-m-2.5 p-2.5 text-foreground lg:hidden hover:bg-muted rounded-md transition-colors"
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
          class="col-start-1 row-start-1 block size-full bg-transparent pl-8 text-base text-foreground outline-none placeholder:text-muted-foreground sm:text-sm/6"
        />
        <Search
          class="pointer-events-none col-start-1 row-start-1 size-5 self-center text-muted-foreground"
          aria-hidden="true"
        />
      </form>

      <!-- Theme switcher, dark mode toggle, and custom actions -->
      <div class="flex items-center gap-x-2 lg:gap-x-3">
        <!-- Theme Color Switcher -->
        <ThemeSwitcher />

        <!-- Dark Mode Toggle -->
        <button
          type="button"
          class="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
          @click="toggleDarkMode"
          :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <Sun v-if="isDark" class="size-5" />
          <Moon v-else class="size-5" />
        </button>
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>
