import type { Meta, StoryObj } from '@storybook/vue3-vite'
import QrCode from './QrCode.vue'

const meta = {
  title: 'UI/QrCode',
  component: QrCode,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the QR code',
    },
    value: {
      control: 'text',
      description: 'The value to encode (URL, text, etc.)',
    },
    showDownload: {
      control: 'boolean',
      description: 'Show download button',
    },
  },
  args: {
    size: 'md',
    value: 'https://ark-ui.com',
    showDownload: true,
    downloadText: 'Download',
  },
  parameters: {
    docs: {
      description: {
        component: `
A QR Code component for generating and downloading QR codes.

## Features
- Generate QR codes from any string or URL
- Multiple error correction levels (L, M, Q, H)
- Download as PNG
- Multiple sizes
- Customizable appearance

## Usage

\`\`\`vue
<script setup>
import { QrCode } from '@/components/ui/qr-code'
</script>

<template>
  <QrCode value="https://example.com" />
</template>
\`\`\`

## Error Correction Levels
- **L**: ~7% correction
- **M**: ~15% correction (default)
- **Q**: ~25% correction
- **H**: ~30% correction
        `,
      },
    },
  },
} satisfies Meta<typeof QrCode>

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic QR code
 */
export const Basic: Story = {
  render: () => ({
    components: { QrCode },
    template: `
      <QrCode value="https://ark-ui.com" />
    `,
  }),
}

/**
 * Different sizes
 */
export const Sizes: Story = {
  render: () => ({
    components: { QrCode },
    template: `
      <div class="flex flex-wrap items-end gap-8">
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm text-muted-foreground">Small</span>
          <QrCode size="sm" value="https://ark-ui.com" :show-download="false" />
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm text-muted-foreground">Medium</span>
          <QrCode size="md" value="https://ark-ui.com" :show-download="false" />
        </div>
        <div class="flex flex-col items-center gap-2">
          <span class="text-sm text-muted-foreground">Large</span>
          <QrCode size="lg" value="https://ark-ui.com" :show-download="false" />
        </div>
      </div>
    `,
  }),
}

/**
 * URL QR code
 */
export const URL: Story = {
  render: () => ({
    components: { QrCode },
    template: `
      <QrCode
        value="https://github.com"
        download-text="Download QR Code"
        file-name="github-qr.png"
      />
    `,
  }),
}

/**
 * Text QR code
 */
export const Text: Story = {
  render: () => ({
    components: { QrCode },
    template: `
      <QrCode
        value="Hello, World! This is a QR code with text."
        download-text="Download"
      />
    `,
  }),
}

/**
 * WiFi credentials QR code
 */
export const WiFi: Story = {
  render: () => ({
    components: { QrCode },
    setup() {
      // WiFi QR code format: WIFI:T:WPA;S:MyNetwork;P:MyPassword;;
      const wifiConfig = 'WIFI:T:WPA;S:MyNetwork;P:MyPassword123;;'
      return { wifiConfig }
    },
    template: `
      <div class="space-y-4">
        <div class="text-sm text-muted-foreground max-w-sm">
          Scan this QR code to connect to WiFi network "MyNetwork"
        </div>
        <QrCode
          :value="wifiConfig"
          download-text="Download WiFi QR"
          file-name="wifi-qr.png"
        />
      </div>
    `,
  }),
}

/**
 * Contact card (vCard)
 */
export const Contact: Story = {
  render: () => ({
    components: { QrCode },
    setup() {
      const vCard = `BEGIN:VCARD
VERSION:3.0
FN:John Doe
TEL:+1-555-123-4567
EMAIL:john.doe@example.com
END:VCARD`
      return { vCard }
    },
    template: `
      <div class="space-y-4">
        <div class="text-sm text-muted-foreground max-w-sm">
          Scan to save contact information
        </div>
        <QrCode
          :value="vCard"
          download-text="Download Contact QR"
          file-name="contact-qr.png"
        />
      </div>
    `,
  }),
}

/**
 * Payment QR code
 */
export const Payment: Story = {
  render: () => ({
    components: { QrCode },
    template: `
      <div class="space-y-4">
        <div class="text-sm text-muted-foreground max-w-sm">
          Scan to make a payment
        </div>
        <QrCode
          value="bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa?amount=0.01"
          download-text="Download Payment QR"
          file-name="payment-qr.png"
        />
      </div>
    `,
  }),
}

/**
 * Event ticket
 */
export const EventTicket: Story = {
  render: () => ({
    components: { QrCode },
    template: `
      <div class="max-w-sm border border-border rounded-lg p-6 space-y-4">
        <div>
          <h3 class="text-lg font-semibold">Concert Ticket</h3>
          <p class="text-sm text-muted-foreground">The Amazing Band Live</p>
          <p class="text-xs text-muted-foreground mt-1">March 15, 2025 • 8:00 PM</p>
        </div>
        <QrCode
          value="TICKET:ABC123XYZ789"
          :show-download="false"
          size="sm"
        />
        <p class="text-xs text-muted-foreground text-center">
          Scan at entrance
        </p>
      </div>
    `,
  }),
}

/**
 * App download
 */
export const AppDownload: Story = {
  render: () => ({
    components: { QrCode },
    template: `
      <div class="max-w-md border border-border rounded-lg p-8 space-y-4 text-center">
        <div>
          <h3 class="text-xl font-bold">Download Our App</h3>
          <p class="text-sm text-muted-foreground mt-2">
            Scan the QR code to download from your device's app store
          </p>
        </div>
        <QrCode
          value="https://apps.apple.com/app/your-app"
          download-text="Save QR Code"
          file-name="app-download-qr.png"
        />
      </div>
    `,
  }),
}

/**
 * Without download button
 */
export const NoDownload: Story = {
  render: () => ({
    components: { QrCode },
    template: `
      <QrCode
        value="https://ark-ui.com"
        :show-download="false"
      />
    `,
  }),
}

/**
 * Custom error correction level
 */
export const ErrorCorrection: Story = {
  render: () => ({
    components: { QrCode },
    template: `
      <div class="space-y-4">
        <div class="text-sm text-muted-foreground max-w-sm">
          High error correction (H) - better for damaged/obscured codes
        </div>
        <QrCode
          value="https://ark-ui.com"
          :encoding="{ ecc: 'H' }"
          download-text="Download"
        />
      </div>
    `,
  }),
}
