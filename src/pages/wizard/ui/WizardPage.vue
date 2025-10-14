<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useFormWizard } from '@/features/multi-step-form'
import { Button } from '@/shared/ui/button'
import { Field, FieldInput } from '@/shared/ui/field'
import { Textarea } from '@/shared/ui/textarea'
import { Select } from '@/shared/ui/select'
import { Card } from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'

// Label component for non-Field wrapped inputs
const Label = 'label'

// Dev mode check
const isDev = import.meta.env.DEV

const wizard = useFormWizard()

// Form state
const basicInfo = ref({
  title: '',
  category: 'work' as 'work' | 'personal' | 'other',
})

const details = ref({
  description: '',
  priority: 'medium' as 'low' | 'medium' | 'high',
  dueDate: '',
})

const additional = ref({
  tags: [] as string[],
  notes: '',
})

const tagInput = ref('')

// Select v-model arrays (Select component expects arrays)
const selectedCategory = computed({
  get: () => [basicInfo.value.category],
  set: (val: string[]) => { basicInfo.value.category = (val[0] || 'work') as 'work' | 'personal' | 'other' }
})

const selectedPriority = computed({
  get: () => [details.value.priority],
  set: (val: string[]) => { details.value.priority = (val[0] || 'medium') as 'low' | 'medium' | 'high' }
})

// Watch for changes and sync to wizard machine
watch(basicInfo, (newVal) => {
  wizard.updateBasicInfo(newVal)
}, { deep: true })

watch(details, (newVal) => {
  wizard.updateDetails(newVal)
}, { deep: true })

watch(additional, (newVal) => {
  wizard.updateAdditional(newVal)
}, { deep: true })

