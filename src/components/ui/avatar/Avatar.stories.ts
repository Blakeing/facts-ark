import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Avatar from './Avatar.vue'

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: 'Name to display as fallback initials',
    },
    src: {
      control: 'text',
      description: 'Image source URL',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
      description: 'Size of the avatar',
    },
  },
  args: {
    name: 'John Doe',
    size: 'md',
  },
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'John Doe',
  },
}

export const WithImage: Story = {
  args: {
    name: 'Sarah Johnson',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  },
}

export const Small: Story = {
  args: {
    name: 'John Doe',
    size: 'sm',
  },
}

export const Medium: Story = {
  args: {
    name: 'John Doe',
    size: 'md',
  },
}

export const Large: Story = {
  args: {
    name: 'John Doe',
    size: 'lg',
  },
}

export const ExtraLarge: Story = {
  args: {
    name: 'John Doe',
    size: 'xl',
  },
}

export const ShortName: Story = {
  args: {
    name: 'J',
  },
  parameters: {
    docs: {
      description: {
        story: 'When the name is too short to generate initials, an icon is displayed instead.',
      },
    },
  },
}

export const AllSizes: Story = {
  args: {},
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex items-end gap-4">
        <Avatar name="John Doe" size="sm" />
        <Avatar name="Jane Smith" size="md" />
        <Avatar name="Bob Wilson" size="lg" />
        <Avatar name="Alice Brown" size="xl" />
      </div>
    `,
  }),
}

export const Group: Story = {
  args: {},
  render: () => ({
    components: { Avatar },
    template: `
      <div class="flex -space-x-2">
        <Avatar
          name="Sarah Johnson"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
          class="ring-2 ring-white"
        />
        <Avatar
          name="Mike Chen"
          src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop"
          class="ring-2 ring-white"
        />
        <Avatar
          name="Emma Davis"
          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
          class="ring-2 ring-white"
        />
        <Avatar
          name="Alex Kim"
          class="ring-2 ring-white"
        />
      </div>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: 'Avatars can be grouped together with negative margin to create overlapping effect.',
      },
    },
  },
}
