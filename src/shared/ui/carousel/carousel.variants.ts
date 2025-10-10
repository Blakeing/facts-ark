/**
 * Carousel component - variant definitions
 *
 * Design inspired by Park UI's carousel component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Carousel variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Multiple display variants
 * - Smooth transitions
 * - Accessible navigation controls
 */
export const carouselVariants = tv({
  slots: {
    root: 'relative w-full',

    control: 'flex items-center justify-between gap-2 mb-4',

    prevTrigger: [
      'inline-flex items-center justify-center rounded-md px-4 py-2',
      'text-sm font-medium',
      'bg-background text-foreground',
      'shadow-sm ring-1 ring-inset ring-border',
      'hover:bg-accent hover:text-accent-foreground',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors',
    ],

    nextTrigger: [
      'inline-flex items-center justify-center rounded-md px-4 py-2',
      'text-sm font-medium',
      'bg-background text-foreground',
      'shadow-sm ring-1 ring-inset ring-border',
      'hover:bg-accent hover:text-accent-foreground',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'transition-colors',
    ],

    indicatorGroup: 'flex justify-center gap-2 mt-4',

    indicator: [
      'h-2 w-2 rounded-full',
      'bg-muted',
      'transition-all',
      'hover:bg-muted-foreground',
      'data-[current]:w-8 data-[current]:bg-primary',
    ],

    itemGroup: 'flex overflow-hidden',

    item: 'min-w-0 flex-shrink-0 flex-grow-0',

    itemContent: 'relative h-full w-full',

    image: 'h-full w-full object-cover',

    overlay: '',

    overlayContent: '',
  },
  variants: {
    variant: {
      default: {
        item: 'basis-full',
        itemContent: 'rounded-lg overflow-hidden bg-muted',
        image: 'rounded-lg',
      },
      overlay: {
        item: 'basis-full',
        itemContent: 'rounded-lg overflow-hidden',
        overlay:
          'absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6',
        overlayContent: 'text-white',
        image: 'rounded-lg',
      },
      thumbnails: {
        item: 'basis-1/3',
        itemContent: 'rounded-md overflow-hidden bg-muted mx-1',
        image: 'rounded-md hover:opacity-75 transition-opacity',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
