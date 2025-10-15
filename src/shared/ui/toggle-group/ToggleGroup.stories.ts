import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight } from 'lucide-vue-next'
import ToggleGroup from './ToggleGroup.vue'

const meta = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    multiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    multiple: false,
  },
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    options: [
      { value: 'left', label: 'Left' },
      { value: 'center', label: 'Center' },
      { value: 'right', label: 'Right' },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    options: [
      { value: 'bold', label: 'Bold', icon: Bold },
      { value: 'italic', label: 'Italic', icon: Italic },
      { value: 'underline', label: 'Underline', icon: Underline },
    ],
  },
}

export const IconOnly: Story = {
  args: {
    options: [
      { value: 'left', label: '', icon: AlignLeft },
      { value: 'center', label: '', icon: AlignCenter },
      { value: 'right', label: '', icon: AlignRight },
    ],
  },
}

export const Multiple: Story = {
  args: {
    multiple: true,
    options: [
      { value: 'bold', label: 'Bold', icon: Bold },
      { value: 'italic', label: 'Italic', icon: Italic },
      { value: 'underline', label: 'Underline', icon: Underline },
    ],
  },
}

export const WithDisabled: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ],
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    options: [
      { value: 'xs', label: 'XS' },
      { value: 'sm', label: 'SM' },
      { value: 'md', label: 'MD' },
      { value: 'lg', label: 'LG' },
      { value: 'xl', label: 'XL' },
    ],
  },
}

export const AllSizes: Story = {
  args: {
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
    ],
  },
  render: (args) => ({
    components: { ToggleGroup },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-semibold mb-3">Small</h3>
          <ToggleGroup size="sm" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Medium</h3>
          <ToggleGroup size="md" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Large</h3>
          <ToggleGroup size="lg" v-bind="args" />
        </div>
      </div>
    `,
  }),
}
