/**
 * Pagination component - type definitions
 */

import type { PaginationRootProps, PaginationRootEmits } from '@ark-ui/vue/pagination'

/**
 * Pagination props
 */
export interface PaginationProps extends PaginationRootProps {
  /** Visual variant */
  variant?: 'default' | 'simple'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Show page size selector */
  showPageSize?: boolean
  /** Available page sizes */
  pageSizeOptions?: number[]
  /** Additional CSS classes */
  class?: string
}

export type { PaginationRootEmits }
