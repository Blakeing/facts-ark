# Building a Custom Design System with Vue 3

## Philosophy

**You're building your own design system** - this gives you:

- 🎨 Complete creative control
- 🚀 Lightweight bundle (only what you need)
- 🔧 Customization without fighting framework opinions
- 📚 Deep understanding of your components

## Current Stack (Perfect for Custom Systems)

### Core Technologies

1. **Ark UI** - Headless, accessible primitives
   - Provides behavior & accessibility
   - You control 100% of the styling
   - No opinions on design

2. **Tailwind CSS v4** - Utility-first styling
   - Modern features (container queries, cascade layers)
   - Direct CSS customization
   - No JS config needed

3. **Tailwind Variants** - Variant management
   - Type-safe component variants
   - Conflict resolution
   - Better than manual class concatenation

## What to Learn from Nuxt UI

### 1. Design Tokens Structure

**Instead of scattered CSS variables, organize by semantic meaning:**

```css
/* Current: Specific to sidebar */
--sidebar-background: oklch(0.985 0.002 285.75);
--sidebar-foreground: oklch(0.145 0.007 285.75);

/* Better: Semantic tokens that work everywhere */
:root {
  /* Base semantic colors */
  --ui-bg: oklch(1 0 0); /* Main background */
  --ui-bg-elevated: oklch(0.985 0 0); /* Cards, modals */
  --ui-bg-inverted: oklch(0.145 0 0); /* Dark surfaces */

  /* Text colors */
  --ui-text: oklch(0.145 0.007 285.75); /* Primary text */
  --ui-text-muted: oklch(0.556 0.016 285.75); /* Secondary text */
  --ui-text-dimmed: oklch(0.708 0.012 285.75); /* Tertiary text */

  /* Interactive states */
  --ui-primary: oklch(0.488 0.243 264.376); /* Primary actions */
  --ui-primary-hover: oklch(0.4 0.243 264.376);

  /* Surfaces */
  --ui-surface: oklch(0.985 0 0);
  --ui-surface-hover: oklch(0.97 0 0);

  /* Borders */
  --ui-border: oklch(0.922 0.004 285.75);
  --ui-border-strong: oklch(0.85 0.004 285.75);
}

.dark {
  --ui-bg: oklch(0.145 0 0);
  --ui-bg-elevated: oklch(0.205 0 0);
  --ui-text: oklch(0.985 0 0);
  /* ... etc */
}
```

### 2. Component Architecture with Tailwind Variants

**Use `tailwind-variants` for better component APIs:**

```bash
pnpm add tailwind-variants
```

```typescript
// src/lib/variants.ts
import { tv } from 'tailwind-variants'

export const button = tv({
  base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      solid: 'bg-[var(--ui-primary)] text-white hover:bg-[var(--ui-primary-hover)]',
      outline: 'border border-[var(--ui-border)] hover:bg-[var(--ui-surface-hover)]',
      ghost: 'hover:bg-[var(--ui-surface-hover)]',
      link: 'underline-offset-4 hover:underline',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})

export const sidebar = tv({
  slots: {
    root: 'flex h-full flex-col border-r bg-[var(--ui-bg-elevated)] transition-all duration-300',
    header: 'flex flex-col gap-2 p-2',
    content: 'flex min-h-0 flex-1 flex-col gap-2 overflow-auto',
    footer: 'flex flex-col gap-2 p-2',
    group: 'relative flex w-full min-w-0 flex-col p-2',
    groupLabel: 'flex h-8 items-center px-2 text-xs font-medium text-[var(--ui-text-muted)]',
  },
  variants: {
    collapsible: {
      icon: {
        root: 'w-16',
        groupLabel: 'hidden',
      },
      offcanvas: {
        root: 'w-64',
      },
    },
  },
  defaultVariants: {
    collapsible: 'offcanvas',
  },
})
```

**Then use in components:**

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { sidebar } from '@/lib/variants'

interface Props {
  collapsible?: 'icon' | 'offcanvas'
}

const props = withDefaults(defineProps<Props>(), {
  collapsible: 'offcanvas',
})

const classes = computed(() => sidebar({ collapsible: props.collapsible }))
</script>

