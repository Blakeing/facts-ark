<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { TextField, Textarea, SelectField, Button, Card } from '@/shared/ui'
import { useCreateTodo } from '@/features/add-todo'
import { AlertCircle, CheckCircle2 } from 'lucide-vue-next'

const { form, handleSubmit, isSubmitting, isValid, state, canSubmit } = useCreateTodo()

const isDev = import.meta.env.DEV

const categories = [
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'other', label: 'Other' }
]

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
]
</script>

<template>
  <div class="container max-w-2xl mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold mb-2">Unified Form Example</h1>
    <p class="text-muted-foreground mb-8">
      This demonstrates the unified form pattern using XState + Zod + VeeValidate
    </p>

    <Card class="p-6">
      <form @submit="handleSubmit" class="space-y-6">
        <div class="space-y-4">
          <TextField
            name="title"
            label="Task Title"
            required
            placeholder="Enter your task title"
            helper-text="Give your task a descriptive title"
          />

          <Textarea
            name="description"
            label="Description"
            :rows="4"
            placeholder="Optional description..."
          />

          <div class="grid grid-cols-2 gap-4">
            <SelectField
              name="category"
              label="Category"
              :items="categories"
            />

            <SelectField
              name="priority"
              label="Priority"
              :items="priorities"
            />
          </div>
        </div>

        <div class="flex items-center justify-between pt-4 border-t">
          <div class="flex items-center gap-2 text-sm text-muted-foreground">
            <CheckCircle2 v-if="state.matches('success')" class="w-4 h-4 text-green-600" />
            <AlertCircle v-else-if="!isValid" class="w-4 h-4 text-amber-600" />
            <span v-if="state.matches('success')">Task created successfully!</span>
            <span v-else-if="!isValid">Please fill in all required fields</span>
            <span v-else>Ready to submit</span>
          </div>

          <Button
            type="submit"
            :disabled="!isValid || isSubmitting"
          >
            {{ isSubmitting ? 'Creating...' : 'Create Task' }}
          </Button>
        </div>
      </form>

      <!-- Debug Info (Dev Only) -->
      <div v-if="isDev" class="mt-8 pt-6 border-t">
        <h3 class="text-sm font-semibold mb-2">Debug Info</h3>
        <div class="grid grid-cols-2 gap-4 text-xs">
          <div>
            <p class="font-semibold text-muted-foreground">Form State:</p>
            <ul class="mt-1 space-y-1">
              <li>Valid: {{ isValid }}</li>
              <li>Dirty: {{ form.meta.value.dirty }}</li>
              <li>Touched: {{ form.meta.value.touched }}</li>
              <li>Submitting: {{ isSubmitting }}</li>
            </ul>
          </div>
          <div>
            <p class="font-semibold text-muted-foreground">Machine State:</p>
            <ul class="mt-1 space-y-1">
              <li>Current: {{ state.value }}</li>
              <li>Can Submit: {{ canSubmit }}</li>
            </ul>
          </div>
        </div>

        <div class="mt-4">
          <p class="font-semibold text-muted-foreground mb-2">Form Values:</p>
          <pre class="bg-muted p-3 rounded text-xs overflow-auto max-h-40">{{ form.values }}</pre>
        </div>
      </div>
    </Card>

    <!-- Pattern Info -->
    <Card class="mt-8 p-6">
      <h2 class="text-xl font-bold mb-4">About This Pattern</h2>

      <div class="space-y-4 text-sm">
        <div>
          <h3 class="font-semibold mb-1">✅ What You Get:</h3>
          <ul class="list-disc list-inside space-y-1 text-muted-foreground">
            <li>Type-safe forms via Zod schemas</li>
            <li>State management via XState</li>
            <li>UI integration via VeeValidate (dirty, touched, errors)</li>
            <li>Automatic validation on blur</li>
            <li>One consistent pattern everywhere</li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-1">📁 File Structure (FSD):</h3>
          <ul class="list-disc list-inside space-y-1 text-muted-foreground">
            <li><code>shared/lib/forms/</code> - Core infrastructure</li>
            <li><code>entities/todo/model/schemas/</code> - Zod schemas</li>
            <li><code>features/add-todo/model/</code> - Feature composable</li>
            <li><code>pages/form-example/ui/</code> - This page</li>
          </ul>
        </div>

        <div>
          <h3 class="font-semibold mb-1">📖 Documentation:</h3>
          <p class="text-muted-foreground">
            See <code>docs/UNIFIED_FORMS_GUIDE.md</code> for complete guide
          </p>
        </div>
      </div>
    </Card>
  </div>
</template>

