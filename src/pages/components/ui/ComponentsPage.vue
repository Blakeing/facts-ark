<script setup lang="ts">
import { Card, Badge, Button } from '@/shared/ui'
import { ExternalLink, Package } from 'lucide-vue-next'

interface ComponentItem {
  name: string
  description: string
  category: string
  storybookPath: string
  status: 'stable' | 'new'
}

const components: ComponentItem[] = [
  // Form Inputs
  { name: 'Button', description: 'Versatile action triggers with multiple variants', category: 'Form Inputs', storybookPath: '?path=/story/components-button--default', status: 'stable' },
  { name: 'Input', description: 'Text input fields with label and validation', category: 'Form Inputs', storybookPath: '?path=/story/components-input--default', status: 'stable' },
  { name: 'Textarea', description: 'Multi-line text input areas', category: 'Form Inputs', storybookPath: '?path=/story/components-textarea--default', status: 'stable' },
  { name: 'Checkbox', description: 'Binary selection control with custom styling', category: 'Form Inputs', storybookPath: '?path=/story/components-checkbox--default', status: 'stable' },
  { name: 'Switch', description: 'Toggle switch for on/off states', category: 'Form Inputs', storybookPath: '?path=/story/components-switch--default', status: 'stable' },
  { name: 'Select', description: 'Dropdown selection with search', category: 'Form Inputs', storybookPath: '?path=/story/components-select--default', status: 'stable' },
  { name: 'Radio Group', description: 'Single selection from multiple options', category: 'Form Inputs', storybookPath: '?path=/story/components-radiogroup--default', status: 'stable' },
  { name: 'Slider', description: 'Range value selection with custom marks', category: 'Form Inputs', storybookPath: '?path=/story/components-slider--default', status: 'stable' },
  { name: 'Password Input', description: 'Secure password field with show/hide toggle', category: 'Form Inputs', storybookPath: '?path=/story/components-passwordinput--default', status: 'new' },
  { name: 'Pin Input', description: 'Multi-digit PIN or verification code entry', category: 'Form Inputs', storybookPath: '?path=/story/components-pininput--default', status: 'new' },
  { name: 'Number Input', description: 'Numeric input with increment/decrement controls', category: 'Form Inputs', storybookPath: '?path=/story/components-numberinput--default', status: 'stable' },
  { name: 'Date Picker', description: 'Calendar-based date selection', category: 'Form Inputs', storybookPath: '?path=/story/components-datepicker--default', status: 'new' },
  { name: 'Color Picker', description: 'Visual color selection with swatches', category: 'Form Inputs', storybookPath: '?path=/story/components-colorpicker--default', status: 'new' },
  { name: 'File Upload', description: 'Drag & drop file upload with preview', category: 'Form Inputs', storybookPath: '?path=/story/components-fileupload--default', status: 'new' },
  { name: 'Tags Input', description: 'Tag collection input with autocomplete', category: 'Form Inputs', storybookPath: '?path=/story/components-tagsinput--default', status: 'stable' },
  { name: 'Rating Group', description: 'Star rating input and display', category: 'Form Inputs', storybookPath: '?path=/story/components-ratinggroup--default', status: 'stable' },
  { name: 'Combobox', description: 'Searchable select with autocomplete', category: 'Form Inputs', storybookPath: '?path=/story/components-combobox--default', status: 'new' },
  { name: 'Editable', description: 'Inline text editing with save/cancel', category: 'Form Inputs', storybookPath: '?path=/story/components-editable--default', status: 'new' },

  // Layout & Navigation
  { name: 'Tabs', description: 'Tabbed content panels with keyboard navigation', category: 'Layout & Navigation', storybookPath: '?path=/story/components-tabs--default', status: 'stable' },
  { name: 'Accordion', description: 'Collapsible content sections', category: 'Layout & Navigation', storybookPath: '?path=/story/components-accordion--default', status: 'stable' },
  { name: 'Collapsible', description: 'Simple show/hide content toggle', category: 'Layout & Navigation', storybookPath: '?path=/story/components-collapsible--default', status: 'stable' },
  { name: 'Menu', description: 'Dropdown action menus with submenus', category: 'Layout & Navigation', storybookPath: '?path=/story/components-menu--default', status: 'stable' },
  { name: 'Pagination', description: 'Page navigation with ellipsis', category: 'Layout & Navigation', storybookPath: '?path=/story/components-pagination--default', status: 'stable' },
  { name: 'Steps', description: 'Multi-step process indicator', category: 'Layout & Navigation', storybookPath: '?path=/story/components-steps--default', status: 'stable' },
  { name: 'Segment Group', description: 'Segmented control button group', category: 'Layout & Navigation', storybookPath: '?path=/story/components-segmentgroup--default', status: 'stable' },
  { name: 'Carousel', description: 'Content slideshow with autoplay', category: 'Layout & Navigation', storybookPath: '?path=/story/components-carousel--default', status: 'stable' },

  // Overlays & Dialogs
  { name: 'Dialog', description: 'Modal dialog windows with backdrop', category: 'Overlays & Dialogs', storybookPath: '?path=/story/components-dialog--default', status: 'stable' },
  { name: 'Popover', description: 'Floating content panels with positioning', category: 'Overlays & Dialogs', storybookPath: '?path=/story/components-popover--default', status: 'stable' },
  { name: 'Tooltip', description: 'Contextual hover information tips', category: 'Overlays & Dialogs', storybookPath: '?path=/story/components-tooltip--default', status: 'stable' },
  { name: 'Hover Card', description: 'Rich hover preview cards', category: 'Overlays & Dialogs', storybookPath: '?path=/story/components-hovercard--default', status: 'stable' },
  { name: 'Toast', description: 'Notification toast messages', category: 'Overlays & Dialogs', storybookPath: '?path=/story/components-toast--default', status: 'stable' },

  // Display & Feedback
  { name: 'Avatar', description: 'User profile images with fallback', category: 'Display & Feedback', storybookPath: '?path=/story/components-avatar--default', status: 'stable' },
  { name: 'Badge', description: 'Status indicators and labels', category: 'Display & Feedback', storybookPath: '?path=/story/components-badge--default', status: 'stable' },
  { name: 'Card', description: 'Content containers with variants', category: 'Display & Feedback', storybookPath: '?path=/story/components-card--default', status: 'stable' },
  { name: 'Progress', description: 'Progress bars with percentage', category: 'Display & Feedback', storybookPath: '?path=/story/components-progress--default', status: 'stable' },
  { name: 'QR Code', description: 'QR code generator with download', category: 'Display & Feedback', storybookPath: '?path=/story/components-qrcode--default', status: 'new' },
  { name: 'Clipboard', description: 'Copy to clipboard functionality', category: 'Display & Feedback', storybookPath: '?path=/story/components-clipboard--default', status: 'stable' },

  // Utilities
  { name: 'Toggle', description: 'Toggle button for binary states', category: 'Utilities', storybookPath: '?path=/story/components-toggle--default', status: 'new' },
  { name: 'Toggle Group', description: 'Multiple toggle buttons in a group', category: 'Utilities', storybookPath: '?path=/story/components-togglegroup--default', status: 'stable' },
  { name: 'Field', description: 'Form field wrapper with label and error', category: 'Utilities', storybookPath: '?path=/story/components-field--default', status: 'stable' },
  { name: 'Fieldset', description: 'Form fieldset wrapper with legend', category: 'Utilities', storybookPath: '?path=/story/components-fieldset--default', status: 'stable' },
]

