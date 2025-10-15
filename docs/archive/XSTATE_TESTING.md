# XState Testing Guide

## Overview

Comprehensive testing suite for XState machines, guards, and actions in the Facts Ark application.

## Test Coverage

### ✅ Shared Utilities (28 tests)

**Location**: `src/shared/lib/machines/__tests__/guards.spec.ts`

Tests for reusable guard factories:

- `hasValue` - Value existence checks
- `isNotEmpty` - String emptiness validation
- `isInRange` - Numeric range validation
- `hasMinLength` - Array length validation
- `and` - Combining guards with AND logic
- `or` - Combining guards with OR logic
- `not` - Negating guards

### ✅ Todo Lifecycle Machine (24 tests)

**Location**: `src/entities/todo/model/machines/__tests__/todo-lifecycle.machine.spec.ts`

Tests for the todo entity state machine:

**Initial State Tests** (4 tests)

- Transition from checkingInput to appropriate state
- Transition to draft when no todo provided
- Transition to pending when todo provided
- Transition to completed when status is completed

**Draft State Tests** (2 tests)

- CREATE event transitions to pending with todo data
- ERROR event stores error in context

**Pending State Tests** (4 tests)

- Clears error on entry
- START transitions to in_progress with timestamp
- ARCHIVE transitions to archived
- COMPLETE transitions to completed

**In Progress State Tests** (7 tests)

- UPDATE_PROGRESS updates progress value
- Progress clamped to 0-100 range
- PAUSE transitions back to pending
- BLOCK transitions to blocked with reason and timestamp
- REQUEST_REVIEW allowed only at 100% progress
- REQUEST_REVIEW blocked below 100% progress
- COMPLETE allowed only at 100% progress

**Blocked State Tests** (2 tests)

- UNBLOCK returns to in_progress
- PAUSE transitions to pending

**Review State Tests** (2 tests)

- APPROVE transitions to completed
- REJECT returns to in_progress with feedback and reset progress

**Completed State Tests** (2 tests)

- ARCHIVE transitions to archived
- RESTORE returns to pending with reset context

**Archived State Tests** (1 test)

- RESTORE returns to pending

### ✅ Form Wizard Machine (26 tests)

**Location**: `src/features/multi-step-form/model/machines/__tests__/form-wizard.machine.spec.ts`

Tests for the multi-step form wizard:

**Initial State Tests** (3 tests)

- Starts in step1
- Initializes with empty form data
- Can start with initial data

**Step 1 Tests** (5 tests)

- UPDATE_BASIC_INFO updates data and clears errors
- NEXT blocked without basic info
- NEXT allowed with valid basic info
- VALIDATION_ERROR stores errors
- RESET resets the form

**Step 2 Tests** (5 tests)

- UPDATE_DETAILS updates data and clears errors
- NEXT blocked without details
- NEXT allowed with valid details
- BACK navigates to step1
- GOTO_STEP jumps to specific step

**Step 3 Tests** (4 tests)

- UPDATE_ADDITIONAL updates additional data
- NEXT allows transition to review
- BACK navigates to step2
- GOTO_STEP jumps to any previous step

**Review State Tests** (3 tests)

- SUBMIT transitions to submitting
- BACK navigates to step3
- GOTO_STEP jumps to any step

**Submitting State Tests** (2 tests)

- SUCCESS transitions to success
- ERROR transitions to error with error message

**Success State Tests** (1 test)

- Is a final state

**Error State Tests** (3 tests)

- RETRY transitions to submitting
- BACK navigates to review
- RESET returns to step1 with clean state

## Running Tests

### Run all machine tests

```bash
pnpm test:machines
```

### Run specific test file

```bash
# Guards only
pnpm vitest --run --config vitest.machines.config.ts src/shared/lib/machines/__tests__/guards.spec.ts

# Todo machine only
pnpm vitest --run --config vitest.machines.config.ts src/entities/todo/model/machines/__tests__/

# Form wizard only
pnpm vitest --run --config vitest.machines.config.ts src/features/multi-step-form/model/machines/__tests__/
```

### Watch mode for development

```bash
pnpm vitest --config vitest.machines.config.ts src/shared/lib/machines/__tests__/
```

## Test Configuration

**File**: `vitest.machines.config.ts`

Separate Vitest configuration for machine tests that:

- Uses `jsdom` environment
- Skips json-server setup (not needed for pure state machines)
- Runs faster than integration tests

## Writing Machine Tests

### Basic Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { createActor } from 'xstate'
import { myMachine } from '../my-machine'

