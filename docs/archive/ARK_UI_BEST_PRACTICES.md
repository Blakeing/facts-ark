# Ark UI Best Practices - Implementation Guide

## ✅ Current Status

Your codebase is **already following Ark UI best practices**! This document serves as a reference for maintaining consistency.

## Best Practices Applied

### 1. ✅ Using Context API for State Access

**Best:** Use `Component.Context` slot for accessing component state

```vue
<!-- ✅ GOOD: Using Context slot -->
<template>
  <Field.Context v-slot="field">
    <Field.Input
      :class="
        inputVariants({
          variant: field.invalid ? 'error' : 'default',
        })
      "
    />
  </Field.Context>
</template>
```

**Examples in codebase:**

- ✅ `FieldInput.vue` - Uses `Field.Context` for invalid state
- ✅ `TagsInput.vue` - Uses `TagsInput.Context` for value access

**Avoid:** Using composables like `useFieldContext()` (incomplete types)

```vue
<!-- ❌ BAD: Composable with type issues -->
<script setup>
const field = useFieldContext()
// field.invalid - Type error!
</script>
```

### 2. ✅ Props Forwarding Pattern

**Pattern:** Use `useOmitProps` + `useForwardPropsEmits`

```vue
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { useOmitProps } from '@/lib/useOmitProps'

const props = defineProps<ComponentProps>()
const emits = defineEmits<ComponentEmits>()

// Filter out custom props that shouldn't go to Ark UI
const arkProps = useOmitProps(props, ['variant', 'customProp', 'class'] as const)

// Forward remaining props and emits
const forwarded = useForwardPropsEmits(arkProps, emits)
</script>

<template>
  <Component.Root v-bind="forwarded">
    <!-- ... -->
  </Component.Root>
</template>
```

**Applied in:** Dialog, Tabs, Select, Menu, Carousel, and all complex components

### 3. ✅ Closed Component Pattern

**Pattern:** Wrap Ark UI primitives in a closed component with sensible defaults

```vue
<template>
  <Component.Root v-bind="forwarded">
    <Component.Label v-if="props.label">{{ props.label }}</Component.Label>
    <Component.Control>
      <!-- Closed structure with your styling -->
    </Component.Control>
  </Component.Root>
</template>
```

**Benefits:**

- Consistent styling across app
- Simplified API for consumers
- Enforced design system tokens

**Applied in:** All 30+ UI components

### 4. ✅ Variant System with Tailwind Variants

**Pattern:** Use `tailwind-variants` for component styling

```typescript
// component.variants.ts
import { tv } from 'tailwind-variants/lite'

export const componentVariants = tv({
  slots: {
    root: 'base-styles',
    trigger: 'trigger-styles',
  },
  variants: {
    size: {
      sm: { root: 'small-styles' },
      lg: { root: 'large-styles' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
```

**Applied in:** All components with `*.variants.ts` files

### 5. ✅ Type Safety

**Pattern:** Extend Ark UI types with custom props

```typescript
// component.types.ts
import type { ComponentRootProps } from '@ark-ui/vue/component'

export interface CustomComponentProps extends ComponentRootProps {
  variant?: 'default' | 'custom'
  customProp?: string
  class?: string
}
```

**Applied in:** All components with `*.types.ts` files

### 6. ✅ Collection Pattern

**For list-based components:** Use `createListCollection`

```vue
<script setup>
import { Select, createListCollection } from '@ark-ui/vue/select'

const collection = computed(() => createListCollection({ items: props.items }))
</script>

<template>
  <Select.Root :collection="collection">
    <!-- ... -->
  </Select.Root>
</template>
```

**Applied in:** Select.vue

## Component Patterns by Type

### Form Components

**Field-aware inputs** should use `Field.Context`:

```vue
<!-- FieldInput.vue - Reference Implementation -->
<template>
  <Field.Context v-slot="field">
    <Field.Input
      :class="
        inputVariants({
          variant: props.variant || (field.invalid ? 'error' : 'default'),
        })
      "
    />
  </Field.Context>
</template>
```

**Standalone form controls** use direct Ark UI primitives:

- Checkbox
- RadioGroup
- Switch
- Slider

### Overlay Components

**Pattern:** Use Teleport to body for portals

