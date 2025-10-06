<!--
  Closed Components Demo Page

  Interactive showcase of all closed reusable UI components.
  Demonstrates different variants, sizes, and use cases for each component.

  Components Demonstrated:
  - Avatar: User profile pictures with initials fallback
  - Badge: Status indicators and labels
  - Button: Interactive buttons with loading states
  - Card: Content containers with header/footer
  - Checkbox: Boolean input with accessible labels
  - Switch: Toggle switches for binary states
  - Tabs: Tabbed content organization

  @see /docs/CLOSED_COMPONENTS.md for component documentation
  @see /docs/COMPONENT_FOLDER_STRUCTURE.md for implementation details
-->
<script setup lang="ts">
import { ref } from 'vue'
import { Avatar, Badge, Button, Card, Checkbox, Select, Switch, Tabs } from '@/components/ui'
import { User, Building2, Users, CreditCard, Settings, Bell } from 'lucide-vue-next'

const isLoading = ref(false)
const acceptTerms = ref(false)
const enableNotifications = ref(true)
const darkMode = ref(false)
const selectedFramework = ref<string[]>([])
const selectedCountry = ref<string[]>([])

/**
 * Simulates an async submit action with 2s delay
 */
const handleSubmit = () => {
  isLoading.value = true
  setTimeout(() => {
    isLoading.value = false
    alert('Submitted!')
  }, 2000)
}
</script>

