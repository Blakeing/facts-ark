import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import TextField from './TextField.vue'

const meta = {
  title: 'Forms/TextField',
  component: TextField,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the field',
    },
    helperText: {
      control: 'text',
      description: 'Helper text shown below the input',
    },
    errorText: {
      control: 'text',
      description: 'Error message shown when invalid',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search', 'file'],
      description: 'HTML input type',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
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
    type: 'text',
    size: 'md',
    required: false,
    invalid: false,
    disabled: false,
    readonly: false,
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Default TextField with label
 */
export const Default: Story = {
  render: (args) => ({
    components: { TextField },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextField v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
}

/**
 * TextField with helper text
 */
export const WithHelperText: Story = {
  render: (args) => ({
    components: { TextField },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextField v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    helperText: "We'll never share your email with anyone else",
  },
}

/**
 * TextField with validation error
 */
export const WithError: Story = {
  render: (args) => ({
    components: { TextField },
    setup() {
      const value = ref('invalid-email')
      return { args, value }
    },
    template: '<TextField v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
    invalid: true,
    errorText: 'Please enter a valid email address',
  },
}

/**
 * Required TextField
 */
export const Required: Story = {
  render: (args) => ({
    components: { TextField },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextField v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
    required: true,
    helperText: 'This field is required',
  },
}

/**
 * Disabled TextField
 */
export const Disabled: Story = {
  render: (args) => ({
    components: { TextField },
    setup() {
      const value = ref('Disabled value')
      return { args, value }
    },
    template: '<TextField v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Disabled Field',
    disabled: true,
  },
}

/**
 * Read-only TextField
 */
export const Readonly: Story = {
  render: (args) => ({
    components: { TextField },
    setup() {
      const value = ref('Read-only value')
      return { args, value }
    },
    template: '<TextField v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Read-only Field',
    readonly: true,
  },
}

/**
 * Password TextField
 */
export const Password: Story = {
  render: (args) => ({
    components: { TextField },
    setup() {
      const value = ref('')
      return { args, value }
    },
    template: '<TextField v-bind="args" v-model="value" />',
  }),
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Password must be at least 8 characters',
  },
}

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: (args) => ({
    components: { TextField },
    setup() {
      const small = ref('')
      const medium = ref('')
      const large = ref('')
      return { args, small, medium, large }
    },
    template: `
      <div class="space-y-4">
        <TextField label="Small" size="sm" placeholder="Small input" v-model="small" />
        <TextField label="Medium" size="md" placeholder="Medium input" v-model="medium" />
        <TextField label="Large" size="lg" placeholder="Large input" v-model="large" />
      </div>
    `,
  }),
}

/**
 * Complete form example
 */
export const FormExample: Story = {
  render: (args) => ({
    components: { TextField },
    setup() {
      const email = ref('')
      const password = ref('')
      const emailError = ref(false)

      const validateEmail = () => {
        emailError.value = !email.value.includes('@')
      }

      return { args, email, password, emailError, validateEmail }
    },
    template: `
      <form class="space-y-4 max-w-md">
        <TextField
          label="Email"
          type="email"
          v-model="email"
          placeholder="your@email.com"
          required
          :invalid="emailError"
          :errorText="emailError ? 'Please enter a valid email' : undefined"
          @blur="validateEmail"
        />
        <TextField
          label="Password"
          type="password"
          v-model="password"
          placeholder="Enter your password"
          required
          helperText="Must be at least 8 characters"
        />
      </form>
    `,
  }),
}
