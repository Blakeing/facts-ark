# Getting Started with Closed Components

A quick start guide for using closed reusable components in Facts Ark.

## What You'll Learn

- How to import and use closed components
- Component variants and customization options
- Real-world usage patterns
- Best practices from Ark UI

## Quick Examples

### Avatar Component

Display user profile pictures with automatic initials fallback:

```vue
<script setup>
import { Avatar } from '@/components/ui'
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

### Badge Component

Show status indicators or labels:

```vue
<script setup>
import { Badge } from '@/components/ui'
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

### Button Component

Consistent buttons with loading states:

```vue
<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui'

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
  <Button 
    variant="primary" 
    :loading="isLoading"
    @click="handleSubmit"
  >
    Submit
  </Button>
  
  <!-- Full width -->
  <Button variant="primary" :full-width="true">
    Full Width Button
  </Button>
</template>
```

### Card Component

Container with header, body, and footer:

```vue
<script setup>
import { Card, Avatar, Badge, Button } from '@/components/ui'
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

## Import Multiple Components

```vue
<script setup>
// Import specific components
import { Avatar, Badge, Button, Card } from '@/components/ui'

// Or import individually
import Avatar from '@/components/ui/Avatar.vue'
import Badge from '@/components/ui/Badge.vue'
</script>
```

## Component Props Reference

### Avatar

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | Required | User's full name |
| `src` | `string` | `undefined` | Image URL |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Avatar size |
| `class` | `string` | `undefined` | Additional CSS classes |

### Badge

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | `'default'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Badge size |
| `class` | `string` | `undefined` | Additional CSS classes |

### Button

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'outline' \| 'ghost' \| 'danger'` | `'primary'` | Visual style |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Button size |
| `loading` | `boolean` | `false` | Show loading spinner |
| `disabled` | `boolean` | `false` | Disable button |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Button type |
| `fullWidth` | `boolean` | `false` | Full width button |
| `class` | `string` | `undefined` | Additional CSS classes |

### Card

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'default' \| 'bordered' \| 'elevated'` | `'default'` | Visual style |
| `padding` | `'none' \| 'sm' \| 'md' \| 'lg'` | `'md'` | Padding size |
| `class` | `string` | `undefined` | Additional CSS classes |

**Slots:**
- `#header` - Card header content
- `#default` - Card body content
- `#footer` - Card footer content

## TypeScript Support

All components are fully typed. Import types for advanced usage:

```typescript
import type { AvatarProps, BadgeProps, ButtonProps, CardProps } from '@/components/ui'

const avatarConfig: AvatarProps = {
  name: 'John Doe',
  size: 'lg',
  src: '/avatar.jpg'
}
```

## Live Demo

Visit the [Components Demo page](/components) to see all components in action with interactive examples.

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
<Avatar name="John Doe" />  <!-- Shows "JD" -->

<!-- ❌ Avoid single character names unless intentional -->
<Avatar name="J" />  <!-- Shows icon fallback -->
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
  <Button 
    :loading="isSubmitting" 
    :disabled="isSubmitting"
    @click="handleSubmit"
  >
    Submit
  </Button>
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

## Styling and Customization

All components accept a `class` prop for additional styling:

```vue
<Avatar 
  name="John Doe" 
  class="ring-2 ring-indigo-500 ring-offset-2"
/>

<Button 
  variant="primary" 
  class="shadow-lg hover:shadow-xl"
>
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
        <Button variant="ghost" @click="showDialog = false">
          Cancel
        </Button>
        <Button 
          variant="danger" 
          :loading="isDeleting"
          @click="handleDelete"
        >
          Delete
        </Button>
      </div>
    </template>
  </Card>
</template>
```

## Next Steps

- Review [CLOSED_COMPONENTS.md](./CLOSED_COMPONENTS.md) for detailed architecture
- Check [COMPONENT_ARCHITECTURE.md](./COMPONENT_ARCHITECTURE.md) for overall structure
- Visit `/components` route to see live examples
- Read [Ark UI Documentation](https://ark-ui.com/docs/guides/closed-components) for more patterns

## Need Help?

- Check the [Components Demo](/components) for interactive examples
- Review component source code in `src/components/ui/`
- Read the [Ark UI Closed Components Guide](https://ark-ui.com/docs/guides/closed-components)