<template>
  <div class="space-y-12 p-8">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Closed Components Demo</h1>
      <p class="text-gray-600">
        Examples of closed reusable components following Ark UI best practices.
        <a
          href="https://github.com/blakeing/facts-ark/blob/main/docs/CLOSED_COMPONENTS.md"
          target="_blank"
          rel="noopener noreferrer"
          class="text-indigo-600 hover:text-indigo-500 underline"
        >
          View documentation
        </a>
      </p>
    </div>

    <!-- Avatar Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Avatar Component</h2>

      <Card variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">Sizes & Variants</h3>
        </template>

        <div class="space-y-6">
          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">With Image</p>
            <div class="flex items-center gap-4">
              <Avatar
                name="Christian Schröter"
                src="https://avatars.githubusercontent.com/u/1846056?v=4"
                size="sm"
              />
              <Avatar
                name="Christian Schröter"
                src="https://avatars.githubusercontent.com/u/1846056?v=4"
                size="md"
              />
              <Avatar
                name="Christian Schröter"
                src="https://avatars.githubusercontent.com/u/1846056?v=4"
                size="lg"
              />
              <Avatar
                name="Christian Schröter"
                src="https://avatars.githubusercontent.com/u/1846056?v=4"
                size="xl"
              />
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">With Initials (No Image)</p>
            <div class="flex items-center gap-4">
              <Avatar name="John Doe" size="sm" />
              <Avatar name="Jane Smith" size="md" />
              <Avatar name="Bob Wilson" size="lg" />
              <Avatar name="Alice Johnson" size="xl" />
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Icon Fallback (Short Name)</p>
            <div class="flex items-center gap-4">
              <Avatar name="A" size="sm" />
              <Avatar name="B" size="md" />
              <Avatar name="C" size="lg" />
              <Avatar name="X" size="xl" />
            </div>
          </div>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Avatar name="John Doe" src="https://..." size="md" /&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Badge Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Badge Component</h2>

      <Card variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">Variants & Sizes</h3>
        </template>

        <div class="space-y-6">
          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Variants</p>
            <div class="flex flex-wrap items-center gap-3">
              <Badge variant="default">Default</Badge>
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="error">Error</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Sizes</p>
            <div class="flex flex-wrap items-center gap-3">
              <Badge variant="success" size="sm">Small</Badge>
              <Badge variant="success" size="md">Medium</Badge>
              <Badge variant="success" size="lg">Large</Badge>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Use Cases</p>
            <div class="flex flex-wrap items-center gap-3">
              <Badge variant="success">Active</Badge>
              <Badge variant="warning">Pending</Badge>
              <Badge variant="error">Inactive</Badge>
              <Badge variant="info">New</Badge>
              <Badge variant="default">Draft</Badge>
            </div>
          </div>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Badge variant="success" size="md"&gt;Active&lt;/Badge&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Button Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Button Component</h2>

      <Card variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">Variants, Sizes & States</h3>
        </template>

        <div class="space-y-6">
          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Variants</p>
            <div class="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Sizes</p>
            <div class="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">States</p>
            <div class="flex flex-wrap items-center gap-3">
              <Button variant="primary" :loading="true">Loading</Button>
              <Button variant="primary" :disabled="true">Disabled</Button>
              <Button variant="primary" :loading="isLoading" @click="handleSubmit">
                {{ isLoading ? 'Submitting...' : 'Submit' }}
              </Button>
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Full Width</p>
            <Button variant="primary" :full-width="true">Full Width Button</Button>
          </div>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Button variant="primary" :loading="isLoading" @click="handleClick"&gt;Submit&lt;/Button&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Card Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Card Component</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card variant="default">
          <template #header>
            <h3 class="text-lg font-semibold">Default Card</h3>
          </template>
          <p class="text-gray-600">
            This is a default card with a clean white background.
          </p>
          <template #footer>
            <Button variant="primary" size="sm">Action</Button>
          </template>
        </Card>

        <Card variant="bordered">
          <template #header>
            <h3 class="text-lg font-semibold">Bordered Card</h3>
          </template>
          <p class="text-gray-600">
            This card has a subtle border for better definition.
          </p>
          <template #footer>
            <Button variant="outline" size="sm">Action</Button>
          </template>
        </Card>

        <Card variant="elevated">
          <template #header>
            <h3 class="text-lg font-semibold">Elevated Card</h3>
          </template>
          <p class="text-gray-600">
            This card has a shadow for a lifted appearance.
          </p>
          <template #footer>
            <Button variant="secondary" size="sm">Action</Button>
          </template>
        </Card>
      </div>

      <div class="mt-6">
        <Card variant="bordered">
          <template #header>
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg font-semibold">User Profile</h3>
                <p class="text-sm text-gray-500 mt-1">Example combining multiple components</p>
              </div>
              <Badge variant="success">Active</Badge>
            </div>
          </template>

          <div class="flex items-start gap-4">
            <Avatar
              name="Sarah Johnson"
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=256"
              size="xl"
            />
            <div class="flex-1">
              <h4 class="text-lg font-semibold text-gray-900">Sarah Johnson</h4>
              <p class="text-sm text-gray-600">Product Designer</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <Badge variant="info" size="sm">Design</Badge>
                <Badge variant="info" size="sm">UX</Badge>
                <Badge variant="info" size="sm">Prototyping</Badge>
              </div>
            </div>
          </div>

          <template #footer>
            <div class="flex gap-2">
              <Button variant="primary" size="sm">View Profile</Button>
              <Button variant="outline" size="sm">Send Message</Button>
            </div>
          </template>
        </Card>
      </div>

      <div class="mt-6">
        <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto border border-gray-200"><code>&lt;Card variant="bordered"&gt;
  &lt;template #header&gt;Card Title&lt;/template&gt;
  Card content goes here
  &lt;template #footer&gt;
    &lt;Button&gt;Action&lt;/Button&gt;
  &lt;/template&gt;
