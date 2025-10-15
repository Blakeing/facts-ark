# Fixes & Implementations Guide

This guide documents specific fixes and implementations made to resolve issues and enhance functionality in the Facts Ark project.

## Color Explorer Fix

### Problem

The color explorer at `/theme` wasn't working because it was using **dynamic Tailwind class names**.

#### What Was Wrong

```vue
<!-- ❌ This doesn't work with Tailwind -->
<div :class="`bg-${color}-${shade}`"></div>
```

Tailwind CSS needs to see complete class names at build time. Dynamic class names created with template literals don't get included in the final CSS.

### Solution

Changed from dynamic classes to **inline styles with actual color values**.

#### What We Did

1. **Added Color Data**
   - Added actual OKLCH color values to each color scale
   - Stored all 11 shades (50-950) for each color

2. **Used Inline Styles**

   ```vue
   <!-- ✅ This works! -->
   <div :style="{ backgroundColor: currentColorScale.shades[shade] }"></div>
   ```

3. **Fixed TypeScript**
   - Created proper types (`ColorShade`, `ColorScale`)
   - Used computed property for type safety
   - Made array indexing type-safe

### Result

Now the color explorer **works perfectly**! You can:

- Click any color to see all 11 shades
- See the exact OKLCH values
- Copy class names for use
- See smooth transitions between colors

### Implementation

```vue
<script setup lang="ts">
// Define types for type safety
type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

interface ColorScale {
  name: string
  label: string
  desc: string
  bg: string
  shades: Record<ColorShade, string>
}

// Store actual color values
const colorScales: ColorScale[] = [
  {
    name: 'blue',
    label: 'Blue',
    bg: 'oklch(0.623 0.214 259.816)',
    shades: {
      50: 'oklch(0.97 0.014 254.604)',
      100: 'oklch(0.932 0.032 255.585)',
      // ... etc
    },
  },
  // ... more colors
]

// Computed property for current color
const currentColorScale = computed(() => {
  const found = colorScales.find((c) => c.name === selectedColor.value)
  return found ?? colorScales[0]!
})
</script>

<template>
  <!-- Use inline styles with actual color values -->
  <div v-for="shade in shades" :style="{ backgroundColor: currentColorScale.shades[shade] }">
    {{ selectedColor }}-{{ shade }}
  </div>
</template>
```

### Why This Approach?

1. **Works with Tailwind** - No dynamic classes needed
2. **Type-Safe** - Full TypeScript support
3. **Flexible** - Can add any color values
4. **No Build Config** - Doesn't require safelist in Tailwind config

### Files Changed

- `src/views/ThemeDemo.vue` - Fixed color explorer implementation

**Status**: ✅ Fixed and working!  
**TypeScript Errors**: ✅ Zero errors!  
**Performance**: ✅ Smooth and fast!

## Field Component Enhancement

### Problem

The `Field` component only supported props for `helperText` and `errorText`, which prevented dynamic content and broke `v-model` bindings when using complex slot structures.

### Solution

Updated `Field.vue` to support **both props and slots** for helper and error text, providing maximum flexibility while maintaining backward compatibility.

### Changes Made

#### 1. Updated Field Component (`src/shared/ui/field/Field.vue`)

**Before:**

```vue
<Field.HelperText v-if="props.helperText && !props.invalid">
  {{ props.helperText }}
</Field.HelperText>

<Field.ErrorText v-if="props.errorText && props.invalid">
  {{ props.errorText }}
</Field.ErrorText>
```

**After:**

```vue
<!-- Helper Text: Use slot if provided, otherwise use prop -->
<Field.HelperText v-if="(slots.helperText || props.helperText) && !props.invalid">
  <slot name="helperText">{{ props.helperText }}</slot>
</Field.HelperText>

<!-- Error Text: Use slot if provided, otherwise use prop -->
<Field.ErrorText v-if="(slots.errorText || props.errorText) && props.invalid">
  <slot name="errorText">{{ props.errorText }}</slot>
</Field.ErrorText>
```

