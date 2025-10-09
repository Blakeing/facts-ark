<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { FileUpload } from '@ark-ui/vue/file-upload'
import { Upload, X, FileIcon, ImageIcon } from 'lucide-vue-next'
import { computed } from 'vue'
import { useOmitProps } from '@/lib/useOmitProps'
import { fileUploadVariants } from './file-upload.variants'
import type { FileUploadProps, FileUploadRootEmits } from './file-upload.types'

/**
 * A File Upload component with drag & drop support.
 *
 * Features:
 * - Drag and drop files
 * - Click to browse files
 * - Multiple file upload
 * - File preview (images)
 * - File size display
 * - File type restrictions
 * - Max file size limits
 * - Delete individual files
 * - Fully accessible
 *
 * @example
 * <FileUpload
 *   label="Upload images"
 *   accept="image/*"
 *   :max-files="5"
 * />
 *
 * @example
 * // Single file upload
 * <FileUpload
 *   label="Upload document"
 *   accept=".pdf,.doc,.docx"
 *   :max-files="1"
 * />
 */

const props = withDefaults(defineProps<FileUploadProps>(), {
  dropzoneText: 'Drag and drop files here, or click to select',
  triggerText: 'Choose Files',
  clearText: 'Clear All',
  showTrigger: true,
  showClearTrigger: true,
})

const emits = defineEmits<FileUploadRootEmits>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  [
    'label',
    'dropzoneText',
    'triggerText',
    'clearText',
    'showTrigger',
    'showClearTrigger',
    'helperText',
    'error',
    'class',
  ] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() => fileUploadVariants())

// Helper to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
}
</script>

<template>
  <FileUpload.Root v-bind="forwarded" :class="[styles.root(), props.class]">
    <!-- Label -->
    <FileUpload.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </FileUpload.Label>

    <!-- Dropzone -->
    <FileUpload.Dropzone :class="styles.dropzone()">
      <Upload :class="styles.dropzoneIcon()" />
      <div :class="styles.dropzoneText()">
        <p class="font-medium">{{ props.dropzoneText }}</p>
        <p v-if="props.accept" class="text-xs mt-1">
          Accepted: {{ props.accept }}
        </p>
      </div>
      <FileUpload.Trigger v-if="props.showTrigger" :class="styles.trigger()">
        {{ props.triggerText }}
      </FileUpload.Trigger>
    </FileUpload.Dropzone>

    <!-- File list -->
    <FileUpload.ItemGroup :class="styles.itemGroup()">
      <FileUpload.Context v-slot="{ acceptedFiles }">
        <FileUpload.Item
          v-for="file in acceptedFiles"
          :key="file.name"
          :file="file"
          :class="styles.item()"
        >
          <!-- Preview -->
          <div :class="styles.itemPreview()">
            <FileUpload.ItemPreview type="image/*">
              <FileUpload.ItemPreviewImage :class="styles.itemPreviewImage()" />
            </FileUpload.ItemPreview>
            <FileUpload.ItemPreview type=".*">
              <FileIcon class="size-6 text-muted-foreground m-auto" />
            </FileUpload.ItemPreview>
          </div>

          <!-- File info -->
          <div :class="styles.itemContent()">
            <FileUpload.ItemName :class="styles.itemName()" />
            <FileUpload.ItemSizeText :class="styles.itemSizeText()" />
          </div>

          <!-- Delete button -->
          <FileUpload.ItemDeleteTrigger :class="styles.itemDeleteTrigger()">
            <X class="size-4" />
            <span class="sr-only">Delete file</span>
          </FileUpload.ItemDeleteTrigger>
        </FileUpload.Item>
      </FileUpload.Context>
    </FileUpload.ItemGroup>

    <!-- Clear all button -->
    <FileUpload.Context v-if="props.showClearTrigger" v-slot="{ acceptedFiles }">
      <FileUpload.ClearTrigger
        v-if="acceptedFiles.length > 0"
        :class="styles.clearTrigger()"
      >
        {{ props.clearText }}
      </FileUpload.ClearTrigger>
    </FileUpload.Context>

    <!-- Hidden input for form submission -->
    <FileUpload.HiddenInput />

    <!-- Helper text or error message -->
    <p
      v-if="props.helperText || props.error"
      :class="[
        'text-xs mt-2',
        props.error ? 'text-destructive' : 'text-muted-foreground',
      ]"
    >
      {{ props.error || props.helperText }}
    </p>
  </FileUpload.Root>
</template>

