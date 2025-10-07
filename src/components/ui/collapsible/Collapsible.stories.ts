import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Info, Settings, HelpCircle } from 'lucide-vue-next'
import Collapsible from './Collapsible.vue'

const meta = {
  title: 'UI/Collapsible',
  component: Collapsible,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'ghost'],
      description: 'Visual style variant',
    },
    defaultOpen: {
      control: 'boolean',
      description: 'Initial open state',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
  args: {
    variant: 'default',
    defaultOpen: false,
    disabled: false,
  },
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    trigger: 'Show more information',
    content:
      'This is additional information that can be shown or hidden. It contains helpful details that users might want to see.',
  },
}

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    trigger: 'View details',
    content:
      'Bordered variant provides a clear container for the collapsible content with padding and borders.',
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    trigger: 'Advanced options',
    content: 'Ghost variant has a subtle appearance with hover effects.',
  },
}

export const DefaultOpen: Story = {
  args: {
    variant: 'default',
    trigger: 'Already expanded',
    content: 'This collapsible starts in the open state.',
    defaultOpen: true,
  },
}

export const WithIcon: Story = {
  args: {
    variant: 'bordered',
    trigger: 'Important information',
    icon: Info,
    content: 'This collapsible includes an icon in the trigger to provide visual context.',
  },
}

export const Disabled: Story = {
  args: {
    variant: 'default',
    trigger: 'Disabled collapsible',
    content: 'This content cannot be accessed.',
    disabled: true,
  },
}

export const CustomContent: Story = {
  args: {
    variant: 'bordered',
    trigger: 'User preferences',
  },
  render: (args) => ({
    components: { Collapsible },
    setup() {
      return { args }
    },
    template: `
      <Collapsible v-bind="args">
        <template #content>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Email notifications</span>
              <input type="checkbox" class="rounded border-gray-300" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">Push notifications</span>
              <input type="checkbox" class="rounded border-gray-300" />
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">SMS notifications</span>
              <input type="checkbox" class="rounded border-gray-300" />
            </div>
          </div>
        </template>
      </Collapsible>
    `,
  }),
}

export const MultipleCollapsibles: Story = {
  render: () => ({
    components: { Collapsible, Settings, HelpCircle, Info },
    setup() {
      return { Settings, HelpCircle, Info }
    },
    template: `
      <div class="space-y-4">
        <Collapsible
          variant="bordered"
          trigger="Account Settings"
          :icon="Settings"
          content="Manage your account settings, profile information, and preferences."
        />
        <Collapsible
          variant="bordered"
          trigger="Help & Support"
          :icon="HelpCircle"
          content="Get help with common issues, contact support, or browse our documentation."
        />
        <Collapsible
          variant="bordered"
          trigger="About"
          :icon="Info"
          content="Learn more about our platform, features, and company information."
        />
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  args: {
    trigger: 'Click to expand',
    content: 'This is the collapsible content that can be shown or hidden.',
  },
  render: (args) => ({
    components: { Collapsible },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-semibold mb-3">Default</h3>
          <Collapsible variant="default" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Bordered</h3>
          <Collapsible variant="bordered" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Ghost</h3>
          <Collapsible variant="ghost" v-bind="args" />
        </div>
      </div>
    `,
  }),
}
