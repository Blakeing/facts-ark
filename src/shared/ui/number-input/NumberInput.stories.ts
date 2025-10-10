import type { Meta, StoryObj } from '@storybook/vue3-vite'
import NumberInput from './NumberInput.vue'

const meta = {
  title: 'UI/NumberInput',
  component: NumberInput,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    min: {
      control: 'number',
      description: 'Minimum value',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    step: {
      control: 'number',
      description: 'Step increment',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    min: 0,
    max: 100,
    step: 1,
  },
} satisfies Meta<typeof NumberInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Quantity',
    defaultValue: '5',
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Amount',
    defaultValue: '10',
  },
}

export const WithRange: Story = {
  args: {
    label: 'Age',
    min: 18,
    max: 99,
    defaultValue: '25',
  },
}

export const WithStep: Story = {
  args: {
    label: 'Price',
    min: 0,
    max: 1000,
    step: 10,
    defaultValue: '50',
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
    defaultValue: '5',
  },
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    label: 'Small input',
    defaultValue: '3',
  },
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    label: 'Large input',
    defaultValue: '8',
  },
}

export const AllSizes: Story = {
  args: {
    defaultValue: '5',
  },
  render: (args) => ({
    components: { NumberInput },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-semibold mb-3">Small</h3>
          <NumberInput size="sm" label="Small" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Medium</h3>
          <NumberInput size="md" label="Medium" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Large</h3>
          <NumberInput size="lg" label="Large" v-bind="args" />
        </div>
      </div>
    `,
  }),
}
