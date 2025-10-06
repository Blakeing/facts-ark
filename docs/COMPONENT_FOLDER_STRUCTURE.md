# Component Folder Structure

## Overview

Facts Ark uses a **folder-per-component** structure with separate files for variants, types, and implementation. This organization:

- ✅ Leverages `VariantProps` for automatic type extraction
- ✅ Avoids Vue SFC compiler limitations
- ✅ Keeps component files clean and focused
- ✅ Makes variants reusable
- ✅ Improves maintainability

## The Pattern

### File Structure

```
src/components/ui/component-name/
├── component-name.ts      # Variants + Types (combined!)
├── ComponentName.vue      # Component implementation
└── index.ts               # Public exports
```

### Example: Avatar Component

```
src/components/ui/avatar/
├── avatar.ts       # ⭐ Variants and types together
├── Avatar.vue
└── index.ts
```

## File Responsibilities

### 1. `*.ts` - Variants & Types Combined

**Purpose**: Define component variants and types using `tv()` and `VariantProps`

**Benefits**:

- ✅ Single file for related concerns
- ✅ Automatic type extraction with `VariantProps`
- ✅ Reusable across multiple components
- ✅ Module-level definition (optimal performance)
- ✅ Regular TypeScript file (no Vue compiler issues)

**Example**:

```typescript
// button.ts
import { tv, type VariantProps } from 'tailwind-variants/lite'

/**
 * Button variant definitions
 */
export const buttonVariants = tv({
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

/**
 * Button props - automatically includes variant types:
 * - variant?: 'primary' | 'secondary' | 'danger'
 * - size?: 'sm' | 'md' | 'lg'
 */
export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  /** Loading state - shows spinner and disables button */
  loading?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Button type attribute */
  type?: 'button' | 'submit' | 'reset'
  /** Additional CSS classes */
  class?: string
}
```

### 2. `*.vue` - Component Implementation

**Purpose**: Vue component that uses the variants and types

**Benefits**:

- Clean, focused on logic
- No variant or type definitions cluttering the file
- Just imports what it needs

**Example**:

```vue
<!-- Button.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { buttonVariants, type ButtonProps } from './button'

const props = defineProps<ButtonProps>()

const buttonClass = computed(() =>
  cn(
    buttonVariants({
      variant: props.variant,
      size: props.size,
    }),
    props.disabled && 'opacity-50 cursor-not-allowed',
    props.class,
  ),
)
</script>

<template>
  <button :class="buttonClass" :disabled="disabled || loading" :type="type">
    <slot />
  </button>
</template>
```

### 3. `index.ts` - Public Exports

**Purpose**: Barrel export for clean imports

**Example**:

```typescript
// index.ts
export { default as Button } from './Button.vue'
export { buttonVariants, type ButtonProps } from './button'
```

**Usage**:

```typescript
import { Button, buttonVariants, type ButtonProps } from '@/components/ui'
```

## Why This Pattern?

### Problem: Vue SFC Compiler Limitation

Vue's `@vue/compiler-sfc` cannot resolve complex TypeScript utilities like `VariantProps<typeof variants>` when they're used directly in a `.vue` file:

```vue
<!-- ❌ This FAILS -->
<script setup lang="ts">
import { tv, type VariantProps } from 'tailwind-variants/lite'

const buttonVariants = tv({
  /* ... */
})

// Error: [@vue/compiler-sfc] Failed to resolve extends base type
type ButtonVariants = VariantProps<typeof buttonVariants>

interface ButtonProps extends ButtonVariants {}
</script>
```

### Solution: Separate Files

By splitting into three files:

1. **`.variants.ts`** - Regular TS file, exports variant definition
2. **`.types.ts`** - Regular TS file, uses `VariantProps` (TypeScript handles it!)
3. **`.vue`** - Imports resolved types (SFC compiler never sees `VariantProps`)

```typescript
// ✅ This WORKS - .types.ts is a regular TypeScript file!
import type { VariantProps } from 'tailwind-variants/lite'
import type { buttonVariants } from './button.variants'

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  class?: string
}
```

## Complete Example

Let's build a complete Badge component:

### 1. Define Variants

```typescript
// badge.variants.ts
import { tv } from 'tailwind-variants/lite'

export const badgeVariants = tv({
  base: 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
  variants: {
    variant: {
      default: 'bg-gray-100 text-gray-800',
      primary: 'bg-blue-100 text-blue-800',
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
    },
    size: {
      sm: 'text-xs px-2 py-0.5',
      md: 'text-sm px-2.5 py-0.5',
      lg: 'text-base px-3 py-1',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
```

### 2. Extract Types

