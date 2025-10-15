<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Dialog } from '@ark-ui/vue/dialog'
import { Collapsible } from '@ark-ui/vue/collapsible'
import {
  X,
  Home,
  ChevronRight,
  Package,
  Book,
  Info,
  Palette,
  Sparkles,
  BookOpen,
  ExternalLink,
  CheckSquare,
  Workflow,
  FileCode,
} from 'lucide-vue-next'
import { cn } from '@/shared/lib/utils'

interface NavigationItem {
  name: string
  href?: string
  icon: unknown
  current: boolean
  children?: { name: string; href: string; external?: boolean }[]
}

interface Props {
  open?: boolean
  navigation?: NavigationItem[]
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  navigation: () => [
    { name: 'Dashboard', href: '/', icon: Home, current: true },
    { name: 'Components', href: '/components', icon: Package, current: false },
    { name: 'Showcase', href: '/showcase', icon: BookOpen, current: false },
    { name: 'Theme', href: '/theme', icon: Palette, current: false },
    { name: 'Transitions', href: '/transitions', icon: Sparkles, current: false },
    { name: 'Todos (FSD)', href: '/todos', icon: CheckSquare, current: false },
    { name: 'Unified Form', href: '/form-example', icon: FileCode, current: false },
    { name: 'Contact', href: '/about', icon: Info, current: false },
    {
      name: 'Documentation',
      icon: Book,
      current: false,
      children: [
        { name: 'Storybook', href: 'http://localhost:6007', external: true },
        { name: 'Getting Started', href: 'https://github.com/blakeing/facts-ark#readme', external: true },
        { name: 'Component Status', href: 'https://github.com/blakeing/facts-ark/blob/main/docs/MISSING_COMPONENTS.md', external: true },
      ],
    },
  ],
})

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit('update:open', value),
})
</script>

<template>
  <!-- Mobile sidebar -->
  <Dialog.Root v-model:open="isOpen">
    <Dialog.Backdrop
      class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-opacity duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 lg:hidden"
    />
    <Dialog.Positioner class="fixed inset-0 z-50 flex lg:hidden">
      <Dialog.Content
        class="relative mr-16 flex w-full max-w-xs flex-1 transform transition-transform duration-300 ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left"
      >
        <div class="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out">
          <Dialog.CloseTrigger class="-m-2.5 p-2.5">
            <span class="sr-only">Close sidebar</span>
            <X class="size-6 text-foreground" aria-hidden="true" />
          </Dialog.CloseTrigger>
        </div>

        <!-- Mobile sidebar content -->
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 border-r border-border">
          <div class="flex h-16 shrink-0 items-center">
            <span class="text-xl font-bold text-foreground">🎨 Facts Ark</span>
          </div>
          <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" class="-mx-2 space-y-1">
                  <li v-for="item in navigation" :key="item.name">
                    <RouterLink
                      v-if="!item.children && item.href"
                      :to="item.href"
                      :class="cn(
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors-smooth focus-ring active:scale-[0.98]',
                        item.current
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-foreground hover:bg-muted hover:text-foreground'
                      )"
                    >
                      <component
                        :is="item.icon"
                        :class="cn(
                          'size-6 shrink-0 transition-colors-smooth',
                          item.current
                            ? 'text-primary-foreground'
                            : 'text-muted-foreground group-hover:text-foreground'
                        )"
                        aria-hidden="true"
                      />
                      {{ item.name }}
                    </RouterLink>
                    <Collapsible.Root v-else>
                      <Collapsible.Trigger
                        :class="cn(
                          'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-foreground transition-colors-smooth focus-ring active:scale-[0.98]',
                          item.current ? 'bg-muted' : 'hover:bg-muted'
                        )"
                      >
                        <component :is="item.icon" class="size-6 shrink-0 text-muted-foreground transition-colors-smooth group-hover:text-foreground" aria-hidden="true" />
                        {{ item.name }}
                        <ChevronRight
                          class="ml-auto size-5 shrink-0 text-muted-foreground transition-all duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:text-foreground group-hover:text-foreground"
                          aria-hidden="true"
                        />
                      </Collapsible.Trigger>
                      <Collapsible.Content class="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
                        <ul class="mt-1 px-2 space-y-1">
                          <li v-for="subItem in item.children" :key="subItem.name">
                            <RouterLink
                              v-if="!subItem.external"
                              :to="subItem.href"
                              class="flex items-center gap-2 rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-foreground transition-colors-smooth hover-scale focus-ring hover:bg-muted"
                            >
                              {{ subItem.name }}
                            </RouterLink>
                            <a
                              v-else
                              :href="subItem.href"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="flex items-center gap-2 rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-foreground transition-colors-smooth hover-scale focus-ring hover:bg-muted"
                            >
                              {{ subItem.name }}
                              <ExternalLink class="size-3 text-muted-foreground ml-auto" />
                            </a>
                          </li>
                        </ul>
                      </Collapsible.Content>
                    </Collapsible.Root>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>

  <!-- Static desktop sidebar -->
  <div class="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-card px-6 border-r border-border">
      <div class="flex h-16 shrink-0 items-center">
        <span class="text-xl font-bold text-foreground">🎨 Facts Ark</span>
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <RouterLink
                  v-if="!item.children && item.href"
                  :to="item.href"
                  :class="cn(
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors-smooth focus-ring active:scale-[0.98]',
                    item.current
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-muted hover:text-foreground'
                  )"
                >
                  <component
                    :is="item.icon"
                    :class="cn(
                      'size-6 shrink-0 transition-colors-smooth',
                      item.current ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    )"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </RouterLink>
                <Collapsible.Root v-else>
                  <Collapsible.Trigger
                    :class="cn(
                      'group flex w-full items-center gap-x-3 rounded-md p-2 text-left text-sm font-semibold leading-6 text-foreground transition-colors-smooth focus-ring active:scale-[0.98]',
                      item.current ? 'bg-muted' : 'hover:bg-muted'
                    )"
                  >
                    <component :is="item.icon" class="size-6 shrink-0 text-muted-foreground transition-colors-smooth group-hover:text-foreground" aria-hidden="true" />
                    {{ item.name }}
                    <ChevronRight
                      class="ml-auto size-5 shrink-0 text-muted-foreground transition-all duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:text-foreground group-hover:text-foreground"
                      aria-hidden="true"
                    />
                  </Collapsible.Trigger>
                  <Collapsible.Content class="overflow-hidden data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2">
                    <ul class="mt-1 px-2 space-y-1">
                      <li v-for="subItem in item.children" :key="subItem.name">
                        <RouterLink
                          v-if="!subItem.external"
                          :to="subItem.href"
                          class="flex items-center gap-2 rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-foreground transition-colors-smooth hover-scale focus-ring hover:bg-muted"
                        >
                          {{ subItem.name }}
                        </RouterLink>
                        <a
                          v-else
                          :href="subItem.href"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="flex items-center gap-2 rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-foreground transition-colors-smooth hover-scale focus-ring hover:bg-muted"
                        >
                          {{ subItem.name }}
                          <ExternalLink class="size-3 text-muted-foreground ml-auto" />
                        </a>
                      </li>
                    </ul>
                  </Collapsible.Content>
                </Collapsible.Root>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
