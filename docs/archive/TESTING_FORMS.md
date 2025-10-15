# Testing Forms Guide

## Overview

This guide provides comprehensive examples for testing the unified forms pattern, which combines XState, Zod, and VeeValidate.

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

## Unit Testing

### Testing Zod Schemas

Zod schemas are pure functions, making them easy to test.

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

  it('rejects title longer than 200 characters', () => {
    const result = todoSchema.safeParse({
      title: 'a'.repeat(201),
      priority: 'low',
    })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.path).toEqual(['title'])
    }
  })

  it('applies default values', () => {
    const result = todoSchema.safeParse({
      title: 'Test',
    })

    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.priority).toBe('medium')
      expect(result.data.category).toBe('work')
    }
  })

  it('accepts optional description', () => {
    const result = todoSchema.safeParse({
      title: 'Test',
      description: undefined,
    })

    expect(result.success).toBe(true)
  })
})
```

### Testing XState Machines

Use `createActor` and `waitFor` from XState to test state transitions.

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
  it('starts in idle state', () => {
    const machine = createFormMachine({ schema: testSchema })
    const actor = createActor(machine)
    actor.start()

    expect(actor.getSnapshot().value).toBe('idle')

    actor.stop()
  })

  it('updates form data on UPDATE_FORM_DATA event', () => {
    const machine = createFormMachine({ schema: testSchema })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'UPDATE_FORM_DATA',
      data: { name: 'John Doe' },
    })

    const context = actor.getSnapshot().context
    expect(context.formData.name).toBe('John Doe')

    actor.stop()
  })

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

  it('remains in idle on invalid data', async () => {
    const onSubmit = vi.fn()
    const machine = createFormMachine({
      schema: testSchema,
      initialData: { name: '', email: 'invalid' },
      onSubmit,
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'SUBMIT',
      data: { name: '', email: 'invalid' },
    })

    // Wait a bit to ensure state doesn't change
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(actor.getSnapshot().value).toBe('idle')
    expect(onSubmit).not.toHaveBeenCalled()

    actor.stop()
  })

  it('handles submission errors', async () => {
    const machine = createFormMachine({
      schema: testSchema,
      initialData: { name: 'John', email: 'john@example.com' },
      onSubmit: async () => {
        throw new Error('Network error')
      },
    })
    const actor = createActor(machine)
    actor.start()

    actor.send({
      type: 'SUBMIT',
      data: { name: 'John', email: 'john@example.com' },
    })

    await waitFor(actor, (snapshot) => snapshot.value === 'idle', {
      timeout: 1000,
    })

    const context = actor.getSnapshot().context
    expect(context.submitError).toBe('Network error')

    actor.stop()
  })

  it('resets form on RESET event', async () => {
    const machine = createFormMachine({
      schema: testSchema,
      initialData: { name: 'Initial', email: 'init@example.com' },
      onSubmit: async () => {},
    })
    const actor = createActor(machine)
    actor.start()

    // Submit to reach success
    actor.send({
      type: 'SUBMIT',
      data: { name: 'Updated', email: 'updated@example.com' },
    })
    await waitFor(actor, (s) => s.value === 'success')

    // Reset
    actor.send({ type: 'RESET' })

    const context = actor.getSnapshot().context
    expect(actor.getSnapshot().value).toBe('idle')
    expect(context.formData.name).toBe('Initial')
    expect(context.errors).toEqual({})

    actor.stop()
  })
})
```

### Testing Form Components

Mock VeeValidate to test form components in isolation.

```ts
// shared/ui/text-field/__tests__/TextField.spec.ts
import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import type { FieldMeta } from 'vee-validate'

// Mock VeeValidate
vi.mock('vee-validate', () => ({
  useField: vi.fn(),
}))

import TextField from '../TextField.vue'
import { useField } from 'vee-validate'

const useFieldMock = useField as unknown as Mock

function mockUseField(options = {}) {
  const valueRef = ref(options.initialValue || '')
  const metaRef = ref({
    touched: options.touched || false,
    valid: options.valid !== false,
    dirty: false,
    pending: false,
  })
  const errorMessageRef = ref(options.errorMessage || '')

  useFieldMock.mockReturnValue({
    value: valueRef,
    meta: metaRef,
    errorMessage: errorMessageRef,
    handleBlur: vi.fn(),
  })

  return { valueRef, metaRef, errorMessageRef }
}

describe('TextField', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders with label', () => {
    mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'title',
        label: 'Task Title',
      },
    })

    expect(wrapper.text()).toContain('Task Title')
  })

  it('shows error when field is invalid and touched', () => {
    mockUseField({
      touched: true,
      valid: false,
      errorMessage: 'Title is required',
    })

    const wrapper = mount(TextField, {
      props: {
        name: 'title',
        label: 'Title',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('invalid')).toBe(true)
    expect(field.props('errorText')).toBe('Title is required')
  })

  it('does not show error when untouched', () => {
    mockUseField({
      touched: false,
      valid: false,
      errorMessage: 'Title is required',
    })

    const wrapper = mount(TextField, {
      props: {
        name: 'title',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('invalid')).toBe(false)
  })

  it('passes disabled prop correctly', () => {
    mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'title',
        disabled: true,
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('disabled')).toBe(true)
  })
})
```

