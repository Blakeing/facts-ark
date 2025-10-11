/**
 * HTTP Client
 *
 * Axios instance with interceptors for request/response handling.
 * Provides centralized error handling and authentication.
 */

import axios from 'axios'
import type { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { ApiException } from './types'

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api'
const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 10000

export const httpClient: AxiosInstance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
httpClient.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Response interceptor
httpClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    // Convert axios errors to ApiException
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response
      const errorData = data as { message?: string; code?: string }
      const message = errorData?.message || error.message
      const code = errorData?.code || 'API_ERROR'
      throw new ApiException(message, code, status)
    } else if (error.request) {
      // Request made but no response
      throw new ApiException('Network error: No response from server', 'NETWORK_ERROR', 0)
    } else {
      // Something else happened
      throw new ApiException(error.message, 'UNKNOWN_ERROR', 0)
    }
  },
)

export default httpClient
