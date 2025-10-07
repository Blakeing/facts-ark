import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Badge from './Badge.vue'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'primary',
        'secondary',
        'destructive',
        'outline',
        'success',
        'warning',
        'info',
      ],
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

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Primary</Badge>',
  }),
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Destructive</Badge>',
  }),
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Outline</Badge>',
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
      <div class="space-y-4">
        <div>
          <h3 class="text-sm font-medium mb-2">Semantic Variants</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Status Variants</h3>
          <div class="flex flex-wrap gap-2">
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
        </div>
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
          <Badge variant="destructive">Offline</Badge>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm">Info:</span>
          <Badge variant="info">Beta</Badge>
        </div>
      </div>
    `,
  }),
}
