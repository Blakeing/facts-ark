/**
 * ErrorTransformInterceptor
 *
 * Transforms Axios errors into ApiException format.
 */

import type { AxiosError, AxiosResponse } from 'axios'
import type { ResponseInterceptor, InterceptorConfig } from './types'
import { ApiException } from '../types'

export class ErrorTransformInterceptor implements ResponseInterceptor {
  constructor(private readonly config: InterceptorConfig = {}) {
    this.config.enabled = config.enabled !== false
  }

  onResponse(response: AxiosResponse): AxiosResponse {
    return response
  }

  onResponseError(error: AxiosError): unknown {
    if (!this.config.enabled) {
      return Promise.reject(error)
    }

    // Transform to ApiException
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      const errorData = data as { message?: string; code?: string }
      const message = errorData?.message || error.message || `HTTP ${status} Error`
      const code = errorData?.code || 'API_ERROR'
      throw new ApiException(message, code, status)
    } else if (error.request) {
      // Request made but no response
      throw new ApiException(
        'Network error: No response from server. Please check your connection.',
        'NETWORK_ERROR',
        0,
      )
    } else {
      // Something else happened
      throw new ApiException(error.message || 'An unexpected error occurred', 'UNKNOWN_ERROR', 0)
    }
  }
}
