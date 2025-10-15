/**
 * RetryInterceptor
 *
 * Automatically retries failed requests with exponential backoff.
 */

import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import type { ResponseInterceptor, InterceptorConfig } from './types'

interface RetryConfig extends InterceptorConfig {
  maxRetries?: number
  retryDelay?: number
  retryableStatuses?: number[]
}

export class RetryInterceptor implements ResponseInterceptor {
  private readonly maxRetries: number
  private readonly retryDelay: number
  private readonly retryableStatuses: number[]

  constructor(
    private readonly config: RetryConfig = {},
    private readonly axiosInstance?: any,
  ) {
    this.maxRetries = config.maxRetries ?? 3
    this.retryDelay = config.retryDelay ?? 1000
    this.retryableStatuses = config.retryableStatuses ?? [500, 502, 503, 504]
    this.config.enabled = config.enabled !== false
  }

  onResponse(response: AxiosResponse): AxiosResponse {
    return response
  }

  async onResponseError(error: AxiosError): Promise<unknown> {
    if (!this.config.enabled) {
      return Promise.reject(error)
    }

    const config = error.config as InternalAxiosRequestConfig & { _retryCount?: number }

    // Check if we should retry
    if (!config || !this.shouldRetry(error)) {
      return Promise.reject(error)
    }

    config._retryCount = config._retryCount || 0

    if (config._retryCount < this.maxRetries) {
      config._retryCount += 1
      const delayMs = this.retryDelay * config._retryCount

      if (import.meta.env.DEV) {
        console.log(
          `[API Retry] Attempt ${config._retryCount}/${this.maxRetries} after ${delayMs}ms`,
        )
      }

      await this.delay(delayMs)

      // Retry with axios instance if available
      if (this.axiosInstance) {
        return this.axiosInstance(config)
      }
    }

    return Promise.reject(error)
  }

  /**
   * Check if request should be retried
   */
  private shouldRetry(error: AxiosError): boolean {
    // Retry on network errors
    if (!error.response) return true

    // Retry on specific status codes
    return this.retryableStatuses.includes(error.response.status)
  }

  /**
   * Delay helper
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }
}
