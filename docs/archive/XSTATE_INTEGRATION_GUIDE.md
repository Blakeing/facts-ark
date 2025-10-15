# XState Integration Guide

## Overview

This guide explains how XState is integrated into the Facts Ark FSD architecture and when to use it for managing complex application state.

## Table of Contents

- [When to Use XState](#when-to-use-xstate)
- [Architecture Integration](#architecture-integration)
- [Getting Started](#getting-started)
- [Examples](#examples)
- [Best Practices](#best-practices)
- [Debugging](#debugging)

## When to Use XState

### ✅ Use XState For:

1. **Multi-step workflows** - Wizards, forms, onboarding flows
2. **Entity lifecycle management** - Draft → Pending → Approved → Archived
3. **Complex UI state** - Modals with dependent steps, complex navigation
4. **Orchestration** - Coordinating multiple async operations with dependencies
5. **Business processes** - Workflows with approval chains, state transitions
6. **Undo/Redo systems** - Time-travel debugging, rollback capabilities

### ❌ Use Pinia For:

1. **Simple UI state** - Current filter, selected items, sidebar open/closed
2. **Global preferences** - Theme, language, user settings
3. **Transient state** - Form input values without complex logic

### ❌ Use Pinia Colada For:

1. **Server state** - Data fetching, caching, synchronization
2. **CRUD operations** - Creating, reading, updating, deleting resources
3. **Real-time data** - Polling, websockets, subscriptions

## Architecture Integration

XState follows the FSD layers:

```
src/
├── shared/lib/machines/          # Shared utilities, guards, actions
├── entities/*/model/machines/    # Entity lifecycle machines
├── features/*/model/machines/    # Feature-specific workflow machines
└── widgets/*/model/              # Widget orchestration (uses machines)
```

### Layer Guidelines

#### Shared Layer (`shared/lib/machines/`)

**What goes here:**

- Reusable guard factories
- Common action creators
- Machine utilities (persistence, devtools)
- Generic machine patterns

**Example:**

```typescript
import { hasValue, isNotEmpty } from '@/shared/lib/machines'
```

#### Entity Layer (`entities/*/model/machines/`)

**What goes here:**

- Entity lifecycle state machines
- Business entity state transitions
- Domain-specific workflow states

**Example: Todo Lifecycle Machine**

```typescript
// entities/todo/model/machines/todo-lifecycle.machine.ts
export const todoLifecycleMachine = setup({ ... }).createMachine({
  initial: 'pending',
  states: {
    pending: { on: { START: 'in_progress' } },
    in_progress: { on: { COMPLETE: 'completed' } },
    completed: { type: 'final' }
  }
})
```

#### Feature Layer (`features/*/model/machines/`)

**What goes here:**

- Feature-specific workflow machines
- Multi-step user interactions
- Complex form wizards

**Example: Multi-Step Form**

```typescript
// features/multi-step-form/model/machines/form-wizard.machine.ts
export const formWizardMachine = setup({ ... }).createMachine({
  initial: 'step1',
  states: {
    step1: { on: { NEXT: 'step2' } },
    step2: { on: { NEXT: 'step3', BACK: 'step1' } },
    step3: { on: { SUBMIT: 'submitting' } }
  }
})
```

## Getting Started

### 1. Install Dependencies

```bash
pnpm add xstate @xstate/vue
pnpm add -D @statelyai/inspect
```

### 2. Initialize Inspector (Development)

The XState inspector is automatically initialized in `src/app/main.ts` for development builds:

```typescript
import { initInspector } from '@/shared/lib/machines'

if (import.meta.env.DEV) {
  initInspector()
}
```

**To view state machines:**

1. Run the dev server: `pnpm dev`
2. Open https://stately.ai/inspect in your browser
3. Your machines will appear automatically

### 3. Create a Machine

```typescript
// features/my-feature/model/machines/my-machine.ts
import { setup, assign } from 'xstate'

export const myMachine = setup({
  types: {} as {
    context: { count: number }
    events: { type: 'INCREMENT' } | { type: 'DECREMENT' }
  },
}).createMachine({
  id: 'myMachine',
  context: { count: 0 },
  initial: 'active',
  states: {
    active: {
      on: {
        INCREMENT: {
          actions: assign({
            count: ({ context }) => context.count + 1,
          }),
        },
        DECREMENT: {
          actions: assign({
            count: ({ context }) => context.count - 1,
          }),
        },
      },
    },
  },
})
```

### 4. Create a Vue Composable

```typescript
// features/my-feature/model/useMyMachine.ts
import { onMounted, onUnmounted, computed } from 'vue'
import { useActor } from '@xstate/vue'
import { createActor } from 'xstate'
import { getDefaultActorOptions } from '@/shared/lib/machines'
import { myMachine } from './machines/my-machine'

export function useMyMachine() {
  const actor = createActor(myMachine, getDefaultActorOptions())
  const { snapshot, send } = useActor(actor)

  onMounted(() => actor.start())
  onUnmounted(() => actor.stop())

  const count = computed(() => snapshot.value.context.count)

  return {
    count,
    increment: () => send({ type: 'INCREMENT' }),
    decrement: () => send({ type: 'DECREMENT' }),
  }
}
```

### 5. Use in Components

```vue
<script setup lang="ts">
import { useMyMachine } from '@/features/my-feature'

const { count, increment, decrement } = useMyMachine()
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>
```

## Examples

### Example 1: Todo Lifecycle Machine

Located in `entities/todo/model/machines/todo-lifecycle.machine.ts`

**Features:**

- Extended workflow states (draft, pending, in_progress, blocked, review, completed, archived)
- Guards for state transition validation
- Context updates with timestamps
- Integration with existing todo entity

**Usage:**

```typescript
import { useTodoMachine } from '@/entities/todo'

const { state, send, isPending, isCompleted } = useTodoMachine({
  todo: myTodo,
})

// Start working on a todo
send({ type: 'START' })

// Update progress
send({ type: 'UPDATE_PROGRESS', progress: 50 })

// Block with reason
send({ type: 'BLOCK', reason: 'Waiting for dependencies' })
```

### Example 2: Multi-Step Form Wizard

Located in `features/multi-step-form/model/machines/form-wizard.machine.ts`

**Features:**

- Step-by-step navigation
- Validation guards
- Review step before submission
- Error handling with retry
- Progress tracking

**Usage:**

```typescript
import { useFormWizard } from '@/features/multi-step-form'

const wizard = useFormWizard()

// Update form data
wizard.updateBasicInfo({ title: 'New Item', category: 'work' })

// Navigate
wizard.next() // Go to next step
wizard.back() // Go to previous step
wizard.goToStep(2) // Jump to specific step

// Check state
console.log(wizard.currentStep.value) // 1, 2, 3, 4
console.log(wizard.progress.value) // 0-100
console.log(wizard.canGoNext.value) // true/false

// Submit
wizard.submit()
```

## Best Practices

### 1. Type Safety

Always define types for context, events, and input:

```typescript
export const machine = setup({
  types: {} as {
    context: MyContext
    events: MyEvent
    input: MyInput
  }
}).createMachine({ ... })
```

### 2. Guard Naming

Use descriptive guard names that read like questions:

```typescript
guards: {
  hasTitle: ({ context }) => Boolean(context.title),
  isValid: ({ context }) => context.errors.length === 0,
  canSubmit: ({ context }) => /* validation logic */
}
```

### 3. Action Organization

Keep actions pure and side-effect free when possible:

```typescript
// ✅ Good - Pure
actions: assign({
  count: ({ context }) => context.count + 1
})

// ❌ Avoid - Side effects in assign
actions: assign({
  data: ({ context }) => {
    api.save(context.data)  // Side effect!
    return context.data
  }
})

// ✅ Better - Use invoke or entry actions for side effects
states: {
  saving: {
    entry: ({ context }) => api.save(context.data),
    on: {
      SUCCESS: 'saved',
      ERROR: 'error'
    }
  }
}
```

### 4. Context Structure

Keep context flat and normalized:

```typescript
// ✅ Good
context: {
  userId: '123',
  userName: 'John',
  isLoading: false,
  error: null
}

// ❌ Avoid deep nesting
context: {
  user: {
    details: {
      personal: {
        name: 'John'
      }
    }
  }
}
```

### 5. Event Naming

Use SCREAMING_SNAKE_CASE for event types:

```typescript
// ✅ Good
{
  type: 'SUBMIT_FORM'
}
{
  type: 'LOAD_DATA'
}
{
  type: 'RETRY_REQUEST'
}

// ❌ Avoid
{
  type: 'submitForm'
}
{
  type: 'loadData'
}
```

### 6. Machine Organization

Split large machines into parent/child actors:

```typescript
// Parent machine spawns child machines
const parentMachine = setup({
  actors: {
    childMachine: childMachine,
  },
}).createMachine({
  invoke: {
    src: 'childMachine',
    onDone: 'completed',
  },
})
```

## Debugging

### XState Inspector (Recommended)

1. Visit https://stately.ai/inspect
2. Your machines appear automatically in dev mode
3. Features:
   - Visual state machine diagram
   - Real-time state updates
   - Event history
   - Time-travel debugging

### Console Inspector

For quick debugging without the visual tool:

```typescript
import { consoleInspector } from '@/shared/lib/machines'

const actor = createActor(machine, {
  inspect: consoleInspector,
})
```

### Vue Devtools

The `@xstate/vue` integration works with Vue Devtools:

1. Install Vue Devtools extension
2. Select your component
3. Inspect the actor ref in component data

## Integration Patterns

### With Pinia Colada

Machines can trigger Pinia Colada mutations:

```typescript
import { useMutationCreateTodo } from '@/entities/todo'

export function useMyMachine() {
  const { mutate, isPending } = useMutationCreateTodo()

  const actor = createActor(machine)

  // Listen to state changes
  actor.subscribe((snapshot) => {
    if (snapshot.matches('submitting')) {
      mutate(snapshot.context.data)
    }
  })

  return { actor }
}
```

### With Pinia Stores

Machines can read from Pinia stores:

```typescript
import { useAuthStore } from '@/shared/stores'

export const machine = setup({
  guards: {
    isAuthenticated: () => {
      const authStore = useAuthStore()
      return authStore.isAuthenticated
    }
  }
}).createMachine({ ... })
```

### State Persistence

Persist machine state to localStorage:

```typescript
import { persistSnapshot, restoreSnapshot } from '@/shared/lib/machines'

const actor = createActor(machine, {
  snapshot: restoreSnapshot('myMachine'),
})

actor.subscribe((snapshot) => {
  persistSnapshot('myMachine', snapshot)
})
```

## Resources

- [XState Documentation](https://stately.ai/docs/xstate)
- [XState Visualizer](https://stately.ai/viz)
- [XState Inspector](https://stately.ai/inspect)
- [@xstate/vue Documentation](https://stately.ai/docs/xstate-vue)
- [Feature-Sliced Design](https://feature-sliced.design/)

## Next Steps

1. Review the [XState Patterns Guide](./XSTATE_PATTERNS.md) for common patterns
2. Explore the todo lifecycle machine example
3. Try the multi-step form wizard example
4. Create your first machine for a complex feature

## Support

For questions or issues:

1. Check the [XState Discord](https://discord.gg/xstate)
2. Review existing machines in the codebase
3. Consult the FSD documentation for architecture questions
