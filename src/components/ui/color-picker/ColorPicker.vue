<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { ColorPicker } from '@ark-ui/vue/color-picker'
import { Check, Pipette } from 'lucide-vue-next'
import { computed } from 'vue'
import { useOmitProps } from '@/lib/useOmitProps'
import { colorPickerVariants } from './color-picker.variants'
import type { ColorPickerProps, ColorPickerRootEmits } from './color-picker.types'

/**
 * A Color Picker component with visual color selection.
 *
 * Features:
 * - Visual color area for hue/saturation selection
 * - Hue and alpha sliders
 * - Multiple color format support (hex, rgb, hsl)
 * - Eyedropper tool (browser support varies)
 * - Preset color swatches
 * - Channel value inputs
 * - Format switching
 * - Fully accessible
 *
 * @example
 * <ColorPicker
 *   label="Pick a color"
 *   v-model="selectedColor"
 * />
 *
 * @example
 * // With preset swatches
 * <ColorPicker
 *   label="Theme color"
 *   v-model="themeColor"
 *   :swatches="['#ef4444', '#3b82f6', '#10b981']"
 * />
 */

const props = withDefaults(defineProps<ColorPickerProps>(), {
  showEyeDropper: true,
  swatches: () => [
    '#ef4444',
    '#f97316',
    '#f59e0b',
    '#eab308',
    '#84cc16',
    '#22c55e',
    '#10b981',
    '#14b8a6',
    '#06b6d4',
    '#0ea5e9',
    '#3b82f6',
    '#6366f1',
    '#8b5cf6',
    '#a855f7',
    '#d946ef',
    '#ec4899',
  ],
})

const emits = defineEmits<ColorPickerRootEmits>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  ['label', 'showEyeDropper', 'swatches', 'helperText', 'error', 'class'] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() => colorPickerVariants())
</script>

<template>
  <ColorPicker.Root v-bind="forwarded" :class="[styles.root(), props.class]">
    <!-- Label -->
    <ColorPicker.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </ColorPicker.Label>

    <!-- Control with trigger and value display -->
    <ColorPicker.Control :class="styles.control()">
      <ColorPicker.Trigger :class="styles.trigger()">
        <ColorPicker.TransparencyGrid :class="styles.transparencyGrid()" />
        <ColorPicker.ValueSwatch />
      </ColorPicker.Trigger>
      <ColorPicker.ValueText :class="styles.valueText()" />
      <ColorPicker.ChannelInput channel="hex" :class="styles.channelInput()" />
    </ColorPicker.Control>

    <!-- Color picker popup -->
    <Teleport to="body">
      <ColorPicker.Positioner :class="styles.positioner()">
        <ColorPicker.Content :class="styles.content()">
          <!-- Color area for saturation/lightness selection -->
          <ColorPicker.Area :class="styles.area()">
            <ColorPicker.AreaBackground :class="styles.areaBackground()" />
            <ColorPicker.AreaThumb :class="styles.areaThumb()" />
          </ColorPicker.Area>

          <!-- Hue slider -->
          <ColorPicker.ChannelSlider channel="hue" :class="styles.channelSlider()">
            <ColorPicker.ChannelSliderTrack :class="styles.channelSliderTrack()" />
            <ColorPicker.ChannelSliderThumb :class="styles.channelSliderThumb()" />
          </ColorPicker.ChannelSlider>

          <!-- Alpha slider -->
          <ColorPicker.ChannelSlider channel="alpha" :class="styles.channelSlider()">
            <ColorPicker.TransparencyGrid :class="styles.transparencyGrid()" />
            <ColorPicker.ChannelSliderTrack :class="styles.channelSliderTrack()" />
            <ColorPicker.ChannelSliderThumb :class="styles.channelSliderThumb()" />
          </ColorPicker.ChannelSlider>

          <!-- Format views -->
          <ColorPicker.View format="rgba" :class="styles.view()">
            <div class="flex gap-2">
              <div class="flex-1">
                <div :class="styles.channelSliderLabel()">Hex</div>
                <ColorPicker.ChannelInput channel="hex" :class="styles.channelInput()" />
              </div>
              <div class="flex-1">
                <div :class="styles.channelSliderLabel()">Alpha</div>
                <ColorPicker.ChannelInput channel="alpha" :class="styles.channelInput()" />
              </div>
            </div>
          </ColorPicker.View>

          <ColorPicker.View format="hsla" :class="styles.view()">
            <div class="grid grid-cols-3 gap-2">
              <div>
                <div :class="styles.channelSliderLabel()">H</div>
                <ColorPicker.ChannelInput channel="hue" :class="styles.channelInput()" />
              </div>
              <div>
                <div :class="styles.channelSliderLabel()">S</div>
                <ColorPicker.ChannelInput channel="saturation" :class="styles.channelInput()" />
              </div>
              <div>
                <div :class="styles.channelSliderLabel()">L</div>
                <ColorPicker.ChannelInput channel="lightness" :class="styles.channelInput()" />
              </div>
            </div>
          </ColorPicker.View>

          <!-- Preset color swatches -->
          <ColorPicker.SwatchGroup v-if="props.swatches?.length" :class="styles.swatchGroup()">
            <ColorPicker.SwatchTrigger
              v-for="(color, index) in props.swatches"
              :key="index"
              :value="color"
              :class="styles.swatchTrigger()"
            >
              <ColorPicker.Swatch :value="color" :class="styles.swatch()">
                <ColorPicker.SwatchIndicator :class="styles.swatchIndicator()">
                  <Check class="size-3" />
                </ColorPicker.SwatchIndicator>
              </ColorPicker.Swatch>
            </ColorPicker.SwatchTrigger>
          </ColorPicker.SwatchGroup>

          <!-- Bottom controls -->
          <div class="flex items-center justify-between gap-2 pt-2 border-t border-border">
            <ColorPicker.FormatTrigger :class="styles.formatTrigger()">
              Toggle Format
            </ColorPicker.FormatTrigger>
            <ColorPicker.EyeDropperTrigger
              v-if="props.showEyeDropper"
              :class="styles.eyeDropperTrigger()"
            >
              <Pipette class="size-4 mr-2" />
              Pick Color
            </ColorPicker.EyeDropperTrigger>
          </div>
        </ColorPicker.Content>
      </ColorPicker.Positioner>
    </Teleport>

    <!-- Hidden input for form submission -->
    <ColorPicker.HiddenInput />

    <!-- Helper text or error message -->
    <p
      v-if="props.helperText || props.error"
      :class="['text-xs mt-2', props.error ? 'text-destructive' : 'text-muted-foreground']"
    >
      {{ props.error || props.helperText }}
    </p>
  </ColorPicker.Root>
</template>

