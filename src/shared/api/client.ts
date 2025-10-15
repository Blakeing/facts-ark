/**
 * API Client
 *
 * HTTP client wrapper using axios for API requests.
 * Provides consistent error handling and response formatting.
 */

import httpClient from './http'
import { ApiException, type ApiResponse } from './types'
import type { AxiosResponse } from 'axios'

export class ApiClient {
  /**
   * GET request
   */
  async get<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await httpClient.get(url)
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * POST request
   */
  async post<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await httpClient.post(url, data)
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * PUT request
   */
  async put<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await httpClient.put(url, data)
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * PATCH request
   */
  async patch<T>(url: string, data?: unknown): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await httpClient.patch(url, data)
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * DELETE request
   */
  async delete<T>(url: string): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse<T> = await httpClient.delete(url)
      return {
        data: response.data,
        status: response.status,
      }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  /**
   * Handle errors consistently
   */
  private handleError(error: unknown): ApiException {
    if (error instanceof ApiException) {
      return error
    }
    const message = error instanceof Error ? error.message : 'Unknown error occurred'
    return new ApiException(message, 'UNKNOWN_ERROR', 500)
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
