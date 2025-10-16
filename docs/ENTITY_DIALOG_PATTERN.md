# Entity Dialog Pattern

A scalable pattern for entity CRUD dialogs, inspired by Facts app's `factsEditForm` mixin but adapted for Vue 3 Composition API.

## Overview

The Entity Dialog Pattern eliminates repetitive form scaffolding by providing a complete CRUD dialog solution with:

- **Automatic dirty checking** via JSON snapshots (like Facts app)
- **Built-in validation** using vee-validate
- **Unsaved changes confirmation**
- **Consistent UX** across all entity dialogs
- **Type-safe** with full TypeScript support

## Quick Start

### Before (Traditional Approach)

```vue
<script setup>
// ~100 lines of boilerplate
const { errors, handleSubmit, resetForm, defineField, meta } = useForm({...})
const [title, titleProps] = defineField('title', {...})
const isFormOpen = ref(false)
const editingTodoId = ref(null)
const hasChanges = computed(...)
const openAddForm = () => { /* 5 lines */ }
const openEditForm = (todo) => { /* 8 lines */ }
const closeForm = () => { /* 10 lines */ }
const handleDialogOpenChange = () => { /* 12 lines */ }
// ... more boilerplate
</script>
```

### After (Entity Dialog Pattern)

```vue
<script setup>
const todo = useTodoEntity()

const todoDialog = useEntityDialog({
  entity: todo,
  schema: createTodoSchema,
  emptyForm: { title: '', description: '' },
  getId: (t) => t.id,
  toDto: (values) => values as CreateTodoDto,
  fromModel: (t) => ({ title: t.title, description: t.description || '' }),
})
// That's it! No field definitions needed.
</script>

<template>
  <div>
    <Button @click="todoDialog.openAdd()">Add Todo</Button>

    <EntityDialog
      v-model:open="todoDialog.isOpen.value"
      :title="todoDialog.isEditMode.value ? 'Edit' : 'Add'"
      :has-changes="todoDialog.hasChanges.value"
      :is-loading="todoDialog.isLoading.value"
      @save="todoDialog.save"
      @close="todoDialog.close"
    >
      <template #default>
        <!-- 🎉 Single v-bind per field - no v-model needed! -->
        <TextField v-bind="todoDialog.field('title')" label="Title" />
        <Textarea v-bind="todoDialog.field('description')" label="Description" />
      </template>
    </EntityDialog>
  </div>
</template>
```

## API Reference

### `useEntityDialog<TModel, TDto, TFormValues>(config)`

Core composable that provides all dialog functionality.

#### Parameters

```typescript
interface EntityDialogConfig<TModel, TDto, TFormValues> {
  /** Entity instance from useEntity */
  entity: {
    create: (dto: TDto) => Promise<any>
    update: (id: string, dto: TDto) => Promise<any>
    delete?: (id: string) => Promise<any>
    isMutating: { value: boolean }
    isCreating: { value: boolean }
    isUpdating: { value: boolean }
    isDeleting: { value: boolean }
  }
  /** Zod schema for form validation */
  schema: ZodSchema<TFormValues>
  /** Initial/empty form values */
  emptyForm: TFormValues
  /** Extract ID from model */
  getId: (model: TModel) => string
  /** Convert form values to DTO for API calls */
  toDto: (values: TFormValues) => TDto
  /** Convert model to form values for editing */
  fromModel: (model: TModel) => TFormValues
}
```

#### Returns

```typescript
interface EntityDialogReturn<TModel> {
  /** vee-validate form instance (values, errors, meta, handleSubmit, resetForm, defineField) */
  form: ReturnType<typeof useForm>
  /** Helper to create field bindings - returns props for v-bind */
  field: (name: string) => {
    modelValue: any
    name: string
    onBlur: Function
    onChange: Function
    onInput: Function
  }
  /** Dialog open state */
  isOpen: { value: boolean }
  /** Whether currently editing (vs creating) */
  isEditMode: { value: boolean }
  /** Whether form has unsaved changes */
  hasChanges: { value: boolean }
  /** Currently editing model ID */
  editingId: { value: string | null }
  /** Whether any mutation is in progress */
  isLoading: { value: boolean }
  /** Open dialog for creating new entity */
  openAdd: () => void
  /** Open dialog for editing existing entity */
  openEdit: (model: TModel) => void
  /** Close dialog with unsaved changes check */
  close: () => Promise<boolean>
  /** Save form (create or update) */
  save: () => Promise<void>
  /** Force close without confirmation */
  forceClose: () => void
}
```

