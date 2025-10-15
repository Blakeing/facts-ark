# Using the `cn()` Utility

## What is `cn()`?

The `cn()` function is a **custom utility** that combines **clsx** + **tailwind-merge** for intelligent class name management.

```typescript
// Import from our utility file
import { cn } from '@/lib/utils'

// Usage
cn('px-2 py-1', 'px-4') // => 'py-1 px-4' (conflict resolved)
cn('text-red-500', condition && 'text-blue-500') // conditional classes
cn(['flex', 'items-center'], { 'justify-center': centered }) // arrays & objects
```

## ⚠️ Why Not Use `tailwind-variants` Built-in `cn`?

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

### Implementation

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## Why Use `cn()`?

### 1. **Conditional Classes**

```typescript
// ❌ Messy string concatenation
const classes = 'btn ' + (isActive ? 'btn-active' : '') + ' ' + (disabled ? 'opacity-50' : '')

// ✅ Clean with cn()
const classes = cn('btn', isActive && 'btn-active', disabled && 'opacity-50')
```

### 2. **Automatic Conflict Resolution**

```typescript
// Without cn() - both classes applied! 🐛
<div class="px-2 px-4"> // Results in: "px-2 px-4" (both applied!)

// With cn() - conflicts resolved! ✅
cn('px-2', 'px-4') // Results in: "px-4" (px-2 removed)
```

### 3. **Multiple Input Types**

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

## When to Use What?

### Use `tv()` (Tailwind Variants) for:

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

### Use `cn()` for:

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

## Common Patterns

### Pattern 1: Component with Class Override

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

### Pattern 2: Conditional Styling

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

### Pattern 3: Merging with `tv()` Output

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

## How It Works

The `cn()` utility performs two operations:

1. **`clsx`**: Handles conditional class application
2. **`tailwind-merge`**: Resolves Tailwind CSS conflicts

```typescript
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Class Merging Rules

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

## Best Practices

### ✅ DO

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

### ❌ DON'T

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

## Resources

- [CN Comparison](./CN_COMPARISON.md) - Why we use custom `cn`
- [Tailwind Variants Guide](./TAILWIND_VARIANTS.md) - Using `tv()` for variants
- [Component Architecture](./COMPONENT_ARCHITECTURE.md) - Overall structure
- [GitHub Issue #268](https://github.com/heroui-inc/tailwind-variants/issues/268) - `cn` bug report

---

**TL;DR**: We use a custom `cn()` implementation because `tailwind-variants` v3.1.1 has a broken `cn` function. Once fixed, we'll switch back! ✨
