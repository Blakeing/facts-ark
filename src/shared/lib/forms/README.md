# Forms Library

Core infrastructure for decoupled form architecture.

## Architecture Overview

The forms library follows a **separation of concerns** principle:

- **VeeValidate**: Single source of truth for field state, validation, and errors
- **XState**: Orchestrates submission flow (idle → submitting → success/error)
- **Zod**: Schema definitions used by VeeValidate for validation

This decoupled approach eliminates bidirectional syncing, reduces complexity, and makes each layer independently testable.

## Quick Reference

### `useFormMachine`

Core composable that integrates XState + Zod + VeeValidate with clear separation of concerns.

```ts
import { useFormMachine, createFormMachine } from '@/shared/lib/forms'
import { mySchema } from '@/entities/my-entity'

// Create submission flow machine (no validation, no data storage)
const machine = createFormMachine({
  onSubmit: async (values) => {
    await api.submit(values)
  },
})

const {
  form, // VeeValidate form (single source of truth for field state)
  state, // XState state (submission flow only)
  send, // Send events to machine
  handleSubmit, // Submit handler
  isValid, // Is form valid? (from VeeValidate)
  isSubmitting, // Is submitting? (from XState)
  isSuccess, // Submission succeeded?
  isError, // Submission failed?
  submitError, // Submission error message
  // ... many more helpers
} = useFormMachine({
  schema: mySchema,
  machine,
  initialValues: {
    /* ... */
  },
})
```

### `createFormMachine`

Factory for submission flow machines. **Note**: This only handles submission orchestration, not validation or field state.

```ts
import { createFormMachine } from '@/shared/lib/forms'

const machine = createFormMachine({
  onSubmit: async (data) => {
    await api.submit(data)
  },
})
```

**States:**

- `idle` → `submitting` → `success` → `idle` (auto-transition after 500ms)
- Or: `submitting` → `error` (if submission fails)
- Or: `error` → `idle` (via RESET event or retry SUBMIT)

### `useWizard`

Lightweight wizard composable using VeeValidate. **Recommended** over XState wizard machines for simplicity.

```ts
import { useWizard } from '@/shared/lib/forms'
import { wizardSchema } from '@/entities/my-entity'

const {
  form, // VeeValidate form
  currentStepId, // Current step identifier
  currentStepIndex, // Current step index (0-based)
  next, // Go to next step
  back, // Go to previous step
  canGoNext, // Can proceed to next step?
  canGoBack, // Can go back?
  handleComplete, // Complete wizard (validates all fields)
  progress, // Progress percentage (0-100)
} = useWizard({
  schema: wizardSchema,
  steps: [
    { id: 'step1', fields: ['title', 'category'] },
    { id: 'step2', fields: ['description', 'priority'] },
    { id: 'step3', fields: ['tags', 'notes'] },
  ],
  initialValues: {
    /* ... */
  },
  onComplete: async (data) => {
    await api.submitWizard(data)
  },
})
```

**Benefits:**

- Simple Vue composable, no XState complexity
- VeeValidate handles all validation
- Easy conditional rendering based on `currentStepId`
- Step-by-step field validation

## Common Patterns

### Simple Form

```ts
export function useMyForm() {
  // Create submission flow machine
  const machine = createFormMachine({
    onSubmit: async (values) => {
      await api.submit(values)
    },
  })

  // VeeValidate handles validation, XState handles submission
  return useFormMachine({
    schema: mySchema,
    machine,
    initialValues: {
      /* defaults */
    },
  })
}
```

### Form with Mutation Factory

**Recommended** for forms that need query invalidation and toasts:

```ts
export function useCreateTodo() {
  const { machine } = createFormMachineWithMutation({
    mutationFn: async (values) => {
      const response = await createTodo(values)
      return response.data
    },
    invalidateKeys: [todoKeys.list],
    loadingToast: {
      loading: 'Creating todo...',
      success: 'Todo created!',
      error: 'Failed to create todo',
    },
  })

  return useFormMachine({
    schema: todoSchema,
    machine,
    initialValues: { priority: 'medium' },
  })
}
```

### Edit Form with Initial Values

