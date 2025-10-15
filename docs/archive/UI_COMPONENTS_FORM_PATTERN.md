# Form Components Architecture

## Overview

This document describes our all-in-one form component pattern that simplifies form building while maintaining flexibility for complex cases.

## Component Organization & Naming

### Flat Structure (Industry Standard)

We use a **flat directory structure** for all UI components, following the pattern used by 95% of major design systems including Material UI, Ant Design, Chakra UI, Shadcn/ui, and Adobe Spectrum.

**Location**: `src/shared/ui/[component-name]/`

All components live at the same level - no nested categories. This approach:
- ✅ Scales to 100+ components (proven by Adobe Spectrum)
- ✅ Makes components easy to find (alphabetical)
- ✅ Works perfectly with IDE autocomplete
- ✅ Eliminates subjective categorization decisions
- ✅ Simplifies imports and maintenance

### Naming Convention

Our naming makes component purpose instantly clear:

#### 1. **All-in-One Form Fields** (Use 95% of the Time)

Components with `-field` suffix or textarea are **complete, ready-to-use** with built-in label/error handling:

| Component | Directory | Purpose |
|-----------|-----------|---------|
| `TextField` | `text-field/` | Text input with label |
| `Textarea` | `textarea/` | Multi-line text with label |
| `SelectField` | `select-field/` | Dropdown with label |

**Example:**
```vue
<TextField label="Email" v-model="email" />
<!-- No Field wrapper needed! -->
```

#### 2. **Form Primitives** (Advanced Use - 5% of Cases)

Common names without suffixes are **building blocks** for custom layouts:

| Component | Directory | Purpose |
|-----------|-----------|---------|
| `Field` | `field/` | Wrapper for complex layouts |
| `FieldInput` | `field/` | Input inside Field |
| `FieldTextarea` | `field/` | Textarea inside Field |
| `Input` | `input/` | Base input (used by TextField) |
| `Select` | `select/` | Base select (used by SelectField) |

**Example:**
```vue
<Field label="Tags">
  <!-- Custom composition for complex cases -->
  <div class="flex gap-2">
    <FieldInput v-model="tag" />
    <Button @click="add">Add</Button>
  </div>
</Field>
```

### Quick Reference Table

| Need | Use This | Example |
|------|----------|---------|
| Simple text input | `TextField` | `<TextField label="Name" v-model="name" />` |
| Simple textarea | `Textarea` | `<Textarea label="Bio" v-model="bio" />` |
| Simple select | `SelectField` | `<SelectField label="Type" v-model="type" :items="[...]" />` |
| Tags input | `Field` + `FieldInput` | Custom composition with button |
| Date range | `Field` + `FieldInput` × 2 | Two inputs, one label |
| Input with button | `Field` + `FieldInput` + `Button` | Custom inline action |

See [UI Components Guide](./UI_COMPONENTS_GUIDE.md) for complete component reference.

## Pattern: All-in-One Form Components

### Design Philosophy

We use **all-in-one components** for most form inputs, where label, helper text, and error handling are built into the component itself. This reduces boilerplate and provides a consistent API across all form fields.

```vue
<!-- ✅ Simple and clean -->
<TextField
  label="Email"
  v-model="email"
  placeholder="Enter your email"
  helperText="We'll never share your email"
/>
```

Instead of:

```vue
<!-- ❌ Verbose wrapper pattern (only for edge cases) -->
<Field label="Email" helperText="We'll never share your email">
  <FieldInput v-model="email" placeholder="Enter your email" />
</Field>
```

## Available Components

### 1. TextField

All-in-one text input with built-in label and validation.

**Location:** `src/shared/ui/text-field/`

**Usage:**
```vue
<script setup>
import { TextField } from '@/shared/ui'
import { ref } from 'vue'

const email = ref('')
const hasError = ref(false)
</script>

<template>
  <!-- Basic -->
  <TextField
    label="Email"
    v-model="email"
    type="email"
    placeholder="Enter your email"
  />

  <!-- With validation -->
  <TextField
    label="Password"
    type="password"
    v-model="password"
    :invalid="hasError"
    errorText="Password must be at least 8 characters"
    required
  />

  <!-- With helper text -->
  <TextField
    label="Username"
    v-model="username"
    helperText="Only letters, numbers, and underscores"
  />
</template>
```

