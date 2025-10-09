<script setup lang="ts">
import { ref } from 'vue'

// Simple toggle demo
const showSimple = ref(false)

// List demo
interface ListItem {
  id: number
  name: string
}

const items = ref<ListItem[]>([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
])

let nextId = 4
const addItem = () => {
  items.value.push({ id: nextId, name: `Item ${nextId}` })
  nextId++
}

const removeItem = (id: number) => {
  const index = items.value.findIndex(item => item.id === id)
  if (index > -1) items.value.splice(index, 1)
}

const shuffleItems = () => {
  items.value = [...items.value].sort(() => Math.random() - 0.5)
}

// Dialog demo
const showDialog = ref(false)

// Toast demo
interface Toast {
  id: number
  message: string
}

const toasts = ref<Toast[]>([])

let nextToastId = 1
const showToast = () => {
  const id = nextToastId++
  toasts.value.push({
    id,
    message: `Toast notification #${id}`,
  })

  setTimeout(() => {
    const index = toasts.value.findIndex(t => t.id === id)
    if (index > -1) toasts.value.splice(index, 1)
  }, 3000)
}

// Component switching demo
const currentTab = ref<'tab1' | 'tab2' | 'tab3'>('tab1')

// Code example
const codeExample = `<!-- Simple fade -->
<Transition name="fade">
  <div v-if="show">Content</div>
</Transition>

<!-- Scale (popover) -->
<Transition name="scale">
  <div v-if="show">Popover</div>
</Transition>

<!-- Dialog -->
<Transition name="dialog">
  <div v-if="show">Modal</div>
</Transition>

<!-- List with reordering -->
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item.id">
    &#x7B;&#x7B; item.name &#x7D;&#x7D;
  </li>
</TransitionGroup>

<!-- Component switching -->
<Transition name="fade" mode="out-in">
  <component :is="currentView" />
</Transition>`
</script>

