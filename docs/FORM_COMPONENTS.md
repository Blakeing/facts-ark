# Form Components Guide

A comprehensive guide to the form input components in Facts Ark.

## Overview

Our form components follow the **Ark-first philosophy** (90% Ark UI / 10% Tailwind), providing accessible, keyboard-navigable form controls with minimal custom styling.

## Components

### Input

A simple text input component with native browser behavior.

#### Features

- Multiple input types (text, email, password, number, tel, url, search)
- Size variants (sm, md, lg)
- State management (disabled, readonly, invalid)
- Native browser validation
- Placeholder support

#### Basic Usage

```vue
<Input v-model="value" placeholder="Enter text" />
<Input type="email" required />
<Input size="lg" invalid />
```

#### Props

| Prop          | Type                   | Default  | Description                    |
| ------------- | ---------------------- | -------- | ------------------------------ |
| `size`        | `'sm' \| 'md' \| 'lg'` | `'md'`   | Input size variant             |
| `invalid`     | `boolean`              | `false`  | Whether the input is invalid   |
| `type`        | `string`               | `'text'` | HTML input type                |
| `disabled`    | `boolean`              | `false`  | Whether the input is disabled  |
| `readonly`    | `boolean`              | `false`  | Whether the input is read-only |
| `required`    | `boolean`              | `false`  | Whether the input is required  |
| `placeholder` | `string`               | -        | Placeholder text               |
| `class`       | `string`               | -        | Additional CSS classes         |

#### Examples

**Different Types:**

```vue
<Input type="text" placeholder="Username" />
<Input type="email" placeholder="you@example.com" />
<Input type="password" placeholder="••••••••" />
<Input type="number" placeholder="42" />
```

**Sizes:**

```vue
<Input size="sm" placeholder="Small" />
<Input size="md" placeholder="Medium (default)" />
<Input size="lg" placeholder="Large" />
```

**States:**

```vue
<Input placeholder="Normal" />
<Input disabled placeholder="Disabled" />
<Input readonly value="Read-only" />
<Input invalid placeholder="Invalid" />
```

---

### Textarea

A multi-line text input component.

#### Features

- Size variants (sm, md, lg)
- Resize control (none, both, vertical, horizontal)
- State management (disabled, readonly, invalid)
- Configurable rows
- Native browser behavior

#### Basic Usage

```vue
<Textarea v-model="bio" placeholder="Tell us about yourself..." />
<Textarea rows="5" resize="none" />
<Textarea size="lg" invalid />
```

#### Props

| Prop          | Type                                             | Default      | Description                       |
| ------------- | ------------------------------------------------ | ------------ | --------------------------------- |
| `size`        | `'sm' \| 'md' \| 'lg'`                           | `'md'`       | Textarea size variant             |
| `invalid`     | `boolean`                                        | `false`      | Whether the textarea is invalid   |
| `resize`      | `'none' \| 'both' \| 'vertical' \| 'horizontal'` | `'vertical'` | Resize behavior                   |
| `rows`        | `number`                                         | `3`          | Number of visible rows            |
| `disabled`    | `boolean`                                        | `false`      | Whether the textarea is disabled  |
| `readonly`    | `boolean`                                        | `false`      | Whether the textarea is read-only |
| `required`    | `boolean`                                        | `false`      | Whether the textarea is required  |
| `placeholder` | `string`                                         | -            | Placeholder text                  |
| `class`       | `string`                                         | -            | Additional CSS classes            |

#### Examples

**Resize Options:**

```vue
<Textarea resize="vertical" placeholder="Can resize vertically" />
<Textarea resize="none" placeholder="Cannot resize" />
<Textarea resize="both" placeholder="Can resize both directions" />
```

**With Rows:**

```vue
<Textarea rows="3" placeholder="3 rows (default)" />
<Textarea rows="5" placeholder="5 rows" />
<Textarea rows="10" placeholder="10 rows" />
```

---

### Field (Ark UI)

A wrapper component for form inputs that provides labels, helper text, and error messages with full accessibility.

#### Features

- Accessible labels with proper ARIA attributes
- Helper text for guidance
- Error message display
- Required indicator
- Automatic ID linking
- Keyboard navigation
- Screen reader support

#### Basic Usage

```vue
<Field label="Email" helperText="We'll never share your email">
  <ArkField.Input as-child>
    <Input v-model="email" type="email" />
  </ArkField.Input>
</Field>
```

#### Props