**Key additions:**

- Added `useSlots()` to detect slot usage
- Check for both slots and props
- Fallback to props if slots not provided

#### 2. Updated Form to Use Slots (`src/features/add-todo/ui/AddTodoForm.vue`)

**Consistent pattern:**

```vue
<Field label="Title" required :invalid="!isValid && title.length > 0">
  <Input
    v-model="title"
    placeholder="What needs to be done?"
    :disabled="isPending"
    maxlength="200"
    required
  />
  <template #helperText>
    <span>{{ title.length }}/200 characters</span>
  </template>
  <template #errorText>
    <span>Title must be between 1 and 200 characters</span>
  </template>
</Field>
```

### Usage Examples

#### Example 1: Using Props (Simple)

```vue
<Field
  label="Email"
  helperText="We'll never share your email"
  invalid
  errorText="Email is required"
>
  <Input type="email" v-model="email" />
</Field>
```

#### Example 2: Using Slots (Dynamic Content)

```vue
<Field label="Password" :invalid="hasError">
  <Input type="password" v-model="password" />
  <template #helperText>
    <span>{{ password.length }}/50 characters</span>
  </template>
  <template #errorText>
    <span v-if="tooShort">Must be at least 8 characters</span>
    <span v-else>Password is required</span>
  </template>
</Field>
```

#### Example 3: Mixed (Prop + Slot)

```vue
<Field label="Username" helperText="Choose wisely">
  <Input v-model="username" />
  <!-- Uses prop for helper, no slot needed -->
  <template #errorText>
    <span>{{ usernameError }}</span>
  </template>
</Field>
```

### Benefits

#### ✅ Flexibility

- Use props for simple static text
- Use slots for dynamic, reactive content
- Mix and match as needed

#### ✅ Consistency

- All forms use the same Field component
- No custom div wrappers needed
- Maintains design system integrity

#### ✅ Reactivity

- Character counters work properly
- Dynamic error messages
- Full `v-model` support maintained

#### ✅ Backward Compatible

- Existing code with props still works
- No breaking changes
- Gradual migration path

### Testing

Test both patterns work:

1. **With Props:**

   ```vue
   <Field label="Test" helperText="Static help">
     <Input v-model="value" />
   </Field>
   ```

2. **With Slots:**

   ```vue
   <Field label="Test">
     <Input v-model="value" />
     <template #helperText>{{ value.length }} chars</template>
   </Field>
   ```

3. **Verify:**
   - Input value updates reactively
   - Character counters update
   - Validation states work
   - Error messages show/hide correctly

### Files Modified

- ✅ `src/shared/ui/field/Field.vue` - Added slot support
- ✅ `src/features/add-todo/ui/AddTodoForm.vue` - Use slots for dynamic content
- ✅ Zero linter errors
- ✅ Type-safe

**Status:** ✅ Complete and working  
**Approach:** Slots + Props (flexible, backward compatible)  
**Impact:** Better developer experience, consistent patterns

## Toast Implementation

### Overview

Toast notification system using **vue-sonner** with **shadcn-vue pattern** enhanced by **tailwind-variants**. Combines the simplicity of shadcn's approach with the organization and type-safety of tailwind-variants.

### Architecture

#### Files

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

### Features

#### Toast Types

- ✅ **Success**: Green theme with semantic tokens
- ✅ **Error**: Red theme with semantic tokens
- ✅ **Warning**: Orange theme with semantic tokens
- ✅ **Info**: Blue theme with semantic tokens
- ✅ **Default**: Neutral card theme

#### Capabilities

- ✅ **Rich colors** - Enhanced colored toasts
- ✅ **Action buttons** - Interactive buttons
- ✅ **Descriptions** - Additional message text
- ✅ **Persistent toasts** - Duration: Infinity
- ✅ **Dismissable** - Manual or automatic
- ✅ **Promise toasts** - Loading states
- ✅ **Keyboard navigation** - Alt+T focus

