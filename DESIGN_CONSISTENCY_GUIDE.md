# 🎨 Design Consistency Guide

## What We Just Added

You now have a **complete design system** for building consistent, professional UIs!

---

## ✨ New Features

### 1. **Animation & Transition System**

File: `src/assets/animations.css`

#### Transitions

```vue
<!-- Smooth color transitions -->
<button class="transition-colors-smooth bg-primary hover:bg-primary/90">
  Hover Me
</button>

<!-- Smooth transform -->
<div class="transition-transform-smooth hover:scale-105">
  Scale on hover
</div>
```

#### Animations

```vue
<!-- Fade in -->
<div class="animate-fade-in">Content</div>

<!-- Slide in from bottom -->
<div class="animate-slide-in-from-bottom">Modal</div>

<!-- Loading spinner -->
<div class="animate-spin">⭮</div>

<!-- Shake (for errors) -->
<div class="animate-shake">Error!</div>

<!-- Shimmer loading -->
<div class="animate-shimmer h-20 w-full"></div>
```

### 2. **Focus Ring System**

Accessible, consistent focus states

```vue
<!-- Standard focus ring -->
<button class="focus-ring">Button</button>

<!-- Inset focus ring (for filled elements) -->
<div class="focus-ring-inset">Card</div>

<!-- Primary-colored focus ring -->
<input class="focus-ring-primary" />
```

### 3. **Hover Effects**

```vue
<!-- Lift on hover (great for cards) -->
<Card class="hover-lift">Lifts up on hover</Card>

<!-- Scale on hover -->
<Button class="hover-scale">Scales slightly</Button>

<!-- Brighten on hover -->
<img class="hover-brighten" />

<!-- Glow effect -->
<div class="hover-glow">Glows on hover</div>
```

### 4. **Loading Skeletons**

```vue
<!-- Skeleton for text -->
<div class="skeleton skeleton-text"></div>

<!-- Skeleton for heading -->
<div class="skeleton skeleton-heading"></div>

<!-- Skeleton for avatar -->
<div class="skeleton skeleton-avatar"></div>

<!-- Skeleton for button -->
<div class="skeleton skeleton-button"></div>
```

### 5. **Design Patterns**

#### Empty State

```vue
<script setup>
import EmptyState from '@/components/patterns/EmptyState.vue'
import { Inbox } from 'lucide-vue-next'
</script>

<template>
  <EmptyState
    :icon="Inbox"
    title="No messages yet"
    description="Start a conversation to see messages here"
    action-label="New Message"
    @action="createMessage"
  />
</template>
```

#### Loading State

```vue
<script setup>
import LoadingState from '@/components/patterns/LoadingState.vue'
</script>

<template>
  <!-- Spinner variant (default) -->
  <LoadingState message="Loading your data..." />

  <!-- Skeleton variant -->
  <LoadingState variant="skeleton" />

  <!-- Pulse variant -->
  <LoadingState variant="pulse" size="lg" />
</template>
```

#### Error State

```vue
<script setup>
import ErrorState from '@/components/patterns/ErrorState.vue'
</script>

<template>
  <ErrorState
    title="Failed to load data"
    message="We couldn't fetch your data. Please check your connection and try again."
    @retry="fetchData"
  />
</template>
```

---

## 🎯 Design Consistency Checklist

### ✅ Colors

- [x] Use semantic tokens (`bg-primary`, `text-foreground`)
- [x] Use Tailwind colors for specific needs (`bg-blue-500`)
- [x] Consistent dark mode support
- [x] Theme switcher for easy customization

### ✅ Spacing

- [x] Use spacing scale (`p-4`, `m-6`, `gap-8`)
- [x] Consistent padding in components
- [x] Consistent margins between sections

### ✅ Typography

- [x] Heading hierarchy (`text-4xl`, `text-3xl`, `text-2xl`)
- [x] Body text (`text-base`)
- [x] Small text (`text-sm`, `text-xs`)
- [x] Consistent font weights

### ✅ Animations

- [x] Smooth transitions on all interactive elements
- [x] Fade in/out for appearing/disappearing content
- [x] Scale for dialogs and popovers
- [x] Shimmer for loading states
- [x] Shake for errors

### ✅ Focus States

- [x] Visible focus rings on all interactive elements
- [x] Accessible focus states
- [x] Consistent focus colors

### ✅ Hover States

- [x] Subtle feedback on all interactive elements
- [x] Consistent hover effects
- [x] Smooth transitions

### ✅ States

- [x] Empty states with clear CTAs
- [x] Loading states (spinner, skeleton, pulse)
- [x] Error states with retry options
- [x] Success feedback

---

## 📐 Design Principles

### 1. **Consistency**

Use the same patterns, colors, and spacing throughout the app.

```vue
<!-- ✅ Good: Consistent -->
<Button class="bg-primary text-primary-foreground">Save</Button>
<Button class="bg-primary text-primary-foreground">Submit</Button>

<!-- ❌ Bad: Inconsistent -->
<Button class="bg-primary text-primary-foreground">Save</Button>
<Button class="bg-blue-600 text-white">Submit</Button>
```

### 2. **Feedback**

Always provide visual feedback for user actions.

