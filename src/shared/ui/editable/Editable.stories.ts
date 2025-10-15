import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import Editable from './Editable.vue'

const meta: Meta<typeof Editable> = {
  title: 'UI/Editable',
  component: Editable,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
An Editable component for inline text editing.

## Features
- Click or double-click to edit
- Auto-save on blur (optional)
- Edit/Save/Cancel controls
- Keyboard shortcuts (Enter to save, Esc to cancel)
- Fully accessible

## Usage

\`\`\`vue
<script setup>
import { ref } from 'vue'
import { Editable } from '@/shared/ui/editable'

const taskName = ref('Complete project')
</script>

<template>
  <Editable
    label="Task name"
    v-model="taskName"
    placeholder="Enter task name..."
  />
</template>
\`\`\`

## When to Use
- Task names, labels, or titles that need quick editing
- Settings or profile fields
- Inline note taking
- Any text that users might want to edit without opening a modal
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic editable with controls
 */
export const Basic: Story = {
  render: () => ({
    components: { Editable },
    setup() {
      const value = ref('Click edit to change this text')
      return { value }
    },
    template: `
      <Editable
        label="Task name"
        v-model="value"
        placeholder="Enter task name..."
      />
    `,
  }),
}

/**
 * Without controls (auto-save on blur)
 */
export const WithoutControls: Story = {
  render: () => ({
    components: { Editable },
    setup() {
      const value = ref('Click to edit, blur to save')
      return { value }
    },
    template: `
      <Editable
        label="Task name"
        v-model="value"
        :show-controls="false"
        placeholder="Enter task name..."
      />
    `,
  }),
}

/**
 * With custom button text
 */
export const CustomButtonText: Story = {
  render: () => ({
    components: { Editable },
    setup() {
      const value = ref('Custom button labels')
      return { value }
    },
    template: `
      <Editable
        label="Task name"
        v-model="value"
        edit-text="✏️ Edit"
        save-text="✓ Save"
        cancel-text="✕ Cancel"
      />
    `,
  }),
}

/**
 * Task list example
 */
export const TaskList: Story = {
  render: () => ({
    components: { Editable },
    setup() {
      const tasks = ref([
        { id: 1, name: 'Design new landing page' },
        { id: 2, name: 'Implement authentication' },
        { id: 3, name: 'Write documentation' },
      ])
      return { tasks }
    },
    template: `
      <div class="space-y-4">
        <h3 class="text-lg font-semibold">Tasks</h3>
        <div
          v-for="task in tasks"
          :key="task.id"
          class="border border-border rounded-lg p-4"
        >
          <Editable
            v-model="task.name"
            :show-controls="false"
            placeholder="Enter task name..."
          />
        </div>
      </div>
    `,
  }),
}

/**
 * Profile editing example
 */
export const ProfileFields: Story = {
  render: () => ({
    components: { Editable },
    setup() {
      const profile = ref({
        name: 'John Doe',
        title: 'Software Engineer',
        bio: 'Building amazing products with Vue and TypeScript',
      })
      return { profile }
    },
    template: `
      <div class="max-w-md space-y-6 border border-border rounded-lg p-6">
        <h3 class="text-lg font-semibold">Profile</h3>
        
        <Editable
          label="Name"
          v-model="profile.name"
          placeholder="Enter your name..."
        />
        
        <Editable
          label="Title"
          v-model="profile.title"
          placeholder="Enter your title..."
        />
        
        <Editable
          label="Bio"
          v-model="profile.bio"
          placeholder="Tell us about yourself..."
        />
      </div>
    `,
  }),
}

/**
 * Inline note taking
 */
export const NoteTaking: Story = {
  render: () => ({
    components: { Editable },
    setup() {
      const notes = ref([
        { id: 1, content: 'Remember to call the team' },
        { id: 2, content: 'Review pull requests' },
        { id: 3, content: 'Update project roadmap' },
      ])

      const addNote = () => {
        notes.value.push({
          id: Date.now(),
          content: '',
        })
      }

      return { notes, addNote }
    },
    template: `
      <div class="max-w-md space-y-4">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold">Quick Notes</h3>
          <button
            @click="addNote"
            class="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground hover:bg-primary/90"
          >
            Add Note
          </button>
        </div>
        
        <div
          v-for="note in notes"
          :key="note.id"
          class="border-l-2 border-primary pl-3"
        >
          <Editable
            v-model="note.content"
            :show-controls="false"
            placeholder="Click to add note..."
          />
        </div>
      </div>
    `,
  }),
}

/**
 * Settings panel example
 */
export const SettingsPanel: Story = {
  render: () => ({
    components: { Editable },
    setup() {
      const settings = ref({
        siteName: 'My Awesome Site',
        tagline: 'Building the future',
        copyright: '© 2025 Company Name',
      })
      return { settings }
    },
    template: `
      <div class="max-w-lg space-y-6 border border-border rounded-lg p-6">
        <h3 class="text-lg font-semibold">Site Settings</h3>
        
        <div class="space-y-4">
          <div>
            <Editable
              label="Site Name"
              v-model="settings.siteName"
              placeholder="Enter site name..."
            />
            <p class="text-xs text-muted-foreground mt-1">
              This appears in the browser tab and search results
            </p>
          </div>
          
          <div>
            <Editable
              label="Tagline"
              v-model="settings.tagline"
              placeholder="Enter tagline..."
            />
            <p class="text-xs text-muted-foreground mt-1">
              A short description of your site
            </p>
          </div>
          
          <div>
            <Editable
              label="Copyright"
              v-model="settings.copyright"
              placeholder="Enter copyright..."
            />
            <p class="text-xs text-muted-foreground mt-1">
              Appears in the footer
            </p>
          </div>
        </div>
      </div>
    `,
  }),
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => ({
    components: { Editable },
    setup() {
      const value = ref('This field is disabled')
      return { value }
    },
    template: `
      <Editable
        label="Task name"
        v-model="value"
        disabled
        placeholder="Enter task name..."
      />
    `,
  }),
}

/**
 * Read-only state
 */
export const ReadOnly: Story = {
  render: () => ({
    components: { Editable },
    setup() {
      const value = ref('This field is read-only')
      return { value }
    },
    template: `
      <Editable
        label="Task name"
        v-model="value"
        :readonly="true"
        placeholder="Enter task name..."
      />
    `,
  }),
}

/**
 * With validation
 */
export const WithValidation: Story = {
  render: () => ({
    components: { Editable },
    setup() {
      const value = ref('')
      const isInvalid = ref(false)

      const handleValueChange = () => {
        isInvalid.value = value.value.length < 3
      }

      return { value, isInvalid, handleValueChange }
    },
    template: `
      <div>
        <Editable
          label="Task name (min 3 characters)"
          v-model="value"
          :invalid="isInvalid"
          placeholder="Enter task name..."
          @value-change="handleValueChange"
        />
        <p v-if="isInvalid" class="text-xs text-destructive mt-2">
          Task name must be at least 3 characters
        </p>
      </div>
    `,
  }),
}

/**
 * Event handling example
 */
export const WithEvents: Story = {
  render: () => ({
    components: { Editable },
    setup() {
      const value = ref('Edit me and check the console')
      const log = ref<string[]>([])

      const handleEdit = () => {
        log.value.push('Edit started')
      }

      const handleSubmit = () => {
        log.value.push(`Saved: ${value.value}`)
      }

      const handleCancel = () => {
        log.value.push('Cancelled')
      }

      return { value, log, handleEdit, handleSubmit, handleCancel }
    },
    template: `
      <div class="space-y-4">
        <Editable
          label="Task name"
          v-model="value"
          @edit="handleEdit"
          @value-commit="handleSubmit"
          @value-revert="handleCancel"
        />
        
        <div class="border border-border rounded-lg p-4 space-y-2">
          <p class="text-sm font-medium">Event Log:</p>
          <div class="text-xs text-muted-foreground space-y-1">
            <p v-for="(entry, index) in log.slice(-5)" :key="index">
              {{ entry }}
            </p>
            <p v-if="log.length === 0" class="italic">
              No events yet. Try editing the field above.
            </p>
          </div>
        </div>
      </div>
    `,
  }),
}

