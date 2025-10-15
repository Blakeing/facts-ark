# Unified Forms Architecture Guide

## Overview

This guide describes our **unified form architecture** that brings together three powerful libraries:

- **Zod**: Schema validation (single source of truth)
- **XState**: State management and flow control
- **VeeValidate**: UI integration (dirty, touched, blur, submit)

**Goal**: One consistent pattern for all forms in the application. No decisions about "which approach to use" - just one way that works for everything from simple forms to complex multi-step wizards.

## Why This Architecture?

### Before: Multiple Approaches

- Some forms used plain Vue reactive state
- Some used VeeValidate directly
- Some used Pinia for form state
- Validation rules were scattered
- No consistent error handling
- Hard to test and maintain

### After: One Unified Pattern

✅ **Consistency**: Every form uses the same approach  
✅ **Type Safety**: Zod schemas provide TypeScript types  
✅ **Testability**: Machines, schemas, and composables are testable in isolation  
✅ **Maintainability**: Change schema, everything updates  
✅ **Developer Experience**: Clear conventions, great autocomplete  
✅ **Flexibility**: Handles simple forms to complex wizards

## Architecture Layers (FSD)

```
┌─────────────────────────────────────────────────┐
│  Pages (pages/*/ui/)                            │
│  • Consume feature composables                  │
│  • No direct form logic                         │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Features (features/*/model/)                   │
│  • useCreateTodo, useEditTodo                   │
│  • Feature-specific form logic                  │
│  • Combines schemas + machines + API calls      │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Entities (entities/*/model/schemas/)           │
│  • Zod schemas (todoSchema, userSchema)         │
│  • Entity validation rules                      │
└─────────────────────────────────────────────────┘
                      ↓
┌─────────────────────────────────────────────────┐
│  Shared (shared/lib/forms/)                     │
│  • useFormMachine                               │
│  • createFormMachine                            │
│  • createWizardMachine                          │
│  • Core form infrastructure                     │
└─────────────────────────────────────────────────┘
```

## Quick Start

### 1. Define Zod Schema (Entity Layer)

```ts
// src/entities/todo/model/schemas/todo.schema.ts
import { z } from 'zod'

export const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  category: z.enum(['work', 'personal', 'other']).default('work'),
})

export type TodoFormData = z.infer<typeof todoSchema>
```

### 2. Create Feature Composable (Feature Layer)

```ts
// src/features/add-todo/model/useCreateTodo.ts
import { useFormMachine, createFormMachine } from '@/shared/lib/forms'
import { todoSchema } from '@/entities/todo'
import { createTodo } from '@/entities/todo'
import { useToast } from '@/shared/ui'

export function useCreateTodo() {
  const { toast } = useToast()

  const machine = createFormMachine({
    schema: todoSchema,
    initialData: {
      priority: 'medium' as const,
      category: 'work' as const,
    },
    onSubmit: async (values) => {
      await createTodo(values)
      toast.success({ title: 'Success', description: 'Todo created!' })
    },
  })

  return useFormMachine({
    schema: todoSchema,
    machine,
    initialValues: {
      priority: 'medium' as const,
      category: 'work' as const,
    },
  })
}
```

### 3. Use in Page (Page Layer)

```vue
<!-- src/pages/todos/ui/TodosPage.vue -->
<script setup lang="ts">
import { TextField, Textarea, SelectField, Button } from '@/shared/ui'
import { useCreateTodo } from '@/features/add-todo'

const { form, handleSubmit, isSubmitting } = useCreateTodo()
</script>

<template>
  <form @submit="handleSubmit" class="space-y-4">
    <TextField name="title" label="Title" required placeholder="Enter todo title" />

    <Textarea name="description" label="Description" :rows="4" placeholder="Optional description" />

    <SelectField
      name="priority"
      label="Priority"
      :items="[
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' },
      ]"
    />

    <SelectField
      name="category"
      label="Category"
      :items="[
        { value: 'work', label: 'Work' },
        { value: 'personal', label: 'Personal' },
        { value: 'other', label: 'Other' },
      ]"
    />

    <Button type="submit" :disabled="!form.meta.value.valid || isSubmitting">
      {{ isSubmitting ? 'Creating...' : 'Create Todo' }}
    </Button>
  </form>
</template>
```

