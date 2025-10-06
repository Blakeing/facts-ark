<template>
  <div class="space-y-12 p-8">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Form Input Components</h1>
      <p class="text-gray-600">
        Interactive form controls for user input and selections.
      </p>
    </div>

    <!-- Input Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Input</h2>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Basic Inputs</h3>
          <p class="text-sm text-gray-600 mt-1">Simple text inputs with different types</p>
        </template>

        <div class="space-y-4 max-w-md">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Text</label>
            <Input v-model="username" placeholder="Enter your username" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <Input v-model="email" type="email" placeholder="you@example.com" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <Input v-model="password" type="password" placeholder="••••••••" />
          </div>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Input v-model="value" placeholder="Enter text" /&gt;</code></pre>
        </template>
      </Card>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Input Sizes</h3>
          <p class="text-sm text-gray-600 mt-1">Different size variants</p>
        </template>

        <div class="space-y-4 max-w-md">
          <Input size="sm" placeholder="Small input" />
          <Input size="md" placeholder="Medium input (default)" />
          <Input size="lg" placeholder="Large input" />
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Input size="lg" /&gt;</code></pre>
        </template>
      </Card>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Input States</h3>
          <p class="text-sm text-gray-600 mt-1">Disabled, readonly, and invalid states</p>
        </template>

        <div class="space-y-4 max-w-md">
          <Input placeholder="Normal input" />
          <Input placeholder="Disabled input" disabled />
          <Input value="Read-only value" readonly />
          <Input placeholder="Invalid input" invalid />
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Input disabled /&gt;
&lt;Input readonly /&gt;
&lt;Input invalid /&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Textarea Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Textarea</h2>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Basic Textarea</h3>
          <p class="text-sm text-gray-600 mt-1">Multi-line text input</p>
        </template>

        <div class="space-y-4 max-w-md">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <Textarea v-model="bio" placeholder="Tell us about yourself..." rows="4" />
          </div>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Textarea v-model="bio" rows="4" /&gt;</code></pre>
        </template>
      </Card>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Textarea Resize Options</h3>
          <p class="text-sm text-gray-600 mt-1">Control resize behavior</p>
        </template>

        <div class="space-y-4 max-w-md">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Vertical (default)</label>
            <Textarea placeholder="Can resize vertically" resize="vertical" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">None</label>
            <Textarea placeholder="Cannot resize" resize="none" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Both</label>
            <Textarea placeholder="Can resize both directions" resize="both" />
          </div>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Textarea resize="none" /&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Field Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Field (with Ark UI)</h2>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Field with Helper Text</h3>
          <p class="text-sm text-gray-600 mt-1">Accessible form fields with labels and helper text</p>
        </template>

        <div class="space-y-4 max-w-md">
          <Field label="Email" helperText="We'll never share your email">
            <ArkField.Input as-child>
              <Input v-model="email" type="email" placeholder="you@example.com" />
            </ArkField.Input>
          </Field>

          <Field label="Username" helperText="Choose a unique username" required>
            <ArkField.Input as-child>
              <Input v-model="username" placeholder="johndoe" />
            </ArkField.Input>
          </Field>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Field label="Email" helperText="Helper text" required&gt;
  &lt;ArkField.Input as-child&gt;
    &lt;Input v-model="email" /&gt;
  &lt;/ArkField.Input&gt;
&lt;/Field&gt;</code></pre>
        </template>
      </Card>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Field with Error</h3>
          <p class="text-sm text-gray-600 mt-1">Show validation errors</p>
        </template>

        <div class="space-y-4 max-w-md">
          <Field label="Email" errorText="Please enter a valid email" invalid>
            <ArkField.Input as-child>
              <Input type="email" placeholder="you@example.com" invalid />
            </ArkField.Input>
          </Field>

          <Field label="Password" errorText="Password must be at least 8 characters" invalid required>
            <ArkField.Input as-child>
              <Input type="password" placeholder="••••••••" invalid />
            </ArkField.Input>
          </Field>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Field label="Email" errorText="Error message" invalid&gt;
  &lt;ArkField.Input as-child&gt;
    &lt;Input invalid /&gt;
  &lt;/ArkField.Input&gt;
&lt;/Field&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Fieldset Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Fieldset (with Ark UI)</h2>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Grouped Fields</h3>
          <p class="text-sm text-gray-600 mt-1">Group related form fields together</p>
        </template>

        <div class="max-w-md">
          <Fieldset legend="Personal Information" helperText="Please provide your personal details">
            <div class="space-y-4">
              <Field label="First Name" required>
                <ArkField.Input as-child>
                  <Input v-model="firstName" placeholder="John" />
                </ArkField.Input>
              </Field>

              <Field label="Last Name" required>
                <ArkField.Input as-child>
                  <Input v-model="lastName" placeholder="Doe" />
                </ArkField.Input>
              </Field>

              <Field label="Email" required>
                <ArkField.Input as-child>
                  <Input v-model="email" type="email" placeholder="john@example.com" />
                </ArkField.Input>
              </Field>
            </div>
          </Fieldset>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Fieldset legend="Personal Information"&gt;
  &lt;Field label="First Name"&gt;
    &lt;ArkField.Input as-child&gt;
      &lt;Input /&gt;
    &lt;/ArkField.Input&gt;
  &lt;/Field&gt;
