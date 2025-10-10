import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Switch from './Switch.vue'

const meta = {
  title: 'UI/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Switch label text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the switch',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled',
    },
    checked: {
      control: 'boolean',
      description: 'Checked state',
    },
  },
  args: {
    size: 'md',
    disabled: false,
    checked: false,
  },
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
}

export const Checked: Story = {
  args: {
    label: 'Enabled feature',
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and on',
    disabled: true,
    checked: true,
  },
}

export const WithoutLabel: Story = {
  args: {
    checked: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Switch can be used without a label for custom layouts.',
      },
    },
  },
}

export const Small: Story = {
  args: {
    label: 'Small switch',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    label: 'Medium switch',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    label: 'Large switch',
    size: 'lg',
  },
}

export const AllSizes: Story = {
  args: {},
  render: () => ({
    components: { Switch },
    template: `
      <div class="flex flex-col gap-4">
        <Switch label="Small switch" size="sm" />
        <Switch label="Medium switch" size="md" />
        <Switch label="Large switch" size="lg" />
      </div>
    `,
  }),
}

export const Interactive: Story = {
  args: {},
  render: () => ({
    components: { Switch },
    setup() {
      const isEnabled = ref(false)
      return { isEnabled }
    },
    template: `
      <div class="flex flex-col gap-3">
        <Switch
          v-model:checked="isEnabled"
          label="Dark mode"
        />
        <p class="text-sm text-gray-600">Status: {{ isEnabled ? 'Enabled' : 'Disabled' }}</p>
      </div>
    `,
  }),
}

export const Settings: Story = {
  args: {},
  render: () => ({
    components: { Switch },
    setup() {
      const settings = ref({
        notifications: true,
        autoSave: false,
        analytics: true,
        darkMode: false,
      })
      return { settings }
    },
    template: `
      <div class="flex flex-col gap-4">
        <h3 class="text-sm font-semibold text-gray-900 mb-2">Settings</h3>
        <Switch
          v-model:checked="settings.notifications"
          label="Push notifications"
        />
        <Switch
          v-model:checked="settings.autoSave"
          label="Auto-save drafts"
        />
        <Switch
          v-model:checked="settings.analytics"
          label="Usage analytics"
        />
        <Switch
          v-model:checked="settings.darkMode"
          label="Dark mode"
        />
        <div class="mt-3 p-3 bg-gray-50 rounded text-xs">
          <pre>{{ JSON.stringify(settings, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
}