| Prop         | Type      | Default | Description                          |
| ------------ | --------- | ------- | ------------------------------------ |
| `label`      | `string`  | -       | Label text                           |
| `helperText` | `string`  | -       | Helper text (shown when not invalid) |
| `errorText`  | `string`  | -       | Error message (shown when invalid)   |
| `required`   | `boolean` | `false` | Whether the field is required        |
| `invalid`    | `boolean` | `false` | Whether the field is invalid         |
| `disabled`   | `boolean` | `false` | Whether the field is disabled        |
| `readonly`   | `boolean` | `false` | Whether the field is read-only       |
| `id`         | `string`  | -       | Custom field ID                      |
| `class`      | `string`  | -       | Additional CSS classes               |

#### Examples

**With Helper Text:**

```vue
<Field label="Username" helperText="Choose a unique username" required>
  <ArkField.Input as-child>
    <Input v-model="username" />
  </ArkField.Input>
</Field>
```

**With Error:**

```vue
<Field label="Email" errorText="Please enter a valid email" invalid>
  <ArkField.Input as-child>
    <Input type="email" invalid />
  </ArkField.Input>
</Field>
```

**With Textarea:**

```vue
<Field label="Bio" helperText="Tell us about yourself">
  <ArkField.Textarea as-child>
    <Textarea v-model="bio" rows="4" />
  </ArkField.Textarea>
</Field>
```

**With Select:**

```vue
<Field label="Country" required>
  <ArkField.Select as-child>
    <Select :items="countries" />
  </ArkField.Select>
</Field>
```

---

### Fieldset (Ark UI)

A component for grouping related form fields with a legend and optional helper/error text.

#### Features

- Semantic HTML `<fieldset>` element
- Accessible legend
- Group-level helper text
- Group-level error messages
- Disabled state for all child inputs
- Proper ARIA attributes

#### Basic Usage

```vue
<Fieldset legend="Personal Information">
  <Field label="First Name">
    <ArkField.Input as-child>
      <Input v-model="firstName" />
    </ArkField.Input>
  </Field>
  
  <Field label="Last Name">
    <ArkField.Input as-child>
      <Input v-model="lastName" />
    </ArkField.Input>
  </Field>
</Fieldset>
```

#### Props

| Prop         | Type      | Default | Description                          |
| ------------ | --------- | ------- | ------------------------------------ |
| `legend`     | `string`  | -       | Legend text for the fieldset         |
| `helperText` | `string`  | -       | Helper text (shown when not invalid) |
| `errorText`  | `string`  | -       | Error message (shown when invalid)   |
| `invalid`    | `boolean` | `false` | Whether the fieldset is invalid      |
| `disabled`   | `boolean` | `false` | Whether all fields are disabled      |
| `id`         | `string`  | -       | Custom fieldset ID                   |
| `class`      | `string`  | -       | Additional CSS classes               |

#### Examples

**Basic Fieldset:**

```vue
<Fieldset legend="Contact Information">
  <Field label="Email">
    <ArkField.Input as-child>
      <Input type="email" />
    </ArkField.Input>
  </Field>
  
  <Field label="Phone">
    <ArkField.Input as-child>
      <Input type="tel" />
    </ArkField.Input>
  </Field>
</Fieldset>
```

**With Helper Text:**

```vue
<Fieldset legend="Shipping Address" helperText="Where should we send your order?">
  <Field label="Street Address">
    <ArkField.Input as-child>
      <Input />
    </ArkField.Input>
  </Field>
  
  <Field label="City">
    <ArkField.Input as-child>
      <Input />
    </ArkField.Input>
  </Field>
</Fieldset>
```

**Disabled Fieldset:**

```vue
<Fieldset legend="Optional Information" disabled>
  <!-- All child inputs will be disabled -->
  <Field label="Middle Name">
    <ArkField.Input as-child>
      <Input />
    </ArkField.Input>
  </Field>
</Fieldset>
```

---

## Complete Form Example

Here's a complete form using all the components together:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Button, Field, Fieldset, Input, Select, Textarea } from '@/components/ui'
import { Field as ArkField } from '@ark-ui/vue/field'

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const phone = ref('')
const country = ref<string[]>([])
const bio = ref('')

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
]

