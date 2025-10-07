import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { HelpCircle, Settings, Shield, CreditCard } from 'lucide-vue-next'
import Accordion from './Accordion.vue'

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated', 'contained'],
      description: 'Visual style variant',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple items to be expanded at once',
    },
    collapsible: {
      control: 'boolean',
      description: 'Allow items to be collapsed after expansion',
    },
  },
  args: {
    variant: 'default',
    multiple: false,
    collapsible: true,
  },
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

const faqItems = [
  {
    value: 'item-1',
    title: 'What is your return policy?',
    content:
      'We offer a 30-day return policy for all unused items in their original packaging. Contact our support team to initiate a return.',
  },
  {
    value: 'item-2',
    title: 'How long does shipping take?',
    content:
      'Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for faster delivery.',
  },
  {
    value: 'item-3',
    title: 'Do you offer international shipping?',
    content:
      'Yes, we ship to over 100 countries worldwide. International shipping times vary by location, typically 10-14 business days.',
  },
  {
    value: 'item-4',
    title: 'How can I track my order?',
    content:
      'Once your order ships, you will receive a tracking number via email. Use this number to track your package on our website.',
  },
]

export const Default: Story = {
  args: {
    variant: 'default',
    items: faqItems,
  },
}

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    items: faqItems,
  },
}

export const Separated: Story = {
  args: {
    variant: 'separated',
    items: faqItems,
  },
}

export const Contained: Story = {
  args: {
    variant: 'contained',
    items: faqItems,
  },
}

export const Multiple: Story = {
  args: {
    variant: 'separated',
    multiple: true,
    defaultValue: ['item-1', 'item-2'],
    items: faqItems,
  },
  parameters: {
    docs: {
      description: {
        story: 'Allow multiple accordion items to be expanded at the same time.',
      },
    },
  },
}

export const WithIcons: Story = {
  args: {
    variant: 'separated',
    items: [
      {
        value: 'account',
        title: 'Account Settings',
        icon: Settings,
        content: 'Manage your account preferences, profile information, and security settings.',
      },
      {
        value: 'billing',
        title: 'Billing & Payment',
        icon: CreditCard,
        content: 'Update payment methods, view invoices, and manage your subscription.',
      },
      {
        value: 'security',
        title: 'Security & Privacy',
        icon: Shield,
        content:
          'Configure two-factor authentication, manage connected devices, and review privacy settings.',
      },
      {
        value: 'help',
        title: 'Help & Support',
        icon: HelpCircle,
        content: 'Access documentation, contact support, and find answers to common questions.',
      },
    ],
  },
}

export const WithDisabled: Story = {
  args: {
    variant: 'bordered',
    items: [
      {
        value: 'available-1',
        title: 'Available Item 1',
        content: 'This item is available and can be expanded.',
      },
      {
        value: 'disabled',
        title: 'Disabled Item',
        content: 'This item is disabled and cannot be expanded.',
        disabled: true,
      },
      {
        value: 'available-2',
        title: 'Available Item 2',
        content: 'This item is also available and can be expanded.',
      },
    ],
  },
}

export const CustomContent: Story = {
  args: {
    variant: 'separated',
    items: [
      { value: 'features', title: 'Features' },
      { value: 'pricing', title: 'Pricing' },
      { value: 'support', title: 'Support' },
    ],
  },
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args }
    },
    template: `
      <Accordion v-bind="args">
        <template #features>
          <div class="space-y-2">
            <p class="font-medium">Key Features:</p>
            <ul class="list-disc list-inside space-y-1">
              <li>Lightning-fast performance</li>
              <li>Built-in accessibility</li>
              <li>Fully customizable</li>
              <li>Mobile responsive</li>
            </ul>
          </div>
        </template>
        <template #pricing>
          <div class="grid grid-cols-3 gap-4">
            <div class="text-center p-4 bg-white rounded border">
              <p class="font-semibold">Basic</p>
              <p class="text-2xl font-bold mt-2">$9</p>
              <p class="text-sm text-gray-500">per month</p>
            </div>
            <div class="text-center p-4 bg-indigo-50 rounded border border-indigo-200">
              <p class="font-semibold text-indigo-600">Pro</p>
              <p class="text-2xl font-bold mt-2">$29</p>
              <p class="text-sm text-gray-500">per month</p>
            </div>
            <div class="text-center p-4 bg-white rounded border">
              <p class="font-semibold">Enterprise</p>
              <p class="text-2xl font-bold mt-2">$99</p>
              <p class="text-sm text-gray-500">per month</p>
            </div>
          </div>
        </template>
        <template #support>
          <p>Contact our support team at <a href="mailto:support@example.com" class="text-indigo-600 hover:text-indigo-500">support@example.com</a> or call us at (555) 123-4567.</p>
        </template>
      </Accordion>
    `,
  }),
}

export const AllVariants: Story = {
  args: {
    items: [
      { value: 'item-1', title: 'First Item', content: 'Content for the first item' },
      { value: 'item-2', title: 'Second Item', content: 'Content for the second item' },
      { value: 'item-3', title: 'Third Item', content: 'Content for the third item' },
    ],
  },
  render: (args) => ({
    components: { Accordion },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-semibold mb-3">Default</h3>
          <Accordion variant="default" :items="args.items" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Bordered</h3>
          <Accordion variant="bordered" :items="args.items" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Separated</h3>
          <Accordion variant="separated" :items="args.items" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Contained</h3>
          <Accordion variant="contained" :items="args.items" />
        </div>
      </div>
    `,
  }),
}