```typescript
// badge.types.ts
import type { VariantProps } from 'tailwind-variants/lite'
import type { badgeVariants } from './badge.variants'

/**
 * Props for the Badge component
 *
 * Automatically includes:
 * - variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
 * - size?: 'sm' | 'md' | 'lg'
 */
export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  /** Additional CSS classes */
  class?: string
}
```

### 3. Implement Component

```vue
<!-- Badge.vue -->
<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/lib/utils'
import { badgeVariants } from './badge.variants'
import type { BadgeProps } from './badge.types'

const props = defineProps<BadgeProps>()

const badgeClass = computed(() =>
  cn(
    badgeVariants({
      variant: props.variant,
      size: props.size,
    }),
    props.class,
  ),
)
</script>

<template>
  <span :class="badgeClass">
    <slot />
  </span>
</template>
```

### 4. Export

```typescript
// index.ts
export { default as Badge } from './Badge.vue'
export { badgeVariants } from './badge.variants'
export type { BadgeProps } from './badge.types'
```

### 5. Use

```vue
<script setup>
import { Badge } from '@/components/ui'
</script>

<template>
  <Badge variant="success" size="lg"> Active </Badge>
</template>
```

## Naming Conventions

### Files

- **Component**: `PascalCase.vue` (e.g., `Button.vue`, `Avatar.vue`)
- **Variants**: `kebab-case.variants.ts` (e.g., `button.variants.ts`)
- **Types**: `kebab-case.types.ts` (e.g., `button.types.ts`)
- **Index**: `index.ts`

### Folders

- `kebab-case` (e.g., `button/`, `avatar/`, `date-picker/`)

### Exports

```typescript
// Component and variants use PascalCase
export const ButtonVariants = tv({
  /* ... */
})

// Types use PascalCase + Props/Emits suffix
export interface ButtonProps extends VariantProps<typeof buttonVariants> {}
export type ButtonEmits = {
  /* ... */
}
```

## Benefits

### 1. Automatic Type Extraction

```typescript
// ✅ Types automatically match variants!
const buttonVariants = tv({
  variants: {
    color: {
      blue: '...',
      red: '...',
    },
  },
})

// Extracted: color?: 'blue' | 'red'
interface ButtonProps extends VariantProps<typeof buttonVariants> {}
```

### 2. Single Source of Truth

Change variants → types update automatically:

```typescript
// Add new variant
const buttonVariants = tv({
  variants: {
    color: {
      blue: '...',
      red: '...',
      green: '...', // NEW
    },
  },
})

// Type automatically includes it: color?: 'blue' | 'red' | 'green'
```

### 3. Reusable Variants

```typescript
// Compose variants
import { buttonVariants } from '@/components/ui/button'

const iconButton = tv({
  extend: buttonVariants,
  base: 'inline-flex items-center gap-2',
})
```

### 4. Clean Components

Component files stay focused on logic, not type definitions.

### 5. TypeScript Performance

Module-level variant definitions are evaluated once, not on every render.

## Migration Guide

### From Inline Definitions

**Before**:

```vue
<script setup lang="ts">
import { tv } from 'tailwind-variants/lite'

interface ButtonProps {
  variant?: 'primary' | 'secondary' // Manual
  size?: 'sm' | 'md' | 'lg' // Manual
}

const buttonVariants = tv({
  variants: {
    variant: {
      primary: '...',
      secondary: '...',
    },
    size: {
      sm: '...',
      md: '...',
      lg: '...',
    },
  },
})
</script>
```

**After**:

```typescript
// button.variants.ts
export const buttonVariants = tv({
  /* same */
})

// button.types.ts
import type { VariantProps } from 'tailwind-variants/lite'
import type { buttonVariants } from './button.variants'

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  class?: string
}
```

```vue
<!-- Button.vue -->
<script setup lang="ts">
import { buttonVariants } from './button.variants'
import type { ButtonProps } from './button.types'
// Clean!
</script>
```

## Troubleshooting

### Types Not Updating?

Restart TypeScript server:

```bash
# VS Code: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Import Errors?

Ensure proper exports in `index.ts`:

```typescript
export { default as Button } from './Button.vue'
export { buttonVariants } from './button.variants'
export type { ButtonProps } from './button.types'
```

### Vue Can't Find Variants?

Check import path:

```typescript
// ✅ Correct
import { buttonVariants } from './button.variants'

// ❌ Wrong
import { buttonVariants } from 'tailwind-variants/lite'
```

## See Also

- [Tailwind Variants TypeScript Guide](https://www.tailwind-variants.org/docs/typescript)
- [Tailwind Variants Guide](./TAILWIND_VARIANTS.md)
- [Component Architecture](./COMPONENT_ARCHITECTURE.md)

---

**TL;DR**: Split components into three files (`.variants.ts`, `.types.ts`, `.vue`) to leverage `VariantProps` while avoiding Vue SFC compiler limitations. Auto-extract variant types! 🎉