<template>
  <aside :class="classes.root()">
    <div :class="classes.header()">
      <slot name="header" />
    </div>
    <div :class="classes.content()">
      <slot />
    </div>
    <div :class="classes.footer()">
      <slot name="footer" />
    </div>
  </aside>
</template>
```

### 3. Composable Patterns

**Better state management with composables:**

```typescript
// src/composables/useSidebar.ts
import { ref, computed, readonly, watch } from 'vue'
import { useMediaQuery, useStorage } from '@vueuse/core'

const SIDEBAR_STATE_KEY = 'sidebar:state'
const MOBILE_BREAKPOINT = 1024

export function useSidebar() {
  // Persistent state
  const isOpen = useStorage(SIDEBAR_STATE_KEY, true)
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
  const isOpenMobile = ref(false)

  // Computed state
  const state = computed(() => {
    if (isMobile.value) {
      return isOpenMobile.value ? 'expanded' : 'collapsed'
    }
    return isOpen.value ? 'expanded' : 'collapsed'
  })

  // Actions
  const toggle = () => {
    if (isMobile.value) {
      isOpenMobile.value = !isOpenMobile.value
    } else {
      isOpen.value = !isOpen.value
    }
  }

  const open = () => {
    if (isMobile.value) {
      isOpenMobile.value = true
    } else {
      isOpen.value = true
    }
  }

  const close = () => {
    if (isMobile.value) {
      isOpenMobile.value = false
    } else {
      isOpen.value = false
    }
  }

  // Close mobile sidebar when switching to desktop
  watch(isMobile, (mobile) => {
    if (!mobile) {
      isOpenMobile.value = false
    }
  })

  return {
    // State
    isOpen: readonly(isOpen),
    isMobile: readonly(isMobile),
    isOpenMobile: readonly(isOpenMobile),
    state: readonly(state),

    // Actions
    toggle,
    open,
    close,
  }
}
```

### 4. Type-Safe Configuration

**Create a design system config:**

```typescript
// app.config.ts
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'blue',
      neutral: 'slate',
      success: 'green',
      warning: 'yellow',
      error: 'red',
    },

    sidebar: {
      width: '16rem',
      widthCollapsed: '4rem',
    },

    transitions: {
      duration: '300ms',
    },
  },
})

// Use in components
const appConfig = useAppConfig()
const sidebarWidth = appConfig.ui.sidebar.width
```

## Your Custom Design System Structure

```
src/
├── lib/
│   ├── variants.ts          # Tailwind Variants definitions
│   └── utils.ts             # cn() helper, etc.
│
├── composables/
│   ├── useSidebar.ts        # Sidebar state management
│   ├── useToast.ts          # Toast notifications
│   └── useTheme.ts          # Dark mode, themes
│
├── components/ui/
│   ├── sidebar/             # Your custom sidebar (keep current)
│   ├── button/              # Custom button variants
│   ├── input/               # Custom form inputs
│   └── ...                  # Other primitives
│
├── assets/
│   └── design-tokens.css    # Semantic design tokens
│
└── app.config.ts            # Type-safe config
```

## Next Steps for Your Custom System

1. **Install Tailwind Variants**

   ```bash
   pnpm add tailwind-variants
   ```

2. **Refactor current sidebar to use TV**
   - Convert class strings to variant definitions
   - Add proper TypeScript types
   - Improve composable structure

3. **Establish design tokens**
   - Migrate from component-specific colors to semantic tokens
   - Define spacing, typography, shadows scales

4. **Build component library gradually**
   - Button, Input, Select (most used)
   - Form components
   - Feedback components (Toast, Modal)
   - Data display (Table, Card)

5. **Document your system**
   - Component examples
   - Design guidelines
   - Usage patterns

## Benefits of Your Approach

✅ **Ownership** - Every line of code is yours
✅ **Flexibility** - Change anything without fighting a framework
✅ **Performance** - Only bundle what you actually use
✅ **Learning** - Deep understanding of component architecture
✅ **Unique** - Your brand, your rules

## When to Consider a Library

Consider switching to Nuxt UI if:

- You need 50+ components quickly
- Team prefers pre-built solutions
- Design system is low priority
- You want to customize Nuxt UI's base

---

**You're on the right track with Ark UI + Tailwind v4!** 🎯

Keep your current components, just improve them with:

- Tailwind Variants for better APIs
- Semantic design tokens
- Better composable patterns
