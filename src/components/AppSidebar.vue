<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { Dialog } from '@ark-ui/vue/dialog'
import { Collapsible } from '@ark-ui/vue/collapsible'
import {
  X,
  Home,
  ChevronRight,
  Boxes,
  Book,
  Info,
  Palette,
} from 'lucide-vue-next'
import { cn } from '@/lib/utils'

interface NavigationItem {
  name: string
  href?: string
  icon: unknown
  current: boolean
  children?: { name: string; href: string; current?: boolean }[]
}

interface Team {
  id: number
  name: string
  href: string
  initial: string
  current: boolean
}

interface Props {
  open?: boolean
  navigation?: NavigationItem[]
  teams?: Team[]
}

const props = withDefaults(defineProps<Props>(), {
  open: false,
  navigation: () => [
    { name: 'Home', href: '/', icon: Home, current: true },
    { name: 'About', href: '/about', icon: Info, current: false },
    { name: 'Component Showcase', href: '/showcase', icon: Palette, current: false },
    { name: 'Theme Demo', href: '/theme', icon: Palette, current: false },
    {
      name: 'Storybook',
      icon: Boxes,
      current: false,
      href: 'http://localhost:6007',
    },
    {
      name: 'Documentation',
      icon: Book,
      current: false,
      children: [
        { name: 'Getting Started', href: 'https://github.com/blakeing/facts-ark/blob/main/docs/GETTING_STARTED_CLOSED_COMPONENTS.md' },
        { name: 'Component Architecture', href: 'https://github.com/blakeing/facts-ark/blob/main/docs/COMPONENT_ARCHITECTURE.md' },
        { name: 'Component Folder Structure', href: 'https://github.com/blakeing/facts-ark/blob/main/docs/COMPONENT_FOLDER_STRUCTURE.md' },
        { name: 'Closed Components', href: 'https://github.com/blakeing/facts-ark/blob/main/docs/CLOSED_COMPONENTS.md' },
        { name: 'Tailwind Variants', href: 'https://github.com/blakeing/facts-ark/blob/main/docs/TAILWIND_VARIANTS.md' },
        { name: 'CN Utility', href: 'https://github.com/blakeing/facts-ark/blob/main/docs/CN_UTILITY_GUIDE.md' },
        { name: 'Select Component', href: 'https://github.com/blakeing/facts-ark/blob/main/docs/SELECT_COMPONENT.md' },
      ],
    },
  ],
  teams: () => [
    { id: 1, name: 'Planetaria', href: '#', initial: 'P', current: false },
    { id: 2, name: 'Protocol', href: '#', initial: 'P', current: false },
    { id: 3, name: 'Tailwind Labs', href: '#', initial: 'T', current: false },
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
                            <a
                              :href="subItem.href"
                              :class="cn(
                                'block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-foreground transition-colors-smooth hover-scale focus-ring',
                                subItem.current ? 'bg-muted font-medium' : 'hover:bg-muted'
                              )"
                            >
                              {{ subItem.name }}
                            </a>
                          </li>
                        </ul>
                      </Collapsible.Content>
                    </Collapsible.Root>
                  </li>
                </ul>
              </li>
              <li>
                <div class="text-xs font-semibold leading-6 text-muted-foreground">Your teams</div>
                <ul role="list" class="-mx-2 mt-2 space-y-1">
                  <li v-for="team in teams" :key="team.name">
                    <a
                      :href="team.href"
                      :class="cn(
                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors-smooth focus-ring active:scale-[0.98]',
                        team.current
                          ? 'bg-primary text-primary-foreground shadow-sm'
                          : 'text-foreground hover:bg-muted'
                      )"
                    >
                      <span
                        :class="cn(
                          'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-background text-[0.625rem] font-medium transition-all',
                          team.current
                            ? 'border-primary text-primary'
                            : 'border-border text-muted-foreground group-hover:border-primary group-hover:text-primary group-hover:scale-110'
                        )"
                      >
                        {{ team.initial }}
                      </span>
                      <span class="truncate">{{ team.name }}</span>
                    </a>
                  </li>
                </ul>
              </li>
              <li class="-mx-6 mt-auto">
                <a
                  href="#"
                  class="group flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-foreground hover:bg-muted transition-colors-smooth focus-ring active:scale-[0.98]"
                >
                  <img
                    class="size-8 rounded-full bg-muted outline -outline-offset-1 outline-border transition-transform group-hover:scale-110"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span class="sr-only">Your profile</span>
                  <span aria-hidden="true">Tom Cook</span>
                </a>
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
                        <a
                          :href="subItem.href"
                          :class="cn(
                            'block rounded-md py-2 pl-9 pr-2 text-sm leading-6 text-foreground transition-colors-smooth hover-scale focus-ring',
                            subItem.current ? 'bg-muted font-medium' : 'hover:bg-muted'
                          )"
                        >
                          {{ subItem.name }}
                        </a>
                      </li>
                    </ul>
                  </Collapsible.Content>
                </Collapsible.Root>
              </li>
            </ul>
          </li>
          <li>
            <div class="text-xs font-semibold leading-6 text-muted-foreground">Your teams</div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
              <li v-for="team in teams" :key="team.name">
                <a
                  :href="team.href"
                  :class="cn(
                    'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-colors-smooth focus-ring active:scale-[0.98]',
                    team.current
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-foreground hover:bg-muted'
                  )"
                >
                  <span
                    :class="cn(
                      'flex size-6 shrink-0 items-center justify-center rounded-lg border bg-background text-[0.625rem] font-medium transition-all',
                      team.current
                        ? 'border-primary text-primary'
                        : 'border-border text-muted-foreground group-hover:border-primary group-hover:text-primary group-hover:scale-110'
                    )"
                  >
                    {{ team.initial }}
                  </span>
                  <span class="truncate">{{ team.name }}</span>
                </a>
              </li>
            </ul>
          </li>
          <li class="-mx-6 mt-auto">
            <a
              href="#"
              class="group flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-foreground hover:bg-muted transition-colors-smooth focus-ring active:scale-[0.98]"
            >
              <img
                class="size-8 rounded-full bg-muted outline -outline-offset-1 outline-border transition-transform group-hover:scale-110"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
              <span class="sr-only">Your profile</span>
              <span aria-hidden="true">Tom Cook</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