```vue
<template>
  <Component.Root>
    <Component.Trigger>Open</Component.Trigger>

    <Teleport to="body">
      <Component.Positioner>
        <Component.Content>
          <!-- Portal content -->
        </Component.Content>
      </Component.Positioner>
    </Teleport>
  </Component.Root>
</template>
```

**Applied in:** Dialog, Popover, Tooltip, HoverCard, Menu, Select

### Collection Components

**Pattern:** Iterate over items prop with slots for customization

```vue
<template>
  <Component.Root>
    <Component.Item v-for="item in props.items" :key="item.value" :value="item.value">
      <slot :name="item.value">
        {{ item.label }}
      </slot>
    </Component.Item>
  </Component.Root>
</template>
```

**Applied in:** Tabs, Select, Menu, RadioGroup, Accordion, Carousel

## Utilities Reference

### useOmitProps

**Purpose:** Filter custom props before forwarding to Ark UI

```typescript
const arkProps = useOmitProps(props, ['variant', 'class', 'customProp'] as const)
```

**Location:** `/src/lib/useOmitProps.ts`

**Use when:** You have custom props that shouldn't be passed to Ark UI's Root component

### useForwardPropsEmits

**Purpose:** Reactive forwarding of props and emits

```typescript
import { useForwardPropsEmits } from '@ark-ui/vue'

const forwarded = useForwardPropsEmits(props, emits)
```

**Use when:** Every wrapped Ark UI component

## Anti-Patterns to Avoid

### ❌ 1. Don't use context composables directly

```vue
<!-- ❌ BAD -->
<script setup>
const field = useFieldContext()
// @ts-expect-error - property doesn't exist in types
const isInvalid = field?.invalid
</script>
```

**Why:** Incomplete TypeScript types lead to errors and workarounds

**Instead:** Use Context slots (see #1 above)

### ❌ 2. Don't pass all props to Root

```vue
<!-- ❌ BAD -->
<Component.Root v-bind="props">
  <!-- This passes variant, class, etc. to Ark UI -->
</Component.Root>
```

**Why:** Ark UI will warn about unknown props

**Instead:** Use `useOmitProps` to filter custom props

### ❌ 3. Don't inline complex variant logic

```vue
<!-- ❌ BAD -->
<div :class="variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'"></div>
```

**Why:** Inconsistent, hard to maintain, doesn't scale

**Instead:** Use `tailwind-variants` with proper variant definitions

### ❌ 4. Don't skip HiddenInput components

```vue
<!-- ❌ BAD -->
<Checkbox.Root>
  <Checkbox.Control />
  <!-- Missing HiddenInput -->
</Checkbox.Root>
```

**Why:** Forms won't submit values correctly

**Instead:** Always include HiddenInput/HiddenSelect components

```vue
<!-- ✅ GOOD -->
<Checkbox.Root>
  <Checkbox.Control />
  <Checkbox.HiddenInput />
</Checkbox.Root>
```

## Migration Checklist

When creating a new Ark UI component:

- [ ] Create `Component.vue` with closed structure
- [ ] Create `component.types.ts` extending Ark UI props
- [ ] Create `component.variants.ts` with tailwind-variants
- [ ] Create `Component.stories.ts` for Storybook
- [ ] Create `index.ts` exporting component, types, and variants
- [ ] Use `useOmitProps` for custom props
- [ ] Use `useForwardPropsEmits` for Ark UI props
- [ ] Use Context slots for state access (if needed)
- [ ] Include HiddenInput/HiddenSelect for form components
- [ ] Use Teleport for overlay components
- [ ] Document with JSDoc and examples

## Resources

- **Ark UI Docs:** https://ark-ui.com
- **Tailwind Variants:** https://www.tailwind-variants.org
- **Our Components:** `/src/components/ui/`
- **Field Integration Guide:** `/docs/FIELD_INPUT_BEST_PRACTICES.md`

## Summary

Your implementation is **exemplary**! Key achievements:

✅ Proper Context API usage (FieldInput, TagsInput)  
✅ Clean props forwarding pattern (all components)  
✅ Type-safe closed components (30+ components)  
✅ Consistent variant system (tailwind-variants)  
✅ No type hacks or workarounds  
✅ Proper form integration (HiddenInputs included)  
✅ Well-structured with separate types/variants files

Keep following these patterns for new components! 🎉