### `field(name: string)` Helper

The `field()` helper is a convenience method that creates all necessary bindings for a form field in one call. It internally calls `defineField` and returns an object that can be spread with `v-bind`.

**Usage:**

```vue
<TextField v-bind="todoDialog.field('title')" label="Title" />
```

**What it returns:**

- `modelValue`: The reactive value for v-model
- `name`: The field name
- `onBlur`, `onChange`, `onInput`: Validation trigger handlers
- Any additional props from vee-validate

This eliminates the need for:

```vue
<!-- Old way - 3 lines -->
const [title, titleProps] = todoDialog.form.defineField('title')
<TextField v-model="title" v-bind="titleProps" name="title" />

<!-- New way - 1 line -->
<TextField v-bind="todoDialog.field('title')" />
```

### `EntityDialog` Component

Reusable dialog wrapper component.

#### Props

```typescript
interface Props {
  /** Dialog open state */
  open: boolean
  /** Dialog title */
  title: string
  /** Whether form has unsaved changes */
  hasChanges: boolean
  /** Whether save operation is in progress */
  isLoading: boolean
  /** Submit button text */
  submitText?: string
  /** Cancel button text */
  cancelText?: string
  /** Whether to show unsaved changes warning */
  showUnsavedWarning?: boolean
}
```

#### Events

```typescript
interface Emits {
  /** Dialog open state changed */
  (e: 'update:open', value: boolean): void
  /** Save button clicked */
  (e: 'save'): void
  /** Cancel button clicked */
  (e: 'cancel'): void
  /** Dialog close requested (X button, ESC, backdrop) */
  (e: 'close'): void
}
```

#### Slots

```vue
<template #default="{ form, errors }">
  <!-- Your form fields here -->
  <!-- form: vee-validate form instance -->
  <!-- errors: validation errors object -->
</template>
```

## Examples

### Basic Entity Dialog

```vue
<script setup>
import { useEntityDialog } from '@/shared/lib/entity'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
})

const userDialog = useEntityDialog({
  entity: user,
  schema: userSchema,
  emptyForm: { name: '', email: '' },
  getId: (u) => u.id,
  toDto: (values) => values,
  fromModel: (u) => ({ name: u.name, email: u.email }),
})
</script>

<template>
  <EntityDialog
    v-model:open="userDialog.isOpen.value"
    title="User"
    :has-changes="userDialog.hasChanges.value"
    :is-loading="userDialog.isLoading.value"
    @save="userDialog.save"
    @close="userDialog.close"
  >
    <template #default>
      <!-- 🎉 Clean single v-bind pattern -->
      <TextField v-bind="userDialog.field('name')" label="Name" />
      <TextField v-bind="userDialog.field('email')" label="Email" />
    </template>
  </EntityDialog>
</template>
```

### Complex Entity with Custom Validation

```vue
<script setup>
const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  price: z.number().min(0, 'Price must be positive'),
  category: z.string().min(1, 'Category is required'),
})

const productDialog = useEntityDialog({
  entity: product,
  schema: toTypedSchema(productSchema),
  emptyForm: { name: '', price: 0, category: '' },
  getId: (p) => p.id,
  toDto: (values) => ({
    ...values,
    price: Number(values.price), // Ensure number conversion
  }),
  fromModel: (p) => ({
    name: p.name,
    price: p.price.toString(), // Convert to string for form
    category: p.category,
  }),
})
</script>
```

### Custom Submit Text

```vue
<template>
  <EntityDialog
    v-model:open="dialog.isOpen.value"
    title="Edit Product"
    submit-text="Update Product"
    cancel-text="Discard Changes"
    :has-changes="dialog.hasChanges.value"
    :is-loading="dialog.isLoading.value"
    @save="dialog.save"
    @close="dialog.close"
  >
    <!-- form content -->
  </EntityDialog>
</template>
```

## Integration with useEntity

The pattern works seamlessly with the `useEntity` composable:

