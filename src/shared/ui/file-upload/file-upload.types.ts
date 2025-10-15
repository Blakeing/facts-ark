/**
 * File Upload component - type definitions
 */

import type { FileUploadRootProps, FileUploadRootEmits } from '@ark-ui/vue/file-upload'

/**
 * File Upload props
 */
export interface FileUploadProps extends FileUploadRootProps {
  /**
   * Label text
   */
  label?: string

  /**
   * Dropzone text
   * @default 'Drag and drop files here, or click to select'
   */
  dropzoneText?: string

  /**
   * Trigger button text
   * @default 'Choose Files'
   */
  triggerText?: string

  /**
   * Clear all button text
   * @default 'Clear All'
   */
  clearText?: string

  /**
   * Show trigger button in dropzone
   * @default true
   */
  showTrigger?: boolean

  /**
   * Show clear all button
   * @default true
   */
  showClearTrigger?: boolean

  /**
   * Helper text displayed below the upload area
   */
  helperText?: string

  /**
   * Error message
   */
  error?: string

  /**
   * Additional CSS classes
   */
  class?: string
}

export type { FileUploadRootEmits }
