import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Input from './Input.vue'

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'file'],
      description: 'HTML input type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    variant: {
      control: 'select',
      options: ['default', 'error'],
      description: 'Visual variant of the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the input is read-only',
    },
    required: {
      control: 'boolean',
      description: 'Whether the input is required',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
  args: {
    type: 'text',
    size: 'md',
    variant: 'default',
    disabled: false,
    readonly: false,
    required: false,
  },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
  },
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'Enter your email...',
  },
}

export const Password: Story = {
  args: {
    type: 'password',
    placeholder: 'Enter password...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled input',
  },
}

export const ReadOnly: Story = {
  args: {
    readonly: true,
    placeholder: 'Read-only input',
  },
  render: (args) => ({
    components: { Input },
    setup() {
      const value = ref('This is read-only')
      return { args, value }
    },
    template: '<Input v-bind="args" v-model="value" />',
  }),
}

export const Error: Story = {
  args: {
    variant: 'error',
    placeholder: 'Error state input',
  },
}

export const FileUpload: Story = {
  args: {
    type: 'file',
  },
}

export const Required: Story = {
  args: {
    required: true,
    placeholder: 'Required field',
  },
}

export const AllSizes: Story = {
  args: {},
  render: () => ({
    components: { Input },
    template: `
      <div class="flex flex-col gap-4">
        <Input size="sm" placeholder="Small input (h-9)" />
        <Input size="md" placeholder="Medium input (h-10)" />
        <Input size="lg" placeholder="Large input (h-11)" />
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  args: {},
  render: () => ({
    components: { Input },
    template: `
      <div class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium mb-1">Default</label>
          <Input variant="default" placeholder="Default input" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 text-destructive">Error</label>
          <Input variant="error" placeholder="Error input" />
          <p class="text-sm text-destructive mt-1">This field has an error</p>
        </div>
      </div>
    `,
  }),
}

export const WithValue: Story = {
  args: {},
  render: () => ({
    components: { Input },
    setup() {
      const value = ref('Hello World')
      return { value }
    },
    template: `
      <div class="flex flex-col gap-2">
        <Input v-model="value" placeholder="Type something..." />
        <p class="text-sm text-gray-600">Value: {{ value }}</p>
      </div>
    `,
  }),
}
