# Toast Implementation (shadcn-vue + tailwind-variants)

## Overview

Toast notification system using **vue-sonner** with **shadcn-vue pattern** enhanced by **tailwind-variants**. Combines the simplicity of shadcn's approach with the organization and type-safety of tailwind-variants.

## Architecture

### Files

1. **`src/shared/ui/toast/toast.variants.ts`** ⭐ NEW
   - Tailwind-variants definitions for toast styling
   - Organized slots: toast, description, actionButton, cancelButton, closeButton
   - Type variants: error, success, warning, info
   - `getToastClasses()` helper to compute classes for vue-sonner

2. **`src/shared/ui/toast/Toast.vue`**
   - Wrapper for vue-sonner's `Toaster` component
   - Configures default props (position, duration, richColors)
   - Uses `getToastClasses()` to apply tailwind-variants via `toastOptions.classes`

3. **`src/shared/ui/toast/useToast.ts`**
   - Re-exports vue-sonner's `toast` function
   - Provides `useToast()` composable for backward compatibility
   - Re-exports vue-sonner types

4. **`src/shared/ui/toast/index.ts`**
   - Single export point for toast functionality
   - Exports Toast component, toast function, and toastVariants

5. **`src/assets/main.css`**
   - Imports `vue-sonner/style.css` for base animations and positioning

## Features

### Toast Types

- ✅ **Success**: Green theme with semantic tokens
- ✅ **Error**: Red theme with semantic tokens
- ✅ **Warning**: Orange theme with semantic tokens
- ✅ **Info**: Blue theme with semantic tokens
- ✅ **Default**: Neutral card theme

### Capabilities

- ✅ **Rich colors** - Enhanced colored toasts
- ✅ **Action buttons** - Interactive buttons
- ✅ **Descriptions** - Additional message text
- ✅ **Persistent toasts** - Duration: Infinity
- ✅ **Dismissable** - Manual or automatic
- ✅ **Promise toasts** - Loading states
- ✅ **Keyboard navigation** - Alt+T focus

## Usage Examples

### Basic Toasts

```typescript
import { toast } from '@/shared/ui/toast'

// Simple toasts
toast.success('Success!')
toast.error('Error occurred')
toast.warning('Warning!')
toast.info('Information')
toast('Default message')
```

### With Description

```typescript
toast.success('Changes saved', {
  description: 'Your profile has been updated successfully.',
})
```

### With Action Button

```typescript
toast('Event created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked!'),
  },
})
```

### Persistent Toast

```typescript
// Toast stays until manually dismissed
toast.info('Important message', {
  duration: Infinity,
})
```

### Promise Toast

```typescript
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: (data) => `${data.name} loaded!`,
  error: 'Failed to load data',
})
```

### Dismissing Toasts

```typescript
// Dismiss specific toast
const id = toast.success('Message')
toast.dismiss(id)

// Dismiss all toasts
toast.dismiss()
```

## Semantic Token Mapping

### Success (Green)

- Background: `bg-bg-success-subtle`
- Text: `fg-success`
- Border: `border-border-success`

### Error (Red)

- Background: `bg-bg-error-subtle`
- Text: `fg-error`
- Border: `border-border-error`

### Warning (Orange)

- Background: `bg-bg-warning-subtle`
- Text: `fg-warning`
- Border: `border-border-warning`

### Info (Blue)

- Background: `bg-bg-info-subtle`
- Text: `fg-info`
- Border: `border-border-info`

### Default (Neutral)

- Background: `bg-card`
- Text: `text-card-foreground`
- Border: `border-border`

## How It Works

### 1. Base CSS from vue-sonner

```css
/* src/assets/main.css */
@import 'vue-sonner/style.css';
```

Provides:

- Toast animations (slide, fade, scale)
- Positioning system
- Stacking behavior
- Transitions

### 2. Tailwind-Variants for Styling

```typescript
// src/shared/ui/toast/toast.variants.ts
export const toastVariants = tv({
  slots: {
    toast: ['group toast', 'group-[.toaster]:bg-card' /* ... */],
    success: ['group-[.toaster]:bg-bg-success-subtle' /* ... */],
    error: ['group-[.toaster]:bg-bg-error-subtle' /* ... */],
    // ... other slots
  },
})

export function getToastClasses() {
  const styles = toastVariants()
  return {
    toast: styles.toast(),
    success: styles.success(),
    error: styles.error(),
    // ... etc
  }
}
```

```vue
<!-- src/shared/ui/toast/Toast.vue -->
<script setup>
import { getToastClasses } from './toast.variants'
const toastClasses = getToastClasses()
</script>

<Sonner :toast-options="{ classes: toastClasses }" />
```

The `toastOptions.classes` adds styling **on top** of vue-sonner's base CSS.
Tailwind-variants keeps styling organized and consistent with other components.

### 3. Simple API Usage

```typescript
// Just import and use - styling is automatic
import { toast } from '@/shared/ui/toast'
toast.success('Done!')
```

## Integration with Mutation Factory

The mutation factory automatically shows success/error toasts:

```typescript
// src/shared/lib/mutation/createMutationFactory.ts
toast.success(toastConfig.title, {
  description: toastConfig.description,
})
```

All CRUD operations (create, update, delete) get automatic toast notifications!

## Comparison to Other Approaches

### Hybrid: shadcn-vue + tailwind-variants (Current) ✅

- **~150 lines** total (including variants)
- Uses vue-sonner's default component (simple)
- Tailwind-variants for organized styling (maintainable)
- Best of both worlds
- Covers 90% of use cases
- **Pattern consistency** with other components

### Pure shadcn-vue

- **~100 lines** total
- Uses vue-sonner's default component
- Hardcoded class strings in template
- Simple but less organized
- No pattern consistency with other components

### Custom Component (Removed)

- **~400+ lines** total
- Custom Vue component with `h()` render function
- Tailwind-variants for styling
- Complex, harder to maintain
- Supported advanced features (list items, bordered variant)

We chose the **hybrid approach** for:

1. **Simplicity** - No custom components, no `h()` complexity
2. **Organization** - Tailwind-variants keep styles organized
3. **Consistency** - Same pattern as Button, Card, etc.
4. **Maintainability** - Easy to modify and extend

## Benefits

1. **Simple**: ~150 lines (vs 400+ for custom component)
2. **Standard**: Follows shadcn-vue pattern with vue-sonner
3. **Organized**: Tailwind-variants for maintainable styling
4. **Pattern consistency**: Same approach as Button, Card, Field, etc.
5. **Semantic tokens**: Consistent theming across light/dark modes
6. **Type safe**: Full TypeScript support with tailwind-variants
7. **Accessible**: Built-in ARIA support from vue-sonner
8. **Maintainable**: Easy to understand, modify, and extend
9. **Rich features**: Action buttons, promises, persistence
10. **No complexity**: No custom components, no `h()` render functions

## References

- [vue-sonner GitHub](https://github.com/xiaoluoboding/vue-sonner)
- [shadcn-vue Sonner](https://www.shadcn-vue.com/docs/components/sonner)
- [vue-sonner Demo](https://vue-sonner.vercel.app/)
