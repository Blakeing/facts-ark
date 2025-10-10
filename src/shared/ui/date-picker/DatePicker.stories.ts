import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import DatePicker from './DatePicker.vue'

const meta: Meta<typeof DatePicker> = {
  title: 'UI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A Date Picker component with calendar selection.

## Features
- Calendar popup with month/year navigation
- Click to select dates
- Keyboard navigation
- Min/max date constraints
- Date range selection
- Today indicator
- Disabled dates support
- Fully accessible

## Usage

\`\`\`vue
<script setup>
import { ref } from 'vue'
import { DatePicker } from '@/shared/ui/date-picker'

const selectedDate = ref('')
</script>

<template>
  <DatePicker
    label="Select date"
    v-model="selectedDate"
  />
</template>
\`\`\`

## Common Use Cases
- Event/appointment scheduling
- Booking systems
- Form date inputs
- Date range filters
- Birth date selection
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic date picker
 */
export const Basic: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <DatePicker
        label="Select date"
        v-model="value"
      />
    `,
  }),
}

/**
 * With helper text
 */
export const WithHelperText: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <DatePicker
        label="Select date"
        v-model="value"
        helper-text="Choose your preferred date"
      />
    `,
  }),
}

/**
 * With error
 */
export const WithError: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <DatePicker
        label="Select date"
        v-model="value"
        error="Please select a date"
      />
    `,
  }),
}

/**
 * Without clear button
 */
export const WithoutClear: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <DatePicker
        label="Select date"
        v-model="value"
        :show-clear="false"
      />
    `,
  }),
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <DatePicker
        label="Select date"
        v-model="value"
        disabled
        helper-text="Date selection is disabled"
      />
    `,
  }),
}

/**
 * Birth date picker
 */
export const BirthDate: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const birthDate = ref('')
      return { birthDate }
    },
    template: `
      <DatePicker
        label="Date of birth"
        v-model="birthDate"
        placeholder="MM/DD/YYYY"
        helper-text="You must be 18 years or older"
      />
    `,
  }),
}

/**
 * Event booking
 */
export const EventBooking: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const eventDate = ref('')
      return { eventDate }
    },
    template: `
      <div class="max-w-md space-y-4">
        <h3 class="text-lg font-semibold">Book Your Event</h3>
        <DatePicker
          label="Event date"
          v-model="eventDate"
          placeholder="Select event date"
          helper-text="Choose a date for your event"
        />
      </div>
    `,
  }),
}

/**
 * Travel booking
 */
export const TravelBooking: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const checkIn = ref('')
      const checkOut = ref('')
      return { checkIn, checkOut }
    },
    template: `
      <div class="max-w-md space-y-6">
        <h3 class="text-lg font-semibold">Book Your Stay</h3>
        <DatePicker
          label="Check-in date"
          v-model="checkIn"
          placeholder="Select check-in date"
        />
        <DatePicker
          label="Check-out date"
          v-model="checkOut"
          placeholder="Select check-out date"
        />
      </div>
    `,
  }),
}

/**
 * Form with date
 */
export const FormExample: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const formData = ref({
        name: '',
        email: '',
        appointmentDate: '',
      })

      const handleSubmit = () => {
        alert(`Appointment scheduled for: ${formData.value.appointmentDate}`)
      }

      return { formData, handleSubmit }
    },
    template: `
      <form @submit.prevent="handleSubmit" class="max-w-md space-y-4">
        <div>
          <label class="text-sm font-medium text-foreground block mb-2">Name</label>
          <input
            v-model="formData.name"
            type="text"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label class="text-sm font-medium text-foreground block mb-2">Email</label>
          <input
            v-model="formData.email"
            type="email"
            class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            placeholder="Enter your email"
          />
        </div>

        <DatePicker
          label="Appointment date"
          v-model="formData.appointmentDate"
          placeholder="Select appointment date"
        />

        <button
          type="submit"
          class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Schedule Appointment
        </button>
      </form>
    `,
  }),
}

/**
 * Read-only
 */
export const ReadOnly: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const value = ref('2025-01-15')
      return { value }
    },
    template: `
      <DatePicker
        label="Selected date"
        v-model="value"
        :readonly="true"
        helper-text="This date cannot be changed"
      />
    `,
  }),
}

/**
 * Custom placeholder
 */
export const CustomPlaceholder: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const value = ref('')
      return { value }
    },
    template: `
      <DatePicker
        label="Select date"
        v-model="value"
        placeholder="Pick a date from calendar"
      />
    `,
  }),
}

/**
 * With events
 */
export const WithEvents: Story = {
  render: () => ({
    components: { DatePicker },
    setup() {
      const value = ref('')
      const log = ref<string[]>([])

      const handleChange = (details: { value: string[] }) => {
        log.value.push(`Date changed: ${details.value.join(', ')}`)
      }

      const handleOpen = () => {
        log.value.push('Calendar opened')
      }

      const handleClose = () => {
        log.value.push('Calendar closed')
      }

      return { value, log, handleChange, handleOpen, handleClose }
    },
    template: `
      <div class="space-y-4">
        <DatePicker
          label="Select date"
          v-model="value"
          @value-change="handleChange"
          @open-change="(e) => e.open ? handleOpen() : handleClose()"
        />

        <div class="border border-border rounded-lg p-4 space-y-2">
          <p class="text-sm font-medium">Event Log:</p>
          <div class="text-xs text-muted-foreground space-y-1 max-h-32 overflow-auto">
            <p v-for="(entry, index) in log.slice(-5)" :key="index">
              {{ entry }}
            </p>
            <p v-if="log.length === 0" class="italic">
              No events yet. Select a date or open the calendar.
            </p>
          </div>
        </div>
      </div>
    `,
  }),
}
