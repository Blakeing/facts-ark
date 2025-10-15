/**
 * Editable component - type definitions
 */

import type { EditableRootProps, EditableRootEmits } from '@ark-ui/vue/editable'

/**
 * Editable props
 */
export interface EditableProps extends EditableRootProps {
  /**
   * Label text
   */
  label?: string

  /**
   * Placeholder text shown when empty
   */
  placeholder?: string

  /**
   * Show edit/save/cancel buttons
   * @default true
   */
  showControls?: boolean

  /**
   * Edit button text
   * @default 'Edit'
   */
  editText?: string

  /**
   * Save button text
   * @default 'Save'
   */
  saveText?: string

  /**
   * Cancel button text
   * @default 'Cancel'
   */
  cancelText?: string

  /**
   * Additional CSS classes
   */
  class?: string
}

export type { EditableRootEmits }
