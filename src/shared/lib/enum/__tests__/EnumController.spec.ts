import { describe, it, expect, beforeEach } from 'vitest'
import { EnumController } from '../EnumController'

enum TestStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

describe('EnumController', () => {
  let controller: EnumController<TestStatus>

  beforeEach(() => {
    controller = new EnumController<TestStatus>()
    controller.choices = [
      { id: TestStatus.PENDING, name: 'Pending', description: 'Task not yet completed' },
      { id: TestStatus.COMPLETED, name: 'Completed', description: 'Task finished' },
      { id: TestStatus.CANCELLED, name: 'Cancelled', description: 'Task cancelled' },
    ]
  })

  describe('initialization', () => {
    it('should initialize with empty choices array', () => {
      const newController = new EnumController()
      expect(newController.choices).toEqual([])
    })
  })

  describe('sortedChoices', () => {
    it('should return choices sorted alphabetically by name', () => {
      const sorted = controller.sortedChoices

      expect(sorted[0].name).toBe('Cancelled')
      expect(sorted[1].name).toBe('Completed')
      expect(sorted[2].name).toBe('Pending')
    })

    it('should not modify original choices array', () => {
      const originalLength = controller.choices.length
      controller.sortedChoices // Call the getter

      expect(controller.choices).toHaveLength(originalLength)
      expect(controller.choices[0].name).toBe('Pending') // Original order preserved
    })
  })

  describe('getDescription', () => {
    it('should return correct description for valid id', () => {
      const description = controller.getDescription(TestStatus.PENDING)
      expect(description).toBe('Pending')
    })

    it('should return default value for invalid id', () => {
      const description = controller.getDescription('invalid' as TestStatus)
      expect(description).toBe('Unknown')
    })

    it('should return custom default value for invalid id', () => {
      const description = controller.getDescription('invalid' as TestStatus, 'Not Found')
      expect(description).toBe('Not Found')
    })
  })

  describe('descriptions', () => {
    it('should return all descriptions sorted alphabetically', () => {
      const descriptions = controller.descriptions()

      expect(descriptions).toEqual(['Cancelled', 'Completed', 'Pending'])
    })

    it('should return empty array when no choices', () => {
      const emptyController = new EnumController()
      const descriptions = emptyController.descriptions()

      expect(descriptions).toEqual([])
    })
  })

  describe('findById', () => {
    it('should find choice by id', () => {
      const choice = controller.findById(TestStatus.COMPLETED)

      expect(choice).toBeDefined()
      expect(choice?.id).toBe(TestStatus.COMPLETED)
      expect(choice?.name).toBe('Completed')
    })

    it('should return undefined for invalid id', () => {
      const choice = controller.findById('invalid' as TestStatus)

      expect(choice).toBeUndefined()
    })
  })

  describe('getChoices', () => {
    it('should return all choices', () => {
      const choices = controller.getChoices()

      expect(choices).toHaveLength(3)
      expect(choices).toEqual(controller.choices)
    })

    it('should return reference to original choices array', () => {
      const choices = controller.getChoices()

      expect(choices).toBe(controller.choices)
    })
  })

  describe('with numeric enum', () => {
    enum NumericStatus {
      ACTIVE = 1,
      INACTIVE = 2,
      SUSPENDED = 3,
    }

    let numericController: EnumController<number>

    beforeEach(() => {
      numericController = new EnumController<number>()
      numericController.choices = [
        { id: NumericStatus.ACTIVE, name: 'Active' },
        { id: NumericStatus.INACTIVE, name: 'Inactive' },
        { id: NumericStatus.SUSPENDED, name: 'Suspended' },
      ]
    })

    it('should work with numeric enum values', () => {
      const description = numericController.getDescription(NumericStatus.ACTIVE)
      expect(description).toBe('Active')

      const choice = numericController.findById(NumericStatus.SUSPENDED)
      expect(choice?.id).toBe(NumericStatus.SUSPENDED)
    })

    it('should sort numeric choices correctly', () => {
      const sorted = numericController.sortedChoices

      expect(sorted[0].name).toBe('Active')
      expect(sorted[1].name).toBe('Inactive')
      expect(sorted[2].name).toBe('Suspended')
    })
  })

  describe('with mixed types', () => {
    it('should handle mixed string and number ids', () => {
      const mixedController = new EnumController<string | number>()
      mixedController.choices = [
        { id: 'string-id', name: 'String Choice' },
        { id: 123, name: 'Numeric Choice' },
      ]

      expect(mixedController.getDescription('string-id')).toBe('String Choice')
      expect(mixedController.getDescription(123)).toBe('Numeric Choice')
    })
  })

  describe('edge cases', () => {
    it('should handle empty choices array', () => {
      const emptyController = new EnumController()

      expect(emptyController.sortedChoices).toEqual([])
      expect(emptyController.descriptions()).toEqual([])
      expect(emptyController.getDescription('any')).toBe('Unknown')
      expect(emptyController.findById('any')).toBeUndefined()
    })

    it('should handle choices with same names', () => {
      const duplicateController = new EnumController<string>()
      duplicateController.choices = [
        { id: 'a', name: 'Same Name' },
        { id: 'b', name: 'Same Name' },
      ]

      const sorted = duplicateController.sortedChoices
      expect(sorted).toHaveLength(2)
      expect(sorted[0].name).toBe('Same Name')
      expect(sorted[1].name).toBe('Same Name')
    })
  })
})
