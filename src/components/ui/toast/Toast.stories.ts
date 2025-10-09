import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Toast from './Toast.vue'
import { useToast } from './useToast'
import Button from '../button/Button.vue'

const meta = {
  title: 'UI/Toast',
  component: Toast,
  tags: ['autodocs'],
  argTypes: {},
  parameters: {
    docs: {
      description: {
        component: `
A Toast component for displaying temporary notifications.

## Features
- Multiple toast types (success, error, warning, info)
- Automatic stacking and positioning
- Action buttons
- Customizable duration
- Keyboard accessible
- Promise-based toasts for async operations

## Usage

\`\`\`vue
<script setup>
import { useToast } from '@/components/ui/toast'

const { toast, toaster } = useToast()

// Show a success toast
toast.success({
  title: 'Success!',
  description: 'Your changes have been saved.'
})
</script>

<template>
  <!-- Add the Toast component to your app layout -->
  <Toast :toaster="toaster" />
</template>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof Toast>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic toast with all types
 */
export const Basic: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const { toast, toaster } = useToast()

      const showSuccess = () => {
        toast.success({
          title: 'Success!',
          description: 'Your changes have been saved successfully.',
        })
      }

      const showError = () => {
        toast.error({
          title: 'Error occurred',
          description: 'Something went wrong. Please try again.',
        })
      }

      const showWarning = () => {
        toast.warning({
          title: 'Warning',
          description: 'This action cannot be undone.',
        })
      }

      const showInfo = () => {
        toast.info({
          title: 'New update available',
          description: 'Version 2.1.0 is now available for download.',
        })
      }

      return { toaster, showSuccess, showError, showWarning, showInfo }
    },
    template: `
      <div class="flex flex-wrap gap-3">
        <Button @click="showSuccess" variant="solid">
          Show Success
        </Button>
        <Button @click="showError" variant="destructive">
          Show Error
        </Button>
        <Button @click="showWarning" variant="secondary">
          Show Warning
        </Button>
        <Button @click="showInfo" variant="outline">
          Show Info
        </Button>
        <Toast :toaster="toaster" />
      </div>
    `,
  }),
}

/**
 * Toast with action button
 */
export const WithAction: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const { toast, toaster } = useToast()

      const showWithAction = () => {
        toast.info({
          title: 'Update available',
          description: 'A new version of the app is available.',
          action: {
            label: 'Update',
            onClick: () => alert('Updating...'),
          },
        })
      }

      return { toaster, showWithAction }
    },
    template: `
      <div>
        <Button @click="showWithAction">Show Toast with Action</Button>
        <Toast :toaster="toaster" />
      </div>
    `,
  }),
}

/**
 * Toast with custom duration
 */
export const CustomDuration: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const { toast, toaster } = useToast()

      const showShort = () => {
        toast.info({
          title: 'Quick message',
          description: 'This will disappear in 2 seconds',
          duration: 2000,
        })
      }

      const showLong = () => {
        toast.info({
          title: 'Important message',
          description: 'This will stay for 10 seconds',
          duration: 10000,
        })
      }

      const showPersistent = () => {
        toast.info({
          title: 'Persistent message',
          description: 'This will stay until manually closed',
          duration: Infinity,
        })
      }

      return { toaster, showShort, showLong, showPersistent }
    },
    template: `
      <div class="flex flex-wrap gap-3">
        <Button @click="showShort">2 seconds</Button>
        <Button @click="showLong">10 seconds</Button>
        <Button @click="showPersistent">Persistent</Button>
        <Toast :toaster="toaster" />
      </div>
    `,
  }),
}

/**
 * Promise-based toast for async operations
 */
export const PromiseToast: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const { toast, toaster } = useToast()

      const simulateAsyncSuccess = () => {
        const promise = new Promise((resolve) => {
          setTimeout(() => resolve({ data: 'Success!' }), 2000)
        })

        toast.promise(promise, {
          loading: {
            title: 'Loading...',
            description: 'Please wait while we process your request.',
          },
          success: {
            title: 'Success!',
            description: 'Your request has been processed.',
          },
          error: {
            title: 'Error',
            description: 'Failed to process your request.',
          },
        })
      }

      const simulateAsyncError = () => {
        const promise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Failed!')), 2000)
        })

        toast.promise(promise, {
          loading: {
            title: 'Processing...',
            description: 'This operation will fail.',
          },
          success: {
            title: 'Success',
            description: 'Operation completed.',
          },
          error: {
            title: 'Error occurred',
            description: 'The operation failed as expected.',
          },
        })
      }

      return { toaster, simulateAsyncSuccess, simulateAsyncError }
    },
    template: `
      <div class="flex gap-3">
        <Button @click="simulateAsyncSuccess">Simulate Success</Button>
        <Button @click="simulateAsyncError" variant="destructive">
          Simulate Error
        </Button>
        <Toast :toaster="toaster" />
      </div>
    `,
  }),
}

/**
 * Multiple toasts stacking
 */
export const MultipleToasts: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const { toast, toaster } = useToast()

      const showMultiple = () => {
        toast.success({ title: 'First toast', description: 'This is the first notification' })
        setTimeout(() => {
          toast.info({ title: 'Second toast', description: 'This is the second notification' })
        }, 500)
        setTimeout(() => {
          toast.warning({ title: 'Third toast', description: 'This is the third notification' })
        }, 1000)
      }

      return { toaster, showMultiple }
    },
    template: `
      <div>
        <Button @click="showMultiple">Show Multiple Toasts</Button>
        <Toast :toaster="toaster" />
      </div>
    `,
  }),
}

/**
 * Update existing toast
 */
export const UpdateToast: Story = {
  render: () => ({
    components: { Toast, Button },
    setup() {
      const { toast, toaster } = useToast()
      const toastId = ref<string | null>(null)

      const createToast = () => {
        toastId.value = toast.info({
          title: 'Processing...',
          description: 'Your request is being processed.',
          duration: Infinity,
        })
      }

      const updateToast = () => {
        if (toastId.value) {
          toast.update(toastId.value, {
            title: 'Success!',
            description: 'Your request has been completed.',
            type: 'success',
            duration: 5000,
          })
        }
      }

      return { toaster, createToast, updateToast }
    },
    template: `
      <div class="flex gap-3">
        <Button @click="createToast">Create Toast</Button>
        <Button @click="updateToast" variant="secondary">
          Update to Success
        </Button>
        <Toast :toaster="toaster" />
      </div>
    `,
  }),
}