const categories = Array.from(new Set(components.map(c => c.category))).map(category => ({
  name: category,
  count: components.filter(c => c.category === category).length,
  components: components.filter(c => c.category === category),
}))

const stats = {
  total: components.length,
  new: components.filter(c => c.status === 'new').length,
  stable: components.filter(c => c.status === 'stable').length,
}

const getStatusVariant = (status: ComponentItem['status']) => {
  return status === 'new' ? 'default' : 'secondary'
}

const openStorybook = (path: string) => {
  window.open(`http://localhost:6007/${path}`, '_blank')
}
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <div class="border-b border-border bg-card">
      <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <div>
            <div class="flex items-center gap-3">
              <Package class="size-8 text-primary" />
              <h1 class="text-4xl font-bold tracking-tight text-foreground">Component Library</h1>
            </div>
            <p class="mt-3 text-lg text-muted-foreground max-w-2xl">
              {{ stats.total }} production-ready components built with Ark UI, Vue 3, and Tailwind CSS v4.
              Click any component to view interactive demos in Storybook.
            </p>
          </div>
        </div>

        <!-- Stats -->
        <div class="mt-8 grid grid-cols-3 gap-6 sm:grid-cols-3">
          <div class="rounded-lg border border-border bg-background p-4">
            <div class="text-3xl font-bold text-foreground">{{ stats.total }}</div>
            <div class="text-sm text-muted-foreground">Total Components</div>
          </div>
          <div class="rounded-lg border border-border bg-background p-4">
            <div class="text-3xl font-bold text-green-600 dark:text-green-400">{{ stats.new }}</div>
            <div class="text-sm text-muted-foreground">New Components</div>
          </div>
          <div class="rounded-lg border border-border bg-background p-4">
            <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">100%</div>
            <div class="text-sm text-muted-foreground">TypeScript Coverage</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Components Grid -->
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="space-y-16">
        <!-- Category sections -->
        <section v-for="category in categories" :key="category.name" class="space-y-6">
          <!-- Category header -->
          <div class="flex items-baseline justify-between border-b border-border pb-4">
            <div>
              <h2 class="text-2xl font-bold text-foreground">{{ category.name }}</h2>
              <p class="mt-1 text-sm text-muted-foreground">{{ category.count }} components</p>
            </div>
          </div>

          <!-- Components grid -->
          <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card
              v-for="component in category.components"
              :key="component.name"
              class="group cursor-pointer transition-all hover:border-primary hover:shadow-md"
              @click="openStorybook(component.storybookPath)"
            >
              <div class="p-6">
                <div class="flex items-start justify-between">
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2">
                      <h3 class="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {{ component.name }}
                      </h3>
                      <Badge v-if="component.status === 'new'" :variant="getStatusVariant(component.status)" size="sm">
                        NEW
                      </Badge>
                    </div>
                    <p class="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {{ component.description }}
                    </p>
                  </div>
                  <ExternalLink class="size-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-3 flex-shrink-0" />
                </div>

                <div class="mt-4 flex items-center text-xs text-muted-foreground">
                  <span class="flex items-center gap-1">
                    <span class="size-2 rounded-full bg-green-500"></span>
                    View in Storybook
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <!-- Footer CTA -->
        <section class="rounded-lg border border-border bg-card p-8 text-center">
          <h2 class="text-2xl font-bold text-foreground">Explore Interactive Demos</h2>
          <p class="mt-2 text-muted-foreground max-w-2xl mx-auto">
            All components include comprehensive documentation, interactive examples, and code snippets in Storybook.
          </p>
          <div class="mt-6 flex gap-4 justify-center">
            <Button @click="openStorybook('')" size="lg">
              <ExternalLink class="size-4 mr-2" />
              Open Storybook
            </Button>
            <Button variant="outline" size="lg" @click="$router.push('/showcase')">
              View Showcase
            </Button>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
