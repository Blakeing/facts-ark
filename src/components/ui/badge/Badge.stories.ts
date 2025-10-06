import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Badge from './Badge.vue'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'error', 'info'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the badge',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
  },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
}

export const Success: Story = {
  args: {
    variant: 'success',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Success</Badge>',
  }),
}

export const Warning: Story = {
  args: {
    variant: 'warning',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Warning</Badge>',
  }),
}

export const Error: Story = {
  args: {
    variant: 'error',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Error</Badge>',
  }),
}

export const Info: Story = {
  args: {
    variant: 'info',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Info</Badge>',
  }),
}

export const AllVariants: Story = {
  args: {},
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-wrap gap-2">
        <Badge variant="default">Default</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="error">Error</Badge>
        <Badge variant="info">Info</Badge>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  args: {},
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex items-center gap-2">
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    `,
  }),
}

export const WithStatus: Story = {
  args: {},
  render: () => ({
    components: { Badge },
    template: `
      <div class="flex flex-col gap-3">
        <div class="flex items-center gap-2">
          <span class="text-sm">Active:</span>
          <Badge variant="success">Online</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm">Pending:</span>
          <Badge variant="warning">In Progress</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm">Failed:</span>
          <Badge variant="error">Offline</Badge>
        </div>
      </div>
    `,
  }),
}
