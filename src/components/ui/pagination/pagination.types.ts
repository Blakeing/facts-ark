/**
 * Pagination component - type definitions
 */

import type { PaginationRootProps, PaginationRootEmits } from '@ark-ui/vue/pagination'
import type { VariantProps } from 'tailwind-variants'
import type { paginationVariants } from './pagination.variants'

/**
 * Pagination variant props extracted from paginationVariants
 */
type PaginationVariantProps = VariantProps<typeof paginationVariants>

/**
 * Pagination props
 */
export interface PaginationProps extends PaginationRootProps {
  /**
   * Visual variant
   * @default 'default'
   */
  variant?: PaginationVariantProps['variant']

  /**
   * Size variant
   * @default 'md'
   */
  size?: PaginationVariantProps['size']

  /** Show page size selector */
  showPageSize?: boolean

  /** Available page sizes */
  pageSizeOptions?: number[]

  /** Additional CSS classes */
  class?: string
}

export type { PaginationRootEmits }
