# Facts Patterns Integration Guide

This document explains how Facts project patterns have been integrated into the Ark application's FSD + MVVM architecture.

## Overview

The integration brings several powerful patterns from the Facts project:

1. **Enhanced Cache System** - Tenant-aware caching with stale detection
2. **Controller Pattern** - Standardized CRUD operations with lifecycle hooks
3. **Form Dirty Checking** - Change detection and unsaved changes handling
4. **Enum Utilities** - Type-safe choice management
5. **API Error State** - Better error handling and auto-disable capabilities
6. **URL Builder Pattern** - Type-safe, domain-organized URL generation

## Architecture Mapping: FSD + MVVM

### Pattern → Architecture Layer Mapping

**Enhanced Cache System** → **Model Layer** (entities/\*/api/)

- Lives in `shared/lib/cache` as reusable infrastructure
- Used by entity APIs for data access and caching
- Fits MVVM: Model's data persistence layer

**Controller Pattern** → **ViewModel Layer** (features/\*/model/)

- Lives in `shared/lib/controller` as base classes
- Replaces/enhances feature composables
- Fits MVVM: ViewModel coordination and business logic

**Form Dirty Checking** → **ViewModel Layer** (features/\*/model/)

- Enhances existing `shared/lib/forms`
- Used in form-based features
- Fits MVVM: Form state management

**Enum Utilities** → **Model Layer** (entities/\*/model/)

- Lives in `shared/lib/enum` as reusable utilities
- Used by entity type definitions
- Fits MVVM: Model's domain types

## Enhanced Cache System

### Features

- **Stale Detection**: Cache entries can be marked as stale
- **Tenant Awareness**: Auto-reset on context changes (simplified for Ark)
- **Manual Invalidation**: `makeStale()` and `clear()` methods
- **Type Safety**: Generic cache keys and values

### Usage

```typescript
import { CachedApiCall } from '@/shared/lib/cache'

const todoCachedApiCall = new CachedApiCall<Todo, string>(
  'todos-cache',
  () => '/todos',
  null,
  () => console.log('Todos cache loaded'),
)

// Get data (uses cache if available and not stale)
const todos = await todoCachedApiCall.getData('')

// Force refresh
const freshTodos = await todoCachedApiCall.refresh('')

// Mark as stale
todoCachedApiCall.cache.makeStale('')
```

## Controller Pattern

### Features

- **Mode Tracking**: Insert/Update/None modes
- **Lifecycle Hooks**: beforeSave/afterSave hooks
- **Auto-close**: Configurable form closing behavior
- **Error Handling**: Built-in error state management
- **Type Safety**: Full TypeScript support

### Base Classes

1. **BaseController**: Basic CRUD operations
2. **Controller**: Full insert/update workflow
3. **CombinedController**: Unified insert/update with same model type

### Usage

```typescript
import { CombinedController } from '@/shared/lib/controller'

export class TodoController extends CombinedController<Todo, CreateTodoDto, Todo, typeof todoApi> {
  constructor() {
    super(todoApi)

    this.listOptions.title = 'Todos'
    this.listOptions.addButtonText = 'Add Todo'
  }

  // Lifecycle hooks
  protected beforeSave = async (model: CreateTodoDto) => {
    // Validation, transformation, etc.
  }

  protected afterSave = async (model: CreateTodoDto, result: Todo) => {
    // Notifications, navigation, etc.
  }

  // Required implementations
  protected async getAddModel(): Promise<CreateTodoDto> {
    return { title: '', description: '' }
  }

  protected async getEditModel(model: Todo): Promise<CreateTodoDto> {
    return { title: model.title, description: model.description }
  }

  protected async performInsert(model: CreateTodoDto): Promise<Todo | undefined> {
    const response = await this.api.createTodo(model)
    return response.data
  }

  protected async performUpdate(model: CreateTodoDto, id: string): Promise<Todo | undefined> {
    const response = await this.api.updateTodo(id, model)
    return response.data
  }
}
```

## Form Dirty Checking

### Features

- **Change Detection**: JSON comparison for dirty state
- **Confirmation Dialogs**: Optional unsaved changes warning
- **Clean Marking**: Manual dirty state reset
- **Reactive**: Vue 3 composition API integration

### Usage

