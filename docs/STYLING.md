# Styling Guide

This comprehensive guide covers all aspects of styling in Facts Ark, including our Ark-first philosophy, Tailwind CSS v4 theming ecosystem, Tailwind Variants, and the `cn()` utility.

## Table of Contents

1. [Styling Philosophy](#styling-philosophy)
2. [Tailwind CSS v4 Theming](#tailwind-css-v4-theming)
3. [Tailwind Variants](#tailwind-variants)
4. [CN Utility](#cn-utility)
5. [Park UI Integration](#park-ui-integration)
6. [Best Practices](#best-practices)

## Styling Philosophy

### 🎯 Core Principle

**Let Ark UI do what it does best. Add Tailwind only for essential visual polish.**

We've shifted from a 70/30 (Tailwind/Ark) approach to a **90/10 (Ark/Tailwind)** approach.

### Why This Matters

Ark UI provides:

- ✅ Built-in accessibility
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ State management via data attributes
- ✅ Proper ARIA attributes
- ✅ Browser-native behavior

When we override these with custom Tailwind styles, we risk:

- ❌ Breaking accessibility
- ❌ Inconsistent behavior
- ❌ More maintenance burden
- ❌ Fighting the framework

### What We Removed

#### ❌ Removed Custom Styles

**Focus Styles:**

```css
/* REMOVED - Let browser/Ark handle it */
focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
data-[focus]:ring-2 data-[focus]:ring-indigo-500 data-[focus]:ring-offset-2
```

**Animations & Transitions:**

```css
/* REMOVED - No unnecessary animations */
transition-colors duration-200
transition-transform data-[state=open]:rotate-180
data-[state=open]:animate-in data-[state=closed]:animate-out
fade-out-0 fade-in-0 zoom-out-95 zoom-in-95
```

**Complex Outline Systems:**

```css
/* REMOVED - Simple borders instead */
outline-1 -outline-offset-1 outline-gray-300
ring-1 ring-black/5
appearance-none
```

**Redundant State Styling:**

```css
/* REMOVED - Ark handles this */
data-[invalid]:outline-red-600
data-[placeholder-shown]:text-gray-500
data-[state=checked]:font-semibold
```

### What We Kept

#### ✅ Essential Styles Only

**Layout & Structure:**

```css
/* Keep - Basic positioning */
relative, absolute, flex, items-center, gap-2
w-full, h-full, size-5
px-3, py-2, rounded-md
```

**Minimal Visual Polish:**

```css
/* Keep - Simple borders and colors */
border border-gray-300
bg-white, text-gray-900
shadow-sm, shadow-lg
```

**Ark UI Data Attributes:**

```css
/* Keep - State management */
data-[highlighted]:bg-indigo-600
data-[disabled]:opacity-50
data-[state=checked]:bg-indigo-600
```

### Component-by-Component Approach

#### Interactive Components (Ark-Heavy)

**Select, Checkbox, Switch, Tabs**

- 90% Ark UI - Structure, behavior, states
- 10% Tailwind - Borders, colors, spacing

```typescript
// Minimal styling
control: 'rounded border border-gray-300 bg-white data-[disabled]:opacity-50'
```

#### Presentational Components (Tailwind-Heavy)

**Button, Badge, Avatar, Card**

- 70% Tailwind - Visual design
- 30% Ark UI - Basic structure (if applicable)

```typescript
// More custom styling is OK
button: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm'
```

### Guidelines

1. **Start with Ark UI Defaults**
2. **Add Only Essential Tailwind**
3. **Use Ark's Data Attributes**
4. **Avoid Custom Focus/Transitions**

### Benefits of This Approach

- ✅ Better Accessibility
- ✅ Less Code
- ✅ More Consistent
- ✅ Easier to Update

## Tailwind CSS v4 Theming

### What You Have Access To

You've unlocked Tailwind CSS v4's **full theming ecosystem** combined with Park UI's design system!

#### 🎯 Available Features:

1. **17 Color Scales** from Tailwind (slate, gray, zinc, blue, indigo, violet, purple, emerald, red, amber, teal, etc.)
2. **Park UI Semantic Tokens** (background, foreground, primary, etc.)
3. **Full Shade Range** (50-950) for every color
4. **Spacing Scale** (consistent padding, margin, gap)
5. **Typography Scale** (font sizes with line heights)
6. **Radius Tokens** (consistent border radius)
7. **Dark Mode Support** for all tokens
8. **Responsive Design** tokens and breakpoints

### Using Semantic Tokens (Recommended)

```vue
<template>
  <!-- ✅ Best Practice: Use semantic tokens for components -->
  <Card class="bg-card text-card-foreground border-border">
    <h2 class="text-foreground">Card Title</h2>
    <p class="text-muted-foreground">Card description</p>
    <Button class="bg-primary text-primary-foreground"> Click Me </Button>
  </Card>
</template>
```

**Why?** Semantic tokens automatically adapt to:

- Light/dark mode
- Theme changes
- Brand color updates

### Using Tailwind Color Scales (For Specific Needs)

```vue
<template>
  <!-- ✅ Great for data visualization, status indicators, specific colors -->
  <div class="space-y-4">
    <!-- Gradient background using Tailwind colors -->
    <div class="bg-gradient-to-r from-blue-500 to-violet-500 text-white p-6">
      Vibrant gradient heading
    </div>

    <!-- Status badges with specific colors -->
    <div class="flex gap-2">
      <span class="bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Active</span>
      <span class="bg-amber-100 text-amber-700 px-2 py-1 rounded">Pending</span>
      <span class="bg-red-100 text-red-700 px-2 py-1 rounded">Error</span>
    </div>
  </div>
</template>
```

### Complete Color Reference

#### Park UI Semantic Tokens

Based on [Radix Colors](https://www.radix-ui.com/colors), these tokens adapt to light/dark mode:

| Token                     | Light Mode | Dark Mode  | Usage                |
| ------------------------- | ---------- | ---------- | -------------------- |
| `bg-background`           | White      | Very Dark  | Main page background |
| `text-foreground`         | Very Dark  | Off-white  | Primary text         |
| `bg-card`                 | White      | Dark Gray  | Card backgrounds     |
| `text-card-foreground`    | Very Dark  | Off-white  | Card text            |
| `bg-primary`              | Indigo     | Light      | Primary actions      |
| `text-primary-foreground` | White      | Dark       | Primary button text  |
| `bg-secondary`            | Light Gray | Dark Gray  | Secondary actions    |
| `bg-muted`                | Light Gray | Dark Gray  | Subtle backgrounds   |
| `text-muted-foreground`   | Gray       | Light Gray | Secondary text       |
| `bg-accent`               | Light Gray | Dark Gray  | Accent elements      |
| `bg-destructive`          | Red        | Bright Red | Destructive actions  |
| `border-border`           | Light Gray | Very Dark  | All borders          |
| `ring-ring`               | Indigo     | Blue       | Focus rings          |

#### Tailwind Color Scales

All colors have 11 shades (50-950) in OKLCH format:

**Neutral Colors (For Text & Backgrounds)**

- `slate-*` - Cool gray (blue undertone)
- `gray-*` - True gray (balanced)
- `zinc-*` - Cooler gray (slightly blue)

**Brand Colors**

- `blue-*` - Bright blue (trust, tech)
- `indigo-*` - Blue-purple (your current primary)
- `violet-*` - Purple-blue (creative)
- `purple-*` - Vivid purple (luxury)

**Status Colors**

- `emerald-*` - Success/positive
- `red-*` - Error/danger
- `amber-*` - Warning/caution
- `teal-*` - Info/accent

### Advanced Theming Patterns

#### 1. Mixing Semantic + Tailwind Colors

```vue
<template>
  <!-- Card uses semantic tokens for consistency -->
  <Card class="bg-card border-border">
    <!-- Heading uses semantic token -->
    <h2 class="text-foreground">User Activity</h2>

    <!-- Chart uses specific Tailwind colors for clarity -->
    <div class="mt-4 flex gap-2">
      <div class="bg-blue-500 h-32 flex-1"></div>
      <div class="bg-purple-500 h-24 flex-1"></div>
      <div class="bg-teal-500 h-40 flex-1"></div>
    </div>
  </Card>
</template>
```

#### 2. Creating Color Variations

```vue
<template>
  <!-- Light to dark gradient using shade scale -->
  <div class="space-y-2">
    <div class="bg-blue-50 p-4">Lightest blue</div>
    <div class="bg-blue-100 p-4">Very light blue</div>
    <div class="bg-blue-200 p-4">Light blue</div>
    <div class="bg-blue-300 p-4">Medium-light blue</div>
    <div class="bg-blue-400 p-4">Medium blue</div>
    <div class="bg-blue-500 p-4 text-white">Base blue</div>
    <div class="bg-blue-600 p-4 text-white">Medium-dark blue</div>
    <div class="bg-blue-700 p-4 text-white">Dark blue</div>
    <div class="bg-blue-800 p-4 text-white">Very dark blue</div>
    <div class="bg-blue-900 p-4 text-white">Darkest blue</div>
    <div class="bg-blue-950 p-4 text-white">Extra dark blue</div>
  </div>
</template>
```

#### 3. Hover & State Variations

```vue
<template>
  <!-- Using shade scale for hover states -->
  <button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2">
    Hover me
  </button>

  <!-- Using semantic tokens for hover (adapts to theme) -->
  <button
    class="bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground px-4 py-2"
  >
    Themed button
  </button>
</template>
```

### Spacing & Layout Tokens

#### Using Spacing Scale

```vue
<template>
  <!-- Consistent spacing using tokens -->
  <div class="p-4 space-y-4">
    <!-- 4 = 1rem = 16px -->
    <div class="p-2">Small padding</div>
    <!-- 0.5rem = 8px -->
    <div class="p-4">Medium padding</div>
    <!-- 1rem = 16px -->
    <div class="p-6">Large padding</div>
    <!-- 1.5rem = 24px -->
    <div class="p-8">Extra large padding</div>
    <!-- 2rem = 32px -->
  </div>

  <!-- Gaps between flex/grid items -->
  <div class="flex gap-2">...</div>
  <!-- 8px gap -->
  <div class="flex gap-4">...</div>
  <!-- 16px gap -->
  <div class="flex gap-6">...</div>
  <!-- 24px gap -->
</template>
```

#### Radius Tokens

```vue
<template>
  <!-- Different border radii -->
  <div class="rounded-sm">Small rounded</div>
  <!-- radius-sm -->
  <div class="rounded-md">Medium rounded</div>
  <!-- radius-md -->
  <div class="rounded-lg">Large rounded</div>
  <!-- radius-lg -->
  <div class="rounded-xl">Extra large</div>
  <!-- radius-xl -->
  <div class="rounded-full">Circular</div>
  <!-- radius-full -->
</template>
```

### Typography Tokens

```vue
<template>
  <div class="space-y-4">
    <h1 class="text-4xl font-bold text-foreground">Heading 1</h1>
    <h2 class="text-3xl font-bold text-foreground">Heading 2</h2>
    <h3 class="text-2xl font-semibold text-foreground">Heading 3</h3>
    <h4 class="text-xl font-semibold text-foreground">Heading 4</h4>
    <p class="text-base text-foreground">Body text</p>
    <p class="text-sm text-muted-foreground">Small text</p>
    <p class="text-xs text-muted-foreground">Extra small text</p>
  </div>
</template>
```

### Responsive Design with Breakpoints

```vue
<template>
  <!-- Mobile-first responsive design -->
  <div class="p-4 sm:p-6 md:p-8 lg:p-12">
    <!-- Padding grows on larger screens -->
  </div>

  <!-- Responsive grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <!-- 1 column on mobile, 2 on tablet, 3 on desktop, 4 on large screens -->
    <Card>...</Card>
    <Card>...</Card>
    <Card>...</Card>
  </div>

  <!-- Responsive text -->
  <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Responsive heading</h1>
</template>
```

#### Breakpoints Reference

| Breakpoint     | Width   | Tailwind Prefix |
| -------------- | ------- | --------------- |
| Small          | ≥640px  | `sm:`           |
| Medium         | ≥768px  | `md:`           |
| Large          | ≥1024px | `lg:`           |
| Extra Large    | ≥1280px | `xl:`           |
| 2X Extra Large | ≥1536px | `2xl:`          |

### Decision Framework

#### When to use Semantic Tokens?

✅ Components that should adapt to theme  
✅ Text and backgrounds  
✅ Borders and dividers  
✅ Interactive elements (buttons, inputs)

#### When to use Tailwind Color Scales?

✅ Data visualization (charts, graphs)  
✅ Status indicators with specific meanings  
✅ Marketing/landing pages with brand colors  
✅ Decorative elements  
✅ Color pickers or swatches

#### When to use Both?

✅ Dashboard components (semantic structure + colored data)  
✅ Complex UIs (semantic base + accent colors)  
✅ Themed experiences (semantic for consistency + scale for variety)

## Tailwind Variants

### What is Tailwind Variants?

**Tailwind Variants** (`tv`) is a utility for creating type-safe, reusable component variants with Tailwind CSS. It's inspired by [Stitches](https://stitches.dev/) and provides a first-class API for defining component styling patterns.

### Why We Use the Lite Build

We use **`tailwind-variants/lite`** which is ~80% smaller and excludes the bundled class merging functionality:

```typescript
import { tv } from 'tailwind-variants/lite'
```

**Why lite?**

1. ✅ **Smaller bundle** - ~80% smaller than the full build
2. ✅ **No broken `cn`** - The full build has a [bug in v3.1](https://github.com/heroui-inc/tailwind-variants/issues/268)
3. ✅ **Perfect separation** - Use lite `tv()` for variants, custom `cn()` for merging
4. ✅ **No extra dependencies** - Just tailwind-variants

**For class merging**, we use our custom `cn` utility:

```typescript
import { cn } from '@/lib/utils' // Our proven implementation
```

### Basic Usage

#### Defining Variants

```typescript
import { tv } from 'tailwind-variants/lite'

const button = tv({
  base: 'font-semibold rounded-lg transition-colors',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white hover:bg-blue-600',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
      danger: 'bg-red-500 text-white hover:bg-red-600',
    },
    size: {
      sm: 'px-3 py-1 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

// Usage
button({ variant: 'danger', size: 'lg' })
// => 'font-semibold rounded-lg transition-colors bg-red-500 text-white hover:bg-red-600 px-6 py-3 text-lg'
```

#### Compound Variants

Combine multiple variant conditions:

```typescript
const button = tv({
  base: 'rounded-lg',
  variants: {
    variant: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500',
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg',
    },
    isIcon: {
      true: 'p-2',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      size: 'lg',
      class: 'shadow-lg', // Only when BOTH conditions match
    },
    {
      isIcon: true,
      size: ['sm', 'lg'], // Multiple values
      class: 'rounded-full',
    },
  ],
})
```

### Vue Component Pattern

#### Basic Component with Variants

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { tv } from 'tailwind-variants/lite'

const buttonVariants = tv({
  base: 'font-semibold rounded-lg',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
    size: {
      sm: 'px-3 py-1 text-sm',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
})

interface Props {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'lg'
}

const props = defineProps<Props>()

const buttonClass = computed(() =>
  buttonVariants({
    variant: props.variant,
    size: props.size,
  }),
)
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

#### With Custom Class Override

Use `cn` for allowing custom class overrides:

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { tv } from 'tailwind-variants/lite'
import { cn } from '@/lib/utils'

const buttonVariants = tv({
  base: 'font-semibold rounded-lg',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
  },
})

interface Props {
  variant?: 'primary' | 'secondary'
  class?: string
}

const props = defineProps<Props>()

const buttonClass = computed(() =>
  cn(
    buttonVariants({ variant: props.variant }),
    props.class, // Allow custom overrides
  ),
)
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

### Multi-Part Components (Slots)

For complex components with multiple parts:

```typescript
import { tv } from 'tailwind-variants/lite'

const card = tv({
  slots: {
    base: 'rounded-lg border',
    header: 'border-b p-4',
    body: 'p-4',
    footer: 'border-t p-4',
  },
  variants: {
    variant: {
      default: {
        base: 'bg-white border-gray-200',
        header: 'border-gray-200',
        footer: 'border-gray-200',
      },
      elevated: {
        base: 'bg-white shadow-lg border-transparent',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

// Usage
const { base, header, body, footer } = card({ variant: 'elevated' })
```

#### In Vue Component

```vue
<script setup lang="ts">
import { tv } from 'tailwind-variants/lite'

const card = tv({
  slots: {
    base: 'rounded-lg p-6',
    title: 'text-xl font-bold',
    description: 'text-gray-600',
  },
})

const { base, title, description } = card()
</script>

<template>
  <div :class="base()">
    <h2 :class="title()">
      <slot name="title" />
    </h2>
    <p :class="description()">
      <slot />
    </p>
  </div>
</template>
```

### Component Composition

Extend existing variants:

```typescript
import { tv } from 'tailwind-variants/lite'

// Base button
const baseButton = tv({
  base: 'font-semibold rounded-lg',
  variants: {
    size: {
      sm: 'px-3 py-1',
      lg: 'px-6 py-3',
    },
  },
})

// Icon button extends base
const iconButton = tv({
  extend: baseButton,
  base: 'inline-flex items-center gap-2',
  variants: {
    icon: {
      left: 'flex-row',
      right: 'flex-row-reverse',
    },
  },
})
```

### TypeScript Integration

#### Extract Props Type

```typescript
import { tv, type VariantProps } from 'tailwind-variants/lite'

const button = tv({
  variants: {
    variant: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500',
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg',
    },
  },
})

// Extract variant types
type ButtonVariants = VariantProps<typeof button>
// => { variant?: 'primary' | 'secondary', size?: 'sm' | 'lg' }

interface ButtonProps extends ButtonVariants {
  class?: string
  disabled?: boolean
}
```

#### In Vue (Separate Type File)

Due to Vue compiler limitations, define types in separate files:

```typescript
// button.types.ts
export interface ButtonProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'lg'
  class?: string
}
```

```vue
<!-- Button.vue -->
<script setup lang="ts">
import { tv } from 'tailwind-variants/lite'
import type { ButtonProps } from './button.types'

const buttonVariants = tv({
  variants: {
    variant: {
      primary: 'bg-blue-500',
      secondary: 'bg-gray-500',
    },
    size: {
      sm: 'text-sm',
      lg: 'text-lg',
    },
  },
})

const props = defineProps<ButtonProps>()
</script>
```

### Best Practices

#### ✅ DO

```typescript
// Define variants outside component (module level)
const buttonVariants = tv({ /* ... */ })

export default function MyComponent() {
  // Use in component
}

// Use descriptive variant names
variants: {
  variant: { primary, secondary, danger },
  size: { sm, md, lg },
}

// Provide default variants
defaultVariants: {
  variant: 'primary',
  size: 'md',
}

// Use compound variants for complex conditions
compoundVariants: [
  { variant: 'primary', size: 'lg', class: 'shadow-xl' }
]
```

#### ❌ DON'T

```typescript
// Don't define tv() inside component (re-created on every render)
export default function MyComponent() {
  const variants = tv({ /* ... */ }) // ❌
}

// Don't use generic variant names
variants: {
  type: { type1, type2 }, // ❌ Use descriptive names
}

// Don't forget default variants
tv({
  variants: { size: { sm, lg } }
  // ❌ No defaultVariants - requires size prop always
})
```

### Common Patterns

#### Pattern 1: Button with States

```typescript
const button = tv({
  base: 'font-semibold rounded-lg transition-all',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed',
      false: 'hover:scale-105',
    },
    isLoading: {
      true: 'cursor-wait',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      isDisabled: false,
      class: 'hover:bg-blue-600',
    },
  ],
})
```

#### Pattern 2: Responsive Variants

```typescript
const container = tv({
  base: 'container mx-auto',
  variants: {
    padding: {
      none: 'px-0',
      sm: 'px-4',
      md: 'px-6 md:px-8',
      lg: 'px-8 md:px-12 lg:px-16',
    },
  },
})
```

#### Pattern 3: Theme-Aware Components

```typescript
const card = tv({
  base: 'rounded-lg p-6',
  variants: {
    theme: {
      light: 'bg-white text-gray-900',
      dark: 'bg-gray-900 text-white',
    },
    bordered: {
      true: 'border',
      false: 'shadow-lg',
    },
  },
  compoundVariants: [
    {
      theme: 'light',
      bordered: true,
      class: 'border-gray-200',
    },
    {
      theme: 'dark',
      bordered: true,
      class: 'border-gray-700',
    },
  ],
})
```

## CN Utility

### What is `cn()`?

The `cn()` function is a **custom utility** that combines **clsx** + **tailwind-merge** for intelligent class name management.

```typescript
// Import from our utility file
import { cn } from '@/lib/utils'

// Usage
cn('px-2 py-1', 'px-4') // => 'py-1 px-4' (conflict resolved)
cn('text-red-500', condition && 'text-blue-500') // conditional classes
cn(['flex', 'items-center'], { 'justify-center': centered }) // arrays & objects
```

### ⚠️ Why Not Use `tailwind-variants` Built-in `cn`?

While `tailwind-variants` has a built-in `cn` function, **version 3.1.1 has a critical bug**:

According to [GitHub Issue #268](https://github.com/heroui-inc/tailwind-variants/issues/268):

> **The `cn` function returns a function instead of a string!**
>
> ```javascript
> // ❌ BROKEN in v3.1.1
> cn('bg-red-500', 'text-white') // Returns a function!
>
> // Workaround (but don't do this):
> cn('bg-red-500', 'text-white')({ twMerge: true })
> ```

**Our Solution**: Use a proven custom implementation until the bug is fixed.

#### Implementation

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Why Use `cn()`?

#### 1. **Conditional Classes**

```typescript
// ❌ Messy string concatenation
const classes = 'btn ' + (isActive ? 'btn-active' : '') + ' ' + (disabled ? 'opacity-50' : '')

// ✅ Clean with cn()
const classes = cn('btn', isActive && 'btn-active', disabled && 'opacity-50')
```

#### 2. **Automatic Conflict Resolution**

```typescript
// Without cn() - both classes applied! 🐛
<div class="px-2 px-4"> // Results in: "px-2 px-4" (both applied!)

// With cn() - conflicts resolved! ✅
cn('px-2', 'px-4') // Results in: "px-4" (px-2 removed)
```

#### 3. **Multiple Input Types**

```typescript
cn(
  'base-class', // string
  ['array', 'of', 'classes'], // array
  { conditional: true }, // object
  condition && 'maybe-class', // conditional
  undefined, // ignored
  null, // ignored
)
```

### When to Use What?

#### Use `tv()` (Tailwind Variants) for:

✅ Component variant definitions  
✅ Centralized component styling  
✅ Type-safe variants with `VariantProps`

```typescript
import { tv } from 'tailwind-variants'

const button = tv({
  base: 'font-semibold rounded-lg',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
    size: {
      sm: 'px-3 py-1 text-sm',
      lg: 'px-6 py-3 text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
})

// Usage
button({ variant: 'secondary', size: 'lg' })
```

#### Use `cn()` for:

✅ Runtime class composition  
✅ Overriding component styles  
✅ Conditional styling logic

```typescript
import { cn } from '@/lib/utils'

// In component
<div className={cn(
  'base-styles',
  isActive && 'active-styles',
  props.className // Allow overrides
)} />
```

### Common Patterns

#### Pattern 1: Component with Class Override

```vue
<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  variant?: 'default' | 'primary'
  class?: string
}

const props = defineProps<Props>()

const baseClasses = 'px-4 py-2 rounded-lg'
const variantClasses = {
  default: 'bg-gray-100 text-gray-900',
  primary: 'bg-blue-500 text-white',
}
</script>

<template>
  <button :class="cn(baseClasses, variantClasses[variant || 'default'], props.class)">
    <slot />
  </button>
</template>
```

#### Pattern 2: Conditional Styling

```vue
<script setup lang="ts">
import { cn } from '@/lib/utils'

interface Props {
  active?: boolean
  disabled?: boolean
  loading?: boolean
}

const props = defineProps<Props>()
</script>

<template>
  <button
    :class="
      cn(
        'px-4 py-2 rounded-lg',
        'bg-blue-500 text-white',
        'hover:bg-blue-600',
        active && 'ring-2 ring-blue-300',
        disabled && 'opacity-50 cursor-not-allowed',
        loading && 'animate-pulse',
      )
    "
  >
    <slot />
  </button>
</template>
```

#### Pattern 3: Merging with `tv()` Output

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { tv } from 'tailwind-variants'
import { cn } from '@/lib/utils'

const button = tv({
  base: 'px-4 py-2 rounded-lg',
  variants: {
    variant: {
      primary: 'bg-blue-500 text-white',
      secondary: 'bg-gray-200 text-gray-900',
    },
  },
})

interface Props {
  variant?: 'primary' | 'secondary'
  class?: string
}

const props = defineProps<Props>()

const buttonClass = computed(() => cn(button({ variant: props.variant }), props.class))
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

### How It Works

The `cn()` utility performs two operations:

1. **`clsx`**: Handles conditional class application
2. **`tailwind-merge`**: Resolves Tailwind CSS conflicts

```typescript
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

#### Class Merging Rules

Tailwind-merge intelligently resolves conflicts:

```typescript
// Last value wins for the same property
cn('px-2', 'px-4') // => 'px-4'
cn('text-sm', 'text-lg') // => 'text-lg'
cn('bg-red-500', 'bg-blue-500') // => 'bg-blue-500'

// Different properties are kept
cn('px-2', 'py-4') // => 'px-2 py-4'
cn('text-sm', 'font-bold') // => 'text-sm font-bold'

// Modifiers are respected
cn('hover:bg-blue-500', 'hover:bg-red-500') // => 'hover:bg-red-500'
cn('md:px-4', 'lg:px-8') // => 'md:px-4 lg:px-8'
```

### Best Practices

#### ✅ DO

```typescript
// Use for dynamic classes
cn('base', condition && 'conditional')

// Use for overriding styles
cn(defaultClasses, props.className)

// Use with arrays and objects
cn(['flex', 'items-center'], { hidden: !visible })

// Spread classes logically
cn(
  'base-classes',
  variant === 'primary' && 'primary-classes',
  variant === 'secondary' && 'secondary-classes',
  props.class,
)
```

#### ❌ DON'T

```typescript
// Don't use for static classes only
cn('px-4 py-2') // Just use the string directly

// Don't nest cn() calls unnecessarily
cn(cn('px-4'), cn('py-2')) // Use: cn('px-4', 'py-2')

// Don't compute classes on every render unnecessarily
// Bad:
<div :class="cn(baseClasses, activeClasses)" />

// Better (if complex):
const computedClasses = computed(() => cn(baseClasses, activeClasses))
<div :class="computedClasses" />
```

## Park UI Integration

### Quick Start (5 Minutes)

#### Step 1: Switch to Park UI Config

```bash
# Backup current config
mv tailwind.config.ts tailwind.config.old.ts

# Use new Park UI-inspired config
mv tailwind.config.park.ts tailwind.config.ts
```

#### Step 2: Update Your CSS Imports

Edit `src/assets/main.css`:

```css
@import './base.css';
@import './park-ui-tokens.css'; /* ADD THIS LINE */
```

#### Step 3: Choose Your Brand Color

Edit `src/assets/park-ui-tokens.css` (line 28-42):

```css
/* Uncomment your preferred color: */
--primary: 221.2 83.2% 53.3%; /* Indigo (default) */
/* --primary: 217.2 91.2% 59.8%; */ /* Blue */
/* --primary: 262.1 83.3% 57.8%; */ /* Violet */
/* --primary: 142.1 76.2% 36.3%; */ /* Green */
```

#### Step 4: Test It

```bash
pnpm storybook
```

Navigate to `UI/Button` and see your new Park UI-inspired button variants!

### What You Just Got

✅ **Button component** - Updated with Park UI variants (solid, outline, ghost, link, destructive)  
✅ **5 sizes** - xs, sm, md, lg, xl (was only 3)  
✅ **Semantic tokens** - professional color system  
✅ **Focus states** - proper accessibility  
✅ **Design system** - ready to scale

### Next: Update More Components

Follow this pattern for each component:

1. **Visit Park UI** - `https://park-ui.com/docs/components/[component-name]`
2. **Look at Their Variants** - Study their design decisions (variants, sizes, spacing)
3. **Update Your `.variants.ts`** - Port their design to Tailwind classes using semantic tokens
4. **Use Semantic Tokens** - Instead of hardcoded colors, use semantic tokens
5. **Test in Storybook** - Verify visual consistency

### Example: Updating Input Component

```typescript
// src/components/ui/input/input.variants.ts
import { tv } from 'tailwind-variants'

export const inputVariants = tv({
  base: [
    'flex h-10 w-full rounded-md border border-input',
    'bg-background px-3 py-2',
    'text-sm text-foreground',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  variants: {
    size: {
      sm: 'h-9 px-2 text-xs',
      md: 'h-10 px-3 text-sm',
      lg: 'h-11 px-4 text-base',
    },
    variant: {
      default: '',
      error: 'border-destructive focus-visible:ring-destructive',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})
```

### Key Semantic Tokens

| Token         | Usage                     | Example                  |
| ------------- | ------------------------- | ------------------------ |
| `primary`     | Brand color, main actions | Buttons, links           |
| `secondary`   | Alternative actions       | Secondary buttons        |
| `destructive` | Danger/delete actions     | Delete buttons, errors   |
| `muted`       | Subtle backgrounds        | Disabled states, hints   |
| `accent`      | Hover states              | Button hover, menu hover |
| `border`      | All borders               | Cards, inputs, dividers  |
| `input`       | Input borders             | Form fields              |
| `ring`        | Focus indicators          | Focus rings              |

### Recommended Update Order

#### Week 1 (Core)

- [x] Button ← Done!
- [ ] Input
- [ ] Card

#### Week 2 (Forms)

- [ ] Select
- [ ] Checkbox
- [ ] Switch
- [ ] Textarea

#### Week 3 (Layout)

- [ ] Dialog
- [ ] Popover
- [ ] Tabs
- [ ] Accordion

#### Week 4+ (Rest)

- [ ] All remaining components

### Pro Tips

1. **One component at a time** - Don't rush, ensure quality
2. **Test in Storybook** - Visual verification is key
3. **Keep old variants temporarily** - Deprecate gradually
4. **Use semantic tokens everywhere** - Enables easy theming
5. **Reference Park UI docs** - They've done the hard design work

## Best Practices

### Component Styling Guidelines

1. **Start with Ark UI Defaults**
2. **Add Only Essential Tailwind**
3. **Use Ark's Data Attributes**
4. **Avoid Custom Focus/Transitions**

### Variant Definition Best Practices

1. **Define variants outside component** (module level)
2. **Use descriptive variant names**
3. **Provide default variants**
4. **Use compound variants for complex conditions**

### Class Management Best Practices

1. **Use `tv()` for component variants**
2. **Use `cn()` for runtime composition**
3. **Avoid duplication in variant definitions**
4. **Test class merging with `cn()` utility**

### Migration Guidelines

If you have existing components with heavy Tailwind styling:

1. **Remove focus styles** - Let Ark/browser handle it
2. **Remove transitions** - Keep it simple
3. **Simplify borders** - Use `border border-gray-300` instead of outline systems
4. **Trust data attributes** - Use `data-[state]` instead of custom classes
5. **Test accessibility** - Verify keyboard nav and screen readers still work

### Resources

- [Tailwind Variants Documentation](https://www.tailwind-variants.org/)
- [Tailwind Variants Lite Build](https://www.tailwind-variants.org/docs/config#lite-build)
- [Park UI Components](https://park-ui.com/docs/components)
- [Radix Colors](https://www.radix-ui.com/colors)
- [GitHub Issue #268](https://github.com/heroui-inc/tailwind-variants/issues/268) - `cn` bug report

---

**Summary**: We use an Ark-first approach with Tailwind CSS v4 theming, Tailwind Variants for component variants, and a custom `cn()` utility for class merging. This gives us better accessibility, less code, and more maintainable styling while respecting the framework.
