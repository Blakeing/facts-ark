import type { Meta, StoryObj } from '@storybook/vue3-vite'
import RadioGroup from './RadioGroup.vue'

const meta = {
  title: 'UI/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'cards'],
      description: 'Visual style variant',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of radio options',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state for all options',
    },
  },
  args: {
    variant: 'default',
    orientation: 'vertical',
    disabled: false,
  },
} satisfies Meta<typeof RadioGroup>

export default meta
type Story = StoryObj<typeof meta>

const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
]

export const Default: Story = {
  args: {
    variant: 'default',
    label: 'Choose a framework',
    options: frameworks,
  },
}

export const Cards: Story = {
  args: {
    variant: 'cards',
    label: 'Select a plan',
    options: [
      {
        value: 'starter',
        label: 'Starter',
        description: 'Perfect for trying out our service',
      },
      {
        value: 'professional',
        label: 'Professional',
        description: 'For professional developers and teams',
      },
      {
        value: 'enterprise',
        label: 'Enterprise',
        description: 'For large organizations with advanced needs',
      },
    ],
  },
}

export const WithDescriptions: Story = {
  args: {
    variant: 'default',
    label: 'Notification preferences',
    options: [
      {
        value: 'all',
        label: 'All notifications',
        description: 'Receive all notifications immediately',
      },
      {
        value: 'important',
        label: 'Important only',
        description: 'Only receive notifications for important updates',
      },
      {
        value: 'none',
        label: 'None',
        description: 'Do not receive any notifications',
      },
    ],
  },
}

export const WithDisabled: Story = {
  args: {
    variant: 'default',
    label: 'Select option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2 (Disabled)', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ],
  },
}

export const Horizontal: Story = {
  args: {
    variant: 'default',
    label: 'Choose size',
    orientation: 'horizontal',
    options: [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ],
  },
}

export const AllDisabled: Story = {
  args: {
    variant: 'default',
    label: 'Disabled group',
    disabled: true,
    options: frameworks,
  },
}

export const CardsWithPricing: Story = {
  args: {
    variant: 'cards',
    label: 'Choose your plan',
    defaultValue: 'pro',
    options: [
      {
        value: 'free',
        label: 'Free',
        description: '$0/month • Perfect for personal projects',
      },
      {
        value: 'pro',
        label: 'Pro',
        description: '$29/month • Best for professionals',
      },
      {
        value: 'team',
        label: 'Team',
        description: '$99/month • For growing teams',
      },
      {
        value: 'enterprise',
        label: 'Enterprise',
        description: 'Custom pricing • For large organizations',
      },
    ],
  },
}

export const AllVariants: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1', description: 'Description for option 1' },
      { value: 'option2', label: 'Option 2', description: 'Description for option 2' },
      { value: 'option3', label: 'Option 3', description: 'Description for option 3' },
    ],
  },
  render: (args) => ({
    components: { RadioGroup },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-semibold mb-3">Default</h3>
          <RadioGroup variant="default" label="Default variant" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Cards</h3>
          <RadioGroup variant="cards" label="Cards variant" v-bind="args" />
        </div>
      </div>
    `,
  }),
}
