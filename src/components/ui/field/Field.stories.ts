import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { Field } from '@ark-ui/vue/field'
import { ref } from 'vue'
import FieldComponent from './Field.vue'
import Input from '../input/Input.vue'
import Textarea from '../textarea/Textarea.vue'
import Checkbox from '../checkbox/Checkbox.vue'

const meta = {
  title: 'UI/Field',
  component: FieldComponent,
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
    required: false,
    invalid: false,
    disabled: false,
  },
} satisfies Meta<typeof FieldComponent>

export default meta
type Story = StoryObj<typeof meta>

export const WithInput: Story = {
  render: (args) => ({
    components: { Field: FieldComponent, FieldInput: Field.Input },
    setup() {
      return { args }
    },
    template: `
      <Field v-bind="args">
        <FieldInput type="text" placeholder="Enter your email" />
      </Field>
    `,
  }),
  args: {
    label: 'Email',
  },
}

export const WithHelperText: Story = {
  args: {},
  render: () => ({
    components: { Field: FieldComponent, FieldInput: Field.Input },
    template: `
      <Field
        label="Username"
        helperText="Choose a unique username between 3-20 characters"
      >
        <FieldInput type="text" placeholder="username" />
      </Field>
    `,
  }),
}

export const Required: Story = {
  args: {},
  render: () => ({
    components: { Field: FieldComponent, FieldInput: Field.Input },
    template: `
      <Field
        label="Password"
        required
        helperText="Must be at least 8 characters"
      >
        <FieldInput type="password" placeholder="Enter password" />
      </Field>
    `,
  }),
}

export const WithError: Story = {
  args: {},
  render: () => ({
    components: { Field: FieldComponent, FieldInput: Field.Input },
    template: `
      <Field
        label="Email"
        invalid
        errorText="Please enter a valid email address"
      >
        <FieldInput type="email" placeholder="email@example.com" />
      </Field>
    `,
  }),
}

export const Disabled: Story = {
  args: {},
  render: () => ({
    components: { Field: FieldComponent, FieldInput: Field.Input },
    template: `
      <Field
        label="Account ID"
        disabled
        helperText="This field cannot be edited"
      >
        <FieldInput type="text" value="ACC-12345" disabled />
      </Field>
    `,
  }),
}

export const WithCustomInput: Story = {
  args: {},
  render: () => ({
    components: { Field: FieldComponent, Input },
    setup() {
      const email = ref('')
      return { email }
    },
    template: `
      <Field label="Email Address" required helperText="We'll never share your email">
        <Input
          v-model="email"
          type="email"
          placeholder="you@example.com"
        />
      </Field>
    `,
  }),
}

export const WithTextarea: Story = {
  args: {},
  render: () => ({
    components: { Field: FieldComponent, Textarea },
    setup() {
      const bio = ref('')
      return { bio }
    },
    template: `
      <Field
        label="Bio"
        helperText="Tell us a little about yourself"
      >
        <Textarea
          v-model="bio"
          placeholder="I am a..."
          :rows="4"
        />
      </Field>
    `,
  }),
}

export const FormExample: Story = {
  args: {},
  render: () => ({
    components: { Field: FieldComponent, Input, Textarea, Checkbox },
    setup() {
      const form = ref({
        name: '',
        email: '',
        message: '',
        subscribe: false,
      })
      const errors = ref({
        name: false,
        email: false,
      })

      const validate = () => {
        errors.value.name = form.value.name.length < 2
        errors.value.email = !form.value.email.includes('@')
      }

      return { form, errors, validate }
    },
    template: `
      <form class="space-y-4" @submit.prevent="validate">
        <Field
          label="Full Name"
          required
          :invalid="errors.name"
          :errorText="errors.name ? 'Name must be at least 2 characters' : undefined"
          helperText="Enter your first and last name"
        >
          <Input
            v-model="form.name"
            type="text"
            placeholder="John Doe"
            :invalid="errors.name"
          />
        </Field>

        <Field
          label="Email"
          required
          :invalid="errors.email"
          :errorText="errors.email ? 'Please enter a valid email' : undefined"
        >
          <Input
            v-model="form.email"
            type="email"
            placeholder="john@example.com"
            :invalid="errors.email"
          />
        </Field>

        <Field
          label="Message"
          helperText="Optional: Tell us what you're interested in"
        >
          <Textarea
            v-model="form.message"
            placeholder="Your message..."
            :rows="4"
          />
        </Field>

        <div class="pt-2">
          <Checkbox
            v-model:checked="form.subscribe"
            label="Subscribe to newsletter"
          />
        </div>

        <div class="flex gap-2 pt-4">
          <button
            type="submit"
            class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500"
          >
            Submit
          </button>
          <button
            type="button"
            class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    `,
  }),
}

export const MultipleFields: Story = {
  args: {},
  render: () => ({
    components: { Field: FieldComponent, Input },
    template: `
      <div class="space-y-4">
        <Field label="First Name" required>
          <Input type="text" placeholder="John" />
        </Field>

        <Field label="Last Name" required>
          <Input type="text" placeholder="Doe" />
        </Field>

        <Field label="Email" required helperText="We'll send a confirmation email">
          <Input type="email" placeholder="john@example.com" />
        </Field>

        <Field label="Phone" helperText="Optional">
          <Input type="tel" placeholder="+1 (555) 000-0000" />
        </Field>
      </div>
    `,
  }),
}
