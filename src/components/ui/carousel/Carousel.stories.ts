import type { Meta, StoryObj } from '@storybook/vue3-vite'
import Carousel from './Carousel.vue'

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'overlay', 'thumbnails'],
      description: 'Visual style variant',
    },
    showArrows: {
      control: 'boolean',
      description: 'Show navigation arrows',
    },
    showIndicators: {
      control: 'boolean',
      description: 'Show indicator dots',
    },
    loop: {
      control: 'boolean',
      description: 'Enable infinite loop',
    },
    allowMouseDrag: {
      control: 'boolean',
      description: 'Allow dragging with mouse',
    },
  },
  args: {
    variant: 'default',
    showArrows: true,
    showIndicators: true,
    loop: false,
    allowMouseDrag: true,
  },
} satisfies Meta<typeof Carousel>

export default meta
type Story = StoryObj<typeof meta>

const images = [
  {
    id: '1',
    src: 'https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?w=800&h=400&fit=crop',
    alt: 'Landscape 1',
    title: 'Mountain Vista',
    description: 'Experience breathtaking mountain landscapes',
  },
  {
    id: '2',
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=400&fit=crop',
    alt: 'Landscape 2',
    title: 'Forest Trail',
    description: 'Explore serene forest paths',
  },
  {
    id: '3',
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&h=400&fit=crop',
    alt: 'Landscape 3',
    title: 'Coastal Sunset',
    description: 'Watch stunning coastal sunsets',
  },
  {
    id: '4',
    src: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&h=400&fit=crop',
    alt: 'Landscape 4',
    title: 'Desert Dunes',
    description: 'Discover vast desert landscapes',
  },
  {
    id: '5',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop',
    alt: 'Landscape 5',
    title: 'Alpine Lake',
    description: 'Relax by crystal clear alpine lakes',
  },
]

export const Default: Story = {
  args: {
    variant: 'default',
    items: images,
  },
}

export const Overlay: Story = {
  args: {
    variant: 'overlay',
    items: images,
  },
}

export const Thumbnails: Story = {
  args: {
    variant: 'thumbnails',
    items: images,
    slidesPerPage: 3,
  },
}

export const WithAutoplay: Story = {
  args: {
    variant: 'default',
    items: images,
    autoplay: { delay: 3000 },
    loop: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel automatically advances every 3 seconds.',
      },
    },
  },
}

export const WithLoop: Story = {
  args: {
    variant: 'default',
    items: images,
    loop: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Carousel loops infinitely from the last slide to the first.',
      },
    },
  },
}

export const WithoutControls: Story = {
  args: {
    variant: 'default',
    items: images,
    showArrows: false,
    showIndicators: false,
    allowMouseDrag: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal carousel with no controls. Navigate by dragging.',
      },
    },
  },
}

export const CustomContent: Story = {
  args: {
    variant: 'default',
    items: [
      { id: 'slide-1', title: 'Slide 1' },
      { id: 'slide-2', title: 'Slide 2' },
      { id: 'slide-3', title: 'Slide 3' },
    ],
  },
  render: (args) => ({
    components: { Carousel },
    setup() {
      return { args }
    },
    template: `
      <Carousel v-bind="args">
        <template #slide-1>
          <div class="flex h-64 items-center justify-center bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
            <div class="text-center text-white">
              <h2 class="text-4xl font-bold mb-2">Welcome</h2>
              <p class="text-xl">Discover amazing features</p>
            </div>
          </div>
        </template>
        <template #slide-2>
          <div class="flex h-64 items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
            <div class="text-center text-white">
              <h2 class="text-4xl font-bold mb-2">Explore</h2>
              <p class="text-xl">Find what you need</p>
            </div>
          </div>
        </template>
        <template #slide-3>
          <div class="flex h-64 items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 rounded-lg">
            <div class="text-center text-white">
              <h2 class="text-4xl font-bold mb-2">Get Started</h2>
              <p class="text-xl">Join us today</p>
            </div>
          </div>
        </template>
      </Carousel>
    `,
  }),
}

export const AllVariants: Story = {
  args: {
    items: images.slice(0, 3),
  },
  render: (args) => ({
    components: { Carousel },
    setup() {
      return { args }
    },
    template: `
      <div class="space-y-12">
        <div>
          <h3 class="text-sm font-semibold mb-3">Default</h3>
          <Carousel variant="default" :items="args.items" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Overlay</h3>
          <Carousel variant="overlay" :items="args.items" />
        </div>
        <div>
          <h3 class="text-sm font-semibold mb-3">Thumbnails</h3>
          <Carousel variant="thumbnails" :items="args.items" :slides-per-page="3" />
        </div>
      </div>
    `,
  }),
}
