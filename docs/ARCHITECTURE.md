# Architecture Guide

This document provides a comprehensive guide to the Facts Ark architecture, covering Feature-Sliced Design (FSD), component organization, and implementation patterns.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Feature-Sliced Design](#feature-sliced-design)
- [Directory Structure](#directory-structure)
- [Layer Responsibilities](#layer-responsibilities)
- [Component Architecture](#component-architecture)
- [MVVM Pattern](#mvvm-pattern)
- [State Management](#state-management)
- [Public API Pattern](#public-api-pattern)
- [Demo Organization](#demo-organization)
- [Migration Guide](#migration-guide)
- [Best Practices](#best-practices)

## Architecture Overview

Facts Ark follows **Feature-Sliced Design (FSD)** methodology with **MVVM pattern** implementation. The architecture organizes code into layers with clear dependencies and responsibilities.

### Key Principles

1. **Unidirectional Dependencies**: Lower layers never import from upper layers
2. **Public API**: Each layer exports only what other layers need via `index.ts`
3. **Isolation**: Features are independent and can be added/removed easily
4. **Scalability**: New features don't require modifying existing code

## Feature-Sliced Design

### Layer Hierarchy

```
┌─────────────────────────────────────┐
│           app (providers)             │  ← Top level
├─────────────────────────────────────┤
│         pages (route components)     │
├─────────────────────────────────────┤
│      widgets (composite UI blocks)   │
├─────────────────────────────────────┤
│     features (user interactions)     │
├─────────────────────────────────────┤
│       entities (business logic)       │
├─────────────────────────────────────┤
│    shared (utilities, components)    │  ← Base level
└─────────────────────────────────────┘
```

### Import Rules

✅ **Allowed:**

- `pages/` can import from `widgets/`, `features/`, `entities/`, `shared/`
- `widgets/` can import from `features/`, `entities/`, `shared/`
- `features/` can import from `entities/`, `shared/`
- `entities/` can import from `shared/`
- `shared/` can only import from within itself

❌ **Not Allowed:**

- `shared/` importing from `entities/`
- `entities/` importing from `features/`
- `features/` importing from `widgets/`
- etc.

## Directory Structure

```
src/
├── app/                              # Application layer
│   ├── components/                   # App-level components (ThemeSwitcher)
│   ├── layouts/                      # Layout components (AppLayout, AppHeader, AppSidebar)
│   ├── router/                       # Vue Router configuration
│   ├── App.vue                       # Root component
│   └── main.ts                       # Application entry point
│
├── pages/                            # Pages layer (Route-level)
│   ├── home/
│   │   ├── ui/
│   │   │   └── HomePage.vue
│   │   └── index.ts
│   ├── components/
│   │   ├── ui/
│   │   │   └── ComponentsPage.vue
│   │   └── index.ts
│   ├── showcase/
│   │   ├── ui/
│   │   │   └── ShowcasePage.vue
│   │   └── index.ts
│   ├── theme/
│   │   ├── ui/
│   │   │   └── ThemePage.vue
│   │   └── index.ts
│   ├── about/
│   │   ├── ui/
│   │   │   └── AboutPage.vue
│   │   └── index.ts
│   └── todos/                        # Todo app example
│       ├── ui/
│       │   ├── TodosPage.vue
│       │   └── TodosPageColada.vue
│       └── index.ts
│
├── widgets/                          # Widgets layer (Composite blocks)
│   ├── todo-list/
│   │   ├── ui/
│   │   │   └── TodoList.vue
│   │   └── index.ts
│   └── todo-stats/
│       ├── ui/
│       │   └── TodoStats.vue
│       └── index.ts
│
├── features/                          # Features layer (User interactions)
│   ├── add-todo/
│   │   ├── model/
│   │   │   ├── useAddTodo.ts
│   │   │   └── useAddTodoColada.ts
│   │   ├── ui/
│   │   │   └── AddTodoForm.vue
│   │   └── index.ts
│   ├── toggle-todo/
│   ├── delete-todo/
│   └── filter-todos/
│
├── entities/                          # Entities layer (Business logic)
│   └── todo/
│       ├── model/
│       │   ├── types.ts
│       │   └── store.ts
│       ├── api/
│       │   ├── todoApi.ts
│       │   ├── todoQueries.ts
│       │   └── todoColada.ts
│       ├── ui/
│       │   └── TodoItem.vue
│       └── index.ts
│
├── shared/                           # Shared layer (Reusable code)
│   ├── ui/                           # Design system components
│   │   ├── accordion/
│   │   ├── avatar/
│   │   ├── badge/
│   │   ├── button/
│   │   ├── card/
│   │   ├── ... (40+ components)
│   │   ├── patterns/                 # LoadingState, EmptyState, ErrorState
│   │   └── demos/                    # TransitionDemo
│   ├── api/                          # API client and mock database
│   │   ├── client.ts
│   │   ├── types.ts
│   │   └── mockDb.ts
│   ├── config/                       # Configuration files
│   │   └── queryClient.ts
│   └── lib/                          # Utilities
│       ├── utils.ts
│       └── useOmitProps.ts
│
└── assets/                           # Static assets
    ├── animations.css
    ├── base.css
    ├── main.css
    └── tailwind-theme.css
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
- UI components (design system)

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
- Layout components

## Component Architecture

### Closed UI Components (`src/shared/ui/`)

Closed components are pre-composed, reusable wrappers around Ark UI primitives that provide consistent, simplified APIs.

**Available Components**:

- **Avatar**: Display user profile pictures with automatic initials fallback
- **Badge**: Show status indicators, categories, or labels
- **Button**: Consistent button component with variants, sizes, and loading states
- **Card**: Container component with header, body, and footer sections
- **Input**: Form input with validation states
- **Select**: Dropdown selection with search
- **Dialog**: Modal dialogs with backdrop
- **Toast**: Notification system
- And 30+ more components...

**Usage**:

```vue
<script setup>
import { Avatar, Badge, Button, Card } from '@/shared/ui'
</script>

<template>
  <Card variant="bordered">
    <template #header>
      <div class="flex items-center gap-2">
        <Avatar name="John Doe" src="/avatar.jpg" size="md" />
        <Badge variant="success">Active</Badge>
      </div>
    </template>
    <p>Card content goes here</p>
    <template #footer>
      <Button variant="primary">Action</Button>
    </template>
  </Card>
</template>
```

### Component Folder Structure

Each component follows a consistent folder structure:

```
component-name/
├── ComponentName.vue           # Main component implementation
├── component-name.types.ts     # TypeScript interfaces
├── component-name.variants.ts  # Tailwind variants styling
├── ComponentName.stories.ts    # Storybook documentation
└── index.ts                    # Exports
```

**Benefits**:

- ✅ Solves Vue 3.5 compiler issues
- ✅ No `/* @vue-ignore */` comments needed
- ✅ Better organization and scalability
- ✅ Improved developer experience
- ✅ Easier to maintain and extend

### Core Layout Components

#### AppLayout.vue

The main layout component that wraps all pages:

- Manages the sidebar open/close state
- Renders `AppSidebar` and `AppHeader`
- Provides a `<slot>` for page content
- Handles responsive sidebar positioning

#### AppSidebar.vue

A fully responsive sidebar component:

- Displays navigation with support for nested children
- Uses Ark UI's `Dialog` for mobile overlay
- Uses Ark UI's `Collapsible` for nested navigation items
- Accepts customizable `navigation` and `teams` props

#### AppHeader.vue

A sticky header component:

- Shows a hamburger menu button on mobile
- Includes a search input
- Provides an `actions` slot for additional header content

## MVVM Pattern

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

## State Management

The application uses three complementary state management solutions:

### 1. Pinia - UI State

**Purpose**: Simple, transient UI state

**Use for**:

- Current filter selection
- Selected todo IDs
- Search query
- Sidebar open/closed
- Theme preferences

### 2. Pinia Colada - Server State

**Purpose**: Data fetching, caching, and synchronization

**Use for**:

- CRUD operations
- Server data caching
- Optimistic updates
- Query invalidation

### 3. XState - Complex Workflows

**Purpose**: Complex state machines and workflows

**Use for**:

- Multi-step forms/wizards
- Entity lifecycle management
- Complex UI flows with dependencies
- Orchestrating async operations
- Business process workflows

## Public API Pattern

Each feature, entity, widget, and page has an `index.ts` file that explicitly exports its public API:

```typescript
// pages/home/index.ts
export { default as HomePage } from './ui/HomePage.vue'

// features/add-todo/index.ts
export { useAddTodo } from './model/useAddTodo'
export { default as AddTodoForm } from './ui/AddTodoForm.vue'

// entities/todo/index.ts
export { TodoStatus } from './model/types'
export type { Todo, CreateTodoDto } from './model/types'
export { useTodoStore } from './model/store'
export { useQueryTodos, useMutationCreateTodo } from './api/todoQueries'
```

This makes dependencies explicit and prevents internal implementation details from leaking.

## Demo Organization

Facts-Ark uses a **dual approach** for component demos:

1. **Component Gallery** (`/components`) - Clean catalog overview in the main app
2. **Storybook** (`http://localhost:6007`) - Interactive demos and comprehensive documentation

### Component Categories

- **Form Inputs** (18 components): Button, Input, Password Input, Pin Input, etc.
- **Layout & Navigation** (8 components): Tabs, Accordion, Menu, Pagination, etc.
- **Overlays & Dialogs** (5 components): Dialog, Popover, Tooltip, Toast, etc.
- **Display & Feedback** (6 components): Avatar, Badge, Card, Progress, etc.
- **Utilities** (4 components): Toggle, Field, Fieldset, etc.

### Key Features

- **41 Total Components** with 100% TypeScript coverage
- **150+ Storybook Stories** for comprehensive documentation
- **Clickable Cards** linking to Storybook demos
- **Status Badges** for new components
- **Statistics Panel** showing library metrics

## Migration Guide

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

## Best Practices

### Architecture

1. **Keep pages thin** - just orchestration
2. **Put business logic in ViewModels** (features/\*/model/)
3. **Use widgets to compose features**
4. **Keep entities focused on domain logic**
5. **Make dependencies explicit via index.ts**

### Component Development

1. **Follow folder-per-component structure**
2. **Use semantic tokens** for consistent theming
3. **Extend Ark UI base props** for maximum flexibility
4. **Include comprehensive Storybook stories**
5. **Provide TypeScript interfaces** with automatic type inference

### State Management

1. **Use Pinia for UI state** (filters, selections)
2. **Use Pinia Colada for server state** (data fetching)
3. **Use XState for complex workflows** (multi-step forms)
4. **Implement optimistic updates** for better UX
5. **Handle loading, error, and empty states** consistently

### Testing

1. **Test ViewModels in isolation**
2. **Mock dependencies easily**
3. **Unit test features independently**
4. **Include integration tests for features**
5. **Add E2E tests for user flows**

## Benefits

### Scalability

- ✅ Add features without touching existing code
- ✅ Clear boundaries between features
- ✅ Independent development and testing

### Maintainability

- ✅ Easy to locate code by feature/purpose
- ✅ Explicit dependencies
- ✅ Self-documenting structure

### Team Collaboration

- ✅ Feature teams own specific directories
- ✅ No merge conflicts between features
- ✅ Clear ownership and responsibilities

### Type Safety

- ✅ End-to-end TypeScript
- ✅ Type-safe API layer
- ✅ Catch errors at compile time

### Performance

- ✅ Optimistic updates for instant feedback
- ✅ Automatic caching and deduplication
- ✅ Smart refetching strategies

## Resources

- [Feature-Sliced Design Official Docs](https://feature-sliced.design/)
- [Vue Query Docs](https://tanstack.com/query/latest/docs/vue/overview)
- [Pinia Colada Docs](https://pinia-colada.esm.dev/)
- [Ark UI Components](https://ark-ui.com/docs/components)
- [MVVM Pattern](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93viewmodel)

---

**Last Updated:** October 2025  
**Architecture:** Feature-Sliced Design (FSD) + MVVM  
**Status:** ✅ Complete and Production-Ready