## Multi-Step Wizard

### 1. Define Step Schemas

```ts
// src/entities/todo/model/schemas/todo.schema.ts
export const todoBasicInfoSchema = todoSchema.pick({
  title: true,
  category: true,
})

export const todoDetailsSchema = todoSchema.pick({
  description: true,
  priority: true,
})
```

### 2. Create Wizard Composable

```ts
// src/features/multi-step-form/model/useFormWizard.ts
import { useFormMachine, createWizardMachine } from '@/shared/lib/forms'
import { todoBasicInfoSchema, todoDetailsSchema, todoSchema } from '@/entities/todo'

export function useFormWizard() {
  const machine = createWizardMachine({
    steps: [
      {
        id: 'step1',
        schema: todoBasicInfoSchema,
        fields: ['title', 'category'],
      },
      {
        id: 'step2',
        schema: todoDetailsSchema,
        fields: ['description', 'priority'],
      },
    ],
    onComplete: async (data) => {
      await submitWizard(data)
    },
  })

  return useFormMachine({
    schema: todoSchema,
    machine,
  })
}
```

### 3. Use in Page

```vue
<script setup lang="ts">
import { TextField, SelectField, Button, Card } from '@/shared/ui'
import { useFormWizard } from '@/features/multi-step-form'

const { form, state, send, isSubmitting } = useFormWizard()
</script>

<template>
  <form @submit.prevent>
    <!-- Step 1 -->
    <Card v-if="state.value.matches('step1')" class="p-6">
      <h2 class="text-2xl font-bold mb-4">Basic Information</h2>

      <div class="space-y-4">
        <TextField name="title" label="Task Title *" required />
        <SelectField name="category" label="Category" :items="categories" />
      </div>

      <div class="flex justify-end mt-6">
        <Button @click="send({ type: 'NEXT' })">Next →</Button>
      </div>
    </Card>

    <!-- Step 2 -->
    <Card v-if="state.value.matches('step2')" class="p-6">
      <h2 class="text-2xl font-bold mb-4">Task Details</h2>

      <div class="space-y-4">
        <Textarea name="description" label="Description" :rows="4" />
        <SelectField name="priority" label="Priority" :items="priorities" />
      </div>

      <div class="flex justify-between mt-6">
        <Button @click="send({ type: 'BACK' })" variant="outline">← Back</Button>
        <Button @click="send({ type: 'SUBMIT' })" :disabled="isSubmitting">
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </Button>
      </div>
    </Card>

    <!-- Success -->
    <Card v-if="state.value.matches('success')" class="p-6">
      <h2 class="text-2xl font-bold text-green-600">Success! ✓</h2>
      <p>Your wizard has been completed.</p>
    </Card>
  </form>
</template>
```

## API Reference

### `useFormMachine(options)`

The core composable that unifies everything.

#### Options

```ts
interface UseFormMachineOptions<TSchema extends z.ZodType> {
  schema: TSchema // Zod schema
  machine: AnyStateMachine // XState machine
  onSubmit?: (values) => void | Promise<void> // Submit handler

  // VeeValidate options
  validateOnMount?: boolean
  validateOnBlur?: boolean
  validateOnChange?: boolean
  validateOnInput?: boolean
  validateOnModelUpdate?: boolean

  // Initial state
  initialValues?: Partial<z.infer<TSchema>>
  initialErrors?: Record<string, string>
  initialTouched?: Record<string, boolean>
}
```

#### Returns

