# Select Component Guide

A comprehensive, accessible select component built with Ark UI primitives and styled with Tailwind CSS.

## Features

✅ **Single selection** - Choose one option from a list  
✅ **Grouped items** - Organize options with group labels  
✅ **Avatar support** - Display user profile images  
✅ **Status indicators** - Show online/offline status  
✅ **Secondary text** - Add usernames, emails, or descriptions  
✅ **Check position** - Left or right indicator placement  
✅ **Size variants** - Small, medium, and large  
✅ **Keyboard navigation** - Full keyboard support  
✅ **Accessible** - WCAG compliant with ARIA attributes  
✅ **Form integration** - Works with native forms

## Basic Usage

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Select } from '@/components/ui'

const selected = ref<string[]>([])
</script>

<template>
  <Select
    label="Framework"
    placeholder="Select a framework"
    v-model="selected"
    :items="[
      { value: 'react', label: 'React' },
      { value: 'vue', label: 'Vue' },
      { value: 'svelte', label: 'Svelte' },
    ]"
  />
</template>
```

## Advanced Features

### With Avatars

Perfect for user selection:

```vue
<Select
  label="Assigned to"
  v-model="assignee"
  :items="[
    {
      value: 'wade',
      label: 'Wade Cooper',
      avatar: 'https://images.unsplash.com/photo-...',
    },
    {
      value: 'arlene',
      label: 'Arlene Mccoy',
      avatar: 'https://images.unsplash.com/photo-...',
    },
  ]"
/>
```

### With Status Indicators

Show online/offline status:

```vue
<Select
  label="Team member"
  v-model="member"
  :items="[
    { value: 'tom', label: 'Tom Cook', status: 'online' },
    { value: 'devon', label: 'Devon Webb', status: 'offline' },
  ]"
/>
```

### With Secondary Text

Add usernames, emails, or other descriptions:

```vue
<Select
  label="User"
  v-model="user"
  :items="[
    { value: 'wade', label: 'Wade Cooper', description: '@wadecooper' },
    { value: 'tom', label: 'Tom Cook', description: '@tomcook' },
  ]"
/>
```

### Grouped Options

Organize items into labeled groups:

```vue
<Select
  label="Country"
  v-model="country"
  :items="[
    {
      label: 'North America',
      items: [
        { value: 'us', label: 'United States' },
        { value: 'ca', label: 'Canada' },
      ],
    },
    {
      label: 'Europe',
      items: [
        { value: 'uk', label: 'United Kingdom' },
        { value: 'de', label: 'Germany' },
      ],
    },
  ]"
/>
```

### Check Indicator Position

Place the check mark on the left:

```vue
<Select
  label="Priority"
  indicator-position="left"
  v-model="priority"
  :items="[
    { value: 'low', label: 'Low' },
    { value: 'high', label: 'High' },
  ]"
/>
```

### Size Variants

```vue
<Select size="sm" :items="[...]" />
<Select size="md" :items="[...]" />
<!-- default -->
<Select size="lg" :items="[...]" />
```

## Props

### SelectProps

| Prop                | Type                                  | Default              | Description                        |
| ------------------- | ------------------------------------- | -------------------- | ---------------------------------- |
| `items`             | `SelectItem[]` \| `SelectItemGroup[]` | required             | Array of items or grouped items    |
| `label`             | `string`                              | -                    | Label text for the select          |
| `placeholder`       | `string`                              | `'Select an option'` | Placeholder when no value selected |
| `size`              | `'sm'` \| `'md'` \| `'lg'`            | `'md'`               | Size variant                       |
| `indicatorPosition` | `'left'` \| `'right'`                 | `'right'`            | Position of check indicator        |
| `modelValue`        | `string[]`                            | -                    | Selected value(s)                  |
| `disabled`          | `boolean`                             | `false`              | Disable the select                 |
| `invalid`           | `boolean`                             | `false`              | Mark as invalid                    |
| `class`             | `string`                              | -                    | Additional CSS classes             |

### SelectItem

| Property      | Type                                   | Description                            |
| ------------- | -------------------------------------- | -------------------------------------- |
| `value`       | `string`                               | Unique identifier                      |
| `label`       | `string`                               | Display text                           |
| `disabled`    | `boolean`                              | Disable this item                      |
| `avatar`      | `string`                               | Avatar image URL                       |
| `description` | `string`                               | Secondary text (username, email, etc.) |
| `status`      | `'online'` \| `'offline'` \| `boolean` | Status indicator                       |

### SelectItemGroup

| Property | Type           | Description         |
| -------- | -------------- | ------------------- |
| `label`  | `string`       | Group label         |
| `items`  | `SelectItem[]` | Items in this group |

## Events

| Event               | Payload                                    | Description                    |
| ------------------- | ------------------------------------------ | ------------------------------ |
| `update:modelValue` | `string[]`                                 | Emitted when selection changes |
| `valueChange`       | `{ value: string[], items: SelectItem[] }` | Emitted with full item details |

## Styling

The Select component uses Ark UI's data attributes for state-based styling:

- `data-[state=open]` - When dropdown is open
- `data-[highlighted]` - When item is highlighted
- `data-[state=checked]` - When item is selected
- `data-[disabled]` - When disabled
- `data-[invalid]` - When invalid
- `data-[placeholder-shown]` - When showing placeholder

## Accessibility

The Select component is fully accessible:

- ✅ Keyboard navigation (Arrow keys, Enter, Escape)
- ✅ Screen reader support
- ✅ Focus management
- ✅ ARIA attributes
- ✅ Form integration

### Keyboard Shortcuts

| Key               | Action                            |
| ----------------- | --------------------------------- |
| `Space` / `Enter` | Open dropdown or select item      |
| `↓` / `↑`         | Navigate items                    |
| `Escape`          | Close dropdown                    |
| `A-Z`             | Jump to item starting with letter |

## Design Philosophy

This component follows our **70/30 approach**:

**70% Tailwind UI** - Visual design, colors, spacing, interactions  
**30% Ark UI** - Structure, behavior, accessibility, data attributes

This gives us the polished look of Tailwind UI with the robust accessibility of Ark UI.

## Related Components

- [Checkbox](./CHECKBOX_COMPONENT.md) - For multiple selections
- [Switch](./SWITCH_COMPONENT.md) - For boolean toggles
- [Tabs](./TABS_COMPONENT.md) - For navigation between views

## Examples

See the [Form Inputs demo page](/components/form-inputs) for live examples of all Select variants.
