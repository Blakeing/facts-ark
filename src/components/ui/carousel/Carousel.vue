<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Carousel } from '@ark-ui/vue/carousel'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'
import { carouselVariants } from './carousel.variants'
import type { CarouselProps, CarouselRootEmits } from './carousel.types'

/**
 * A closed Carousel component for displaying a slideshow of content.
 *
 * Supports multiple variants:
 * - default: Full-width slides
 * - overlay: Slides with text overlay
 * - thumbnails: Multiple small slides visible
 *
 * Features:
 * - Previous/next navigation
 * - Indicator dots
 * - Autoplay support
 * - Loop mode
 * - Mouse drag navigation
 * - Custom slot content
 *
 * @example
 * // Simple usage
 * <Carousel
 *   variant="default"
 *   :items="[
 *     { id: '1', src: 'image1.jpg', alt: 'Image 1' },
 *     { id: '2', src: 'image2.jpg', alt: 'Image 2' }
 *   ]"
 * />
 *
 * @example
 * // With overlay and autoplay
 * <Carousel
 *   variant="overlay"
 *   :autoplay="{ delay: 5000 }"
 *   :loop="true"
 *   :items="items"
 * />
 */

const props = withDefaults(defineProps<CarouselProps>(), {
  variant: 'default',
  showArrows: true,
  showIndicators: true,
  loop: false,
  allowMouseDrag: true,
})

const emits = defineEmits<CarouselRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  carouselVariants({
    variant: props.variant,
  })
)

const slideCount = computed(() => props.items.length)
</script>

<template>
  <Carousel.Root
    v-bind="forwarded"
    :slide-count="slideCount"
    :class="[styles.root(), props.class]"
  >
    <!-- Navigation Controls -->
    <Carousel.Control v-if="props.showArrows" :class="styles.control()">
      <Carousel.PrevTrigger :class="styles.prevTrigger()">
        <ChevronLeft class="h-5 w-5" />
        <span class="sr-only">Previous slide</span>
      </Carousel.PrevTrigger>
      <Carousel.NextTrigger :class="styles.nextTrigger()">
        <ChevronRight class="h-5 w-5" />
        <span class="sr-only">Next slide</span>
      </Carousel.NextTrigger>
    </Carousel.Control>

    <!-- Carousel Items -->
    <Carousel.ItemGroup :class="styles.itemGroup()">
      <Carousel.Item
        v-for="(item, index) in props.items"
        :key="item.id"
        :index="index"
        :class="styles.item()"
      >
        <div :class="styles.itemContent()">
          <!-- Use slot if provided, otherwise use default image rendering -->
          <slot :name="item.id" :item="item">
            <img
              v-if="item.src"
              :src="item.src"
              :alt="item.alt || `Slide ${index + 1}`"
              :class="styles.image()"
            />

            <!-- Overlay content for overlay variant -->
            <div v-if="props.variant === 'overlay' && (item.title || item.description)" :class="styles.overlay()">
              <div :class="styles.overlayContent()">
                <h3 v-if="item.title" class="text-xl font-semibold mb-2">
                  {{ item.title }}
                </h3>
                <p v-if="item.description" class="text-sm opacity-90">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </slot>
        </div>
      </Carousel.Item>
    </Carousel.ItemGroup>

    <!-- Indicator Dots -->
    <Carousel.IndicatorGroup v-if="props.showIndicators" :class="styles.indicatorGroup()">
      <Carousel.Indicator
        v-for="(_, index) in props.items"
        :key="index"
        :index="index"
        :class="styles.indicator()"
      >
        <span class="sr-only">Slide {{ index + 1 }}</span>
      </Carousel.Indicator>
    </Carousel.IndicatorGroup>
  </Carousel.Root>
</template>
