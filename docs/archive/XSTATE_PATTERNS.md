# XState Patterns

Common patterns and recipes for using XState in the Facts Ark FSD architecture.

## Table of Contents

- [Basic Patterns](#basic-patterns)
- [Advanced Patterns](#advanced-patterns)
- [Integration Patterns](#integration-patterns)
- [Testing Patterns](#testing-patterns)

## Basic Patterns

### 1. Loading State Pattern

Handle async operations with loading, success, and error states.

```typescript
import { setup, fromPromise } from 'xstate'

export const loadingMachine = setup({
  types: {} as {
    context: { data: any; error: Error | null }
    events: { type: 'LOAD' } | { type: 'RETRY' }
  },
  actors: {
    fetchData: fromPromise(async () => {
      const response = await api.fetchData()
      return response.data
    }),
  },
}).createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: { LOAD: 'loading' },
    },
    loading: {
      invoke: {
        src: 'fetchData',
        onDone: {
          target: 'success',
          actions: assign({
            data: ({ event }) => event.output,
          }),
        },
        onError: {
          target: 'error',
          actions: assign({
            error: ({ event }) => event.error,
          }),
        },
      },
    },
    success: {
      on: { LOAD: 'loading' },
    },
    error: {
      on: { RETRY: 'loading' },
    },
  },
})
```

### 2. Form Validation Pattern

Multi-step form with validation at each step.

```typescript
import { setup, assign } from 'xstate'

export const formMachine = setup({
  types: {} as {
    context: {
      data: any
      errors: Record<string, string>
    }
    events: { type: 'INPUT'; field: string; value: any } | { type: 'SUBMIT' } | { type: 'RESET' }
  },
}).createMachine({
  initial: 'editing',
  states: {
    editing: {
      on: {
        INPUT: {
          actions: assign({
            data: ({ context, event }) => ({
              ...context.data,
              [event.field]: event.value,
            }),
            errors: {}, // Clear errors on input
          }),
        },
        SUBMIT: {
          target: 'validating',
        },
      },
    },
    validating: {
      always: [
        {
          guard: ({ context }) => validateForm(context.data),
          target: 'submitting',
        },
        {
          target: 'editing',
          actions: assign({
            errors: ({ context }) => getValidationErrors(context.data),
          }),
        },
      ],
    },
    submitting: {
      invoke: {
        src: 'submitForm',
        onDone: 'success',
        onError: {
          target: 'editing',
          actions: assign({
            errors: ({ event }) => ({ _form: event.error.message }),
          }),
        },
      },
    },
    success: {
      type: 'final',
    },
  },
})
```

### 3. Wizard/Stepper Pattern

Navigate through multiple steps with validation.

```typescript
import { setup, assign } from 'xstate'

const steps = ['basic', 'details', 'review'] as const

export const wizardMachine = setup({
  types: {} as {
    context: {
      currentIndex: number
      formData: Record<string, any>
    }
    events: { type: 'NEXT' } | { type: 'BACK' } | { type: 'GOTO'; index: number }
  },
}).createMachine({
  context: {
    currentIndex: 0,
    formData: {},
  },
  initial: 'basic',
  states: {
    basic: {
      on: {
        NEXT: {
          target: 'details',
          guard: ({ context }) => isStepValid(context.formData, 0),
        },
      },
    },
    details: {
      on: {
        NEXT: {
          target: 'review',
          guard: ({ context }) => isStepValid(context.formData, 1),
        },
        BACK: 'basic',
      },
    },
    review: {
      on: {
        BACK: 'details',
        NEXT: 'submitting',
      },
    },
    submitting: {
      invoke: {
        src: 'submitWizard',
        onDone: 'success',
        onError: 'review',
      },
    },
    success: {
      type: 'final',
    },
  },
})
```

### 4. Retry with Exponential Backoff

Handle failed operations with intelligent retry logic.

```typescript
import { setup, assign } from 'xstate'

export const retryMachine = setup({
  types: {} as {
    context: {
      retries: number
      maxRetries: number
      delay: number
    }
    events: { type: 'FETCH' } | { type: 'RETRY' } | { type: 'CANCEL' }
  },
}).createMachine({
  context: {
    retries: 0,
    maxRetries: 3,
    delay: 1000,
  },
  initial: 'idle',
  states: {
    idle: {
      on: { FETCH: 'fetching' },
    },
    fetching: {
      invoke: {
        src: 'fetchData',
        onDone: {
          target: 'success',
          actions: assign({ retries: 0 }),
        },
        onError: {
          target: 'failed',
          actions: assign({
            retries: ({ context }) => context.retries + 1,
          }),
        },
      },
    },
    failed: {
      always: [
        {
          guard: ({ context }) => context.retries >= context.maxRetries,
          target: 'error',
        },
        {
          target: 'retrying',
        },
      ],
    },
    retrying: {
      after: {
        delay: {
          target: 'fetching',
          actions: assign({
            delay: ({ context }) => context.delay * 2,
          }),
        },
      },
      on: {
        CANCEL: 'error',
      },
    },
    success: {
      type: 'final',
    },
    error: {
      type: 'final',
    },
  },
})
```

## Advanced Patterns

### 1. Parent-Child Actors

Spawn child machines for complex workflows.

```typescript
import { setup, assign } from 'xstate'

const childMachine = setup({
  types: {} as {
    context: { item: any }
    events: { type: 'PROCESS' }
  },
}).createMachine({
  initial: 'processing',
  states: {
    processing: {
      after: {
        1000: 'done',
      },
    },
    done: {
      type: 'final',
    },
  },
})

export const parentMachine = setup({
  types: {} as {
    context: {
      items: any[]
      results: any[]
    }
    events: { type: 'START' }
  },
  actors: {
    processItem: childMachine,
  },
}).createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: { START: 'processing' },
    },
    processing: {
      invoke: {
        src: 'processItem',
        input: ({ context }) => ({ item: context.items[0] }),
        onDone: {
          target: 'done',
          actions: assign({
            results: ({ context, event }) => [...context.results, event.output],
          }),
        },
      },
    },
    done: {
      type: 'final',
    },
  },
})
```

### 2. Parallel States

Handle multiple concurrent processes.

```typescript
import { setup } from 'xstate'

export const parallelMachine = setup({
  types: {} as {
    context: {}
    events: { type: 'UPLOAD' } | { type: 'VALIDATE' } | { type: 'PROCESS' }
  },
}).createMachine({
  type: 'parallel',
  states: {
    upload: {
      initial: 'idle',
      states: {
        idle: {
          on: { UPLOAD: 'uploading' },
        },
        uploading: {
          invoke: {
            src: 'uploadFile',
            onDone: 'complete',
            onError: 'failed',
          },
        },
        complete: { type: 'final' },
        failed: {},
      },
    },
    validation: {
      initial: 'idle',
      states: {
        idle: {
          on: { VALIDATE: 'validating' },
        },
        validating: {
          invoke: {
            src: 'validateData',
            onDone: 'valid',
            onError: 'invalid',
          },
        },
        valid: { type: 'final' },
        invalid: {},
      },
    },
  },
})
```

### 3. History States

Remember and restore previous states.

```typescript
import { setup } from 'xstate'

export const historyMachine = setup({
  types: {} as {
    context: {}
    events: { type: 'PAUSE' } | { type: 'RESUME' } | { type: 'RESET' }
  },
}).createMachine({
  initial: 'active',
  states: {
    active: {
      initial: 'step1',
      states: {
        hist: {
          type: 'history',
          history: 'deep',
        },
        step1: {
          on: { NEXT: 'step2' },
        },
        step2: {
          on: { NEXT: 'step3' },
        },
        step3: {},
      },
      on: {
        PAUSE: 'paused',
      },
    },
    paused: {
      on: {
        RESUME: 'active.hist',
        RESET: 'active',
      },
    },
  },
})
```

### 4. Delayed Transitions

Automatic transitions after a delay.

```typescript
import { setup } from 'xstate'

export const delayedMachine = setup({
  types: {} as {
    context: { message: string }
    events: { type: 'SHOW_TOAST' }
  },
}).createMachine({
  initial: 'hidden',
  states: {
    hidden: {
      on: { SHOW_TOAST: 'visible' },
    },
    visible: {
      after: {
        3000: 'hidden', // Auto-hide after 3 seconds
      },
    },
  },
})
```

## Integration Patterns

### 1. XState + Pinia Colada

Trigger mutations from machine actions.

```typescript
import { setup } from 'xstate'
import { useMutationCreateTodo } from '@/entities/todo'

export function useFormWithMutation() {
  const { mutate, isPending } = useMutationCreateTodo()

  const machine = setup({
    types: {} as {
      context: { data: any }
      events: { type: 'SUBMIT' }
    },
  }).createMachine({
    initial: 'editing',
    states: {
      editing: {
        on: { SUBMIT: 'submitting' },
      },
      submitting: {
        entry: ({ context }) => {
          mutate(context.data, {
            onSuccess: () => send({ type: 'SUCCESS' }),
            onError: (error) => send({ type: 'ERROR', error }),
          })
        },
        on: {
          SUCCESS: 'success',
          ERROR: 'error',
        },
      },
      success: { type: 'final' },
      error: {},
    },
  })

  return { machine, isPending }
}
```

### 2. XState + Router Navigation

Navigate based on machine state.

```typescript
import { setup } from 'xstate'
import { useRouter } from 'vue-router'
import { watch } from 'vue'

export function useWizardWithRouting() {
  const router = useRouter()

  const machine = setup({
    types: {} as {
      context: {}
      events: { type: 'NEXT' } | { type: 'BACK' }
    },
  }).createMachine({
    initial: 'step1',
    states: {
      step1: { on: { NEXT: 'step2' } },
      step2: { on: { NEXT: 'step3', BACK: 'step1' } },
      step3: { on: { BACK: 'step2' } },
    },
  })

  const { snapshot } = useActor(machine)

  // Sync router with machine state
  watch(
    () => snapshot.value.value,
    (state) => {
      router.push(`/wizard/${state}`)
    },
  )

  return { machine }
}
```

### 3. XState + localStorage Persistence

Persist and restore machine state.

```typescript
import { setup } from 'xstate'
import { persistSnapshot, restoreSnapshot } from '@/shared/lib/machines'

export function usePersistentMachine() {
  const STORAGE_KEY = 'myMachine'

  const machine = setup({
    types: {} as {
      context: { count: number }
      events: { type: 'INCREMENT' }
    },
  }).createMachine({
    context: { count: 0 },
    // ... states
  })

  // Restore from localStorage
  const snapshot = restoreSnapshot(STORAGE_KEY)
  const actor = createActor(machine, { snapshot })

  // Persist on changes
  actor.subscribe((newSnapshot) => {
    persistSnapshot(STORAGE_KEY, newSnapshot)
  })

  return { actor }
}
```

### 4. XState + Form Libraries (VeeValidate)

Integrate with VeeValidate for validation.

```typescript
import { setup, assign } from 'xstate'
import { useForm } from 'vee-validate'
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

export function useFormWithValidation() {
  const form = useForm({
    validationSchema: toTypedSchema(schema),
  })

  const machine = setup({
    types: {} as {
      context: { formData: any }
      events: { type: 'SUBMIT' }
    },
  }).createMachine({
    initial: 'editing',
    states: {
      editing: {
        on: {
          SUBMIT: {
            target: 'validating',
            actions: assign({
              formData: () => form.values,
            }),
          },
        },
      },
      validating: {
        always: [
          {
            guard: () => form.meta.value.valid,
            target: 'submitting',
          },
          {
            target: 'editing',
          },
        ],
      },
      submitting: {
        // Submit logic
      },
    },
  })

  return { machine, form }
}
```

## Testing Patterns

### 1. Unit Testing Machines

Test state transitions in isolation.

```typescript
import { describe, it, expect } from 'vitest'
import { createActor } from 'xstate'
import { myMachine } from './my-machine'

describe('myMachine', () => {
  it('transitions from idle to loading on LOAD event', () => {
    const actor = createActor(myMachine)
    actor.start()

    expect(actor.getSnapshot().value).toBe('idle')

    actor.send({ type: 'LOAD' })

    expect(actor.getSnapshot().value).toBe('loading')
  })

  it('updates context on INPUT event', () => {
    const actor = createActor(myMachine)
    actor.start()

    actor.send({ type: 'INPUT', field: 'name', value: 'John' })

    expect(actor.getSnapshot().context.data.name).toBe('John')
  })
})
```

### 2. Testing Guards

Test guard logic separately.

```typescript
import { describe, it, expect } from 'vitest'

describe('Machine Guards', () => {
  const hasTitle = ({ context }) => Boolean(context.title)

  it('allows transition when title exists', () => {
    const result = hasTitle({ context: { title: 'Hello' } })
    expect(result).toBe(true)
  })

  it('blocks transition when title is empty', () => {
    const result = hasTitle({ context: { title: '' } })
    expect(result).toBe(false)
  })
})
```

### 3. Testing with Vue Test Utils

Test components using machines.

```typescript
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MyComponent from './MyComponent.vue'

describe('MyComponent', () => {
  it('shows loading state', async () => {
    const wrapper = mount(MyComponent)

    await wrapper.find('button').trigger('click')

    expect(wrapper.text()).toContain('Loading...')
  })

  it('shows success message after load', async () => {
    const wrapper = mount(MyComponent)

    await wrapper.find('button').trigger('click')

    // Wait for machine transition
    await wrapper.vm.$nextTick()

    expect(wrapper.text()).toContain('Success!')
  })
})
```

### 4. Snapshot Testing

Test entire machine configurations.

```typescript
import { describe, it, expect } from 'vitest'
import { myMachine } from './my-machine'

describe('myMachine snapshots', () => {
  it('matches machine configuration', () => {
    expect(myMachine).toMatchSnapshot()
  })

  it('matches initial context', () => {
    const actor = createActor(myMachine)
    actor.start()

    expect(actor.getSnapshot().context).toMatchSnapshot()
  })
})
```

## Performance Patterns

### 1. Debouncing Events

Debounce rapid events (like search input).

```typescript
import { setup } from 'xstate'

export const searchMachine = setup({
  types: {} as {
    context: { query: string }
    events: { type: 'SEARCH'; query: string }
  },
}).createMachine({
  initial: 'idle',
  states: {
    idle: {
      on: {
        SEARCH: {
          target: 'debouncing',
          actions: assign({
            query: ({ event }) => event.query,
          }),
        },
      },
    },
    debouncing: {
      after: {
        300: 'searching', // Wait 300ms before searching
      },
      on: {
        SEARCH: {
          target: 'debouncing',
          reenter: true,
          actions: assign({
            query: ({ event }) => event.query,
          }),
        },
      },
    },
    searching: {
      invoke: {
        src: 'performSearch',
        onDone: 'idle',
      },
    },
  },
})
```

### 2. Throttling State Updates

Limit how often state updates occur.

```typescript
import { setup } from 'xstate'

export const throttledMachine = setup({
  types: {} as {
    context: { value: number; lastUpdate: number }
    events: { type: 'UPDATE'; value: number }
  },
}).createMachine({
  context: {
    value: 0,
    lastUpdate: 0,
  },
  initial: 'ready',
  states: {
    ready: {
      on: {
        UPDATE: {
          target: 'cooldown',
          guard: ({ context }) => Date.now() - context.lastUpdate > 1000,
          actions: assign({
            value: ({ event }) => event.value,
            lastUpdate: () => Date.now(),
          }),
        },
      },
    },
    cooldown: {
      after: {
        1000: 'ready',
      },
    },
  },
})
```

## Resources

- [XState Catalog](https://xstate-catalogue.com/) - Community patterns
- [Stately Studio](https://stately.ai/studio) - Visual editor
- [XState Examples](https://github.com/statelyai/xstate/tree/main/examples)

## Next Steps

1. Try implementing these patterns in your features
2. Explore the example machines in the codebase
3. Visualize your machines with Stately Studio
4. Join the XState Discord for community support