```ts
{
  // Core objects
  ;(form, // Full VeeValidate form API
    state, // XState machine state
    send, // Send events to machine
    actorRef, // XState actor reference
    handleSubmit, // Form submission handler
    // Computed values
    values, // Current form values
    errors, // Current errors
    meta, // Form meta (dirty, touched, valid, pending)
    // Field-level access (VeeValidate features!)
    getFieldState, // Get state of a specific field
    setFieldValue, // Set field value
    setFieldTouched, // Mark field as touched
    setFieldError, // Set field error
    resetField, // Reset field
    // Form-level controls
    resetForm, // Reset entire form
    validate, // Validate form
    validateField, // Validate specific field
    setErrors, // Set multiple errors
    setValues, // Set multiple values
    setTouched, // Set touched state
    // State checks
    isValid, // Is form valid?
    isDirty, // Has form been modified?
    isTouched, // Has any field been touched?
    isPending, // Is validation pending?
    isSubmitting, // Is form submitting?
    canSubmit, // Can form be submitted?
    // Field count helpers
    fieldCount, // Number of fields
    errorCount, // Number of errors
    touchedFieldCount, // Number of touched fields
    dirtyFieldCount) // Number of dirty fields
}
```

### `createFormMachine(config)`

Factory for standard form machines.

```ts
interface FormMachineConfig<TSchema extends z.ZodType> {
  schema: TSchema
  initialData?: Partial<z.infer<TSchema>>
  onSubmit?: (data: z.infer<TSchema>) => Promise<void>
}
```

Creates a machine with states:

- `idle`: Form is ready for input
- `validating`: Validating form data
- `submitting`: Submitting to server
- `success`: Submission successful

### `createWizardMachine(config)`

Factory for multi-step wizard machines.

```ts
interface WizardMachineConfig<TSteps extends WizardStep<any>[]> {
  steps: WizardStep[]
  onComplete?: (data: any) => Promise<void>
}

interface WizardStep<TSchema extends z.ZodType> {
  id: string // Step identifier
  schema: TSchema // Validation schema for this step
  fields: string[] // Fields to validate in this step
}
```

## VeeValidate Integration Benefits

Yes! You get **all VeeValidate features** automatically:

### Field-Level Tracking

```ts
const { getFieldState } = useFormMachine(...)

const titleState = getFieldState('title')
// {
//   value: 'My Todo',
//   touched: true,     // Has user interacted with this field?
//   dirty: true,       // Has value changed from initial?
//   valid: true,       // Is field valid?
//   errors: [],        // Field-specific errors
//   pending: false     // Is validation pending?
// }
```

### Validation Triggers

```ts
useFormMachine({
  schema: todoSchema,
  machine,
  // Control when validation happens!
  validateOnBlur: true, // Validate when field loses focus
  validateOnChange: true, // Validate on every change
  validateOnInput: false, // Don't validate on input (less noisy)
  validateOnMount: false, // Don't validate immediately
})
```

### Form Meta State

```ts
const { meta } = useFormMachine(...)

console.log(meta.value)
// {
//   dirty: false,    // Has any field changed?
//   touched: false,  // Has any field been interacted with?
//   valid: true,     // Is entire form valid?
//   pending: false   // Is any validation pending?
// }
```

### Dynamic Field Manipulation

```ts
const { setFieldValue, setFieldError, resetField } = useFormMachine(...)

// Programmatically update values
setFieldValue('title', 'New Title')

// Set custom errors
setFieldError('title', 'This title is taken')

// Reset a field to initial state
resetField('title')
```

## Testing

### Test Schema

```ts
// todo.schema.spec.ts
import { todoSchema } from './todo.schema'

describe('todoSchema', () => {
  it('validates valid todo', () => {
    const result = todoSchema.safeParse({
      title: 'Test Todo',
      priority: 'high',
    })

    expect(result.success).toBe(true)
  })

  it('requires title', () => {
    const result = todoSchema.safeParse({
      priority: 'high',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Title is required')
    }
  })
})
```

### Test Machine

```ts
// createFormMachine.spec.ts
import { createActor } from 'xstate'
import { createFormMachine } from './createFormMachine'
import { z } from 'zod'

const testSchema = z.object({
  name: z.string().min(1, 'Required'),
})

describe('createFormMachine', () => {
  it('transitions from idle to submitting on valid data', async () => {
    const machine = createFormMachine({
      schema: testSchema,
      onSubmit: async (data) => {
        expect(data.name).toBe('Test')
      },
    })

    const actor = createActor(machine)
    actor.start()

    actor.send({ type: 'UPDATE_FORM_DATA', data: { name: 'Test' } })
    actor.send({ type: 'SUBMIT', data: { name: 'Test' } })

    // Wait for machine to process
    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(actor.getSnapshot().matches('success')).toBe(true)
  })
})
```

