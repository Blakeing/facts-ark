# Field & Input Components - Best Practices Guide

## Overview

This comprehensive guide covers the relationship between `Field` and `Input` components, when to use each, and best practices for form implementation in Facts Ark.

## Component Architecture

### 1. **Field** (Form Field Wrapper)

- **Purpose**: Container component that provides complete form field structure
- **Source**: Ark UI's Field component
- **Features**:
  - Label with required indicator (\*)
  - Helper text (hints/instructions)
  - Error messages
  - Full accessibility (ARIA attributes, proper IDs)
  - State management (invalid, disabled, required)
  - Context provider for child inputs

### 2. **Input** (Styled Input Element)

- **Purpose**: Standalone styled `<input>` HTML element
- **Source**: Custom component
- **Features**:
  - Visual styling (borders, padding, colors)
  - Size variants (sm, md, lg)
  - Visual states (default, error)
  - Standard HTML input attributes
  - Dark mode support via semantic tokens

### 3. **FieldInput** (Recommended - Best of Both)

- **Purpose**: Specialized input that integrates with Field context
- **Source**: Custom wrapper combining Ark UI Field.Input + Input styling
- **Features**:
  - Automatic accessibility from Field context
  - Auto-detection of invalid state
  - Proper ID and ARIA attribute management
  - All styling features from Input component

## ✅ Recommended Pattern: FieldInput

### Why FieldInput over standalone Input?

According to Ark UI Storybook best practices:

> **BEST PRACTICE: Use FieldInput for seamless integration**
> FieldInput automatically:
>
> - Connects to Field's accessibility context
> - Inherits invalid state for error styling
> - Gets proper IDs and ARIA attributes

### Component Architecture

```
Field.vue (wrapper)
  └── FieldInput.vue (input with context)
      └── Field.Context (Ark UI context)
          └── Field.Input (Ark UI input)
```

**FieldInput** wraps Ark UI's `Field.Input` with:

- Automatic accessibility IDs
- Context-aware validation styling
- ARIA attributes from parent Field
- Our custom `inputVariants` styling

## Usage Patterns

### ✅ Best Practice (Using FieldInput)

```vue
<script setup lang="ts">
import { Field, FieldInput } from '@/shared/ui/field'
import { ref } from 'vue'

const title = ref('')
const isValid = computed(() => title.value.length > 0)
</script>

<template>
  <Field label="Title" required :invalid="!isValid">
    <FieldInput v-model="title" placeholder="Enter title..." maxlength="200" />
    <template #helperText>
      <span>{{ title.length }}/200 characters</span>
    </template>
    <template #errorText>
      <span>Title is required</span>
    </template>
  </Field>
</template>
```

### ✅ Also Works (Standalone Input)

```vue
<script setup lang="ts">
import { Field } from '@/shared/ui/field'
import { Input } from '@/shared/ui/input'
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <Field label="Email" required>
    <Input v-model="email" type="email" placeholder="you@example.com" />
  </Field>
</template>
```

**Note:** This works but doesn't get automatic accessibility features from Field context.

## Key Features

### 1. Slot Support (Both Props and Slots)

Our enhanced Field component supports both:

**Props (simple, static text):**

```vue
<Field
  label="Email"
  helperText="We'll never share your email"
  :invalid="hasError"
  errorText="Email is required"
>
  <FieldInput type="email" />
</Field>
```

**Slots (dynamic, reactive content):**

```vue
<Field label="Password" :invalid="tooShort">
  <FieldInput type="password" />
  <template #helperText>
    {{ password.length }}/50 characters
  </template>
  <template #errorText>
    <span v-if="tooShort">Must be at least 8 characters</span>
    <span v-else>Password is required</span>
  </template>
</Field>
```

### 2. Automatic Error Styling

When `Field` has `:invalid="true"`:

- FieldInput automatically applies error styling
- ErrorText shows (hides HelperText)
- Input gets red border from `variant: 'error'`

### 3. Accessibility Built-in

FieldInput provides:

- `aria-invalid` when Field is invalid
- `aria-describedby` linking to helper/error text
- Proper `id` and `for` attributes
- Required indicator (`*`)

### 4. v-model Support

Both Input and FieldInput fully support `v-model`:

```vue
<FieldInput v-model="title" />
<!-- or -->
<Input v-model="title" />
```

## Complete Form Example

```vue
<script setup>
import { ref } from 'vue'
import { Field, FieldInput } from '@/shared/ui/field'
import { Textarea } from '@/shared/ui/textarea'

const form = ref({
  name: '',
  email: '',
  message: '',
})

const errors = ref({
  name: false,
  email: false,
})

const validate = () => {
  errors.value.name = form.value.name.length < 2
  errors.value.email = !form.value.email.includes('@')
}
</script>

<template>
  <form @submit.prevent="validate" class="space-y-4">
    <Field
      label="Full Name"
      required
      :invalid="errors.name"
      :errorText="errors.name ? 'Name must be at least 2 characters' : undefined"
      helperText="Enter your first and last name"
    >
      <FieldInput v-model="form.name" type="text" placeholder="John Doe" />
    </Field>

    <Field
      label="Email"
      required
      :invalid="errors.email"
      :errorText="errors.email ? 'Please enter a valid email' : undefined"
    >
      <FieldInput v-model="form.email" type="email" placeholder="john@example.com" />
    </Field>

    <Field label="Message" helperText="Optional: Tell us what you're interested in">
      <Textarea v-model="form.message" placeholder="Your message..." :rows="4" />
    </Field>

    <button type="submit">Submit</button>
  </form>
</template>
```

