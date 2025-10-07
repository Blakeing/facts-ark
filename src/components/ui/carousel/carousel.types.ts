/**
 * Carousel component - type definitions
 */

import type { CarouselRootProps, CarouselRootEmits } from '@ark-ui/vue/carousel'
import type { VariantProps } from 'tailwind-variants'
import type { carouselVariants } from './carousel.variants'

/**
 * Carousel variant props extracted from carouselVariants
 */
type CarouselVariantProps = VariantProps<typeof carouselVariants>

/**
 * Individual carousel item definition
 */
export interface CarouselItem {
  /** Unique id for the item */
  id: string
  /** Image source URL */
  src?: string
  /** Alt text for the image */
  alt?: string
  /** Optional title overlay */
  title?: string
  /** Optional description overlay */
  description?: string
}

/**
 * Carousel props
 */
export interface CarouselProps extends CarouselRootProps {
  /** Array of carousel items to render */
  items: CarouselItem[]

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: CarouselVariantProps['variant']

  /** Show navigation arrows */
  showArrows?: boolean

  /** Show indicator dots */
  showIndicators?: boolean

  /** Additional CSS classes */
  class?: string
}

export type { CarouselRootEmits }
