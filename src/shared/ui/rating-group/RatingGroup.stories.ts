import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RatingGroup from './RatingGroup.vue'

const meta = {
  title: 'UI/RatingGroup',
  component: RatingGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'yellow'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    count: {
      control: 'number',
      description: 'Number of stars',
    },
    allowHalf: {
      control: 'boolean',
      description: 'Allow half-star ratings',
    },
    readOnly: {
      control: 'boolean',
      description: 'Read-only mode',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    count: 5,
    allowHalf: false,
    readOnly: false,
  },
} satisfies Meta<typeof RatingGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Rate this product',
    defaultValue: 3,
  },
}

export const Yellow: Story = {
  args: {
    variant: 'yellow',
    label: 'Your rating',
    defaultValue: 4,
  },
}

export const WithHalfStars: Story = {
  args: {
    label: 'Rating (half stars allowed)',
    allowHalf: true,
    defaultValue: 3.5,
  },
}

export const ReadOnly: Story = {
  args: {
    label: 'Average rating',
    readOnly: true,
    defaultValue: 4.5,
    allowHalf: true,
  },
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    label: 'Small rating',
    defaultValue: 4,
  },
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    label: 'Large rating',
    defaultValue: 5,
  },
}

export const TenStars: Story = {
  args: {
    label: 'Rate out of 10',
    count: 10,
    defaultValue: 7,
  },
}

export const AllSizes: Story = {
  args: {
    defaultValue: 3,
  },
  render: (args) => ({
    components: { RatingGroup },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-semibold mb-3">Small</h3>
          <RatingGroup size="sm" label="Small" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Medium</h3>
          <RatingGroup size="md" label="Medium" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Large</h3>
          <RatingGroup size="lg" label="Large" v-bind="args" />
        </div>
      </div>
    `,
  }),
}
