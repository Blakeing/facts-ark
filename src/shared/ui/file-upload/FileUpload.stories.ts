import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FileUpload from './FileUpload.vue'

const meta: Meta<typeof FileUpload> = {
  title: 'UI/FileUpload',
  component: FileUpload,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
A File Upload component with drag & drop support.

## Features
- Drag and drop files
- Click to browse and select files
- Multiple file upload
- Image preview
- File size display
- File type restrictions
- Max file size limits
- Delete individual files
- Clear all files
- Fully accessible

## Usage

\`\`\`vue
<script setup>
import { FileUpload } from '@/shared/ui/file-upload'
</script>

<template>
  <FileUpload
    label="Upload images"
    accept="image/*"
    :max-files="5"
  />
</template>
\`\`\`

## Common Use Cases
- Profile picture upload
- Document submission
- Image galleries
- File attachments
- Bulk file uploads
        `,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Basic file upload
 */
export const Basic: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload files"
        :max-files="5"
      />
    `,
  }),
}

/**
 * Image upload only
 */
export const ImageUpload: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload images"
        accept="image/*"
        :max-files="5"
        helper-text="PNG, JPG, GIF up to 10MB"
      />
    `,
  }),
}

/**
 * Single file upload
 */
export const SingleFile: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload profile picture"
        accept="image/*"
        :max-files="1"
        helper-text="Upload a square image (recommended: 400x400px)"
      />
    `,
  }),
}

/**
 * Document upload
 */
export const DocumentUpload: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload documents"
        accept=".pdf,.doc,.docx,.txt"
        :max-files="3"
        helper-text="Accepted: PDF, DOC, DOCX, TXT (max 3 files)"
      />
    `,
  }),
}

/**
 * With file size limit
 */
export const WithSizeLimit: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload files"
        :max-file-size="5242880"
        :max-files="5"
        helper-text="Maximum file size: 5MB per file"
      />
    `,
  }),
}

/**
 * Without trigger button
 */
export const WithoutTrigger: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload files"
        dropzone-text="Drag and drop files here"
        :show-trigger="false"
        :max-files="5"
      />
    `,
  }),
}

/**
 * Without clear button
 */
export const WithoutClear: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload files"
        :show-clear-trigger="false"
        :max-files="5"
      />
    `,
  }),
}

/**
 * Custom button text
 */
export const CustomText: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload files"
        dropzone-text="📁 Drop your files here or click the button below"
        trigger-text="📂 Browse Files"
        clear-text="🗑️ Remove All"
        :max-files="5"
      />
    `,
  }),
}

/**
 * Profile picture upload example
 */
export const ProfilePicture: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <div class="max-w-md">
        <h3 class="text-lg font-semibold mb-4">Profile Settings</h3>
        <FileUpload
          label="Profile Picture"
          accept="image/jpeg,image/png,image/webp"
          :max-files="1"
          :max-file-size="2097152"
          helper-text="JPG, PNG, or WebP. Max size 2MB."
        />
      </div>
    `,
  }),
}

/**
 * Document submission form
 */
export const DocumentSubmission: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <div class="max-w-2xl space-y-6">
        <div>
          <h3 class="text-lg font-semibold mb-2">Application Documents</h3>
          <p class="text-sm text-muted-foreground mb-4">
            Please upload all required documents for your application.
          </p>
        </div>

        <FileUpload
          label="Resume / CV *"
          accept=".pdf,.doc,.docx"
          :max-files="1"
          helper-text="PDF or Word document (required)"
        />

        <FileUpload
          label="Cover Letter"
          accept=".pdf,.doc,.docx"
          :max-files="1"
          helper-text="PDF or Word document (optional)"
        />

        <FileUpload
          label="Supporting Documents"
          accept=".pdf,.doc,.docx,.jpg,.png"
          :max-files="5"
          helper-text="Additional documents (optional, max 5 files)"
        />
      </div>
    `,
  }),
}

/**
 * Photo gallery upload
 */
export const PhotoGallery: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <div class="max-w-2xl">
        <h3 class="text-lg font-semibold mb-4">Upload Photos</h3>
        <FileUpload
          label="Gallery Images"
          accept="image/*"
          :max-files="20"
          dropzone-text="Drag and drop your photos here (up to 20 images)"
          helper-text="Supported formats: JPG, PNG, GIF, WebP"
        />
      </div>
    `,
  }),
}

/**
 * With validation error
 */
export const WithError: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload files"
        :max-files="5"
        error="Please upload at least one file"
      />
    `,
  }),
}

/**
 * Disabled state
 */
export const Disabled: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload files"
        :max-files="5"
        disabled
        helper-text="File upload is currently disabled"
      />
    `,
  }),
}

/**
 * Multiple file types
 */
export const MultipleTypes: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload media files"
        accept="image/*,video/*,audio/*"
        :max-files="10"
        helper-text="Images, videos, and audio files accepted"
      />
    `,
  }),
}

/**
 * Compressed archives
 */
export const ArchiveUpload: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload archive"
        accept=".zip,.rar,.7z,.tar,.gz"
        :max-files="1"
        helper-text="Compressed archives only (ZIP, RAR, 7Z, TAR, GZ)"
      />
    `,
  }),
}

/**
 * Spreadsheet upload
 */
export const SpreadsheetUpload: Story = {
  render: () => ({
    components: { FileUpload },
    template: `
      <FileUpload
        label="Upload data file"
        accept=".csv,.xlsx,.xls"
        :max-files="1"
        helper-text="CSV or Excel file"
      />
    `,
  }),
}

/**
 * With event handling
 */
export const WithEvents: Story = {
  render: () => ({
    components: { FileUpload },
    setup() {
      const handleChange = (details: { acceptedFiles: File[] }) => {
        console.log('Files changed:', details.acceptedFiles)
      }

      const handleFileAccept = (details: { files: File[] }) => {
        console.log('Files accepted:', details.files)
      }

      const handleFileReject = (details: { files: File[] }) => {
        console.log('Files rejected:', details.files)
      }

      return { handleChange, handleFileAccept, handleFileReject }
    },
    template: `
      <div class="space-y-4">
        <FileUpload
          label="Upload files"
          :max-files="5"
          @file-change="handleChange"
          @file-accept="handleFileAccept"
          @file-reject="handleFileReject"
        />
        <p class="text-xs text-muted-foreground">
          Check the console for file events
        </p>
      </div>
    `,
  }),
}