const handleSubmit = () => {
  console.log({ firstName, lastName, email, phone, country, bio })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6 max-w-2xl">
    <Fieldset legend="Personal Information" helperText="Tell us about yourself">
      <div class="space-y-4">
        <div class="grid grid-cols-2 gap-4">
          <Field label="First Name" required>
            <ArkField.Input as-child>
              <Input v-model="firstName" placeholder="John" />
            </ArkField.Input>
          </Field>

          <Field label="Last Name" required>
            <ArkField.Input as-child>
              <Input v-model="lastName" placeholder="Doe" />
            </ArkField.Input>
          </Field>
        </div>

        <Field label="Email" helperText="We'll never share your email" required>
          <ArkField.Input as-child>
            <Input v-model="email" type="email" placeholder="john@example.com" />
          </ArkField.Input>
        </Field>

        <Field label="Phone" helperText="Include country code">
          <ArkField.Input as-child>
            <Input v-model="phone" type="tel" placeholder="+1 (555) 123-4567" />
          </ArkField.Input>
        </Field>

        <Field label="Country" required>
          <ArkField.Select as-child>
            <Select v-model="country" :items="countries" placeholder="Select your country" />
          </ArkField.Select>
        </Field>

        <Field label="Bio" helperText="Tell us a bit about yourself">
          <ArkField.Textarea as-child>
            <Textarea v-model="bio" rows="4" placeholder="I'm a..." />
          </ArkField.Textarea>
        </Field>
      </div>
    </Fieldset>

    <div class="flex gap-3">
      <Button type="submit">Submit</Button>
      <Button type="button" variant="secondary">Cancel</Button>
    </div>
  </form>
</template>
```

---

## Styling Philosophy

All form components follow our **Ark-first approach**:

### ✅ What We Style

- Basic layout (padding, width, height)
- Borders and colors
- Disabled/readonly states
- Invalid states (red border)

### ❌ What We Don't Style

- Focus indicators (browser default)
- Animations/transitions
- Complex outline systems
- Custom validation UI

### Why?

- Better accessibility
- Native browser behavior
- Less code to maintain
- Works across all browsers
- Respects user preferences

---

## Accessibility

All components are built with accessibility in mind:

### Input & Textarea

- ✅ Native HTML elements
- ✅ Keyboard navigation
- ✅ Screen reader compatible
- ✅ Browser validation

### Field (Ark UI)

- ✅ Proper label association
- ✅ ARIA attributes
- ✅ Error announcements
- ✅ Required indicators
- ✅ Helper text linking

### Fieldset (Ark UI)

- ✅ Semantic `<fieldset>` element
- ✅ Accessible `<legend>`
- ✅ Group-level state management
- ✅ Proper ARIA roles

---

## Best Practices

### 1. Always Use Labels

```vue
<!-- ✅ Good -->
<Field label="Email">
  <ArkField.Input as-child>
    <Input type="email" />
  </ArkField.Input>
</Field>

<!-- ❌ Bad -->
<Input type="email" placeholder="Email" />
```

### 2. Provide Helper Text

```vue
<Field label="Password" helperText="Must be at least 8 characters" required>
  <ArkField.Input as-child>
    <Input type="password" />
  </ArkField.Input>
</Field>
```

### 3. Show Validation Errors

```vue
<Field label="Email" :errorText="emailError" :invalid="!!emailError">
  <ArkField.Input as-child>
    <Input type="email" :invalid="!!emailError" />
  </ArkField.Input>
</Field>
```

### 4. Group Related Fields

```vue
<Fieldset legend="Shipping Address">
  <Field label="Street">...</Field>
  <Field label="City">...</Field>
  <Field label="Zip">...</Field>
</Fieldset>
```

### 5. Use Appropriate Input Types

```vue
<Input type="email" />
<!-- Email validation -->
<Input type="tel" />
<!-- Phone keyboard on mobile -->
<Input type="number" />
<!-- Number keyboard on mobile -->
<Input type="url" />
<!-- URL validation -->
<Input type="search" />
<!-- Search styling -->
```

---

## Related Components

- **[Select](./SELECT_COMPONENT.md)** - Dropdown selection
- **[Checkbox](./CLOSED_COMPONENTS.md#checkbox)** - Boolean input
- **[Switch](./CLOSED_COMPONENTS.md#switch)** - Toggle input

---

## References

- [Ark UI Field Documentation](https://ark-ui.com/docs/components/field)
- [Ark UI Fieldset Documentation](https://ark-ui.com/docs/components/fieldset)
- [MDN: Input Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input)
- [MDN: Textarea Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/textarea)
- [WCAG Form Guidelines](https://www.w3.org/WAI/tutorials/forms/)