### Test Feature Composable

```ts
// useCreateTodo.spec.ts
import { mount } from '@vue/test-utils'
import { useCreateTodo } from './useCreateTodo'

describe('useCreateTodo', () => {
  it('creates todo successfully', async () => {
    const wrapper = mount({
      setup() {
        return useCreateTodo()
      },
      template: '<div />',
    })

    const { setFieldValue, handleSubmit, isSubmitting } = wrapper.vm

    setFieldValue('title', 'Test Todo')
    await handleSubmit()

    expect(isSubmitting.value).toBe(false)
  })
})
```

## Migration from Old Patterns

### Before (Old Pattern)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { createTodo } from '@/entities/todo'

const title = ref('')
const description = ref('')
const errors = ref<Record<string, string>>({})
const isSubmitting = ref(false)

async function handleSubmit() {
  // Manual validation
  if (!title.value) {
    errors.value.title = 'Title is required'
    return
  }

  isSubmitting.value = true
  try {
    await createTodo({ title: title.value, description: description.value })
  } finally {
    isSubmitting.value = false
  }
}
</script>
```

### After (Unified Pattern)

```vue
<script setup lang="ts">
import { useCreateTodo } from '@/features/add-todo'
import { TextField, Textarea, Button } from '@/shared/ui'

const { form, handleSubmit, isSubmitting } = useCreateTodo()
</script>

<template>
  <form @submit="handleSubmit">
    <TextField name="title" label="Title" required />
    <Textarea name="description" label="Description" />
    <Button type="submit" :disabled="!form.meta.value.valid || isSubmitting"> Create </Button>
  </form>
</template>
```

Benefits:

- ✅ Less boilerplate (30+ lines → 10 lines)
- ✅ Automatic validation via Zod
- ✅ Type-safe
- ✅ Consistent error handling
- ✅ Built-in field tracking (dirty, touched)
- ✅ Testable

## Best Practices

### 1. Define Schemas at Entity Layer

```ts
// ✅ Good: In entities/todo/model/schemas/
export const todoSchema = z.object({ ... })

// ❌ Bad: Inline in feature
const schema = z.object({ ... }) // Don't do this
```

### 2. Keep Features Focused

```ts
// ✅ Good: One feature, one purpose
export function useCreateTodo() { ... }
export function useEditTodo() { ... }

// ❌ Bad: Kitchen sink composable
export function useTodo() {
  // create, edit, delete, list, filter...
} // Too much!
```

### 3. Leverage Initial Values

```ts
// ✅ Good: Set sensible defaults
useFormMachine({
  schema: todoSchema,
  machine,
  initialValues: {
    priority: 'medium' as const,
    category: 'work' as const,
  },
})
```

### 4. Use Field Names Consistently

```vue
<!-- ✅ Good: Match schema keys -->
<TextField name="title" />
<SelectField name="priority" />

<!-- ❌ Bad: Mismatched names -->
<TextField name="todoTitle" />
<!-- Schema expects 'title' -->
```

### 5. Handle Errors Gracefully

```ts
onSubmit: async (values) => {
  try {
    await createTodo(values)
    toast.success({ title: 'Success!' })
  } catch (error) {
    toast.error({
      title: 'Error',
      description: error.message,
    })
  }
}
```

## Form Reset Behavior

### Automatic Reset

Forms automatically reset after successful submission! The XState machine transitions from `success` back to `idle` after a 500ms delay, and VeeValidate automatically syncs:

```typescript
// In createFormMachine.ts
success: {
  after: {
    500: {
      target: 'idle',
      actions: 'resetForm'  // Resets machine context
    }
  }
}

// In useFormMachine.ts - watches for reset and syncs VeeValidate
watch(() => state.value.value, (newState, oldState) => {
  if (oldState === 'success' && newState === 'idle') {
    form.resetForm({
      values: options.initialValues  // Resets to initial values
    })
  }
})
```

**Benefits:**

- ✅ Multiple submissions work out of the box
- ✅ Form clears automatically after success
- ✅ Users can immediately enter another item
- ✅ No manual `resetForm()` calls needed

**Example:**

```vue
<script setup>
const { form, handleSubmit, state } = useCreateTodo()

