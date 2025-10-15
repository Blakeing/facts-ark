import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import ColorPicker from './ColorPicker.vue'

const meta: Meta<typeof ColorPicker> = {
  title: 'UI/ColorPicker',
  component: ColorPicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A Color Picker component with visual color selection.

## Features
- Visual color area for hue/saturation selection
- Hue and alpha sliders
- Multiple color format support (hex, rgb, hsl)
- Eyedropper tool (browser support varies)
- Preset color swatches
- Channel value inputs
- Format switching
- Fully accessible

## Usage

\`\`\`vue
<script setup>
import { ref } from 'vue'
import { ColorPicker } from '@/shared/ui/color-picker'

const selectedColor = ref('#3b82f6')
</script>

<template>
  <ColorPicker
    label="Pick a color"
    v-model="selectedColor"
  />
</template>
\`\`\`

## Common Use Cases
- Theme customization
- Brand color selection
- Design tools
- Text/background color pickers
- Chart/data visualization settings
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic color picker
 */
export const Basic: Story = {
  render: () => ({
    components: { ColorPicker },
    setup() {
      const value = ref('#3b82f6')
      return { value }
    },
    template: `
      <ColorPicker
        label="Pick a color"
        v-model="value"
      />
    `,
  }),
}

/**
 * With helper text
 */
export const WithHelperText: Story = {
  render: () => ({
    components: { ColorPicker },
    setup() {
      const value = ref('#ef4444')
      return { value }
    },
    template: `
      <ColorPicker
        label="Primary color"
        v-model="value"
        helper-text="Choose your primary brand color"
      />
    `,
  }),
}

/**
 * With error
 */
export const WithError: Story = {
  render: () => ({
    components: { ColorPicker },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <ColorPicker
        label="Pick a color"
        v-model="value"
        error="Please select a color"
      />
    `,
  }),
}

/**
 * Without eyedropper
 */
export const WithoutEyeDropper: Story = {
  render: () => ({
    components: { ColorPicker },
    setup() {
      const value = ref('#10b981')
      return { value }
    },
    template: `
      <ColorPicker
        label="Pick a color"
        v-model="value"
        :show-eye-dropper="false"
      />
    `,
  }),
}

/**
 * Custom swatches
 */
export const CustomSwatches: Story = {
  render: () => ({
    components: { ColorPicker },
    setup() {
      const value = ref('#1e293b')
      const brandColors = [
        '#1e293b', // slate-800
        '#0f172a', // slate-900
        '#3b82f6', // blue-500
        '#2563eb', // blue-600
        '#6366f1', // indigo-500
        '#4f46e5', // indigo-600
      ]
      return { value, brandColors }
    },
    template: `
      <ColorPicker
        label="Brand color"
        v-model="value"
        :swatches="brandColors"
        helper-text="Select from brand colors"
      />
    `,
  }),
}

/**
 * No swatches
 */
export const NoSwatches: Story = {
  render: () => ({
    components: { ColorPicker },
    setup() {
      const value = ref('#f59e0b')
      return { value }
    },
    template: `
      <ColorPicker
        label="Pick a color"
        v-model="value"
        :swatches="[]"
      />
    `,
  }),
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => ({
    components: { ColorPicker },
    setup() {
      const value = ref('#8b5cf6')
      return { value }
    },
    template: `
      <ColorPicker
        label="Pick a color"
        v-model="value"
        disabled
        helper-text="Color selection is disabled"
      />
    `,
  }),
}

/**
 * Theme customization
 */
export const ThemeCustomization: Story = {
  render: () => ({
    components: { ColorPicker },
    setup() {
      const primaryColor = ref('#3b82f6')
      const secondaryColor = ref('#8b5cf6')
      const accentColor = ref('#ec4899')
      return { primaryColor, secondaryColor, accentColor }
    },
    template: `
      <div class="max-w-md space-y-6">
        <h3 class="text-lg font-semibold">Theme Colors</h3>
        <ColorPicker
          label="Primary color"
          v-model="primaryColor"
          helper-text="Main brand color"
        />
        <ColorPicker
          label="Secondary color"
          v-model="secondaryColor"
          helper-text="Supporting brand color"
        />
        <ColorPicker
          label="Accent color"
          v-model="accentColor"
          helper-text="Highlight and CTA color"
        />
      </div>
    `,
  }),
}

