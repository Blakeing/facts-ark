/**
 * Shared Action Creators
 *
 * Reusable action factories for common side effects in machines.
 * Actions execute side effects when transitions occur.
 *
 * @see https://stately.ai/docs/actions
 */

import { assign } from 'xstate'

/**
 * Create an action that logs a message to console
 *
 * Useful for debugging state transitions.
 *
 * @param getMessage - Function to generate log message
 * @returns Action function
 *
 * @example
 * ```ts
 * actions: {
 *   logTransition: logMessage(({ context }) => `Moving to state with: ${context.title}`)
 * }
 * ```
 */
export function logMessage<TContext, TEvent>(
  getMessage: (args: { context: TContext; event: TEvent }) => string,
) {
  return ({ context, event }: { context: TContext; event: TEvent }) => {
    const message = getMessage({ context, event })
    console.log(`[XState] ${message}`)
  }
}

/**
 * Create an action that sets an error in context
 *
 * @param getError - Function to extract/generate error
 * @returns Action function
 *
 * @example
 * ```ts
 * actions: {
 *   setError: setErrorInContext(({ event }) => event.error)
 * }
 * ```
 */
export function setErrorInContext<TContext extends { error?: Error | string }, TEvent>(
  getError: (args: { context: TContext; event: TEvent }) => Error | string,
) {
  return assign<TContext, TEvent>(({ context, event }) => {
    return {
      error: getError({ context, event }),
    }
  })
}

/**
 * Create an action that clears error from context
 *
 * @returns Action function
 *
 * @example
 * ```ts
 * actions: {
 *   clearError: clearErrorFromContext()
 * }
 * ```
 */
export function clearErrorFromContext<TContext extends { error?: Error | string }, TEvent>() {
  return assign<TContext, TEvent>({
    error: undefined,
  })
}

/**
 * Create an action that increments a counter
 *
 * @param key - Context key to increment
 * @param amount - Amount to increment by (default: 1)
 * @returns Action function
 *
 * @example
 * ```ts
 * actions: {
 *   incrementAttempts: incrementCounter('attempts')
 * }
 * ```
 */
export function incrementCounter<TContext, TEvent>(key: keyof TContext, amount: number = 1) {
  return assign<TContext, TEvent>(({ context }) => {
    const currentValue = context[key]
    if (typeof currentValue !== 'number') {
      console.warn(`Cannot increment non-number value at key: ${String(key)}`)
      return {}
    }
    return {
      [key]: currentValue + amount,
    } as Partial<TContext>
  })
}

/**
 * Create an action that sets a timestamp
 *
 * @param key - Context key to set
 * @returns Action function
 *
 * @example
 * ```ts
 * actions: {
 *   setStartTime: setTimestamp('startedAt')
 * }
 * ```
 */
export function setTimestamp<TContext, TEvent>(key: keyof TContext) {
  return assign<TContext, TEvent>({
    [key]: () => new Date().toISOString(),
  } as any)
}

/**
 * Create an action that resets context to initial values
 *
 * @param getInitialContext - Function that returns initial context
 * @returns Action function
 *
 * @example
 * ```ts
 * actions: {
 *   reset: resetContext(() => ({ count: 0, title: '' }))
 * }
 * ```
 */
export function resetContext<TContext, TEvent>(getInitialContext: () => TContext) {
  return assign<TContext, TEvent>(() => {
    return getInitialContext()
  })
}

/**
 * Create an action that updates a nested property
 *
 * @param path - Dot-separated path to property
 * @param getValue - Function to get new value
 * @returns Action function
 *
 * @example
 * ```ts
 * actions: {
 *   updateUserName: updateNestedProperty('user.name', ({ event }) => event.name)
 * }
 * ```
 */
export function updateNestedProperty<TContext, TEvent>(
  path: string,
  getValue: (args: { context: TContext; event: TEvent }) => unknown,
) {
  return assign<TContext, TEvent>(({ context, event }) => {
    const keys = path.split('.')
    const value = getValue({ context, event })

    // Simple implementation for one-level nesting
    if (keys.length === 1) {
      return { [keys[0]]: value } as Partial<TContext>
    }

    // For deeper nesting, you'd need to implement deep merge
    // For now, log warning
    console.warn(`Deep nested updates not fully implemented: ${path}`)
    return {}
  })
}

/**
 * Create an action that appends to an array in context
 *
 * @param key - Context key (must be an array)
 * @param getValue - Function to get value to append
 * @returns Action function
 *
 * @example
 * ```ts
 * actions: {
 *   addItem: appendToArray('items', ({ event }) => event.item)
 * }
 * ```
 */
export function appendToArray<TContext, TEvent, TItem>(
  key: keyof TContext,
  getValue: (args: { context: TContext; event: TEvent }) => TItem,
) {
  return assign<TContext, TEvent>(({ context, event }) => {
    const currentArray = context[key]
    if (!Array.isArray(currentArray)) {
      console.warn(`Cannot append to non-array value at key: ${String(key)}`)
      return {}
    }
    const newItem = getValue({ context, event })
    return {
      [key]: [...currentArray, newItem],
    } as Partial<TContext>
  })
}

/**
 * Create an action that removes from an array in context
 *
 * @param key - Context key (must be an array)
 * @param predicate - Function to determine which items to remove
 * @returns Action function
 *
 * @example
 * ```ts
 * actions: {
 *   removeItem: removeFromArray('items', ({ event }) => (item) => item.id !== event.id)
 * }
 * ```
 */
export function removeFromArray<TContext, TEvent, TItem>(
  key: keyof TContext,
  predicate: (args: { context: TContext; event: TEvent }) => (item: TItem) => boolean,
) {
  return assign<TContext, TEvent>(({ context, event }) => {
    const currentArray = context[key]
    if (!Array.isArray(currentArray)) {
      console.warn(`Cannot remove from non-array value at key: ${String(key)}`)
      return {}
    }
    const filterFn = predicate({ context, event })
    return {
      [key]: currentArray.filter(filterFn),
    } as Partial<TContext>
  })
}
