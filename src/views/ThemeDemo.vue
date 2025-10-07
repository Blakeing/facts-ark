<!--
  Theme Demo View

  Demonstrates the full Tailwind CSS v4 theming ecosystem:
  - Park UI semantic tokens
  - Tailwind's 17 color scales
  - Responsive design
  - Dark mode
  - Spacing and typography
-->
<script setup lang="ts">
import { ref, computed } from 'vue'
import Card from '@/components/ui/card/Card.vue'
import Button from '@/components/ui/button/Button.vue'
import Badge from '@/components/ui/badge/Badge.vue'

type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

interface ColorScale {
  name: string
  label: string
  desc: string
  bg: string
  shades: Record<ColorShade, string>
}

const selectedColor = ref('blue')

const colorScales: ColorScale[] = [
  {
    name: 'blue',
    label: 'Blue',
    desc: 'Trust & Technology',
    bg: 'oklch(0.623 0.214 259.816)',
    shades: {
      50: 'oklch(0.97 0.014 254.604)',
      100: 'oklch(0.932 0.032 255.585)',
      200: 'oklch(0.882 0.059 254.128)',
      300: 'oklch(0.809 0.105 251.813)',
      400: 'oklch(0.707 0.165 254.624)',
      500: 'oklch(0.623 0.214 259.815)',
      600: 'oklch(0.546 0.245 262.881)',
      700: 'oklch(0.488 0.243 264.376)',
      800: 'oklch(0.424 0.199 265.638)',
      900: 'oklch(0.379 0.146 265.522)',
      950: 'oklch(0.282 0.091 267.935)',
    },
  },
  {
    name: 'indigo',
    label: 'Indigo',
    desc: 'Current Primary',
    bg: 'oklch(0.585 0.233 277.117)',
    shades: {
      50: 'oklch(0.962 0.018 272.314)',
      100: 'oklch(0.93 0.034 272.788)',
      200: 'oklch(0.87 0.065 274.039)',
      300: 'oklch(0.785 0.115 274.713)',
      400: 'oklch(0.673 0.182 276.935)',
      500: 'oklch(0.585 0.233 277.117)',
      600: 'oklch(0.511 0.262 276.966)',
      700: 'oklch(0.457 0.24 277.023)',
      800: 'oklch(0.398 0.195 277.366)',
      900: 'oklch(0.359 0.144 278.697)',
      950: 'oklch(0.257 0.09 281.288)',
    },
  },
  {
    name: 'violet',
    label: 'Violet',
    desc: 'Creative',
    bg: 'oklch(0.606 0.25 292.717)',
    shades: {
      50: 'oklch(0.969 0.016 293.756)',
      100: 'oklch(0.943 0.029 294.588)',
      200: 'oklch(0.894 0.057 293.283)',
      300: 'oklch(0.811 0.111 293.571)',
      400: 'oklch(0.702 0.183 293.541)',
      500: 'oklch(0.606 0.25 292.717)',
      600: 'oklch(0.541 0.281 293.009)',
      700: 'oklch(0.491 0.27 292.581)',
      800: 'oklch(0.432 0.232 292.759)',
      900: 'oklch(0.38 0.189 293.745)',
      950: 'oklch(0.283 0.141 291.089)',
    },
  },
  {
    name: 'purple',
    label: 'Purple',
    desc: 'Luxury',
    bg: 'oklch(0.627 0.265 303.9)',
    shades: {
      50: 'oklch(0.977 0.014 308.299)',
      100: 'oklch(0.946 0.033 307.174)',
      200: 'oklch(0.902 0.063 306.703)',
      300: 'oklch(0.827 0.119 306.383)',
      400: 'oklch(0.714 0.203 305.504)',
      500: 'oklch(0.627 0.265 303.9)',
      600: 'oklch(0.558 0.288 302.321)',
      700: 'oklch(0.496 0.265 301.924)',
      800: 'oklch(0.438 0.218 303.724)',
      900: 'oklch(0.381 0.176 304.987)',
      950: 'oklch(0.291 0.149 302.717)',
    },
  },
  {
    name: 'emerald',
    label: 'Emerald',
    desc: 'Success',
    bg: 'oklch(0.696 0.17 162.48)',
    shades: {
      50: 'oklch(0.979 0.021 166.113)',
      100: 'oklch(0.95 0.052 163.051)',
      200: 'oklch(0.905 0.093 164.15)',
      300: 'oklch(0.845 0.143 164.978)',
      400: 'oklch(0.765 0.177 163.223)',
      500: 'oklch(0.696 0.17 162.48)',
      600: 'oklch(0.596 0.145 163.225)',
      700: 'oklch(0.508 0.118 165.612)',
      800: 'oklch(0.432 0.095 166.913)',
      900: 'oklch(0.378 0.077 168.94)',
      950: 'oklch(0.262 0.051 172.552)',
    },
  },
  {
    name: 'red',
    label: 'Red',
    desc: 'Danger',
    bg: 'oklch(0.637 0.237 25.331)',
    shades: {
      50: 'oklch(0.971 0.013 17.38)',
      100: 'oklch(0.936 0.032 17.717)',
      200: 'oklch(0.885 0.062 18.334)',
      300: 'oklch(0.808 0.114 19.571)',
      400: 'oklch(0.704 0.191 22.216)',
      500: 'oklch(0.637 0.237 25.331)',
      600: 'oklch(0.577 0.245 27.325)',
      700: 'oklch(0.505 0.213 27.518)',
      800: 'oklch(0.444 0.177 26.899)',
      900: 'oklch(0.396 0.141 25.723)',
      950: 'oklch(0.258 0.092 26.042)',
    },
  },
  {
    name: 'amber',
    label: 'Amber',
    desc: 'Warning',
    bg: 'oklch(0.769 0.188 70.08)',
    shades: {
      50: 'oklch(0.987 0.022 95.277)',
      100: 'oklch(0.962 0.059 95.617)',
      200: 'oklch(0.924 0.12 95.746)',
      300: 'oklch(0.879 0.169 91.605)',
      400: 'oklch(0.828 0.189 84.429)',
      500: 'oklch(0.769 0.188 70.08)',
      600: 'oklch(0.666 0.179 58.318)',
      700: 'oklch(0.555 0.163 48.998)',
      800: 'oklch(0.473 0.137 46.201)',
      900: 'oklch(0.414 0.112 45.904)',
      950: 'oklch(0.279 0.077 45.635)',
    },
  },
  {
    name: 'teal',
    label: 'Teal',
    desc: 'Accent',
    bg: 'oklch(0.704 0.14 182.503)',
    shades: {
      50: 'oklch(0.984 0.014 180.72)',
      100: 'oklch(0.953 0.051 180.801)',
      200: 'oklch(0.91 0.096 180.426)',
      300: 'oklch(0.855 0.138 181.071)',
      400: 'oklch(0.777 0.152 181.912)',
      500: 'oklch(0.704 0.14 182.503)',
      600: 'oklch(0.6 0.118 184.704)',
      700: 'oklch(0.511 0.096 186.391)',
      800: 'oklch(0.437 0.078 188.216)',
      900: 'oklch(0.386 0.063 188.416)',
      950: 'oklch(0.277 0.046 192.524)',
    },
  },
]