// No need for manual reset! Just submit again:
</script>

<template>
  <form @submit="handleSubmit">
    <TextField name="title" label="Title" />
    <Button type="submit">Add Todo</Button>
  </form>

  <!-- Shows success briefly, then form resets -->
  <div v-if="state.matches('success')" class="text-green-600">Todo created! Form will reset...</div>
</template>
```

### Manual Reset (if needed)

You can still manually reset if you need to:

```typescript
const { resetForm, send } = useCreateTodo()

// Reset VeeValidate form only
resetForm()

// Reset machine state (triggers RESET event)
send({ type: 'RESET' })
```

## Mutation Factory Integration

### Automatic Query Invalidation

Use `createFormMachineWithMutation` to automatically invalidate queries after successful submission:

```typescript
// src/features/add-todo/model/useCreateTodo.ts
import { createFormMachineWithMutation } from '@/shared/lib/forms'

export function useCreateTodo() {
  const { machine } = createFormMachineWithMutation({
    schema: todoSchema,
    initialData: { priority: 'medium' as const },

    // The mutation function
    mutationFn: async (values) => {
      const response = await createTodo(values)
      return response.data
    },

    // Queries to invalidate on success
    invalidateKeys: [todoQueriesKeys.list, todoQueriesKeys.stats],

    // Automatic toasts
    successToast: {
      title: 'Success',
      description: 'Todo created successfully',
    },
    errorToast: {
      title: 'Failed to create todo',
      description: 'An error occurred',
    },

    // Optional: Optimistic updates
    optimisticUpdate: (cache, values) => {
      const rollbackData = cache.optimisticUpdate(todoQueriesKeys.list, 'temp-id', (todo) => ({
        ...todo,
        ...values,
      }))
      return {
        rollback: () => cache.rollback(todoQueriesKeys.list, rollbackData),
      }
    },
  })

  return useFormMachine({
    schema: todoSchema,
    machine,
    initialValues: { priority: 'medium' as const },
  })
}
```

**What you get:**

- ✅ Automatic query invalidation after success
- ✅ Optimistic updates with automatic rollback on error
- ✅ Toast notifications
- ✅ Consistent error handling
- ✅ No manual `refresh()` calls in components

**Before (Manual):**

```vue
<script setup>
const { data: todos, refresh } = useTodos()
const { handleSubmit, resetForm } = useCreateTodo()

// Manual refresh and reset
watch(
  () => state.value,
  (newState) => {
    if (newState === 'success') {
      refresh() // Manual!
      resetForm() // Manual!
    }
  },
)
</script>
```

**After (Automatic):**

```vue
<script setup>
const { data: todos } = useTodos() // Just use the query
const { handleSubmit } = useCreateTodo() // Auto-invalidates!

// That's it! No watchers, no manual refresh
</script>
```

### Mutation Factory Options

```typescript
interface FormMachineWithMutationConfig {
  schema: z.ZodType // Zod schema
  initialData?: Partial<FormData> // Initial form values
  mutationFn: (data) => Promise<T> // API call
  invalidateKeys: QueryKey[] // Queries to invalidate
  optimisticUpdate?: OptimisticUpdateFn // Optional optimistic UI
  successToast: ToastConfig // Success notification
  errorToast: ToastConfig // Error notification
  onSuccess?: (data, variables) => void // Additional success handler
  onError?: (error, variables) => void // Additional error handler
}
```

## Common Patterns

### Conditional Fields

```vue
<TextField name="title" />

<TextField v-if="form.values.category === 'work'" name="projectCode" label="Project Code" />
```

### Dependent Validation

```ts
export const schema = z
  .object({
    hasDeadline: z.boolean(),
    deadline: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.hasDeadline && !data.deadline) {
        return false
      }
      return true
    },
    {
      message: 'Deadline is required when checkbox is selected',
      path: ['deadline'],
    },
  )
```

### Custom Validation

```ts
export const schema = z
  .object({
    email: z.string().email(),
  })
  .refine(
    async (data) => {
      const available = await checkEmailAvailability(data.email)
      return available
    },
    {
      message: 'Email is already taken',
      path: ['email'],
    },
  )
