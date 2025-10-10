import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SegmentGroup from './SegmentGroup.vue'

const meta = {
  title: 'UI/SegmentGroup',
  component: SegmentGroup,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'pills'],
      description: 'Visual style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    orientation: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Orientation of segments',
    },
  },
  args: {
    variant: 'default',
    size: 'md',
    orientation: 'horizontal',
  },
} satisfies Meta<typeof SegmentGroup>

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
    label: 'Choose framework',
    options: frameworks,
    defaultValue: 'vue',
  },
}

export const Pills: Story = {
  args: {
    variant: 'pills',
    label: 'View mode',
    options: [
      { value: 'grid', label: 'Grid' },
      { value: 'list', label: 'List' },
      { value: 'table', label: 'Table' },
    ],
    defaultValue: 'grid',
  },
}

export const WithDisabled: Story = {
  args: {
    label: 'Select option',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2', disabled: true },
      { value: 'option3', label: 'Option 3' },
    ],
    defaultValue: 'option1',
  },
}

export const SmallSize: Story = {
  args: {
    size: 'sm',
    label: 'Small segments',
    options: frameworks,
    defaultValue: 'react',
  },
}

export const LargeSize: Story = {
  args: {
    size: 'lg',
    label: 'Large segments',
    options: frameworks,
    defaultValue: 'vue',
  },
}

export const AllSizes: Story = {
  args: {
    options: [
      { value: 'one', label: 'One' },
      { value: 'two', label: 'Two' },
      { value: 'three', label: 'Three' },
    ],
    defaultValue: 'one',
  },
  render: (args) => ({
    components: { SegmentGroup },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-semibold mb-3">Small</h3>
          <SegmentGroup size="sm" label="Small" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Medium</h3>
          <SegmentGroup size="md" label="Medium" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Large</h3>
          <SegmentGroup size="lg" label="Large" v-bind="args" />
        </div>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  args: {
    options: frameworks,
    defaultValue: 'vue',
  },
  render: (args) => ({
    components: { SegmentGroup },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-semibold mb-3">Default</h3>
          <SegmentGroup variant="default" label="Default" v-bind="args" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Pills</h3>
          <SegmentGroup variant="pills" label="Pills" v-bind="args" />
        </div>
      </div>
    `,
  }),
}
