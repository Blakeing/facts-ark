import type { Meta, StoryObj } from '@storybook/vue3-vite'
import HoverCard from './HoverCard.vue'

const meta = {
  title: 'UI/HoverCard',
  component: HoverCard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
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
  },
  args: {
    variant: 'default',
    openDelay: 700,
    closeDelay: 300,
  },
} satisfies Meta<typeof HoverCard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: '@username',
    content: 'User profile information appears here when you hover.',
  },
}

export const WithRichContent: Story = {
  args: {
    trigger: '@johndoe',
  },
  render: (args) => ({
    components: { HoverCard },
    setup() {
      return { args }
    },
    template: `
      <HoverCard v-bind="args">
        <template #trigger>
          <span class="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer">@johndoe</span>
        </template>
        <template #default>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="h-12 w-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                JD
              </div>
              <div>
                <p class="font-semibold text-gray-900">John Doe</p>
                <p class="text-sm text-gray-500">@johndoe</p>
              </div>
            </div>
            <p class="text-sm text-gray-600">
              Software engineer passionate about building great user experiences.
            </p>
            <div class="flex gap-4 text-sm">
              <div>
                <span class="font-semibold text-gray-900">1.2K</span>
                <span class="text-gray-500"> followers</span>
              </div>
              <div>
                <span class="font-semibold text-gray-900">345</span>
                <span class="text-gray-500"> following</span>
              </div>
            </div>
          </div>
        </template>
      </HoverCard>
    `,
  }),
}

export const QuickDelay: Story = {
  args: {
    trigger: 'Quick hover',
    content: 'This appears quickly!',
    openDelay: 200,
    closeDelay: 100,
  },
}