&lt;/Fieldset&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Checkbox Examples -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Checkbox</h2>

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
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Switch</h2>

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
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Select</h2>

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
    { label: 'Group', items: [...] }
  ]"
/&gt;</code></pre>
        </template>
      </Card>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">With Avatars</h3>
          <p class="text-sm text-gray-600 mt-1">Display user profile images</p>
        </template>

        <div class="space-y-6 max-w-md">
          <Select
            label="Assigned to"
            placeholder="Select a person"
            v-model="selectedPerson"
            :items="[
              { value: 'wade', label: 'Wade Cooper', avatar: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
              { value: 'arlene', label: 'Arlene Mccoy', avatar: 'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
              { value: 'devon', label: 'Devon Webb', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80' },
              { value: 'tom', label: 'Tom Cook', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
            ]"
          />
          <p v-if="selectedPerson.length" class="text-sm text-gray-600">
            Selected: <span class="font-medium">{{ selectedPerson[0] }}</span>
          </p>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Select
  :items="[
    { value: 'wade', label: 'Wade Cooper', avatar: 'https://...' }
  ]"
/&gt;</code></pre>
        </template>
      </Card>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">With Status Indicators</h3>
          <p class="text-sm text-gray-600 mt-1">Show online/offline status</p>
        </template>

        <div class="space-y-6 max-w-md">
          <Select
            label="Team member"
            placeholder="Select a team member"
            v-model="selectedTeamMember"
            :items="[
              { value: 'wade', label: 'Wade Cooper', status: 'online' },
              { value: 'arlene', label: 'Arlene Mccoy', status: 'offline' },
              { value: 'devon', label: 'Devon Webb', status: 'offline' },
              { value: 'tom', label: 'Tom Cook', status: 'online' },
              { value: 'tanya', label: 'Tanya Fox', status: 'offline' },
              { value: 'hellen', label: 'Hellen Schmidt', status: 'online' },
            ]"
          />
          <p v-if="selectedTeamMember.length" class="text-sm text-gray-600">
            Selected: <span class="font-medium">{{ selectedTeamMember[0] }}</span>
          </p>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Select
  :items="[
    { value: 'wade', label: 'Wade Cooper', status: 'online' }
  ]"
/&gt;</code></pre>
        </template>
      </Card>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">With Secondary Text</h3>
          <p class="text-sm text-gray-600 mt-1">Display additional information like usernames</p>
        </template>

        <div class="space-y-6 max-w-md">
          <Select
            label="User"
            placeholder="Select a user"
            v-model="selectedUser"
            :items="[
              { value: 'wade', label: 'Wade Cooper', description: '@wadecooper' },
              { value: 'arlene', label: 'Arlene Mccoy', description: '@arlenemccoy' },
              { value: 'devon', label: 'Devon Webb', description: '@devonwebb' },
              { value: 'tom', label: 'Tom Cook', description: '@tomcook' },
              { value: 'tanya', label: 'Tanya Fox', description: '@tanyafox' },
            ]"
          />
          <p v-if="selectedUser.length" class="text-sm text-gray-600">
            Selected: <span class="font-medium">{{ selectedUser[0] }}</span>
          </p>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Select
  :items="[
    { value: 'wade', label: 'Wade Cooper', description: '@wadecooper' }
  ]"
/&gt;</code></pre>
        </template>
      </Card>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Check Indicator on Left</h3>
          <p class="text-sm text-gray-600 mt-1">Alternative check mark position</p>
        </template>

        <div class="space-y-6 max-w-md">
          <Select
            label="Priority"
            placeholder="Select priority"
            v-model="selectedPriority"
            indicator-position="left"
            :items="[
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
              { value: 'urgent', label: 'Urgent' },
            ]"
          />
          <p v-if="selectedPriority.length" class="text-sm text-gray-600">
            Selected: <span class="font-medium">{{ selectedPriority[0] }}</span>
          </p>
        </div>

        <template #footer>
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Select
  indicator-position="left"
  :items="[...]"
/&gt;</code></pre>
        </template>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button, Card, Checkbox, Field, Fieldset, Input, Select, Switch, Textarea } from '@/components/ui'
import { Field as ArkField } from '@ark-ui/vue/field'

const acceptTerms = ref(false)
const enableNotifications = ref(true)
const darkMode = ref(false)
const selectedFramework = ref<string[]>([])
const selectedCountry = ref<string[]>([])
const selectedPerson = ref<string[]>([])
const selectedTeamMember = ref<string[]>([])
const selectedUser = ref<string[]>([])
const selectedPriority = ref<string[]>([])

// Form inputs
const email = ref('')
const username = ref('')
const password = ref('')
const bio = ref('')
const firstName = ref('')
const lastName = ref('')
const address = ref('')
</script>
