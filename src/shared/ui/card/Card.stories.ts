import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Card from './Card.vue'
import Button from '../button/Button.vue'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'elevated', 'filled'],
      description: 'Visual style variant',
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
      description: 'Padding size',
    },
  },
  args: {
    variant: 'outline',
    padding: 'md',
  },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p>This is a basic card with default styling.</p>
      </Card>
    `,
  }),
}

export const WithHeader: Story = {
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Card Title</h3>
        </template>
        <p class="text-gray-600">This card has a header section with a title.</p>
      </Card>
    `,
  }),
}

export const WithFooter: Story = {
  render: (args) => ({
    components: { Card, Button },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-600">This card has a footer with action buttons.</p>
        <template #footer>
          <div class="flex gap-2 justify-end">
            <Button variant="secondary">Cancel</Button>
            <Button>Save</Button>
          </div>
        </template>
      </Card>
    `,
  }),
}

export const Complete: Story = {
  render: (args) => ({
    components: { Card, Button },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <template #header>
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Complete Card</h3>
            <p class="text-sm text-gray-500 mt-1">With header, content, and footer</p>
          </div>
        </template>
        <p class="text-gray-600">
          This card demonstrates all available slots: header, default content, and footer.
          You can use these slots to create rich, structured layouts for your content.
        </p>
        <template #footer>
          <div class="flex gap-2 justify-end">
            <Button variant="ghost">Learn More</Button>
            <Button>Get Started</Button>
          </div>
        </template>
      </Card>
    `,
  }),
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <template #header>
          <h3 class="text-lg font-semibold text-gray-900">Outline Card</h3>
        </template>
        <p class="text-gray-600">This card uses the outline variant.</p>
      </Card>
    `,
  }),
}

export const NoPadding: Story = {
  args: {
    padding: 'none',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <img
          src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600&h=300&fit=crop"
          alt="Mountain landscape"
          class="w-full h-48 object-cover rounded-t-lg"
        />
        <div class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">Image Card</h3>
          <p class="text-gray-600">Card with no padding, perfect for images.</p>
        </div>
      </Card>
    `,
  }),
}

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-600">Card with small padding.</p>
      </Card>
    `,
  }),
}

export const LargePadding: Story = {
  args: {
    padding: 'lg',
  },
  render: (args) => ({
    components: { Card },
    setup() {
      return { args }
    },
    template: `
      <Card v-bind="args">
        <p class="text-gray-600">Card with large padding.</p>
      </Card>
    `,
  }),
}

export const AllVariants: Story = {
  args: {},
  render: () => ({
    components: { Card },
    template: `
      <div class="space-y-6">
        <div>
          <h3 class="text-sm font-medium mb-2">Outline (default)</h3>
          <Card variant="outline">
            <p>Card with border and subtle shadow</p>
          </Card>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Elevated</h3>
          <Card variant="elevated">
            <p>Card with shadow, no border</p>
          </Card>
        </div>

        <div>
          <h3 class="text-sm font-medium mb-2">Filled</h3>
          <Card variant="filled">
            <p>Card with subtle background</p>
          </Card>
        </div>
      </div>
    `,
  }),
}

export const CardGrid: Story = {
  args: {},
  render: () => ({
    components: { Card, Button },
    template: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <template #header>
            <h3 class="text-lg font-semibold">Starter</h3>
          </template>
          <div class="space-y-2">
            <p class="text-3xl font-bold">$9<span class="text-base font-normal text-muted-foreground">/mo</span></p>
            <p class="text-sm text-muted-foreground">Perfect for individuals</p>
          </div>
          <template #footer>
            <Button variant="outline" fullWidth>Choose Plan</Button>
          </template>
        </Card>

        <Card variant="elevated">
          <template #header>
            <h3 class="text-lg font-semibold">Professional</h3>
          </template>
          <div class="space-y-2">
            <p class="text-3xl font-bold">$29<span class="text-base font-normal text-muted-foreground">/mo</span></p>
            <p class="text-sm text-muted-foreground">For small teams</p>
          </div>
          <template #footer>
            <Button variant="solid" fullWidth>Choose Plan</Button>
          </template>
        </Card>

        <Card>
          <template #header>
            <h3 class="text-lg font-semibold">Enterprise</h3>
          </template>
          <div class="space-y-2">
            <p class="text-3xl font-bold">$99<span class="text-base font-normal text-muted-foreground">/mo</span></p>
            <p class="text-sm text-muted-foreground">For large organizations</p>
          </div>
          <template #footer>
            <Button variant="outline" fullWidth>Contact Sales</Button>
          </template>
        </Card>
      </div>
    `,
  }),
}
