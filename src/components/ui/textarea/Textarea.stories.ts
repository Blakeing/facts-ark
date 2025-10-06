import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Textarea from './Textarea.vue'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the textarea',
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
      description: 'Resize behavior',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the textarea has validation errors',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the textarea is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the textarea is read-only',
    },
    required: {
      control: 'boolean',
      description: 'Whether the textarea is required',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    rows: {
      control: 'number',
      description: 'Number of visible text rows',
    },
  },
  args: {
    size: 'md',
    resize: 'vertical',
    invalid: false,
    disabled: false,
    readonly: false,
    required: false,
    rows: 3,
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Disabled textarea',
  },
}

export const ReadOnly: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref('This text is read-only and cannot be edited.')
      return { args, value }
    },
    template: '<Textarea v-bind="args" v-model="value" />',
  }),
  args: {
    readonly: true,
  },
}

export const Invalid: Story = {
  args: {
    invalid: true,
    placeholder: 'Invalid textarea',
  },
}

export const Required: Story = {
  args: {
    required: true,
    placeholder: 'Required field',
  },
}

export const NoResize: Story = {
  args: {
    resize: 'none',
    placeholder: 'Cannot be resized',
  },
}

export const HorizontalResize: Story = {
  args: {
    resize: 'horizontal',
    placeholder: 'Resize horizontally',
  },
}

export const BothResize: Story = {
  args: {
    resize: 'both',
    placeholder: 'Resize in any direction',
  },
}

export const AllSizes: Story = {
  args: {},
  render: () => ({
    components: { Textarea },
    template: `
      <div class="flex flex-col gap-4">
        <Textarea size="sm" placeholder="Small textarea" />
        <Textarea size="md" placeholder="Medium textarea" />
        <Textarea size="lg" placeholder="Large textarea" />
      </div>
    `,
  }),
}

export const CustomRows: Story = {
  args: {
    rows: 10,
    placeholder: 'Tall textarea with 10 rows',
  },
}

export const WithValue: Story = {
  args: {},
  render: () => ({
    components: { Textarea },
    setup() {
      const message = ref('This is some initial text that can be edited.')
      return { message }
    },
    template: `
      <div class="flex flex-col gap-2">
        <Textarea v-model="message" placeholder="Type your message..." />
        <p class="text-sm text-gray-600">Character count: {{ message.length }}</p>
      </div>
    `,
  }),
}

export const FormExample: Story = {
  args: {},
  render: () => ({
    components: { Textarea },
    setup() {
      const feedback = ref('')
      const maxLength = 500
      return { feedback, maxLength }
    },
    template: `
      <div class="flex flex-col gap-2">
        <label class="text-sm font-medium text-gray-700">Feedback</label>
        <Textarea
          v-model="feedback"
          placeholder="Share your thoughts..."
          :rows="5"
          :maxlength="maxLength"
        />
        <div class="flex justify-between text-xs text-gray-500">
          <span>{{ feedback.length }} / {{ maxLength }} characters</span>
          <span :class="feedback.length === maxLength ? 'text-red-600' : ''">
            {{ maxLength - feedback.length }} remaining
          </span>
        </div>
      </div>
    `,
  }),
}