**Props:**
- `label` - Label text
- `helperText` - Helper text displayed below the input
- `errorText` - Error message displayed when invalid
- `invalid` - Whether the field is in an invalid state
- `type` - Input type (text, email, password, number, tel, url, search, file)
- `size` - Input size variant (sm, md, lg)
- `variant` - Input variant for styling
- `placeholder` - Placeholder text
- `required` - Whether the field is required
- `disabled` - Whether the field is disabled
- `readonly` - Whether the field is readonly
- All standard HTML input attributes via `v-bind="$attrs"`

### 2. Textarea

All-in-one textarea with built-in label and validation.

**Location:** `src/shared/ui/textarea/`

**Usage:**
```vue
<script setup>
import { Textarea } from '@/shared/ui'
import { ref } from 'vue'

const description = ref('')
</script>

<template>
  <!-- Basic -->
  <Textarea
    label="Description"
    v-model="description"
    placeholder="Enter description"
    :rows="4"
  />

  <!-- With validation -->
  <Textarea
    label="Notes"
    v-model="notes"
    :invalid="hasError"
    errorText="Notes are required"
    required
  />

  <!-- Custom resize -->
  <Textarea
    label="Comments"
    v-model="comments"
    resize="none"
    :rows="6"
  />
</template>
```

**Props:**
- `label` - Label text
- `helperText` - Helper text displayed below the textarea
- `errorText` - Error message displayed when invalid
- `invalid` - Whether the field is in an invalid state
- `size` - Textarea size variant (sm, md, lg)
- `variant` - Textarea variant for styling
- `resize` - Resize behavior (none, both, horizontal, vertical)
- `rows` - Number of visible rows (default: 3)
- `placeholder` - Placeholder text
- `required` - Whether the field is required
- `disabled` - Whether the field is disabled
- `readonly` - Whether the field is readonly
- All standard HTML textarea attributes via `v-bind="$attrs"`

### 3. SelectField

All-in-one select with built-in label and validation.

**Location:** `src/shared/ui/select-field/`

**Usage:**
```vue
<script setup>
import { SelectField } from '@/shared/ui'
import { ref } from 'vue'

const category = ref(['work'])
const priority = ref(['medium'])
</script>

<template>
  <!-- Basic -->
  <SelectField
    label="Category"
    v-model="category"
    placeholder="Select category"
    :items="[
      { value: 'work', label: 'Work' },
      { value: 'personal', label: 'Personal' },
      { value: 'other', label: 'Other' }
    ]"
  />

  <!-- With validation -->
  <SelectField
    label="Priority"
    v-model="priority"
    :invalid="hasError"
    errorText="Priority is required"
    required
    :items="[
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
      { value: 'high', label: 'High' }
    ]"
  />

  <!-- Grouped items -->
  <SelectField
    label="Framework"
    v-model="framework"
    :items="[
      {
        label: 'Frontend',
        items: [
          { value: 'react', label: 'React' },
          { value: 'vue', label: 'Vue' }
        ]
      },
      {
        label: 'Backend',
        items: [
          { value: 'node', label: 'Node.js' },
          { value: 'python', label: 'Python' }
        ]
      }
    ]"
  />
</template>
```

**Props:**
- `label` - Label text
- `helperText` - Helper text displayed below the select
- `errorText` - Error message displayed when invalid
- `invalid` - Whether the field is in an invalid state
- `items` - Array of select items or grouped items
- `placeholder` - Placeholder text when no value is selected
- `size` - Select size variant (sm, md, lg)
- `indicatorPosition` - Position of check indicator (left, right)
- `required` - Whether the field is required
- `disabled` - Whether the field is disabled
- All Ark UI Select props via `v-bind="$attrs"`

**Note:** SelectField uses array-based v-model like `v-model="[value]"` due to Ark UI's internal implementation.

## When to Use Field Wrapper (Edge Cases)

For **complex, custom layouts** that need multiple inputs or custom composition inside a single field context, use the `Field` wrapper with `FieldInput`/`FieldTextarea` components:

