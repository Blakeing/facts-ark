# Ark UI Field Component - Best Practices

## ✅ Verified Implementation

We've verified our Field component implementation against Ark UI's best practices from the Storybook documentation.

## 🎯 Recommended Pattern: FieldInput

### Why FieldInput over standalone Input?

According to Ark UI Storybook (lines 51-56 in Field.stories.ts):

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

## 📝 Usage Patterns

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

## 🔍 Key Features

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

The issue we had earlier was **not** the component choice, but template slot structure interfering with reactivity.

## 🐛 Debug Pattern

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

## 📋 Migration Checklist

When creating forms with Field:

- [ ] Import `Field` and `FieldInput` from `@/shared/ui/field`
- [ ] Use `FieldInput` instead of standalone `Input` for better integration
- [ ] Use slots for dynamic content (character counts, conditional errors)
- [ ] Use props for static content (simple labels, fixed helper text)
- [ ] Test `v-model` reactivity with debug pre tag
- [ ] Verify error states show/hide correctly
- [ ] Check accessibility with screen reader

## 🎓 Real-World Examples

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

## 🔗 References

- **Ark UI Field Docs**: [https://ark-ui.com/vue/docs/components/field](https://ark-ui.com/vue/docs/components/field)
- **Our Implementation**: `src/shared/ui/field/Field.vue`
- **Storybook Examples**: `src/shared/ui/field/Field.stories.ts`
- **FieldInput Component**: `src/shared/ui/field/FieldInput.vue`

## ✨ Summary

- ✅ Use **FieldInput** for best accessibility and integration
- ✅ Use **slots** for dynamic content (character counts, reactive errors)
- ✅ Use **props** for static content (simple labels, fixed text)
- ✅ Our Field component supports **both props and slots** (flexible!)
- ✅ Debug with `<pre>` tags to verify reactivity
- ✅ v-model works perfectly with proper component structure

---

**Status:** ✅ Verified against Ark UI best practices  
**Implementation:** Production-ready  
**Pattern:** FieldInput + Slots for dynamic content
