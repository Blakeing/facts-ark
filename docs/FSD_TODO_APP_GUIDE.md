# Feature-Sliced Design Todo App - Implementation Guide

## Overview

This document provides a comprehensive guide to the Feature-Sliced Design (FSD) todo application implemented in Facts Ark. The app demonstrates enterprise-grade architecture patterns with two data-fetching approaches: Vue Query and Pinia Colada.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Directory Structure](#directory-structure)
- [Layer Responsibilities](#layer-responsibilities)
- [MVVM Pattern Implementation](#mvvm-pattern-implementation)
- [State Management Overview](#state-management-overview)
- [Data Fetching Comparison](#data-fetching-comparison)
- [XState Integration](#xstate-integration)
- [Key Patterns](#key-patterns)
- [Usage Examples](#usage-examples)
- [Migration Guidance](#migration-guidance)

## Architecture Overview

The todo app follows Feature-Sliced Design methodology, which organizes code into layers with clear dependencies:

```
┌─────────────────────────────────────┐
│           app (providers)           │  App initialization
├─────────────────────────────────────┤
│         pages (TodosPage)           │  Route orchestration
├─────────────────────────────────────┤
│     widgets (TodoList, Stats)       │  Composite UI blocks
├─────────────────────────────────────┤
│   features (add, toggle, delete)    │  User interactions
├─────────────────────────────────────┤
│       entities (Todo entity)         │  Business logic
├─────────────────────────────────────┤
│    shared (API, utils, config)      │  Reusable code
└─────────────────────────────────────┘
```

### Key Principles

1. **Unidirectional Dependencies**: Lower layers never import from upper layers
2. **Public API**: Each layer exports only what other layers need via `index.ts`
3. **Isolation**: Features are independent and can be added/removed easily
4. **Scalability**: New features don't require modifying existing code

## Directory Structure

```
src/
├── app/                              # Application layer
│   └── providers/
│       └── QueryProvider.vue         # Vue Query & Pinia Colada setup
│
├── pages/                            # Pages layer
│   └── todos/
│       ├── ui/
│       │   ├── TodosPage.vue        # Main page (Vue Query)
│       │   └── TodosPageColada.vue  # Alternate (Pinia Colada)
│       └── index.ts
│
├── widgets/                          # Widgets layer
│   ├── todo-list/
│   │   ├── ui/
│   │   │   └── TodoList.vue         # Complete todo list with states
│   │   └── index.ts
│   └── todo-stats/
│       ├── ui/
│       │   └── TodoStats.vue        # Statistics display
│       └── index.ts
│
├── features/                         # Features layer
│   ├── add-todo/
│   │   ├── model/
│   │   │   ├── useAddTodo.ts        # ViewModel (Vue Query)
│   │   │   └── useAddTodoColada.ts  # ViewModel (Pinia Colada)
│   │   ├── ui/
│   │   │   └── AddTodoForm.vue      # Form component
│   │   └── index.ts
│   ├── toggle-todo/
│   │   ├── model/
│   │   │   └── useToggleTodo.ts     # ViewModel
│   │   ├── ui/
│   │   │   └── ToggleTodo.vue       # Checkbox component
│   │   └── index.ts
│   ├── delete-todo/
│   │   ├── model/
│   │   │   └── useDeleteTodo.ts     # ViewModel
│   │   ├── ui/
│   │   │   └── DeleteTodoButton.vue # Delete button
│   │   └── index.ts
│   └── filter-todos/
│       ├── model/
│       │   └── useFilterTodos.ts    # Filter logic
│       ├── ui/
│       │   └── TodoFilters.vue      # Filter UI
│       └── index.ts
│
├── entities/                         # Entities layer
│   └── todo/
│       ├── model/
│       │   ├── types.ts             # Todo types & interfaces
│       │   └── store.ts             # Pinia store (UI state)
│       ├── api/
│       │   ├── todoApi.ts           # CRUD functions
│       │   ├── todoQueries.ts       # Vue Query hooks
│       │   └── todoColada.ts        # Pinia Colada queries
│       ├── ui/
│       │   └── TodoItem.vue         # Todo display component
│       └── index.ts
│
└── shared/                           # Shared layer
    ├── api/
    │   ├── types.ts                 # API types
    │   ├── client.ts                # API client
    │   └── mockDb.ts                # Mock database
    ├── lib/
    │   └── date.ts                  # Date utilities
    └── config/
        └── queryClient.ts           # Vue Query config
```

## Layer Responsibilities

### 1. Shared Layer

**Purpose**: Reusable utilities and configurations used across the entire app.

**What goes here**:

- API client and utilities
- Common types and interfaces
- Helper functions (date formatting, string manipulation)
- Configuration files
- Mock services

**Example**:

```typescript
// shared/api/client.ts
export class ApiClient {
  async execute<T>(operation: () => Promise<T>): Promise<ApiResponse<T>> {
    // Error handling, response formatting
  }
}
```

### 2. Entities Layer

**Purpose**: Business entities with their data, logic, and API interactions.

**What goes here**:

- Entity types and interfaces
- Pinia stores for entity-related UI state
- API functions (CRUD operations)
- Query hooks (Vue Query or Pinia Colada)
- Entity display components (presentational only)

**Example**:

```typescript
// entities/todo/model/types.ts
export interface Todo {
  id: string
  title: string
  status: TodoStatus
  createdAt: string
}

// entities/todo/api/todoQueries.ts
export function useQueryTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const response = await todoApi.fetchTodos()
      return response.data
    },
  })
}
```

### 3. Features Layer

**Purpose**: User-facing features that implement specific interactions.

**What goes here**:

- ViewModels (business logic composables)
- Feature-specific UI components
- Form handling and validation
- Event coordination

**Structure**:

- `model/` - ViewModels with business logic
- `ui/` - Feature UI components
- `index.ts` - Public API

**Example**:

```typescript
// features/add-todo/model/useAddTodo.ts
export function useAddTodo() {
  const { mutate, isPending } = useMutationCreateTodo()

  function handleSubmit(dto: CreateTodoDto) {
    mutate(dto, {
      onSuccess: () => {
        // Clear form, show toast
      },
    })
  }

  return { handleSubmit, isPending }
}
```

### 4. Widgets Layer

**Purpose**: Composite UI blocks that combine multiple features.

**What goes here**:

- Complex UI compositions
- Integration of multiple features
- Handling of loading, error, and empty states
- Coordinating data from multiple sources

**Example**:

```vue
<!-- widgets/todo-list/ui/TodoList.vue -->
<script setup>
import { useQueryTodos } from '@/entities/todo'
import { ToggleTodo } from '@/features/toggle-todo'
import { DeleteTodoButton } from '@/features/delete-todo'

const { data: todos, isLoading, isError } = useQueryTodos()
</script>

<template>
  <LoadingState v-if="isLoading" />
  <ErrorState v-else-if="isError" />
  <div v-else>
    <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo">
      <template #checkbox>
        <ToggleTodo :todo="todo" />
      </template>
      <template #actions>
        <DeleteTodoButton :todo-id="todo.id" />
      </template>
    </TodoItem>
  </div>
</template>
```

### 5. Pages Layer

**Purpose**: Route-level components that orchestrate widgets.

**What goes here**:

- Route page components
- Page-level layouts
- Widget composition
- Minimal business logic (mostly orchestration)

**Example**:

```vue
<!-- pages/todos/ui/TodosPage.vue -->
<script setup>
import { AddTodoForm } from '@/features/add-todo'
import { TodoFilters } from '@/features/filter-todos'
import { TodoList } from '@/widgets/todo-list'
import { TodoStats } from '@/widgets/todo-stats'
</script>

<template>
  <div>
    <TodoStats />
    <AddTodoForm />
    <TodoFilters />
    <TodoList />
  </div>
</template>
```

### 6. App Layer

**Purpose**: Application initialization and global providers.

**What goes here**:

- Provider components (Vue Query, Pinia Colada)
- Router configuration
- Global error handlers
- App initialization logic

## MVVM Pattern Implementation

### Model

**Location**: `entities/*/model/` and `entities/*/api/`

**Responsibilities**:

- Data structures (types, interfaces)
- Data persistence (Pinia stores)
- API communication

```typescript
// Model: Data structure
export interface Todo {
  id: string
  title: string
  status: TodoStatus
}

// Model: Data access
export function useQueryTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
}
```

### View

**Location**: `*/ui/` directories

**Responsibilities**:

- UI rendering
- User interaction capture
- Visual presentation
- No business logic

```vue
<!-- View: Pure presentation -->
<template>
  <form @submit.prevent="onSubmit">
    <Input v-model="title" />
    <Button :disabled="!canSubmit">Add</Button>
  </form>
</template>
```

### ViewModel

**Location**: `features/*/model/use*.ts`

**Responsibilities**:

- Business logic
- Form state management
- Validation
- Coordination between Model and View

```typescript
// ViewModel: Business logic
export function useAddTodo() {
  const title = ref('')
  const { mutate, isPending } = useMutationCreateTodo()

  const canSubmit = computed(() => title.value.trim().length > 0 && !isPending.value)

  function handleSubmit() {
    if (!canSubmit.value) return
    mutate({ title: title.value })
  }

  return {
    title,
    canSubmit,
    isPending,
    handleSubmit,
  }
}
```

## State Management Overview

The application uses three complementary state management solutions:

### 1. Pinia - UI State

**Purpose**: Simple, transient UI state

**Use for**:

- Current filter selection
- Selected todo IDs
- Search query
- Sidebar open/closed
- Theme preferences

**Example**:

```typescript
// entities/todo/model/store.ts
export const useTodoStore = defineStore('todo', () => {
  const currentFilter = ref<TodoFilter>('all')
  const selectedTodoIds = ref<Set<string>>(new Set())

  return { currentFilter, selectedTodoIds }
})
```

### 2. Pinia Colada - Server State

**Purpose**: Data fetching, caching, and synchronization

**Use for**:

- CRUD operations
- Server data caching
- Optimistic updates
- Query invalidation

**Example**:

```typescript
// entities/todo/api/todoQueries.ts
export function useTodos() {
  return useQuery({
    key: () => ['todos'],
    query: async () => {
      const response = await fetchTodos()
      return response.data
    },
  })
}
```

### 3. XState - Complex Workflows

**Purpose**: Complex state machines and workflows

**Use for**:

- Multi-step forms/wizards
- Entity lifecycle management (draft → pending → completed → archived)
- Complex UI flows with dependencies
- Orchestrating async operations
- Business process workflows

**Example**:

```typescript
// entities/todo/model/machines/todo-lifecycle.machine.ts
export const todoLifecycleMachine = setup({ ... }).createMachine({
  initial: 'pending',
  states: {
    pending: {
      on: {
        START: 'in_progress',
        ARCHIVE: 'archived'
      }
    },
    in_progress: {
      on: {
        COMPLETE: 'completed',
        BLOCK: 'blocked'
      }
    },
    // ... more states
  }
})
```

**When to use what**:

| Use Case                 | Solution     | Example                   |
| ------------------------ | ------------ | ------------------------- |
| Current tab/filter       | Pinia        | `currentFilter`           |
| Todo list data           | Pinia Colada | `useTodos()`              |
| Multi-step todo creation | XState       | `formWizardMachine`       |
| Selected items           | Pinia        | `selectedTodoIds`         |
| Create/update todo       | Pinia Colada | `useMutationCreateTodo()` |
| Todo approval workflow   | XState       | `todoLifecycleMachine`    |

## Data Fetching Comparison

### Vue Query (TanStack Query)

**Pros**:

- Battle-tested at enterprise scale
- Rich ecosystem and documentation
- Advanced caching strategies
- Framework-agnostic (good for multi-framework orgs)
- Excellent devtools

**Cons**:

- More boilerplate
- Larger bundle size
- Learning curve for advanced features

**Usage Example**:

```typescript
// Define query
export function useQueryTodos() {
  return useQuery({
    queryKey: todoKeys.list(),
    queryFn: async () => {
      const response = await todoApi.fetchTodos()
      return response.data
    },
  })
}

// Use in component
const { data, isLoading, isError, error, refetch } = useQueryTodos()
```

### Pinia Colada

**Pros**:

- Vue-native, simpler API
- Better TypeScript inference
- Seamless Pinia integration
- Smaller bundle size
- Less boilerplate

**Cons**:

- Newer, less battle-tested
- Smaller ecosystem
- Vue-specific (not framework-agnostic)

**Usage Example**:

```typescript
// Define query
export function useColadaTodos() {
  return useQuery({
    key: () => ['todos'],
    query: async () => {
      const response = await todoApi.fetchTodos()
      return response.data
    },
  })
}

// Use in component
const { data, status, error, refetch } = useColadaTodos()
```

### Which to Choose?

**Choose Vue Query if**:

- Building large enterprise applications
- Need advanced caching and invalidation strategies
- Working in multi-framework organization
- Want extensive ecosystem and tooling

**Choose Pinia Colada if**:

- Building Vue-only applications
- Want simpler, more intuitive API
- Prefer smaller bundle size
- Already heavily invested in Pinia

## XState Integration

XState is integrated for managing complex workflows and state machines that go beyond simple data fetching or UI state.

### When to Use XState

✅ **Use XState for:**

- Multi-step forms with complex validation
- Entity lifecycle management (draft → review → approved)
- Complex UI flows (onboarding, checkout)
- Workflows with rollback/undo
- Coordinating multiple async operations
- State machines with guards and actions

❌ **Don't use XState for:**

- Simple toggles or flags (use Pinia)
- Data fetching (use Pinia Colada)
- Basic form state (use VeeValidate)

### Example: Todo Lifecycle Machine

The todo entity includes an extended lifecycle machine demonstrating XState's power:

```typescript
import { useTodoMachine } from '@/entities/todo'

// In a component
const { state, send, isPending, isInProgress, progress } = useTodoMachine({
  todo: myTodo,
})

// Check current state
console.log(state.value) // 'pending' | 'in_progress' | 'completed' | etc.

// Send events
send({ type: 'START' }) // Start working on todo
send({ type: 'UPDATE_PROGRESS', progress: 50 }) // Update progress
send({ type: 'BLOCK', reason: 'Waiting on dependencies' }) // Block todo

// React to state
if (isPending.value) {
  // Show "Start" button
} else if (isInProgress.value) {
  // Show progress bar and "Complete" button
}
```

**State flow:**

```
draft → pending → in_progress → review → completed → archived
                      ↓
                   blocked
```

### Example: Multi-Step Form Wizard

The `multi-step-form` feature demonstrates a complex form wizard:

```typescript
import { useFormWizard } from '@/features/multi-step-form'

const wizard = useFormWizard()

// Navigation
wizard.next() // Go to next step
wizard.back() // Go back
wizard.goToStep(2) // Jump to specific step

// Update form data
wizard.updateBasicInfo({ title: 'New Task', category: 'work' })
wizard.updateDetails({ description: 'Details...', priority: 'high' })

// Check state
console.log(wizard.currentStep.value) // 1, 2, 3, 4
console.log(wizard.progress.value) // 0-100
console.log(wizard.canGoNext.value) // true/false

// Submit
if (wizard.isReview.value) {
  wizard.submit()
}
```

**State flow:**

```
step1 (Basic Info) → step2 (Details) → step3 (Additional) → review → submitting → success
  ↓                    ↓                   ↓
back                 back                back
```

### XState Architecture

XState follows FSD layers:

```
src/
├── shared/lib/machines/          # Shared utilities
│   ├── machine-factory.ts        # Factory helpers
│   ├── guards/                   # Reusable guards
│   ├── actions/                  # Reusable actions
│   └── utils/                    # Devtools, persistence
│
├── entities/*/model/machines/    # Entity lifecycle machines
│   └── todo-lifecycle.machine.ts
│
├── features/*/model/machines/    # Feature workflow machines
│   └── form-wizard.machine.ts
│
└── widgets/*/model/              # Orchestration
    └── useTodoWorkflow.ts
```

### Visual Debugging

XState includes a visual inspector for debugging:

1. Run dev server: `pnpm dev`
2. Visit https://stately.ai/inspect
3. Your machines appear automatically
4. Features:
   - Visual state diagram
   - Real-time state updates
   - Event history
   - Time-travel debugging

### Integration with Pinia Colada

XState machines can trigger Pinia Colada mutations:

```typescript
import { useMutationCreateTodo } from '@/entities/todo'

export function useFormWithSubmission() {
  const { mutate } = useMutationCreateTodo()

  const actor = createActor(formMachine)

  actor.subscribe((snapshot) => {
    if (snapshot.matches('submitting')) {
      mutate(snapshot.context.data, {
        onSuccess: () => actor.send({ type: 'SUCCESS' }),
        onError: (error) => actor.send({ type: 'ERROR', error }),
      })
    }
  })

  return { actor }
}
```

### Documentation

For comprehensive XState guides:

- [XState Integration Guide](./XSTATE_INTEGRATION_GUIDE.md) - Setup and when to use
- [XState Patterns](./XSTATE_PATTERNS.md) - Common patterns and recipes

## Key Patterns

### 1. Optimistic Updates

Vue Query makes optimistic updates straightforward:

```typescript
export function useMutationToggleTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleTodoStatus,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: todoKeys.list() })

      const previous = queryClient.getQueryData(todoKeys.list())

      // Optimistically update
      queryClient.setQueryData(todoKeys.list(), (old) =>
        old?.map((todo) =>
          todo.id === id
            ? { ...todo, status: todo.status === 'pending' ? 'completed' : 'pending' }
            : todo,
        ),
      )

      return { previous }
    },
    onError: (err, id, context) => {
      // Rollback on error
      queryClient.setQueryData(todoKeys.list(), context?.previous)
    },
  })
}
```

### 2. Query Invalidation

Keep data fresh by invalidating related queries:

```typescript
export function useMutationCreateTodo() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      // Invalidate both list and stats
      queryClient.invalidateQueries({ queryKey: todoKeys.list() })
      queryClient.invalidateQueries({ queryKey: todoKeys.stats() })
    },
  })
}
```

### 3. State Management Split

- **Pinia stores**: UI state (filters, selections)
- **Vue Query/Colada**: Server state (todo data)

```typescript
// Pinia: UI state
export const useTodoStore = defineStore('todo', () => {
  const currentFilter = ref<TodoFilter>('all')
  const selectedIds = ref<Set<string>>(new Set())

  return { currentFilter, selectedIds }
})

// Vue Query: Server state
export function useQueryTodos() {
  return useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  })
}
```

### 4. Error Boundaries

Handle errors at appropriate levels:

```vue
<!-- Widget level: Show error state -->
<template>
  <ErrorState v-if="isError" :error="error" @retry="refetch" title="Failed to load todos" />
</template>
```

### 5. Loading States

Provide feedback during async operations:

```vue
<template>
  <LoadingState v-if="isLoading" />
  <div v-else>
    <!-- Content -->
  </div>
</template>
```

## Usage Examples

### Adding a New Feature

To add a new feature (e.g., "favorite todo"):

1. **Create the feature structure**:

```
features/favorite-todo/
├── model/
│   └── useFavoriteTodo.ts
├── ui/
│   └── FavoriteButton.vue
└── index.ts
```

2. **Implement the ViewModel**:

```typescript
// features/favorite-todo/model/useFavoriteTodo.ts
export function useFavoriteTodo() {
  const { mutate, isPending } = useMutationFavoriteTodo()

  function toggleFavorite(id: string) {
    mutate(id)
  }

  return { toggleFavorite, isPending }
}
```

3. **Create the UI component**:

```vue
<!-- features/favorite-todo/ui/FavoriteButton.vue -->
<script setup>
import { useFavoriteTodo } from '../model/useFavoriteTodo'

const props = defineProps<{ todoId: string }>()
const { toggleFavorite, isPending } = useFavoriteTodo()
</script>

<template>
  <Button @click="toggleFavorite(todoId)" :loading="isPending"> ⭐ Favorite </Button>
</template>
```

4. **Export from feature**:

```typescript
// features/favorite-todo/index.ts
export { useFavoriteTodo } from './model/useFavoriteTodo'
export { default as FavoriteButton } from './ui/FavoriteButton.vue'
```

5. **Use in widgets**:

```vue
<!-- widgets/todo-list/ui/TodoList.vue -->
<script setup>
import { FavoriteButton } from '@/features/favorite-todo'
</script>

<template>
  <TodoItem :todo="todo">
    <template #actions>
      <FavoriteButton :todo-id="todo.id" />
    </template>
  </TodoItem>
</template>
```

### Testing Strategy

#### Unit Tests

Test ViewModels in isolation:

```typescript
import { describe, it, expect } from 'vitest'
import { useAddTodo } from '@/features/add-todo'

describe('useAddTodo', () => {
  it('validates title length', () => {
    const { title, isValid } = useAddTodo()

    title.value = ''
    expect(isValid.value).toBe(false)

    title.value = 'Valid title'
    expect(isValid.value).toBe(true)
  })
})
```

#### Integration Tests

Test feature integration:

```typescript
import { mount } from '@vue/test-utils'
import { QueryClient, QueryClientProvider } from '@tanstack/vue-query'
import AddTodoForm from '@/features/add-todo/ui/AddTodoForm.vue'

describe('AddTodoForm', () => {
  it('creates todo on submit', async () => {
    const queryClient = new QueryClient()
    const wrapper = mount(AddTodoForm, {
      global: {
        plugins: [[QueryClientProvider, { queryClient }]],
      },
    })

    await wrapper.find('input').setValue('New todo')
    await wrapper.find('form').trigger('submit')

    // Assert mutation was called
  })
})
```

## Migration Guidance

### From Traditional Vue SPA

**Before** (Traditional):

```
src/
├── components/
│   └── TodoList.vue      # Everything in one file
├── store/
│   └── todos.ts          # Global store
└── api/
    └── todos.ts          # API calls
```

**After** (FSD):

```
src/
├── entities/todo/        # Todo entity
├── features/add-todo/    # Add feature
├── features/toggle-todo/ # Toggle feature
└── widgets/todo-list/    # Composed widget
```

### Migration Steps

1. **Start with Shared Layer**
   - Move utilities, API client, config
   - Create shared types

2. **Extract Entities**
   - Identify business entities
   - Move entity types, API calls, stores
   - Create query hooks

3. **Identify Features**
   - Break down user interactions
   - Extract ViewModels from components
   - Create feature UI components

4. **Compose Widgets**
   - Combine features into widgets
   - Handle states (loading, error, empty)

5. **Simplify Pages**
   - Pages should only orchestrate widgets
   - Remove business logic

### For Large Enterprise Apps

**Gradual Migration**:

1. Apply FSD to new features first
2. Keep existing code alongside
3. Migrate high-value features incrementally
4. Update as you touch code

**Team Organization**:

- Feature teams own specific features
- Platform team owns shared layer
- Clear ownership and boundaries

## Conclusion

Feature-Sliced Design with MVVM provides:

- ✅ **Scalability**: Add features without breaking existing code
- ✅ **Maintainability**: Clear structure and dependencies
- ✅ **Testability**: Isolated business logic
- ✅ **Team Collaboration**: Clear ownership boundaries
- ✅ **Type Safety**: Full TypeScript support
- ✅ **Performance**: Optimistic updates and caching

The implementation in Facts Ark demonstrates both Vue Query and Pinia Colada approaches, allowing you to choose the best fit for your enterprise needs.

## Resources

- [Feature-Sliced Design Official Docs](https://feature-sliced.design/)
- [Vue Query Docs](https://tanstack.com/query/latest/docs/vue/overview)
- [Pinia Colada Docs](https://pinia-colada.esm.dev/)
- [MVVM Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)

## Routes

- `/todos` - Vue Query implementation
- `/todos-colada` - Pinia Colada implementation

Visit both routes to compare the approaches!
