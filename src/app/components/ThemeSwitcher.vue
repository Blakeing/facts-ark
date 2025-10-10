<!--
  Theme Switcher Component

  Allows users to dynamically change the app's primary color theme.
  Demonstrates the power of semantic tokens - change one variable,
  update the entire app instantly!
-->
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Popover } from '@ark-ui/vue/popover'
import { Palette } from 'lucide-vue-next'

interface Theme {
  name: string
  color: string
  description: string
  category: 'cool' | 'warm' | 'neutral'
}

const themes: Theme[] = [
  // Cool Colors
  {
    name: 'Indigo',
    color: 'oklch(0.585 0.233 277.117)',
    description: 'Professional & trustworthy',
    category: 'cool',
  },
  {
    name: 'Blue',
    color: '(var(--color-blue-500))',
    description: 'Classic & reliable',
    category: 'cool',
  },
  {
    name: 'Sky',
    color: 'oklch(0.685 0.169 237.323)',
    description: 'Light & airy',
    category: 'cool',
  },
  {
    name: 'Cyan',
    color: 'oklch(0.715 0.143 215.221)',
    description: 'Modern & fresh',
    category: 'cool',
  },
  {
    name: 'Teal',
    color: 'oklch(0.704 0.14 182.503)',
    description: 'Sophisticated & calm',
    category: 'cool',
  },
  {
    name: 'Emerald',
    color: 'oklch(0.696 0.17 162.48)',
    description: 'Growth & success',
    category: 'cool',
  },
  {
    name: 'Green',
    color: 'oklch(0.723 0.219 149.579)',
    description: 'Natural & balanced',
    category: 'cool',
  },
  {
    name: 'Violet',
    color: 'oklch(0.606 0.25 292.717)',
    description: 'Creative & bold',
    category: 'cool',
  },
  {
    name: 'Purple',
    color: 'oklch(0.627 0.265 303.9)',
    description: 'Luxury & premium',
    category: 'cool',
  },

  // Warm Colors
  {
    name: 'Pink',
    color: 'oklch(0.656 0.241 354.308)',
    description: 'Playful & friendly',
    category: 'warm',
  },
  {
    name: 'Rose',
    color: 'oklch(0.645 0.246 16.439)',
    description: 'Elegant & warm',
    category: 'warm',
  },
  {
    name: 'Red',
    color: 'oklch(0.637 0.237 25.331)',
    description: 'Bold & energetic',
    category: 'warm',
  },
  {
    name: 'Orange',
    color: 'oklch(0.705 0.213 47.604)',
    description: 'Vibrant & enthusiastic',
    category: 'warm',
  },
  {
    name: 'Amber',
    color: 'oklch(0.769 0.188 70.08)',
    description: 'Warm & inviting',
    category: 'warm',
  },
  {
    name: 'Yellow',
    color: 'oklch(0.795 0.184 86.047)',
    description: 'Cheerful & optimistic',
    category: 'warm',
  },

  // Neutral Colors
  {
    name: 'Slate',
    color: 'oklch(0.554 0.046 257.417)',
    description: 'Cool & professional',
    category: 'neutral',
  },
  {
    name: 'Gray',
    color: 'oklch(0.551 0.027 264.364)',
    description: 'Balanced & versatile',
    category: 'neutral',
  },
  {
    name: 'Zinc',
    color: 'oklch(0.552 0.016 285.938)',
    description: 'Modern & minimal',
    category: 'neutral',
  },
  {
    name: 'Stone',
    color: 'oklch(0.553 0.013 58.071)',
    description: 'Warm & natural',
    category: 'neutral',
  },
]

const categorizedThemes = {
  cool: themes.filter(t => t.category === 'cool'),
  warm: themes.filter(t => t.category === 'warm'),
  neutral: themes.filter(t => t.category === 'neutral'),
}

const currentTheme = ref<string>('Indigo')

onMounted(() => {
  // Load saved theme from localStorage
  const saved = localStorage.getItem('theme-color')
  if (saved) {
    const theme = themes.find((t) => t.color === saved)
    if (theme) {
      currentTheme.value = theme.name
      applyTheme(theme.color)
    }
  }
})

