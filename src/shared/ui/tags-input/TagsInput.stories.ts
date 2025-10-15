import type { Meta, StoryObj } from '@storybook/vue3-vite'
import TagsInput from './TagsInput.vue'

const meta = {
  title: 'UI/TagsInput',
  component: TagsInput,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outline'],
      description: 'Visual style variant',
    },
    max: {
      control: 'number',
      description: 'Maximum number of tags',
    },
    editable: {
      control: 'boolean',
      description: 'Whether tags can be edited',
    },
  },
  args: {
    variant: 'default',
    editable: true,
  },
} satisfies Meta<typeof TagsInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Interests',
    placeholder: 'Add interest...',
    defaultValue: ['Vue', 'React', 'TypeScript'],
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
    label: 'Skills',
    placeholder: 'Add skill...',
    defaultValue: ['JavaScript', 'CSS', 'HTML'],
  },
}

export const WithMax: Story = {
  args: {
    label: 'Tags (max 3)',
    placeholder: 'Add tag...',
    max: 3,
    defaultValue: ['Tag 1', 'Tag 2'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Tags input with a maximum of 3 tags allowed.',
      },
    },
  },
}

export const NotEditable: Story = {
  args: {
    label: 'Tags',
    placeholder: 'Add tag...',
    editable: false,
    defaultValue: ['Read-only', 'Tags'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Tags cannot be edited after creation.',
      },
    },
  },
}

export const Empty: Story = {
  args: {
    label: 'Add your tags',
    placeholder: 'Start typing...',
  },
}

export const CommaSeparated: Story = {
  args: {
    label: 'Email addresses',
    placeholder: 'Enter emails separated by commas',
    addOnPaste: true,
    delimiter: ',',
  },
  parameters: {
    docs: {
      description: {
        story: 'Type multiple emails separated by commas or paste a comma-separated list.',
      },
    },
  },
}
