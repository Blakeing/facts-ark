# Field & Input Components - Best Practices Guide

## Overview

This guide explains the relationship between `Field` and `Input` components and when to use each.

## Components

### 1. **Field** (Form Field Wrapper)
- **Purpose**: Container component that provides complete form field structure
- **Source**: Ark UI's Field component
- **Features**:
  - Label with required indicator (*)
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

## Usage Patterns

### ✅ BEST PRACTICE: Use FieldInput inside Field

This is the **recommended pattern** for most forms:

```vue
<script setup>
import { Field, FieldInput } from '@/components/ui/field'
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <Field
    label="Email"
    required
    helperText="We'll send a confirmation email"
    :invalid="emailError"
    errorText="Please enter a valid email"
  >
    <FieldInput
      v-model="email"
      type="email"
      placeholder="you@example.com"
    />
  </Field>
</template>
```

**Why this is best:**
- ✅ Automatic accessibility
- ✅ Auto-detection of error state from Field
- ✅ No need to pass `invalid` prop to input
- ✅ Proper ID management
- ✅ Custom styling from our design system

### Alternative: Use Field with Ark UI's Built-in Input

```vue
<template>
  <Field label="Username">
    <Field.Input type="text" />
  </Field>
</template>
```

**Use when:**
- You want minimal styling
- You're okay with Ark UI's default input appearance
- You don't need custom size variants

### Standalone Input (Rare Cases)

```vue
<template>
  <!-- Simple search bar without labels -->
  <Input v-model="search" placeholder="Search..." />
</template>
```

**Use when:**
- No label/helper text needed
- Simple standalone inputs (search bars, filters)
- You're building a custom field wrapper

### Legacy: Field with standalone Input

```vue
<template>
  <Field label="Email" :invalid="hasError">
    <Input
      v-model="email"
      type="email"
      variant="error"  <!-- Manual error state -->
    />
  </Field>
</template>
```

**Still works, but FieldInput is better because:**
- ❌ Need to manually sync error state
- ❌ Need to pass `variant="error"` manually
- ❌ More verbose

## Complete Form Example

```vue
<script setup>
import { ref } from 'vue'
import { Field, FieldInput } from '@/components/ui/field'
import { Textarea } from '@/components/ui/textarea'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const errors = ref({
  name: false,
  email: false
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
      <FieldInput
        v-model="form.name"
        type="text"
        placeholder="John Doe"
      />
    </Field>

    <Field
      label="Email"
      required
      :invalid="errors.email"
      :errorText="errors.email ? 'Please enter a valid email' : undefined"
    >
      <FieldInput
        v-model="form.email"
        type="email"
        placeholder="john@example.com"
      />
    </Field>

    <Field
      label="Message"
      helperText="Optional: Tell us what you're interested in"
    >
      <Textarea
        v-model="form.message"
        placeholder="Your message..."
        :rows="4"
      />
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

## When Each Component is Necessary

| Scenario | Use Field? | Use Input or FieldInput? |
|----------|-----------|-------------------------|
| Form field with label | ✅ Yes | ✅ FieldInput (inside Field) |
| Form field with validation | ✅ Yes | ✅ FieldInput (inside Field) |
| Simple search bar | ❌ No | ✅ Input (standalone) |
| Filter input | ❌ No | ✅ Input (standalone) |
| Quick text input in toolbar | ❌ No | ✅ Input (standalone) |
| Complex form | ✅ Yes | ✅ FieldInput (inside Field) |

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
