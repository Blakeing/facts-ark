# Animations & Transitions Guide

This guide covers the comprehensive animation and transition system in Facts Ark, including both CSS utilities and Vue's native transition APIs.

## Overview

Facts Ark uses a hybrid approach to animations:

- **CSS Utilities**: For static animations (hover, focus, loading states)
- **Vue Transitions**: For reactive state changes (v-if, v-show, component switching)

## CSS Animation System

### Animation Utilities

| Utility                       | What It Does                                  |
| ----------------------------- | --------------------------------------------- |
| `transition-colors-smooth`    | Smooth color transitions (200ms ease-out)     |
| `transition-transform-smooth` | Smooth transform transitions (200ms ease-out) |
| `transition-smooth`           | Smooth transitions for all properties         |
| `animate-fade-in`             | Fade in animation (200ms)                     |
| `active:scale-[0.98]`         | Subtle scale down on press                    |
| `active:scale-95`             | Scale down on press                           |

### Focus System

| Utility              | What It Does                                     |
| -------------------- | ------------------------------------------------ |
| `focus-ring`         | Consistent focus ring (2px ring with 4px offset) |
| `focus-ring-inset`   | Inset focus ring (for filled elements)           |
| `focus-ring-primary` | Focus ring with primary color                    |

### Hover Effects

| Utility          | What It Does                          |
| ---------------- | ------------------------------------- |
| `hover-lift`     | Lifts element up with shadow on hover |
| `hover-scale`    | Scales element slightly on hover      |
| `hover-brighten` | Brightens element on hover            |
| `hover-glow`     | Adds glow effect on hover             |

## Vue Transition System

### When to Use Vue Transitions

#### ✅ Use `<Transition>` for:

1. **Conditional rendering** (v-if/v-show)
2. **Dialog/Modal enter-exit**
3. **Route transitions**
4. **Dynamic component switching**
5. **Toast/notification appearances**

#### ✅ Use `<TransitionGroup>` for:

1. **List rendering with v-for**
2. **Adding/removing items**
3. **List reordering**
4. **Animated grids**

#### ❌ Use CSS utilities instead for:

1. **Hover effects** - Use `.hover-lift`, `.hover-scale`
2. **Loading states** - Use `.skeleton`, `.animate-shimmer`
3. **Focus states** - Use `.focus-ring`
4. **Static entrance animations** - Use `.animate-fade-in`

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

## Component Animation Updates

### Updated Components Summary

| Component | Transitions | Focus | Active | Hover         |
| --------- | ----------- | ----- | ------ | ------------- |
| Button    | ✅          | ✅    | ✅     | ✅            |
| Input     | ✅          | ✅    | -      | -             |
| Card      | ✅          | -     | -      | ✅ (optional) |
| Checkbox  | ✅          | ✅    | ✅     | -             |
| Switch    | ✅          | ✅    | ✅     | -             |
| Textarea  | ✅          | ✅    | -      | -             |

### Button Component Updates

**Changes**:

- ✅ Replaced `transition-colors` with `transition-colors-smooth`
- ✅ Replaced custom focus styles with `focus-ring` utility
- ✅ Added `active:scale-[0.98]` for press feedback

**Result**: Buttons now have smooth color transitions, consistent focus rings, and satisfying press feedback!

### Card Component Updates

**Changes**:

- ✅ Added `transition-smooth` for smooth animations
- ✅ Added new `interactive` prop with `hover-lift` effect
- ✅ Added `cursor-pointer` when interactive

**Result**: Cards can now optionally lift on hover for interactive use cases!

**New Usage**:

```vue
<!-- Regular card -->
<Card>Static content</Card>

<!-- Interactive card (lifts on hover) -->
<Card interactive>
  Clickable content
</Card>
```

### Sidebar Animation Updates

**Navigation Links**:

- ✅ `transition-colors-smooth` for buttery smooth color transitions
- ✅ `focus-ring` for consistent, accessible focus states
- ✅ `active:scale-[0.98]` for satisfying press feedback
- ✅ `shadow-sm` on active items for depth
- ✅ Icons animate smoothly with `transition-colors-smooth`

**Collapsible Documentation Menu**:

- ✅ Enhanced slide + fade animation (`slide-in-from-top-2` / `slide-out-to-top-2`)
- ✅ Smooth chevron rotation with color change
- ✅ Submenu items have `hover-scale` effect
- ✅ Press feedback on trigger
- ✅ Icons animate on hover

**Teams Section**:

- ✅ Team initial badges scale up on hover (`scale-110`)
- ✅ Smooth border color transitions
- ✅ Press feedback on links
- ✅ Consistent focus rings

**Profile Link**:

- ✅ Avatar scales up on hover (`scale-110`)
- ✅ Smooth background transitions
- ✅ Press feedback
- ✅ Consistent focus ring

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

## Animation Guidelines

### When to Use Each Utility

1. **`transition-colors-smooth`**
   - Color changes (hover, focus, active states)
   - Background color changes
   - Border color changes
   - Text color changes

2. **`transition-transform-smooth`**
   - Position changes
   - Scale changes
   - Rotation changes

3. **`transition-smooth`**
   - Multiple property changes
   - Complex animations
   - When you're not sure (safe default)

4. **`focus-ring`**
   - All focusable elements
   - Buttons, inputs, textareas, checkboxes, switches
   - Links

5. **`hover-lift`**
   - Interactive cards
   - Clickable items in lists
   - Any element that should feel "pressable"

6. **`animate-fade-in`**
   - Page/view transitions
   - Modal/dialog appearances
   - Content that loads dynamically

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

### 6. **Combine Utilities**

```vue
<div class="transition-smooth hover-lift focus-ring">
  Multiple effects work together!
</div>
```

### 7. **Use Active States**

```vue
<button class="transition-colors-smooth active:scale-[0.98]">
  Press feedback makes it feel responsive!
</button>
```

### 8. **Stagger Animations**

```vue
<div class="animate-fade-in">Parent</div>
<div class="animate-fade-in" style="animation-delay: 100ms">Child 1</div>
<div class="animate-fade-in" style="animation-delay: 200ms">Child 2</div>
```

### 9. **Respect User Preferences**

All animations automatically respect `prefers-reduced-motion`! Users who prefer reduced motion will see instant transitions.

## Performance Tips

1. **Use `v-show` instead of `v-if`** for frequently toggled elements
2. **Avoid transitions on large lists** - limit to < 100 items
3. **Use `transform` and `opacity`** for hardware acceleration
4. **Disable transitions for reduced motion** (already handled in animations.css)

## Migration Path for Existing Components

For components currently using CSS animation utilities:

1. **Identify reactive state changes** - Where elements appear/disappear based on data
2. **Wrap with `<Transition>`** - Add appropriate transition wrapper
3. **Test thoroughly** - Ensure timing and easing feel right
4. **Keep CSS utilities** - For hover/focus/static animations

Example migration:

```vue
<!-- Before -->
<div v-if="isOpen" class="animate-fade-in">
  Content
</div>

<!-- After -->
<Transition name="fade">
  <div v-if="isOpen">
    Content
  </div>
</Transition>
```

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

## Resources

- [Vue Transition Docs](https://vuejs.org/guide/built-ins/transition.html)
- [TransitionGroup Docs](https://vuejs.org/guide/built-ins/transition-group.html)
- [Live Demo](http://localhost:5173/transitions)
- Animation System: `src/assets/animations.css`
