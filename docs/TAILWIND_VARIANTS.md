# Tailwind Variants Guide

## What is Tailwind Variants?

**Tailwind Variants** (`tv`) is a utility for creating type-safe, reusable component variants with Tailwind CSS. It's inspired by [Stitches](https://stitches.dev/) and provides a first-class API for defining component styling patterns.

## Why We Use the Lite Build

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

## Basic Usage

### Defining Variants

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

### Compound Variants

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

## Vue Component Pattern

### Basic Component with Variants

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
  })
)
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

### With Custom Class Override

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
    props.class // Allow custom overrides
  )
)
</script>

<template>
  <button :class="buttonClass">
    <slot />
  </button>
</template>
```

## Multi-Part Components (Slots)

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

### In Vue Component

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

## Component Composition

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

## TypeScript Integration

### Extract Props Type

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

### In Vue (Separate Type File)

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

## Best Practices

### ✅ DO

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

### ❌ DON'T

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

## Common Patterns

### Pattern 1: Button with States

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

### Pattern 2: Responsive Variants

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

### Pattern 3: Theme-Aware Components

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

## Resources

- [Tailwind Variants Documentation](https://www.tailwind-variants.org/)
- [Tailwind Variants Lite Build](https://www.tailwind-variants.org/docs/config#lite-build)
- [CN Utility Guide](./CN_UTILITY_GUIDE.md)
- [Component Folder Structure](./COMPONENT_FOLDER_STRUCTURE.md)

---

**TL;DR**: Use `tailwind-variants/lite` for component variants, custom `cn()` for class merging. Best of both worlds! ✨
