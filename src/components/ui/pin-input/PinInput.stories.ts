import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import PinInput from './PinInput.vue'

const meta = {
  title: 'UI/PinInput',
  component: PinInput,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the pin input fields',
    },
    length: {
      control: 'number',
      description: 'Number of input fields',
    },
    type: {
      control: 'select',
      options: ['numeric', 'alphanumeric', 'alphabetic'],
      description: 'Type of characters allowed',
    },
    otp: {
      control: 'boolean',
      description: 'Enable OTP mode for security',
    },
    mask: {
      control: 'boolean',
      description: 'Mask the input (show dots)',
    },
  },
  args: {
    size: 'md',
    length: 6,
    type: 'numeric',
    otp: true,
    mask: false,
    label: 'Enter verification code',
  },
  parameters: {
    docs: {
      description: {
        component: `
A Pin Input component for entering verification codes, OTPs, and other sequential inputs.

## Features
- Auto-focus and auto-advance between fields
- Paste support (paste complete code)
- Multiple input types (numeric, alphanumeric, alphabetic)
- Optional masking for security
- OTP mode for one-time passwords
- Fully keyboard accessible

## Usage

\`\`\`vue
<script setup>
import { ref } from 'vue'
import { PinInput } from '@/components/ui/pin-input'

const code = ref('')
</script>

<template>
  <PinInput
    label="Enter OTP"
    :length="6"
    :otp="true"
    v-model="code"
  />
</template>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof PinInput>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic pin input
 */
export const Basic: Story = {
  render: () => ({
    components: { PinInput },
    template: `
      <PinInput
        label="Enter verification code"
        :length="6"
      />
    `,
  }),
}

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => ({
    components: { PinInput },
    template: `
      <div class="space-y-6">
        <PinInput
          size="sm"
          label="Small"
          :length="4"
        />
        <PinInput
          size="md"
          label="Medium"
          :length="4"
        />
        <PinInput
          size="lg"
          label="Large"
          :length="4"
        />
      </div>
    `,
  }),
}

/**
 * Different lengths
 */
export const Lengths: Story = {
  render: () => ({
    components: { PinInput },
    template: `
      <div class="space-y-6">
        <PinInput
          label="4-digit code"
          :length="4"
        />
        <PinInput
          label="6-digit code"
          :length="6"
        />
        <PinInput
          label="8-digit code"
          :length="8"
        />
      </div>
    `,
  }),
}

/**
 * With masking (secure input)
 */
export const Masked: Story = {
  render: () => ({
    components: { PinInput },
    template: `
      <PinInput
        label="Enter secure code"
        :length="6"
        :mask="true"
        helper-text="Code will be hidden for security"
      />
    `,
  }),
}

/**
 * Alphanumeric input
 */
export const Alphanumeric: Story = {
  render: () => ({
    components: { PinInput },
    template: `
      <PinInput
        label="Enter license key"
        :length="6"
        type="alphanumeric"
        :otp="false"
        helper-text="Letters and numbers allowed"
      />
    `,
  }),
}

/**
 * Alphabetic only
 */
export const Alphabetic: Story = {
  render: () => ({
    components: { PinInput },
    template: `
      <PinInput
        label="Enter word"
        :length="5"
        type="alphabetic"
        :otp="false"
        helper-text="Letters only"
      />
    `,
  }),
}

/**
 * With validation error
 */
export const WithError: Story = {
  render: () => ({
    components: { PinInput },
    template: `
      <PinInput
        label="Enter verification code"
        :length="6"
        error="Invalid code. Please try again."
      />
    `,
  }),
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => ({
    components: { PinInput },
    template: `
      <PinInput
        label="Enter code"
        :length="6"
        disabled
        helper-text="Input is disabled"
      />
    `,
  }),
}

/**
 * OTP verification example
 */
export const OTPVerification: Story = {
  render: () => ({
    components: { PinInput },
    setup() {
      const code = ref('')
      const handleComplete = (details: { value: string[] }) => {
        console.log('Complete:', details.value)
      }
      return { code, handleComplete }
    },
    template: `
      <div class="space-y-4">
        <PinInput
          label="Enter OTP"
          :length="6"
          :otp="true"
          :mask="false"
          helper-text="We sent a 6-digit code to your phone"
          @value-complete="handleComplete"
        />
        <p class="text-sm text-muted-foreground text-center">
          Didn't receive the code? <a href="#" class="text-primary hover:underline">Resend</a>
        </p>
      </div>
    `,
  }),
}

/**
 * Two-factor authentication
 */
export const TwoFactorAuth: Story = {
  render: () => ({
    components: { PinInput },
    setup() {
      const code = ref('')
      return { code }
    },
    template: `
      <div class="max-w-sm space-y-4">
        <div>
          <h3 class="text-lg font-semibold">Two-Factor Authentication</h3>
          <p class="text-sm text-muted-foreground mt-1">
            Enter the 6-digit code from your authenticator app
          </p>
        </div>
        <PinInput
          label="Authentication Code"
          :length="6"
          :otp="true"
          v-model="code"
        />
      </div>
    `,
  }),
}

/**
 * Phone verification
 */
export const PhoneVerification: Story = {
  render: () => ({
    components: { PinInput },
    setup() {
      const isLoading = ref(false)
      const handleComplete = async (details: { value: string[] }) => {
        isLoading.value = true
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000))
        isLoading.value = false
        alert(`Code verified: ${details.value}`)
      }
      return { isLoading, handleComplete }
    },
    template: `
      <div class="max-w-sm space-y-4">
        <div>
          <h3 class="text-lg font-semibold">Verify Your Phone</h3>
          <p class="text-sm text-muted-foreground mt-1">
            We sent a code to +1 (555) 123-4567
          </p>
        </div>
        <PinInput
          label="Verification Code"
          :length="6"
          :otp="true"
          :disabled="isLoading"
          helper-text="Enter the 6-digit code"
          @value-complete="handleComplete"
        />
        <p v-if="isLoading" class="text-sm text-muted-foreground text-center">
          Verifying...
        </p>
      </div>
    `,
  }),
}
