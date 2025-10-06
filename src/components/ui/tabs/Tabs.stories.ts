import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { User, Settings, Bell, Shield } from 'lucide-vue-next'
import Tabs from './Tabs.vue'

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['line', 'pills', 'enclosed', 'bar'],
      description: 'Visual style variant',
    },
    indicator: {
      control: 'boolean',
      description: 'Show animated indicator',
    },
    responsive: {
      control: 'boolean',
      description: 'Show mobile select dropdown on small screens',
    },
  },
  args: {
    variant: 'line',
    indicator: false,
    responsive: false,
  },
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

const basicTabs = [
  { value: 'account', label: 'Account', content: 'Account settings and preferences.' },
  { value: 'password', label: 'Password', content: 'Change your password and security settings.' },
  {
    value: 'notifications',
    label: 'Notifications',
    content: 'Manage your notification preferences.',
  },
]

export const Line: Story = {
  args: {
    variant: 'line',
    items: basicTabs,
  },
}

export const Pills: Story = {
  args: {
    variant: 'pills',
    items: basicTabs,
  },
}

export const Enclosed: Story = {
  args: {
    variant: 'enclosed',
    items: basicTabs,
  },
}

export const Bar: Story = {
  args: {
    variant: 'bar',
    items: basicTabs,
  },
}

export const WithIndicator: Story = {
  args: {
    variant: 'line',
    indicator: true,
    items: basicTabs,
  },
}

export const WithIcons: Story = {
  args: {
    variant: 'line',
    items: [
      { value: 'account', label: 'Account', icon: User, content: 'Manage your account settings.' },
      {
        value: 'settings',
        label: 'Settings',
        icon: Settings,
        content: 'Configure application settings.',
      },
      {
        value: 'notifications',
        label: 'Notifications',
        icon: Bell,
        content: 'Notification preferences.',
      },
      {
        value: 'security',
        label: 'Security',
        icon: Shield,
        content: 'Security and privacy settings.',
      },
    ],
  },
}

export const WithBadges: Story = {
  args: {
    variant: 'line',
    items: [
      { value: 'all', label: 'All', badge: '12', content: 'All messages (12)' },
      { value: 'unread', label: 'Unread', badge: '5', content: 'Unread messages (5)' },
      { value: 'archived', label: 'Archived', content: 'Archived messages' },
    ],
  },
}

export const WithDisabled: Story = {
  args: {
    variant: 'line',
    items: [
      { value: 'enabled', label: 'Enabled', content: 'This tab is enabled.' },
      { value: 'disabled', label: 'Disabled', disabled: true, content: 'This tab is disabled.' },
      { value: 'another', label: 'Another', content: 'Another enabled tab.' },
    ],
  },
}

export const Responsive: Story = {
  args: {
    variant: 'line',
    responsive: true,
    items: basicTabs,
  },
  parameters: {
    docs: {
      description: {
        story: 'Resize your browser window to see the mobile dropdown on small screens.',
      },
    },
  },
}

export const CompleteExample: Story = {
  args: {
    variant: 'line',
    indicator: true,
    responsive: true,
    items: [
      {
        value: 'profile',
        label: 'Profile',
        icon: User,
        content: 'Update your profile information and photo.',
      },
      {
        value: 'settings',
        label: 'Settings',
        icon: Settings,
        badge: '3',
        content: 'Manage your application settings and preferences.',
      },
      {
        value: 'notifications',
        label: 'Notifications',
        icon: Bell,
        badge: '12',
        content: 'Configure how you receive notifications.',
      },
      {
        value: 'security',
        label: 'Security',
        icon: Shield,
        disabled: true,
        content: 'Security settings (coming soon).',
      },
    ],
  },
}

export const CustomContent: Story = {
  args: {
    variant: 'line',
    items: [
      { value: 'overview', label: 'Overview' },
      { value: 'analytics', label: 'Analytics' },
      { value: 'reports', label: 'Reports' },
    ],
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      return { args }
    },
    template: `
      <Tabs v-bind="args">
        <template #overview>
          <div class="space-y-4">
            <h3 class="text-lg font-semibold">Overview</h3>
            <p class="text-gray-600">Dashboard overview with key metrics and statistics.</p>
            <div class="grid grid-cols-3 gap-4">
              <div class="bg-gray-50 p-4 rounded">
                <p class="text-sm text-gray-500">Users</p>
                <p class="text-2xl font-bold">1,234</p>
              </div>
              <div class="bg-gray-50 p-4 rounded">
                <p class="text-sm text-gray-500">Revenue</p>
                <p class="text-2xl font-bold">$12.3k</p>
              </div>
              <div class="bg-gray-50 p-4 rounded">
                <p class="text-sm text-gray-500">Growth</p>
                <p class="text-2xl font-bold">+23%</p>
              </div>
            </div>
          </div>
        </template>
        <template #analytics>
          <div>
            <h3 class="text-lg font-semibold mb-2">Analytics</h3>
            <p class="text-gray-600">Detailed analytics and performance metrics.</p>
          </div>
        </template>
        <template #reports>
          <div>
            <h3 class="text-lg font-semibold mb-2">Reports</h3>
            <p class="text-gray-600">Generate and download reports.</p>
          </div>
        </template>
      </Tabs>
    `,
  }),
}

export const AllVariants: Story = {
  args: {
    items: [
      { value: 'tab1', label: 'Tab 1', content: 'Content for tab 1' },
      { value: 'tab2', label: 'Tab 2', content: 'Content for tab 2' },
      { value: 'tab3', label: 'Tab 3', content: 'Content for tab 3' },
    ],
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-semibold mb-3">Line</h3>
          <Tabs variant="line" :items="args.items" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Pills</h3>
          <Tabs variant="pills" :items="args.items" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Enclosed</h3>
          <Tabs variant="enclosed" :items="args.items" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Bar</h3>
          <Tabs variant="bar" :items="args.items" />
        </div>
      </div>
    `,
  }),
}
