# UI Components

Quick reference for the UI component library. For detailed documentation, see [UI Components Guide](../../docs/UI_COMPONENTS_GUIDE.md).

## Quick Start

```ts
// Import from main barrel
import { TextField, Textarea, SelectField, Button, Dialog } from '@/shared/ui'
```

## Naming Convention

🎯 **`-field` suffix or textarea** = All-in-one with label/error (use 95% of the time)  
🔧 **Common names** = Primitives for custom layouts (use 5% of the time)

## Form Components

### All-in-One (Use These) ✅

```vue
<TextField label="Email" v-model="email" placeholder="your@email.com" />
<Textarea label="Notes" v-model="notes" :rows="4" />
<SelectField label="Priority" v-model="priority" :items="items" />
```

**When to use**: Any standard form input needs

**Available:**
- `TextField` - Text input with label
- `Textarea` - Multi-line text with label
- `SelectField` - Dropdown with label
- `Checkbox` - Checkbox with label
- `RadioGroup` - Radio buttons with label
- `Switch` - Toggle switch

### Primitives (Advanced) 🔧

```vue
<Field label="Tags">
  <div class="flex gap-2">
    <FieldInput v-model="tag" />
    <Button @click="addTag">Add</Button>
  </div>
</Field>
```

**When to use**: Custom field layouts, multiple inputs under one label

**Available:**
- `Field` - Wrapper for custom layouts
- `FieldInput` - Input inside Field
- `FieldTextarea` - Textarea inside Field
- `Input` - Base input (used by TextField)
- `Select` - Base select (used by SelectField)

## Component Categories

### Form Fields
`text-field/`, `textarea/`, `select-field/`, `checkbox/`, `radio-group/`, `switch/`

### Form Primitives
`field/`, `fieldset/`, `form/`, `input/`, `select/`

### Advanced Inputs
`date-picker/`, `color-picker/`, `file-upload/`, `tags-input/`, `combobox/`, `password-input/`, `pin-input/`, `number-input/`, `editable/`, `slider/`, `rating-group/`, `segment-group/`

### Buttons & Toggles
`button/`, `toggle/`, `toggle-group/`

### Overlays
`dialog/`, `popover/`, `tooltip/`, `hover-card/`, `menu/`

### Navigation
`tabs/`, `steps/`, `pagination/`, `accordion/`

### Feedback
`toast/`, `progress/`, `badge/`

### Layout
`card/`, `collapsible/`, `carousel/`

### Media
`avatar/`, `qr-code/`

### Utilities
`clipboard/`

## Common Patterns

### Simple Form

```vue
<script setup lang="ts">
import { TextField, SelectField, Button } from '@/shared/ui'
import { ref } from 'vue'

const form = ref({ name: '', type: ['work'] })
</script>

<template>
  <form class="space-y-4">
    <TextField label="Name" v-model="form.name" required />
    <SelectField label="Type" v-model="form.type" :items="[...]" />
    <Button type="submit">Submit</Button>
  </form>
</template>
```

### With Validation

```vue
<TextField
  label="Email"
  v-model="email"
  :invalid="hasError"
  :errorText="errorMessage"
  helperText="Use your work email"
/>
```

### Custom Field

```vue
<Field label="Date Range">
  <div class="flex gap-2">
    <FieldInput v-model="start" placeholder="Start" />
    <span>to</span>
    <FieldInput v-model="end" placeholder="End" />
  </div>
</Field>
```

## Documentation

- 📚 [UI Components Guide](../../docs/UI_COMPONENTS_GUIDE.md) - Complete reference
- 📝 [Form Components Pattern](../../docs/UI_COMPONENTS_FORM_PATTERN.md) - Form architecture
- 🎨 Storybook - Interactive demos (run `pnpm storybook`)

## Design System Inspiration

Our flat structure follows industry standards from:
- Shadcn/ui, Material UI, Ant Design, Chakra UI
- Adobe Spectrum (100+ components, still flat!)
- Radix UI, Ark UI, Vuetify

Flat structure scales better and is easier to maintain than nested categories.