## Integration Testing

### Testing Feature Composables

Use `withSetup` helper to test composables with Vue context.

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

  it('initializes with correct defaults', () => {
    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    expect(createTodo.state.value.value).toBe('idle')
    expect(createTodo.form.values.status).toBe('draft')
    expect(createTodo.form.values.priority).toBe('medium')
    expect(createTodo.canSubmit.value).toBe(true)

    unmount()
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

  it('shows success toast after submission', async () => {
    const createdTodo = {
      id: '1',
      title: 'Test',
      status: 'draft' as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    vi.spyOn(todoApi, 'createTodo').mockResolvedValue({ data: createdTodo, status: 201 })

    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    createTodo.form.setFieldValue('title', 'Test')
    await nextTick()

    await createTodo.handleSubmit()
    await nextTick()
    await nextTick()

    expect(mockToast.success).toHaveBeenCalledWith({
      title: 'Success',
      description: 'Todo created successfully',
    })

    unmount()
  })

  it('prevents submission when form is invalid', async () => {
    const createSpy = vi.spyOn(todoApi, 'createTodo')

    const [createTodo, unmount] = withSetup(() => useCreateTodo())

    createTodo.form.setFieldValue('title', '')
    await nextTick()

    await createTodo.handleSubmit().catch(() => {})
    await nextTick()

    expect(createSpy).not.toHaveBeenCalled()

    unmount()
  })
})
```

## E2E Testing

### Testing Complete User Flows

```ts
// __tests__/integration/todo-crud.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Todo CRUD', () => {
  test('creates a new todo', async ({ page }) => {
    await page.goto('/todos')

    // Fill form
    await page.fill('input[name="title"]', 'Buy groceries')
    await page.fill('textarea[name="description"]', 'Milk, eggs, bread')
    await page.selectOption('select[name="priority"]', 'high')

    // Submit
    await page.click('button[type="submit"]')

    // Verify success
    await expect(page.locator('text=Todo created successfully')).toBeVisible()
    await expect(page.locator('text=Buy groceries')).toBeVisible()
  })

  test('validates required fields', async ({ page }) => {
    await page.goto('/todos')

    // Try to submit without filling required field
    await page.click('button[type="submit"]')

    // Should show validation error
    await expect(page.locator('text=Title is required')).toBeVisible()
  })
})
```

## Mocking Patterns

### Mocking VeeValidate

```ts
vi.mock('vee-validate', () => {
  const useField = vi.fn(() => ({
    value: ref(''),
    meta: ref({ valid: true, touched: false }),
    errorMessage: ref(''),
    handleBlur: vi.fn(),
  }))

  return { useField }
})
```

### Mocking Toast

```ts
const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
}

vi.mock('@/shared/ui/toast', () => ({
  useToast: () => ({ toast: mockToast }),
}))
```

### Mocking API Calls

```ts
import * as todoApi from '@/entities/todo'

// Mock implementation
vi.spyOn(todoApi, 'createTodo').mockResolvedValue({
  data: { id: '1', title: 'Test' },
  status: 201,
})

// Or mock error
vi.spyOn(todoApi, 'createTodo').mockRejectedValue(new Error('Network error'))
```

## Best Practices

### 1. Clean Up After Tests

Always unmount composables and stop actors:

```ts
it('test', () => {
  const [result, unmount] = withSetup(() => useComposable())
  const actor = createActor(machine)
  actor.start()

  // ... tests ...

  actor.stop()
  unmount()
})
```

### 2. Wait for Async Operations

```ts
// For XState
await waitFor(actor, (s) => s.value === 'success')

// For Vue reactivity
await nextTick()
```

### 3. Test Behavior, Not Implementation

```ts
// ❌ Bad: Testing internal state
expect(form.meta.value.dirty).toBe(true)

// ✅ Good: Testing user-visible behavior
expect(submitButton.disabled).toBe(false)
```

### 4. Use Descriptive Test Names

```ts
// ❌ Bad
it('works', () => { ... })

// ✅ Good
it('shows validation error when title is empty', () => { ... })
```

### 5. Keep Tests Isolated

Each test should be independent:

```ts
describe('useCreateTodo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('test 1', () => {
    // Fresh state for each test
  })
})
```

## Common Issues

### Issue: "Cannot find name 'vi'"

**Solution**: Import vi from vitest:

```ts
import { describe, it, expect, vi } from 'vitest'
```

### Issue: "waitFor timeout"

**Solution**: Check that the state transition is reachable:

```ts
// Make sure data is valid
actor.send({
  type: 'SUBMIT',
  data: { title: 'Valid Title' }, // Not empty!
})
```

### Issue: "useField is not a function"

**Solution**: Mock VeeValidate correctly:

```ts
vi.mock('vee-validate', () => ({
  useField: vi.fn(() => ({
    value: ref(''),
    meta: ref({ valid: true, touched: false }),
    errorMessage: ref(''),
    handleBlur: vi.fn(),
  })),
}))
```

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [XState Testing Guide](https://stately.ai/docs/testing)
- [Vue Test Utils](https://test-utils.vuejs.org/)
- [Playwright Testing](https://playwright.dev/)

---

**Remember**: Good tests give you confidence to refactor and evolve your code. Write tests that document how your code should be used. 🧪
