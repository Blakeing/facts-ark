import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import SelectField from './SelectField.vue'
import type { SelectItem, SelectItemGroup } from './select-field.types'

const meta = {
  title: 'Forms/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the field',
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the select',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown when invalid',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text when no value is selected',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the select',
    },
    indicatorPosition: {
      control: 'select',
      options: ['left', 'right'],
      description: 'Position of check indicator',
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
  },
  args: {
    size: 'md',
    indicatorPosition: 'right',
    placeholder: 'Select an option',
    required: false,
    invalid: false,
    disabled: false,
  },
} satisfies Meta<typeof SelectField>

export default meta
type Story = StoryObj<typeof meta>

const frameworks: SelectItem[] = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'solid', label: 'Solid' },
]

const groupedFrameworks: SelectItemGroup[] = [
  {
    label: 'Frontend',
    items: [
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'angular', label: 'Angular' },
      { value: 'svelte', label: 'Svelte' },
    ],
  },
  {
    label: 'Backend',
    items: [
      { value: 'node', label: 'Node.js' },
      { value: 'python', label: 'Python' },
      { value: 'ruby', label: 'Ruby' },
      { value: 'go', label: 'Go' },
    ],
  },
]

/**
 * Default SelectField with label
 */
export const Default: Story = {
  render: (args) => ({
    components: { SelectField },
    setup() {
      const selected = ref<string[]>([])
      return { args, selected, frameworks }
    },
    template: '<SelectField v-bind="args" v-model="selected" :items="frameworks" />',
  }),
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
  },
}

/**
 * SelectField with helper text
 */
export const WithHelperText: Story = {
  render: (args) => ({
    components: { SelectField },
    setup() {
      const selected = ref<string[]>([])
      return { args, selected, frameworks }
    },
    template: '<SelectField v-bind="args" v-model="selected" :items="frameworks" />',
  }),
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    helperText: 'Choose your preferred JavaScript framework',
  },
}

/**
 * SelectField with validation error
 */
export const WithError: Story = {
  render: (args) => ({
    components: { SelectField },
    setup() {
      const selected = ref<string[]>([])
      return { args, selected, frameworks }
    },
    template: '<SelectField v-bind="args" v-model="selected" :items="frameworks" />',
  }),
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    invalid: true,
    errorText: 'Please select a framework',
  },
}

/**
 * Required SelectField
 */
export const Required: Story = {
  render: (args) => ({
    components: { SelectField },
    setup() {
      const selected = ref<string[]>([])
      return { args, selected, frameworks }
    },
    template: '<SelectField v-bind="args" v-model="selected" :items="frameworks" />',
  }),
  args: {
    label: 'Framework',
    placeholder: 'Select a framework',
    required: true,
    helperText: 'This field is required',
  },
}

/**
 * Disabled SelectField
 */
export const Disabled: Story = {
  render: (args) => ({
    components: { SelectField },
    setup() {
      const selected = ref<string[]>(['react'])
      return { args, selected, frameworks }
    },
    template: '<SelectField v-bind="args" v-model="selected" :items="frameworks" />',
  }),
  args: {
    label: 'Framework',
    disabled: true,
  },
}

/**
 * Grouped options
 */
export const GroupedOptions: Story = {
  render: (args) => ({
    components: { SelectField },
    setup() {
      const selected = ref<string[]>([])
      return { args, selected, groupedFrameworks }
    },
    template: '<SelectField v-bind="args" v-model="selected" :items="groupedFrameworks" />',
  }),
  args: {
    label: 'Technology',
    placeholder: 'Select a technology',
    helperText: 'Choose from frontend or backend technologies',
  },
}

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: (args) => ({
    components: { SelectField },
    setup() {
      const small = ref<string[]>([])
      const medium = ref<string[]>([])
      const large = ref<string[]>([])
      return { args, small, medium, large, frameworks }
    },
    template: `
      <div class="space-y-4">
        <SelectField label="Small" size="sm" v-model="small" :items="frameworks" placeholder="Select..." />
        <SelectField label="Medium" size="md" v-model="medium" :items="frameworks" placeholder="Select..." />
        <SelectField label="Large" size="lg" v-model="large" :items="frameworks" placeholder="Select..." />
      </div>
    `,
  }),
}

/**
 * Indicator positions
 */
export const IndicatorPositions: Story = {
  render: (args) => ({
    components: { SelectField },
    setup() {
      const left = ref<string[]>([])
      const right = ref<string[]>([])
      return { args, left, right, frameworks }
    },
    template: `
      <div class="space-y-4">
        <SelectField
          label="Indicator Left"
          indicatorPosition="left"
          v-model="left"
          :items="frameworks"
          placeholder="Select..."
        />
        <SelectField
          label="Indicator Right"
          indicatorPosition="right"
          v-model="right"
          :items="frameworks"
          placeholder="Select..."
        />
      </div>
    `,
  }),
}

/**
 * Form example with categories
 */
export const FormExample: Story = {
  render: (args) => ({
    components: { SelectField },
    setup() {
      const category = ref<string[]>([])
      const priority = ref<string[]>([])
      const status = ref<string[]>([])
      const categoryError = ref(false)

      const validateCategory = () => {
        categoryError.value = category.value.length === 0
      }

      const categories: SelectItem[] = [
        { value: 'work', label: 'Work' },
        { value: 'personal', label: 'Personal' },
        { value: 'urgent', label: 'Urgent' },
      ]

      const priorities: SelectItem[] = [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
      ]

      const statuses: SelectItem[] = [
        { value: 'todo', label: 'To Do' },
        { value: 'in-progress', label: 'In Progress' },
        { value: 'done', label: 'Done' },
      ]

      return {
        args,
        category,
        priority,
        status,
        categories,
        priorities,
        statuses,
        categoryError,
        validateCategory,
      }
    },
    template: `
      <form class="space-y-4 max-w-md">
        <SelectField
          label="Category"
          v-model="category"
          :items="categories"
          placeholder="Select category"
          required
          :invalid="categoryError"
          :errorText="categoryError ? 'Category is required' : undefined"
          @blur="validateCategory"
        />
        <SelectField
          label="Priority"
          v-model="priority"
          :items="priorities"
          placeholder="Select priority"
          helperText="Choose the priority level for this task"
        />
        <SelectField
          label="Status"
          v-model="status"
          :items="statuses"
          placeholder="Select status"
        />
      </form>
    `,
  }),
}
