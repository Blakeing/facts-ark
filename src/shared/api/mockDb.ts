/**
 * Mock Database
 *
 * In-memory database with localStorage persistence.
 * Simulates realistic async operations and error scenarios.
 */

const MIN_DELAY = 100
const MAX_DELAY = 300

/**
 * Simulates network delay for realistic API behavior
 */
export const simulateDelay = (): Promise<void> => {
  const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY
  return new Promise((resolve) => setTimeout(resolve, delay))
}

/**
 * Simulates random network errors (5% chance)
 */
export const simulateNetworkError = (): void => {
  if (Math.random() < 0.05) {
    throw new Error('Network error: Failed to connect')
  }
}

/**
 * Generic mock database storage
 */
export class MockDb<T extends { id: string }> {
  private storageKey: string
  private items: Map<string, T>

  constructor(storageKey: string) {
    this.storageKey = storageKey
    this.items = this.loadFromStorage()
  }

  private loadFromStorage(): Map<string, T> {
    try {
      const stored = localStorage.getItem(this.storageKey)
      if (stored) {
        const data = JSON.parse(stored) as T[]
        return new Map(data.map((item) => [item.id, item]))
      }
    } catch (error) {
      console.error('Failed to load from localStorage:', error)
    }
    return new Map()
  }

  private saveToStorage(): void {
    try {
      const data = Array.from(this.items.values())
      localStorage.setItem(this.storageKey, JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save to localStorage:', error)
    }
  }

  async getAll(): Promise<T[]> {
    await simulateDelay()
    simulateNetworkError()
    return Array.from(this.items.values())
  }

  async getById(id: string): Promise<T | undefined> {
    await simulateDelay()
    simulateNetworkError()
    return this.items.get(id)
  }

  async create(item: T): Promise<T> {
    await simulateDelay()
    simulateNetworkError()
    this.items.set(item.id, item)
    this.saveToStorage()
    return item
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    await simulateDelay()
    simulateNetworkError()
    const item = this.items.get(id)
    if (!item) {
      throw new Error(`Item with id ${id} not found`)
    }
    const updated = { ...item, ...updates }
    this.items.set(id, updated)
    this.saveToStorage()
    return updated
  }

  async delete(id: string): Promise<void> {
    await simulateDelay()
    simulateNetworkError()
    if (!this.items.has(id)) {
      throw new Error(`Item with id ${id} not found`)
    }
    this.items.delete(id)
    this.saveToStorage()
  }

  async clear(): Promise<void> {
    this.items.clear()
    this.saveToStorage()
  }
}

// Export the MockDb class for type-safe instantiation in each entity
// Each entity should create its own typed instance
// Example: export const todosDb = new MockDb<Todo>(STORAGE_KEY)
