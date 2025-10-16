import { isEqual } from 'lodash-es'

export class CacheEntry<T, TCacheKey> {
  constructor(key: TCacheKey, items: T[]) {
    this.key = key
    this.items = items
    this.stale = false
  }
  key: TCacheKey
  items: T[]
  stale: boolean
}

export class Cache<T, TCacheKey> {
  constructor(name: string) {
    this.tenantId = '' // or app context identifier
    this.items = [] as CacheEntry<T, TCacheKey>[]
    this.name = name
    this.isReset = true
  }

  name: string
  tenantId: string
  items: CacheEntry<T, TCacheKey>[]
  isReset: boolean

  private reset() {
    this.isReset = true
    this.tenantId = '' // or current app context
    this.items = []
  }

  private validate() {
    // Adapt to your app's context switching (if any)
    // For now, can be simplified or removed if no multi-tenant
    if (this.isReset) return
  }

  public getCacheEntry(key: TCacheKey): CacheEntry<T, TCacheKey> | undefined {
    this.validate()
    return this.items.find((x) => isEqual(x.key, key))
  }

  public hasCacheEntry(key: TCacheKey): boolean {
    this.validate()
    return this.items.some((x) => isEqual(x.key, key))
  }

  public setCacheEntry(key: TCacheKey, data: T[]) {
    this.validate()
    const entry = this.items.find((x) => isEqual(x.key, key))
    if (entry) {
      entry.items = data
      entry.stale = false
    } else {
      this.items.push(new CacheEntry<T, TCacheKey>(key, data))
    }
    this.isReset = false
  }

  public makeStale(key: TCacheKey) {
    const entry = this.getCacheEntry(key)
    if (entry) entry.stale = true
  }

  public clear() {
    this.reset()
  }
}