const shades: ColorShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const currentColorScale = computed(() => {
  const found = colorScales.find((c) => c.name === selectedColor.value)
  return found ?? colorScales[0]!
})

const stats = [
  { label: 'Total Users', value: '12,543', change: '+12%', trend: 'up' as const },
  { label: 'Active Now', value: '1,234', change: '+8%', trend: 'up' as const },
  { label: 'Bounce Rate', value: '23%', change: '-5%', trend: 'down' as const },
] as const
</script>

<template>
  <div class="p-6 space-y-12 animate-fade-in">
    <!-- Header -->
    <div class="text-center space-y-4">
      <h1 class="text-4xl md:text-5xl font-bold text-foreground">
        🎨 Tailwind CSS v4 Theme Demo
      </h1>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
        Explore the full power of Tailwind's color ecosystem combined with Park UI's semantic
        tokens
      </p>
      <div class="flex gap-2 justify-center flex-wrap">
        <Badge variant="primary">17 Color Scales</Badge>
        <Badge variant="success">Park UI Tokens</Badge>
        <Badge variant="info">Dark Mode Ready</Badge>
        <Badge variant="outline">Responsive</Badge>
      </div>
    </div>

    <!-- Semantic Tokens Section -->
    <section>
      <Card variant="outline" padding="lg">
        <h2 class="text-2xl font-bold text-foreground mb-4">
          Park UI Semantic Tokens
        </h2>
        <p class="text-muted-foreground mb-6">
          These tokens automatically adapt to light/dark mode and theme changes. Use them for
          consistency.
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <!-- Background -->
          <div class="space-y-2">
            <p class="text-sm font-medium text-foreground">Backgrounds</p>
            <div class="space-y-2">
              <div class="bg-background border-2 border-border p-3 rounded">
                bg-background
              </div>
              <div class="bg-card border-2 border-border p-3 rounded">bg-card</div>
              <div class="bg-muted border-2 border-border p-3 rounded">bg-muted</div>
            </div>
          </div>

          <!-- Text -->
          <div class="space-y-2">
            <p class="text-sm font-medium text-foreground">Text Colors</p>
            <div class="space-y-2 bg-card p-3 rounded border border-border">
              <p class="text-foreground">text-foreground</p>
              <p class="text-muted-foreground">text-muted-foreground</p>
              <p class="text-primary">text-primary</p>
            </div>
          </div>

          <!-- Interactive -->
          <div class="space-y-2">
            <p class="text-sm font-medium text-foreground">Interactive</p>
            <div class="space-y-2">
              <Button variant="solid">bg-primary</Button>
              <Button variant="secondary">bg-secondary</Button>
              <Button variant="destructive">bg-destructive</Button>
            </div>
          </div>
        </div>
      </Card>
    </section>

    <!-- Color Scale Explorer -->
    <section>
      <Card variant="outline" padding="lg">
        <h2 class="text-2xl font-bold text-foreground mb-4">
          Tailwind Color Scale Explorer
        </h2>
        <p class="text-muted-foreground mb-6">
          Click a color to see all 11 shades (50-950). Perfect for data visualization and specific
          design needs.
        </p>

        <!-- Color Selector -->
        <div class="flex flex-wrap gap-2 mb-6">
          <button
            v-for="color in colorScales"
            :key="color.name"
            @click="selectedColor = color.name"
            :class="[
              'px-4 py-2 rounded-lg font-medium transition-all border',
              selectedColor === color.name
                ? 'text-white shadow-lg scale-105'
                : 'bg-card text-foreground hover:bg-muted border-border',
            ]"
            :style="
              selectedColor === color.name
                ? { backgroundColor: color.bg, borderColor: color.bg }
                : {}
            "
          >
            {{ color.label }}
          </button>
        </div>

        <!-- Color Scale Display -->
        <div class="space-y-2">
          <div
            v-for="shade in shades"
            :key="shade"
            class="p-4 rounded flex justify-between items-center transition-all hover:scale-[1.02]"
            :style="{ backgroundColor: currentColorScale.shades[shade] }"
          >
            <span :class="shade >= 600 ? 'text-white' : 'text-gray-900'">
              {{ selectedColor }}-{{ shade }}
            </span>
            <code
              :class="[
                'text-xs font-mono px-2 py-1 rounded',
                shade >= 600 ? 'bg-white/20 text-white' : 'bg-black/10 text-gray-900',
              ]"
            >
              bg-{{ selectedColor }}-{{ shade }}
            </code>
          </div>
        </div>
      </Card>
    </section>

    <!-- Data Visualization Example -->
    <section>
      <Card variant="outline" padding="lg">
        <h2 class="text-2xl font-bold text-foreground mb-4">
          Data Visualization with Tailwind Colors
        </h2>
        <p class="text-muted-foreground mb-6">
          Using specific Tailwind colors for charts and data, with semantic tokens for structure.
        </p>

        <!-- Stats Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 p-6 rounded-lg">
            <p class="text-sm text-blue-600 dark:text-blue-400 mb-1">{{ stats[0].label }}</p>
            <p class="text-3xl font-bold text-blue-700 dark:text-blue-300">
              {{ stats[0].value }}
            </p>
            <p class="text-sm text-blue-600 dark:text-blue-400 mt-2">
              ↑ {{ stats[0].change }}
            </p>
          </div>

          <div class="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 p-6 rounded-lg">
            <p class="text-sm text-purple-600 dark:text-purple-400 mb-1">{{ stats[1].label }}</p>
            <p class="text-3xl font-bold text-purple-700 dark:text-purple-300">
              {{ stats[1].value }}
            </p>
            <p class="text-sm text-purple-600 dark:text-purple-400 mt-2">
              ↑ {{ stats[1].change }}
            </p>
          </div>

          <div class="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-6 rounded-lg">
            <p class="text-sm text-emerald-600 dark:text-emerald-400 mb-1">{{ stats[2].label }}</p>
            <p class="text-3xl font-bold text-emerald-700 dark:text-emerald-300">
              {{ stats[2].value }}
            </p>
            <p class="text-sm text-emerald-600 dark:text-emerald-400 mt-2">
              ↓ {{ stats[2].change }}
            </p>
          </div>
        </div>

        <!-- Simple Chart -->
        <div class="space-y-4">
          <p class="text-sm font-medium text-foreground">Monthly Revenue</p>
          <div class="flex items-end gap-2 h-48">
            <div class="bg-blue-500 flex-1 rounded-t" style="height: 60%"></div>
            <div class="bg-purple-500 flex-1 rounded-t" style="height: 75%"></div>
            <div class="bg-teal-500 flex-1 rounded-t" style="height: 90%"></div>
            <div class="bg-amber-500 flex-1 rounded-t" style="height: 85%"></div>
            <div class="bg-emerald-500 flex-1 rounded-t" style="height: 100%"></div>
            <div class="bg-indigo-500 flex-1 rounded-t" style="height: 95%"></div>
          </div>
          <div class="flex justify-between text-xs text-muted-foreground">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>
        </div>
      </Card>
    </section>

    <!-- Status Alerts -->
    <section>
      <Card variant="outline" padding="lg">
        <h2 class="text-2xl font-bold text-foreground mb-4">Status Indicators</h2>
        <p class="text-muted-foreground mb-6">
          Using Tailwind colors for clear status communication.
        </p>

        <div class="space-y-4">
          <!-- Success -->
          <div class="bg-emerald-50 dark:bg-emerald-950/20 border-l-4 border-emerald-500 p-4 rounded">
            <div class="flex items-start gap-3">
              <span class="text-emerald-600 dark:text-emerald-400 text-xl">✓</span>
              <div>
                <p class="font-medium text-emerald-700 dark:text-emerald-300">
                  Success
                </p>
                <p class="text-sm text-emerald-600 dark:text-emerald-400">
                  Your changes have been saved successfully.
                </p>
              </div>
            </div>
          </div>

          <!-- Info -->
          <div class="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-4 rounded">
            <div class="flex items-start gap-3">
              <span class="text-blue-600 dark:text-blue-400 text-xl">ℹ</span>
              <div>
                <p class="font-medium text-blue-700 dark:text-blue-300">
                  Information
                </p>
                <p class="text-sm text-blue-600 dark:text-blue-400">
                  New features are available in this version.
                </p>
              </div>
            </div>
          </div>

          <!-- Warning -->
          <div class="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 rounded">
            <div class="flex items-start gap-3">
              <span class="text-amber-600 dark:text-amber-400 text-xl">⚠</span>
              <div>
                <p class="font-medium text-amber-700 dark:text-amber-300">
                  Warning
                </p>
                <p class="text-sm text-amber-600 dark:text-amber-400">
                  Your session will expire in 5 minutes.
                </p>
              </div>
            </div>
          </div>

          <!-- Error -->
          <div class="bg-red-50 dark:bg-red-950/20 border-l-4 border-red-500 p-4 rounded">
            <div class="flex items-start gap-3">
              <span class="text-red-600 dark:text-red-400 text-xl">✗</span>
              <div>
                <p class="font-medium text-red-700 dark:text-red-300">
                  Error
                </p>
                <p class="text-sm text-red-600 dark:text-red-400">
                  Failed to connect to the server. Please try again.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </section>

    <!-- Responsive Example -->
    <section>
      <Card variant="outline" padding="lg">
        <h2 class="text-2xl font-bold text-foreground mb-4">Responsive Design</h2>
        <p class="text-muted-foreground mb-6">
          Resize your browser to see responsive behavior in action.
        </p>

        <div class="space-y-4">
          <!-- Responsive Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div class="bg-blue-100 dark:bg-blue-900/30 p-4 rounded text-center">
              <p class="text-sm font-medium">Column</p>
            </div>
            <div class="bg-purple-100 dark:bg-purple-900/30 p-4 rounded text-center">
              <p class="text-sm font-medium">Column</p>
            </div>
            <div class="bg-teal-100 dark:bg-teal-900/30 p-4 rounded text-center">
              <p class="text-sm font-medium">Column</p>
            </div>
            <div class="bg-amber-100 dark:bg-amber-900/30 p-4 rounded text-center">
              <p class="text-sm font-medium">Column</p>
            </div>
          </div>

          <!-- Responsive Text -->
          <div class="bg-muted p-6 rounded">
            <p class="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-foreground">
              This text grows with screen size
            </p>
          </div>

          <!-- Responsive Padding -->
          <div class="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 sm:p-4 md:p-6 lg:p-8 xl:p-12 rounded">
            <p class="text-center">Padding increases on larger screens</p>
          </div>
        </div>
      </Card>
    </section>

    <!-- Documentation Links -->
    <div class="text-center space-y-4">
      <h3 class="text-xl font-semibold text-foreground">Learn More</h3>
      <div class="flex gap-4 justify-center flex-wrap">
        <Button variant="outline">
          <a href="/docs/TAILWIND_THEMING_GUIDE.md">Theming Guide</a>
        </Button>
        <Button variant="outline">
          <a href="/docs/COLOR_QUICK_REFERENCE.md">Quick Reference</a>
        </Button>
        <Button variant="outline">
          <a href="https://tailwindcss.com/docs/colors" target="_blank">Tailwind Docs</a>
        </Button>
      </div>
    </div>
  </div>
</template>