```

## Troubleshooting

### Q: Form doesn't validate on blur?

A: Ensure VeeValidate options are set:

```ts
useFormMachine({
  schema,
  machine,
  validateOnBlur: true, // ← Add this
})
```

### Q: Getting "field not found" errors?

A: Ensure field `name` matches schema key:

```ts
const schema = z.object({
  title: z.string()  // ← Key is 'title'
})

// Template:
<TextField name="title" />  // ← Must match!
```

### Q: Values not syncing to machine?

A: The `watch` in `useFormMachine` automatically syncs values. Check that:

1. Field names match schema
2. You're using `v-model` or `name` prop correctly
3. Form is wrapped in VeeValidate context

## Testing

### Testing Philosophy

The unified forms pattern is designed for testability. Each layer can be tested in isolation:

- **Schemas**: Test validation rules with various inputs
- **Machines**: Test state transitions and flow
- **Composables**: Test integration with mocked APIs
- **Components**: Test VeeValidate integration

### Testing Zod Schemas

```ts
import { describe, it, expect } from 'vitest'
import { todoSchema } from './todo.schema'

describe('todoSchema', () => {
  it('validates valid data', () => {
    const result = todoSchema.safeParse({
      title: 'Test Todo',
      priority: 'high',
      category: 'work',
    })

    expect(result.success).toBe(true)
  })

  it('rejects empty title', () => {
    const result = todoSchema.safeParse({
      title: '',
      priority: 'medium',
    })

    expect(result.success).toBe(false)
    expect(result.error?.issues[0]?.message).toBe('Title is required')
  })
})
```

### Testing XState Machines

```ts
import { describe, it, expect } from 'vitest'
import { createActor, waitFor } from 'xstate'
import { createFormMachine } from '@/shared/lib/forms'
import { todoSchema } from '@/entities/todo'