describe('My Machine', () => {
  describe('State Name', () => {
    let actor: ReturnType<typeof createActor<typeof myMachine>>

    beforeEach(() => {
      actor = createActor(myMachine, {
        input: {
          /* initial data */
        },
      })
      actor.start()
    })

    it('transitions correctly on EVENT', () => {
      actor.send({ type: 'EVENT', data: 'value' })

      const snapshot = actor.getSnapshot()
      expect(snapshot.value).toBe('expectedState')
      expect(snapshot.context.data).toBe('value')
    })
  })
})
```

### Testing Guards

```typescript
describe('Guard Function', () => {
  const myGuard = ({ context }) => Boolean(context.value)

  it('returns true when condition is met', () => {
    expect(myGuard({ context: { value: true }, event: {} as any })).toBe(true)
  })

  it('returns false when condition is not met', () => {
    expect(myGuard({ context: { value: false }, event: {} as any })).toBe(false)
  })
})
```

### Testing State Transitions

```typescript
it('transitions from idle to loading on FETCH', () => {
  const actor = createActor(machine)
  actor.start()

  expect(actor.getSnapshot().value).toBe('idle')

  actor.send({ type: 'FETCH' })

  expect(actor.getSnapshot().value).toBe('loading')
})
```

### Testing Context Updates

```typescript
it('updates count in context on INCREMENT', () => {
  const actor = createActor(machine)
  actor.start()

  const initialCount = actor.getSnapshot().context.count
  actor.send({ type: 'INCREMENT' })

  const newCount = actor.getSnapshot().context.count
  expect(newCount).toBe(initialCount + 1)
})
```

### Testing Guards Prevent Transitions

```typescript
it('blocks transition when guard fails', () => {
  const actor = createActor(machine)
  actor.start()

  actor.send({ type: 'SUBMIT' }) // Without required data

  expect(actor.getSnapshot().value).toBe('editing') // Stays in same state
})
```

### Testing With Async Transitions

For machines with invoke/promises, you may need to wait:

```typescript
it('handles async operation', async () => {
  const actor = createActor(machine)
  actor.start()

  actor.send({ type: 'LOAD' })

  // Wait for actor to settle
  await new Promise((resolve) => setTimeout(resolve, 10))

  expect(actor.getSnapshot().value).toBe('success')
})
```

## Best Practices

### 1. Test State Transitions

Focus on testing:

- ✅ Initial state
- ✅ Valid transitions
- ✅ Blocked transitions (guards)
- ✅ Context updates
- ✅ Actions execution

### 2. Use Descriptive Test Names

```typescript
// ✅ Good
it('transitions to in_progress on START and sets startedAt timestamp', () => {})

// ❌ Avoid
it('test start', () => {})
```

### 3. Test One Thing Per Test

```typescript
// ✅ Good
it('updates progress on UPDATE_PROGRESS', () => {
  actor.send({ type: 'UPDATE_PROGRESS', progress: 50 })
  expect(snapshot.context.progress).toBe(50)
})

it('clamps progress to 100 maximum', () => {
  actor.send({ type: 'UPDATE_PROGRESS', progress: 150 })
  expect(snapshot.context.progress).toBe(100)
})

// ❌ Avoid - testing multiple things
it('handles progress updates', () => {
  // Tests multiple scenarios in one test
})
```

### 4. Use beforeEach for Setup

```typescript
describe('Pending State', () => {
  let actor

  beforeEach(() => {
    actor = createActor(machine, { input: { todo: mockTodo } })
    actor.start()
  })

  it('transitions correctly', () => {
    // Actor is already set up
  })
})
```

### 5. Test Edge Cases

```typescript
// Boundary values
it('clamps progress to 0-100 range', () => {
  actor.send({ type: 'UPDATE_PROGRESS', progress: -10 })
  expect(snapshot.context.progress).toBe(0)

  actor.send({ type: 'UPDATE_PROGRESS', progress: 150 })
  expect(snapshot.context.progress).toBe(100)
})

// Null/undefined
it('handles missing optional data', () => {
  actor.send({ type: 'UPDATE', data: undefined })
  // Should not crash
})
```

### 6. Test Guard Combinations

```typescript
describe('Complex Guards', () => {
  it('allows transition when all conditions are met', () => {
    actor.send({ type: 'UPDATE', title: 'Valid', priority: 'high' })
    actor.send({ type: 'SUBMIT' })
    expect(snapshot.value).toBe('submitting')
  })

  it('blocks transition when any condition fails', () => {
    actor.send({ type: 'UPDATE', title: '', priority: 'high' })
    actor.send({ type: 'SUBMIT' })
    expect(snapshot.value).toBe('editing') // Stayed in same state
  })
})
```

## Coverage Goals

Target coverage for machine files:

- **Statements**: 100%
- **Branches**: 100% (all guards tested)
- **Functions**: 100%
- **Lines**: 100%

Since machines are pure logic, 100% coverage is achievable and recommended.

## Continuous Integration

Tests are designed to run in CI environments:

```yaml
# .github/workflows/test.yml
- name: Run Machine Tests
  run: pnpm test:machines
```

Fast execution (< 1 second) makes them ideal for pre-commit hooks and CI.

## Debugging Tests

### Visual Inspection

Use `@statelyai/inspect` during development:

```typescript
import { createBrowserInspector } from '@statelyai/inspect'

const inspector = createBrowserInspector({ autoStart: true })

const actor = createActor(machine, {
  inspect: inspector.inspect,
})
```

### Console Logging

```typescript
it('debugs state transitions', () => {
  actor.subscribe((snapshot) => {
    console.log('State:', snapshot.value)
    console.log('Context:', snapshot.context)
  })

  actor.send({ type: 'EVENT' })
})
```

### Snapshot Testing

```typescript
it('matches machine snapshot', () => {
  expect(machine).toMatchSnapshot()
})
```

## Resources

- [XState Testing Docs](https://stately.ai/docs/testing)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

## Test Results

Current status: ✅ **78/78 tests passing (100%)**

- Shared Guards: 28/28 ✅
- Todo Lifecycle Machine: 24/24 ✅
- Form Wizard Machine: 26/26 ✅

Fast execution: ~900ms total runtime
