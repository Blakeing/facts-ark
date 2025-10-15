# UI Components Guide

## Overview

This guide explains our UI component organization, naming conventions, and when to use each component. Our structure follows industry-standard patterns used by Material UI, Ant Design, Chakra UI, Shadcn/ui, and other major design systems.

## Component Organization

We use a **flat structure** with all components at the same level in `src/shared/ui/`. This is the industry standard approach used by nearly all major design systems, even those with 100+ components (e.g., Adobe Spectrum).

### Why Flat Structure?

✅ **Simple** - No guessing which category a component belongs to  
✅ **Easy to Find** - Alphabetical order, clear navigation  
✅ **IDE Friendly** - Autocomplete works perfectly  
✅ **Scales Well** - Works for 100+ components (proven by major design systems)  
✅ **No Debates** - No subjective categorization decisions  

## Naming Conventions

Our naming convention makes it instantly clear what each component does:

### 1. All-in-One Form Fields (Use 95% of the Time)

**Pattern**: Components with `-field` suffix or textarea

These are **complete, ready-to-use form fields** with built-in label, helper text, and error handling.

**Examples:**
- `text-field/` → `<TextField label="Email" v-model="email" />`
- `textarea/` → `<Textarea label="Notes" v-model="notes" />`
- `select-field/` → `<SelectField label="Priority" v-model="priority" :items="items" />`

**When to use:**
- Building any standard form
- Need label + input + error message
- Want consistent field styling
- 95% of form field use cases

### 2. Form Primitives (Advanced Use - 5% of Cases)

**Pattern**: Common names without suffixes

These are **building blocks** for creating custom, complex field layouts.

**Examples:**
- `field/` → Wrapper for custom layouts
- `input/` → Base input (used internally by TextField)
- `select/` → Base select (used internally by SelectField)
- `fieldset/` → Group of related fields
- `form/` → Form container

**When to use:**
- Custom field layouts (e.g., tags input with add button)
- Multiple inputs under one label (e.g., date range)
- Input with inline actions
- Very specific business requirements

### 3. Specialized Components

**Pattern**: Descriptive names

Components for specific use cases or non-form UI elements.

**Examples:**
- `date-picker/`, `color-picker/`, `file-upload/`
- `button/`, `dialog/`, `card/`, `badge/`
- `tabs/`, `accordion/`, `tooltip/`

## Component Reference

### Form Fields (All-in-One) ✅

Use these for **standard form inputs**:

| Component | Purpose | Example |
|-----------|---------|---------|
| `TextField` | Text input with label | Email, username, search |
| `Textarea` | Multi-line text with label | Description, comments, bio |
| `SelectField` | Dropdown with label | Category, priority, status |
| `Checkbox` | Single checkbox | Agree to terms |
| `RadioGroup` | Radio button group | Payment method, shipping |
| `Switch` | Toggle switch | Enable notifications |

### Form Primitives (Advanced) 🔧

Use these for **custom field layouts**:

| Component | Purpose | When to Use |
|-----------|---------|-------------|
| `Field` | Field wrapper | Multiple inputs in one field |
| `FieldInput` | Input in Field context | Custom composed fields |
| `FieldTextarea` | Textarea in Field context | Custom composed fields |
| `Input` | Base input | Internal use by TextField |
| `Select` | Base select | Internal use by SelectField |
| `Fieldset` | Group of fields | Logical field grouping |
| `Form` | Form container | Form-level validation |

### Advanced Inputs 🎨

Rich, specialized input components:

| Component | Purpose |
|-----------|---------|
| `DatePicker` | Date selection with calendar |
| `ColorPicker` | Color selection with palette |
| `FileUpload` | File upload with drag & drop |
| `TagsInput` | Multiple tag input |
| `Combobox` | Searchable select |
| `PasswordInput` | Password with show/hide |
| `PinInput` | PIN code entry |
| `NumberInput` | Number with increment/decrement |
| `Editable` | Inline editing |
| `Slider` | Range slider |
| `RatingGroup` | Star rating |
| `SegmentGroup` | Segmented control |

### Buttons & Toggles 🔘

| Component | Purpose |
|-----------|---------|
| `Button` | Primary button component |
| `Toggle` | Toggle button |
| `ToggleGroup` | Exclusive toggle group |

### Overlays 📦

| Component | Purpose |
|-----------|---------|
| `Dialog` | Modal dialog |
| `Popover` | Floating popover |
| `Tooltip` | Hover tooltip |
| `HoverCard` | Rich hover content |
| `Menu` | Dropdown menu |

### Navigation 🧭

| Component | Purpose |
|-----------|---------|
| `Tabs` | Tab navigation |
| `Steps` | Step indicator |
| `Pagination` | Page navigation |
| `Accordion` | Collapsible sections |

### Feedback 💬

| Component | Purpose |
|-----------|---------|
| `Toast` | Notification toast |
| `Progress` | Progress indicator |
| `Badge` | Status badge |

### Layout 📐

| Component | Purpose |
|-----------|---------|
| `Card` | Content card |
| `Collapsible` | Collapsible content |
| `Carousel` | Image carousel |

### Media 🖼️

| Component | Purpose |
|-----------|---------|
| `Avatar` | User avatar |
| `QrCode` | QR code generator |

