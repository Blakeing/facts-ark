/**
 * Toast component - type definitions
 */

import type { CreateToasterReturn, ToastDetails } from '@ark-ui/vue/toast'
import type { VariantProps } from 'tailwind-variants'
import type { toastVariants } from './toast.variants'

/**
 * Toast variant props extracted from toastVariants
 */
type ToastVariantProps = VariantProps<typeof toastVariants>

/**
 * Toast type (matches Ark UI toast types)
 */
export type ToastType = 'info' | 'success' | 'error' | 'warning' | 'default'

/**
 * Toast props for the Toaster component
 */
export interface ToasterProps {
  /**
   * The toaster instance created with createToaster
   */
  toaster: CreateToasterReturn

  /**
   * Visual variant based on toast type
   */
  variant?: ToastVariantProps['type']

  /**
   * Additional CSS classes
   */
  class?: string
}

/**
 * Options for creating a toast
 */
export interface ToastOptions {
  /**
   * Toast title
   */
  title: string

  /**
   * Toast description/message
   */
  description?: string

  /**
   * Toast type
   * @default 'info'
   */
  type?: ToastType

  /**
   * Duration in milliseconds
   * @default 5000
   */
  duration?: number

  /**
   * Action button configuration
   */
  action?: {
    /**
     * Action button label
     */
    label: string
    /**
     * Action button click handler
     */
    onClick?: () => void
  }
}

/**
 * Re-export Ark UI toast types for convenience
 */
export type { CreateToasterReturn, ToastDetails }
