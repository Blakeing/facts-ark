<!--
  Component Showcase View

  Demonstrates all migrated UI components with Park UI design system.
  Shows various variants, sizes, and states for each component.
-->
<script setup lang="ts">
import { ref } from 'vue'
import Button from '@/shared/ui/button/Button.vue'
import Input from '@/shared/ui/input/Input.vue'
import Card from '@/shared/ui/card/Card.vue'
import Badge from '@/shared/ui/badge/Badge.vue'
import Avatar from '@/shared/ui/avatar/Avatar.vue'
import Select from '@/shared/ui/select/Select.vue'
import Checkbox from '@/shared/ui/checkbox/Checkbox.vue'
import Switch from '@/shared/ui/switch/Switch.vue'
import RadioGroup from '@/shared/ui/radio-group/RadioGroup.vue'
import Textarea from '@/shared/ui/textarea/Textarea.vue'
import TagsInput from '@/shared/ui/tags-input/TagsInput.vue'
import Dialog from '@/shared/ui/dialog/Dialog.vue'
import Popover from '@/shared/ui/popover/Popover.vue'
import Tabs from '@/shared/ui/tabs/Tabs.vue'
import Accordion from '@/shared/ui/accordion/Accordion.vue'
import Collapsible from '@/shared/ui/collapsible/Collapsible.vue'
import HoverCard from '@/shared/ui/hover-card/HoverCard.vue'
import Menu from '@/shared/ui/menu/Menu.vue'
import Tooltip from '@/shared/ui/tooltip/Tooltip.vue'
import Carousel from '@/shared/ui/carousel/Carousel.vue'
import Pagination from '@/shared/ui/pagination/Pagination.vue'
import Progress from '@/shared/ui/progress/Progress.vue'
import RatingGroup from '@/shared/ui/rating-group/RatingGroup.vue'
import SegmentGroup from '@/shared/ui/segment-group/SegmentGroup.vue'
import Slider from '@/shared/ui/slider/Slider.vue'
import Steps from '@/shared/ui/steps/Steps.vue'
import { toast } from '@/shared/ui/toast'

// State management
const inputValue = ref('')
const textareaValue = ref('')
const selectedFramework = ref<string[]>([])
const checkboxChecked = ref(false)
const switchChecked = ref(true)
const selectedRadio = ref<string>('option1')
const tags = ref<string[]>(['Vue', 'TypeScript'])
const dialogOpen = ref(false)
const currentPage = ref(1)
const progressValue = ref(60)
const ratingValue = ref(3)
const sliderValue = ref([50])
const segmentValue = ref<string>('tab1')

// Data
const frameworks = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
]

const radioOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

const tabItems = [
  { value: 'overview', label: 'Overview' },
  { value: 'features', label: 'Features' },
  { value: 'pricing', label: 'Pricing' },
]

const accordionItems = [
  {
    value: 'item1',
    title: 'What is Park UI?',
    content: 'Park UI is a comprehensive design system built on top of Ark UI and Panda CSS.',
  },
  {
    value: 'item2',
    title: 'Why migrate to Park UI?',
    content: 'Park UI provides a cohesive design system with semantic tokens and consistent styling.',
  },
  {
    value: 'item3',
    title: 'What components are available?',
    content: 'All 26 components have been migrated with various variants and sizes.',
  },
]

const carouselImages = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    alt: 'Mountain landscape',
    title: 'Mountains',
    description: 'Beautiful mountain scenery',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800',
    alt: 'Forest path',
    title: 'Forest',
    description: 'Peaceful forest trail',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
    alt: 'Lake view',
    title: 'Lake',
    description: 'Serene lake waters',
  },
]

const stepsItems = [
  { value: 'step1', title: 'Getting Started', description: 'Install dependencies' },
  { value: 'step2', title: 'Configuration', description: 'Set up your project' },
  { value: 'step3', title: 'Development', description: 'Start building' },
]

const segmentItems = [
  { value: 'tab1', label: 'Tab 1' },
  { value: 'tab2', label: 'Tab 2' },
  { value: 'tab3', label: 'Tab 3' },
]

