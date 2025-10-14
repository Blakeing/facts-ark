/**
 * XState DevTools Integration
 *
 * Provides inspector integration for visual debugging of state machines
 * in development mode.
 *
 * @see https://stately.ai/docs/inspector
 */

import { createBrowserInspector } from '@statelyai/inspect'
import type { InspectionEvent } from 'xstate'

/**
 * Inspector instance (singleton)
 */
let inspector: ReturnType<typeof createBrowserInspector> | null = null

/**
 * Initialize XState inspector for development
 *
 * Should be called once in app initialization (main.ts)
 * Only works in development mode.
 *
 * @returns Inspector instance or null if not in dev mode
 *
 * @example
 * ```ts
 * // In main.ts
 * if (import.meta.env.DEV) {
 *   initInspector()
 * }
 * ```
 */
export function initInspector() {
  // Only enable in development
  if (import.meta.env.PROD) {
    return null
  }

  // Create inspector if not already created
  if (!inspector) {
    inspector = createBrowserInspector({
      autoStart: true,
    })

    console.log('🔍 XState Inspector initialized')
    console.log('Open https://stately.ai/inspect to view state machines')
  }

  return inspector
}

/**
 * Get the current inspector instance
 *
 * @returns Inspector instance or null
 */
export function getInspector() {
  return inspector
}

/**
 * Get inspect options for creating actors
 *
 * Use this when creating actors to enable inspection.
 *
 * @returns Inspect configuration object
 *
 * @example
 * ```ts
 * const actor = createActor(machine, {
 *   inspect: getInspectConfig()
 * })
 * ```
 */
export function getInspectConfig() {
  if (import.meta.env.PROD || !inspector) {
    return undefined
  }

  return inspector.inspect
}

/**
 * Custom inspector for logging events
 *
 * Useful for debugging without the visual inspector.
 *
 * @param event - Inspection event
 *
 * @example
 * ```ts
 * const actor = createActor(machine, {
 *   inspect: consoleInspector
 * })
 * ```
 */
export function consoleInspector(event: InspectionEvent) {
  if (event.type === '@xstate.event') {
    console.log('📨 Event:', event.event)
  } else if (event.type === '@xstate.snapshot') {
    console.log('📸 Snapshot:', event.snapshot)
  }
}
