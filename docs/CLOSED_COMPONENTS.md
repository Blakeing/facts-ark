# Closed Reusable Components Guide

This document explains how to create **closed** reusable components in Facts Ark following [Ark UI best practices](https://ark-ui.com/docs/guides/closed-components).

## What are Closed Components?

Closed components are pre-composed, simplified wrappers around lower-level UI primitives (like Ark UI components) that:

1. **Encapsulate logic** - Hide complexity behind a simple API
2. **Simplify usage** - Reduce boilerplate code throughout your app
3. **Ensure consistency** - Provide a single source of truth for component behavior
4. **Improve maintainability** - Changes are made in one place
5. **Enhance reusability** - Easy to use across different parts of the application

## When to Create Closed Components

Create closed components when:

- ✅ You use a component pattern repeatedly with the same structure
- ✅ The base component requires multiple sub-components that are always used together
- ✅ You want to enforce consistent styling and behavior
- ✅ The component has a simple, predictable API
- ✅ You want to hide implementation details from consumers

**Don't create closed components when:**

- ❌ You need maximum flexibility and composition
- ❌ Each usage requires significantly different structure
- ❌ The component is only used once or twice

## Best Practices

### 1. Use `useForwardPropsEmits` for Vue

When wrapping Ark UI components in Vue, always use the `useForwardPropsEmits` composable to properly forward props and events:

```vue
<script setup lang="ts">
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Avatar, type AvatarRootEmits, type AvatarRootProps } from '@ark-ui/vue/avatar'

export interface MyAvatarProps extends AvatarRootProps {
  src?: string
  name: string
}

const props = defineProps<MyAvatarProps>()
const emits = defineEmits<AvatarRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Avatar.Root v-bind="forwarded">
    <!-- Component structure -->
  </Avatar.Root>
</template>
```

### 2. Extend Base Props, Don't Replace Them

Your closed component should extend the base Ark UI component props, not replace them:

```typescript
// ✅ Good - Extends base props
export interface AvatarProps extends AvatarRootProps {
  name: string
  src?: string
}

// ❌ Bad - Replaces base props
export interface AvatarProps {
  name: string
  src?: string
}
```

This allows users to still access all base functionality when needed.

### 3. Provide Sensible Defaults

Closed components should work well out of the box with minimal configuration:

```vue
<script setup lang="ts">
const props = withDefaults(defineProps<AvatarProps>(), {
  size: 'md',
  variant: 'solid',
})
</script>
```

### 4. Use TypeScript for Type Safety

Always define clear interfaces for your props and emits:

```typescript
export interface AvatarProps extends AvatarRootProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'solid' | 'outline'
}
```

### 5. Include Helper Functions in the Component

Keep helper functions close to where they're used:

```vue
<script setup lang="ts">
// Helper function for getting initials
const getInitials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

const initials = computed(() => getInitials(props.name))
</script>
```

### 6. Use Tailwind Variants for Variant Management

Use the `tailwind-variants` library for type-safe, composable variant management:

```vue
<script setup lang="ts">
import { tv, type VariantProps } from 'tailwind-variants'

const buttonVariants = tv({
  base: 'inline-flex items-center justify-center rounded-md font-semibold',
  variants: {
    variant: {
      primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
      secondary: 'bg-white text-gray-900 ring-1 ring-gray-300',
    },
    size: {
      sm: 'px-2 py-1 text-xs',
      md: 'px-3 py-2 text-sm',
      lg: 'px-4 py-2.5 text-base',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

type ButtonVariants = VariantProps<typeof buttonVariants>

export interface ButtonProps extends ButtonVariants {
  class?: string
}

const buttonClass = computed(() =>
  buttonVariants({
    variant: props.variant,
    size: props.size,
    class: props.class,
  }),
)
</script>
```

Benefits of `tailwind-variants`:

- **Type Safety**: Automatic TypeScript inference
- **Compound Variants**: Support for complex variant combinations
- **Default Variants**: Clean API with sensible defaults
- **Slots**: Support for styling different parts
- **Better DX**: Cleaner than manual class concatenation

### 7. Provide Fallback Content

Always provide sensible fallbacks for missing data:

```vue
<Avatar.Fallback>
  <template v-if="initials">
    {{ initials }}
  </template>
  <UserIcon v-else />
</Avatar.Fallback>
```

### 8. Document Usage Examples

Include clear usage examples in your component or documentation:

```vue
<!-- Basic usage -->
<Avatar name="John Doe" src="/avatar.jpg" />

<!-- Without image -->
<Avatar name="Jane Smith" />

<!-- Custom size -->
<Avatar name="Bob Wilson" size="lg" />
```

## Architecture Pattern

Here's the recommended structure for closed components:

```vue
<script setup lang="ts">
// 1. Imports
import { useForwardPropsEmits } from '@ark-ui/vue'
import { Component, type ComponentProps, type ComponentEmits } from '@ark-ui/vue/component'
import { computed } from 'vue'
import { tv, type VariantProps } from 'tailwind-variants'

// 2. Define Variants with tailwind-variants
const componentVariants = tv({
  base: 'base-classes-here',
  variants: {
    variant: {
      default: 'variant-classes',
      secondary: 'other-variant-classes',
    },
    size: {
      sm: 'small-size-classes',
      md: 'medium-size-classes',
      lg: 'large-size-classes',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

// 3. Type Definitions
type ComponentVariants = VariantProps<typeof componentVariants>

export interface MyComponentProps extends ComponentProps, ComponentVariants {
  class?: string
}

// 4. Props & Emits
const props = defineProps<MyComponentProps>()
const emits = defineEmits<ComponentEmits>()

// 5. Forward Props/Emits
const forwarded = useForwardPropsEmits(props, emits)

// 6. Helper Functions
const helperFunction = (value: string) => {
  // Implementation
}

// 7. Computed Properties
const computedValue = computed(() => helperFunction(props.value))
const componentClass = computed(() =>
  componentVariants({
    variant: props.variant,
    size: props.size,
    class: props.class,
  }),
)
</script>

<template>
  <!-- 8. Component Structure -->
  <Component.Root v-bind="forwarded" :class="componentClass">
    <Component.Part>{{ computedValue }}</Component.Part>
  </Component.Root>
</template>
```

## File Organization

Store closed components in a dedicated directory:

```
src/
├── components/
│   ├── ui/                    # Closed reusable components
│   │   ├── Avatar.vue
│   │   ├── Button.vue
│   │   ├── Badge.vue
│   │   └── Card.vue
│   ├── AppLayout.vue          # Layout components
│   ├── AppSidebar.vue
│   └── AppHeader.vue
└── views/                     # Page components
```

## Testing Closed Components

Closed components should be easier to test since they have simpler APIs:

```typescript
import { mount } from '@vue/test-utils'
import Avatar from './Avatar.vue'

describe('Avatar', () => {
  it('displays user initials when no image is provided', () => {
    const wrapper = mount(Avatar, {
      props: { name: 'John Doe' },
    })
    expect(wrapper.text()).toContain('JD')
  })

  it('displays image when src is provided', () => {
    const wrapper = mount(Avatar, {
      props: { name: 'John Doe', src: '/avatar.jpg' },
    })
    expect(wrapper.find('img').attributes('src')).toBe('/avatar.jpg')
  })
})
```

## Real-World Examples

See the following closed components in this project:

- `src/components/ui/Avatar.vue` - Avatar with automatic initials
- `src/components/ui/Badge.vue` - Badge with variants
- `src/components/ui/Button.vue` - Button with loading states

## When to Use Open vs Closed Components

| Use Case                   | Open (Ark UI directly) | Closed (Wrapped) |
| -------------------------- | ---------------------- | ---------------- |
| Consistent simple patterns | ❌                     | ✅               |
| One-off custom layouts     | ✅                     | ❌               |
| Maximum flexibility needed | ✅                     | ❌               |
| Enforcing design system    | ❌                     | ✅               |
| Complex compositions       | ✅                     | ❌               |
| Simple, repeated usage     | ❌                     | ✅               |

## Migration Strategy

If you have existing Ark UI components used directly, here's how to migrate:

1. **Identify patterns** - Find repeated usage patterns in your codebase
2. **Create the closed component** - Extract the common pattern
3. **Add tests** - Ensure the closed component works correctly
4. **Gradual migration** - Replace instances one by one
5. **Document** - Add usage examples and props documentation

## Resources

- [Ark UI Closed Components Guide](https://ark-ui.com/docs/guides/closed-components)
- [Ark UI Vue Components](https://ark-ui.com/docs/components)
- [Tailwind Variants Documentation](https://www.tailwind-variants.org/)
- [Vue Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

## Summary

Closed components are powerful tools for building consistent, maintainable UIs. They:

- Simplify your codebase by reducing boilerplate
- Enforce design system consistency
- Make components easier to test and maintain
- Provide a better developer experience

Use them when you have clear, repeated patterns, and stick with open composition when you need maximum flexibility.
