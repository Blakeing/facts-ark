import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Slider from './Slider.vue'

const meta = {
  title: 'UI/Slider',
  component: Slider,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    showValue: {
      control: 'boolean',
      description: 'Show value text',
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
    showValue: false,
    min: 0,
    max: 100,
    step: 1,
  },
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    defaultValue: [50],
  },
}

export const WithLabel: Story = {
  args: {
    variant: 'default',
    label: 'Volume',
    defaultValue: [65],
  },
}

export const WithValue: Story = {
  args: {
    variant: 'default',
    label: 'Brightness',
    showValue: true,
    defaultValue: [75],
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Success slider',
    showValue: true,
    defaultValue: [80],
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    label: 'Warning slider',
    showValue: true,
    defaultValue: [85],
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'Danger slider',
    showValue: true,
    defaultValue: [90],
  },
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    label: 'Small slider',
    defaultValue: [60],
  },
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    label: 'Large slider',
    showValue: true,
    defaultValue: [70],
  },
}

export const WithStep: Story = {
  args: {
    variant: 'default',
    label: 'Stepped slider',
    showValue: true,
    min: 0,
    max: 100,
    step: 10,
    defaultValue: [50],
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with step increments of 10.',
      },
    },
  },
}

export const CustomRange: Story = {
  args: {
    variant: 'default',
    label: 'Temperature (°C)',
    showValue: true,
    min: -10,
    max: 40,
    step: 0.5,
    defaultValue: [20],
  },
}

export const RangeSlider: Story = {
  args: {
    variant: 'default',
    label: 'Price range',
    showValue: true,
    min: 0,
    max: 1000,
    step: 10,
    defaultValue: [200, 800],
  },
  parameters: {
    docs: {
      description: {
        story: 'Slider with two thumbs for selecting a range.',
      },
    },
  },
}

export const Disabled: Story = {
  args: {
    variant: 'default',
    label: 'Disabled slider',
    disabled: true,
    defaultValue: [50],
  },
}

export const AllVariants: Story = {
  args: {
    defaultValue: [60],
  },
  render: (args) => ({
    components: { Slider },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-semibold mb-3">Default</h3>
          <Slider variant="default" label="Default" :show-value="true" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Success</h3>
          <Slider variant="success" label="Success" :show-value="true" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Warning</h3>
          <Slider variant="warning" label="Warning" :show-value="true" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Danger</h3>
          <Slider variant="danger" label="Danger" :show-value="true" v-bind="args" />
        </div>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  args: {
    defaultValue: [70],
  },
  render: (args) => ({
    components: { Slider },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-semibold mb-3">Small</h3>
          <Slider size="sm" label="Small" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Medium</h3>
          <Slider size="md" label="Medium" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Large</h3>
          <Slider size="lg" label="Large" v-bind="args" />
        </div>
      </div>
    `,
  }),
}