describe('todoFormMachine', () => {
  it('starts in idle state', () => {
    const machine = createFormMachine({ schema: todoSchema })
    const actor = createActor(machine)
    actor.start()

    expect(actor.getSnapshot().value).toBe('idle')

    actor.stop()
  })

  it('transitions to success after valid submission', async () => {
    const onSubmit = vi.fn()
    const machine = createFormMachine({
      schema: todoSchema,
      initialData: { title: 'Test', priority: 'medium' },
      onSubmit,
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({ type: 'SUBMIT', data: { title: 'Test', priority: 'medium' } })

    await waitFor(actor, (snapshot) => snapshot.value === 'success')

    expect(onSubmit).toHaveBeenCalled()

    actor.stop()
  })
})
```

### Testing Composables

```ts
import { describe, it, expect, vi } from 'vitest'
import { withSetup } from '@/__tests__/helpers/withSetup'
import { useCreateTodo } from '../useCreateTodo'
import * as todoApi from '@/entities/todo'

vi.mock('@/shared/ui/toast', () => ({
  useToast: () => ({ toast: { success: vi.fn(), error: vi.fn() } }),
}))

describe('useCreateTodo', () => {
  it('initializes form correctly', () => {
    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    expect(createTodo.form).toBeDefined()
    expect(createTodo.state.value.value).toBe('idle')
    expect(createTodo.canSubmit.value).toBe(true)

    unmount()
  })

  it('calls API on valid submission', async () => {
    const createSpy = vi
      .spyOn(todoApi, 'createTodo')
      .mockResolvedValue({ data: { id: '1' }, status: 201 })

    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    createTodo.form.setFieldValue('title', 'Test')
    await createTodo.handleSubmit()

    expect(createSpy).toHaveBeenCalled()

    unmount()
  })
})
```

### Testing Form Components

```ts
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'

// Mock VeeValidate
vi.mock('vee-validate', () => ({
  useField: vi.fn(() => ({
    value: ref(''),
    meta: ref({ valid: true, touched: false }),
    errorMessage: ref(''),
    handleBlur: vi.fn(),
  })),
}))

import TextField from '../TextField.vue'

describe('TextField', () => {
  it('renders with label', () => {
    const wrapper = mount(TextField, {
      props: {
        name: 'title',
        label: 'Title',
      },
    })

    expect(wrapper.text()).toContain('Title')
  })

  it('shows error when invalid', () => {
    vi.mocked(useField).mockReturnValue({
      value: ref(''),
      meta: ref({ valid: false, touched: true }),
      errorMessage: ref('Required'),
      handleBlur: vi.fn(),
    })

    const wrapper = mount(TextField, {
      props: { name: 'title' },
    })

    expect(wrapper.text()).toContain('Required')
  })
})
```

### Test Helpers

#### withSetup Helper

Use `withSetup` for testing composables that need Vue's injection context:

```ts
import { withSetup } from '@/__tests__/helpers/withSetup'

const [result, unmount] = withSetup(() => useMyComposable())

// Use result...

unmount() // Clean up
```

### Common Pitfalls

#### 1. Not Cleaning Up After Tests

```ts
// ❌ Bad: Memory leaks
it('test', () => {
  const [result] = withSetup(() => useComposable())
  // Forgot to unmount!
})

// ✅ Good: Always cleanup
it('test', () => {
  const [result, unmount] = withSetup(() => useComposable())

  // assertions...

  unmount()
})
```

#### 2. Not Waiting for Async Operations

```ts
// ❌ Bad: Race conditions
it('test', async () => {
  actor.send({ type: 'SUBMIT' })
  expect(actor.getSnapshot().value).toBe('success') // Fails!
})

// ✅ Good: Wait for state
it('test', async () => {
  actor.send({ type: 'SUBMIT' })
  await waitFor(actor, (s) => s.value === 'success')
  expect(actor.getSnapshot().value).toBe('success')
})
```

#### 3. Testing Implementation Details

```ts
// ❌ Bad: Testing internal structure
expect(form.meta.value.dirty).toBe(false)

// ✅ Good: Testing behavior
expect(canSubmit.value).toBe(true)
```

## Lessons Learned

### Auto-Reset Eliminates Manual State Management

Before implementing auto-reset, every form needed manual cleanup:

```vue
<!-- ❌ Before: Manual management -->
<script setup>
const { handleSubmit, resetForm } = useCreateTodo()
const { refresh } = useTodos()

watch(
  () => state.value,
  (newState) => {
    if (newState === 'success') {
      refresh() // Manual!
      resetForm() // Manual!
    }
  },
)
</script>
```

After implementing auto-reset (500ms transition from success → idle):

```vue
<!-- ✅ After: Automatic -->
<script setup>
const { handleSubmit } = useCreateTodo()
// That's it! Auto-resets and auto-invalidates
</script>
```

**Impact**: Reduced form code by ~40% and eliminated bug-prone manual state management.

### Mutation Factory Pattern Reduces Boilerplate by 70%

Integrating mutation factory with form machines eliminated repetitive code:

```typescript
// Before: ~50 lines per form
export function useCreateTodo() {
  const mutation = createMutationFactory(/* ... */)
  const machine = createFormMachine(/* ... */)
  // Manual coordination between mutation and machine
  // Manual query invalidation
  // Manual toast notifications
}

// After: ~20 lines per form
export function useCreateTodo() {
  const { machine } = createFormMachineWithMutation({
    schema,
    mutationFn,
    invalidateKeys, // Automatic!
    successToast, // Automatic!
    errorToast, // Automatic!
  })
  return useFormMachine({ schema, machine })
}
```

### VeeValidate Provide/Inject Requires Form Context

**Critical Discovery**: VeeValidate v4 uses Vue's provide/inject for form context. Form-integrated components (`TextField`, `Textarea`, `SelectField`) MUST be inside a VeeValidate form context.

```vue
<!-- ✅ Works: Inside form context -->
<script setup>
const { form, handleSubmit } = useFormMachine(/* ... */)
</script>
<template>
  <form @submit="handleSubmit">
    <TextField name="title" />
    <!-- Has access to form context -->
  </form>
</template>

<!-- ❌ Fails: No form context -->
<template>
  <TextField name="title" />
  <!-- ERROR: No form context! -->
</template>
```

**Solution**: For standalone inputs, use non-integrated components (`FieldInput`, `FieldTextarea`).

### Component Naming Convention

Clear distinction between integrated and non-integrated components:

- **Integrated** (requires form context): `TextField`, `Textarea`, `SelectField`
- **Non-integrated** (standalone): `FieldInput`, `FieldTextarea`, `Select`

## Common Gotchas

### 1. TextField Requires name Prop and Form Context

```vue
<!-- ❌ Missing name prop -->
<TextField label="Title" />
<!-- ERROR -->

<!-- ❌ Outside form context -->
<TextField name="title" label="Title" />
<!-- ERROR -->

<!-- ✅ Correct -->
<form @submit="handleSubmit">
  <TextField name="title" label="Title" />
</form>
```

### 2. Use FieldInput for Non-Form Inputs

```vue
<!-- ❌ Wrong: Using integrated component outside form -->
<TextField name="search" v-model="searchQuery" />

<!-- ✅ Right: Use non-integrated component -->
<FieldInput v-model="searchQuery" placeholder="Search..." />
```

### 3. Unwrap .value in Templates for Computed Refs

Mutation factory returns computed refs that need explicit `.value`:

```vue
<script setup>
const { isPending } = useMutation()
</script>

<template>
  <!-- ❌ Wrong: Passing ref object -->
  <Button :disabled="isPending" />

  <!-- ✅ Right: Unwrap .value -->
  <Button :disabled="isPending.value" />
</template>
```

### 4. XState Snapshots Are Already Reactive in v5

```typescript
// ❌ Wrong: Double-wrapping
const state = computed(() => snapshot.value)

// ✅ Right: Use snapshot directly
const state = snapshot // Already reactive!
```

### 5. Form Reset Timing

The auto-reset happens after 500ms. If you need immediate feedback:

```vue
<div v-if="state.matches('success')" class="success-message">
  Saved! Form will reset in a moment...
</div>
```

## Quick Reference

### Complete Form Implementation

```typescript
// 1. Schema (entities/*/model/schemas/)
export const todoSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(1000).optional(),
})

