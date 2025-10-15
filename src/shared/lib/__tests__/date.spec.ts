import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { formatRelativeTime, formatDate, toISOString, isToday } from '../date'

describe('date utilities', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('formatRelativeTime', () => {
    it('formats relative time correctly for minutes', () => {
      const now = new Date()
      const pastDate = new Date(now.getTime() - 1000 * 60 * 5) // 5 minutes ago
      expect(formatRelativeTime(pastDate)).toBe('5 minutes ago')
    })

    it('formats relative time correctly for hours', () => {
      const now = new Date()
      const pastDate = new Date(now.getTime() - 1000 * 60 * 60 * 2) // 2 hours ago
      expect(formatRelativeTime(pastDate)).toBe('about 2 hours ago')
    })

    it('formats relative time correctly for days', () => {
      const now = new Date()
      const pastDate = new Date(now.getTime() - 1000 * 60 * 60 * 24 * 3) // 3 days ago
      expect(formatRelativeTime(pastDate)).toBe('3 days ago')
    })

    it('accepts string dates', () => {
      const now = new Date()
      const pastDate = new Date(now.getTime() - 1000 * 60 * 10) // 10 minutes ago
      expect(formatRelativeTime(pastDate.toISOString())).toBe('10 minutes ago')
    })

    it('handles Date objects', () => {
      const now = new Date()
      const pastDate = new Date(now.getTime() - 1000 * 60 * 30) // 30 minutes ago
      expect(formatRelativeTime(pastDate)).toBe('30 minutes ago')
    })

    it('handles invalid dates with fallback', () => {
      expect(formatRelativeTime(null)).toBe('Unknown date')
      expect(formatRelativeTime(undefined)).toBe('Unknown date')
      expect(formatRelativeTime('')).toBe('Unknown date')
      expect(formatRelativeTime('invalid-date')).toBe('Unknown date')
    })

    it('accepts custom fallback text', () => {
      expect(formatRelativeTime(null, 'No date')).toBe('No date')
    })
  })

  describe('formatDate', () => {
    it('formats date with default pattern', () => {
      const date = new Date('2025-01-15T12:00:00Z')
      const result = formatDate(date)
      // PP format gives localized date like "Jan 15, 2025"
      expect(result).toMatch(/Jan/)
      expect(result).toMatch(/15/)
      expect(result).toMatch(/2025/)
    })

    it('handles invalid dates with fallback', () => {
      expect(formatDate(null)).toBe('Invalid date')
      expect(formatDate(undefined)).toBe('Invalid date')
      expect(formatDate('invalid')).toBe('Invalid date')
    })

    it('accepts custom fallback text', () => {
      expect(formatDate(null, 'PP', 'No date')).toBe('No date')
    })

    it('formats date with custom pattern', () => {
      // Use a date without timezone to avoid conversion issues
      const date = new Date(2025, 0, 15) // January 15, 2025 in local timezone
      expect(formatDate(date, 'yyyy-MM-dd')).toBe('2025-01-15')
    })

    it('formats date with time pattern', () => {
      // Use a date created with local timezone
      const date = new Date(2025, 0, 15, 14, 30) // January 15, 2025 14:30 local time
      expect(formatDate(date, 'yyyy-MM-dd HH:mm')).toBe('2025-01-15 14:30')
    })

    it('accepts string dates', () => {
      const date = new Date(2025, 0, 15)
      const dateStr = date.toISOString()
      const result = formatDate(dateStr, 'yyyy-MM-dd')
      expect(result).toBe('2025-01-15')
    })
  })

  describe('toISOString', () => {
    it('converts Date to ISO string', () => {
      const date = new Date(2025, 0, 15, 10, 30, 0) // Local time
      const result = toISOString(date)
      // Check the date portion is correct
      expect(result).toMatch(/2025-01-15/)
      // Check it's a valid ISO 8601 format
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })

    it('handles invalid dates by returning current date', () => {
      const now = new Date()
      vi.setSystemTime(now)
      const result = toISOString(null)
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
      // Should be close to current time
      const resultDate = new Date(result)
      expect(resultDate.getTime()).toBeCloseTo(now.getTime(), -2) // Within 100ms
    })

    it('handles string dates', () => {
      const date = new Date(2025, 0, 15, 10, 30, 0)
      const dateStr = date.toISOString()
      const result = toISOString(dateStr)
      // Should produce a valid ISO string
      expect(result).toMatch(/2025-01-15/)
      expect(result).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
    })

    it('includes timezone information', () => {
      const date = new Date(2025, 0, 15, 10, 30, 0)
      const result = toISOString(date)
      // Should include timezone offset (e.g., +00:00, -05:00) or Z
      expect(result).toMatch(/([+-]\d{2}:\d{2}|Z)$/)
    })
  })

  describe('isToday', () => {
    it('returns true for current date', () => {
      const today = new Date()
      expect(isToday(today)).toBe(true)
    })

    it('handles invalid dates by returning false', () => {
      expect(isToday(null)).toBe(false)
      expect(isToday(undefined)).toBe(false)
      expect(isToday('invalid')).toBe(false)
    })

    it('returns false for past dates', () => {
      const pastDate = new Date('2020-01-01')
      expect(isToday(pastDate)).toBe(false)
    })

    it('returns false for future dates', () => {
      const futureDate = new Date('2030-12-31')
      expect(isToday(futureDate)).toBe(false)
    })

    it('accepts string dates', () => {
      const today = new Date()
      expect(isToday(today.toISOString())).toBe(true)
    })

    it('handles dates at different times of the same day', () => {
      const morning = new Date()
      morning.setHours(0, 0, 0, 0)

      const evening = new Date()
      evening.setHours(23, 59, 59, 999)

      expect(isToday(morning)).toBe(true)
      expect(isToday(evening)).toBe(true)
    })
  })
})
