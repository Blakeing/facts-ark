import { describe, it, expect, beforeEach } from 'vitest'
import { Cache, CacheEntry } from '../Cache'

describe('Cache', () => {
  let cache: Cache<string, string>

  beforeEach(() => {
    cache = new Cache<string, string>('test-cache')
  })

  describe('CacheEntry', () => {
    it('should create a cache entry with correct properties', () => {
      const entry = new CacheEntry<string, string>('key1', ['item1', 'item2'])

      expect(entry.key).toBe('key1')
      expect(entry.items).toEqual(['item1', 'item2'])
      expect(entry.stale).toBe(false)
    })
  })

  describe('Cache', () => {
    it('should initialize with correct default values', () => {
      expect(cache.name).toBe('test-cache')
      expect(cache.tenantId).toBe('')
      expect(cache.items).toEqual([])
      expect(cache.isReset).toBe(true)
    })

    it('should set and get cache entries', () => {
      const data = ['item1', 'item2']
      cache.setCacheEntry('key1', data)

      const entry = cache.getCacheEntry('key1')
      expect(entry).toBeDefined()
      expect(entry?.items).toEqual(data)
      expect(entry?.stale).toBe(false)
    })

    it('should check if cache entry exists', () => {
      expect(cache.hasCacheEntry('key1')).toBe(false)

      cache.setCacheEntry('key1', ['item1'])
      expect(cache.hasCacheEntry('key1')).toBe(true)
    })

    it('should update existing cache entry', () => {
      cache.setCacheEntry('key1', ['item1'])
      cache.setCacheEntry('key1', ['item1', 'item2'])

      const entry = cache.getCacheEntry('key1')
      expect(entry?.items).toEqual(['item1', 'item2'])
    })

    it('should mark cache entry as stale', () => {
      cache.setCacheEntry('key1', ['item1'])
      cache.makeStale('key1')

      const entry = cache.getCacheEntry('key1')
      expect(entry?.stale).toBe(true)
    })

    it('should clear all cache entries', () => {
      cache.setCacheEntry('key1', ['item1'])
      cache.setCacheEntry('key2', ['item2'])

      cache.clear()

      expect(cache.items).toEqual([])
      expect(cache.isReset).toBe(true)
    })

    it('should handle complex cache keys', () => {
      const complexKey = { userId: '123', filter: { status: 'active' } }
      const data = ['item1', 'item2']

      cache.setCacheEntry(complexKey as any, data)

      const entry = cache.getCacheEntry(complexKey as any)
      expect(entry?.items).toEqual(data)
    })
  })
})
