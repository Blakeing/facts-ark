<script setup lang="ts">
/**
 * ContactForm Component
 *
 * Simple contact form demonstrating the unified form pattern.
 * Uses TextField/Textarea components with automatic VeeValidate integration.
 */

import { TextField, Textarea } from '@/shared/ui'
import { Button } from '@/shared/ui/button'
import { useContactForm } from '../model/useContactForm'
import { computed } from 'vue'

interface Emits {
  (e: 'success'): void
}

const emit = defineEmits<Emits>()

const { form, handleSubmit, isSending, canSubmit, isSuccess, submitError } = useContactForm()

// Helper to show character count
const nameValue = computed(() => form.values.name || '')
const subjectValue = computed(() => form.values.subject || '')
const messageValue = computed(() => form.values.message || '')

async function onSubmit() {
  await handleSubmit()
  if (isSuccess.value) {
    emit('success')
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Name Field -->
    <TextField
      name="name"
      label="Name"
      placeholder="Your full name"
      :disabled="isSending"
      required
      :helper-text="`${nameValue.length}/100 characters`"
    />

    <!-- Email Field -->
    <TextField
      name="email"
      label="Email"
      type="email"
      placeholder="your.email@example.com"
      :disabled="isSending"
      required
      helper-text="We'll never share your email with anyone else."
    />

    <!-- Subject Field -->
    <TextField
      name="subject"
      label="Subject"
      placeholder="What is this about?"
      :disabled="isSending"
      required
      :helper-text="`${subjectValue.length}/200 characters`"
    />

    <!-- Message Field -->
    <Textarea
      name="message"
      label="Message"
      placeholder="Tell us more..."
      :disabled="isSending"
      required
      :rows="6"
      :helper-text="`${messageValue.length}/2000 characters`"
    />

    <!-- Error Message -->
    <div v-if="submitError" class="rounded-md bg-bg-error-subtle p-3 text-sm text-fg-error">
      <div class="flex items-start gap-2">
        <svg class="mt-0.5 h-4 w-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clip-rule="evenodd"
          />
        </svg>
        <span>{{ submitError }}</span>
      </div>
    </div>

    <!-- Submit Button -->
    <div class="flex justify-end">
      <Button type="submit" :disabled="!canSubmit" :loading="isSending">
        {{ isSending ? 'Sending...' : 'Send Message' }}
      </Button>
    </div>
  </form>
</template>

