import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Info } from 'lucide-vue-next'
import { Button } from '../button'
import Tooltip from './Tooltip.vue'

const meta = {
  title: 'UI/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'inverse'],
      description: 'Visual style variant',
    },
    openDelay: {
      control: 'number',
      description: 'Delay before showing (ms)',
    },
    closeDelay: {
      control: 'number',
      description: 'Delay before hiding (ms)',
    },
    interactive: {
      control: 'boolean',
      description: 'Allow hovering tooltip content',
    },
  },
  args: {
    variant: 'default',
    openDelay: 700,
    closeDelay: 300,
    interactive: false,
  },
} satisfies Meta<typeof Tooltip>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    trigger: 'Hover me',
    content: 'This is a tooltip',
  },
}

export const Inverse: Story = {
  args: {
    variant: 'inverse',
    trigger: 'Hover me',
    content: 'This is an inverse tooltip',
  },
}

export const WithButton: Story = {
  args: {
    content: 'Click to perform action',
  },
  render: (args) => ({
    components: { Tooltip, Button },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <template #trigger>
          <Button variant="default">Action</Button>
        </template>
      </Tooltip>
    `,
  }),
}

export const WithIcon: Story = {
  args: {
    content: 'Additional information about this feature',
  },
  render: (args) => ({
    components: { Tooltip, Info },
    setup() {
      return { args, Info }
    },
    template: `
      <Tooltip v-bind="args">
        <template #trigger>
          <button class="inline-flex items-center text-gray-500 hover:text-gray-700">
            <Info class="h-4 w-4" />
          </button>
        </template>
      </Tooltip>
    `,
  }),
}

export const Interactive: Story = {
  args: {
    interactive: true,
    content: 'You can hover over this tooltip and interact with it',
  },
  render: (args) => ({
    components: { Tooltip },
    setup() {
      return { args }
    },
    template: `
      <Tooltip v-bind="args">
        <template #trigger>
          <span class="underline decoration-dotted cursor-help">Hover me</span>
        </template>
        <template #default>
          <div>
            <p>{{ args.content }}</p>
            <button class="mt-2 text-xs underline">Click me</button>
          </div>
        </template>
      </Tooltip>
    `,
  }),
}

export const QuickDelay: Story = {
  args: {
    trigger: 'Quick tooltip',
    content: 'This appears quickly',
    openDelay: 100,
    closeDelay: 100,
  },
}

export const LongContent: Story = {
  args: {
    trigger: 'Hover for details',
    content:
      'This is a longer tooltip with more detailed information. It can wrap to multiple lines when needed.',
  },
}

export const AllVariants: Story = {
  render: () => ({
    components: { Tooltip },
    template: `
      <div class="flex gap-4">
        <Tooltip variant="default" trigger="Default" content="Default tooltip style" />
        <Tooltip variant="inverse" trigger="Inverse" content="Inverse tooltip style" />
      </div>
    `,
  }),
}
