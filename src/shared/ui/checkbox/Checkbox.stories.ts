import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Checkbox from './Checkbox.vue'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Checkbox label text',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the checkbox',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
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
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
}

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    checked: true,
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
}

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
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
        story: 'Checkbox can be used without a label for custom layouts.',
      },
    },
  },
}

export const Small: Story = {
  args: {
    label: 'Small checkbox',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    label: 'Medium checkbox',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    label: 'Large checkbox',
    size: 'lg',
  },
}

export const AllSizes: Story = {
  args: {},
  render: () => ({
    components: { Checkbox },
    template: `
      <div class="flex flex-col gap-4">
        <Checkbox label="Small checkbox" size="sm" />
        <Checkbox label="Medium checkbox" size="md" />
        <Checkbox label="Large checkbox" size="lg" />
      </div>
    `,
  }),
}

export const Interactive: Story = {
  args: {},
  render: () => ({
    components: { Checkbox },
    setup() {
      const isChecked = ref(false)
      return { isChecked }
    },
    template: `
      <div class="flex flex-col gap-3">
        <Checkbox
          v-model:checked="isChecked"
          label="Toggle me"
        />
        <p class="text-sm text-gray-600">Checked: {{ isChecked }}</p>
      </div>
    `,
  }),
}

export const Group: Story = {
  args: {},
  render: () => ({
    components: { Checkbox },
    setup() {
      const preferences = ref({
        email: true,
        sms: false,
        push: true,
      })
      return { preferences }
    },
    template: `
      <div class="flex flex-col gap-3">
        <h3 class="text-sm font-semibold text-gray-900 mb-2">Notification Preferences</h3>
        <Checkbox
          v-model:checked="preferences.email"
          label="Email notifications"
        />
        <Checkbox
          v-model:checked="preferences.sms"
          label="SMS notifications"
        />
        <Checkbox
          v-model:checked="preferences.push"
          label="Push notifications"
        />
        <div class="mt-3 p-3 bg-gray-50 rounded text-xs">
          <pre>{{ JSON.stringify(preferences, null, 2) }}</pre>
        </div>
      </div>
    `,
  }),
}