// Functions
const showPromiseToast = () => {
  toast.promise(
    new Promise((resolve) => setTimeout(resolve, 2000)),
    {
      loading: 'Loading data...',
      success: 'Data loaded successfully!',
      error: 'Failed to load data',
    },
  )
}

const menuItems = [
  { value: 'new', label: 'New File', shortcut: '⌘N' },
  { value: 'open', label: 'Open', shortcut: '⌘O' },
  { value: 'save', label: 'Save', shortcut: '⌘S' },
]
</script>

<template>
  <div class="py-12 animate-fade-in">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-12 text-center">
        <h1 class="text-4xl font-bold text-foreground mb-4">
          🎨 Park UI Component Showcase
        </h1>
        <p class="text-xl text-muted-foreground mb-2">
          All 26 components migrated with semantic design tokens
        </p>
        <div class="flex gap-2 justify-center flex-wrap">
          <Badge variant="primary">100% Complete</Badge>
          <Badge variant="success">TypeScript Safe</Badge>
          <Badge variant="info">Production Ready</Badge>
        </div>
      </div>

      <div class="space-y-16">
        <!-- Form Components Section -->
        <section>
          <h2 class="text-3xl font-bold text-foreground mb-8 border-b border-border pb-4">
            📝 Form Components
          </h2>

          <div class="space-y-12">
            <!-- Buttons -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Buttons</h3>
              <div class="space-y-4">
                <div class="flex flex-wrap gap-3">
                  <Button variant="solid">Solid</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                </div>
                <div class="flex flex-wrap gap-3 items-center">
                  <Button size="xs">Extra Small</Button>
                  <Button size="sm">Small</Button>
                  <Button size="md">Medium</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">Extra Large</Button>
                </div>
              </div>
            </Card>

            <!-- Input -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Input</h3>
              <div class="space-y-4 max-w-md">
                <Input
                  v-model="inputValue"
                  placeholder="Enter text..."
                  size="md"
                />
                <Input
                  placeholder="Small input"
                  size="sm"
                />
                <Input
                  placeholder="Large input"
                  size="lg"
                />
                <Input
                  variant="error"
                  placeholder="Error state"
                  value="Invalid input"
                />
              </div>
            </Card>

            <!-- Select -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Select</h3>
              <div class="max-w-md">
                <Select
                  v-model="selectedFramework"
                  :items="frameworks"
                  placeholder="Select a framework..."
                  size="md"
                />
              </div>
            </Card>

            <!-- Checkbox & Switch -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Checkbox & Switch</h3>
              <div class="space-y-6">
                <div class="space-y-2">
                  <p class="text-sm font-medium text-foreground">Checkbox</p>
                  <div class="flex gap-4 items-center">
                    <Checkbox v-model:checked="checkboxChecked" size="sm" />
                    <Checkbox v-model:checked="checkboxChecked" size="md" />
                    <Checkbox v-model:checked="checkboxChecked" size="lg" />
                  </div>
                </div>
                <div class="space-y-2">
                  <p class="text-sm font-medium text-foreground">Switch</p>
                  <div class="flex gap-4 items-center">
                    <Switch v-model:checked="switchChecked" size="sm" />
                    <Switch v-model:checked="switchChecked" size="md" />
                    <Switch v-model:checked="switchChecked" size="lg" />
                  </div>
                </div>
              </div>
            </Card>

            <!-- Radio Group -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Radio Group</h3>
              <div class="space-y-4">
                <RadioGroup
                  v-model="selectedRadio"
                  :options="radioOptions"
                  variant="default"
                />
                <RadioGroup
                  v-model="selectedRadio"
                  :options="radioOptions"
                  variant="cards"
                />
              </div>
            </Card>

            <!-- Textarea -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Textarea</h3>
              <div class="max-w-md space-y-4">
                <Textarea
                  name="showcase-textarea-md"
                  v-model="textareaValue"
                  placeholder="Enter your message..."
                  :rows="4"
                  size="md"
                />
                <Textarea
                  name="showcase-textarea-sm"
                  placeholder="Small textarea..."
                  :rows="3"
                  size="sm"
                />
                <Textarea
                  name="showcase-textarea-lg"
                  placeholder="Large textarea..."
                  :rows="5"
                  size="lg"
                />
              </div>
            </Card>

            <!-- Tags Input -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Tags Input</h3>
              <div class="max-w-md">
                <TagsInput
                  v-model="tags"
                  placeholder="Add tags..."
                  variant="default"
                />
              </div>
            </Card>
          </div>
        </section>

        <!-- Display Components Section -->
        <section>
          <h2 class="text-3xl font-bold text-foreground mb-8 border-b border-border pb-4">
            🎨 Display Components
          </h2>

          <div class="space-y-12">
            <!-- Badges -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Badges</h3>
              <div class="flex flex-wrap gap-3">
                <Badge variant="default">Default</Badge>
                <Badge variant="primary">Primary</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="destructive">Destructive</Badge>
                <Badge variant="outline">Outline</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
              </div>
            </Card>

            <!-- Avatars -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Avatars</h3>
              <div class="flex gap-4 items-center">
                <Avatar
                  src="https://i.pravatar.cc/150?img=1"
                  name="John Doe"
                  size="sm"
                />
                <Avatar
                  src="https://i.pravatar.cc/150?img=2"
                  name="Jane Smith"
                  size="md"
                />
                <Avatar
                  src="https://i.pravatar.cc/150?img=3"
                  name="Bob Johnson"
                  size="lg"
                />
                <Avatar
                  src="https://i.pravatar.cc/150?img=4"
                  name="Alice Williams"
                  size="xl"
                />
                <Avatar
                  name="Charlie Brown"
                  size="2xl"
                />
              </div>
            </Card>

            <!-- Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card variant="outline" padding="md">
                <h4 class="font-semibold text-foreground mb-2">Outline Card</h4>
                <p class="text-sm text-muted-foreground">
                  This is an outline variant card with medium padding.
                </p>
              </Card>
              <Card variant="elevated" padding="md">
                <h4 class="font-semibold text-foreground mb-2">Elevated Card</h4>
                <p class="text-sm text-muted-foreground">
                  This is an elevated variant card with shadow effect.
                </p>
              </Card>
              <Card variant="filled" padding="md">
                <h4 class="font-semibold text-foreground mb-2">Filled Card</h4>
                <p class="text-sm text-muted-foreground">
                  This is a filled variant card with background color.
                </p>
              </Card>
            </div>
          </div>
        </section>

        <!-- Layout Components Section -->
        <section>
          <h2 class="text-3xl font-bold text-foreground mb-8 border-b border-border pb-4">
            📐 Layout Components
          </h2>

          <div class="space-y-12">
            <!-- Tabs -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Tabs</h3>
              <Tabs :items="tabItems" variant="line">
                <template #overview>
                  <div class="py-4">
                    <p class="text-muted-foreground">Overview content goes here.</p>
                  </div>
                </template>
                <template #features>
                  <div class="py-4">
                    <p class="text-muted-foreground">Features content goes here.</p>
                  </div>
                </template>
                <template #pricing>
                  <div class="py-4">
                    <p class="text-muted-foreground">Pricing content goes here.</p>
                  </div>
                </template>
              </Tabs>
            </Card>

            <!-- Accordion -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Accordion</h3>
              <Accordion :items="accordionItems" variant="default" />
            </Card>

            <!-- Collapsible -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Collapsible</h3>
              <Collapsible
                title="Click to expand"
                variant="default"
              >
                <p class="text-muted-foreground">
                  This is collapsible content that can be expanded and collapsed.
                  It uses smooth animations for a better user experience.
                </p>
              </Collapsible>
            </Card>

            <!-- Dialog -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Dialog</h3>
              <Button @click="dialogOpen = true">Open Dialog</Button>
              <Dialog v-model:open="dialogOpen" variant="default">
                <template #trigger>
                  <!-- Trigger is handled by button above -->
                </template>
                <template #content>
                  <div class="space-y-4">
                    <h3 class="text-lg font-semibold">Example Dialog</h3>
                    <p class="text-muted-foreground">
                      This is a dialog component with the Park UI design system.
                    </p>
                    <div class="flex gap-2 justify-end">
                      <Button variant="outline" @click="dialogOpen = false">Cancel</Button>
                      <Button variant="solid" @click="dialogOpen = false">Confirm</Button>
                    </div>
                  </div>
                </template>
              </Dialog>
            </Card>

            <!-- Popover, Tooltip, Hover Card, Menu -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">
                Popover, Tooltip, Hover Card & Menu
              </h3>
              <div class="flex flex-wrap gap-4">
                <Popover>
                  <template #trigger>
                    <Button variant="outline">Open Popover</Button>
                  </template>
                  <template #content>
                    <div class="p-4 space-y-2">
                      <h4 class="font-semibold">Popover Title</h4>
                      <p class="text-sm text-muted-foreground">
                        This is a popover with custom content.
                      </p>
                    </div>
                  </template>
                </Popover>

                <Tooltip content="This is a helpful tooltip">
                  <Button variant="outline">Hover for Tooltip</Button>
                </Tooltip>

                <HoverCard>
                  <template #trigger>
                    <Button variant="outline">Hover Card</Button>
                  </template>
                  <template #content>
                    <div class="space-y-2">
                      <h4 class="font-semibold">Hover Card</h4>
                      <p class="text-sm text-muted-foreground">
                        Additional information appears on hover.
                      </p>
                    </div>
                  </template>
                </HoverCard>

                <Menu :items="menuItems">
                  <template #trigger>
                    <Button variant="outline">Open Menu</Button>
                  </template>
                </Menu>
              </div>
            </Card>
          </div>
        </section>

        <!-- Interactive Components Section -->
        <section>
          <h2 class="text-3xl font-bold text-foreground mb-8 border-b border-border pb-4">
            🎮 Interactive Components
          </h2>

          <div class="space-y-12">
            <!-- Carousel -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Carousel</h3>
              <Carousel
                :items="carouselImages"
                :slide-count="carouselImages.length"
                variant="default"
              />
            </Card>

            <!-- Progress -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Progress</h3>
              <div class="space-y-6">
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-foreground">Default Progress</span>
                    <span class="text-muted-foreground">{{ progressValue }}%</span>
                  </div>
                  <Progress :value="progressValue" variant="default" />
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-foreground">Success Progress</span>
                    <span class="text-muted-foreground">80%</span>
                  </div>
                  <Progress :value="80" variant="success" />
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-foreground">Warning Progress</span>
                    <span class="text-muted-foreground">50%</span>
                  </div>
                  <Progress :value="50" variant="warning" />
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between text-sm">
                    <span class="text-foreground">Danger Progress</span>
                    <span class="text-muted-foreground">30%</span>
                  </div>
                  <Progress :value="30" variant="danger" />
                </div>
              </div>
            </Card>

            <!-- Rating Group -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Rating Group</h3>
              <div class="space-y-4">
                <div>
                  <p class="text-sm text-muted-foreground mb-2">Default Variant</p>
                  <RatingGroup v-model="ratingValue" :count="5" variant="default" />
                </div>
                <div>
                  <p class="text-sm text-muted-foreground mb-2">Yellow Variant</p>
                  <RatingGroup v-model="ratingValue" :count="5" variant="yellow" />
                </div>
              </div>
            </Card>

            <!-- Slider -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Slider</h3>
              <div class="space-y-6 max-w-md">
                <div class="space-y-2">
                  <p class="text-sm text-foreground">Value: {{ sliderValue[0] }}</p>
                  <Slider v-model="sliderValue" :min="0" :max="100" variant="default" />
                </div>
              </div>
            </Card>

            <!-- Segment Group -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Segment Group</h3>
              <div class="space-y-4">
                <SegmentGroup
                  v-model="segmentValue"
                  :options="segmentItems"
                  variant="default"
                />
                <SegmentGroup
                  v-model="segmentValue"
                  :options="segmentItems"
                  variant="pills"
                />
              </div>
            </Card>

            <!-- Pagination -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Pagination</h3>
              <div class="space-y-4">
                <Pagination
                  v-model:page="currentPage"
                  :count="100"
                  :page-size="10"
                  variant="default"
                />
              </div>
            </Card>

            <!-- Steps -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Steps</h3>
              <Steps :items="stepsItems" variant="default" />
            </Card>
          </div>
        </section>

        <!-- Toast Notifications Section -->
        <section>
          <h2 class="text-3xl font-bold text-foreground mb-8 border-b border-border pb-4">
            🔔 Toast Notifications
          </h2>

          <div class="space-y-8">
            <!-- Basic Toast Types -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Basic Types</h3>
              <p class="text-sm text-muted-foreground mb-6">
                Vue Sonner toasts styled with semantic tokens (shadcn-vue pattern). Auto-dismiss after 5 seconds.
              </p>
              <div class="flex flex-wrap gap-3">
                <Button
                  variant="solid"
                  @click="toast.success('Success!', {
                    description: 'Your action was completed successfully.',
                  })"
                >
                  Success
                </Button>
                <Button
                  variant="destructive"
                  @click="toast.error('Error occurred', {
                    description: 'Something went wrong. Please try again.',
                  })"
                >
                  Error
                </Button>
                <Button
                  variant="outline"
                  @click="toast.warning('Warning!', {
                    description: 'Please review this information carefully.',
                  })"
                >
                  Warning
                </Button>
                <Button
                  variant="secondary"
                  @click="toast.info('Information', {
                    description: 'Here is some useful information for you.',
                  })"
                >
                  Info
                </Button>
                <Button
                  variant="ghost"
                  @click="toast('Default notification', {
                    description: 'A neutral default toast message.',
                  })"
                >
                  Default
                </Button>
              </div>
            </Card>

            <!-- Toasts with Actions -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">With Action Buttons</h3>
              <p class="text-sm text-muted-foreground mb-6">
                Toasts can include action buttons for user interaction. These stay longer (10 seconds) for user to act.
              </p>
              <div class="flex flex-wrap gap-3">
                <Button
                  variant="solid"
                  @click="toast.success('File uploaded', {
                    description: 'Your document has been uploaded successfully.',
                    action: {
                      label: 'View',
                      onClick: () => console.log('View status clicked!')
                    },
                    duration: 10000
                  })"
                >
                  With Action
                </Button>
                <Button
                  variant="outline"
                  @click="toast('Event created', {
                    description: 'Your event has been scheduled.',
                    action: {
                      label: 'Undo',
                      onClick: () => console.log('Undo clicked!')
                    },
                    duration: 10000
                  })"
                >
                  With Undo
                </Button>
              </div>
            </Card>

            <!-- Promise Toast -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Promise-based Toast</h3>
              <p class="text-sm text-muted-foreground mb-6">
                Show loading, success, or error based on promise resolution. Shows loading for 2 seconds then success.
              </p>
              <div class="flex flex-wrap gap-3">
                <Button variant="outline" @click="showPromiseToast">
                  Show Promise Toast
                </Button>
              </div>
            </Card>

            <!-- Dismiss Controls -->
            <Card variant="outline" padding="lg">
              <h3 class="text-xl font-semibold text-foreground mb-4">Dismissing Toasts</h3>
              <p class="text-sm text-muted-foreground mb-6">
                All toasts have a dismiss button. Click the × icon on any toast to dismiss it, or use the button below to dismiss all.
              </p>
              <Button
                variant="outline"
                @click="toast.dismiss()"
              >
                Dismiss All Toasts
              </Button>
            </Card>
          </div>
        </section>

        <!-- Footer -->
        <div class="text-center py-8 border-t border-border">
          <p class="text-muted-foreground">
            🎉 All 26 components successfully migrated to Park UI design system
          </p>
          <p class="text-sm text-muted-foreground mt-2">
            Built with Vue 3, Ark UI, and Tailwind CSS v4
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