// 2. Composable (features/*/model/)
export function useCreateTodo() {
  const { machine } = createFormMachineWithMutation({
    schema: todoSchema,
    mutationFn: async (values) => {
      const response = await createTodo(values)
      return response.data
    },
    invalidateKeys: [todoKeys.list, todoKeys.stats],
    successToast: { title: 'Created!' },
    errorToast: { title: 'Failed!' },
  })

  return useFormMachine({
    schema: todoSchema,
    machine,
    initialValues: { priority: 'medium' },
  })
}

// 3. Component (pages/*/ui/ or features/*/ui/)
<script setup>
const { form, handleSubmit, isSubmitting, canSubmit } = useCreateTodo()
</script>

<template>
  <form @submit="handleSubmit">
    <TextField name="title" label="Title" required />
    <Textarea name="description" label="Description" />
    <Button type="submit" :disabled="!canSubmit" :loading="isSubmitting">
      Submit
    </Button>
  </form>
</template>
```

### Migration Checklist

When converting an old form to the unified pattern:

- [ ] Replace `BaseForm` with `<form @submit="handleSubmit">`
- [ ] Replace `BaseFormField` with `TextField`/`Textarea`/`SelectField`
- [ ] Update composable to use `createFormMachineWithMutation`
- [ ] Remove manual `refresh()` calls (auto-invalidates)
- [ ] Remove manual `resetForm()` calls (auto-resets)
- [ ] Add `invalidateKeys` to mutation config
- [ ] Test multiple submissions work correctly
- [ ] Verify form resets after success
- [ ] Check toast notifications appear

## Next Steps

1. ✅ **Start Simple**: Create a basic form with `useFormMachine` + `createFormMachine`
2. ✅ **Add Complexity**: Try a multi-step wizard with `createWizardMachine`
3. ✅ **Migrate Gradually**: Convert old forms one at a time
4. ✅ **Write Tests**: Test schemas, machines, and composables in isolation
5. ✅ **Share Knowledge**: Help team members adopt the pattern

---

**Remember**: One pattern, everywhere. Consistency is the key to maintainability. 🚀
