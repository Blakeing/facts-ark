# `cn` Utility & Tailwind Variants Solution

## ✅ Final Solution

**Problem**: `tailwind-variants` v3.1.1 has a [critical bug](https://github.com/heroui-inc/tailwind-variants/issues/268) where `cn()` returns a function instead of a string.

**Our Smart Solution**: Use **`tailwind-variants/lite`** + custom `cn()` utility!

### The Setup

```typescript
// For component variants - use lite build
import { tv } from 'tailwind-variants/lite'

// For class merging - use custom utility
import { cn } from '@/lib/utils'
```

### Why This is Perfect

| Feature          | `tailwind-variants/lite`  | Custom `cn`               |
| ---------------- | ------------------------- | ------------------------- |
| **Purpose**      | Component variants        | Class merging             |
| **Size**         | ~80% smaller              | Minimal                   |
| **Broken?**      | ✅ No (doesn't have `cn`) | ✅ No                     |
| **Dependencies** | None                      | `clsx` + `tailwind-merge` |
| **Use Case**     | `tv()` definitions        | Runtime class composition |

## Implementation Details

### Custom `cn` Utility

```typescript
// src/lib/utils.ts
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Custom cn utility that combines clsx and tailwind-merge
 *
 * We use our own implementation because tailwind-variants v3.1.1
 * has a bug where cn() returns a function instead of a string.
 *
 * @see https://github.com/heroui-inc/tailwind-variants/issues/268
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Component Usage Pattern

```vue
<script setup lang="ts">
import { computed } from 'vue'
import { tv } from 'tailwind-variants/lite' // For variants
import { cn } from '@/lib/utils' // For merging

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
  class?: string
}

const props = defineProps<Props>()

const buttonClass = computed(() =>
  cn(
    buttonVariants({
      variant: props.variant,
      size: props.size,
    }),
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

## The Bug Explained

According to [GitHub Issue #268](https://github.com/heroui-inc/tailwind-variants/issues/268):

> Calling `cn('bg-red-500', 'text-white')` will not work, and results in a return of a **function**, not the result.
>
> In order to work, you must write it like this:
>
> ```javascript
> cn('bg-red-500', 'text-white')({ twMerge: true })
> ```

**Impact**: This breaks ALL usage of `cn` from the full `tailwind-variants` build.

**Workaround**: Use the lite build which doesn't include `cn` at all!

## Lite Build Benefits

From the [Tailwind Variants Config docs](https://www.tailwind-variants.org/docs/config#lite-build):

> ### Lite Build
>
> - Import from `tailwind-variants/lite`
> - Excludes `tailwind-merge` for a smaller bundle (~80% smaller)
> - **Does not support** `twMerge` or `twMergeConfig` options
> - No external dependencies required

**Why this works for us:**

1. ✅ **No broken `cn`** - Lite build doesn't include it
2. ✅ **Smaller bundle** - ~80% size reduction
3. ✅ **Still get `tv()`** - All variant functionality works
4. ✅ **Better separation** - Variants vs class merging are separate concerns

## Dependencies

```json
{
  "dependencies": {
    "clsx": "^2.1.1",
    "tailwind-merge": "^3.3.1",
    "tailwind-variants": "^3.1.1"
  }
}
```

**Note**: We keep `tailwind-variants` (not `/lite`) in package.json because the package exports both builds.

## Migration Guide

If you were using the full build with the broken `cn`:

### Before (Broken)

```typescript
// ❌ Returns a function, not a string!
import { cn } from 'tailwind-variants'

const classes = cn('bg-red-500', 'text-white') // function! 😱
```

### After (Working)

```typescript
// ✅ Import lite build for tv
import { tv } from 'tailwind-variants/lite'

// ✅ Use custom cn
import { cn } from '@/lib/utils'

const classes = cn('bg-red-500', 'text-white') // string! 🎉
```

## When to Use What

### Use `tv()` (from lite) for:

✅ Component variant definitions

```typescript
const button = tv({
  base: 'rounded-lg',
  variants: {
    /* ... */
  },
})
```

✅ Multi-part components (slots)

```typescript
const card = tv({
  slots: {
    base: '...',
    header: '...',
    body: '...',
  },
})
```

✅ Compound variants

```typescript
compoundVariants: [{ variant: 'primary', size: 'lg', class: 'shadow-xl' }]
```

### Use `cn()` (custom) for:

✅ Runtime class composition

```typescript
cn('base', isActive && 'active', props.class)
```

✅ Merging with `tv()` output

```typescript
cn(button({ variant: 'primary' }), props.class)
```

✅ Conditional styling

```typescript
cn('px-4', disabled && 'opacity-50', loading && 'animate-pulse')
```

## Comparison Table

| Feature              | Full Build               | Lite Build + Custom `cn`  |
| -------------------- | ------------------------ | ------------------------- |
| Bundle Size          | Large                    | ~80% smaller              |
| `tv()` functionality | ✅                       | ✅                        |
| Built-in `cn`        | ❌ Broken                | ✅ Custom (works)         |
| `twMerge` support    | ❌ Broken                | ✅ In custom `cn`         |
| Dependencies         | None (broken internally) | `clsx` + `tailwind-merge` |
| Reliability          | ❌                       | ✅                        |

## Testing

To verify the setup works:

```bash
# Check that lite build is used in components
grep -r "from 'tailwind-variants/lite'" src/

# Check that custom cn is used
grep -r "from '@/lib/utils'" src/

# Verify no broken cn imports
grep -r "cn.*from.*'tailwind-variants'" src/ # Should be empty!
```

## Future

Once `tailwind-variants` fixes the `cn` bug (likely in v3.2+), we can:

1. **Keep using lite build** - It's smaller and we have a good pattern
2. **Or switch to full build** - If they fix `cn` and it provides benefits

For now, our solution is optimal! ✅

## Resources

- [Tailwind Variants Config - Lite Build](https://www.tailwind-variants.org/docs/config#lite-build)
- [GitHub Issue #268 - cn() bug](https://github.com/heroui-inc/tailwind-variants/issues/268)
- [Our CN Utility Guide](./CN_UTILITY_GUIDE.md)
- [Our Tailwind Variants Guide](./TAILWIND_VARIANTS.md)

---

**TL;DR**: Use `tailwind-variants/lite` for `tv()` + custom `cn()` for class merging. Best of both worlds with ~80% smaller bundle! 🎉
