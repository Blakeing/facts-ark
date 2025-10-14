/**
 * AuthInterceptor
 *
 * Adds authentication token to requests.
 */

import type { InternalAxiosRequestConfig } from 'axios'
import type { RequestInterceptor, InterceptorConfig } from './types'

export class AuthInterceptor implements RequestInterceptor {
  constructor(
    private readonly config: InterceptorConfig & {
      tokenKey?: string
      headerName?: string
    } = {},
  ) {
    this.config.tokenKey = config.tokenKey || 'auth_token'
    this.config.headerName = config.headerName || 'Authorization'
    this.config.enabled = config.enabled !== false
  }

  onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    if (!this.config.enabled) return config

    const token = localStorage.getItem(this.config.tokenKey!)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  }

  onRequestError(error: unknown): unknown {
    return Promise.reject(error)
  }
}
