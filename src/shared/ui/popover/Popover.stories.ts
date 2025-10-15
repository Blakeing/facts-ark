import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '../button'
import Popover from './Popover.vue'

const meta = {
  title: 'UI/Popover',
  component: Popover,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
      description: 'Visual style variant',
    },
    showClose: {
      control: 'boolean',
      description: 'Show close button',
    },
  },
  args: {
    variant: 'default',
    showClose: true,
  },
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: 'Open Popover',
    title: 'Popover Title',
    description: 'This is the popover description text.',
  },
}

export const WithCustomContent: Story = {
  args: {
    trigger: 'View Details',
    title: 'User Information',
  },
  render: (args) => ({
    components: { Popover },
    setup() {
      return { args }
    },
    template: `
      <Popover v-bind="args">
        <template #content>
          <div class="space-y-2">
            <div class="flex items-center gap-2">
              <span class="font-medium">Email:</span>
              <span class="text-gray-600">user@example.com</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium">Role:</span>
              <span class="text-gray-600">Administrator</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="font-medium">Status:</span>
              <span class="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">Active</span>
            </div>
          </div>
        </template>
      </Popover>
    `,
  }),
}

export const WithForm: Story = {
  args: {
    trigger: 'Add Comment',
    title: 'Add a comment',
  },
  render: (args) => ({
    components: { Popover, Button },
    setup() {
      return { args }
    },
    template: `
      <Popover v-bind="args">
        <template #content>
          <div class="space-y-4">
            <textarea
              class="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              rows="3"
              placeholder="Write your comment..."
            />
            <div class="flex justify-end gap-2">
              <Button variant="outline" size="sm">Cancel</Button>
              <Button variant="default" size="sm">Post</Button>
            </div>
          </div>
        </template>
      </Popover>
    `,
  }),
}
