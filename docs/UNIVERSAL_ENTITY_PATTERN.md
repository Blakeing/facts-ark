# Universal Entity Pattern

## Philosophy

**One pattern. Works everywhere. Scales automatically.**

The Universal Entity Pattern provides a single, consistent API for all CRUD operations across your application. Developers never have to decide between different patterns - they just use `useEntity` and it handles everything from simple cases to complex enterprise scenarios.

## Architecture

```
useEntity (Universal API)
├── Pinia Colada (queries) ← Always used for data fetching
├── Mutations with hooks ← Optional beforeSave/afterSave
├── Dirty checking ← Always available
├── Enum utilities ← Always available
└── vee-validate/XState ← Unchanged (form validation)
```

**Developers use the same API everywhere. Complexity is opt-in through hooks.**

## API Reference

### useEntity Function

```typescript
function useEntity<TModel, TResult, TListItem = TResult>(
  entityName: string,
  api: EntityApi<TModel, TResult, TListItem>,
  hooks?: EntityHooks<TModel, TResult>,
)
```

### Parameters

- **entityName**: Unique identifier for the entity (used for cache keys)
- **api**: Object containing CRUD operations
- **hooks**: Optional lifecycle hooks

### API Object

```typescript
interface EntityApi<TModel, TResult, TListItem = TResult> {
  list: () => Promise<TListItem[]> // Required
  get?: (id: string) => Promise<TResult> // Optional
  create: (data: TModel) => Promise<TResult>
  update: (id: string, data: TModel) => Promise<TResult>
  delete?: (id: string) => Promise<void> // Optional
}
```

### Hooks Object

```typescript
interface EntityHooks<TModel, TResult> {
  beforeSave?: (model: TModel) => Promise<void> | void
  afterSave?: (model: TModel, result: TResult) => Promise<void> | void
  beforeDelete?: (id: string) => Promise<void> | void
  afterDelete?: (id: string) => Promise<void> | void
}
```

### Return Value

```typescript
{
  // Query state (Pinia Colada)
  data: Ref<TListItem[] | undefined>
  status: Ref<'pending' | 'success' | 'error'>
  error: Ref<Error | null>
  refresh: () => Promise<void>
  isLoading: ComputedRef<boolean>
  isEmpty: ComputedRef<boolean>

  // Mutations (with automatic hooks)
  create: (model: TModel) => Promise<TResult>
  update: (id: string, model: TModel) => Promise<TResult>
  delete?: (id: string) => Promise<void>

  // Mutation states
  isCreating: ComputedRef<boolean>
  isUpdating: ComputedRef<boolean>
  isDeleting: ComputedRef<boolean>
  isMutating: ComputedRef<boolean>
}
```

## Examples

### Simple Case (90% of features)

```typescript
// src/entities/todo/model/useTodoEntity.ts
import { useEntity } from '@/shared/lib/entity'
import * as todoApi from '../api/todoApi'

export function useTodoEntity() {
  return useEntity<CreateTodoDto, Todo>(
    'todo',
    {
      list: async () => (await todoApi.fetchTodos()).data,
      create: async (data) => (await todoApi.createTodo(data)).data,
      update: async (id, data) => (await todoApi.updateTodo(id, data)).data,
      delete: async (id) => await todoApi.deleteTodo(id),
    },
    // No hooks needed for simple case!
  )
}

// In component
const todo = useTodoEntity()
await todo.create({ title: 'Test' }) // Just works
```

### Complex Case (10% of features)

```typescript
// src/entities/invoice/model/useInvoiceEntity.ts
export function useInvoiceEntity() {
  return useEntity<CreateInvoiceDto, Invoice>(
    'invoice',
    {
      list: async () => (await invoiceApi.fetchInvoices()).data,
      create: async (data) => (await invoiceApi.createInvoice(data)).data,
      // ... other CRUD
    },
    {
      // Add hooks when needed - automatically integrated
      beforeSave: async (invoice) => {
        // Complex validation
        if (invoice.total < 0) throw new Error('Invalid total')

        // Calculate totals
        invoice.total = invoice.items.reduce((sum, item) => sum + item.amount, 0)
      },

      afterSave: async (invoice, result) => {
        // Send notifications
        await notifyCustomer(result.id)

        // Log audit trail
        await auditLog.create({ action: 'invoice_created', invoiceId: result.id })
      },
    },
  )
}

// In component - SAME API, hooks run automatically
const invoice = useInvoiceEntity()
await invoice.create(data) // beforeSave and afterSave run automatically
```