```ts
export function useEditForm(initialData) {
  const machine = createFormMachine({
    onSubmit: async (values) => {
      await api.update(values)
    },
  })

  return useFormMachine({
    schema: mySchema,
    machine,
    initialValues: initialData, // VeeValidate manages this
  })
}
```

### Multi-Step Wizard

```ts
export function useMyWizard() {
  return useWizard({
    schema: fullWizardSchema,
    steps: [
      { id: 'step1', fields: ['title', 'category'] },
      { id: 'step2', fields: ['description', 'priority'] },
      { id: 'step3', fields: ['tags', 'notes'] },
    ],
    initialValues: { priority: 'medium' },
    onComplete: async (data) => {
      await api.complete(data)
    },
  })
}
```

## Usage in Components

### Simple Form

```vue
<script setup lang="ts">
import { TextField, Button } from '@/shared/ui'
import { useMyForm } from '@/features/my-feature'

const {
  form, // VeeValidate form instance
  handleSubmit, // Submit handler
  isSubmitting, // From XState: is submission in progress?
  isValid, // From VeeValidate: are all fields valid?
  submitError, // From XState: submission error if any
} = useMyForm()
</script>

<template>
  <form @submit="handleSubmit">
    <!-- Field components use VeeValidate's useField internally -->
    <TextField name="title" label="Title" required />
    <TextField name="email" label="Email" type="email" required />

    <!-- Show submission error if any -->
    <div v-if="submitError" class="error">{{ submitError }}</div>

    <!-- Disable submit while invalid or submitting -->
    <Button type="submit" :disabled="!isValid || isSubmitting">
      {{ isSubmitting ? 'Submitting...' : 'Submit' }}
    </Button>
  </form>
</template>
```

### Wizard Form

```vue
<script setup lang="ts">
import { TextField, Button } from '@/shared/ui'
import { useMyWizard } from '@/features/my-feature'

const { currentStepId, next, back, canGoNext, canGoBack, handleComplete, progress } = useMyWizard()
</script>

<template>
  <form @submit.prevent="handleComplete">
    <!-- Progress indicator -->
    <div class="progress-bar" :style="{ width: progress + '%' }" />

    <!-- Step 1 -->
    <div v-if="currentStepId === 'step1'">
      <TextField name="title" label="Title" required />
      <TextField name="category" label="Category" required />
      <Button @click="next" :disabled="!canGoNext">Next</Button>
    </div>

    <!-- Step 2 -->
    <div v-if="currentStepId === 'step2'">
      <TextField name="description" label="Description" />
      <Button @click="back" :disabled="!canGoBack">Back</Button>
      <Button @click="next" :disabled="!canGoNext">Next</Button>
    </div>

    <!-- Final step -->
    <div v-if="currentStepId === 'step3'">
      <TextField name="notes" label="Notes" />
      <Button @click="back">Back</Button>
      <Button type="submit" :disabled="!canGoNext">Complete</Button>
    </div>
  </form>
</template>
```

## VeeValidate as Source of Truth

All field state and validation is managed by VeeValidate. The `form` object provides full access:

```ts
const {
  form,           // VeeValidate form instance
  values,         // Current form values (typed)
  errors,         // Current validation errors
  meta,           // Form meta (dirty, touched, valid, pending)
  setFieldValue,  // Programmatically set field value
  resetField,     // Reset specific field
  resetForm,      // Reset entire form
  validate,       // Validate all fields
  // ... many more
} = useFormMachine(...)

// Get field state
const titleState = getFieldState('title')
console.log(titleState.touched, titleState.dirty, titleState.errors)

// Manipulate fields
setFieldValue('title', 'New Title')
resetField('title')

// Form meta (from VeeValidate)
console.log(form.meta.value.dirty)  // Has form changed?
console.log(form.meta.value.valid)  // Is form valid?
console.log(form.meta.value.pending) // Is async validation pending?

// Form controls
form.resetForm()
form.validate()
form.setErrors({ title: 'Custom error' })
```

## XState Submission States

XState only manages submission flow:

