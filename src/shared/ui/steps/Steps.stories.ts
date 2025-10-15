import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Steps from './Steps.vue'

const meta = {
  title: 'UI/Steps',
  component: Steps,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'circles'],
      description: 'Visual style variant',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of steps',
    },
    linear: {
      control: 'boolean',
      description: 'Whether steps must be completed in order',
    },
  },
  args: {
    variant: 'default',
    orientation: 'horizontal',
    linear: true,
  },
} satisfies Meta<typeof Steps>

export default meta
type Story = StoryObj<typeof meta>

const checkoutSteps = [
  { value: 'cart', title: 'Shopping Cart', description: 'Review your items' },
  { value: 'shipping', title: 'Shipping', description: 'Enter shipping address' },
  { value: 'payment', title: 'Payment', description: 'Enter payment details' },
  { value: 'confirm', title: 'Confirmation', description: 'Review and confirm' },
]

export const Default: Story = {
  args: {
    items: checkoutSteps,
    defaultStep: 0,
  },
}

export const Circles: Story = {
  args: {
    variant: 'circles',
    items: checkoutSteps,
    defaultStep: 1,
  },
}

export const WithCustomContent: Story = {
  args: {
    items: [
      { value: 'account', title: 'Account', description: 'Create your account' },
      { value: 'profile', title: 'Profile', description: 'Set up your profile' },
      { value: 'preferences', title: 'Preferences', description: 'Choose your preferences' },
    ],
    defaultStep: 0,
  },
  render: (args) => ({
    components: { Steps },
    setup() {
      return { args }
    },
    template: `
      <Steps v-bind="args">
        <template #step-0>
          <h3 class="text-lg font-semibold mb-4">Create Your Account</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md" placeholder="you@example.com" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
          </div>
        </template>
        <template #step-1>
          <h3 class="text-lg font-semibold mb-4">Set Up Your Profile</h3>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" class="w-full px-3 py-2 border border-gray-300 rounded-md" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
              <textarea class="w-full px-3 py-2 border border-gray-300 rounded-md" rows="3"></textarea>
            </div>
          </div>
        </template>
        <template #step-2>
          <h3 class="text-lg font-semibold mb-4">Choose Your Preferences</h3>
          <div class="space-y-3">
            <label class="flex items-center">
              <input type="checkbox" class="mr-2" />
              <span class="text-sm">Email notifications</span>
            </label>
            <label class="flex items-center">
              <input type="checkbox" class="mr-2" />
              <span class="text-sm">Newsletter</span>
            </label>
          </div>
        </template>
      </Steps>
    `,
  }),
}
