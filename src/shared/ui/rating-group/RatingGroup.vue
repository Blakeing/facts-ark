<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { RatingGroup } from '@ark-ui/vue/rating-group'
import { Star } from 'lucide-vue-next'
import { computed } from 'vue'
import { cn } from '@/shared/lib/utils'
import { ratingGroupVariants } from './rating-group.variants'
import type { RatingGroupProps, RatingGroupRootEmits } from './rating-group.types'

const props = withDefaults(defineProps<RatingGroupProps>(), {
  variant: 'default',
  size: 'md',
  count: 5,
})

const emits = defineEmits<RatingGroupRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  ratingGroupVariants({
    variant: props.variant,
    size: props.size,
  })
)
</script>

<template>
  <RatingGroup.Root v-bind="forwarded" :class="cn(styles.root(), props.class)">
    <RatingGroup.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </RatingGroup.Label>

    <RatingGroup.Control :class="styles.control()">
      <RatingGroup.Context v-slot="{ items }">
        <RatingGroup.Item
          v-for="item in items"
          :key="item"
          :index="item"
          :class="styles.item()"
        >
          <RatingGroup.ItemContext v-slot="{ highlighted }">
            <Star :fill="highlighted ? 'currentColor' : 'none'" />
          </RatingGroup.ItemContext>
        </RatingGroup.Item>
      </RatingGroup.Context>
      <RatingGroup.HiddenInput />
    </RatingGroup.Control>
  </RatingGroup.Root>
</template>
