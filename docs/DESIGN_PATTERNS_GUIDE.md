# Design Patterns Guide

This document describes the design patterns implemented in the Facts-Ark codebase. These patterns improve code reusability, maintainability, and consistency across the application.

## Table of Contents

1. [Mutation Factory Pattern](#mutation-factory-pattern)
2. [Validation Strategy Pattern](#validation-strategy-pattern)
3. [Query Cache Facade Pattern](#query-cache-facade-pattern)
4. [Query Key Factory Pattern](#query-key-factory-pattern)
5. [Request Builder Pattern](#request-builder-pattern)
6. [Interceptor Chain Pattern](#interceptor-chain-pattern)
7. [Migration Examples](#migration-examples)

---

## Mutation Factory Pattern

### Overview

The Mutation Factory Pattern eliminates boilerplate code in feature mutation hooks by providing a consistent API for creating mutations with optimistic updates, error handling, cache invalidation, and toast notifications.

### Location

`src/shared/lib/mutation/`

### Benefits

- Reduces 40-50 lines of boilerplate per mutation
- Consistent error handling across all mutations
- Automatic optimistic updates and rollback
- Built-in toast notifications
- Centralized cache invalidation

### Usage

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

### Dynamic Toast Messages

You can also use functions for dynamic toast messages:

```typescript
successToast: (data, variables) => ({
  title: 'Success',
  description: `Deleted ${data.count} items`,
}),
```

### Additional Lifecycle Hooks

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

---

## Validation Strategy Pattern

### Overview

The Validation Strategy Pattern provides a composable, reusable approach to data validation. Instead of scattered validation logic, you can build validation chains and reuse them across your application.

### Location

`src/shared/lib/validation/`

### Benefits

- Composable validation rules
- Reusable validators across the codebase
- Clear, declarative validation syntax
- Easy to test individual validators
- Consistent error messages

### Usage

#### Basic Validation

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

#### Available Validators

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

#### Reusable Validation Schemas

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

#### Custom Validators

```typescript
import { custom } from '@/shared/lib/validation'

const validator = new ValidationStrategy().add(
  'age',
  custom('age', (value) => typeof value === 'number' && value >= 18, 'Must be 18 or older'),
)
```

---

## Query Cache Facade Pattern

### Overview

The Query Cache Facade simplifies common query cache operations like optimistic updates, providing a cleaner API over Pinia Colada's query cache.

### Location

`src/shared/lib/cache/`

### Benefits

- Simpler API for common cache operations
- Hide complexity of cache manipulation
- Consistent optimistic update patterns
- Easier to mock in tests
- Type-safe cache operations

### Usage

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

---

## Query Key Factory Pattern

### Overview

The Query Key Factory Pattern provides structured, type-safe query key generation. While the full factory infrastructure is available, we currently use a simplified approach for consistency.

### Location

`src/shared/lib/query-keys/`

### Benefits

- Type-safe query keys
- Consistent key structure
- Easier refactoring
- Centralized key management

### Current Usage

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

### Advanced Usage (Optional)

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

---

## Request Builder Pattern

### Overview

The Request Builder Pattern provides a fluent API for constructing HTTP requests with integrated validation.

### Location

`src/shared/api/builders/`

### Benefits

- Fluent, declarative request construction
- Integrated validation
- Cleaner API function definitions
- Type-safe request building
- Consistent error handling

### Usage

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

### All HTTP Methods

```typescript
builder.get('/todos')
builder.post('/todos')
builder.put('/todos/1')
builder.patch('/todos/1')
builder.delete('/todos/1')
```

---

## Interceptor Chain Pattern

### Overview

The Interceptor Chain Pattern provides an extensible way to add request/response interceptors following the Chain of Responsibility pattern.

### Location

`src/shared/api/interceptors/`

### Benefits

- Easy to add/remove interceptors
- Individual interceptor testing
- Better separation of concerns
- Priority-based execution order
- Reusable interceptor components

### Usage

#### Basic Setup

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

#### Available Interceptors

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

#### Creating Custom Interceptors

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

---

## Migration Examples

### Before: Manual Mutation

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

### After: Mutation Factory

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

---

### Before: Manual Validation

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

### After: Validation Strategy

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

---

## Best Practices

### 1. Always Use Mutation Factory for Mutations

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

### 2. Centralize Validation Schemas

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

### 3. Use Type-Safe Query Keys

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

### 4. Leverage Optimistic Updates

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

---

## Summary

These design patterns provide:

- **40-50% less boilerplate** in mutation hooks
- **Consistent error handling** across the application
- **Reusable validation** logic
- **Type-safe query keys** and cache operations
- **Extensible HTTP client** with interceptor chain
- **Cleaner, more maintainable code**

All patterns follow FSD (Feature-Sliced Design) principles and are located in the `shared` layer for maximum reusability.
