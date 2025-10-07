<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Menu } from '@ark-ui/vue/menu'
import { ChevronDown } from 'lucide-vue-next'
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { useOmitProps } from '@/lib/useOmitProps'
import { menuVariants } from './menu.variants'
import type { MenuProps, MenuRootEmits } from './menu.types'

const props = withDefaults(defineProps<MenuProps>(), {
  variant: 'default',
  closeOnSelect: true,
})

const emits = defineEmits<MenuRootEmits>()

// Filter out custom props before forwarding to Ark UI
const arkProps = useOmitProps(
  props,
  ['items', 'trigger', 'variant', 'class'] as const
)
const forwarded = useForwardPropsEmits(arkProps, emits)

const styles = computed(() => menuVariants({ variant: props.variant }))
</script>

<template>
  <Menu.Root v-bind="forwarded">
    <Menu.Trigger v-if="props.trigger || $slots.trigger" :class="cn(styles.trigger(), props.class)">
      <slot name="trigger">
        {{ props.trigger }}
        <ChevronDown class="h-4 w-4" />
      </slot>
    </Menu.Trigger>

    <Teleport to="body">
      <Menu.Positioner :class="styles.positioner()">
        <Menu.Content :class="styles.content()">
          <!-- Use items prop if provided -->
          <template v-if="props.items">
            <Menu.Item
              v-for="item in props.items"
              :key="item.value"
              :value="item.value"
              :disabled="item.disabled"
              :class="styles.item()"
            >
              <component :is="item.icon" v-if="item.icon" :class="styles.itemIcon()" />
              <Menu.ItemText>{{ item.label }}</Menu.ItemText>
              <span v-if="item.shortcut" :class="styles.itemShortcut()">{{ item.shortcut }}</span>
            </Menu.Item>
          </template>

          <!-- Use default slot for custom content -->
          <slot v-else />
        </Menu.Content>
      </Menu.Positioner>
    </Teleport>
  </Menu.Root>
</template>
