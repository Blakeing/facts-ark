/**
 * LoggingInterceptor
 *
 * Logs HTTP requests and responses in development mode.
 */

import type { InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import type { RequestInterceptor, ResponseInterceptor, InterceptorConfig } from './types'

export class LoggingInterceptor implements RequestInterceptor, ResponseInterceptor {
  private readonly isDev: boolean

  constructor(
    private readonly config: InterceptorConfig & {
      isDev?: boolean
    } = {},
  ) {
    this.isDev = config.isDev ?? import.meta.env.DEV
    this.config.enabled = config.enabled !== false
  }

  onRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    if (!this.config.enabled || !this.isDev) return config

    console.log('[API Request]', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
      params: config.params,
    })

    return config
  }

  onRequestError(error: unknown): unknown {
    if (this.config.enabled && this.isDev) {
      console.error('[API Request Error]', error)
    }
    return Promise.reject(error)
  }

  onResponse(response: AxiosResponse): AxiosResponse {
    if (!this.config.enabled || !this.isDev) return response

    console.log('[API Response]', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    })

    return response
  }

  onResponseError(error: AxiosError): unknown {
    if (this.config.enabled && this.isDev) {
      console.error('[API Error]', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        url: error.config?.url,
      })
    }
    return Promise.reject(error)
  }
}
