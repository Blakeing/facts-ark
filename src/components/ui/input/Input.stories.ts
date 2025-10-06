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
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'HTML input type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the input has validation errors',
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
    invalid: false,
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

export const Invalid: Story = {
  args: {
    invalid: true,
    placeholder: 'Invalid input',
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
        <Input size="sm" placeholder="Small input" />
        <Input size="md" placeholder="Medium input" />
        <Input size="lg" placeholder="Large input" />
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
