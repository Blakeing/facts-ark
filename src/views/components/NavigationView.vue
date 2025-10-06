<template>
  <div class="space-y-12 p-8">
    <!-- Page Header -->
    <div>
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Navigation Components</h1>
      <p class="text-gray-600">
        Components for organizing and navigating through content.
        <a
          href="https://tailwindcss.com/plus/ui-blocks/application-ui/navigation/tabs"
          target="_blank"
          class="text-indigo-600 hover:text-indigo-500 underline"
        >
          Inspired by Tailwind UI
        </a>
      </p>
    </div>

    <!-- Tabs with Underline -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Tabs with Underline</h2>

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">Basic Tabs</h3>
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

      <Card variant="bordered" class="mb-6">
        <template #header>
          <h3 class="text-lg font-semibold">With Icons</h3>
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
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Tabs :items="[{ label: 'Account', icon: UserIcon }]" /&gt;</code></pre>
        </template>
      </Card>
    </section>

    <!-- Tabs in Pills -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Tabs in Pills</h2>

      <Card variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">Pills Style</h3>
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
    </section>

    <!-- Bar with Underline -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Bar with Underline</h2>

      <Card variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">Segmented Control</h3>
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
    </section>

    <!-- Tabs with Badges -->
    <section>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">Tabs with Badges</h2>

      <Card variant="bordered">
        <template #header>
          <h3 class="text-lg font-semibold">With Count Badges</h3>
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
          <pre class="text-xs bg-gray-50 p-3 rounded overflow-x-auto"><code>&lt;Tabs :items="[{ label: 'All', badge: '12' }]" /&gt;</code></pre>
        </template>
      </Card>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Card, Tabs } from '@/components/ui'
import { User, Building2, Users, CreditCard } from 'lucide-vue-next'
</script>