function addTag() {
  if (tagInput.value.trim()) {
    additional.value.tags.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

function removeTag(index: number) {
  additional.value.tags.splice(index, 1)
}

function handleSubmit() {
  wizard.submit()
  // Simulate API call
  setTimeout(() => {
    wizard.send({ type: 'SUCCESS', id: 'demo-' + Date.now() })
  }, 2000)
}

function handleReset() {
  wizard.reset()
  basicInfo.value = { title: '', category: 'work' }
  details.value = { description: '', priority: 'medium', dueDate: '' }
  additional.value = { tags: [], notes: '' }
  tagInput.value = ''
}
</script>

<template>
  <div class="container mx-auto py-8 px-4 max-w-4xl">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">XState Form Wizard</h1>
      <p class="text-muted-foreground">
        Multi-step form powered by XState state machine. Watch the state transitions!
      </p>
    </div>

    <!-- Progress Bar -->
    <div class="mb-8">
      <div class="flex items-center justify-between mb-2">
        <span class="text-sm font-medium">Progress</span>
        <span class="text-sm text-muted-foreground">
          Step {{ wizard.currentStep }} of {{ wizard.totalSteps }}
        </span>
      </div>
      <div class="h-2 bg-secondary rounded-full overflow-hidden">
        <div
          class="h-full bg-primary transition-all duration-300"
          :style="{ width: `${wizard.progress}%` }"
        />
      </div>
    </div>

    <!-- State Indicator -->
    <Card class="mb-6 p-4 bg-muted/50">
      <div class="flex items-center justify-between">
        <div>
          <p class="text-sm font-medium mb-1">Current State</p>
          <Badge variant="secondary" class="font-mono">
            {{ wizard.state.value }}
          </Badge>
        </div>
        <div class="text-right">
          <p class="text-sm font-medium mb-1">Can Navigate</p>
          <div class="flex gap-2">
            <Badge :variant="wizard.canGoBack ? 'default' : 'secondary'">
              {{ wizard.canGoBack ? '← Back' : '✗ Back' }}
            </Badge>
            <Badge :variant="wizard.canGoNext ? 'default' : 'secondary'">
              {{ wizard.canGoNext ? 'Next →' : '✗ Next' }}
            </Badge>
          </div>
        </div>
      </div>
    </Card>

    <!-- Step 1: Basic Info -->
    <Card v-if="wizard.state.value === 'step1'" class="p-6">
      <h2 class="text-2xl font-semibold mb-4">Basic Information</h2>

      <div class="space-y-4">
        <Field label="Task Title *" required>
          <FieldInput
            id="title"
            v-model="basicInfo.title"
            placeholder="Enter task title"
          />
        </Field>

        <Field label="Category">
          <Select
            v-model="selectedCategory"
            placeholder="Select category"
            :items="[
              { value: 'work', label: 'Work' },
              { value: 'personal', label: 'Personal' },
              { value: 'other', label: 'Other' }
            ]"
          />
        </Field>
      </div>

      <div class="flex justify-end mt-6">
        <Button :disabled="!wizard.canGoNext" @click="wizard.next">
          Next →
        </Button>
      </div>
    </Card>

    <!-- Step 2: Details -->
    <Card v-if="wizard.state.value === 'step2'" class="p-6">
      <h2 class="text-2xl font-semibold mb-4">Task Details</h2>

      <div class="space-y-4">
        <div>
          <Label for="description">Description *</Label>
          <Textarea
            id="description"
            v-model="details.description"
            placeholder="Describe the task..."
            rows="4"
            class="mt-1.5"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <Field label="Priority">
            <Select
              v-model="selectedPriority"
              placeholder="Select priority"
              :items="[
                { value: 'low', label: 'Low' },
                { value: 'medium', label: 'Medium' },
                { value: 'high', label: 'High' }
              ]"
            />
          </Field>

          <Field label="Due Date">
            <FieldInput
              id="dueDate"
              v-model="details.dueDate"
              placeholder="YYYY-MM-DD"
            />
          </Field>
        </div>
      </div>

      <div class="flex justify-between mt-6">
        <Button variant="outline" @click="wizard.back">
          ← Back
        </Button>
        <Button :disabled="!wizard.canGoNext" @click="wizard.next">
          Next →
        </Button>
      </div>
    </Card>

    <!-- Step 3: Additional -->
    <Card v-if="wizard.state.value === 'step3'" class="p-6">
      <h2 class="text-2xl font-semibold mb-4">Additional Information</h2>

      <div class="space-y-4">
        <Field label="Tags">
          <div class="flex gap-2">
            <FieldInput
              id="tags"
              v-model="tagInput"
              placeholder="Add a tag"
              @keypress.enter.prevent="addTag"
            />
            <Button type="button" @click="addTag">Add</Button>
          </div>
          <div v-if="additional.tags.length > 0" class="flex flex-wrap gap-2 mt-3">
            <Badge
              v-for="(tag, index) in additional.tags"
              :key="index"
              variant="secondary"
              class="cursor-pointer"
              @click="removeTag(index)"
            >
              {{ tag }} ×
            </Badge>
          </div>
        </Field>

        <div>
          <Label for="notes">Notes</Label>
          <Textarea
            id="notes"
            v-model="additional.notes"
            placeholder="Additional notes..."
            rows="3"
            class="mt-1.5"
          />
        </div>
      </div>

      <div class="flex justify-between mt-6">
        <Button variant="outline" @click="wizard.back">
          ← Back
        </Button>
        <Button @click="wizard.next">
          Next →
        </Button>
      </div>
    </Card>

    <!-- Review -->
    <Card v-if="wizard.state.value === 'review'" class="p-6">
      <h2 class="text-2xl font-semibold mb-4">Review Your Submission</h2>

      <div class="space-y-6">
        <div>
          <h3 class="font-semibold mb-2">Basic Information</h3>
          <dl class="grid grid-cols-2 gap-2 text-sm">
            <dt class="text-muted-foreground">Title:</dt>
            <dd class="font-medium">{{ wizard.formData.value.basicInfo?.title }}</dd>
            <dt class="text-muted-foreground">Category:</dt>
            <dd class="font-medium">{{ wizard.formData.value.basicInfo?.category }}</dd>
          </dl>
        </div>

        <div>
          <h3 class="font-semibold mb-2">Details</h3>
          <dl class="grid grid-cols-2 gap-2 text-sm">
            <dt class="text-muted-foreground">Description:</dt>
            <dd class="font-medium">{{ wizard.formData.value.details?.description }}</dd>
            <dt class="text-muted-foreground">Priority:</dt>
            <dd class="font-medium">{{ wizard.formData.value.details?.priority }}</dd>
            <dt class="text-muted-foreground">Due Date:</dt>
            <dd class="font-medium">
              {{ wizard.formData.value.details?.dueDate || 'Not set' }}
            </dd>
          </dl>
        </div>

        <div v-if="wizard.formData.value.additional">
          <h3 class="font-semibold mb-2">Additional</h3>
          <dl class="space-y-2 text-sm">
            <div v-if="wizard.formData.value.additional.tags.length > 0">
              <dt class="text-muted-foreground mb-1">Tags:</dt>
              <dd class="flex flex-wrap gap-1">
                <Badge
                  v-for="(tag, index) in wizard.formData.value.additional.tags"
                  :key="index"
                  variant="secondary"
                  size="sm"
                >
                  {{ tag }}
                </Badge>
              </dd>
            </div>
            <div v-if="wizard.formData.value.additional.notes">
              <dt class="text-muted-foreground">Notes:</dt>
              <dd class="font-medium">{{ wizard.formData.value.additional.notes }}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div class="flex justify-between mt-6">
        <Button variant="outline" @click="wizard.back">
          ← Back
        </Button>
        <Button @click="handleSubmit">
          Submit
        </Button>
      </div>
    </Card>

    <!-- Submitting -->
    <Card v-if="wizard.state.value === 'submitting'" class="p-6">
      <div class="flex flex-col items-center justify-center py-12">
        <Loader2 class="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 class="text-xl font-semibold mb-2">Submitting...</h2>
        <p class="text-muted-foreground">Please wait while we process your request</p>
      </div>
    </Card>

    <!-- Success -->
    <Card v-if="wizard.state.value === 'success'" class="p-6">
      <div class="flex flex-col items-center justify-center py-12">
        <CheckCircle2 class="h-16 w-16 text-green-500 mb-4" />
        <h2 class="text-2xl font-semibold mb-2">Success!</h2>
        <p class="text-muted-foreground mb-6">Your task has been created successfully</p>
        <Button @click="handleReset">Create Another</Button>
      </div>
    </Card>

    <!-- Error -->
    <Card v-if="wizard.state.value === 'error'" class="p-6">
      <div class="flex flex-col items-center justify-center py-12">
        <AlertCircle class="h-16 w-16 text-destructive mb-4" />
        <h2 class="text-2xl font-semibold mb-2">Submission Failed</h2>
        <p class="text-muted-foreground mb-6">
          {{ wizard.error || 'An error occurred while submitting your form' }}
        </p>
        <div class="flex gap-2">
          <Button variant="outline" @click="wizard.back">
            ← Back to Review
          </Button>
          <Button @click="handleSubmit">
            Retry
          </Button>
        </div>
      </div>
    </Card>

    <!-- Debug Info (Development Only) -->
    <Card v-if="isDev" class="mt-6 p-4 bg-muted/50">
      <details>
        <summary class="cursor-pointer font-semibold mb-2">Debug Info</summary>
        <pre class="text-xs bg-background p-2 rounded overflow-auto">{{
          {
            state: wizard.state.value,
            currentStep: wizard.currentStep,
            progress: wizard.progress,
            canGoNext: wizard.canGoNext,
            canGoBack: wizard.canGoBack,
            formData: wizard.formData.value,
          }
        }}</pre>
      </details>
    </Card>
  </div>
</template>

