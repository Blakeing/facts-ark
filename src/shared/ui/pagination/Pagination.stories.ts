import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Pagination from './Pagination.vue'

const meta = {
  title: 'UI/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'simple'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    count: {
      control: 'number',
      description: 'Total count of items',
    },
    pageSize: {
      control: 'number',
      description: 'Items per page',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    count: 100,
    pageSize: 10,
    siblingCount: 1,
  },
} satisfies Meta<typeof Pagination>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    count: 100,
    pageSize: 10,
  },
}

export const Simple: Story = {
  args: {
    variant: 'simple',
    count: 100,
    pageSize: 10,
  },
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    count: 100,
    pageSize: 10,
  },
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    count: 100,
    pageSize: 10,
  },
}

export const ManyPages: Story = {
  args: {
    count: 1000,
    pageSize: 10,
    siblingCount: 2,
  },
}

export const FewPages: Story = {
  args: {
    count: 30,
    pageSize: 10,
  },
}

export const AllSizes: Story = {
  args: {
    count: 50,
    pageSize: 10,
  },
  render: (args) => ({
    components: { Pagination },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-semibold mb-3">Small</h3>
          <Pagination size="sm" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Medium</h3>
          <Pagination size="md" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Large</h3>
          <Pagination size="lg" v-bind="args" />
        </div>
      </div>
    `,
  }),
}
