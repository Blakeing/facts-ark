<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Popover } from '@ark-ui/vue/popover'
import { X } from 'lucide-vue-next'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { useOmitProps } from '@/lib/useOmitProps'
import { popoverVariants } from './popover.variants'
import type { PopoverProps, PopoverRootEmits } from './popover.types'

const props = withDefaults(defineProps<PopoverProps>(), {
  variant: 'default',
  showClose: true,
  closeOnInteractOutside: true,
  closeOnEscape: true,
})

const emits = defineEmits<PopoverRootEmits>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  ['variant', 'title', 'description', 'trigger', 'showClose', 'class'] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() => popoverVariants({ variant: props.variant }))
</script>

<template>
  <Popover.Root v-bind="forwarded">
    <Popover.Trigger v-if="props.trigger" :class="cn(styles.trigger(), props.class)">
      <slot name="trigger">
        {{ props.trigger }}
      </slot>
    </Popover.Trigger>

    <Teleport to="body">
      <Popover.Positioner :class="styles.positioner()">
        <Popover.Content :class="styles.content()">
          <Popover.Title v-if="props.title" :class="styles.title()">
            {{ props.title }}
          </Popover.Title>
          <Popover.Description v-if="props.description" :class="styles.description()">
            {{ props.description }}
          </Popover.Description>

          <div v-if="$slots.content" class="mt-4">
            <slot name="content" />
          </div>

          <Popover.CloseTrigger v-if="props.showClose" :class="styles.closeTrigger()">
            <X class="h-4 w-4" />
          </Popover.CloseTrigger>
        </Popover.Content>
      </Popover.Positioner>
    </Teleport>
  </Popover.Root>
</template>
