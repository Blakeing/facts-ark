import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Textarea from './Textarea.vue'

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the field',
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the textarea',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown when invalid',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the textarea',
    },
    resize: {
      control: 'select',
      options: ['none', 'both', 'horizontal', 'vertical'],
      description: 'Resize behavior',
    },
    rows: {
      control: 'number',
      description: 'Number of visible rows',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the field has validation errors',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    readonly: {
      control: 'boolean',
      description: 'Whether the field is read-only',
    },
  },
  args: {
    size: 'md',
    resize: 'vertical',
    rows: 3,
    required: false,
    invalid: false,
    disabled: false,
    readonly: false,
  },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default Textarea with label
 */
export const Default: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Textarea v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Description',
    placeholder: 'Enter a description',
    rows: 4,
  },
}

/**
 * Textarea with helper text
 */
export const WithHelperText: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Textarea v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments',
    helperText: 'Maximum 500 characters',
    rows: 4,
  },
}

/**
 * Textarea with validation error
 */
export const WithError: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Textarea v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Message',
    placeholder: 'Enter a message',
    invalid: true,
    errorText: 'Message is required',
    rows: 4,
  },
}

/**
 * Required Textarea
 */
export const Required: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<Textarea v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    required: true,
    helperText: 'This field is required',
    rows: 6,
  },
}

/**
 * Disabled Textarea
 */
export const Disabled: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref('This textarea is disabled')
      return { args, value }
    },
    template: '<Textarea v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Disabled Field',
    disabled: true,
    rows: 4,
  },
}

/**
 * Read-only Textarea
 */
export const Readonly: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const value = ref('This is read-only content that cannot be edited.')
      return { args, value }
    },
    template: '<Textarea v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Read-only Field',
    readonly: true,
    rows: 4,
  },
}

/**
 * Different resize behaviors
 */
export const ResizeBehaviors: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const none = ref('')
      const vertical = ref('')
      const horizontal = ref('')
      const both = ref('')
      return { args, none, vertical, horizontal, both }
    },
    template: `
      <div class="space-y-4">
        <Textarea label="No Resize" resize="none" placeholder="Cannot be resized" v-model="none" :rows="3" />
        <Textarea label="Vertical Resize" resize="vertical" placeholder="Can resize vertically" v-model="vertical" :rows="3" />
        <Textarea label="Horizontal Resize" resize="horizontal" placeholder="Can resize horizontally" v-model="horizontal" :rows="3" />
        <Textarea label="Both Directions" resize="both" placeholder="Can resize both ways" v-model="both" :rows="3" />
      </div>
    `,
  }),
}

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const small = ref('')
      const medium = ref('')
      const large = ref('')
      return { args, small, medium, large }
    },
    template: `
      <div class="space-y-4">
        <Textarea label="Small" size="sm" placeholder="Small textarea" v-model="small" :rows="3" />
        <Textarea label="Medium" size="md" placeholder="Medium textarea" v-model="medium" :rows="3" />
        <Textarea label="Large" size="lg" placeholder="Large textarea" v-model="large" :rows="3" />
      </div>
    `,
  }),
}

/**
 * Different row counts
 */
export const RowCounts: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const small = ref('')
      const medium = ref('')
      const large = ref('')
      return { args, small, medium, large }
    },
    template: `
      <div class="space-y-4">
        <Textarea label="3 Rows" placeholder="Short textarea" v-model="small" :rows="3" />
        <Textarea label="6 Rows" placeholder="Medium textarea" v-model="medium" :rows="6" />
        <Textarea label="10 Rows" placeholder="Tall textarea" v-model="large" :rows="10" />
      </div>
    `,
  }),
}

/**
 * Form example with character count
 */
export const FormExample: Story = {
  render: (args) => ({
    components: { Textarea },
    setup() {
      const description = ref('')
      const maxLength = 500
      const remaining = ref(maxLength)
      const hasError = ref(false)

      const updateCount = () => {
        remaining.value = maxLength - description.value.length
        hasError.value = remaining.value < 0
      }

      return { args, description, remaining, hasError, updateCount }
    },
    template: `
      <Textarea
        label="Product Description"
        v-model="description"
        @input="updateCount"
        placeholder="Describe your product"
        :rows="6"
        :invalid="hasError"
        :errorText="hasError ? 'Description is too long' : undefined"
        :helperText="hasError ? undefined : remaining + ' characters remaining'"
        required
      />
    `,
  }),
}
