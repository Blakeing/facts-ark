import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import PasswordInput from './PasswordInput.vue'

const meta = {
  title: 'UI/PasswordInput',
  component: PasswordInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the password input',
    },
  },
  args: {
    size: 'md',
    label: 'Password',
    placeholder: 'Enter your password',
  },
  parameters: {
    docs: {
      description: {
        component: `
A Password Input component with show/hide password toggle.

## Features
- Show/hide password visibility
- Multiple size options
- Label and helper text support
- Error state
- Fully accessible

## Usage

\`\`\`vue
<script setup>
import { ref } from 'vue'
import { PasswordInput } from '@/components/ui/password-input'

const password = ref('')
</script>

<template>
  <PasswordInput
    label="Password"
    placeholder="Enter your password"
    v-model="password"
  />
</template>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof PasswordInput>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic password input
 */
export const Basic: Story = {
  render: (args) => ({
    components: { PasswordInput },
    setup() {
      const password = ref('')
      return { args, password }
    },
    template: '<PasswordInput v-bind="args" v-model="password" />',
  }),
}

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => ({
    components: { PasswordInput },
    setup() {
      const passwordSm = ref('')
      const passwordMd = ref('')
      const passwordLg = ref('')
      return { passwordSm, passwordMd, passwordLg }
    },
    template: `
      <div class="space-y-6">
        <PasswordInput
          size="sm"
          label="Small"
          placeholder="Small password input"
          v-model="passwordSm"
        />
        <PasswordInput
          size="md"
          label="Medium"
          placeholder="Medium password input"
          v-model="passwordMd"
        />
        <PasswordInput
          size="lg"
          label="Large"
          placeholder="Large password input"
          v-model="passwordLg"
        />
      </div>
    `,
  }),
}

/**
 * With helper text
 */
export const WithHelperText: Story = {
  render: () => ({
    components: { PasswordInput },
    setup() {
      const password = ref('')
      return { password }
    },
    template: `
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        helper-text="Must be at least 8 characters"
        v-model="password"
      />
    `,
  }),
}

/**
 * With validation error
 */
export const WithError: Story = {
  render: () => ({
    components: { PasswordInput },
    setup() {
      const password = ref('123')
      return { password }
    },
    template: `
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        error="Password must be at least 8 characters"
        v-model="password"
      />
    `,
  }),
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => ({
    components: { PasswordInput },
    setup() {
      const password = ref('my-password')
      return { password }
    },
    template: `
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        disabled
        v-model="password"
      />
    `,
  }),
}

/**
 * Required field
 */
export const Required: Story = {
  render: () => ({
    components: { PasswordInput },
    setup() {
      const password = ref('')
      return { password }
    },
    template: `
      <PasswordInput
        label="Password"
        placeholder="Enter your password"
        required
        helper-text="This field is required"
        v-model="password"
      />
    `,
  }),
}

/**
 * Sign up form example
 */
export const SignUpForm: Story = {
  render: () => ({
    components: { PasswordInput },
    setup() {
      const password = ref('')
      const confirmPassword = ref('')

      return { password, confirmPassword }
    },
    template: `
      <div class="space-y-6 max-w-sm">
        <PasswordInput
          label="Create Password"
          placeholder="Enter password"
          helper-text="Must be at least 8 characters with numbers and symbols"
          v-model="password"
        />
        <PasswordInput
          label="Confirm Password"
          placeholder="Re-enter password"
          v-model="confirmPassword"
        />
      </div>
    `,
  }),
}

/**
 * Login form example
 */
export const LoginForm: Story = {
  render: () => ({
    components: { PasswordInput },
    setup() {
      const email = ref('')
      const password = ref('')

      return { email, password }
    },
    template: `
      <div class="space-y-4 max-w-sm">
        <div>
          <label class="text-sm font-medium leading-none text-foreground">Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            v-model="email"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
          />
        </div>
        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          v-model="password"
        />
      </div>
    `,
  }),
}
