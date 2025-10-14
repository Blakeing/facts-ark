/**
 * Interceptor Types
 *
 * Type definitions for HTTP interceptors following Chain of Responsibility pattern.
 */

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

/**
 * Request interceptor interface
 */
export interface RequestInterceptor {
  /**
   * Handle request before it's sent
   */
  onRequest(
    config: InternalAxiosRequestConfig,
  ): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>

  /**
   * Handle request errors
   */
  onRequestError?(error: unknown): unknown
}

/**
 * Response interceptor interface
 */
export interface ResponseInterceptor {
  /**
   * Handle successful response
   */
  onResponse(response: AxiosResponse): AxiosResponse | Promise<AxiosResponse>

  /**
   * Handle response errors
   */
  onResponseError?(error: AxiosError): unknown
}

/**
 * Interceptor configuration
 */
export interface InterceptorConfig {
  /**
   * Enable/disable the interceptor
   */
  enabled?: boolean

  /**
   * Order/priority of the interceptor (lower runs first)
   */
  priority?: number
}
