/**
 * Shared API Types
 *
 * Common types used across the application's API layer.
 * Follows a consistent pattern for API responses and errors.
 */

export interface ApiResponse<T> {
  data: T
  status: number
  message?: string
}

export interface ApiError {
  message: string
  code: string
  status: number
  field?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

export class ApiException extends Error {
  constructor(
    message: string,
    public code: string,
    public status: number,
    public field?: string,
  ) {
    super(message)
    this.name = 'ApiException'
  }
}
