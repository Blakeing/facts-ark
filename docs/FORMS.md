# Forms Guide

This comprehensive guide covers the unified form architecture in Facts Ark, combining Zod validation, XState state management, and VeeValidate UI integration.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Quick Start](#quick-start)
- [Form Components](#form-components)
- [Multi-Step Wizards](#multi-step-wizards)
- [Testing Strategy](#testing-strategy)
- [Best Practices](#best-practices)
- [Migration Guide](#migration-guide)
- [API Reference](#api-reference)

## Architecture Overview

### Unified Form Pattern

Our unified form architecture brings together three powerful libraries:

- **Zod**: Schema validation (single source of truth)
- **XState**: State management and flow control
- **VeeValidate**: UI integration (dirty, touched, blur, submit)

**Goal**: One consistent pattern for all forms - from simple forms to complex multi-step wizards.

### Architecture Layers (FSD)

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

### Benefits

✅ **Consistency**: Every form uses the same approach  
✅ **Type Safety**: Zod schemas provide TypeScript types  
✅ **Testability**: Machines, schemas, and composables are testable in isolation  
✅ **Maintainability**: Change schema, everything updates  
✅ **Developer Experience**: Clear conventions, great autocomplete  
✅ **Flexibility**: Handles simple forms to complex wizards

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

## Form Components

### Component Organization & Naming

We use a **flat directory structure** for all UI components, following industry standards:

**Location**: `src/shared/ui/[component-name]/`

### All-in-One Form Fields (Use 95% of the Time)

Components with `-field` suffix are **complete, ready-to-use** with built-in label/error handling:

| Component     | Directory       | Purpose                    |
| ------------- | --------------- | -------------------------- |
| `TextField`   | `text-field/`   | Text input with label      |
| `Textarea`    | `textarea/`     | Multi-line text with label |
| `SelectField` | `select-field/` | Dropdown with label        |

**Example:**

```vue
<TextField label="Email" v-model="email" />
<!-- No Field wrapper needed! -->
```

### Form Primitives (Advanced Use - 5% of Cases)

Common names without suffixes are **building blocks** for custom layouts:

| Component       | Directory | Purpose                           |
| --------------- | --------- | --------------------------------- |
| `Field`         | `field/`  | Wrapper for complex layouts       |
| `FieldInput`    | `field/`  | Input inside Field                |
| `FieldTextarea` | `field/`  | Textarea inside Field             |
| `Input`         | `input/`  | Base input (used by TextField)    |
| `Select`        | `select/` | Base select (used by SelectField) |

**Example:**

```vue
<Field label="Tags">
  <!-- Custom composition for complex cases -->
  <div class="flex gap-2">
    <FieldInput v-model="tag" />
    <Button @click="add">Add</Button>
  </div>
</Field>
```

### Quick Reference Table

| Need              | Use This                          | Example                                                      |
| ----------------- | --------------------------------- | ------------------------------------------------------------ |
| Simple text input | `TextField`                       | `<TextField label="Name" v-model="name" />`                  |
| Simple textarea   | `Textarea`                        | `<Textarea label="Bio" v-model="bio" />`                     |
| Simple select     | `SelectField`                     | `<SelectField label="Type" v-model="type" :items="[...]" />` |
| Tags input        | `Field` + `FieldInput`            | Custom composition with button                               |
| Date range        | `Field` + `FieldInput` × 2        | Two inputs, one label                                        |
| Input with button | `Field` + `FieldInput` + `Button` | Custom inline action                                         |

### TextField

All-in-one text input with built-in label and validation.

**Usage:**

```vue
<script setup>
import { TextField } from '@/shared/ui'
import { ref } from 'vue'

const email = ref('')
const hasError = ref(false)
</script>

<template>
  <!-- Basic -->
  <TextField label="Email" v-model="email" type="email" placeholder="Enter your email" />

  <!-- With validation -->
  <TextField
    label="Password"
    type="password"
    v-model="password"
    :invalid="hasError"
    errorText="Password must be at least 8 characters"
    required
  />

  <!-- With helper text -->
  <TextField
    label="Username"
    v-model="username"
    helperText="Only letters, numbers, and underscores"
  />
</template>
```

**Props:**

- `label` - Label text
- `helperText` - Helper text displayed below the input
- `errorText` - Error message displayed when invalid
- `invalid` - Whether the field is in an invalid state
- `type` - Input type (text, email, password, number, tel, url, search, file)
- `size` - Input size variant (sm, md, lg)
- `variant` - Input variant for styling
- `placeholder` - Placeholder text
- `required` - Whether the field is required
- `disabled` - Whether the field is disabled
- `readonly` - Whether the field is readonly
- All standard HTML input attributes via `v-bind="$attrs"`

### Textarea

All-in-one textarea with built-in label and validation.

**Usage:**

```vue
<script setup>
import { Textarea } from '@/shared/ui'
import { ref } from 'vue'

const description = ref('')
</script>

<template>
  <!-- Basic -->
  <Textarea label="Description" v-model="description" placeholder="Enter description" :rows="4" />

  <!-- With validation -->
  <Textarea
    label="Notes"
    v-model="notes"
    :invalid="hasError"
    errorText="Notes are required"
    required
  />

  <!-- Custom resize -->
  <Textarea label="Comments" v-model="comments" resize="none" :rows="6" />
</template>
```

**Props:**

- `label` - Label text
- `helperText` - Helper text displayed below the textarea
- `errorText` - Error message displayed when invalid
- `invalid` - Whether the field is in an invalid state
- `size` - Textarea size variant (sm, md, lg)
- `variant` - Textarea variant for styling
- `resize` - Resize behavior (none, both, horizontal, vertical)
- `rows` - Number of visible rows (default: 3)
- `placeholder` - Placeholder text
- `required` - Whether the field is required
- `disabled` - Whether the field is disabled
- `readonly` - Whether the field is readonly
- All standard HTML textarea attributes via `v-bind="$attrs"`

### SelectField

All-in-one select with built-in label and validation.

**Usage:**

```vue
<script setup>
import { SelectField } from '@/shared/ui'
import { ref } from 'vue'

const category = ref(['work'])
const priority = ref(['medium'])
</script>

<template>
  <!-- Basic -->
  <SelectField
    label="Category"
    v-model="category"
    placeholder="Select category"
    :items="[
      { value: 'work', label: 'Work' },
      { value: 'personal', label: 'Personal' },
      { value: 'other', label: 'Other' },
    ]"
  />

  <!-- With validation -->
  <SelectField
    label="Priority"
    v-model="priority"
    :invalid="hasError"
    errorText="Priority is required"
    required
    :items="[
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' },
    ]"
  />

  <!-- Grouped items -->
  <SelectField
    label="Framework"
    v-model="framework"
    :items="[
      {
        label: 'Frontend',
        items: [
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' },
        ],
      },
      {
        label: 'Backend',
        items: [
          { value: 'node', label: 'Node.js' },
          { value: 'python', label: 'Python' },
        ],
      },
    ]"
  />
</template>
```

**Props:**

- `label` - Label text
- `helperText` - Helper text displayed below the select
- `errorText` - Error message displayed when invalid
- `invalid` - Whether the field is in an invalid state
- `items` - Array of select items or grouped items
- `placeholder` - Placeholder text when no value is selected
- `size` - Select size variant (sm, md, lg)
- `indicatorPosition` - Position of check indicator (left, right)
- `required` - Whether the field is required
- `disabled` - Whether the field is disabled
- All Ark UI Select props via `v-bind="$attrs"`

**Note:** SelectField uses array-based v-model like `v-model="[value]"` due to Ark UI's internal implementation.

### When to Use Field Wrapper (Edge Cases)

For **complex, custom layouts** that need multiple inputs or custom composition inside a single field context, use the `Field` wrapper with `FieldInput`/`FieldTextarea` components:

```vue
<template>
  <!-- Complex: Tags input with button and badge display -->
  <Field label="Tags">
    <div class="flex gap-2">
      <FieldInput v-model="tagInput" placeholder="Add a tag" @keypress.enter.prevent="addTag" />
      <Button @click="addTag">Add</Button>
    </div>
    <div v-if="tags.length" class="flex flex-wrap gap-2 mt-3">
      <Badge v-for="(tag, index) in tags" :key="index" @click="removeTag(index)">
        {{ tag }} ×
      </Badge>
    </div>
  </Field>

  <!-- Complex: Date range with two inputs -->
  <Field label="Date Range">
    <div class="flex gap-2">
      <FieldInput v-model="startDate" placeholder="Start" />
      <span>to</span>
      <FieldInput v-model="endDate" placeholder="End" />
    </div>
  </Field>

  <!-- Complex: Password with generate button -->
  <Field label="Password">
    <div class="flex items-center gap-2">
      <FieldInput type="password" v-model="password" />
      <Button @click="generatePassword">Generate</Button>
    </div>
  </Field>
</template>
```

**When to use Field wrapper:**

- Multiple inputs under one label
- Custom layout between label and input
- Input with inline actions (buttons, icons)
- Conditional content based on field state
- Very specific one-off business logic (< 5% of cases)

**Best practice:** If you find yourself repeating a complex Field pattern, extract it to a reusable component instead.

## Multi-Step Wizards

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

## Testing Strategy

### Test Pyramid

```
           ┌─────────────────┐
           │  E2E Tests      │  ← Few: Complete user flows
           └─────────────────┘
         ┌───────────────────────┐
         │  Integration Tests    │  ← Some: Feature composables
         └───────────────────────┘
       ┌──────────────────────────────┐
       │  Unit Tests                  │  ← Many: Schemas, machines, components
       └──────────────────────────────┘
```

**Unit Tests**: Test individual pieces in isolation

- Zod schemas
- XState machines
- Form components (TextField, SelectField, etc.)

**Integration Tests**: Test feature composables

- useCreateTodo
- useFormWizardUnified
- API interactions

**E2E Tests**: Test complete user flows

- Create todo from UI
- Multi-step wizard completion

### Testing Zod Schemas

```ts
// entities/todo/model/schemas/__tests__/todo.schema.spec.ts
import { describe, it, expect } from 'vitest'
import { todoSchema } from '../todo.schema'

describe('todoSchema', () => {
  it('accepts valid todo data', () => {
    const result = todoSchema.safeParse({
      title: 'Buy groceries',
      description: 'Milk, eggs, bread',
      priority: 'high',
      category: 'personal',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.title).toBe('Buy groceries')
      expect(result.data.priority).toBe('high')
    }
  })

  it('rejects empty title', () => {
    const result = todoSchema.safeParse({
      title: '',
      priority: 'medium',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['title'])
      expect(result.error.issues[0]?.message).toBe('Title is required')
    }
  })
})
```

### Testing XState Machines

```ts
// shared/lib/forms/__tests__/createFormMachine.spec.ts
import { describe, it, expect, vi } from 'vitest'
import { createActor, waitFor } from 'xstate'
import { z } from 'zod'
import { createFormMachine } from '../createFormMachine'

const testSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
})

describe('createFormMachine', () => {
  it('validates and submits valid data', async () => {
    const onSubmit = vi.fn()
    const machine = createFormMachine({
      schema: testSchema,
      initialData: { name: 'John', email: 'john@example.com' },
      onSubmit,
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'SUBMIT',
      data: { name: 'John', email: 'john@example.com' },
    })

    await waitFor(actor, (snapshot) => snapshot.value === 'success', {
      timeout: 1000,
    })

    expect(onSubmit).toHaveBeenCalledWith({
      name: 'John',
      email: 'john@example.com',
    })
    expect(actor.getSnapshot().value).toBe('success')

    actor.stop()
  })
})
```

### Testing Feature Composables

```ts
// features/add-todo/__tests__/useCreateTodo.spec.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { nextTick } from 'vue'
import { withSetup } from '@/__tests__/helpers/withSetup'
import { useCreateTodo } from '../model/useCreateTodo'
import * as todoApi from '@/entities/todo'

// Mock dependencies
const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
}

vi.mock('@/shared/ui/toast', () => ({
  useToast: () => ({ toast: mockToast }),
}))

describe('useCreateTodo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls API on valid submission', async () => {
    const createdTodo = {
      id: '1',
      title: 'Test Todo',
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    const createSpy = vi
      .spyOn(todoApi, 'createTodo')
      .mockResolvedValue({ data: createdTodo, status: 201 })

    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    createTodo.form.setFieldValue('title', 'Test Todo')
    await nextTick()

    await createTodo.handleSubmit()
    await nextTick()
    await nextTick()

    expect(createSpy).toHaveBeenCalledWith({
      title: 'Test Todo',
      description: undefined,
    })

    unmount()
  })
})
```

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

### 6. Use All-in-One for Simple Cases (95%)

```vue
<!-- ✅ Good: Simple, readable -->
<TextField label="Email" v-model="email" required />
<Textarea label="Notes" v-model="notes" :rows="4" />
<SelectField label="Priority" v-model="priority" :items="items" />
```

### 7. Extract Complex Patterns to Components

Instead of repeating complex Field layouts:

```vue
<!-- ❌ Bad: Repeating complex pattern -->
<Field label="Tags">
  <div class="flex gap-2">
    <FieldInput v-model="tagInput" @keypress.enter="addTag" />
    <Button @click="addTag">Add</Button>
  </div>
  <!-- ... badge display ... -->
</Field>
```

Extract to a reusable component:

```vue
<!-- ✅ Good: Reusable component -->
<TagsInputField label="Tags" v-model="tags" />
```

## Migration Guide

### From Old Patterns

**Before (Old Pattern):**

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

**After (Unified Pattern):**

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

## Resources

- [Feature-Sliced Design Official Docs](https://feature-sliced.design/)
- [Zod Documentation](https://zod.dev/)
- [XState Documentation](https://stately.ai/docs)
- [VeeValidate Documentation](https://vee-validate.logaretm.com/v4/)
- [Ark UI Components](https://ark-ui.com/docs/components)

---

**Remember**: One pattern, everywhere. Consistency is the key to maintainability. 🚀

Every form in the application can now use the same approach:

1. Define Zod schema (entity layer)
2. Create feature composable (feature layer)
3. Use in page with UI components (page layer)

No more decisions about which approach to use. No more scattered validation logic. Just one clean, consistent, type-safe pattern.
