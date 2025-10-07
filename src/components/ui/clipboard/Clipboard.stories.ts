import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Clipboard from './Clipboard.vue'

const meta = {
  title: 'UI/Clipboard',
  component: Clipboard,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'inline', 'button'],
      description: 'Visual style variant',
    },
    showInput: {
      control: 'boolean',
      description: 'Show input field',
    },
    timeout: {
      control: 'number',
      description: 'Timeout for copy status (ms)',
    },
  },
  args: {
    variant: 'default',
    showInput: true,
    timeout: 3000,
  },
} satisfies Meta<typeof Clipboard>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
    label: 'Share this link',
    defaultValue: 'https://ark-ui.com',
  },
}

export const Inline: Story = {
  args: {
    variant: 'inline',
    label: 'API Key',
    defaultValue: 'pk_test_51234567890abcdefghijklmnop',
  },
}

export const Button: Story = {
  args: {
    variant: 'button',
    defaultValue: 'npm install @ark-ui/vue',
    showInput: false,
  },
}

export const WithPlaceholder: Story = {
  args: {
    variant: 'default',
    label: 'Copy text',
    placeholder: 'Enter text to copy...',
    defaultValue: '',
  },
}

export const CustomTimeout: Story = {
  args: {
    variant: 'default',
    label: 'Quick timeout (1s)',
    defaultValue: 'This will reset in 1 second',
    timeout: 1000,
  },
  parameters: {
    docs: {
      description: {
        story: 'The copied state will reset after 1 second.',
      },
    },
  },
}

export const CodeSnippet: Story = {
  args: {
    variant: 'button',
    defaultValue: `import { Clipboard } from '@ark-ui/vue/clipboard'

export default {
  components: { Clipboard }
}`,
    showInput: false,
  },
  render: (args) => ({
    components: { Clipboard },
    setup() {
      return { args }
    },
    template: `
      <div class="relative rounded-lg bg-gray-900 p-4">
        <pre class="text-sm text-gray-100 overflow-x-auto"><code>{{ args.defaultValue }}</code></pre>
        <div class="absolute top-2 right-2">
          <Clipboard v-bind="args" />
        </div>
      </div>
    `,
  }),
}

export const AllVariants: Story = {
  args: {
    defaultValue: 'https://example.com/share/abc123',
  },
  render: (args) => ({
    components: { Clipboard },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-8">
        <div>
          <h3 class="text-sm font-semibold mb-3">Default</h3>
          <Clipboard variant="default" label="Share URL" :default-value="args.defaultValue" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Inline</h3>
          <Clipboard variant="inline" label="API Key" :default-value="args.defaultValue" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Button</h3>
          <Clipboard variant="button" :default-value="args.defaultValue" :show-input="false" />
        </div>
      </div>
    `,
  }),
}