&lt;/Card&gt;</code></pre>
      </div>
    </section>

    <!-- Checkbox Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Checkbox Component</h2>

      <Card variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">Sizes & States</h3>
        </template>

        <div class="space-y-6">
          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Sizes</p>
            <div class="flex flex-col gap-3">
              <Checkbox label="Small checkbox" size="sm" />
              <Checkbox label="Medium checkbox (default)" size="md" />
              <Checkbox label="Large checkbox" size="lg" />
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">States</p>
            <div class="flex flex-col gap-3">
              <Checkbox label="Unchecked" />
              <Checkbox label="Checked" :checked="true" />
              <Checkbox label="Disabled unchecked" :disabled="true" />
              <Checkbox label="Disabled checked" :checked="true" :disabled="true" />
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Interactive Example</p>
            <div class="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg">
              <Checkbox
                label="I accept the terms and conditions"
                v-model:checked="acceptTerms"
              />
              <Button
                variant="primary"
                :disabled="!acceptTerms"
                size="sm"
              >
                Continue
              </Button>
              <p class="text-xs text-gray-600">
                Status: {{ acceptTerms ? 'Accepted ✓' : 'Not accepted' }}
              </p>
            </div>
          </div>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Checkbox label="Accept terms" v-model:checked="accepted" /&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Switch Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Switch Component</h2>

      <Card variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">Sizes & States</h3>
        </template>

        <div class="space-y-6">
          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Sizes</p>
            <div class="flex flex-col gap-3">
              <Switch label="Small switch" size="sm" />
              <Switch label="Medium switch (default)" size="md" />
              <Switch label="Large switch" size="lg" />
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">States</p>
            <div class="flex flex-col gap-3">
              <Switch label="Off" />
              <Switch label="On" :checked="true" />
              <Switch label="Disabled off" :disabled="true" />
              <Switch label="Disabled on" :checked="true" :disabled="true" />
            </div>
          </div>

          <div>
            <p class="text-sm font-medium text-gray-700 mb-3">Interactive Examples</p>
            <div class="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Enable notifications</p>
                  <p class="text-xs text-gray-600">Receive email notifications</p>
                </div>
                <Switch
                  v-model:checked="enableNotifications"
                  size="lg"
                />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Dark mode</p>
                  <p class="text-xs text-gray-600">Toggle dark theme</p>
                </div>
                <Switch
                  v-model:checked="darkMode"
                  size="lg"
                />
              </div>
              <div class="text-xs text-gray-600 pt-2 border-t border-gray-300">
                Notifications: {{ enableNotifications ? 'Enabled' : 'Disabled' }} •
                Theme: {{ darkMode ? 'Dark' : 'Light' }}
              </div>
            </div>
          </div>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Switch label="Enable notifications" v-model:checked="enabled" /&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Select Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Select Component</h2>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Basic Select</h3>
          <p class="text-sm text-gray-600 mt-1">Simple dropdown with single selection</p>
        </template>

        <div class="space-y-6 max-w-md">
          <Select
            label="Framework"
            placeholder="Select a framework"
            v-model="selectedFramework"
            :items="[
              { value: 'react', label: 'React' },
              { value: 'vue', label: 'Vue' },
              { value: 'svelte', label: 'Svelte' },
              { value: 'solid', label: 'Solid' },
              { value: 'angular', label: 'Angular' },
            ]"
          />
          <p v-if="selectedFramework.length" class="text-sm text-gray-600">
            Selected: <span class="font-medium">{{ selectedFramework[0] }}</span>
          </p>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Select
  label="Framework"
  placeholder="Select a framework"
  v-model="selected"
  :items="[{ value: 'react', label: 'React' }]"
/&gt;</code></pre>
        </template>
      </Card>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Grouped Select</h3>
          <p class="text-sm text-gray-600 mt-1">Organize options into labeled groups</p>
        </template>

        <div class="space-y-6 max-w-md">
          <Select
            label="Country"
            placeholder="Select a country"
            v-model="selectedCountry"
            :items="[
              {
                label: 'North America',
                items: [
                  { value: 'us', label: 'United States' },
                  { value: 'ca', label: 'Canada' },
                  { value: 'mx', label: 'Mexico' },
                ],
              },
              {
                label: 'Europe',
                items: [
                  { value: 'uk', label: 'United Kingdom' },
                  { value: 'de', label: 'Germany' },
                  { value: 'fr', label: 'France' },
                  { value: 'es', label: 'Spain' },
                ],
              },
              {
                label: 'Asia',
                items: [
                  { value: 'jp', label: 'Japan' },
                  { value: 'cn', label: 'China' },
                  { value: 'in', label: 'India' },
                ],
              },
            ]"
          />
          <p v-if="selectedCountry.length" class="text-sm text-gray-600">
            Selected: <span class="font-medium">{{ selectedCountry[0] }}</span>
          </p>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Select
  :items="[
    {
      label: 'Group 1',
      items: [{ value: 'a', label: 'Option A' }]
    }
  ]"