### Utilities 🛠️

| Component | Purpose |
|-----------|---------|
| `Clipboard` | Copy to clipboard |

## Usage Examples

### Standard Form (95% of Cases)

Use all-in-one form field components:

```vue
<script setup lang="ts">
import { TextField, Textarea, SelectField } from '@/shared/ui'
import { ref } from 'vue'

const formData = ref({
  title: '',
  category: ['work'],
  description: '',
  priority: ['medium']
})
</script>

<template>
  <form class="space-y-4">
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
  </form>
</template>
```

### Custom Field Layout (5% of Cases)

Use primitives when you need custom composition:

```vue
<script setup lang="ts">
import { Field, FieldInput } from '@/shared/ui'
import { Button, Badge } from '@/shared/ui'
import { ref } from 'vue'

const tagInput = ref('')
const tags = ref<string[]>([])

function addTag() {
  if (tagInput.value.trim()) {
    tags.value.push(tagInput.value.trim())
    tagInput.value = ''
  }
}

function removeTag(index: number) {
  tags.value.splice(index, 1)
}
</script>

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
</template>
```

### Form Validation

```vue
<script setup lang="ts">
import { TextField } from '@/shared/ui'
import { ref, computed } from 'vue'

const email = ref('')
const emailError = ref('')

const isEmailInvalid = computed(() => !!emailError.value)

function validateEmail() {
  if (!email.value) {
    emailError.value = 'Email is required'
  } else if (!email.value.includes('@')) {
    emailError.value = 'Please enter a valid email'
  } else {
    emailError.value = ''
  }
}
</script>

<template>
  <TextField
    label="Email"
    type="email"
    v-model="email"
    placeholder="your@email.com"
    :invalid="isEmailInvalid"
    :errorText="emailError"
    required
    @blur="validateEmail"
  />
</template>
```

## Import Patterns

All components are exported from the main barrel:

```ts
// ✅ All-in-one form fields (use 95% of the time)
import { TextField, Textarea, SelectField } from '@/shared/ui'

// ✅ Primitives (for complex custom layouts)
import { Field, FieldInput, FieldTextarea } from '@/shared/ui'

// ✅ Advanced inputs
import { DatePicker, TagsInput, ColorPicker } from '@/shared/ui'

// ✅ Other components
import { Button, Dialog, Card, Badge } from '@/shared/ui'

// ✅ Everything from one place
import { 
  TextField, 
  Button, 
  Dialog, 
  DatePicker,
  Badge 
} from '@/shared/ui'
```

## Best Practices

### 1. Start with All-in-One Components

Always start with `TextField`, `Textarea`, `SelectField` for forms. Only use primitives when you have a specific need for custom composition.

```vue
<!-- ✅ Good: Use TextField for simple input -->
<TextField label="Email" v-model="email" />

<!-- ❌ Bad: Don't use primitives unnecessarily -->
<Field label="Email">
  <FieldInput v-model="email" />
</Field>
```

### 2. Extract Complex Patterns to Components

If you find yourself repeating a complex Field pattern, extract it to a reusable component:

```vue
<!-- ❌ Bad: Repeating complex pattern -->
<Field label="Tags">
  <div class="flex gap-2">
    <FieldInput v-model="tagInput" />
    <Button @click="addTag">Add</Button>
  </div>
  <!-- ... -->
</Field>

<!-- ✅ Good: Extract to component -->
<TagsField label="Tags" v-model="tags" />
```

### 3. Consistent Error Handling

Use the `invalid` and `errorText` props for validation:

```vue
<TextField
  label="Username"
  v-model="username"
  :invalid="hasError"
  :errorText="errorMessage"
/>
```

### 4. Use Helper Text for Guidance

Provide helpful context with `helperText`:

```vue
<TextField
  label="Password"
  type="password"
  v-model="password"
  helperText="Must be at least 8 characters"
/>
```

## Storybook Organization

Components are organized in Storybook using category prefixes:

- **Forms/** - All form-related components
  - `Forms/TextField`
  - `Forms/Textarea`
  - `Forms/SelectField`
  - `Forms/Primitives/Field` - Advanced use
- **Overlays/** - Dialog, Popover, Tooltip
- **Navigation/** - Tabs, Steps, Pagination
- **Feedback/** - Toast, Progress, Badge

This provides visual grouping without changing the file structure.

## Related Documentation

- [Form Components Pattern](./UI_COMPONENTS_FORM_PATTERN.md) - Detailed guide to form components
- [UI Components README](../src/shared/ui/README.md) - Quick reference
- Storybook - Interactive component demos

## Design System Inspiration

Our approach follows industry standards from:

- **Shadcn/ui** - Flat structure, ~50 components
- **Material UI** - Flat structure, 70+ components
- **Ant Design** - Flat structure, 50+ components
- **Chakra UI** - Flat structure, 60+ components
- **Adobe Spectrum** - Flat structure, 100+ components
- **Radix UI** - Package-based flat structure
- **Ark UI** - Flat structure (our foundation)
- **Vuetify** - Flat structure with prefix, 80+ components

All major design systems use flat structures because it's simpler, more maintainable, and scales better than hierarchical organization.

