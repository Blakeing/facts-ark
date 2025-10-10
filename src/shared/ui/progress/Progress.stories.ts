import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Progress from './Progress.vue'

const meta = {
  title: 'UI/Progress',
  component: Progress,
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
    modelValue: {
      control: { type: 'range', min: 0, max: 100, step: 1 },
      description: 'Progress value',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    showValue: false,
    modelValue: 50,
  },
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    modelValue: 50,
  },
}

export const WithLabel: Story = {
  args: {
    variant: 'default',
    label: 'Loading...',
    modelValue: 65,
  },
}

export const WithValue: Story = {
  args: {
    variant: 'default',
    label: 'Progress',
    showValue: true,
    modelValue: 75,
  },
}

export const Success: Story = {
  args: {
    variant: 'success',
    label: 'Upload complete',
    showValue: true,
    modelValue: 100,
  },
}

export const Warning: Story = {
  args: {
    variant: 'warning',
    label: 'Storage almost full',
    showValue: true,
    modelValue: 85,
  },
}

export const Danger: Story = {
  args: {
    variant: 'danger',
    label: 'Critical',
    showValue: true,
    modelValue: 95,
  },
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    label: 'Small progress bar',
    modelValue: 60,
  },
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    label: 'Large progress bar',
    showValue: true,
    modelValue: 70,
  },
}

export const Animated: Story = {
  render: (args) => ({
    components: { Progress },
    setup() {
      const progress = ref(0)
      const interval = setInterval(() => {
        if (progress.value >= 100) {
          progress.value = 0
        } else {
          progress.value += 1
        }
      }, 50)

      return { args, progress, interval }
    },
    template: `
      <Progress
        v-bind="args"
        :model-value="progress"
        label="Simulated progress"
        :show-value="true"
      />
    `,
  }),
}

export const AllVariants: Story = {
  args: {
    modelValue: 60,
  },
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-semibold mb-3">Default</h3>
          <Progress variant="default" label="Default" :show-value="true" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Success</h3>
          <Progress variant="success" label="Success" :show-value="true" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Warning</h3>
          <Progress variant="warning" label="Warning" :show-value="true" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Danger</h3>
          <Progress variant="danger" label="Danger" :show-value="true" v-bind="args" />
        </div>
      </div>
    `,
  }),
}

export const AllSizes: Story = {
  args: {
    modelValue: 70,
  },
  render: (args) => ({
    components: { Progress },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-semibold mb-3">Small</h3>
          <Progress size="sm" label="Small" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Medium</h3>
          <Progress size="md" label="Medium" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Large</h3>
          <Progress size="lg" label="Large" v-bind="args" />
        </div>
      </div>
    `,
  }),
}