/&gt;</code></pre>
        </template>
      </Card>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Select Sizes</h3>
          <p class="text-sm text-gray-600 mt-1">Different size variants</p>
        </template>

        <div class="space-y-6 max-w-md">
          <Select
            label="Small"
            size="sm"
            placeholder="Small select"
            :items="[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]"
          />
          <Select
            label="Medium (default)"
            size="md"
            placeholder="Medium select"
            :items="[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]"
          />
          <Select
            label="Large"
            size="lg"
            placeholder="Large select"
            :items="[
              { value: '1', label: 'Option 1' },
              { value: '2', label: 'Option 2' },
            ]"
          />
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Select size="sm" :items="[...]" /&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Tabs Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Tabs Component</h2>
      <p class="text-gray-600 mb-6">
        Inspired by <a href="https://tailwindcss.com/plus/ui-blocks/application-ui/navigation/tabs" target="_blank" class="text-indigo-600 hover:text-indigo-500 underline">Tailwind UI tabs patterns</a>
      </p>

      <!-- Tabs with Underline -->
      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Tabs with Underline</h3>
          <p class="text-sm text-gray-600 mt-1">Classic underline style with responsive mobile dropdown</p>
        </template>

        <Tabs
          variant="line"
          :responsive="true"
          :items="[
            { value: 'account', label: 'My Account', content: 'Manage your account settings and preferences.' },
            { value: 'company', label: 'Company', content: 'Update your company information and details.' },
            { value: 'team', label: 'Team Members', content: 'Invite and manage your team members.' },
            { value: 'billing', label: 'Billing', content: 'View and manage your billing information.' },
          ]"
        />

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Tabs variant="line" :responsive="true" :items="[...]" /&gt;</code></pre>
        </template>
      </Card>

      <!-- Tabs with Underline and Icons -->
      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Tabs with Underline and Icons</h3>
          <p class="text-sm text-gray-600 mt-1">Enhanced with icons for better visual hierarchy</p>
        </template>

        <Tabs
          variant="line"
          :responsive="true"
          :items="[
            { value: 'account', label: 'My Account', icon: User, content: 'Account settings with user icon.' },
            { value: 'company', label: 'Company', icon: Building2, content: 'Company information and settings.' },
            { value: 'team', label: 'Team Members', icon: Users, content: 'Manage your team and permissions.' },
            { value: 'billing', label: 'Billing', icon: CreditCard, content: 'Billing and payment information.' },
          ]"
        />

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Tabs variant="line" :items="[{ label: 'Account', icon: UserIcon, ... }]" /&gt;</code></pre>
        </template>
      </Card>

      <!-- Tabs in Pills -->
      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Tabs in Pills</h3>
          <p class="text-sm text-gray-600 mt-1">Rounded pill style for a softer appearance</p>
        </template>

        <Tabs
          variant="pills"
          :responsive="true"
          :items="[
            { value: 'account', label: 'My Account', content: 'Your personal account settings.' },
            { value: 'company', label: 'Company', content: 'Company-wide settings and information.' },
            { value: 'team', label: 'Team Members', content: 'Manage team access and roles.' },
            { value: 'billing', label: 'Billing', content: 'Subscription and payment details.' },
          ]"
        />

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Tabs variant="pills" :items="[...]" /&gt;</code></pre>
        </template>
      </Card>

      <!-- Bar with Underline (Segmented Control) -->
      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Bar with Underline</h3>
          <p class="text-sm text-gray-600 mt-1">Full-width segmented control with dividers</p>
        </template>

        <Tabs
          variant="bar"
          :responsive="true"
          :items="[
            { value: 'account', label: 'My Account', content: 'Full-width tab layout for equal spacing.' },
            { value: 'company', label: 'Company', content: 'Each tab takes equal width.' },
            { value: 'team', label: 'Team Members', content: 'Great for 3-5 tabs.' },
            { value: 'billing', label: 'Billing', content: 'Dividers separate each option.' },
          ]"
        />

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Tabs variant="bar" :items="[...]" /&gt;</code></pre>
        </template>
      </Card>

      <!-- Tabs with Badges -->
      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Tabs with Badges</h3>
          <p class="text-sm text-gray-600 mt-1">Show counts or status with badges</p>
        </template>

        <Tabs
          variant="line"
          :items="[
            { value: 'all', label: 'All', badge: '12', content: 'All 12 items in your list.' },
            { value: 'active', label: 'Active', badge: '8', content: '8 active items.' },
            { value: 'pending', label: 'Pending', badge: '3', content: '3 items pending review.' },
            { value: 'archived', label: 'Archived', badge: '1', content: '1 archived item.' },
          ]"
        />

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Tabs :items="[{ label: 'All', badge: '12', ... }]" /&gt;</code></pre>
        </template>
      </Card>

      <!-- With Custom Slot Content -->
      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">With Custom Slot Content</h3>
          <p class="text-sm text-gray-600 mt-1">Use slots for complex content with other components</p>
        </template>

        <Tabs
          variant="enclosed"
          :items="[
            { value: 'profile', label: 'Profile', icon: User },
            { value: 'settings', label: 'Settings', icon: Settings },
            { value: 'notifications', label: 'Notifications', icon: Bell },
          ]"
        >
          <template #profile>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <Avatar name="Sarah Johnson" size="lg" />
                <div>
                  <h4 class="font-semibold text-gray-900">Sarah Johnson</h4>
                  <p class="text-sm text-gray-600">sarah.johnson@example.com</p>
                </div>
              </div>
              <div class="flex gap-2">
                <Badge variant="info">Developer</Badge>
                <Badge variant="success">Active</Badge>
              </div>
            </div>
          </template>
          <template #settings>
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-900 mb-2">Preferences</h4>
                <div class="space-y-3">
                  <Checkbox label="Enable email notifications" :checked="true" />
                  <Checkbox label="Enable push notifications" />
                  <Checkbox label="Show activity status" :checked="true" />
                </div>
              </div>
            </div>
          </template>
          <template #notifications>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Email notifications</p>
                  <p class="text-xs text-gray-600">Receive notifications via email</p>
                </div>
                <Switch v-model:checked="enableNotifications" />
              </div>
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-900">Dark mode</p>
                  <p class="text-xs text-gray-600">Toggle dark theme</p>
                </div>
                <Switch v-model:checked="darkMode" />
              </div>
            </div>
          </template>
        </Tabs>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Tabs :items="[{ value: 'profile', label: 'Profile' }]"&gt;
  &lt;template #profile&gt;Custom content&lt;/template&gt;
