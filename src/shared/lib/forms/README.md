# Forms Library

Core infrastructure for the unified form architecture.

## Quick Reference

### `useFormMachine`

Core composable that integrates XState + Zod + VeeValidate.

```ts
import { useFormMachine, createFormMachine } from '@/shared/lib/forms'
import { mySchema } from '@/entities/my-entity'

const machine = createFormMachine({
  schema: mySchema,
  onSubmit: async (values) => {
    await api.submit(values)
  },
})

const {
  form, // VeeValidate form
  state, // XState state
  send, // Send events
  handleSubmit, // Submit handler
  isValid, // Is form valid?
  isSubmitting, // Is submitting?
  // ... many more helpers
} = useFormMachine({
  schema: mySchema,
  machine,
})
```

### `createFormMachine`

Factory for standard form state machines.

```ts
import { createFormMachine } from '@/shared/lib/forms'
import { mySchema } from '@/entities/my-entity'

const machine = createFormMachine({
  schema: mySchema,
  initialData: { priority: 'medium' },
  onSubmit: async (data) => {
    await api.submit(data)
  },
})
```

**States:**

- `idle` → `validating` → `submitting` → `success`
- Or: `validating` → `idle` (if invalid)
- Or: `submitting` → `idle` (if error)

### `createWizardMachine`

Factory for multi-step wizard machines.

```ts
import { createWizardMachine } from '@/shared/lib/forms'
import { step1Schema, step2Schema } from '@/entities/my-entity'

const machine = createWizardMachine({
  steps: [
    {
      id: 'step1',
      schema: step1Schema,
      fields: ['title', 'category'],
    },
    {
      id: 'step2',
      schema: step2Schema,
      fields: ['description', 'priority'],
    },
  ],
  onComplete: async (data) => {
    await api.submitWizard(data)
  },
})
```

**States:**

- `step1` → `step2` → `step3` → `validating` → `submitting` → `success`
- Back navigation: `step2` → `step1`
- Or: `submitting` → `lastStep` (if error)

## Common Patterns

### Simple Form

```ts
export function useMyForm() {
  const machine = createFormMachine({
    schema: mySchema,
    onSubmit: async (values) => {
      await api.submit(values)
    },
  })

  return useFormMachine({ schema: mySchema, machine })
}
```

### With Initial Values

```ts
export function useEditForm(initialData) {
  const machine = createFormMachine({
    schema: mySchema,
    initialData,
  })

  return useFormMachine({
    schema: mySchema,
    machine,
    initialValues: initialData,
  })
}
```

### Multi-Step Wizard

```ts
export function useWizard() {
  const machine = createWizardMachine({
    steps: [
      { id: 'step1', schema: step1Schema, fields: ['field1'] },
      { id: 'step2', schema: step2Schema, fields: ['field2'] },
    ],
    onComplete: async (data) => {
      await api.complete(data)
    },
  })

  return useFormMachine({ schema: fullSchema, machine })
}
```

## Usage in Components

```vue
<script setup lang="ts">
import { TextField, Button } from '@/shared/ui'
import { useMyForm } from '@/features/my-feature'

const { form, handleSubmit, isSubmitting, isValid } = useMyForm()
</script>

<template>
  <form @submit="handleSubmit">
    <TextField name="title" label="Title" required />

    <Button type="submit" :disabled="!isValid || isSubmitting"> Submit </Button>
  </form>
</template>
```

## VeeValidate Features

All VeeValidate features are available via the `form` object:

```ts
const { form, getFieldState, setFieldValue, resetField } = useFormMachine(...)

// Get field state
const titleState = getFieldState('title')
console.log(titleState.touched, titleState.dirty, titleState.errors)

// Manipulate fields
setFieldValue('title', 'New Title')
resetField('title')

// Form meta
console.log(form.meta.value.dirty)  // Has form changed?
console.log(form.meta.value.valid)  // Is form valid?

// Form controls
form.resetForm()
form.validate()
form.setErrors({ title: 'Custom error' })
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

### Test Schema

```ts
import { mySchema } from './schema'

it('validates correctly', () => {
  const result = mySchema.safeParse({ title: 'Test' })
  expect(result.success).toBe(true)
})
```

### Test Machine

```ts
import { createActor } from 'xstate'
import { createFormMachine } from '@/shared/lib/forms'

it('submits successfully', async () => {
  const machine = createFormMachine({
    schema: mySchema,
    onSubmit: async (data) => {
      expect(data.title).toBe('Test')
    },
  })

  const actor = createActor(machine)
  actor.start()

  actor.send({ type: 'UPDATE_FORM_DATA', data: { title: 'Test' } })
  actor.send({ type: 'SUBMIT', data: { title: 'Test' } })

  await new Promise((resolve) => setTimeout(resolve, 100))

  expect(actor.getSnapshot().matches('success')).toBe(true)
})
```

## See Also

- [UNIFIED_FORMS_GUIDE.md](../../../docs/UNIFIED_FORMS_GUIDE.md) - Complete guide
- [Zod Documentation](https://zod.dev/)
- [XState Documentation](https://stately.ai/docs)
- [VeeValidate Documentation](https://vee-validate.logaretm.com/)
