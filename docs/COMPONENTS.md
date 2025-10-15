# Components Guide

This comprehensive guide covers the Facts Ark component system, including architecture, usage patterns, and best practices.

## Table of Contents

- [Component Architecture](#component-architecture)
- [Component Organization](#component-organization)
- [Getting Started](#getting-started)
- [Component Reference](#component-reference)
- [Folder Structure](#folder-structure)
- [Ark UI Best Practices](#ark-ui-best-practices)
- [Form Components](#form-components)
- [Best Practices](#best-practices)

## Component Architecture

### Closed Components Philosophy

Facts Ark uses **closed components** - pre-composed, simplified wrappers around Ark UI primitives that:

1. **Encapsulate logic** - Hide complexity behind a simple API
2. **Simplify usage** - Reduce boilerplate code throughout your app
3. **Ensure consistency** - Provide a single source of truth for component behavior
4. **Improve maintainability** - Changes are made in one place
5. **Enhance reusability** - Easy to use across different parts of the application

### When to Create Closed Components

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

## Component Organization

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

#### 1. All-in-One Form Fields (Use 95% of the Time)

Components with `-field` suffix or textarea are **complete, ready-to-use** with built-in label/error handling:

| Component     | Directory       | Purpose                    |
| ------------- | --------------- | -------------------------- |
| `TextField`   | `text-field/`   | Text input with label      |
| `Textarea`    | `textarea/`     | Multi-line text with label |
| `SelectField` | `select-field/` | Dropdown with label        |

**Example:**

```vue
<TextField label="Email" v-model="email" />
<!-- No Field wrapper needed! -->
```

#### 2. Form Primitives (Advanced Use - 5% of Cases)

Common names without suffixes are **building blocks** for custom layouts:

| Component       | Directory | Purpose                           |
| --------------- | --------- | --------------------------------- |
| `Field`         | `field/`  | Wrapper for complex layouts       |
| `FieldInput`    | `field/`  | Input inside Field                |
| `FieldTextarea` | `field/`  | Textarea inside Field             |
| `Input`         | `input/`  | Base input (used by TextField)    |
| `Select`        | `select/` | Base select (used by SelectField) |

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

## Getting Started

### Quick Examples

#### Avatar Component

Display user profile pictures with automatic initials fallback:

```vue
<script setup>
import { Avatar } from '@/shared/ui'
</script>

<template>
  <!-- With image -->
  <Avatar name="John Doe" src="https://example.com/avatar.jpg" />

  <!-- Initials fallback (no image) -->
  <Avatar name="Jane Smith" size="lg" />

  <!-- Different sizes -->
  <Avatar name="Bob" size="sm" />
  <Avatar name="Alice" size="xl" />
</template>
```

#### Badge Component

Show status indicators or labels:

```vue
<script setup>
import { Badge } from '@/shared/ui'
</script>

<template>
  <!-- Variants -->
  <Badge variant="success">Active</Badge>
  <Badge variant="warning">Pending</Badge>
  <Badge variant="error">Inactive</Badge>
  <Badge variant="info">New</Badge>

  <!-- Sizes -->
  <Badge size="sm">Small</Badge>
  <Badge size="md">Medium</Badge>
  <Badge size="lg">Large</Badge>
</template>
```

#### Button Component

Consistent buttons with loading states:

```vue
<script setup>
import { ref } from 'vue'
import { Button } from '@/shared/ui'

const isLoading = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  try {
    await submitForm()
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <!-- Variants -->
  <Button variant="primary">Primary</Button>
  <Button variant="secondary">Secondary</Button>
  <Button variant="outline">Outline</Button>
  <Button variant="danger">Delete</Button>

  <!-- With loading state -->
  <Button variant="primary" :loading="isLoading" @click="handleSubmit"> Submit </Button>

  <!-- Full width -->
  <Button variant="primary" :full-width="true"> Full Width Button </Button>
</template>
```

#### Card Component

Container with header, body, and footer:

```vue
<script setup>
import { Card, Avatar, Badge, Button } from '@/shared/ui'
</script>

<template>
  <Card variant="bordered">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">User Profile</h3>
        <Badge variant="success">Active</Badge>
      </div>
    </template>

    <div class="flex items-center gap-4">
      <Avatar name="Sarah Johnson" size="lg" />
      <div>
        <p class="font-semibold">Sarah Johnson</p>
        <p class="text-sm text-gray-600">Product Designer</p>
      </div>
    </div>

    <template #footer>
      <div class="flex gap-2">
        <Button variant="primary" size="sm">View Profile</Button>
        <Button variant="outline" size="sm">Message</Button>
      </div>
    </template>
  </Card>
</template>
```

### Import Multiple Components

```vue
<script setup>
// Import specific components
import { Avatar, Badge, Button, Card } from '@/shared/ui'

// Or import individually
import Avatar from '@/shared/ui/Avatar.vue'
import Badge from '@/shared/ui/Badge.vue'
</script>
```

## Component Reference

### Form Fields (All-in-One) ✅

Use these for **standard form inputs**:

| Component     | Purpose                    | Example                    |
| ------------- | -------------------------- | -------------------------- |
| `TextField`   | Text input with label      | Email, username, search    |
| `Textarea`    | Multi-line text with label | Description, comments, bio |
| `SelectField` | Dropdown with label        | Category, priority, status |
| `Checkbox`    | Single checkbox            | Agree to terms             |
| `RadioGroup`  | Radio button group         | Payment method, shipping   |
| `Switch`      | Toggle switch              | Enable notifications       |

### Form Primitives (Advanced) 🔧

Use these for **custom field layouts**:

| Component       | Purpose                   | When to Use                  |
| --------------- | ------------------------- | ---------------------------- |
| `Field`         | Field wrapper             | Multiple inputs in one field |
| `FieldInput`    | Input in Field context    | Custom composed fields       |
| `FieldTextarea` | Textarea in Field context | Custom composed fields       |
| `Input`         | Base input                | Internal use by TextField    |
| `Select`        | Base select               | Internal use by SelectField  |
| `Fieldset`      | Group of fields           | Logical field grouping       |
| `Form`          | Form container            | Form-level validation        |

### Advanced Inputs 🎨

Rich, specialized input components:

| Component       | Purpose                         |
| --------------- | ------------------------------- |
| `DatePicker`    | Date selection with calendar    |
| `ColorPicker`   | Color selection with palette    |
| `FileUpload`    | File upload with drag & drop    |
| `TagsInput`     | Multiple tag input              |
| `Combobox`      | Searchable select               |
| `PasswordInput` | Password with show/hide         |
| `PinInput`      | PIN code entry                  |
| `NumberInput`   | Number with increment/decrement |
| `Editable`      | Inline editing                  |
| `Slider`        | Range slider                    |
| `RatingGroup`   | Star rating                     |
| `SegmentGroup`  | Segmented control               |

### Buttons & Toggles 🔘

| Component     | Purpose                  |
| ------------- | ------------------------ |
| `Button`      | Primary button component |
| `Toggle`      | Toggle button            |
| `ToggleGroup` | Exclusive toggle group   |

### Overlays 📦

| Component   | Purpose            |
| ----------- | ------------------ |
| `Dialog`    | Modal dialog       |
| `Popover`   | Floating popover   |
| `Tooltip`   | Hover tooltip      |
| `HoverCard` | Rich hover content |
| `Menu`      | Dropdown menu      |

### Navigation 🧭

| Component    | Purpose              |
| ------------ | -------------------- |
| `Tabs`       | Tab navigation       |
| `Steps`      | Step indicator       |
| `Pagination` | Page navigation      |
| `Accordion`  | Collapsible sections |

### Feedback 💬

| Component  | Purpose            |
| ---------- | ------------------ |
| `Toast`    | Notification toast |
| `Progress` | Progress indicator |
| `Badge`    | Status badge       |

### Layout 📐

| Component     | Purpose             |
| ------------- | ------------------- |
| `Card`        | Content card        |
| `Collapsible` | Collapsible content |
| `Carousel`    | Image carousel      |

### Media 🖼️

| Component | Purpose           |
| --------- | ----------------- |
| `Avatar`  | User avatar       |
| `QrCode`  | QR code generator |

### Utilities 🛠️

| Component   | Purpose           |
| ----------- | ----------------- |
| `Clipboard` | Copy to clipboard |

## Folder Structure

### The Pattern

Facts Ark uses a **folder-per-component** structure with separate files for variants, types, and implementation:

```
src/shared/ui/component-name/
├── component-name.ts      # Variants + Types (combined!)
├── ComponentName.vue      # Component implementation
└── index.ts               # Public exports
```

### Example: Avatar Component

```
src/shared/ui/avatar/
├── avatar.ts       # ⭐ Variants and types together
├── Avatar.vue
└── index.ts
```

### File Responsibilities

#### 1. `*.ts` - Variants & Types Combined

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

#### 2. `*.vue` - Component Implementation

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

#### 3. `index.ts` - Public Exports

**Purpose**: Barrel export for clean imports

**Example**:

```typescript
// index.ts
export { default as Button } from './Button.vue'
export { buttonVariants, type ButtonProps } from './button'
```

**Usage**:

```typescript
import { Button, buttonVariants, type ButtonProps } from '@/shared/ui'
```

## Ark UI Best Practices

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

### Anti-Patterns to Avoid

#### ❌ 1. Don't use context composables directly

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

#### ❌ 2. Don't pass all props to Root

```vue
<!-- ❌ BAD -->
<Component.Root v-bind="props">
  <!-- This passes variant, class, etc. to Ark UI -->
</Component.Root>
```

**Why:** Ark UI will warn about unknown props

**Instead:** Use `useOmitProps` to filter custom props

#### ❌ 3. Don't inline complex variant logic

```vue
<!-- ❌ BAD -->
<div :class="variant === 'primary' ? 'bg-blue-500' : 'bg-gray-500'"></div>
```

**Why:** Inconsistent, hard to maintain, doesn't scale

**Instead:** Use `tailwind-variants` with proper variant definitions

#### ❌ 4. Don't skip HiddenInput components

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

## Form Components

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
  priority: ['medium'],
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
        { value: 'personal', label: 'Personal' },
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
        { value: 'high', label: 'High' },
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
      <FieldInput v-model="tagInput" placeholder="Add a tag" @keypress.enter.prevent="addTag" />
      <Button @click="addTag">Add</Button>
    </div>
    <div v-if="tags.length" class="flex flex-wrap gap-2 mt-3">
      <Badge v-for="(tag, index) in tags" :key="index" @click="removeTag(index)">
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

## Best Practices

### 1. Use Consistent Variants

```vue
<!-- ✅ Good - Consistent success variant -->
<Badge variant="success">Active</Badge>
<Button variant="primary">Activate</Button>

<!-- ❌ Avoid mixing unrelated variants -->
<Badge variant="error">Active</Badge>
<Button variant="primary">Activate</Button>
```

### 2. Provide Meaningful Names for Avatars

```vue
<!-- ✅ Good - Full name for better initials -->
<Avatar name="John Doe" />
<!-- Shows "JD" -->

<!-- ❌ Avoid single character names unless intentional -->
<Avatar name="J" />
<!-- Shows icon fallback -->
```

### 3. Use Loading States for Async Actions

```vue
<script setup>
const isSubmitting = ref(false)

const handleSubmit = async () => {
  isSubmitting.value = true
  try {
    await api.submit()
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <!-- ✅ Good - Shows loading state -->
  <Button :loading="isSubmitting" :disabled="isSubmitting" @click="handleSubmit"> Submit </Button>
</template>
```

### 4. Compose Components Together

```vue
<!-- ✅ Good - Components work well together -->
<Card variant="bordered">
  <template #header>
    <div class="flex items-center gap-2">
      <Avatar name="Jane Doe" size="sm" />
      <span class="font-semibold">Jane Doe</span>
      <Badge variant="success">Pro</Badge>
    </div>
  </template>
  <p>User profile content</p>
  <template #footer>
    <Button variant="outline" size="sm">Edit</Button>
  </template>
</Card>
```

### 5. Start with All-in-One Components

Always start with `TextField`, `Textarea`, `SelectField` for forms. Only use primitives when you have a specific need for custom composition.

```vue
<!-- ✅ Good: Use TextField for simple input -->
<TextField label="Email" v-model="email" />

<!-- ❌ Bad: Don't use primitives unnecessarily -->
<Field label="Email">
  <FieldInput v-model="email" />
</Field>
```

### 6. Extract Complex Patterns to Components

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

### 7. Consistent Error Handling

Use the `invalid` and `errorText` props for validation:

```vue
<TextField label="Username" v-model="username" :invalid="hasError" :errorText="errorMessage" />
```

### 8. Use Helper Text for Guidance

Provide helpful context with `helperText`:

```vue
<TextField
  label="Password"
  type="password"
  v-model="password"
  helperText="Must be at least 8 characters"
/>
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
import { TextField, Button, Dialog, DatePicker, Badge } from '@/shared/ui'
```

## TypeScript Support

All components are fully typed. Import types for advanced usage:

```typescript
import type { AvatarProps, BadgeProps, ButtonProps, CardProps } from '@/shared/ui'

const avatarConfig: AvatarProps = {
  name: 'John Doe',
  size: 'lg',
  src: '/avatar.jpg',
}
```

## Styling and Customization

All components accept a `class` prop for additional styling:

```vue
<Avatar name="John Doe" class="ring-2 ring-indigo-500 ring-offset-2" />

<Button variant="primary" class="shadow-lg hover:shadow-xl">
  Enhanced Button
</Button>
```

## Extending Components

Since components extend Ark UI base props, you can access advanced features:

```vue
<Avatar
  name="John Doe"
  :id="customId"
  :ids="{ root: 'avatar-root', image: 'avatar-img' }"
  @status-change="handleStatusChange"
/>
```

## Common Patterns

### User List

```vue
<div class="space-y-2">
  <Card v-for="user in users" :key="user.id" variant="bordered" padding="sm">
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-3">
        <Avatar :name="user.name" :src="user.avatar" />
        <div>
          <p class="font-semibold">{{ user.name }}</p>
          <p class="text-sm text-gray-600">{{ user.role }}</p>
        </div>
      </div>
      <Badge :variant="user.status === 'active' ? 'success' : 'default'">
        {{ user.status }}
      </Badge>
    </div>
  </Card>
</div>
```

### Action Confirmation

```vue
<script setup>
const showDialog = ref(false)
const isDeleting = ref(false)

const handleDelete = async () => {
  isDeleting.value = true
  try {
    await api.delete()
    showDialog.value = false
  } finally {
    isDeleting.value = false
  }
}
</script>

<template>
  <Card variant="bordered">
    <template #header>
      <h3 class="text-lg font-semibold">Confirm Delete</h3>
    </template>
    <p>Are you sure you want to delete this item?</p>
    <template #footer>
      <div class="flex gap-2 justify-end">
        <Button variant="ghost" @click="showDialog = false"> Cancel </Button>
        <Button variant="danger" :loading="isDeleting" @click="handleDelete"> Delete </Button>
      </div>
    </template>
  </Card>
</template>
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
- **Our Components:** `/src/shared/ui/`
- **Storybook:** Interactive component demos
- **Live Demo:** Visit `/components` route to see all components in action

## Summary

Facts Ark's component system provides:

✅ **Consistent API** - All components follow the same patterns  
✅ **Type Safety** - Full TypeScript support with automatic type inference  
✅ **Ark UI Integration** - Proper use of Context API and props forwarding  
✅ **Variant System** - Type-safe styling with tailwind-variants  
✅ **Form Integration** - Seamless integration with form validation  
✅ **Accessibility** - Built-in ARIA attributes and keyboard navigation  
✅ **Scalability** - Flat structure that works for 100+ components

The system follows industry standards and best practices, making it easy to build consistent, maintainable user interfaces.