&lt;/Tabs&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Best Practices -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Best Practices</h2>

      <Card variant="bordered" class="prose prose-sm max-w-none">
        <ul class="space-y-2">
          <li>
            <strong>Consistency:</strong> Use closed components for repeated patterns to ensure consistent UI/UX
          </li>
          <li>
            <strong>Simplicity:</strong> Closed components have simpler APIs compared to composing Ark UI primitives
          </li>
          <li>
            <strong>Type Safety:</strong> All components are fully typed with TypeScript for better DX
          </li>
          <li>
            <strong>Extensibility:</strong> Components extend base Ark UI props, allowing advanced usage when needed
          </li>
          <li>
            <strong>Documentation:</strong> Each component includes JSDoc comments and usage examples
          </li>
          <li>
            <strong>Testing:</strong> Closed components are easier to test due to simpler interfaces
          </li>
        </ul>
      </Card>
    </section>

    <!-- Resources -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Resources</h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card variant="bordered" padding="sm">
          <a
            href="https://ark-ui.com/docs/guides/closed-components"
            target="_blank"
            rel="noopener noreferrer"
            class="block hover:bg-gray-50 transition-colors rounded p-2"
          >
            <h3 class="text-base font-semibold text-indigo-600">Ark UI Closed Components Guide</h3>
            <p class="text-sm text-gray-600 mt-1">Official documentation from Ark UI</p>
          </a>
        </Card>

        <Card variant="bordered" padding="sm">
          <a
            href="/docs/CLOSED_COMPONENTS.md"
            class="block hover:bg-gray-50 transition-colors rounded p-2"
          >
            <h3 class="text-base font-semibold text-indigo-600">Project Documentation</h3>
            <p class="text-sm text-gray-600 mt-1">Learn how we implement closed components</p>
          </a>
        </Card>
      </div>
    </section>
  </div>
</template>

