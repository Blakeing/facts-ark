import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CachedApiCall } from '../CachedApiCall'

// Mock the apiClient
const mockGet = vi.fn()
vi.mock('@/shared/api/client', () => ({
  apiClient: {
    get: mockGet,
  },
}))

describe('CachedApiCall', () => {
  let cachedApiCall: CachedApiCall<string, string>

  beforeEach(() => {
    vi.clearAllMocks()

    cachedApiCall = new CachedApiCall<string, string>(
      'test-cache',
      (key) => `/api/test/${key}`,
      null,
      null,
    )
  })

  describe('constructor', () => {
    it('should initialize with correct properties', () => {
      expect(cachedApiCall.name).toBe('test-cache')
      expect(cachedApiCall.cache).toBeDefined()
    })
  })

  describe('getData', () => {
    it('should fetch data from API when cache is empty', async () => {
      const mockData = ['item1', 'item2']
      mockGet.mockResolvedValue({ data: mockData })

      const result = await cachedApiCall.getData('key1')

      expect(mockGet).toHaveBeenCalledExactlyOnceWith('/api/test/key1')
      expect(result).toEqual(mockData)
    })

    it('should return cached data when available and not stale', async () => {
      const mockData = ['item1', 'item2']
      mockGet.mockResolvedValue({ data: mockData })

      // First call - should fetch from API
      await cachedApiCall.getData('key1')

      // Second call - should return cached data
      const result = await cachedApiCall.getData('key1')

      expect(mockGet).toHaveBeenCalledTimes(1)
      expect(result).toEqual(mockData)
    })

    it('should fetch fresh data when cache is stale', async () => {
      const mockData1 = ['item1', 'item2']
      const mockData2 = ['item1', 'item2', 'item3']

      mockGet.mockResolvedValueOnce({ data: mockData1 }).mockResolvedValueOnce({ data: mockData2 })

      // First call
      await cachedApiCall.getData('key1')

      // Mark as stale
      cachedApiCall.cache.makeStale('key1')

      // Second call - should fetch fresh data
      const result = await cachedApiCall.getData('key1')

      expect(mockGet).toHaveBeenCalledTimes(2)
      expect(result).toEqual(mockData2)
    })
  })

  describe('refresh', () => {
    it('should always fetch fresh data', async () => {
      const mockData = ['item1', 'item2']
      mockGet.mockResolvedValue({ data: mockData })

      const result = await cachedApiCall.refresh('key1')

      expect(mockGet).toHaveBeenCalledExactlyOnceWith('/api/test/key1')
      expect(result).toEqual(mockData)
    })
  })

  describe('clearCache', () => {
    it('should clear the cache', async () => {
      const mockData = ['item1', 'item2']
      mockGet.mockResolvedValue({ data: mockData })

      // Add data to cache
      await cachedApiCall.getData('key1')

      // Clear cache
      cachedApiCall.clearCache()

      // Next call should fetch from API again
      await cachedApiCall.getData('key1')

      expect(mockGet).toHaveBeenCalledTimes(2)
    })
  })

  describe('dataFilter', () => {
    it('should apply data filter when provided', async () => {
      const mockData = ['item1', 'item2', 'item3']
      const filter = (data: string[], _key: string) => data.filter((item) => item.includes('item1'))

      const filteredApiCall = new CachedApiCall<string, string>(
        'filtered-cache',
        (key) => `/api/test/${key}`,
        filter,
        null,
      )

      mockGet.mockResolvedValue({ data: mockData })

      const result = await filteredApiCall.getData('key1')

      expect(result).toEqual(['item1'])
    })
  })

  describe('onDataLoaded', () => {
    it('should call onDataLoaded callback when provided', async () => {
      const mockData = ['item1', 'item2']
      const onDataLoaded = vi.fn()

      const callbackApiCall = new CachedApiCall<string, string>(
        'callback-cache',
        (key) => `/api/test/${key}`,
        null,
        onDataLoaded,
      )

      mockGet.mockResolvedValue({ data: mockData })

      await callbackApiCall.getData('key1')

      expect(onDataLoaded).toHaveBeenCalledExactlyOnceWith('key1')
    })
  })

  describe('error handling', () => {
    it('should throw error when URL is not provided', async () => {
      const invalidApiCall = new CachedApiCall<string, string>(
        'invalid-cache',
        () => '',
        null,
        null,
      )

      await expect(invalidApiCall.getData('key1')).rejects.toThrow('URL was not provided')
    })

    it('should propagate API errors', async () => {
      const error = new Error('API Error')
      mockGet.mockRejectedValue(error)

      await expect(cachedApiCall.getData('key1')).rejects.toThrow('API Error')
    })
  })
})
