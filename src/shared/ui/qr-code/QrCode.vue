<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { QrCode } from '@ark-ui/vue/qr-code'
import { Download } from 'lucide-vue-next'
import { computed } from 'vue'
import { useOmitProps } from '@/shared/lib/useOmitProps'
import { qrCodeVariants } from './qr-code.variants'
import type { QrCodeProps, QrCodeRootEmits } from './qr-code.types'

/**
 * A QR Code component for generating and downloading QR codes.
 *
 * Features:
 * - Generate QR codes from any string/URL
 * - Multiple error correction levels
 * - Download functionality
 * - Multiple sizes
 * - Customizable styling
 *
 * @example
 * <QrCode value="https://example.com" />
 *
 * @example
 * // Custom size with download
 * <QrCode
 *   value="https://example.com"
 *   size="lg"
 *   :show-download="true"
 *   file-name="my-qr-code.png"
 * />
 */

const props = withDefaults(defineProps<QrCodeProps>(), {
  size: 'md',
  showDownload: true,
  downloadText: 'Download',
  fileName: 'qr-code.png',
  mimeType: 'image/png',
})

const emits = defineEmits<QrCodeRootEmits>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  ['size', 'showDownload', 'downloadText', 'fileName', 'mimeType', 'class'] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() =>
  qrCodeVariants({
    size: props.size,
  })
)
</script>

<template>
  <QrCode.Root v-bind="forwarded" :class="[styles.root(), props.class]">
    <!-- QR Code frame -->
    <QrCode.Frame :class="styles.frame()">
      <QrCode.Pattern :class="styles.pattern()" />
    </QrCode.Frame>

    <!-- Download button -->
    <QrCode.DownloadTrigger
      v-if="props.showDownload"
      :file-name="props.fileName!"
      :mime-type="props.mimeType!"
      :class="styles.downloadButton()"
    >
      <Download class="size-4 mr-2" />
      {{ props.downloadText }}
    </QrCode.DownloadTrigger>

    <!-- Optional custom content slot -->
    <slot />
  </QrCode.Root>
</template>