## Size Variants

FieldInput supports three sizes:

```vue
<Field label="Small">
  <FieldInput size="sm" placeholder="Small input (h-9)" />
</Field>

<Field label="Medium (default)">
  <FieldInput size="md" placeholder="Medium input (h-10)" />
</Field>

<Field label="Large">
  <FieldInput size="lg" placeholder="Large input (h-11)" />
</Field>
```

## Auto Error State

FieldInput automatically detects the `invalid` prop from Field:

```vue
<!-- FieldInput automatically shows error styling -->
<Field label="Email" invalid errorText="Invalid email">
  <FieldInput type="email" />
</Field>

<!-- vs. manual error state with standalone Input -->
<Field label="Email" invalid errorText="Invalid email">
  <Input type="email" variant="error" />
</Field>
```

## Real-World Examples

### Character Counter (Dynamic Slot)

```vue
<Field label="Bio" :invalid="tooLong">
  <FieldInput v-model="bio" maxlength="500" />
  <template #helperText>
    <span>{{ bio.length }}/500 characters</span>
  </template>
  <template #errorText>
    <span>Bio is too long</span>
  </template>
</Field>
```

### Conditional Error Messages (Dynamic Slot)

```vue
<Field label="Password" :invalid="hasPasswordError">
  <FieldInput type="password" v-model="password" />
  <template #errorText>
    <span v-if="password.length === 0">Password is required</span>
    <span v-else-if="password.length < 8">Must be at least 8 characters</span>
    <span v-else-if="!hasNumber">Must contain a number</span>
    <span v-else-if="!hasSpecial">Must contain a special character</span>
  </template>
</Field>
```

### Simple Static Text (Props)

```vue
<Field label="Email" required helperText="We'll send you a confirmation email">
  <FieldInput type="email" v-model="email" />
</Field>
```

## Debug Pattern

When debugging forms, add a `<pre>` tag to see live values:

```vue
<pre class="mt-4 rounded bg-gray-100 p-2 text-xs dark:bg-gray-800">{{
  JSON.stringify(
    {
      title: title,
      titleLength: title.length,
      isValid: isValid,
      canSubmit: canSubmit,
      isPending: isPending,
    },
    null,
    2
  )
}}</pre>
```

This helps verify:

- ✅ v-model is working (value updates)
- ✅ Computed properties are reactive
- ✅ Validation logic is correct
- ✅ State updates in real-time

## When Each Component is Necessary

| Scenario                    | Use Field? | Use Input or FieldInput?     |
| --------------------------- | ---------- | ---------------------------- |
| Form field with label       | ✅ Yes     | ✅ FieldInput (inside Field) |
| Form field with validation  | ✅ Yes     | ✅ FieldInput (inside Field) |
| Simple search bar           | ❌ No      | ✅ Input (standalone)        |
| Filter input                | ❌ No      | ✅ Input (standalone)        |
| Quick text input in toolbar | ❌ No      | ✅ Input (standalone)        |
| Complex form                | ✅ Yes     | ✅ FieldInput (inside Field) |

## Migration Guide

If you have existing code using `Field` with standalone `Input`:

**Before:**

```vue
<Field label="Email" :invalid="hasError">
  <Input v-model="email" :variant="hasError ? 'error' : 'default'" />
</Field>
```

**After:**

```vue
<Field label="Email" :invalid="hasError">
  <FieldInput v-model="email" />
</Field>
```

The error state is automatically handled! 🎉

## Migration Checklist

When creating forms with Field:

- [ ] Import `Field` and `FieldInput` from `@/shared/ui/field`
- [ ] Use `FieldInput` instead of standalone `Input` for better integration
- [ ] Use slots for dynamic content (character counts, conditional errors)
- [ ] Use props for static content (simple labels, fixed helper text)
- [ ] Test `v-model` reactivity with debug pre tag
- [ ] Verify error states show/hide correctly
- [ ] Check accessibility with screen reader

## Summary

### Are both Field and Input necessary?

**Yes!** They serve complementary roles:

- **Field** = Structure + Labels + Accessibility + Validation UI
- **Input** = Styled HTML input element
- **FieldInput** = Best of both (Field context + Input styling)

### What should I use?

**Use FieldInput inside Field** for 90% of use cases. It gives you:

- Complete accessibility
- Automatic error state detection
- Beautiful styling
- Consistent form UX

### When to use standalone Input?

Only for simple inputs without labels, like search bars or filters.

## References

- **Ark UI Field Docs**: [https://ark-ui.com/vue/docs/components/field](https://ark-ui.com/vue/docs/components/field)
- **Our Implementation**: `src/shared/ui/field/Field.vue`
- **Storybook Examples**: `src/shared/ui/field/Field.stories.ts`
- **FieldInput Component**: `src/shared/ui/field/FieldInput.vue`

---

**Status:** ✅ Verified against Ark UI best practices  
**Implementation:** Production-ready  
**Pattern:** FieldInput + Slots for dynamic content
