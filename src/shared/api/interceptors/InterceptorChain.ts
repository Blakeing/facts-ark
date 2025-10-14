/**
 * InterceptorChain
 *
 * Chain of Responsibility pattern for managing HTTP interceptors.
 * Provides a fluent API for adding/removing interceptors.
 *
 * @example
 * ```ts
 * const chain = new InterceptorChain(httpClient)
 *   .addRequest(new AuthInterceptor())
 *   .addRequest(new LoggingInterceptor())
 *   .addResponse(new RetryInterceptor({ maxRetries: 3 }))
 *   .addResponse(new ErrorTransformInterceptor())
 *   .install()
 * ```
 */

import type { AxiosInstance } from 'axios'
import type { RequestInterceptor, ResponseInterceptor } from './types'

interface InterceptorEntry {
  priority: number
  eject?: () => void
}

export class InterceptorChain {
  private requestInterceptors: Map<RequestInterceptor, InterceptorEntry> = new Map()
  private responseInterceptors: Map<ResponseInterceptor, InterceptorEntry> = new Map()
  private installed = false

  constructor(private readonly axiosInstance: AxiosInstance) {}

  /**
   * Add a request interceptor
   */
  addRequest(interceptor: RequestInterceptor, priority = 0): this {
    this.requestInterceptors.set(interceptor, { priority })
    return this
  }

  /**
   * Add a response interceptor
   */
  addResponse(interceptor: ResponseInterceptor, priority = 0): this {
    this.responseInterceptors.set(interceptor, { priority })
    return this
  }

  /**
   * Remove a request interceptor
   */
  removeRequest(interceptor: RequestInterceptor): this {
    const entry = this.requestInterceptors.get(interceptor)
    if (entry?.eject) {
      entry.eject()
    }
    this.requestInterceptors.delete(interceptor)
    return this
  }

  /**
   * Remove a response interceptor
   */
  removeResponse(interceptor: ResponseInterceptor): this {
    const entry = this.responseInterceptors.get(interceptor)
    if (entry?.eject) {
      entry.eject()
    }
    this.responseInterceptors.delete(interceptor)
    return this
  }

  /**
   * Install all interceptors on the axios instance
   */
  install(): this {
    if (this.installed) {
      throw new Error('InterceptorChain already installed')
    }

    // Sort interceptors by priority
    const sortedRequestInterceptors = this.getSortedRequestInterceptors()
    const sortedResponseInterceptors = this.getSortedResponseInterceptors()

    // Install request interceptors
    for (const [interceptor, entry] of sortedRequestInterceptors) {
      const id = this.axiosInstance.interceptors.request.use(
        (config) => interceptor.onRequest(config),
        interceptor.onRequestError ? (error) => interceptor.onRequestError!(error) : undefined,
      )
      entry.eject = () => this.axiosInstance.interceptors.request.eject(id)
    }

    // Install response interceptors
    for (const [interceptor, entry] of sortedResponseInterceptors) {
      const id = this.axiosInstance.interceptors.response.use(
        (response) => interceptor.onResponse(response),
        interceptor.onResponseError ? (error) => interceptor.onResponseError!(error) : undefined,
      )
      entry.eject = () => this.axiosInstance.interceptors.response.eject(id)
    }

    this.installed = true
    return this
  }

  /**
   * Uninstall all interceptors
   */
  uninstall(): this {
    // Eject all request interceptors
    for (const entry of this.requestInterceptors.values()) {
      if (entry.eject) {
        entry.eject()
      }
    }

    // Eject all response interceptors
    for (const entry of this.responseInterceptors.values()) {
      if (entry.eject) {
        entry.eject()
      }
    }

    this.installed = false
    return this
  }

  /**
   * Check if chain is installed
   */
  isInstalled(): boolean {
    return this.installed
  }

  /**
   * Get sorted request interceptors by priority
   */
  private getSortedRequestInterceptors(): Array<[RequestInterceptor, InterceptorEntry]> {
    return Array.from(this.requestInterceptors.entries()).sort(
      (a, b) => a[1].priority - b[1].priority,
    )
  }

  /**
   * Get sorted response interceptors by priority
   */
  private getSortedResponseInterceptors(): Array<[ResponseInterceptor, InterceptorEntry]> {
    return Array.from(this.responseInterceptors.entries()).sort(
      (a, b) => a[1].priority - b[1].priority,
    )
  }
}
