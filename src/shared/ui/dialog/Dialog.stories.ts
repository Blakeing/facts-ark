import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Button } from '../button'
import Dialog from './Dialog.vue'

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'centered', 'fullscreen'],
      description: 'Visual style variant',
    },
    showClose: {
      control: 'boolean',
      description: 'Show close button',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close on escape key',
    },
    closeOnInteractOutside: {
      control: 'boolean',
      description: 'Close when clicking outside',
    },
  },
  args: {
    variant: 'default',
    showClose: true,
    closeOnEscape: true,
    closeOnInteractOutside: true,
  },
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    trigger: 'Open Dialog',
    title: 'Dialog Title',
    description: 'This is a description of what the dialog is about.',
  },
  render: (args) => ({
    components: { Dialog },
    setup() {
      return { args }
    },
    template: `
      <Dialog v-bind="args">
        <template #content>
          <p class="text-sm text-gray-600">
            This is the main content of the dialog. You can put any content here.
          </p>
        </template>
      </Dialog>
    `,
  }),
}

export const Centered: Story = {
  args: {
    variant: 'centered',
    trigger: 'Open Centered Dialog',
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed with this action?',
  },
  render: (args) => ({
    components: { Dialog, Button },
    setup() {
      return { args }
    },
    template: `
      <Dialog v-bind="args">
        <template #content>
          <div class="flex gap-3 justify-center mt-6">
            <Button variant="outline">Cancel</Button>
            <Button variant="default">Confirm</Button>
          </div>
        </template>
      </Dialog>
    `,
  }),
}

export const Fullscreen: Story = {
  args: {
    variant: 'fullscreen',
    trigger: 'Open Fullscreen',
    title: 'Fullscreen Dialog',
    description: 'This dialog takes up the entire screen.',
  },
  render: (args) => ({
    components: { Dialog },
    setup() {
      return { args }
    },
    template: `
      <Dialog v-bind="args">
        <template #content>
          <div class="space-y-4">
            <p class="text-sm text-gray-600">
              This is a fullscreen dialog. It can be useful for complex forms or detailed content.
            </p>
            <div class="grid grid-cols-2 gap-4 mt-8">
              <div class="bg-gray-100 p-4 rounded">Content 1</div>
              <div class="bg-gray-100 p-4 rounded">Content 2</div>
              <div class="bg-gray-100 p-4 rounded">Content 3</div>
              <div class="bg-gray-100 p-4 rounded">Content 4</div>
            </div>
          </div>
        </template>
      </Dialog>
    `,
  }),
}

export const WithForm: Story = {
  args: {
    variant: 'default',
    trigger: 'Edit Profile',
    title: 'Edit Profile',
    description: 'Make changes to your profile here.',
  },
  render: (args) => ({
    components: { Dialog, Button },
    setup() {
      return { args }
    },
    template: `
      <Dialog v-bind="args">
        <template #content>
          <form class="space-y-4 mt-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="john@example.com"
              />
            </div>
            <div class="flex gap-3 justify-end mt-6">
              <Button variant="outline">Cancel</Button>
              <Button variant="default">Save Changes</Button>
            </div>
          </form>
        </template>
      </Dialog>
    `,
  }),
}

export const WithoutCloseButton: Story = {
  args: {
    variant: 'centered',
    trigger: 'Open Dialog',
    title: 'Important Message',
    description: 'Please read this carefully.',
    showClose: false,
  },
  render: (args) => ({
    components: { Dialog, Button },
    setup() {
      return { args }
    },
    template: `
      <Dialog v-bind="args">
        <template #content>
          <div class="flex gap-3 justify-center mt-6">
            <Button variant="default">I Understand</Button>
          </div>
        </template>
      </Dialog>
    `,
  }),
}

export const ConfirmDelete: Story = {
  args: {
    variant: 'centered',
    trigger: 'Delete Account',
    title: 'Delete Account',
    description: 'This action cannot be undone. Are you absolutely sure?',
  },
  render: (args) => ({
    components: { Dialog, Button },
    setup() {
      return { args }
    },
    template: `
      <Dialog v-bind="args">
        <template #trigger>
          <Button variant="destructive">Delete Account</Button>
        </template>
        <template #content>
          <div class="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
            <p class="text-sm text-red-800">
              <strong>Warning:</strong> All your data will be permanently deleted.
            </p>
          </div>
          <div class="flex gap-3 justify-center mt-6">
            <Button variant="outline">Cancel</Button>
            <Button variant="destructive">Yes, Delete</Button>
          </div>
        </template>
      </Dialog>
    `,
  }),
}

export const AllVariants: Story = {
  render: () => ({
    components: { Dialog },
    template: `
      <div class="flex gap-4">
        <Dialog
          variant="default"
          trigger="Default"
          title="Default Dialog"
          description="Standard dialog appearance"
        >
          <template #content>
            <p class="text-sm text-gray-600">Content goes here.</p>
          </template>
        </Dialog>

        <Dialog
          variant="centered"
          trigger="Centered"
          title="Centered Dialog"
          description="Centered content layout"
        >
          <template #content>
            <p class="text-sm text-gray-600">Content is centered.</p>
          </template>
        </Dialog>

        <Dialog
          variant="fullscreen"
          trigger="Fullscreen"
          title="Fullscreen Dialog"
          description="Takes full screen"
        >
          <template #content>
            <p class="text-sm text-gray-600">Full screen content.</p>
          </template>
        </Dialog>
      </div>
    `,
  }),
}
