/**
 * RequestBuilder
 *
 * Builder pattern for constructing HTTP requests with validation.
 * Provides a fluent API for building API requests.
 *
 * @example
 * ```ts
 * const response = await new RequestBuilder(apiClient)
 *   .post('/todos')
 *   .withBody({ title: 'Buy milk', description: 'At the store' })
 *   .validate('title', required('title'), stringLength('title', 1, 200))
 *   .validate('description', optional('description'), stringLength('description', 0, 1000))
 *   .execute<Todo>()
 * ```
 */

import type { ApiClient } from '../client'
import type { ApiResponse } from '../types'
import type { Validator } from '@/shared/lib/validation'
import { ValidationStrategy } from '@/shared/lib/validation'

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export class RequestBuilder<TResponse = unknown> {
  private method: HttpMethod = 'GET'
  private url = ''
  private body?: unknown
  private params?: Record<string, unknown>
  private validationStrategy = new ValidationStrategy()

  constructor(private readonly client: ApiClient) {}

  /**
   * Set GET method
   */
  get(url: string): this {
    this.method = 'GET'
    this.url = url
    return this
  }

  /**
   * Set POST method
   */
  post(url: string): this {
    this.method = 'POST'
    this.url = url
    return this
  }

  /**
   * Set PUT method
   */
  put(url: string): this {
    this.method = 'PUT'
    this.url = url
    return this
  }

  /**
   * Set PATCH method
   */
  patch(url: string): this {
    this.method = 'PATCH'
    this.url = url
    return this
  }

  /**
   * Set DELETE method
   */
  delete(url: string): this {
    this.method = 'DELETE'
    this.url = url
    return this
  }

  /**
   * Set request body
   */
  withBody(body: unknown): this {
    this.body = body
    return this
  }

  /**
   * Set query parameters
   */
  withParams(params: Record<string, unknown>): this {
    this.params = params
    return this
  }

  /**
   * Add validation rules for a field
   */
  validate(field: string, ...validators: Validator[]): this {
    for (const validator of validators) {
      this.validationStrategy.add(field, validator)
    }
    return this
  }

  /**
   * Execute the request
   */
  async execute<T = TResponse>(): Promise<ApiResponse<T>> {
    // Validate request body if validators are defined
    if (this.body && this.validationStrategy.getFields().length > 0) {
      this.validationStrategy.validate(this.body as Record<string, unknown>)
    }

    // Build URL with query params if provided
    let finalUrl = this.url
    if (this.params) {
      const searchParams = new URLSearchParams()
      Object.entries(this.params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        finalUrl = `${finalUrl}?${queryString}`
      }
    }

    // Execute request based on method
    switch (this.method) {
      case 'GET':
        return this.client.get<T>(finalUrl)
      case 'POST':
        return this.client.post<T>(finalUrl, this.body)
      case 'PUT':
        return this.client.put<T>(finalUrl, this.body)
      case 'PATCH':
        return this.client.patch<T>(finalUrl, this.body)
      case 'DELETE':
        return this.client.delete<T>(finalUrl)
      default:
        throw new Error(`Unsupported HTTP method: ${this.method}`)
    }
  }

  /**
   * Execute and return only the data (shorthand)
   */
  async executeData<T = TResponse>(): Promise<T> {
    const response = await this.execute<T>()
    return response.data
  }
}

/**
 * Create a new RequestBuilder instance
 */
export function createRequestBuilder(client: ApiClient): RequestBuilder {
  return new RequestBuilder(client)
}