## Integration with Existing Stack

### Pinia Colada (Queries)

- **Always used** for data fetching and caching
- Automatic stale detection and refetching
- Reactive query state management

### vee-validate (Field Validation)

- **Unchanged** - continues to handle field-level validation
- Works seamlessly with `useEntity` forms
- Field errors, touch states, validation rules

### XState (Business Logic Orchestration)

- **Unchanged** - continues to handle complex form state machines
- Coordinates with `useEntity` for API calls
- Multi-step wizards, conditional logic

### Dirty Checking (Unsaved Changes)

- **Always available** through `useFormDirtyCheck`
- Works with any form data
- Confirmation dialogs for unsaved changes

### Enum Controllers (Choice Management)

- **Always available** for dropdowns and display
- Type-safe enum management
- Consistent choice APIs across entities

## Component Usage

### Complete Example

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTodoEntity, todoStatusEnum, type Todo, type CreateTodoDto } from '@/entities/todo'
import { useFormDirtyCheck } from '@/shared/lib/forms'
import { useForm } from 'vee-validate'
import { createTodoSchema } from '@/entities/todo'

// Universal Entity Pattern - Same API everywhere!
const todo = useTodoEntity()

// vee-validate for field validation
const { values, errors, handleSubmit, resetForm, defineField } = useForm({
  validationSchema: createTodoSchema,
  initialValues: {
    title: '',
    description: '',
  },
})

const [title, titleProps] = defineField('title')
const [description, descriptionProps] = defineField('description')

// Facts dirty checking
const { hasChanges, markClean, requireConfirmOnClose } = useFormDirtyCheck(
  computed(() => values),
  async (title, message) => confirm(message),
)

// Form state
const isFormOpen = ref(false)
const editingTodoId = ref<string | null>(null)
const isEditMode = computed(() => editingTodoId.value !== null)

// Form actions
const openAddForm = () => {
  editingTodoId.value = null
  resetForm()
  isFormOpen.value = true
}

const openEditForm = (todoItem: Todo) => {
  editingTodoId.value = todoItem.id
  resetForm({ values: { title: todoItem.title, description: todoItem.description } })
  isFormOpen.value = true
}

const closeForm = async () => {
  const canClose = await requireConfirmOnClose()
  if (canClose) {
    isFormOpen.value = false
    editingTodoId.value = null
    resetForm()
  }
}

// Submit handler
const onSubmit = handleSubmit(async (formValues) => {
  try {
    if (isEditMode.value) {
      // Update - hooks run automatically if provided
      await todo.update(editingTodoId.value!, formValues)
    } else {
      // Create - hooks run automatically if provided
      await todo.create(formValues)
    }

    markClean()
    isFormOpen.value = false
    resetForm()
  } catch (error) {
    console.error('Save failed:', error)
  }
})

// Delete handler
const handleDelete = async (id: string) => {
  if (confirm('Are you sure you want to delete this todo?')) {
    await todo.delete?.(id)
  }
}
</script>

<template>
  <div>
    <!-- Loading State (Pinia Colada) -->
    <LoadingState v-if="todo.isLoading.value" />

    <!-- Error State (Pinia Colada) -->
    <ErrorState
      v-else-if="todo.error.value"
      :message="todo.error.value?.message"
      @retry="todo.refresh"
    />

    <!-- Todo List -->
    <div v-else class="space-y-3">
      <Card v-for="item in todo.data.value" :key="item.id" class="p-4">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="font-medium">{{ item.title }}</h3>
            <p class="text-sm text-gray-600">{{ item.description }}</p>
            <span class="text-xs text-gray-500">
              Status: {{ todoStatusEnum.getDescription(item.status) }}
            </span>
          </div>
          <div class="flex gap-2">
            <Button
              @click="openEditForm(item)"
              size="sm"
              variant="outline"
              :disabled="todo.isMutating.value"
            >
              Edit
            </Button>
            <Button
              @click="handleDelete(item.id)"
              size="sm"
              variant="outline"
              :disabled="todo.isDeleting.value"
            >
              Delete
            </Button>
          </div>
        </div>
      </Card>
    </div>

    <!-- Edit/Add Dialog -->
    <Dialog v-model:open="isFormOpen" @close="closeForm">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{{ isEditMode ? 'Edit Todo' : 'Add Todo' }}</DialogTitle>
        </DialogHeader>

        <form @submit="onSubmit" class="space-y-4">
          <!-- vee-validate fields -->
          <TextField
            v-model="title"
            v-bind="titleProps"
            name="title"
            label="Title"
            :error="errors.title"
            required
          />

          <Textarea
            v-model="description"
            v-bind="descriptionProps"
            name="description"
            label="Description"
            :error="errors.description"
          />

          <!-- Dirty checking indicator -->
          <div v-if="hasChanges" class="rounded bg-yellow-100 p-2 text-sm text-yellow-800">
            ⚠️ You have unsaved changes
          </div>

          <div class="flex justify-end gap-2">
            <Button type="button" variant="outline" @click="closeForm"> Cancel </Button>
            <Button
              type="submit"
              :disabled="!hasChanges || todo.isMutating.value"
              :loading="todo.isMutating.value"
            >
              {{ isEditMode ? 'Update' : 'Create' }}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  </div>
