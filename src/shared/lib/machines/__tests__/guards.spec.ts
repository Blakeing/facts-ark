/**
 * Shared Guards Tests
 *
 * Unit tests for reusable guard functions.
 */

import { describe, it, expect } from 'vitest'
import { hasValue, isNotEmpty, isInRange, hasMinLength, and, or, not } from '../guards'

describe('Machine Guards', () => {
  describe('hasValue', () => {
    const guard = hasValue<{ name?: string }, any>(({ context }) => context.name)

    it('returns true when value exists', () => {
      expect(guard({ context: { name: 'John' }, event: {} as any })).toBe(true)
    })

    it('returns false when value is undefined', () => {
      expect(guard({ context: {}, event: {} as any })).toBe(false)
    })

    it('returns false when value is null', () => {
      expect(guard({ context: { name: null as any }, event: {} as any })).toBe(false)
    })

    it('returns false when value is empty string', () => {
      expect(guard({ context: { name: '' }, event: {} as any })).toBe(false)
    })
  })

  describe('isNotEmpty', () => {
    const guard = isNotEmpty<{ title?: string }, any>(({ context }) => context.title)

    it('returns true when string has content', () => {
      expect(guard({ context: { title: 'Hello' }, event: {} as any })).toBe(true)
    })

    it('returns false when string is empty', () => {
      expect(guard({ context: { title: '' }, event: {} as any })).toBe(false)
    })

    it('returns false when string is only whitespace', () => {
      expect(guard({ context: { title: '   ' }, event: {} as any })).toBe(false)
    })

    it('returns false when value is undefined', () => {
      expect(guard({ context: {}, event: {} as any })).toBe(false)
    })

    it('returns false when value is null', () => {
      expect(guard({ context: { title: null }, event: {} as any })).toBe(false)
    })
  })

  describe('isInRange', () => {
    const guard = isInRange<{ progress: number }, any>(({ context }) => context.progress, 0, 100)

    it('returns true when value is within range', () => {
      expect(guard({ context: { progress: 50 }, event: {} as any })).toBe(true)
    })

    it('returns true when value equals min', () => {
      expect(guard({ context: { progress: 0 }, event: {} as any })).toBe(true)
    })

    it('returns true when value equals max', () => {
      expect(guard({ context: { progress: 100 }, event: {} as any })).toBe(true)
    })

    it('returns false when value is below range', () => {
      expect(guard({ context: { progress: -1 }, event: {} as any })).toBe(false)
    })

    it('returns false when value is above range', () => {
      expect(guard({ context: { progress: 101 }, event: {} as any })).toBe(false)
    })
  })

  describe('hasMinLength', () => {
    const guard = hasMinLength<{ items: string[] }, any>(({ context }) => context.items, 2)

    it('returns true when array has minimum length', () => {
      expect(guard({ context: { items: ['a', 'b'] }, event: {} as any })).toBe(true)
    })

    it('returns true when array exceeds minimum length', () => {
      expect(guard({ context: { items: ['a', 'b', 'c'] }, event: {} as any })).toBe(true)
    })

    it('returns false when array is below minimum length', () => {
      expect(guard({ context: { items: ['a'] }, event: {} as any })).toBe(false)
    })

    it('returns false when array is empty', () => {
      expect(guard({ context: { items: [] }, event: {} as any })).toBe(false)
    })
  })

  describe('and', () => {
    const guard1 = ({ context }: { context: { a: boolean } }) => context.a
    const guard2 = ({ context }: { context: { b: boolean } }) => context.b

    const combined = and<{ a: boolean; b: boolean }, any>([guard1, guard2])

    it('returns true when all guards pass', () => {
      expect(combined({ context: { a: true, b: true }, event: {} as any })).toBe(true)
    })

    it('returns false when first guard fails', () => {
      expect(combined({ context: { a: false, b: true }, event: {} as any })).toBe(false)
    })

    it('returns false when second guard fails', () => {
      expect(combined({ context: { a: true, b: false }, event: {} as any })).toBe(false)
    })

    it('returns false when all guards fail', () => {
      expect(combined({ context: { a: false, b: false }, event: {} as any })).toBe(false)
    })
  })

  describe('or', () => {
    const guard1 = ({ context }: { context: { a: boolean } }) => context.a
    const guard2 = ({ context }: { context: { b: boolean } }) => context.b

    const combined = or<{ a: boolean; b: boolean }, any>([guard1, guard2])

    it('returns true when all guards pass', () => {
      expect(combined({ context: { a: true, b: true }, event: {} as any })).toBe(true)
    })

    it('returns true when first guard passes', () => {
      expect(combined({ context: { a: true, b: false }, event: {} as any })).toBe(true)
    })

    it('returns true when second guard passes', () => {
      expect(combined({ context: { a: false, b: true }, event: {} as any })).toBe(true)
    })

    it('returns false when all guards fail', () => {
      expect(combined({ context: { a: false, b: false }, event: {} as any })).toBe(false)
    })
  })

  describe('not', () => {
    const baseGuard = ({ context }: { context: { value: boolean } }) => context.value
    const negated = not(baseGuard)

    it('returns true when base guard returns false', () => {
      expect(negated({ context: { value: false }, event: {} as any })).toBe(true)
    })

    it('returns false when base guard returns true', () => {
      expect(negated({ context: { value: true }, event: {} as any })).toBe(false)
    })
  })
})
