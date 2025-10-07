import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Select from './Select.vue'

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select',
    },
    label: {
      control: 'text',
      description: 'Label for the select',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the select is disabled',
    },
  },
  args: {
    size: 'md',
    placeholder: 'Select an option',
    disabled: false,
  },
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
]

export const Default: Story = {
  args: {
    items: frameworks,
  },
  render: (args) => ({
    components: { Select },
    setup() {
      const selected = ref<string[]>([])
      return { args, selected, frameworks }
    },
    template: `
      <Select
        v-bind="args"
        v-model="selected"
        :items="frameworks"
        label="Framework"
      />
    `,
  }),
}

export const WithSelection: Story = {
  args: {
    items: frameworks,
  },
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref<string[]>(['vue'])
      return { selected, frameworks }
    },
    template: `
      <Select
        v-model="selected"
        :items="frameworks"
        label="Framework"
        placeholder="Select a framework"
      />
    `,
  }),
}

export const WithDescriptions: Story = {
  args: {
    items: frameworks,
  },
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref<string[]>([])
      const items = [
        {
          value: 'react',
          label: 'React',
          description: 'A JavaScript library for building user interfaces',
        },
        { value: 'vue', label: 'Vue.js', description: 'The Progressive JavaScript Framework' },
        {
          value: 'angular',
          label: 'Angular',
          description: 'Platform for building mobile and desktop apps',
        },
      ]
      return { selected, items }
    },
    template: `
      <Select
        v-model="selected"
        :items="items"
        label="Framework"
        placeholder="Choose your framework"
      />
    `,
  }),
}

export const WithAvatars: Story = {
  args: {
    items: frameworks,
  },
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref<string[]>([])
      const people = [
        {
          value: 'sarah',
          label: 'Sarah Johnson',
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        },
        {
          value: 'mike',
          label: 'Mike Chen',
          avatar:
            'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop',
        },
        {
          value: 'emma',
          label: 'Emma Davis',
          avatar:
            'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        },
      ]
      return { selected, people }
    },
    template: `
      <Select
        v-model="selected"
        :items="people"
        label="Assign to"
        placeholder="Select a person"
      />
    `,
  }),
}

export const WithStatus: Story = {
  args: {
    items: frameworks,
  },
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref<string[]>([])
      const users = [
        { value: 'sarah', label: 'Sarah Johnson', status: 'online' as const },
        { value: 'mike', label: 'Mike Chen', status: 'online' as const },
        { value: 'emma', label: 'Emma Davis', status: 'offline' as const },
        { value: 'john', label: 'John Smith', status: 'offline' as const },
      ]
      return { selected, users }
    },
    template: `
      <Select
        v-model="selected"
        :items="users"
        label="User"
        placeholder="Select a user"
      />
    `,
  }),
}

export const Grouped: Story = {
  args: {
    items: frameworks,
  },
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref<string[]>([])
      const technologies = [
        {
          label: 'Frontend',
          items: [
            { value: 'react', label: 'React' },
            { value: 'vue', label: 'Vue' },
            { value: 'svelte', label: 'Svelte' },
          ],
        },
        {
          label: 'Backend',
          items: [
            { value: 'node', label: 'Node.js' },
            { value: 'django', label: 'Django' },
            { value: 'rails', label: 'Ruby on Rails' },
          ],
        },
        {
          label: 'Database',
          items: [
            { value: 'postgres', label: 'PostgreSQL' },
            { value: 'mongo', label: 'MongoDB' },
            { value: 'redis', label: 'Redis' },
          ],
        },
      ]
      return { selected, technologies }
    },
    template: `
      <Select
        v-model="selected"
        :items="technologies"
        label="Technology"
        placeholder="Select a technology"
      />
    `,
  }),
}

export const Disabled: Story = {
  args: {
    items: frameworks,
  },
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref<string[]>([])
      return { selected, frameworks }
    },
    template: `
      <Select
        v-model="selected"
        :items="frameworks"
        label="Framework"
        disabled
      />
    `,
  }),
}

export const Small: Story = {
  args: {
    items: frameworks,
  },
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref<string[]>([])
      return { selected, frameworks }
    },
    template: `
      <Select
        v-model="selected"
        :items="frameworks"
        label="Framework"
        size="sm"
      />
    `,
  }),
}

export const Large: Story = {
  args: {
    items: frameworks,
  },
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref<string[]>([])
      return { selected, frameworks }
    },
    template: `
      <Select
        v-model="selected"
        :items="frameworks"
        label="Framework"
        size="lg"
      />
    `,
  }),
}

export const Interactive: Story = {
  args: {
    items: frameworks,
  },
  render: () => ({
    components: { Select },
    setup() {
      const selected = ref<string[]>([])
      return { selected, frameworks }
    },
    template: `
      <div class="flex flex-col gap-3">
        <Select
          v-model="selected"
          :items="frameworks"
          label="Favorite Framework"
          placeholder="Choose one"
        />
        <p class="text-sm text-gray-600">
          Selected: {{ selected[0] || 'None' }}
        </p>
      </div>
    `,
  }),
}
