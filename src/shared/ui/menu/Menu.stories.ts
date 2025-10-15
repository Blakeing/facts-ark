import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { User, Settings, LogOut, HelpCircle } from 'lucide-vue-next'
import Menu from './Menu.vue'

const meta = {
  title: 'UI/Menu',
  component: Menu,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default'],
      description: 'Visual style variant',
    },
    closeOnSelect: {
      control: 'boolean',
      description: 'Close menu when item is selected',
    },
  },
  args: {
    variant: 'default',
    closeOnSelect: true,
  },
} satisfies Meta<typeof Menu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    trigger: 'Open Menu',
    items: [
      { value: 'profile', label: 'Profile' },
      { value: 'settings', label: 'Settings' },
      { value: 'logout', label: 'Logout' },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    trigger: 'Account',
    items: [
      { value: 'profile', label: 'Profile', icon: User },
      { value: 'settings', label: 'Settings', icon: Settings },
      { value: 'help', label: 'Help', icon: HelpCircle },
      { value: 'logout', label: 'Logout', icon: LogOut },
    ],
  },
}

export const WithShortcuts: Story = {
  args: {
    trigger: 'Edit',
    items: [
      { value: 'undo', label: 'Undo', shortcut: '⌘Z' },
      { value: 'redo', label: 'Redo', shortcut: '⌘⇧Z' },
      { value: 'cut', label: 'Cut', shortcut: '⌘X' },
      { value: 'copy', label: 'Copy', shortcut: '⌘C' },
      { value: 'paste', label: 'Paste', shortcut: '⌘V' },
    ],
  },
}

export const WithDisabled: Story = {
  args: {
    trigger: 'Actions',
    items: [
      { value: 'edit', label: 'Edit' },
      { value: 'duplicate', label: 'Duplicate' },
      { value: 'archive', label: 'Archive', disabled: true },
      { value: 'delete', label: 'Delete' },
    ],
  },
}
