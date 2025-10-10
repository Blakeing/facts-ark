import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import FieldsetComponent from './Fieldset.vue'
import FieldComponent from '../field/Field.vue'
import Input from '../input/Input.vue'
import Checkbox from '../checkbox/Checkbox.vue'
import Switch from '../switch/Switch.vue'

const meta = {
  title: 'UI/Fieldset',
  component: FieldsetComponent,
  tags: ['autodocs'],
  argTypes: {
    legend: {
      control: 'text',
      description: 'Legend text for the fieldset',
    },
    helperText: {
      control: 'text',
      description: 'Helper text for the entire fieldset',
    },
    errorText: {
      control: 'text',
      description: 'Error message for the fieldset',
    },
    invalid: {
      control: 'boolean',
      description: 'Whether the fieldset has validation errors',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether all fields in the fieldset are disabled',
    },
  },
  args: {
    invalid: false,
    disabled: false,
  },
} satisfies Meta<typeof FieldsetComponent>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => ({
    components: { Fieldset: FieldsetComponent, Field: FieldComponent, Input },
    setup() {
      return { args }
    },
    template: `
      <Fieldset v-bind="args">
        <div class="space-y-4">
          <Field label="First Name" required>
            <Input type="text" placeholder="John" />
          </Field>

          <Field label="Last Name" required>
            <Input type="text" placeholder="Doe" />
          </Field>
        </div>
      </Fieldset>
    `,
  }),
  args: {
    legend: 'Personal Information',
  },
}

export const WithHelperText: Story = {
  args: {},
  render: () => ({
    components: { Fieldset: FieldsetComponent, Field: FieldComponent, Input },
    template: `
      <Fieldset
        legend="Contact Information"
        helperText="We'll use this information to contact you about your order"
      >
        <div class="space-y-4">
          <Field label="Email" required>
            <Input type="email" placeholder="john@example.com" />
          </Field>

          <Field label="Phone" required>
            <Input type="tel" placeholder="+1 (555) 000-0000" />
          </Field>
        </div>
      </Fieldset>
    `,
  }),
}

export const WithError: Story = {
  args: {},
  render: () => ({
    components: { Fieldset: FieldsetComponent, Field: FieldComponent, Input },
    template: `
      <Fieldset
        legend="Billing Address"
        invalid
        errorText="Please complete all required fields"
      >
        <div class="space-y-4">
          <Field label="Street Address" required>
            <Input type="text" placeholder="123 Main St" />
          </Field>

          <div class="grid grid-cols-2 gap-4">
            <Field label="City" required>
              <Input type="text" placeholder="San Francisco" />
            </Field>

            <Field label="ZIP Code" required>
              <Input type="text" placeholder="94102" />
            </Field>
          </div>
        </div>
      </Fieldset>
    `,
  }),
}

export const Disabled: Story = {
  args: {},
  render: () => ({
    components: { Fieldset: FieldsetComponent, Field: FieldComponent, Input },
    template: `
      <Fieldset
        legend="Account Settings"
        disabled
        helperText="Contact support to change these settings"
      >
        <div class="space-y-4">
          <Field label="Account ID">
            <Input type="text" value="ACC-12345" disabled />
          </Field>

          <Field label="Registration Date">
            <Input type="text" value="January 1, 2024" disabled />
          </Field>
        </div>
      </Fieldset>
    `,
  }),
}

export const WithCheckboxes: Story = {
  args: {},
  render: () => ({
    components: { Fieldset: FieldsetComponent, Checkbox },
    setup() {
      const preferences = ref({
        email: true,
        sms: false,
        push: true,
      })
      return { preferences }
    },
    template: `
      <Fieldset
        legend="Notification Preferences"
        helperText="Choose how you want to receive notifications"
      >
        <div class="space-y-3">
          <Checkbox
            v-model:checked="preferences.email"
            label="Email notifications"
          />
          <Checkbox
            v-model:checked="preferences.sms"
            label="SMS notifications"
          />
          <Checkbox
            v-model:checked="preferences.push"
            label="Push notifications"
          />
        </div>
      </Fieldset>
    `,
  }),
}

export const WithSwitches: Story = {
  args: {},
  render: () => ({
    components: { Fieldset: FieldsetComponent, Switch },
    setup() {
      const settings = ref({
        darkMode: false,
        notifications: true,
        autoSave: true,
      })
      return { settings }
    },
    template: `
      <Fieldset
        legend="Application Settings"
      >
        <div class="space-y-4">
          <Switch
            v-model:checked="settings.darkMode"
            label="Dark mode"
          />
          <Switch
            v-model:checked="settings.notifications"
            label="Enable notifications"
          />
          <Switch
            v-model:checked="settings.autoSave"
            label="Auto-save drafts"
          />
        </div>
      </Fieldset>
    `,
  }),
}

export const CompleteForm: Story = {
  args: {},
  render: () => ({
    components: { Fieldset: FieldsetComponent, Field: FieldComponent, Input, Checkbox },
    setup() {
      const form = ref({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zip: '',
        subscribe: false,
        terms: false,
      })
      return { form }
    },
    template: `
      <form class="space-y-6">
        <Fieldset legend="Personal Information" helperText="Your basic contact details">
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
              <Field label="First Name" required>
                <Input v-model="form.firstName" type="text" placeholder="John" />
              </Field>

              <Field label="Last Name" required>
                <Input v-model="form.lastName" type="text" placeholder="Doe" />
              </Field>
            </div>

            <Field label="Email" required>
              <Input v-model="form.email" type="email" placeholder="john@example.com" />
            </Field>

            <Field label="Phone">
              <Input v-model="form.phone" type="tel" placeholder="+1 (555) 000-0000" />
            </Field>
          </div>
        </Fieldset>

        <Fieldset legend="Shipping Address">
          <div class="space-y-4">
            <Field label="Street Address" required>
              <Input v-model="form.address" type="text" placeholder="123 Main St" />
            </Field>

            <div class="grid grid-cols-2 gap-4">
              <Field label="City" required>
                <Input v-model="form.city" type="text" placeholder="San Francisco" />
              </Field>

              <Field label="ZIP Code" required>
                <Input v-model="form.zip" type="text" placeholder="94102" />
              </Field>
            </div>
          </div>
        </Fieldset>

        <Fieldset legend="Preferences">
          <div class="space-y-3">
            <Checkbox
              v-model:checked="form.subscribe"
              label="Subscribe to newsletter"
            />
            <Checkbox
              v-model:checked="form.terms"
              label="I agree to the terms and conditions"
            />
          </div>
        </Fieldset>

        <div class="flex gap-2">
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
