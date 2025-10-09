/**
 * QR Code component - variant definitions
 *
 * Design inspired by Park UI's qr-code component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * QR Code variants matching Park UI's design system
 */
export const qrCodeVariants = tv({
  slots: {
    root: ['flex flex-col items-center gap-4'],

    frame: ['overflow-hidden', 'rounded-lg', 'border border-border', 'bg-background', 'p-4'],

    pattern: [
      // The QR code pattern itself
      'w-full h-full',
    ],

    downloadButton: [
      // Layout
      'inline-flex items-center justify-center',
      'rounded-md',
      'px-4 py-2',

      // Typography
      'text-sm font-medium',

      // Colors
      'bg-primary text-primary-foreground',

      // States
      'hover:bg-primary/90',
      'disabled:pointer-events-none disabled:opacity-50',

      // Focus
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',

      // Transitions
      'transition-colors',
    ],
  },
  variants: {
    size: {
      sm: {
        frame: 'p-2',
      },
      md: {
        frame: 'p-4',
      },
      lg: {
        frame: 'p-6',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
