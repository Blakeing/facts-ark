# Vue Transition API Guide

This guide explains when and how to use Vue's native `<Transition>` and `<TransitionGroup>` components alongside our CSS animation utilities.

## Philosophy: Hybrid Approach

- **Vue Transitions**: For reactive state changes (v-if, v-show, component switching)
- **CSS Utilities**: For static animations (hover, focus, loading states)

## When to Use Vue Transitions

### ✅ Use `<Transition>` for:

1. **Conditional rendering** (v-if/v-show)
2. **Dialog/Modal enter-exit**
3. **Route transitions**
4. **Dynamic component switching**
5. **Toast/notification appearances**

### ✅ Use `<TransitionGroup>` for:

1. **List rendering with v-for**
2. **Adding/removing items**
3. **List reordering**
4. **Animated grids**

### ❌ Use CSS utilities instead for:

1. **Hover effects** - Use `.hover-lift`, `.hover-scale`
2. **Loading states** - Use `.skeleton`, `.animate-shimmer`
3. **Focus states** - Use `.focus-ring`
4. **Static entrance animations** - Use `.animate-fade-in`

## Quick Reference

### Available Transition Names

```vue
<!-- Fade -->
<Transition name="fade">
  <div v-if="show">Content</div>
</Transition>

<!-- Scale (popovers, tooltips) -->
<Transition name="scale">
  <div v-if="show">Content</div>
</Transition>

<!-- Slide-fade (modals, dialogs) -->
<Transition name="slide-fade">
  <div v-if="show">Content</div>
</Transition>

<!-- Dialog (modals with backdrop) -->
<Transition name="dialog">
  <div v-if="show">Content</div>
</Transition>

<!-- Slide directions -->
<Transition name="slide-left">
  <div v-if="show">Content</div>
</Transition>

<Transition name="slide-right">
  <div v-if="show">Content</div>
</Transition>

<!-- Page transitions (routes) -->
<Transition name="page" mode="out-in">
  <component :is="currentView" />
</Transition>

<!-- List transitions -->
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item.id">{{ item }}</li>
</TransitionGroup>
```

## Practical Examples

### 1. Modal/Dialog Component

```vue
<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
</script>

<template>
  <button @click="isOpen = true">Open Dialog</button>

  <Transition name="fade">
    <div v-if="isOpen" class="fixed inset-0 bg-black/50 z-40" @click="isOpen = false" />
  </Transition>

  <Transition name="dialog">
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg p-6 max-w-md w-full" @click.stop>
        <h2 class="text-xl font-bold mb-4">Dialog Title</h2>
        <p>Dialog content goes here</p>
        <button @click="isOpen = false">Close</button>
      </div>
    </div>
  </Transition>
</template>
```

### 2. Animated List with Add/Remove

```vue
<script setup lang="ts">
import { ref } from 'vue'

const items = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
])

let nextId = 4
const addItem = () => {
  items.value.push({ id: nextId++, name: `Item ${nextId}` })
}

const removeItem = (id: number) => {
  const index = items.value.findIndex((item) => item.id === id)
  if (index > -1) items.value.splice(index, 1)
}
</script>

<template>
  <button @click="addItem">Add Item</button>

  <TransitionGroup name="list" tag="ul" class="space-y-2">
    <li
      v-for="item in items"
      :key="item.id"
      class="flex items-center justify-between p-4 bg-gray-100 rounded"
    >
      <span>{{ item.name }}</span>
      <button @click="removeItem(item.id)">Remove</button>
    </li>
  </TransitionGroup>
</template>
```

### 3. Toast Notifications

```vue
<script setup lang="ts">
import { ref } from 'vue'

interface Toast {
  id: number
  message: string
}

const toasts = ref<Toast[]>([])

let nextId = 1
const addToast = (message: string) => {
  const id = nextId++
  toasts.value.push({ id, message })

  setTimeout(() => {
    removeToast(id)
  }, 3000)
}

const removeToast = (id: number) => {
  const index = toasts.value.findIndex((t) => t.id === id)
  if (index > -1) toasts.value.splice(index, 1)
}
</script>

<template>
  <div class="fixed top-4 right-4 z-50 space-y-2">
    <TransitionGroup name="slide-fade">
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="bg-white shadow-lg rounded-lg p-4 min-w-[300px]"
      >
        {{ toast.message }}
      </div>
    </TransitionGroup>
  </div>
</template>
```

### 4. Route Transitions in Router

```typescript
// router/index.ts
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // your routes
  ],
})

export default router
```