function applyTheme(color: string) {
  // Update the CSS variable
  document.documentElement.style.setProperty('--color-primary', color)

  // Save to localStorage
  localStorage.setItem('theme-color', color)

  // Update current theme name
  const theme = themes.find((t) => t.color === color)
  if (theme) {
    currentTheme.value = theme.name
  }
}

function selectTheme(theme: Theme) {
  applyTheme(theme.color)
}
</script>

<template>
  <Popover.Root>
    <Popover.Trigger
      class="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors-smooth focus-ring active:scale-95"
      aria-label="Change theme color"
    >
      <Palette class="size-5 transition-transform-smooth hover:rotate-12" />
    </Popover.Trigger>

    <Popover.Positioner>
      <Popover.Content
        class="z-50 min-w-[400px] max-w-md rounded-lg border border-border bg-popover p-4 shadow-lg outline-none max-h-[600px] overflow-y-auto"
      >
        <div class="space-y-4">
          <!-- Header -->
          <div>
            <h3 class="font-semibold text-foreground">Choose Theme Color</h3>
            <p class="text-sm text-muted-foreground mt-1">
              Current: <span class="font-medium text-foreground">{{ currentTheme }}</span>
            </p>
          </div>

          <!-- Cool Colors -->
          <div>
            <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Cool Colors
            </h4>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="theme in categorizedThemes.cool"
                :key="theme.name"
                @click="selectTheme(theme)"
                :class="[
                  'flex flex-col items-center gap-2 p-3 rounded-lg border transition-all',
                  currentTheme === theme.name
                    ? 'border-primary bg-primary/10 shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-popover'
                    : 'border-border hover:border-primary/50 hover:bg-muted',
                ]"
                :title="theme.description"
              >
                <div
                  class="size-8 rounded-full shadow-sm"
                  :style="{ backgroundColor: theme.color }"
                />
                <p
                  :class="[
                    'text-xs font-medium',
                    currentTheme === theme.name ? 'text-primary' : 'text-foreground',
                  ]"
                >
                  {{ theme.name }}
                </p>
              </button>
            </div>
          </div>

          <!-- Warm Colors -->
          <div>
            <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Warm Colors
            </h4>
            <div class="grid grid-cols-3 gap-2">
              <button
                v-for="theme in categorizedThemes.warm"
                :key="theme.name"
                @click="selectTheme(theme)"
                :class="[
                  'flex flex-col items-center gap-2 p-3 rounded-lg border transition-all',
                  currentTheme === theme.name
                    ? 'border-primary bg-primary/10 shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-popover'
                    : 'border-border hover:border-primary/50 hover:bg-muted',
                ]"
                :title="theme.description"
              >
                <div
                  class="size-8 rounded-full shadow-sm"
                  :style="{ backgroundColor: theme.color }"
                />
                <p
                  :class="[
                    'text-xs font-medium',
                    currentTheme === theme.name ? 'text-primary' : 'text-foreground',
                  ]"
                >
                  {{ theme.name }}
                </p>
              </button>
            </div>
          </div>

          <!-- Neutral Colors -->
          <div>
            <h4 class="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Neutral Colors
            </h4>
            <div class="grid grid-cols-2 gap-2">
              <button
                v-for="theme in categorizedThemes.neutral"
                :key="theme.name"
                @click="selectTheme(theme)"
                :class="[
                  'flex flex-col items-center gap-2 p-3 rounded-lg border transition-all',
                  currentTheme === theme.name
                    ? 'border-primary bg-primary/10 shadow-sm ring-2 ring-primary ring-offset-2 ring-offset-popover'
                    : 'border-border hover:border-primary/50 hover:bg-muted',
                ]"
                :title="theme.description"
              >
                <div
                  class="size-8 rounded-full shadow-sm"
                  :style="{ backgroundColor: theme.color }"
                />
                <p
                  :class="[
                    'text-xs font-medium',
                    currentTheme === theme.name ? 'text-primary' : 'text-foreground',
                  ]"
                >
                  {{ theme.name }}
                </p>
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="pt-2 border-t border-border">
            <p class="text-xs text-muted-foreground">
              💡 {{ themes.length }} themes • Updates instantly across the entire app
            </p>
          </div>
        </div>
      </Popover.Content>
    </Popover.Positioner>
  </Popover.Root>
</template>