### Usage Examples

#### Basic Toasts

```typescript
import { toast } from '@/shared/ui/toast'

// Simple toasts
toast.success('Success!')
toast.error('Error occurred')
toast.warning('Warning!')
toast.info('Information')
toast('Default message')
```

#### With Description

```typescript
toast.success('Changes saved', {
  description: 'Your profile has been updated successfully.',
})
```

#### With Action Button

```typescript
toast('Event created', {
  action: {
    label: 'Undo',
    onClick: () => console.log('Undo clicked!'),
  },
})
```

#### Persistent Toast

```typescript
// Toast stays until manually dismissed
toast.info('Important message', {
  duration: Infinity,
})
```

#### Promise Toast

```typescript
toast.promise(fetchData(), {
  loading: 'Loading...',
  success: (data) => `${data.name} loaded!`,
  error: 'Failed to load data',
})
```

#### Dismissing Toasts

```typescript
// Dismiss specific toast
const id = toast.success('Message')
toast.dismiss(id)

// Dismiss all toasts
toast.dismiss()
```

### Semantic Token Mapping

#### Success (Green)

- Background: `bg-bg-success-subtle`
- Text: `fg-success`
- Border: `border-border-success`

#### Error (Red)

- Background: `bg-bg-error-subtle`
- Text: `fg-error`
- Border: `border-border-error`

#### Warning (Orange)

- Background: `bg-bg-warning-subtle`
- Text: `fg-warning`
- Border: `border-border-warning`

#### Info (Blue)

- Background: `bg-bg-info-subtle`
- Text: `fg-info`
- Border: `border-border-info`

#### Default (Neutral)

- Background: `bg-card`
- Text: `text-card-foreground`
- Border: `border-border`

### How It Works

#### 1. Base CSS from vue-sonner

```css
/* src/assets/main.css */
@import 'vue-sonner/style.css';
```

Provides:

- Toast animations (slide, fade, scale)
- Positioning system
- Stacking behavior
- Transitions

#### 2. Tailwind-Variants for Styling

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

#### 3. Simple API Usage

```typescript
// Just import and use - styling is automatic
import { toast } from '@/shared/ui/toast'
toast.success('Done!')
```

### Integration with Mutation Factory

The mutation factory automatically shows success/error toasts:

```typescript
// src/shared/lib/mutation/createMutationFactory.ts
toast.success(toastConfig.title, {
  description: toastConfig.description,
})
```

All CRUD operations (create, update, delete) get automatic toast notifications!

### Comparison to Other Approaches

#### Hybrid: shadcn-vue + tailwind-variants (Current) ✅

- **~150 lines** total (including variants)
- Uses vue-sonner's default component (simple)
- Tailwind-variants for organized styling (maintainable)
- Best of both worlds
- Covers 90% of use cases
- **Pattern consistency** with other components

#### Pure shadcn-vue

- **~100 lines** total
- Uses vue-sonner's default component
- Hardcoded class strings in template
- Simple but less organized
- No pattern consistency with other components

#### Custom Component (Removed)

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

### Benefits

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

### References

- [vue-sonner GitHub](https://github.com/xiaoluoboding/vue-sonner)
- [shadcn-vue Sonner](https://www.shadcn-vue.com/docs/components/sonner)
- [vue-sonner Demo](https://vue-sonner.vercel.app/)

## Summary

These fixes and implementations demonstrate the project's commitment to:

- **Solving real problems** with practical solutions
- **Maintaining backward compatibility** while adding new features
- **Using modern patterns** like tailwind-variants and semantic tokens
- **Providing flexible APIs** that work for different use cases
- **Ensuring type safety** throughout the codebase
- **Following consistent patterns** across all components

Each implementation follows the established architecture patterns and contributes to the overall design system's robustness and developer experience.
