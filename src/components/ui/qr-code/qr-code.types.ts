/**
 * QR Code component - type definitions
 */

import type { QrCodeRootProps, QrCodeRootEmits } from '@ark-ui/vue/qr-code'
import type { VariantProps } from 'tailwind-variants'
import type { qrCodeVariants } from './qr-code.variants'

/**
 * QR Code variant props
 */
type QrCodeVariantProps = VariantProps<typeof qrCodeVariants>

/**
 * QR Code props
 */
export interface QrCodeProps extends QrCodeRootProps {
  /**
   * Size variant
   * @default 'md'
   */
  size?: QrCodeVariantProps['size']

  /**
   * The value to encode in the QR code (URL, text, etc.)
   */
  value: string

  /**
   * Error correction level
   * @default 'M'
   */
  encoding?: {
    ecc?: 'L' | 'M' | 'Q' | 'H'
  }

  /**
   * Show download button
   * @default true
   */
  showDownload?: boolean

  /**
   * Download button text
   * @default 'Download'
   */
  downloadText?: string

  /**
   * File name for download
   * @default 'qr-code.png'
   */
  fileName?: string

  /**
   * MIME type for download
   * @default 'image/png'
   */
  mimeType?: 'image/png' | 'image/jpeg'

  /**
   * Additional CSS classes
   */
  class?: string
}

export type { QrCodeRootEmits }
