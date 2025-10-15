/**
 * XState Machines - Shared Layer
 *
 * Central export point for XState utilities, guards, actions, and helpers.
 * This provides the foundation for state machines across the application.
 *
 * @example
 * ```ts
 * import { createMachine, hasValue, logMessage } from '@/shared/lib/machines'
 *
 * const machine = createMachine({
 *   // ... configuration
 * })
 * ```
 */

// Core utilities
export {
  createMachine,
  getDefaultActorOptions,
  createActorOptions,
  MachinePatterns,
} from './machine-factory'
export type { BaseMachineContext } from './machine-factory'

// DevTools
export { initInspector, getInspector, getInspectConfig, consoleInspector } from './utils/devtools'

// Persistence
export {
  persistSnapshot,
  restoreSnapshot,
  clearSnapshot,
  withPersistence,
  hasPersistedSnapshot,
} from './utils/persist'

// Guards
export {
  hasValue,
  isNotEmpty,
  isInRange,
  hasMinLength,
  isValidZodSchema,
  and as andGuards,
  or as orGuards,
  not as notGuard,
} from './guards'

// Actions
export {
  logMessage,
  setErrorInContext,
  clearErrorFromContext,
  incrementCounter,
  setTimestamp,
  resetContext,
  updateNestedProperty,
  appendToArray,
  removeFromArray,
} from './actions'

// Re-export commonly used XState utilities
export { createActor, assign, raise, sendTo, fromPromise } from 'xstate'
export type { ActorRefFrom, SnapshotFrom, EventFrom } from 'xstate'