```vue
<!-- ✅ Good: Clear feedback -->
<button class="transition-colors-smooth bg-primary hover:bg-primary/90 active:bg-primary/80">
  Click Me
</button>

<!-- ❌ Bad: No feedback -->
<button class="bg-primary">Click Me</button>
```

### 3. **Accessibility**

Ensure all interactive elements are accessible.

```vue
<!-- ✅ Good: Accessible -->
<button class="focus-ring" aria-label="Close dialog">
  <X class="size-4" />
</button>

<!-- ❌ Bad: No focus state, no label -->
<button><X class="size-4" /></button>
```

### 4. **Loading States**

Show loading states for async operations.

```vue
<!-- ✅ Good: Shows loading -->
<div v-if="loading">
  <LoadingState message="Fetching data..." />
</div>
<div v-else-if="error">
  <ErrorState :message="error" @retry="fetchData" />
</div>
<div v-else>
  <!-- Data -->
</div>

<!-- ❌ Bad: No feedback -->
<div>
  {{ data }}
</div>
```

### 5. **Empty States**

Guide users when there's no content.

```vue
<!-- ✅ Good: Helpful empty state -->
<EmptyState
  v-if="items.length === 0"
  :icon="Inbox"
  title="No items yet"
  description="Create your first item to get started"
  action-label="Create Item"
  @action="createItem"
/>

<!-- ❌ Bad: Blank screen -->
<div v-if="items.length === 0"></div>
```

---

## 🎨 Component Checklist

When building a new component, ensure it has:

- [ ] **Semantic colors** (`bg-card`, `text-foreground`, etc.)
- [ ] **Smooth transitions** (`transition-colors-smooth`)
- [ ] **Focus ring** (`focus-ring` or `focus-ring-inset`)
- [ ] **Hover state** (brightness, scale, or color change)
- [ ] **Loading state** (if async)
- [ ] **Error state** (if can fail)
- [ ] **Empty state** (if shows lists/data)
- [ ] **Consistent spacing** (uses spacing scale)
- [ ] **Accessible** (aria labels, keyboard navigation)
- [ ] **Responsive** (works on mobile, tablet, desktop)
- [ ] **Dark mode support** (uses semantic tokens)

---

## 📚 Quick Reference

### Transitions

| Class                         | Duration | Use Case               |
| ----------------------------- | -------- | ---------------------- |
| `transition-fast`             | 150ms    | Quick feedback         |
| `transition-base`             | 200ms    | Default (recommended)  |
| `transition-slow`             | 300ms    | Deliberate transitions |
| `transition-colors-smooth`    | 200ms    | Color changes          |
| `transition-transform-smooth` | 200ms    | Movement               |

### Animations

| Class                          | Effect   | Use Case           |
| ------------------------------ | -------- | ------------------ |
| `animate-fade-in`              | Fade in  | Appearing content  |
| `animate-slide-in-from-bottom` | Slide up | Modals             |
| `animate-scale-in`             | Scale up | Popovers           |
| `animate-spin`                 | Rotate   | Loading spinners   |
| `animate-shake`                | Shake    | Error feedback     |
| `animate-pulse`                | Pulse    | Loading indicators |
| `animate-shimmer`              | Shimmer  | Loading skeletons  |

### Focus

| Class                | Effect        | Use Case           |
| -------------------- | ------------- | ------------------ |
| `focus-ring`         | Outer ring    | Buttons, links     |
| `focus-ring-inset`   | Inner ring    | Cards, containers  |
| `focus-ring-primary` | Primary color | Important elements |

### Hover

| Class            | Effect      | Use Case         |
| ---------------- | ----------- | ---------------- |
| `hover-lift`     | Lift up     | Cards            |
| `hover-scale`    | Scale up    | Buttons, images  |
| `hover-brighten` | Brighten    | Images           |
| `hover-glow`     | Glow effect | Special elements |

---

## 🚀 Next Steps

1. **Apply to existing components**
   - Add transitions to all interactive elements
   - Add focus rings to all focusable elements
   - Add hover effects to all clickable elements

2. **Use design patterns**
   - Replace blank loading states with `LoadingState`
   - Replace empty divs with `EmptyState`
   - Replace alert messages with `ErrorState`

3. **Audit for consistency**
   - Check all colors use semantic tokens
   - Check all spacing uses the scale
   - Check all text uses typography system

4. **Test accessibility**
   - Tab through all interactive elements
   - Check focus visibility
   - Test with screen readers

---

## 💡 Pro Tips

1. **Always animate state changes**

   ```vue
   <div v-if="isOpen" class="animate-fade-in">
     Content
   </div>
   ```

2. **Combine animations**

   ```vue
   <Dialog class="animate-scale-in">
     <div class="animate-fade-in" style="animation-delay: 100ms">
       Staggered content
     </div>
   </Dialog>
   ```

3. **Use semantic tokens + Tailwind colors**

   ```vue
   <Card class="bg-card border-border">
     <!-- Structure uses semantic tokens -->
     <div class="flex gap-2">
       <!-- Data uses Tailwind colors -->
       <div class="bg-blue-500 h-20 flex-1"></div>
       <div class="bg-purple-500 h-24 flex-1"></div>
     </div>
   </Card>
   ```

4. **Always provide feedback**
   - Loading states for async
   - Error messages for failures
   - Success messages for completions
   - Empty states for no data

---

**Your app now has a professional, consistent design system!** 🎉

Use this guide as a reference when building new features.
