<script setup lang="ts">
import { provide } from 'vue'
import type { FormContext } from 'vee-validate'

interface BaseFormProps {
  form: FormContext
  onSubmit?: (e: Event) => void | Promise<void>
}

const props = defineProps<BaseFormProps>()

// Provide the form context to child BaseFormField components
provide('vee-validate-form', props.form)

async function handleSubmit(e: Event) {
  e.preventDefault()
  await props.onSubmit?.(e)
}
</script>

<template>
  <form @submit="handleSubmit">
    <slot />
  </form>
</template>