<template>
  <div class="max-w-6xl mx-auto p-8 space-y-12">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold mb-2">Vue Transition API Demo</h1>
      <p class="text-muted-foreground">
        Demonstrating Vue's native <code>&lt;Transition&gt;</code> and
        <code>&lt;TransitionGroup&gt;</code>
      </p>
    </div>

    <!-- Simple Fade Transition -->
    <section class="border rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">1. Simple Fade Transition</h2>
      <p class="text-sm text-muted-foreground mb-4">
        Basic fade in/out using <code>&lt;Transition name="fade"&gt;</code>
      </p>

      <button
        @click="showSimple = !showSimple"
        class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
      >
        {{ showSimple ? 'Hide' : 'Show' }} Content
      </button>

      <Transition name="fade">
        <div v-if="showSimple" class="mt-4 p-4 bg-accent rounded-md">
          <p>This content fades in and out smoothly!</p>
        </div>
      </Transition>
    </section>

    <!-- Scale Transition -->
    <section class="border rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">2. Scale Transition (Popovers/Tooltips)</h2>
      <p class="text-sm text-muted-foreground mb-4">
        Scale animation using <code>&lt;Transition name="scale"&gt;</code>
      </p>

      <div class="relative inline-block">
        <button
          @click="showDialog = !showDialog"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          Toggle Popover
        </button>

        <Transition name="scale">
          <div
            v-if="showDialog"
            class="absolute top-full mt-2 left-0 p-4 bg-popover text-popover-foreground border rounded-md shadow-lg min-w-[200px] z-10"
          >
            <p class="font-medium mb-2">Popover Content</p>
            <p class="text-sm text-muted-foreground">This scales in smoothly!</p>
          </div>
        </Transition>
      </div>
    </section>

    <!-- Animated List -->
    <section class="border rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">3. Animated List (TransitionGroup)</h2>
      <p class="text-sm text-muted-foreground mb-4">
        List transitions with add/remove/reorder using
        <code>&lt;TransitionGroup name="list"&gt;</code>
      </p>

      <div class="flex gap-2 mb-4">
        <button
          @click="addItem"
          class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          Add Item
        </button>
        <button
          @click="shuffleItems"
          class="px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:opacity-90 transition-opacity"
        >
          Shuffle
        </button>
      </div>

      <TransitionGroup name="list" tag="ul" class="space-y-2">
        <li
          v-for="item in items"
          :key="item.id"
          class="flex items-center justify-between p-4 bg-accent rounded-md"
        >
          <span>{{ item.name }}</span>
          <button
            @click="removeItem(item.id)"
            class="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded hover:opacity-90 transition-opacity"
          >
            Remove
          </button>
        </li>
      </TransitionGroup>
    </section>

    <!-- Modal Dialog -->
    <section class="border rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">4. Modal Dialog</h2>
      <p class="text-sm text-muted-foreground mb-4">
        Backdrop and content transitions using separate
        <code>&lt;Transition&gt;</code> components
      </p>

      <button
        @click="showDialog = !showDialog"
        class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
      >
        Open Dialog
      </button>

      <!-- Backdrop -->
      <Transition name="fade">
        <div
          v-if="showDialog"
          class="fixed inset-0 bg-black/50 z-40"
          @click="showDialog = false"
        />
      </Transition>

      <!-- Dialog Content -->
      <Transition name="dialog">
        <div
          v-if="showDialog"
          class="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div
            class="bg-card text-card-foreground rounded-lg p-6 max-w-md w-full shadow-xl"
            @click.stop
          >
            <h3 class="text-xl font-bold mb-4">Dialog Title</h3>
            <p class="mb-6">
              This dialog uses separate transitions for the backdrop (fade) and content
              (dialog with scale).
            </p>
            <button
              @click="showDialog = false"
              class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
            >
              Close
            </button>
          </div>
        </div>
      </Transition>
    </section>

    <!-- Tab Switching -->
    <section class="border rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">5. Component Switching (Tabs)</h2>
      <p class="text-sm text-muted-foreground mb-4">
        Smooth tab transitions using <code>mode="out-in"</code>
      </p>

      <div class="flex gap-2 mb-4">
        <button
          v-for="tab in ['tab1', 'tab2', 'tab3'] as const"
          :key="tab"
          @click="currentTab = tab"
          :class="[
            'px-4 py-2 rounded-md transition-colors',
            currentTab === tab
              ? 'bg-primary text-primary-foreground'
              : 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          ]"
        >
          {{ tab.replace('tab', 'Tab ') }}
        </button>
      </div>

      <Transition name="fade" mode="out-in">
        <div :key="currentTab" class="p-6 bg-accent rounded-md">
          <h3 class="text-lg font-semibold mb-2">
            {{ currentTab.replace('tab', 'Tab ') }} Content
          </h3>
          <p>This is the content for {{ currentTab }}. Notice how it smoothly fades out before the next tab fades in.</p>
        </div>
      </Transition>
    </section>

    <!-- Toast Notifications -->
    <section class="border rounded-lg p-6">
      <h2 class="text-xl font-semibold mb-4">6. Toast Notifications</h2>
      <p class="text-sm text-muted-foreground mb-4">
        Stack of notifications with slide-fade transitions
      </p>

      <button
        @click="showToast"
        class="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
      >
        Show Toast
      </button>

      <div class="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
        <TransitionGroup name="slide-fade">
          <div
            v-for="toast in toasts"
            :key="toast.id"
            class="bg-card text-card-foreground shadow-lg rounded-lg p-4 border"
          >
            {{ toast.message }}
          </div>
        </TransitionGroup>
      </div>
    </section>

    <!-- Code Example -->
    <section class="border rounded-lg p-6 bg-muted/50">
      <h2 class="text-xl font-semibold mb-4">Quick Reference</h2>
      <pre class="bg-background p-4 rounded-md overflow-x-auto text-sm"><code>{{ codeExample }}</code></pre>
    </section>
  </div>
</template>

