<!--
  Contact Page

  Demonstrates the unified form architecture with a simple contact form.

  Features:
  - Zod validation schema
  - XState state machine
  - VeeValidate UI integration
  - TextField and Textarea components
  - Automatic error handling and toasts
-->
<script setup lang="ts">
import { ContactForm } from '@/features/contact-form'
</script>

<template>
  <div class="p-6 space-y-6 animate-fade-in">
    <!-- Header -->
    <div>
      <h1 class="text-3xl font-bold tracking-tight text-foreground">Contact Us</h1>
      <p class="mt-2 text-muted-foreground">
        Have a question or feedback? We'd love to hear from you.
      </p>
    </div>

    <!-- Contact Form Card -->
    <div class="mx-auto max-w-2xl rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <div class="mb-6">
        <h2 class="text-xl font-semibold text-foreground">Send us a message</h2>
        <p class="mt-2 text-sm text-muted-foreground">
          Fill out the form below and we'll get back to you as soon as possible.
        </p>
      </div>

      <!-- The Contact Form -->
      <ContactForm />
    </div>

    <!-- Info Card -->
    <div class="mx-auto max-w-2xl rounded-lg border border-border bg-card p-6 text-card-foreground shadow-sm">
      <h2 class="text-xl font-semibold text-foreground">Form Architecture Demo</h2>
      <p class="mt-3 text-muted-foreground">
        This contact form demonstrates our unified form architecture pattern:
      </p>
      <ul class="mt-4 space-y-2 text-foreground">
        <li class="flex items-start gap-2">
          <span class="text-success">✓</span>
          <span><strong>Zod Schema</strong> - Type-safe validation with automatic TypeScript inference</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-success">✓</span>
          <span><strong>XState Machine</strong> - Predictable state management for form flow</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-success">✓</span>
          <span><strong>VeeValidate</strong> - Seamless UI integration with field-level validation</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-success">✓</span>
          <span><strong>Reusable Components</strong> - TextField and Textarea with consistent styling</span>
        </li>
        <li class="flex items-start gap-2">
          <span class="text-success">✓</span>
          <span><strong>Auto Toast</strong> - Automatic success/error notifications</span>
        </li>
      </ul>
      <p class="mt-4 text-sm text-muted-foreground">
        Check the console to see the submitted form data!
      </p>
    </div>
  </div>
</template>
