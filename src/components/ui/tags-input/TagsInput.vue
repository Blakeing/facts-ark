<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { TagsInput } from '@ark-ui/vue/tags-input'
import { X } from 'lucide-vue-next'
import { computed } from 'vue'
import { tagsInputVariants } from './tags-input.variants'
import type { TagsInputProps, TagsInputRootEmits } from './tags-input.types'

const props = withDefaults(defineProps<TagsInputProps>(), {
  variant: 'default',
  placeholder: 'Add tag...',
  delimiter: ',',
})

const emits = defineEmits<TagsInputRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() => tagsInputVariants({ variant: props.variant }))
</script>

<template>
  <TagsInput.Root v-bind="forwarded" :class="[styles.root(), props.class]">
    <TagsInput.Label v-if="props.label" :class="styles.label()">
      {{ props.label }}
    </TagsInput.Label>

    <TagsInput.Context v-slot="tagsInput">
      <TagsInput.Control :class="styles.control()">
        <TagsInput.Item
          v-for="(value, index) in tagsInput.value"
          :key="index"
          :index="index"
          :value="value"
          :class="styles.item()"
        >
          <TagsInput.ItemPreview class="flex items-center gap-1">
            <TagsInput.ItemText :class="styles.itemText()">{{ value }}</TagsInput.ItemText>
            <TagsInput.ItemDeleteTrigger :class="styles.itemDeleteTrigger()">
              <X class="h-3 w-3" />
            </TagsInput.ItemDeleteTrigger>
          </TagsInput.ItemPreview>
          <TagsInput.ItemInput />
        </TagsInput.Item>

        <TagsInput.Input :placeholder="props.placeholder" :class="styles.input()" />

        <TagsInput.ClearTrigger v-if="tagsInput.value.length > 0" :class="styles.clearTrigger()">
          <X class="h-4 w-4" />
        </TagsInput.ClearTrigger>
      </TagsInput.Control>
    </TagsInput.Context>

    <TagsInput.HiddenInput />
  </TagsInput.Root>
</template>
