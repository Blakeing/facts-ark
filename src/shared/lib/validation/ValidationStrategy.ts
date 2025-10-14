/**
 * ValidationStrategy
 *
 * Strategy pattern for composing and executing validation rules.
 * Provides a fluent API for building validation chains.
 *
 * @example
 * ```ts
 * const validator = new ValidationStrategy()
 *   .add('title', required('title'))
 *   .add('title', stringLength('title', 1, 200))
 *   .add('email', required('email'))
 *   .add('email', email('email'))
 *
 * // Validate an object
 * validator.validate({ title: 'Hello', email: 'test@example.com' })
 * ```
 */

import type { Validator } from './validators'

export class ValidationStrategy {
  private rules: Map<string, Validator[]> = new Map()

  /**
   * Add a validation rule for a field
   */
  add(field: string, validator: Validator): this {
    const fieldRules = this.rules.get(field) || []
    fieldRules.push(validator)
    this.rules.set(field, fieldRules)
    return this
  }

  /**
   * Validate an object against all rules
   * Throws ApiException on first validation failure
   */
  validate(data: Record<string, unknown>): void {
    for (const [field, validators] of this.rules.entries()) {
      const value = data[field]
      for (const validator of validators) {
        validator(value, data)
      }
    }
  }

  /**
   * Validate and return all errors (doesn't throw)
   * Useful for collecting multiple validation errors
   */
  validateAll(data: Record<string, unknown>): Array<{ field: string; message: string }> {
    const errors: Array<{ field: string; message: string }> = []

    for (const [field, validators] of this.rules.entries()) {
      const value = data[field]
      for (const validator of validators) {
        try {
          validator(value, data)
        } catch (error) {
          if (error instanceof Error) {
            errors.push({ field, message: error.message })
          }
        }
      }
    }

    return errors
  }

  /**
   * Check if data is valid (doesn't throw)
   */
  isValid(data: Record<string, unknown>): boolean {
    try {
      this.validate(data)
      return true
    } catch {
      return false
    }
  }

  /**
   * Clear all validation rules
   */
  clear(): void {
    this.rules.clear()
  }

  /**
   * Get all fields that have validation rules
   */
  getFields(): string[] {
    return Array.from(this.rules.keys())
  }
}