/**
 * UI color settings
 */
export const UISettings: Story = {
  render: () => ({
    components: { ColorPicker },
    setup() {
      const textColor = ref('#0f172a')
      const backgroundColor = ref('#ffffff')
      const borderColor = ref('#e2e8f0')
      return { textColor, backgroundColor, borderColor }
    },
    template: `
      <div class="max-w-md space-y-6">
        <h3 class="text-lg font-semibold">UI Color Settings</h3>
        <ColorPicker
          label="Text color"
          v-model="textColor"
        />
        <ColorPicker
          label="Background color"
          v-model="backgroundColor"
        />
        <ColorPicker
          label="Border color"
          v-model="borderColor"
        />

        <!-- Preview -->
        <div
          class="p-6 rounded-lg border-2"
          :style="{
            color: textColor,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
          }"
        >
          <h4 class="font-semibold mb-2">Preview</h4>
          <p class="text-sm">This is how your colors look together.</p>
        </div>
      </div>
    `,
  }),
}

/**
 * Chart colors
 */
export const ChartColors: Story = {
  render: () => ({
    components: { ColorPicker },
    setup() {
      const colors = ref({
        line1: '#3b82f6',
        line2: '#ef4444',
        line3: '#10b981',
        line4: '#f59e0b',
      })

      const chartSwatches = [
        '#3b82f6',
        '#ef4444',
        '#10b981',
        '#f59e0b',
        '#8b5cf6',
        '#ec4899',
        '#06b6d4',
        '#84cc16',
      ]

      return { colors, chartSwatches }
    },
    template: `
      <div class="max-w-md space-y-6">
        <h3 class="text-lg font-semibold">Chart Line Colors</h3>
        <ColorPicker
          label="Dataset 1"
          v-model="colors.line1"
          :swatches="chartSwatches"
        />
        <ColorPicker
          label="Dataset 2"
          v-model="colors.line2"
          :swatches="chartSwatches"
        />
        <ColorPicker
          label="Dataset 3"
          v-model="colors.line3"
          :swatches="chartSwatches"
        />
        <ColorPicker
          label="Dataset 4"
          v-model="colors.line4"
          :swatches="chartSwatches"
        />
      </div>
    `,
  }),
}

/**
 * Read-only
 */
export const ReadOnly: Story = {
  render: () => ({
    components: { ColorPicker },
    setup() {
      const value = ref('#6366f1')
      return { value }
    },
    template: `
      <ColorPicker
        label="Selected color"
        v-model="value"
        :readonly="true"
        helper-text="This color cannot be changed"
      />
    `,
  }),
}

/**
 * With events
 */
export const WithEvents: Story = {
  render: () => ({
    components: { ColorPicker },
    setup() {
      const value = ref('#3b82f6')
      const log = ref<string[]>([])

      const handleChange = (details: { value: string }) => {
        log.value.push(`Color changed: ${details.value}`)
      }

      const handleOpen = () => {
        log.value.push('Color picker opened')
      }

      const handleClose = () => {
        log.value.push('Color picker closed')
      }

      return { value, log, handleChange, handleOpen, handleClose }
    },
    template: `
      <div class="space-y-4">
        <ColorPicker
          label="Pick a color"
          v-model="value"
          @value-change="handleChange"
          @open-change="(e) => e.open ? handleOpen() : handleClose()"
        />

        <div class="border border-border rounded-lg p-4 space-y-2">
          <p class="text-sm font-medium">Event Log:</p>
          <div class="text-xs text-muted-foreground space-y-1 max-h-32 overflow-auto">
            <p v-for="(entry, index) in log.slice(-5)" :key="index">
              {{ entry }}
            </p>
            <p v-if="log.length === 0" class="italic">
              No events yet. Change the color or open the picker.
            </p>
          </div>
        </div>
      </div>
    `,
  }),
}