</template>
```

## Migration Guide

### From Pinia Colada Only

**Before:**

```typescript
const { data: todos, status, error, refresh } = useTodos()
const { mutate: createTodo } = useMutation({
  mutation: todoApi.createTodo,
  onSuccess: () => refresh(),
})
```

**After:**

```typescript
const todo = useTodoEntity()
// Same API, but unified
```

### From Facts Controller Pattern

**Before:**

```typescript
const controller = new TodoController()
await controller.showAdd()
await controller.insert(data)
```

**After:**

```typescript
const todo = useTodoEntity()
await todo.create(data)
// Simpler, same functionality
```

### Adding Hooks Later

**Start Simple:**

```typescript
const todo = useTodoEntity() // No hooks
```

**Add Complexity When Needed:**

```typescript
const todo = useTodoEntityWithHooks() // With hooks
// Same API, hooks run automatically
```

## Best Practices

### When to Add Hooks

**Add hooks when you need:**

- Complex validation beyond field-level
- Data transformation before save
- Notifications after save
- Audit logging
- Integration with external services
- Permission checks

**Keep it simple when:**

- Basic CRUD operations
- Simple validation (use vee-validate)
- No special business logic

### Entity Naming

- Use descriptive names: `useTodoEntity`, `useInvoiceEntity`
- Keep consistent: `use[Entity]Entity`
- For hooks version: `use[Entity]EntityWithHooks`

### Error Handling

```typescript
// Hooks can throw errors to prevent save
beforeSave: async (model) => {
  if (model.title.length < 3) {
    throw new Error('Title too short')
  }
}

// Component catches and displays
try {
  await todo.create(data)
} catch (error) {
  console.error('Save failed:', error)
}
```

### Testing

```typescript
// Test simple case
const todo = useTodoEntity()
await todo.create({ title: 'Test' })
expect(todo.data.value).toContainEqual(expect.objectContaining({ title: 'Test' }))

// Test hooks
const todoWithHooks = useTodoEntityWithHooks()
const beforeSaveSpy = vi.spyOn(todoWithHooks, 'beforeSave')
await todoWithHooks.create({ title: 'Test' })
expect(beforeSaveSpy).toHaveBeenCalled()
```

## Benefits

### For Developers

- ✅ **One pattern to learn** - no decision fatigue
- ✅ **Same API everywhere** - consistent experience
- ✅ **Works for simple → complex** - scales automatically
- ✅ **Hooks are opt-in** - add complexity only when needed
- ✅ **Type-safe** - full TypeScript support

### For Codebase

- ✅ **Consistent patterns** - easy to understand
- ✅ **Easy onboarding** - new developers learn one pattern
- ✅ **Easy refactoring** - add hooks later without changing API
- ✅ **Testable** - clear separation of concerns
- ✅ **Maintainable** - less code duplication

### For Business

- ✅ **Faster development** - less decision making
- ✅ **Fewer bugs** - consistent patterns
- ✅ **Easier maintenance** - clear architecture
- ✅ **Better scalability** - patterns grow with complexity

## Result

**One pattern. Works everywhere. Scales automatically.**

Developers never have to ask:

- "Do I use Pinia Colada or Controller?"
- "When do I need hooks?"
- "How do I handle caching?"

They just use `useEntity` - it handles everything.

---

**Last Updated:** December 2024  
**Architecture:** Universal Entity Pattern + Pinia Colada + vee-validate + XState  
**Status:** ✅ Complete and Production-Ready
