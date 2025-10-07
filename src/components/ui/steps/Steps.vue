<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Steps } from '@ark-ui/vue/steps'
import { Check } from 'lucide-vue-next'
import { computed } from 'vue'
import { stepsVariants } from './steps.variants'
import type { StepsProps } from './steps.types'

const props = withDefaults(defineProps<StepsProps>(), {
  variant: 'default',
  orientation: 'horizontal',
})

const forwarded = useForwardPropsEmits(props, {})

const styles = computed(() => stepsVariants({ variant: props.variant }))
</script>

<template>
  <Steps.Root v-bind="forwarded" :count="props.items.length" :class="[styles.root(), props.class]">
    <Steps.List :class="styles.list()">
      <Steps.Item
        v-for="(item, index) in props.items"
        :key="index"
        :index="index"
        :class="styles.item()"
      >
        <Steps.Trigger :class="styles.trigger()">
          <Steps.Indicator :class="styles.indicator()">
            <Steps.Status>
              <template #complete>
                <Check class="h-5 w-5" />
              </template>
              <template #incomplete>
                {{ index + 1 }}
              </template>
              <template #current>
                {{ index + 1 }}
              </template>
            </Steps.Status>
          </Steps.Indicator>

          <div class="flex flex-col text-left">
            <span :class="styles.title()">{{ item.title }}</span>
            <span v-if="item.description" :class="styles.description()">
              {{ item.description }}
            </span>
          </div>
        </Steps.Trigger>

        <Steps.Separator v-if="index < props.items.length - 1" :class="styles.separator()" />
      </Steps.Item>
    </Steps.List>

    <Steps.Content
      v-for="(item, index) in props.items"
      :key="index"
      :index="index"
      :class="styles.content()"
    >
      <slot :name="`step-${index}`" :step="item">
        <h3 class="text-lg font-semibold mb-2">{{ item.title }}</h3>
        <p v-if="item.description" class="text-gray-600">{{ item.description }}</p>
      </slot>
    </Steps.Content>

    <Steps.CompletedContent :class="styles.completedContent()">
      <slot name="completed">
        <h3 class="text-lg font-semibold text-green-900 mb-2">All Steps Complete!</h3>
        <p class="text-green-700">You have successfully completed all steps.</p>
      </slot>
    </Steps.CompletedContent>

    <div :class="styles.navigation()">
      <Steps.PrevTrigger :class="styles.prevButton()">Previous</Steps.PrevTrigger>
      <Steps.NextTrigger :class="styles.nextButton()">Next</Steps.NextTrigger>
    </div>
  </Steps.Root>
</template>
