import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-vue-next'
import Toggle from './Toggle.vue'

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline', 'subtle'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the toggle button',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
  },
  parameters: {
    docs: {
      description: {
        component: `
A Toggle component for toolbar buttons and binary states.

## When to Use Toggle vs Switch
- **Toggle**: Toolbar buttons (bold, italic, formatting) - immediate action
- **Switch**: Settings/preferences (enable/disable features) - typically requires save/apply

## Features
- Multiple visual variants
- Icon and text support
- Fully keyboard accessible
- ARIA compliant

## Usage

\`\`\`vue
<script setup>
import { ref } from 'vue'
import { Toggle } from '@/shared/ui/toggle'
import { Bold } from 'lucide-vue-next'

const isBold = ref(false)
</script>

<template>
  <Toggle
    v-model:pressed="isBold"
    aria-label="Toggle bold"
  >
    <Bold class="size-4" />
  </Toggle>
</template>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic toggle with icon
 */
export const Basic: Story = {
  render: () => ({
    components: { Toggle, Bold },
    template: `
      <Toggle aria-label="Toggle bold">
        <Bold class="size-4" />
      </Toggle>
    `,
  }),
}

/**
 * Different variants
 */
export const Variants: Story = {
  render: () => ({
    components: { Toggle, Bold },
    template: `
      <div class="flex gap-3">
        <Toggle variant="default" aria-label="Bold (default)">
          <Bold class="size-4" />
        </Toggle>
        <Toggle variant="outline" aria-label="Bold (outline)">
          <Bold class="size-4" />
        </Toggle>
        <Toggle variant="subtle" aria-label="Bold (subtle)">
          <Bold class="size-4" />
        </Toggle>
      </div>
    `,
  }),
}

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => ({
    components: { Toggle, Bold },
    template: `
      <div class="flex items-center gap-3">
        <Toggle size="sm" aria-label="Small bold">
          <Bold class="size-3" />
        </Toggle>
        <Toggle size="md" aria-label="Medium bold">
          <Bold class="size-4" />
        </Toggle>
        <Toggle size="lg" aria-label="Large bold">
          <Bold class="size-5" />
        </Toggle>
      </div>
    `,
  }),
}

/**
 * Text formatting toolbar
 */
export const TextFormatting: Story = {
  render: () => ({
    components: { Toggle, Bold, Italic, Underline },
    template: `
      <div class="flex gap-1 border border-border rounded-md p-1">
        <Toggle variant="subtle" aria-label="Toggle bold">
          <Bold class="size-4" />
        </Toggle>
        <Toggle variant="subtle" aria-label="Toggle italic">
          <Italic class="size-4" />
        </Toggle>
        <Toggle variant="subtle" aria-label="Toggle underline">
          <Underline class="size-4" />
        </Toggle>
      </div>
    `,
  }),
}

/**
 * Text alignment toolbar
 */
export const TextAlignment: Story = {
  render: () => ({
    components: { Toggle, AlignLeft, AlignCenter, AlignRight },
    template: `
      <div class="flex gap-1 border border-border rounded-md p-1">
        <Toggle variant="subtle" aria-label="Align left">
          <AlignLeft class="size-4" />
        </Toggle>
        <Toggle variant="subtle" aria-label="Align center">
          <AlignCenter class="size-4" />
        </Toggle>
        <Toggle variant="subtle" aria-label="Align right">
          <AlignRight class="size-4" />
        </Toggle>
      </div>
    `,
  }),
}

/**
 * With text label
 */
export const WithText: Story = {
  render: () => ({
    components: { Toggle },
    template: `
      <div class="flex gap-3">
        <Toggle aria-label="Toggle preview">
          Preview
        </Toggle>
        <Toggle variant="outline" aria-label="Toggle code">
          Code
        </Toggle>
        <Toggle variant="subtle" aria-label="Toggle split view">
          Split
        </Toggle>
      </div>
    `,
  }),
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => ({
    components: { Toggle, Bold },
    template: `
      <div class="flex gap-3">
        <Toggle disabled aria-label="Bold (disabled)">
          <Bold class="size-4" />
        </Toggle>
        <Toggle variant="outline" disabled aria-label="Bold outline (disabled)">
          <Bold class="size-4" />
        </Toggle>
      </div>
    `,
  }),
}

/**
 * Pressed state (default on)
 */
export const Pressed: Story = {
  render: () => ({
    components: { Toggle, Bold },
    template: `
      <Toggle :pressed="true" aria-label="Bold (pressed)">
        <Bold class="size-4" />
      </Toggle>
    `,
  }),
}

/**
 * Complete editor toolbar example
 */
export const EditorToolbar: Story = {
  render: () => ({
    components: {
      Toggle,
      Bold,
      Italic,
      Underline,
      AlignLeft,
      AlignCenter,
      AlignRight,
    },
    template: `
      <div class="flex gap-2 p-2 border border-border rounded-lg bg-background">
        <!-- Text formatting -->
        <div class="flex gap-1">
          <Toggle variant="subtle" size="sm" aria-label="Bold">
            <Bold class="size-4" />
          </Toggle>
          <Toggle variant="subtle" size="sm" aria-label="Italic">
            <Italic class="size-4" />
          </Toggle>
          <Toggle variant="subtle" size="sm" aria-label="Underline">
            <Underline class="size-4" />
          </Toggle>
        </div>

        <!-- Divider -->
        <div class="w-px bg-border" />

        <!-- Text alignment -->
        <div class="flex gap-1">
          <Toggle variant="subtle" size="sm" aria-label="Align left">
            <AlignLeft class="size-4" />
          </Toggle>
          <Toggle variant="subtle" size="sm" aria-label="Align center">
            <AlignCenter class="size-4" />
          </Toggle>
          <Toggle variant="subtle" size="sm" aria-label="Align right">
            <AlignRight class="size-4" />
          </Toggle>
        </div>
      </div>
    `,
  }),
}
