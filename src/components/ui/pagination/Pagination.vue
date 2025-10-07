<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Pagination } from '@ark-ui/vue/pagination'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { paginationVariants } from './pagination.variants'
import type { PaginationProps, PaginationRootEmits } from './pagination.types'

const props = withDefaults(defineProps<PaginationProps>(), {
  variant: 'default',
  size: 'md',
  siblingCount: 1,
  showPageSize: false,
  pageSizeOptions: () => [10, 20, 50, 100],
})

const emits = defineEmits<PaginationRootEmits>()
const forwarded = useForwardPropsEmits(props, emits)

const styles = computed(() =>
  paginationVariants({
    variant: props.variant,
    size: props.size,
  })
)
</script>

<template>
  <Pagination.Root v-bind="forwarded" :class="cn(styles.root(), props.class)">
    <Pagination.PrevTrigger :class="styles.prevTrigger()">
      <ChevronLeft class="h-4 w-4" />
      <span class="sr-only">Previous</span>
    </Pagination.PrevTrigger>

    <Pagination.Context v-slot="pagination">
      <template v-for="(page, index) in pagination.pages" :key="index">
        <Pagination.Item
          v-if="page.type === 'page'"
          :value="page.value"
          :type="page.type"
          :class="styles.item()"
        >
          {{ page.value }}
        </Pagination.Item>
        <Pagination.Ellipsis v-else :index="index" :class="styles.ellipsis()">
          &#8230;
        </Pagination.Ellipsis>
      </template>
    </Pagination.Context>

    <Pagination.NextTrigger :class="styles.nextTrigger()">
      <ChevronRight class="h-4 w-4" />
      <span class="sr-only">Next</span>
    </Pagination.NextTrigger>
  </Pagination.Root>
</template>
