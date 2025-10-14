/**
 * HTTP Client
 *
 * Axios instance wired through the interceptor chain to provide
 * authentication, logging, retry logic, and error translation.
 */

import axios from 'axios'
import type { AxiosInstance } from 'axios'
import {
  InterceptorChain,
  AuthInterceptor,
  LoggingInterceptor,
  RetryInterceptor,
  ErrorTransformInterceptor,
} from '@/shared/api/interceptors'

const baseURL = import.meta.env.VITE_API_BASE_URL || '/api'
const timeout = Number(import.meta.env.VITE_API_TIMEOUT) || 10000
const isDev = import.meta.env.DEV

export const httpClient: AxiosInstance = axios.create({
  baseURL,
  timeout,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Configure interceptor chain
const interceptorChain = new InterceptorChain(httpClient)
  .addRequest(new AuthInterceptor(), 0)
  .addRequest(new LoggingInterceptor({ isDev }), 10)
  .addResponse(new RetryInterceptor({ maxRetries: 3, retryDelay: 1000 }, httpClient), 0)
  .addResponse(new ErrorTransformInterceptor(), 10)

interceptorChain.install()

export default httpClient