```typescript
// Your entity setup
const todo = useTodoEntity()

// Dialog setup
const todoDialog = useEntityDialog({
  entity: todo, // Pass the entity instance
  // ... other config
})

// All entity operations are handled automatically:
// - todoDialog.save() calls todo.create() or todo.update()
// - todoDialog.isLoading reflects todo.isMutating
// - Cache invalidation happens automatically
```

## Comparison with Facts App

| Feature            | Facts App (Vue 2)       | Entity Dialog Pattern (Vue 3)  |
| ------------------ | ----------------------- | ------------------------------ |
| **Pattern**        | Mixin (`factsEditForm`) | Composable (`useEntityDialog`) |
| **Validation**     | ValidationObserver      | vee-validate `useForm`         |
| **Dirty Checking** | JSON snapshots          | JSON snapshots (same approach) |
| **Type Safety**    | Limited                 | Full TypeScript generics       |
| **Composition**    | Component-based         | Composable-based               |
| **Testing**        | Component testing       | Unit testing composables       |

## Best Practices

### 1. Keep Form Values Simple

```typescript
// ✅ Good - Simple form values
emptyForm: { title: '', description: '' }

// ❌ Avoid - Complex nested objects
emptyForm: {
  user: { name: '', email: '' },
  settings: { theme: 'light', notifications: true }
}
```

### 2. Use Type-Safe DTOs

```typescript
// ✅ Good - Explicit DTO conversion
toDto: (values) => ({
  title: values.title.trim(),
  description: values.description?.trim() || undefined,
})

// ❌ Avoid - Direct passthrough without validation
toDto: (values) => values
```

### 3. Handle Edge Cases in fromModel

```typescript
// ✅ Good - Handle null/undefined values
fromModel: (model) => ({
  title: model.title,
  description: model.description || '', // Handle null
  tags: model.tags?.join(', ') || '', // Handle array
})

// ❌ Avoid - Direct property access
fromModel: (model) => ({
  title: model.title,
  description: model.description, // Could be null
})
```

### 4. Consistent Naming

```typescript
// ✅ Good - Consistent naming pattern
const userDialog = useEntityDialog({ ... })
const productDialog = useEntityDialog({ ... })
const orderDialog = useEntityDialog({ ... })

// ❌ Avoid - Inconsistent naming
const userForm = useEntityDialog({ ... })
const productModal = useEntityDialog({ ... })
const orderEditor = useEntityDialog({ ... })
```

## Troubleshooting

### Form Not Resetting

If form values aren't resetting properly:

```typescript
// Check that emptyForm matches your schema exactly
const schema = z.object({
  name: z.string(),
  email: z.string().optional(),
})

const emptyForm = { name: '', email: '' } // ✅ Matches schema
const emptyForm = { name: '' } // ❌ Missing email field
```

### Dirty Checking Not Working

If dirty checking isn't detecting changes:

```typescript
// Ensure fromModel returns the same structure as emptyForm
const emptyForm = { title: '', description: '' }
const fromModel = (model) => ({
  title: model.title,
  description: model.description || '', // ✅ Consistent structure
})
```

### Type Errors

If you're getting TypeScript errors:

```typescript
// Ensure all generic types are properly specified
const dialog = useEntityDialog<User, CreateUserDto, UserFormValues>({
  // ... config
})
```

## Migration Guide

### From Traditional Forms

1. **Extract form logic** into `useEntityDialog` config
2. **Replace form setup** with composable call
3. **Update template** to use `EntityDialog` component
4. **Remove manual handlers** (open/close/save logic)

### From Facts App Mixins

1. **Replace mixin** with `useEntityDialog` composable
2. **Update validation** from ValidationObserver to vee-validate
3. **Convert props** to composable config
4. **Update template** to use new component structure

## Performance Considerations

- **Dirty checking** uses JSON.stringify - consider shallow comparison for large objects
- **Form validation** runs on every change - use debouncing for expensive validations
- **Dialog state** is reactive - avoid unnecessary re-renders with proper key usage

## Future Enhancements

- [ ] Support for multi-step forms
- [ ] Built-in field-level validation
- [ ] Integration with form builders
- [ ] Accessibility improvements
- [ ] Animation support
