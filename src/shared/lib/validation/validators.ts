/**
 * Validation Strategies
 *
 * Composable validation functions following the Strategy pattern.
 * Each validator is a pure function that can be composed.
 */

import { ApiException } from '@/shared/api/types'

/**
 * Validator function type
 */
export type Validator = (value: unknown, data: Record<string, unknown>) => void

/**
 * Required field validator
 */
export function required(field: string): Validator {
  return (value: unknown) => {
    if (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '')
    ) {
      throw new ApiException(`${field} is required`, 'VALIDATION_ERROR', 400, field)
    }
  }
}

/**
 * Optional field validator (always passes, used for documentation)
 */
export function optional(_field: string): Validator {
  return () => {
    // No-op: optional fields don't need validation
  }
}

/**
 * String length validator
 */
export function stringLength(field: string, min: number, max: number): Validator {
  return (value: unknown) => {
    // Skip if value is null/undefined (use required() separately if needed)
    if (value === null || value === undefined) return

    if (typeof value !== 'string') {
      throw new ApiException(`${field} must be a string`, 'VALIDATION_ERROR', 400, field)
    }

    if (value.length < min || value.length > max) {
      throw new ApiException(
        `${field} must be between ${min} and ${max} characters`,
        'VALIDATION_ERROR',
        400,
        field,
      )
    }
  }
}

/**
 * String pattern validator (regex)
 */
export function stringPattern(field: string, pattern: RegExp, message?: string): Validator {
  return (value: unknown) => {
    if (value === null || value === undefined) return

    if (typeof value !== 'string') {
      throw new ApiException(`${field} must be a string`, 'VALIDATION_ERROR', 400, field)
    }

    if (!pattern.test(value)) {
      const errorMessage = message || `${field} has invalid format`
      throw new ApiException(errorMessage, 'VALIDATION_ERROR', 400, field)
    }
  }
}

/**
 * Email validator
 */
export function email(field: string): Validator {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return stringPattern(field, emailPattern, `${field} must be a valid email address`)
}

/**
 * Number range validator
 */
export function numberRange(field: string, min: number, max: number): Validator {
  return (value: unknown) => {
    if (value === null || value === undefined) return

    if (typeof value !== 'number') {
      throw new ApiException(`${field} must be a number`, 'VALIDATION_ERROR', 400, field)
    }

    if (value < min || value > max) {
      throw new ApiException(
        `${field} must be between ${min} and ${max}`,
        'VALIDATION_ERROR',
        400,
        field,
      )
    }
  }
}

/**
 * Array length validator
 */
export function arrayLength(field: string, min: number, max: number): Validator {
  return (value: unknown) => {
    if (value === null || value === undefined) return

    if (!Array.isArray(value)) {
      throw new ApiException(`${field} must be an array`, 'VALIDATION_ERROR', 400, field)
    }

    if (value.length < min || value.length > max) {
      throw new ApiException(
        `${field} must contain between ${min} and ${max} items`,
        'VALIDATION_ERROR',
        400,
        field,
      )
    }
  }
}

/**
 * Custom validator
 */
export function custom(
  field: string,
  predicate: (value: unknown) => boolean,
  message: string,
): Validator {
  return (value: unknown) => {
    if (!predicate(value)) {
      throw new ApiException(message, 'VALIDATION_ERROR', 400, field)
    }
  }
}

/**
 * Enum validator
 */
export function enumValue<T extends string | number>(
  field: string,
  allowedValues: readonly T[],
): Validator {
  return (value: unknown) => {
    if (value === null || value === undefined) return

    if (!allowedValues.includes(value as T)) {
      throw new ApiException(
        `${field} must be one of: ${allowedValues.join(', ')}`,
        'VALIDATION_ERROR',
        400,
        field,
      )
    }
  }
}