```ts
const {
  state,        // XState snapshot
  isSubmitting, // Currently submitting?
  isSuccess,    // Submission succeeded?
  isError,      // Submission failed?
  submitError,  // Error message from submission
  send,         // Send events to machine
} = useFormMachine(...)

// Check submission state
if (isSubmitting.value) {
  console.log('Submitting to server...')
}

if (isError.value) {
  console.log('Submission failed:', submitError.value)
}

// Manual state control (rarely needed)
send({ type: 'RESET' }) // Reset error state
```

## TypeScript

All functions are fully typed via Zod schemas:

```ts
const schema = z.object({
  title: z.string(),
  priority: z.enum(['low', 'medium', 'high']),
})

const { values } = useFormMachine({ schema, machine })

// values is typed as:
// {
//   title: string
//   priority: 'low' | 'medium' | 'high'
// }
```

## Testing

### Test Zod Schema

```ts
import { mySchema } from './schema'

it('validates correctly', () => {
  const result = mySchema.safeParse({ title: 'Test' })
  expect(result.success).toBe(true)
})

it('rejects invalid data', () => {
  const result = mySchema.safeParse({ title: '' })
  expect(result.success).toBe(false)
  expect(result.error.issues[0].message).toBe('Title is required')
})
```

### Test Submission Machine

```ts
import { createActor, waitFor } from 'xstate'
import { createFormMachine } from '@/shared/lib/forms'

it('submits successfully', async () => {
  const onSubmit = vi.fn()
  const machine = createFormMachine({ onSubmit })

  const actor = createActor(machine)
  actor.start()

  actor.send({ type: 'SUBMIT', data: { title: 'Test' } })

  await waitFor(actor, (snapshot) => snapshot.value === 'success')

  expect(onSubmit).toHaveBeenCalledWith({ title: 'Test' })
  expect(actor.getSnapshot().value).toBe('success')
})

it('handles submission errors', async () => {
  const machine = createFormMachine({
    onSubmit: async () => {
      throw new Error('Server error')
    },
  })

  const actor = createActor(machine)
  actor.start()

  actor.send({ type: 'SUBMIT', data: { title: 'Test' } })

  await waitFor(actor, (snapshot) => snapshot.value === 'error')

  expect(actor.getSnapshot().context.submitError).toBe('Server error')
})
```

### Test Form Integration

```ts
import { mount } from '@vue/test-utils'
import { useMyForm } from './useMyForm'

it('validates and submits form', async () => {
  const wrapper = mount(MyFormComponent)

  // Fill in fields (VeeValidate validation happens automatically)
  await wrapper.find('input[name="title"]').setValue('Test Title')

  // Check validation state
  const { isValid } = useMyForm()
  expect(isValid.value).toBe(true)

  // Submit form
  await wrapper.find('form').trigger('submit')

  // Wait for submission to complete
  await wrapper.vm.$nextTick()

  // Check submission state
  expect(wrapper.emitted('success')).toBeTruthy()
})
```

## Architecture Benefits

### Clear Separation of Concerns

- **VeeValidate**: Owns all field state, validation, and errors
- **XState**: Owns only submission flow orchestration
- **Zod**: Pure schema definitions

### No Bidirectional Syncing

Old architecture had 4 watchers syncing data between VeeValidate and XState. New architecture has single-direction flow: VeeValidate validates, XState submits.

### Better Performance

- Fewer watchers = less reactivity overhead
- No duplicate state storage
- Validation happens once (in VeeValidate)

### Easier Testing

Each layer can be tested independently:

- Test Zod schemas in isolation
- Test XState machines without forms
- Test VeeValidate forms without XState

### When to Use What

**Use `useFormMachine`** when:

- You need submission flow control
- You want loading/success/error states
- You need integration with mutation factories

**Use `useWizard`** when:

- You have multi-step forms
- You need step-by-step validation
- You want progress tracking

**Use VeeValidate directly** when:

- Simple forms without submission orchestration
- You don't need loading states
- You handle submission manually

## See Also

- [Zod Documentation](https://zod.dev/)
- [XState Documentation](https://stately.ai/docs)
- [VeeValidate Documentation](https://vee-validate.logaretm.com/)
- [Pinia Colada Documentation](https://pinia-colada.esm.dev/)
