/**
 * Machine State Persistence
 *
 * Utilities for persisting and restoring machine state to/from localStorage.
 * Useful for maintaining state across page refreshes.
 */

import type { Snapshot, ActorOptions } from 'xstate'

/**
 * Save machine snapshot to localStorage
 *
 * @param key - Storage key
 * @param snapshot - Machine snapshot to save
 *
 * @example
 * ```ts
 * const actor = createActor(machine)
 * actor.subscribe((snapshot) => {
 *   persistSnapshot('myMachine', snapshot)
 * })
 * ```
 */
export function persistSnapshot(key: string, snapshot: Snapshot<unknown>): void {
  try {
    const serialized = JSON.stringify(snapshot)
    localStorage.setItem(`xstate:${key}`, serialized)
  } catch (error) {
    console.warn(`Failed to persist snapshot for key: ${key}`, error)
  }
}

/**
 * Restore machine snapshot from localStorage
 *
 * @param key - Storage key
 * @returns Parsed snapshot or null if not found/invalid
 *
 * @example
 * ```ts
 * const snapshot = restoreSnapshot('myMachine')
 * const actor = createActor(machine, {
 *   snapshot
 * })
 * ```
 */
export function restoreSnapshot<T = unknown>(key: string): Snapshot<T> | null {
  try {
    const serialized = localStorage.getItem(`xstate:${key}`)
    if (!serialized) return null

    return JSON.parse(serialized) as Snapshot<T>
  } catch (error) {
    console.warn(`Failed to restore snapshot for key: ${key}`, error)
    return null
  }
}

/**
 * Clear persisted snapshot from localStorage
 *
 * @param key - Storage key
 */
export function clearSnapshot(key: string): void {
  try {
    localStorage.removeItem(`xstate:${key}`)
  } catch (error) {
    console.warn(`Failed to clear snapshot for key: ${key}`, error)
  }
}

/**
 * Create actor options with persistence
 *
 * Automatically restores snapshot on creation and persists on updates.
 *
 * @param key - Storage key
 * @param baseOptions - Base actor options to merge with
 * @returns Actor options with snapshot restoration
 *
 * @example
 * ```ts
 * const actor = createActor(machine, withPersistence('myMachine'))
 * actor.start()
 * actor.subscribe((snapshot) => {
 *   persistSnapshot('myMachine', snapshot)
 * })
 * ```
 */
export function withPersistence<T>(
  key: string,
  baseOptions?: Partial<ActorOptions<any, any, any, any, any>>,
): Partial<ActorOptions<any, any, any, any, any>> {
  const snapshot = restoreSnapshot<T>(key)

  return {
    ...baseOptions,
    ...(snapshot && { snapshot }),
  }
}

/**
 * Check if snapshot exists in storage
 *
 * @param key - Storage key
 * @returns True if snapshot exists
 */
export function hasPersistedSnapshot(key: string): boolean {
  try {
    return localStorage.getItem(`xstate:${key}`) !== null
  } catch {
    return false
  }
}