```vue
<!-- App.vue -->
<template>
  <div id="app">
    <AppHeader />

    <Transition name="page" mode="out-in">
      <RouterView />
    </Transition>
  </div>
</template>
```

### 5. Conditional Component Switching

```vue
<script setup lang="ts">
import { ref, shallowRef } from 'vue'
import ComponentA from './ComponentA.vue'
import ComponentB from './ComponentB.vue'

const currentComponent = shallowRef(ComponentA)

const toggle = () => {
  currentComponent.value = currentComponent.value === ComponentA ? ComponentB : ComponentA
}
</script>

<template>
  <button @click="toggle">Switch Component</button>

  <Transition name="fade" mode="out-in">
    <component :is="currentComponent" />
  </Transition>
</template>
```

### 6. Appear Animation (Initial Render)

```vue
<template>
  <!-- Animate on first render -->
  <Transition name="fade" appear>
    <div class="hero-section">
      <h1>Welcome!</h1>
    </div>
  </Transition>
</template>
```

### 7. Dynamic Transition Names

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const direction = ref<'left' | 'right'>('right')
const currentIndex = ref(0)

const transitionName = computed(() => `slide-${direction.value}`)

const next = () => {
  direction.value = 'right'
  currentIndex.value++
}

const prev = () => {
  direction.value = 'left'
  currentIndex.value--
}
</script>

<template>
  <button @click="prev">Previous</button>
  <button @click="next">Next</button>

  <Transition :name="transitionName" mode="out-in">
    <div :key="currentIndex">Slide {{ currentIndex }}</div>
  </Transition>
</template>
```

## Advanced: JavaScript Hooks

For complex animations (e.g., with GSAP), use JavaScript hooks:

```vue
<script setup lang="ts">
import gsap from 'gsap'

const onEnter = (el: Element, done: () => void) => {
  gsap.from(el, {
    opacity: 0,
    y: -20,
    duration: 0.3,
    onComplete: done,
  })
}

const onLeave = (el: Element, done: () => void) => {
  gsap.to(el, {
    opacity: 0,
    y: 20,
    duration: 0.2,
    onComplete: done,
  })
}
</script>

<template>
  <Transition :css="false" @enter="onEnter" @leave="onLeave">
    <div v-if="show">Content</div>
  </Transition>
</template>
```

## Transition Modes

Use `mode` prop to control timing:

```vue
<!-- Exit first, then enter (recommended for most cases) -->
<Transition name="fade" mode="out-in">
  <component :is="currentView" />
</Transition>

<!-- Enter first, then exit (rarely used) -->
<Transition name="fade" mode="in-out">
  <component :is="currentView" />
</Transition>

<!-- Default: simultaneous (no mode) -->
<Transition name="fade">
  <component :is="currentView" />
</Transition>
```

## Best Practices

### 1. **Always provide keys for switching elements**

```vue
<!-- ❌ Bad: Vue can't track which element is which -->
<Transition name="fade">
  <div v-if="isA">Content A</div>
  <div v-else>Content B</div>
</Transition>

<!-- ✅ Good: Explicit keys -->
<Transition name="fade">
  <div v-if="isA" key="a">Content A</div>
  <div v-else key="b">Content B</div>
</Transition>
```

### 2. **Use mode="out-in" for component switching**

```vue
<Transition name="fade" mode="out-in">
  <component :is="currentView" />
</Transition>
```

### 3. **TransitionGroup requires unique keys**

```vue
<TransitionGroup name="list" tag="ul">
  <!-- ✅ Each item must have unique key -->
  <li v-for="item in items" :key="item.id">{{ item.name }}</li>
</TransitionGroup>
```

### 4. **Position leaving items for smooth list transitions**

```css
/* Already included in animations.css */
.list-leave-active {
  position: absolute;
}
```

### 5. **Use appear for initial render animations**

```vue
<Transition name="fade" appear>
  <div>Animates on first render</div>
</Transition>
```

## Performance Tips

1. **Use `v-show` instead of `v-if`** for frequently toggled elements
2. **Avoid transitions on large lists** - limit to < 100 items
3. **Use `transform` and `opacity`** for hardware acceleration
4. **Disable transitions for reduced motion** (already handled in animations.css)

## Summary

**Use Vue Transitions When:**

- Content appears/disappears based on state
- Lists change dynamically
- Routes change
- Components switch

**Use CSS Utilities When:**

- Hover/focus effects
- Loading states
- Static entrance animations
- No reactive state involved

The hybrid approach gives you the best of both worlds: automatic lifecycle management from Vue and a rich library of reusable animations from CSS.