```vue
<template>
  <!-- Complex: Tags input with button and badge display -->
  <Field label="Tags">
    <div class="flex gap-2">
      <FieldInput
        v-model="tagInput"
        placeholder="Add a tag"
        @keypress.enter.prevent="addTag"
      />
      <Button @click="addTag">Add</Button>
    </div>
    <div v-if="tags.length" class="flex flex-wrap gap-2 mt-3">
      <Badge
        v-for="(tag, index) in tags"
        :key="index"
        @click="removeTag(index)"
      >
        {{ tag }} ×
      </Badge>
    </div>
  </Field>

  <!-- Complex: Date range with two inputs -->
  <Field label="Date Range">
    <div class="flex gap-2">
      <FieldInput v-model="startDate" placeholder="Start" />
      <span>to</span>
      <FieldInput v-model="endDate" placeholder="End" />
    </div>
  </Field>

  <!-- Complex: Password with generate button -->
  <Field label="Password">
    <div class="flex items-center gap-2">
      <FieldInput type="password" v-model="password" />
      <Button @click="generatePassword">Generate</Button>
    </div>
  </Field>
</template>
```

**When to use Field wrapper:**
- Multiple inputs under one label
- Custom layout between label and input
- Input with inline actions (buttons, icons)
- Conditional content based on field state
- Very specific one-off business logic (< 5% of cases)

**Best practice:** If you find yourself repeating a complex Field pattern, extract it to a reusable component instead.

## Best Practices

### 1. Use All-in-One for Simple Cases (95%)

```vue
<!-- ✅ Good: Simple, readable -->
<TextField label="Email" v-model="email" required />
<Textarea label="Notes" v-model="notes" :rows="4" />
<SelectField label="Priority" v-model="priority" :items="items" />
```

### 2. Extract Complex Patterns to Components

Instead of repeating complex Field layouts:

```vue
<!-- ❌ Bad: Repeating complex pattern -->
<Field label="Tags">
  <div class="flex gap-2">
    <FieldInput v-model="tagInput" @keypress.enter="addTag" />
    <Button @click="addTag">Add</Button>
  </div>
  <!-- ... badge display ... -->
</Field>
```

Extract to a reusable component:

```vue
<!-- ✅ Good: Reusable component -->
<TagsInputField label="Tags" v-model="tags" />
```

### 3. Validation Pattern

```vue
<script setup>
import { ref, computed } from 'vue'

const email = ref('')
const emailError = ref('')

const isEmailInvalid = computed(() => !!emailError.value)
</script>

<template>
  <TextField
    label="Email"
    type="email"
    v-model="email"
    :invalid="isEmailInvalid"
    :errorText="emailError"
    required
  />
</template>
```

### 4. Form Example

```vue
<script setup>
import { TextField, Textarea, SelectField } from '@/shared/ui'
import { Button } from '@/shared/ui'
import { ref } from 'vue'

const formData = ref({
  title: '',
  category: ['work'],
  description: '',
  priority: ['medium']
})

function handleSubmit() {
  // Handle form submission
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <TextField
      label="Task Title"
      v-model="formData.title"
      placeholder="Enter task title"
      required
    />

    <SelectField
      label="Category"
      v-model="formData.category"
      :items="[
        { value: 'work', label: 'Work' },
        { value: 'personal', label: 'Personal' }
      ]"
    />

    <Textarea
      label="Description"
      v-model="formData.description"
      placeholder="Describe the task..."
      :rows="4"
    />

    <SelectField
      label="Priority"
      v-model="formData.priority"
      :items="[
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]"
    />

    <Button type="submit">Submit</Button>
  </form>
</template>
```

## Benefits

1. **Less Boilerplate** - No manual Field wrapping for common cases
2. **Consistency** - Same API across all form inputs
3. **Discoverability** - All props in one place, better autocomplete
4. **Accessibility** - Label, error, and validation built-in
5. **Flexibility Preserved** - Field+FieldInput still available for custom layouts
6. **Type Safety** - Full TypeScript support with proper prop types

## Architecture

All-in-one components internally compose:
- `Field` - Provides context, label, helper text, error message
- `FieldInput`/`FieldTextarea`/`Select` - The actual input component

```vue
<!-- Internal implementation of TextField -->
<template>
  <Field :label="label" :helperText="helperText" :errorText="errorText" :invalid="invalid">
    <FieldInput v-bind="inputProps" />
  </Field>
</template>
```

This maintains all accessibility benefits (auto-linked labels, IDs, ARIA attributes) while simplifying the API.

## Migration from Field Wrapper

If you have existing code using the Field wrapper pattern:

**Before:**
```vue
<Field label="Email" helperText="Enter your email">
  <FieldInput v-model="email" placeholder="email@example.com" />
</Field>
```

**After:**
```vue
<TextField
  label="Email"
  helperText="Enter your email"
  v-model="email"
  placeholder="email@example.com"
/>
```

The Field wrapper pattern remains available for complex edge cases.

