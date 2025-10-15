# Design System Guide

This comprehensive guide covers all aspects of the Facts Ark design system, including design consistency, patterns, and building a custom design system.

## Table of Contents

1. [Design Consistency](#design-consistency)
2. [Design Patterns](#design-patterns)
3. [Custom Design System](#custom-design-system)
4. [Best Practices](#best-practices)

## Design Consistency

### What We Have

You now have a **complete design system** for building consistent, professional UIs!

### ✨ New Features

#### 1. **Animation & Transition System**

File: `src/assets/animations.css`

**Transitions**

```vue
<!-- Smooth color transitions -->
<button class="transition-colors-smooth bg-primary hover:bg-primary/90">
  Hover Me
</button>

<!-- Smooth transform -->
<div class="transition-transform-smooth hover:scale-105">
  Scale on hover
</div>
```

**Animations**

```vue
<!-- Fade in -->
<div class="animate-fade-in">Content</div>

<!-- Slide in from bottom -->
<div class="animate-slide-in-from-bottom">Modal</div>

<!-- Loading spinner -->
<div class="animate-spin">⭮</div>

<!-- Shake (for errors) -->
<div class="animate-shake">Error!</div>

<!-- Shimmer loading -->
<div class="animate-shimmer h-20 w-full"></div>
```

#### 2. **Focus Ring System**

Accessible, consistent focus states

```vue
<!-- Standard focus ring -->
<button class="focus-ring">Button</button>

<!-- Inset focus ring (for filled elements) -->
<div class="focus-ring-inset">Card</div>

<!-- Primary-colored focus ring -->
<input class="focus-ring-primary" />
```

#### 3. **Hover Effects**

```vue
<!-- Lift on hover (great for cards) -->
<Card class="hover-lift">Lifts up on hover</Card>

<!-- Scale on hover -->
<Button class="hover-scale">Scales slightly</Button>

<!-- Brighten on hover -->
<img class="hover-brighten" />

<!-- Glow effect -->
<div class="hover-glow">Glows on hover</div>
```

#### 4. **Loading Skeletons**

```vue
<!-- Skeleton for text -->
<div class="skeleton skeleton-text"></div>

<!-- Skeleton for heading -->
<div class="skeleton skeleton-heading"></div>

<!-- Skeleton for avatar -->
<div class="skeleton skeleton-avatar"></div>

<!-- Skeleton for button -->
<div class="skeleton skeleton-button"></div>
```

#### 5. **Design Patterns**

**Empty State**

```vue
<script setup>
import EmptyState from '@/components/patterns/EmptyState.vue'
import { Inbox } from 'lucide-vue-next'
</script>

<template>
  <EmptyState
    :icon="Inbox"
    title="No messages yet"
    description="Start a conversation to see messages here"
    action-label="New Message"
    @action="createMessage"
  />
</template>
```

**Loading State**

```vue
<script setup>
import LoadingState from '@/components/patterns/LoadingState.vue'
</script>

<template>
  <!-- Spinner variant (default) -->
  <LoadingState message="Loading your data..." />

  <!-- Skeleton variant -->
  <LoadingState variant="skeleton" />

  <!-- Pulse variant -->
  <LoadingState variant="pulse" size="lg" />
</template>
```

**Error State**

```vue
<script setup>
import ErrorState from '@/components/patterns/ErrorState.vue'
</script>

<template>
  <ErrorState
    title="Failed to load data"
    message="We couldn't fetch your data. Please check your connection and try again."
    @retry="fetchData"
  />
</template>
```

### 🎯 Design Consistency Checklist

#### ✅ Colors

- [x] Use semantic tokens (`bg-primary`, `text-foreground`)
- [x] Use Tailwind colors for specific needs (`bg-blue-500`)
- [x] Consistent dark mode support
- [x] Theme switcher for easy customization

#### ✅ Spacing

- [x] Use spacing scale (`p-4`, `m-6`, `gap-8`)
- [x] Consistent padding in components
- [x] Consistent margins between sections

#### ✅ Typography

- [x] Heading hierarchy (`text-4xl`, `text-3xl`, `text-2xl`)
- [x] Body text (`text-base`)
- [x] Small text (`text-sm`, `text-xs`)
- [x] Consistent font weights

#### ✅ Animations

- [x] Smooth transitions on all interactive elements
- [x] Fade in/out for appearing/disappearing content
- [x] Scale for dialogs and popovers
- [x] Shimmer for loading states
- [x] Shake for errors

#### ✅ Focus States

- [x] Visible focus rings on all interactive elements
- [x] Accessible focus states
- [x] Consistent focus colors

#### ✅ Hover States

- [x] Subtle feedback on all interactive elements
- [x] Consistent hover effects
- [x] Smooth transitions

#### ✅ States

- [x] Empty states with clear CTAs
- [x] Loading states (spinner, skeleton, pulse)
- [x] Error states with retry options
- [x] Success feedback

### 📐 Design Principles

#### 1. **Consistency**

Use the same patterns, colors, and spacing throughout the app.

```vue
<!-- ✅ Good: Consistent -->
<Button class="bg-primary text-primary-foreground">Save</Button>
<Button class="bg-primary text-primary-foreground">Submit</Button>

<!-- ❌ Bad: Inconsistent -->
<Button class="bg-primary text-primary-foreground">Save</Button>
<Button class="bg-blue-600 text-white">Submit</Button>
```

#### 2. **Feedback**

Always provide visual feedback for user actions.

```vue
<!-- ✅ Good: Clear feedback -->
<button class="transition-colors-smooth bg-primary hover:bg-primary/90 active:bg-primary/80">
  Click Me
</button>

<!-- ❌ Bad: No feedback -->
<button class="bg-primary">Click Me</button>
```

#### 3. **Accessibility**

Ensure all interactive elements are accessible.

```vue
<!-- ✅ Good: Accessible -->
<button class="focus-ring" aria-label="Close dialog">
  <X class="size-4" />
</button>

<!-- ❌ Bad: No focus state, no label -->
<button><X class="size-4" /></button>
```

#### 4. **Loading States**

Show loading states for async operations.

```vue
<!-- ✅ Good: Shows loading -->
<div v-if="loading">
  <LoadingState message="Fetching data..." />
</div>
<div v-else-if="error">
  <ErrorState :message="error" @retry="fetchData" />
</div>
<div v-else>
  <!-- Data -->
</div>

<!-- ❌ Bad: No feedback -->
<div>
  {{ data }}
</div>
```

#### 5. **Empty States**

Guide users when there's no content.

```vue
<!-- ✅ Good: Helpful empty state -->
<EmptyState
  v-if="items.length === 0"
  :icon="Inbox"
  title="No items yet"
  description="Create your first item to get started"
  action-label="Create Item"
  @action="createItem"
/>

<!-- ❌ Bad: Blank screen -->
<div v-if="items.length === 0"></div>
```

### 🎨 Component Checklist

When building a new component, ensure it has:

- [ ] **Semantic colors** (`bg-card`, `text-foreground`, etc.)
- [ ] **Smooth transitions** (`transition-colors-smooth`)
- [ ] **Focus ring** (`focus-ring` or `focus-ring-inset`)
- [ ] **Hover state** (brightness, scale, or color change)
- [ ] **Loading state** (if async)
- [ ] **Error state** (if can fail)
- [ ] **Empty state** (if shows lists/data)
- [ ] **Consistent spacing** (uses spacing scale)
- [ ] **Accessible** (aria labels, keyboard navigation)
- [ ] **Responsive** (works on mobile, tablet, desktop)
- [ ] **Dark mode support** (uses semantic tokens)

### 📚 Quick Reference

#### Transitions

| Class                         | Duration | Use Case               |
| ----------------------------- | -------- | ---------------------- |
| `transition-fast`             | 150ms    | Quick feedback         |
| `transition-base`             | 200ms    | Default (recommended)  |
| `transition-slow`             | 300ms    | Deliberate transitions |
| `transition-colors-smooth`    | 200ms    | Color changes          |
| `transition-transform-smooth` | 200ms    | Movement               |

#### Animations

| Class                          | Effect   | Use Case           |
| ------------------------------ | -------- | ------------------ |
| `animate-fade-in`              | Fade in  | Appearing content  |
| `animate-slide-in-from-bottom` | Slide up | Modals             |
| `animate-scale-in`             | Scale up | Popovers           |
| `animate-spin`                 | Rotate   | Loading spinners   |
| `animate-shake`                | Shake    | Error feedback     |
| `animate-pulse`                | Pulse    | Loading indicators |
| `animate-shimmer`              | Shimmer  | Loading skeletons  |

#### Focus

| Class                | Effect        | Use Case           |
| -------------------- | ------------- | ------------------ |
| `focus-ring`         | Outer ring    | Buttons, links     |
| `focus-ring-inset`   | Inner ring    | Cards, containers  |
| `focus-ring-primary` | Primary color | Important elements |

#### Hover

| Class            | Effect      | Use Case         |
| ---------------- | ----------- | ---------------- |
| `hover-lift`     | Lift up     | Cards            |
| `hover-scale`    | Scale up    | Buttons, images  |
| `hover-brighten` | Brighten    | Images           |
| `hover-glow`     | Glow effect | Special elements |

## Design Patterns

This document describes the design patterns implemented in the Facts-Ark codebase. These patterns improve code reusability, maintainability, and consistency across the application.

### Table of Contents

1. [Mutation Factory Pattern](#mutation-factory-pattern)
2. [Validation Strategy Pattern](#validation-strategy-pattern)
3. [Query Cache Facade Pattern](#query-cache-facade-pattern)
4. [Query Key Factory Pattern](#query-key-factory-pattern)
5. [Request Builder Pattern](#request-builder-pattern)
6. [Interceptor Chain Pattern](#interceptor-chain-pattern)
7. [Migration Examples](#migration-examples)

### Mutation Factory Pattern

#### Overview

The Mutation Factory Pattern eliminates boilerplate code in feature mutation hooks by providing a consistent API for creating mutations with optimistic updates, error handling, cache invalidation, and toast notifications.

#### Location

`src/shared/lib/mutation/`

#### Benefits

- Reduces 40-50 lines of boilerplate per mutation
- Consistent error handling across all mutations
- Automatic optimistic updates and rollback
- Built-in toast notifications
- Centralized cache invalidation

#### Usage

```typescript
import { createMutationFactory } from '@/shared/lib/mutation'
import { todoQueriesKeys, type Todo } from '@/entities/todo'

const mutation = createMutationFactory({
  // The actual mutation function
  mutationFn: async (id: string) => {
    const response = await deleteTodo(id)
    return response.data
  },

  // Optimistic update (optional)
  optimisticUpdate: (cache, id) => {
    const previousTodos = cache.getQueryData(todoQueriesKeys.list) as Todo[] | undefined
    cache.setQueryData(todoQueriesKeys.list, (old: Todo[] | undefined) => {
      if (!old) return old
      return old.filter((todo) => todo.id !== id)
    })
    return previousTodos
  },

  // Keys to invalidate after mutation
  invalidateKeys: [todoQueriesKeys.list, todoQueriesKeys.stats],

  // Success toast
  successToast: {
    title: 'Todo deleted',
    description: 'The todo has been successfully deleted.',
  },

  // Error toast
  errorToast: {
    title: 'Failed to delete todo',
    description: 'An error occurred while deleting the todo.',
  },
})

// Use the mutation
await mutation.mutate(todoId)

// Access state
mutation.isPending.value // boolean
mutation.isError.value // boolean
mutation.error.value // Error | null
```

#### Dynamic Toast Messages

You can also use functions for dynamic toast messages:

```typescript
successToast: (data, variables) => ({
  title: 'Success',
  description: `Deleted ${data.count} items`,
}),
```

#### Additional Lifecycle Hooks

```typescript
createMutationFactory({
  mutationFn: async (data) => {
    /* ... */
  },

  // Run after optimistic update
  onMutate: async (variables) => {
    console.log('Starting mutation', variables)
  },

  // Run after successful mutation
  onSuccess: async (data, variables) => {
    console.log('Mutation succeeded', data)
  },

  // Run on error (after rollback)
  onError: async (error, variables) => {
    console.error('Mutation failed', error)
  },

  // Run after mutation settles (success or error)
  onSettled: async (data, error, variables) => {
    console.log('Mutation completed')
  },
})
```

### Validation Strategy Pattern

#### Overview

The Validation Strategy Pattern provides a composable, reusable approach to data validation. Instead of scattered validation logic, you can build validation chains and reuse them across your application.

#### Location

`src/shared/lib/validation/`

#### Benefits

- Composable validation rules
- Reusable validators across the codebase
- Clear, declarative validation syntax
- Easy to test individual validators
- Consistent error messages

#### Usage

**Basic Validation**

```typescript
import { ValidationStrategy, required, stringLength } from '@/shared/lib/validation'

const validator = new ValidationStrategy()
  .add('title', required('title'))
  .add('title', stringLength('title', 1, 200))
  .add('description', stringLength('description', 0, 1000))

// Validate data (throws ApiException on failure)
validator.validate({ title: 'Hello', description: 'World' })

// Check if valid without throwing
const isValid = validator.isValid(data) // returns boolean

// Get all validation errors
const errors = validator.validateAll(data) // returns array of errors
```

**Available Validators**

```typescript
import {
  required, // Field must have a value
  optional, // Field is optional (documentation)
  stringLength, // String min/max length
  stringPattern, // Regex pattern matching
  email, // Valid email address
  numberRange, // Number min/max
  arrayLength, // Array min/max length
  enumValue, // Value must be in enum
  custom, // Custom validation function
} from '@/shared/lib/validation'
```

**Reusable Validation Schemas**

```typescript
// Define once, use everywhere
const createTodoValidation = new ValidationStrategy()
  .add('title', required('title'))
  .add('title', stringLength('title', 1, 200))
  .add('description', stringLength('description', 0, 1000))

const updateTodoValidation = new ValidationStrategy()
  .add('title', stringLength('title', 1, 200))
  .add('description', stringLength('description', 0, 1000))

// Use in API functions
export async function createTodo(dto: CreateTodoDto) {
  createTodoValidation.validate(dto)
  // ... rest of function
}
```

**Custom Validators**

```typescript
import { custom } from '@/shared/lib/validation'

const validator = new ValidationStrategy().add(
  'age',
  custom('age', (value) => typeof value === 'number' && value >= 18, 'Must be 18 or older'),
)
```

### Query Cache Facade Pattern

#### Overview

The Query Cache Facade simplifies common query cache operations like optimistic updates, providing a cleaner API over Pinia Colada's query cache.

#### Location

`src/shared/lib/cache/`

#### Benefits

- Simpler API for common cache operations
- Hide complexity of cache manipulation
- Consistent optimistic update patterns
- Easier to mock in tests
- Type-safe cache operations

#### Usage

```typescript
import { createMutationFactory } from '@/shared/lib/mutation'
import { todoQueriesKeys, type Todo } from '@/entities/todo'

const mutation = createMutationFactory({
  mutationFn: async (todo: Todo) => {
    /* ... */
  },
  optimisticUpdate: (cache, todo) => {
    const rollbackData = cache.optimisticAdd(todoQueriesKeys.list, todo)

    return {
      rollback: () => cache.rollback(todoQueriesKeys.list, rollbackData),
    }
  },
  invalidateKeys: [todoQueriesKeys.list],
})

await mutation.mutate(newTodo)
```

### Query Key Factory Pattern

#### Overview

The Query Key Factory Pattern provides structured, type-safe query key generation. While the full factory infrastructure is available, we currently use a simplified approach for consistency.

#### Location

`src/shared/lib/query-keys/`

#### Benefits

- Type-safe query keys
- Consistent key structure
- Easier refactoring
- Centralized key management

#### Current Usage

```typescript
// In entities/todo/api/todoQueries.ts
export const todoQueriesKeys = {
  all: ['todos'] as const,
  list: ['todos', 'list'] as const,
  detail: (id: string) => ['todos', 'detail', id] as const,
  stats: ['todos', 'stats'] as const,
}

// Usage
queryCache.invalidateQueries({ key: [...todoQueriesKeys.list] })
```

#### Advanced Usage (Optional)

For complex query key scenarios, you can use the full factory:

```typescript
import { CrudQueryKeyFactory } from '@/shared/lib/query-keys'

class TodoQueryKeys extends CrudQueryKeyFactory {
  constructor() {
    super('todos')
  }

  byStatus(status: TodoStatus) {
    return this.custom('list', 'by-status', status)
  }

  byUser(userId: string) {
    return this.custom('list', 'by-user', userId)
  }
}

export const todoKeys = new TodoQueryKeys()
```

### Request Builder Pattern

#### Overview

The Request Builder Pattern provides a fluent API for constructing HTTP requests with integrated validation.

#### Location

`src/shared/api/builders/`

#### Benefits

- Fluent, declarative request construction
- Integrated validation
- Cleaner API function definitions
- Type-safe request building
- Consistent error handling

#### Usage

```typescript
import { RequestBuilder } from '@/shared/api/builders'
import { apiClient } from '@/shared/api/client'
import { required, stringLength } from '@/shared/lib/validation'

// Create request builder
const builder = new RequestBuilder(apiClient)

// Build and execute request
const response = await builder
  .post('/todos')
  .withBody({ title: 'Buy milk', description: 'At the store' })
  .validate('title', required('title'), stringLength('title', 1, 200))
  .validate('description', stringLength('description', 0, 1000))
  .execute<Todo>()

// Or get just the data
const data = await builder
  .get('/todos')
  .withParams({ status: 'completed', limit: 10 })
  .executeData<Todo[]>()
```

#### All HTTP Methods

```typescript
builder.get('/todos')
builder.post('/todos')
builder.put('/todos/1')
builder.patch('/todos/1')
builder.delete('/todos/1')
```

### Interceptor Chain Pattern

#### Overview

The Interceptor Chain Pattern provides an extensible way to add request/response interceptors following the Chain of Responsibility pattern.

#### Location

`src/shared/api/interceptors/`

#### Benefits

- Easy to add/remove interceptors
- Individual interceptor testing
- Better separation of concerns
- Priority-based execution order
- Reusable interceptor components

#### Usage

**Basic Setup**

```typescript
import { InterceptorChain } from '@/shared/api/interceptors'
import {
  AuthInterceptor,
  LoggingInterceptor,
  RetryInterceptor,
  ErrorTransformInterceptor,
} from '@/shared/api/interceptors'
import { httpClient } from '@/shared/api/http'

const chain = new InterceptorChain(httpClient)
  .addRequest(new AuthInterceptor(), 0) // Priority 0 (runs first)
  .addRequest(new LoggingInterceptor(), 10)
  .addResponse(new RetryInterceptor({ maxRetries: 3 }, httpClient), 0)
  .addResponse(new ErrorTransformInterceptor(), 10)
  .install()
```

**Available Interceptors**

**AuthInterceptor**

```typescript
new AuthInterceptor({
  tokenKey: 'auth_token', // localStorage key
  headerName: 'Authorization', // Header name
  enabled: true, // Enable/disable
})
```

**LoggingInterceptor**

```typescript
new LoggingInterceptor({
  isDev: import.meta.env.DEV, // Only log in dev
  enabled: true,
})
```

**RetryInterceptor**

```typescript
new RetryInterceptor(
  {
    maxRetries: 3,
    retryDelay: 1000,
    retryableStatuses: [500, 502, 503, 504],
  },
  httpClient,
)
```

**ErrorTransformInterceptor**

```typescript
new ErrorTransformInterceptor({
  enabled: true,
})
```

**Creating Custom Interceptors**

```typescript
import type { RequestInterceptor, ResponseInterceptor } from '@/shared/api/interceptors'

class CustomRequestInterceptor implements RequestInterceptor {
  onRequest(config) {
    // Modify request config
    return config
  }

  onRequestError(error) {
    // Handle request error
    return Promise.reject(error)
  }
}

class CustomResponseInterceptor implements ResponseInterceptor {
  onResponse(response) {
    // Process response
    return response
  }

  onResponseError(error) {
    // Handle error
    return Promise.reject(error)
  }
}

// Use in chain
chain
  .addRequest(new CustomRequestInterceptor())
  .addResponse(new CustomResponseInterceptor())
  .install()
```

### Migration Examples

#### Before: Manual Mutation

```typescript
import { useMutation, useQueryCache } from '@pinia/colada'
import { useToast } from '@/shared/ui/toast'

export function useDeleteTodo() {
  const queryCache = useQueryCache()
  const { toast } = useToast()

  const mutation = useMutation({
    mutation: async (id: string) => {
      await deleteTodo(id)
      return id
    },
    onMutate: async (id: string) => {
      const previousTodos = queryCache.getQueryData(['todos']) as Todo[]
      queryCache.setQueryData(['todos'], (old: Todo[]) => old.filter((todo) => todo.id !== id))
      return { previousTodos }
    },
    onError: (error, variables, context) => {
      if (context?.previousTodos) {
        queryCache.setQueryData(['todos'], context.previousTodos)
      }
      toast.error({
        title: 'Failed to delete todo',
        description: error.message,
      })
    },
    onSettled: () => {
      queryCache.invalidateQueries({ key: ['todos'] })
    },
  })

  const isPending = computed(() => mutation.asyncStatus.value === 'loading')

  async function deleteTodo(id: string) {
    try {
      await mutation.mutateAsync(id)
      toast.success({
        title: 'Todo deleted',
        description: 'Successfully deleted',
      })
    } catch (error) {
      // Error already handled
    }
  }

  return { deleteTodo, isPending }
}
```

#### After: Mutation Factory

```typescript
import { createMutationFactory } from '@/shared/lib/mutation'
import { deleteTodo as deleteTodoApi, todoQueriesKeys } from '@/entities/todo'

export function useDeleteTodo() {
  const mutation = createMutationFactory({
    mutationFn: async (id: string) => {
      await deleteTodoApi(id)
      return id
    },
    optimisticUpdate: (cache, id) => {
      const previousTodos = cache.getQueryData(todoQueriesKeys.list)
      cache.setQueryData(todoQueriesKeys.list, (old) => old?.filter((todo) => todo.id !== id))
      return previousTodos
    },
    invalidateKeys: [todoQueriesKeys.list, todoQueriesKeys.stats],
    successToast: {
      title: 'Todo deleted',
      description: 'Successfully deleted',
    },
    errorToast: {
      title: 'Failed to delete todo',
      description: 'An error occurred',
    },
  })

  async function deleteTodo(id: string) {
    await mutation.mutate(id)
  }

  return { deleteTodo, isPending: mutation.isPending }
}
```

**Lines saved: ~45 lines**

#### Before: Manual Validation

```typescript
export async function createTodo(dto: CreateTodoDto) {
  // Manual validation
  apiClient.validateRequired(dto.title, 'title')
  apiClient.validateLength(dto.title, 'title', 1, 200)
  if (dto.description) {
    apiClient.validateLength(dto.description, 'description', 0, 1000)
  }

  const newTodo = {
    title: dto.title,
    description: dto.description,
    status: TodoStatus.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return apiClient.post<Todo>('/todos', newTodo)
}
```

#### After: Validation Strategy

```typescript
import { ValidationStrategy, required, stringLength } from '@/shared/lib/validation'

const createTodoValidation = new ValidationStrategy()
  .add('title', required('title'))
  .add('title', stringLength('title', 1, 200))
  .add('description', stringLength('description', 0, 1000))

export async function createTodo(dto: CreateTodoDto) {
  // Single line validation
  createTodoValidation.validate(dto)

  const newTodo = {
    title: dto.title,
    description: dto.description,
    status: TodoStatus.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return apiClient.post<Todo>('/todos', newTodo)
}
```

## Custom Design System

### Philosophy

**You're building your own design system** - this gives you:

- 🎨 Complete creative control
- 🚀 Lightweight bundle (only what you need)
- 🔧 Customization without fighting framework opinions
- 📚 Deep understanding of your components

### Current Stack (Perfect for Custom Systems)

#### Core Technologies

1. **Ark UI** - Headless, accessible primitives
   - Provides behavior & accessibility
   - You control 100% of the styling
   - No opinions on design

2. **Tailwind CSS v4** - Utility-first styling
   - Modern features (container queries, cascade layers)
   - Direct CSS customization
   - No JS config needed

3. **Tailwind Variants** - Variant management
   - Type-safe component variants
   - Conflict resolution
   - Better than manual class concatenation

### What to Learn from Nuxt UI

#### 1. Design Tokens Structure

**Instead of scattered CSS variables, organize by semantic meaning:**

```css
/* Current: Specific to sidebar */
--sidebar-background: oklch(0.985 0.002 285.75);
--sidebar-foreground: oklch(0.145 0.007 285.75);

/* Better: Semantic tokens that work everywhere */
:root {
  /* Base semantic colors */
  --ui-bg: oklch(1 0 0); /* Main background */
  --ui-bg-elevated: oklch(0.985 0 0); /* Cards, modals */
  --ui-bg-inverted: oklch(0.145 0 0); /* Dark surfaces */

  /* Text colors */
  --ui-text: oklch(0.145 0.007 285.75); /* Primary text */
  --ui-text-muted: oklch(0.556 0.016 285.75); /* Secondary text */
  --ui-text-dimmed: oklch(0.708 0.012 285.75); /* Tertiary text */

  /* Interactive states */
  --ui-primary: oklch(0.488 0.243 264.376); /* Primary actions */
  --ui-primary-hover: oklch(0.4 0.243 264.376);

  /* Surfaces */
  --ui-surface: oklch(0.985 0 0);
  --ui-surface-hover: oklch(0.97 0 0);

  /* Borders */
  --ui-border: oklch(0.922 0.004 285.75);
  --ui-border-strong: oklch(0.85 0.004 285.75);
}

.dark {
  --ui-bg: oklch(0.145 0 0);
  --ui-bg-elevated: oklch(0.205 0 0);
  --ui-text: oklch(0.985 0 0);
  /* ... etc */
}
```

#### 2. Component Architecture with Tailwind Variants

**Use `tailwind-variants` for better component APIs:**

```bash
pnpm add tailwind-variants
```

```typescript
// src/lib/variants.ts
import { tv } from 'tailwind-variants'

export const button = tv({
  base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      solid: 'bg-[var(--ui-primary)] text-white hover:bg-[var(--ui-primary-hover)]',
      outline: 'border border-[var(--ui-border)] hover:bg-[var(--ui-surface-hover)]',
      ghost: 'hover:bg-[var(--ui-surface-hover)]',
      link: 'underline-offset-4 hover:underline',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

export const sidebar = tv({
  slots: {
    root: 'flex h-full flex-col border-r bg-[var(--ui-bg-elevated)] transition-all duration-300',
    header: 'flex flex-col gap-2 p-2',
    content: 'flex min-h-0 flex-1 flex-col gap-2 overflow-auto',
    footer: 'flex flex-col gap-2 p-2',
    group: 'relative flex w-full min-w-0 flex-col p-2',
    groupLabel: 'flex h-8 items-center px-2 text-xs font-medium text-[var(--ui-text-muted)]',
  },
  variants: {
    collapsible: {
      icon: {
        root: 'w-16',
        groupLabel: 'hidden',
      },
      offcanvas: {
        root: 'w-64',
      },
    },
  },
  defaultVariants: {
    collapsible: 'offcanvas',
  },
})
```

**Then use in components:**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { sidebar } from '@/lib/variants'

interface Props {
  collapsible?: 'icon' | 'offcanvas'
}

const props = withDefaults(defineProps<Props>(), {
  collapsible: 'offcanvas',
})

const classes = computed(() => sidebar({ collapsible: props.collapsible }))
</script>

<template>
  <aside :class="classes.root()">
    <div :class="classes.header()">
      <slot name="header" />
    </div>
    <div :class="classes.content()">
      <slot />
    </div>
    <div :class="classes.footer()">
      <slot name="footer" />
    </div>
  </aside>
</template>
```

#### 3. Composable Patterns

**Better state management with composables:**

```typescript
// src/composables/useSidebar.ts
import { ref, computed, readonly, watch } from 'vue'
import { useMediaQuery, useStorage } from '@vueuse/core'

const SIDEBAR_STATE_KEY = 'sidebar:state'
const MOBILE_BREAKPOINT = 1024

export function useSidebar() {
  // Persistent state
  const isOpen = useStorage(SIDEBAR_STATE_KEY, true)
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  const isOpenMobile = ref(false)

  // Computed state
  const state = computed(() => {
    if (isMobile.value) {
      return isOpenMobile.value ? 'expanded' : 'collapsed'
    }
    return isOpen.value ? 'expanded' : 'collapsed'
  })

  // Actions
  const toggle = () => {
    if (isMobile.value) {
      isOpenMobile.value = !isOpenMobile.value
    } else {
      isOpen.value = !isOpen.value
    }
  }

  const open = () => {
    if (isMobile.value) {
      isOpenMobile.value = true
    } else {
      isOpen.value = true
    }
  }

  const close = () => {
    if (isMobile.value) {
      isOpenMobile.value = false
    } else {
      isOpen.value = false
    }
  }

  // Close mobile sidebar when switching to desktop
  watch(isMobile, (mobile) => {
    if (!mobile) {
      isOpenMobile.value = false
    }
  })

  return {
    // State
    isOpen: readonly(isOpen),
    isMobile: readonly(isMobile),
    isOpenMobile: readonly(isOpenMobile),
    state: readonly(state),

    // Actions
    toggle,
    open,
    close,
  }
}
```

#### 4. Type-Safe Configuration

**Create a design system config:**

```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate',
      success: 'green',
      warning: 'yellow',
      error: 'red',
    },

    sidebar: {
      width: '16rem',
      widthCollapsed: '4rem',
    },

    transitions: {
      duration: '300ms',
    },
  },
})

// Use in components
const appConfig = useAppConfig()
const sidebarWidth = appConfig.ui.sidebar.width
```

### Your Custom Design System Structure

```
src/
├── lib/
│   ├── variants.ts          # Tailwind Variants definitions
│   └── utils.ts             # cn() helper, etc.
│
├── composables/
│   ├── useSidebar.ts        # Sidebar state management
│   ├── useToast.ts          # Toast notifications
│   └── useTheme.ts          # Dark mode, themes
│
├── components/ui/
│   ├── sidebar/             # Your custom sidebar (keep current)
│   ├── button/              # Custom button variants
│   ├── input/               # Custom form inputs
│   └── ...                  # Other primitives
│
├── assets/
│   └── design-tokens.css    # Semantic design tokens
│
└── app.config.ts            # Type-safe config
```

### Next Steps for Your Custom System

1. **Install Tailwind Variants**

   ```bash
   pnpm add tailwind-variants
   ```

2. **Refactor current sidebar to use TV**
   - Convert class strings to variant definitions
   - Add proper TypeScript types
   - Improve composable structure

3. **Establish design tokens**
   - Migrate from component-specific colors to semantic tokens
   - Define spacing, typography, shadows scales

4. **Build component library gradually**
   - Button, Input, Select (most used)
   - Form components
   - Feedback components (Toast, Modal)
   - Data display (Table, Card)

5. **Document your system**
   - Component examples
   - Design guidelines
   - Usage patterns

### Benefits of Your Approach

✅ **Ownership** - Every line of code is yours  
✅ **Flexibility** - Change anything without fighting a framework  
✅ **Performance** - Only bundle what you actually use  
✅ **Learning** - Deep understanding of component architecture  
✅ **Unique** - Your brand, your rules

### When to Consider a Library

Consider switching to Nuxt UI if:

- You need 50+ components quickly
- Team prefers pre-built solutions
- Design system is low priority
- You want to customize Nuxt UI's base

## Best Practices

### Design Consistency Guidelines

1. **Always animate state changes**

   ```vue
   <div v-if="isOpen" class="animate-fade-in">
     Content
   </div>
   ```

2. **Combine animations**

   ```vue
   <Dialog class="animate-scale-in">
     <div class="animate-fade-in" style="animation-delay: 100ms">
       Staggered content
     </div>
   </Dialog>
   ```

3. **Use semantic tokens + Tailwind colors**

   ```vue
   <Card class="bg-card border-border">
     <!-- Structure uses semantic tokens -->
     <div class="flex gap-2">
       <!-- Data uses Tailwind colors -->
       <div class="bg-blue-500 h-20 flex-1"></div>
       <div class="bg-purple-500 h-24 flex-1"></div>
     </div>
   </Card>
   ```

4. **Always provide feedback**
   - Loading states for async
   - Error messages for failures
   - Success messages for completions
   - Empty states for no data

### Design Pattern Best Practices

#### 1. Always Use Mutation Factory for Mutations

✅ **Good:**

```typescript
const mutation = createMutationFactory({
  mutationFn: async (data) => await api.create(data),
  successToast: { title: 'Success' },
})
```

❌ **Avoid:**

```typescript
const mutation = useMutation({
  mutation: async (data) => await api.create(data),
  onSuccess: () => {
    /* manual toast */
  },
  // ... lots of boilerplate
})
```

#### 2. Centralize Validation Schemas

✅ **Good:**

```typescript
// In todoValidation.ts
export const createTodoValidation = new ValidationStrategy()
  .add('title', required('title'))
  .add('title', stringLength('title', 1, 200))

// Use in multiple places
import { createTodoValidation } from './todoValidation'
```

❌ **Avoid:**

```typescript
// Repeated validation in every function
function validateTodo(dto) {
  if (!dto.title) throw new Error('Title required')
  if (dto.title.length < 1 || dto.title.length > 200) {
    throw new Error('Title must be 1-200 chars')
  }
}
```

#### 3. Use Type-Safe Query Keys

✅ **Good:**

```typescript
export const todoQueriesKeys = {
  list: ['todos', 'list'] as const,
  detail: (id: string) => ['todos', 'detail', id] as const,
}

// Type-safe and refactorable
queryCache.invalidateQueries({ key: [...todoQueriesKeys.list] })
```

❌ **Avoid:**

```typescript
// Magic strings scattered everywhere
queryCache.invalidateQueries({ key: ['todos-list'] })
queryCache.invalidateQueries({ key: ['todos_list'] }) // Typo!
```

#### 4. Leverage Optimistic Updates

```typescript
createMutationFactory({
  mutationFn: async (id) => await api.delete(id),

  // Optimistic update for instant UI feedback
  optimisticUpdate: (cache, id) => {
    const prev = cache.getQueryData(keys.list)
    cache.setQueryData(keys.list, (old) => old.filter((item) => item.id !== id))
    return prev // Return for rollback
  },

  invalidateKeys: [keys.list], // Refresh after mutation
})
```

### Summary

These design patterns provide:

- **40-50% less boilerplate** in mutation hooks
- **Consistent error handling** across the application
- **Reusable validation** logic
- **Type-safe query keys** and cache operations
- **Extensible HTTP client** with interceptor chain
- **Cleaner, more maintainable code**

All patterns follow FSD (Feature-Sliced Design) principles and are located in the `shared` layer for maximum reusability.

---

**Your app now has a professional, consistent design system!** 🎉

Use this guide as a reference when building new features.
