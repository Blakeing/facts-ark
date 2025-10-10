/**
 * API Client
 *
 * Base API client with error handling and response formatting.
 * In a real application, this would handle fetch requests to a backend.
 * For this demo, it wraps the mock database.
 */

import { ApiException, type ApiResponse } from './types'

export class ApiClient {
  /**
   * Wraps an async operation with consistent error handling
   */
  async execute<T>(operation: () => Promise<T>): Promise<ApiResponse<T>> {
    try {
      const data = await operation()
      return {
        data,
        status: 200,
      }
    } catch (error) {
      if (error instanceof ApiException) {
        throw error
      }

      // Convert unknown errors to ApiException
      const message = error instanceof Error ? error.message : 'Unknown error occurred'
      throw new ApiException(message, 'UNKNOWN_ERROR', 500)
    }
  }

  /**
   * Validates required fields
   */
  validateRequired(value: unknown, field: string): void {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      throw new ApiException(`${field} is required`, 'VALIDATION_ERROR', 400, field)
    }
  }

  /**
   * Validates string length
   */
  validateLength(value: string, field: string, min: number, max: number): void {
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

export const apiClient = new ApiClient()
