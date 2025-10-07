/**
 * Carousel component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

export const carouselVariants = tv({
  slots: {
    root: 'relative w-full',
    control: 'flex items-center justify-between gap-2 mb-4',
    prevTrigger:
      'inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50',
    nextTrigger:
      'inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50',
    indicatorGroup: 'flex justify-center gap-2 mt-4',
    indicator:
      'h-2 w-2 rounded-full bg-gray-300 transition-all hover:bg-gray-400 data-[current]:w-8 data-[current]:bg-indigo-600',
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
        itemContent: 'rounded-lg overflow-hidden bg-gray-100',
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
        itemContent: 'rounded-md overflow-hidden bg-gray-100 mx-1',
        image: 'rounded-md hover:opacity-75 transition-opacity',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
