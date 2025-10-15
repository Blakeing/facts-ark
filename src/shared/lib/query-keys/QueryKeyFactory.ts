/**
 * QueryKeyFactory
 *
 * Factory pattern for creating structured, type-safe query keys.
 * Provides consistent key generation and helper methods for invalidation.
 *
 * @example
 * ```ts
 * class TodoQueryKeys extends QueryKeyFactory {
 *   constructor() {
 *     super('todos')
 *   }
 *
 *   list(filter?: string) {
 *     return this.createKey('list', filter)
 *   }
 *
 *   detail(id: string) {
 *     return this.createKey('detail', id)
 *   }
 *
 *   stats() {
 *     return this.createKey('stats')
 *   }
 * }
 *
 * export const todoKeys = new TodoQueryKeys()
 * ```
 */

/**
 * Base QueryKeyFactory class
 */
export abstract class QueryKeyFactory {
  constructor(protected readonly entity: string) {}

  /**
   * Get the entity name
   */
  getEntity(): string {
    return this.entity
  }

  /**
   * Get all keys for this entity
   */
  all(): unknown[] {
    return [this.entity]
  }

  /**
   * Create a structured key with parts
   */
  protected createKey(...parts: unknown[]): unknown[] {
    return [this.entity, ...parts.filter((p) => p !== undefined && p !== null)]
  }

  /**
   * Check if a key belongs to this entity
   */
  matches(key: unknown[]): boolean {
    return key.length > 0 && key[0] === this.entity
  }

  /**
   * Get key for invalidating all queries of this entity
   */
  invalidateAll(): unknown[] {
    return this.all()
  }
}

/**
 * Standard CRUD query key factory
 */
export class CrudQueryKeyFactory extends QueryKeyFactory {
  /**
   * List query key (optionally with filters)
   */
  list(filters?: Record<string, unknown>): unknown[] {
    return this.createKey('list', filters)
  }

  /**
   * Detail query key for a specific item
   */
  detail(id: string | number): unknown[] {
    return this.createKey('detail', id)
  }

  /**
   * Search query key
   */
  search(query: string): unknown[] {
    return this.createKey('search', query)
  }

  /**
   * Stats query key
   */
  stats(): unknown[] {
    return this.createKey('stats')
  }

  /**
   * Custom query key
   */
  custom(...parts: unknown[]): unknown[] {
    return this.createKey(...parts)
  }
}

/**
 * Create a CRUD query key factory
 */
export function createQueryKeyFactory(entity: string): CrudQueryKeyFactory {
  return new CrudQueryKeyFactory(entity)
}