```typescript
import { useFormDirtyCheck } from '@/shared/lib/forms'

export function useAddTodoWithDirtyCheck(confirmFn?: ConfirmFunction) {
  const model = computed(() => todoController.editOptions.model)
  const dirtyCheck = useFormDirtyCheck(model, confirmFn)

  async function handleClose() {
    const canClose = await dirtyCheck.requireConfirmOnClose()
    if (canClose) {
      todoController.editOptions.editPanelVisible = false
    }
  }

  return {
    model,
    hasChanges: dirtyCheck.hasChanges,
    markClean: dirtyCheck.markClean,
    handleClose,
  }
}
```

## Enum Utilities

### Features

- **Type Safety**: Generic enum value types
- **Sorted Choices**: Alphabetical sorting
- **Description Lookup**: Get human-readable names
- **Search**: Find choices by ID

### Usage

```typescript
import { EnumController } from '@/shared/lib/enum'

export class TodoStatusEnumController extends EnumController<TodoStatus> {
  constructor() {
    super()
    this.choices.push({
      id: TodoStatus.PENDING,
      name: 'Pending',
      description: 'Task not yet completed',
    })
    this.choices.push({
      id: TodoStatus.COMPLETED,
      name: 'Completed',
      description: 'Task finished',
    })
  }
}

// Usage
const statusEnum = new TodoStatusEnumController()
const statusName = statusEnum.getDescription(TodoStatus.PENDING) // "Pending"
const sortedChoices = statusEnum.sortedChoices // Array sorted by name
```

## Todo Entity Refactor (Reference Implementation)

The Todo entity demonstrates all patterns working together:

### Files Created

- `src/entities/todo/model/TodoController.ts` - Controller implementation
- `src/entities/todo/api/todoApiCached.ts` - Cached API calls
- `src/features/add-todo/model/useAddTodoWithDirtyCheck.ts` - Form with dirty checking
- `src/entities/todo/model/enums.ts` - Todo status enum controller

### Integration Example

```typescript
// In a Vue component
import { todoController } from '@/entities/todo'
import { useAddTodoWithDirtyCheck } from '@/features/add-todo'

export default defineComponent({
  setup() {
    const { model, hasChanges, handleSave, handleClose } = useAddTodoWithDirtyCheck(
      async (title, message) => {
        // Custom confirmation dialog
        return confirm(message)
      },
    )

    const showAddForm = () => todoController.showAdd()
    const showEditForm = (todo: Todo) => todoController.showEdit(todo)

    return {
      model,
      hasChanges,
      handleSave,
      handleClose,
      showAddForm,
      showEditForm,
      todos: computed(() => todoController.rows),
      isLoading: computed(() => todoController.listOptions.loading),
    }
  },
})
```

## Migration Guide

### For Existing Entities

1. **Create Controller**: Extend `CombinedController` or `Controller`
2. **Add Cached API**: Use `CachedApiCall` for data fetching
3. **Implement Enums**: Create enum controllers for status/type fields
4. **Add Dirty Checking**: Use `useFormDirtyCheck` in forms

### For New Entities

1. Start with controller pattern from the beginning
2. Use cached API calls for all data access
3. Create enum controllers for any choice fields
4. Implement dirty checking in all forms

## Benefits

### Scalability

- ✅ Add features without touching existing code
- ✅ Clear boundaries between features
- ✅ Independent development and testing

### Maintainability

- ✅ Easy to locate code by feature/purpose
- ✅ Explicit dependencies
- ✅ Self-documenting structure

### Type Safety

- ✅ End-to-end TypeScript
- ✅ Type-safe API layer
- ✅ Catch errors at compile time

### Performance

- ✅ Intelligent caching with stale detection
- ✅ Optimistic updates for instant feedback
- ✅ Smart refetching strategies

## Testing

Each pattern includes comprehensive unit tests:

- `src/shared/lib/cache/__tests__/Cache.spec.ts`
- `src/shared/lib/cache/__tests__/CachedApiCall.spec.ts`
- `src/shared/lib/controller/__tests__/Controller.spec.ts`
- `src/shared/lib/forms/__tests__/useFormDirtyCheck.spec.ts`
- `src/shared/lib/enum/__tests__/EnumController.spec.ts`

## Future Enhancements

- **Real-time Sync**: WebSocket/SignalR integration (when backend ready)
- **Deep Copy Utilities**: Enhanced object cloning
- **URL Builder**: Domain-organized URL generation
- **History/Audit**: Change tracking and audit trails

---

**Last Updated:** December 2024  
**Architecture:** Feature-Sliced Design (FSD) + MVVM + Facts Patterns  
**Status:** ✅ Complete and Production-Ready
