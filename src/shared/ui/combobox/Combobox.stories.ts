import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Combobox from './Combobox.vue'

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
  { label: 'Solid', value: 'solid' },
  { label: 'Angular', value: 'angular' },
  { label: 'Ember', value: 'ember' },
  { label: 'Preact', value: 'preact' },
]

const countries = [
  { label: 'United States', value: 'us' },
  { label: 'United Kingdom', value: 'uk' },
  { label: 'Canada', value: 'ca' },
  { label: 'Australia', value: 'au' },
  { label: 'Germany', value: 'de' },
  { label: 'France', value: 'fr' },
  { label: 'Japan', value: 'jp' },
  { label: 'China', value: 'cn' },
  { label: 'India', value: 'in' },
  { label: 'Brazil', value: 'br' },
]

const meta: Meta<typeof Combobox> = {
  title: 'UI/Combobox',
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: Combobox as any,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the combobox',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
A Combobox component that combines a text input with a dropdown list.

## Features
- Search/filter items as you type
- Keyboard navigation
- Single or multiple selection
- Custom item rendering
- Auto-complete functionality
- Fully accessible (ARIA compliant)

## Usage

\`\`\`vue
<script setup>
import { ref } from 'vue'
import { Combobox } from '@/shared/ui/combobox'

const frameworks = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Svelte', value: 'svelte' },
]

const selected = ref([])
</script>

<template>
  <Combobox
    label="Select framework"
    :items="frameworks"
    placeholder="Search frameworks..."
    v-model="selected"
  />
</template>
\`\`\`

## When to Use Combobox vs Select
- **Combobox**: Large lists that benefit from search (countries, users, products)
- **Select**: Small lists (5-10 items) that don't need search
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic combobox with search
 */
export const Basic: Story = {
  render: () => ({
    components: { Combobox },
    setup() {
      return { frameworks }
    },
    template: `
      <Combobox
        label="Select framework"
        :items="frameworks"
        placeholder="Search frameworks..."
      />
    `,
  }),
}

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => ({
    components: { Combobox },
    setup() {
      return { frameworks }
    },
    template: `
      <div class="space-y-6">
        <Combobox
          size="sm"
          label="Small"
          :items="frameworks"
          placeholder="Small combobox"
        />
        <Combobox
          size="md"
          label="Medium"
          :items="frameworks"
          placeholder="Medium combobox"
        />
        <Combobox
          size="lg"
          label="Large"
          :items="frameworks"
          placeholder="Large combobox"
        />
      </div>
    `,
  }),
}

/**
 * With helper text
 */
export const WithHelperText: Story = {
  render: () => ({
    components: { Combobox },
    setup() {
      return { frameworks }
    },
    template: `
      <Combobox
        label="Select framework"
        :items="frameworks"
        placeholder="Search frameworks..."
        helper-text="Choose your preferred framework"
      />
    `,
  }),
}

/**
 * With validation error
 */
export const WithError: Story = {
  render: () => ({
    components: { Combobox },
    setup() {
      return { frameworks }
    },
    template: `
      <Combobox
        label="Select framework"
        :items="frameworks"
        placeholder="Search frameworks..."
        error="Please select a framework"
      />
    `,
  }),
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => ({
    components: { Combobox },
    setup() {
      return { frameworks }
    },
    template: `
      <Combobox
        label="Select framework"
        :items="frameworks"
        placeholder="Search frameworks..."
        disabled
      />
    `,
  }),
}

/**
 * Long list (countries)
 */
export const LongList: Story = {
  render: () => ({
    components: { Combobox },
    setup() {
      return { countries }
    },
    template: `
      <Combobox
        label="Select country"
        :items="countries"
        placeholder="Search countries..."
        helper-text="Start typing to filter the list"
      />
    `,
  }),
}

/**
 * Multiple selection
 */
export const Multiple: Story = {
  render: () => ({
    components: { Combobox },
    setup() {
      const selected = ref([])
      return { frameworks, selected }
    },
    template: `
      <div class="space-y-4">
        <Combobox
          label="Select frameworks"
          :items="frameworks"
          placeholder="Search frameworks..."
          :multiple="true"
          v-model="selected"
        />
        <div v-if="selected.length" class="text-sm text-muted-foreground">
          Selected: {{ selected.join(', ') }}
        </div>
      </div>
    `,
  }),
}

/**
 * Country selector example
 */
export const CountrySelector: Story = {
  render: () => ({
    components: { Combobox },
    setup() {
      const allCountries = [
        { label: '🇺🇸 United States', value: 'us' },
        { label: '🇬🇧 United Kingdom', value: 'uk' },
        { label: '🇨🇦 Canada', value: 'ca' },
        { label: '🇦🇺 Australia', value: 'au' },
        { label: '🇩🇪 Germany', value: 'de' },
        { label: '🇫🇷 France', value: 'fr' },
        { label: '🇯🇵 Japan', value: 'jp' },
        { label: '🇨🇳 China', value: 'cn' },
        { label: '🇮🇳 India', value: 'in' },
        { label: '🇧🇷 Brazil', value: 'br' },
        { label: '🇲🇽 Mexico', value: 'mx' },
        { label: '🇪🇸 Spain', value: 'es' },
        { label: '🇮🇹 Italy', value: 'it' },
        { label: '🇰🇷 South Korea', value: 'kr' },
        { label: '🇷🇺 Russia', value: 'ru' },
      ]
      return { allCountries }
    },
    template: `
      <Combobox
        label="Country"
        :items="allCountries"
        placeholder="Select your country..."
        helper-text="Select where you're located"
      />
    `,
  }),
}

/**
 * User search example
 */
export const UserSearch: Story = {
  render: () => ({
    components: { Combobox },
    setup() {
      const users = [
        { label: 'John Doe (john@example.com)', value: 'john' },
        { label: 'Jane Smith (jane@example.com)', value: 'jane' },
        { label: 'Bob Johnson (bob@example.com)', value: 'bob' },
        { label: 'Alice Williams (alice@example.com)', value: 'alice' },
        { label: 'Charlie Brown (charlie@example.com)', value: 'charlie' },
      ]
      return { users }
    },
    template: `
      <Combobox
        label="Assign to"
        :items="users"
        placeholder="Search by name or email..."
        helper-text="Start typing to find a user"
      />
    `,
  }),
}

/**
 * Form example
 */
export const InForm: Story = {
  render: () => ({
    components: { Combobox },
    setup() {
      const selectedCountry = ref('')
      const selectedFrameworks = ref([])

      const handleSubmit = () => {
        alert(
          `Country: ${selectedCountry.value}\\nFrameworks: ${selectedFrameworks.value.join(', ')}`,
        )
      }

      return { countries, frameworks, selectedCountry, selectedFrameworks, handleSubmit }
    },
    template: `
      <form @submit.prevent="handleSubmit" class="max-w-md space-y-4">
        <Combobox
          label="Country"
          :items="countries"
          placeholder="Select your country..."
          v-model="selectedCountry"
          required
        />

        <Combobox
          label="Frameworks (optional)"
          :items="frameworks"
          placeholder="Select frameworks..."
          :multiple="true"
          v-model="selectedFrameworks"
          helper-text="You can select multiple"
        />

        <button
          type="submit"
          class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Submit
        </button>
      </form>
    `,
  }),
}

/**
 * Read-only state
 */
export const ReadOnly: Story = {
  render: () => ({
    components: { Combobox },
    setup() {
      return { frameworks }
    },
    template: `
      <Combobox
        label="Framework"
        :items="frameworks"
        placeholder="React"
        :readonly="true"
        helper-text="This field is read-only"
      />
    `,
  }),
}
