# Component Architecture

This document describes the component architecture of Facts Ark, detailing how the application is structured and how components interact.

## Overview

The application follows a clean, modular architecture with clear separation of concerns. The layout is inspired by Tailwind UI and uses Ark UI for headless components and Lucide icons for iconography.

## Directory Structure

```
src/
├── components/
│   ├── ui/                      # Closed reusable UI components
│   │   ├── avatar/
│   │   │   ├── Avatar.vue       # Component implementation
│   │   │   ├── avatar.types.ts  # TypeScript interfaces
│   │   │   └── index.ts         # Exports
│   │   ├── badge/
│   │   │   ├── Badge.vue
│   │   │   ├── badge.types.ts
│   │   │   └── index.ts
│   │   ├── button/
│   │   │   ├── Button.vue
│   │   │   ├── button.types.ts
│   │   │   └── index.ts
│   │   ├── card/
│   │   │   ├── Card.vue
│   │   │   ├── card.types.ts
│   │   │   └── index.ts
│   │   └── index.ts             # Main export barrel
│   ├── AppLayout.vue            # Main layout wrapper
│   ├── AppSidebar.vue           # Sidebar with mobile & desktop views
│   └── AppHeader.vue            # Header with search
├── views/
│   ├── HomeView.vue             # Home page
│   ├── ComponentsDemo.vue       # Closed components showcase
│   └── AboutView.vue            # About page
├── router/
│   └── index.ts                 # Vue Router configuration
└── App.vue                      # Root component
```

## Component Types

### Closed UI Components (`src/components/ui/`)

Closed components are pre-composed, reusable wrappers around Ark UI primitives that provide consistent, simplified APIs. See [CLOSED_COMPONENTS.md](./CLOSED_COMPONENTS.md) for detailed documentation.

**Available Components:**

- **Avatar**: Display user profile pictures with automatic initials fallback
- **Badge**: Show status indicators, categories, or labels
- **Button**: Consistent button component with variants, sizes, and loading states
- **Card**: Container component with header, body, and footer sections

**Usage:**

```vue
<script setup>
import { Avatar, Badge, Button, Card } from '@/components/ui'
</script>

<template>
  <Card variant="bordered">
    <template #header>
      <div class="flex items-center gap-2">
        <Avatar name="John Doe" src="/avatar.jpg" size="md" />
        <Badge variant="success">Active</Badge>
      </div>
    </template>
    <p>Card content goes here</p>
    <template #footer>
      <Button variant="primary">Action</Button>
    </template>
  </Card>
</template>
```

**Demo:** Visit `/components` route to see all components in action.

## Core Components

### AppLayout.vue

The main layout component that wraps all pages. It:

- Manages the sidebar open/close state
- Renders `AppSidebar` and `AppHeader`
- Provides a `<slot>` for page content
- Handles responsive sidebar positioning (mobile overlay, desktop fixed)

**Usage:**

```vue
<AppLayout>
  <RouterView />
</AppLayout>
```

### AppSidebar.vue

A fully responsive sidebar component that:

- Displays navigation with support for nested children
- Uses Ark UI's `Dialog` for mobile overlay
- Uses Ark UI's `Collapsible` for nested navigation items
- Accepts customizable `navigation` and `teams` props
- Provides default navigation structure if no props are passed

**Props:**

- `open` (boolean): Controls mobile sidebar visibility
- `navigation` (array): Navigation items with optional nested children
- `teams` (array): Team list for the bottom section

**Events:**

- `update:open`: Emitted when sidebar state changes

**Key Features:**

- Collapsible nested navigation items with chevron animation
- Team badges with initials
- User profile section at bottom
- Smooth Ark UI transitions
- Gray background (bg-gray-50) like Tailwind UI

### AppHeader.vue

A sticky header component that:

- Shows a hamburger menu button on mobile
- Includes a search input
- Provides an `actions` slot for additional header content (e.g., notifications, user menu)

**Events:**

- `open-sidebar`: Emitted when the mobile menu button is clicked

**Usage:**

```vue
<AppHeader @open-sidebar="sidebarOpen = true">
  <template #actions>
    <!-- Custom header actions -->
  </template>
</AppHeader>
```

## Navigation Structure

The sidebar accepts a navigation array with the following structure:

```typescript
interface NavigationItem {
  name: string
  href?: string
  icon: Component // Lucide icon component
  current: boolean
  children?: {
    name: string
    href: string
    current?: boolean
  }[]
}
```

**Example:**

```typescript
const navigation = [
  {
    name: 'Projects',
    href: '#',
    icon: FolderOpen,
    current: false,
  },
  {
    name: 'Deployments',
    href: '#',
    icon: Home,
    current: true,
  },
  {
    name: 'Team',
    icon: Users,
    current: false,
    children: [
      { name: 'Engineering', href: '#' },
      { name: 'Human Resources', href: '#' },
      { name: 'Customer Success', href: '#' },
    ],
  },
]
```

## Teams Structure

```typescript
interface Team {
  id: number
  name: string
  href: string
  initial: string
  current: boolean
}
```

## Responsive Behavior

### Mobile (< 1024px)

- Sidebar is hidden by default
- Menu button in header opens sidebar as an overlay modal
- Sidebar slides in from the left with backdrop
- Close button appears to dismiss the sidebar

### Desktop (≥ 1024px)

- Sidebar is fixed on the left (288px / 18rem wide)
- Main content area has left padding to account for sidebar
- Sidebar is always visible
- No close button needed

## Styling

- Uses Tailwind CSS utility classes
- Leverages `tailwindcss-animate` for smooth transitions
- Color scheme: Indigo primary, gray neutrals
- Responsive breakpoint: `lg` (1024px)

## Extending the Layout

### Adding Custom Navigation

Pass custom navigation to `AppSidebar`:

```vue
<template>
  <AppLayout>
    <AppSidebar :navigation="customNav" :teams="customTeams" />
  </AppLayout>
</template>

<script setup>
const customNav = [
  // Your navigation items
]

const customTeams = [
  // Your teams
]
</script>
```

### Adding Header Actions

Use the `actions` slot in `AppHeader`:

```vue
<AppHeader @open-sidebar="sidebarOpen = true">
  <template #actions>
    <button>Notifications</button>
    <UserMenu />
  </template>
</AppHeader>
```

### Creating New Pages

1. Create a new view component in `src/views/`
2. Add a route in `src/router/index.ts`
3. Update navigation items to include the new page
4. The page will automatically render within the `AppLayout`

## Technologies

- **Vue 3**: Composition API with `<script setup>`
- **TypeScript**: Type-safe props and events
- **Ark UI**: Headless components (Dialog, Collapsible, Avatar, etc.)
- **Tailwind Variants**: Type-safe variant management for components
- **Lucide Vue**: Icon library (1,400+ icons)
- **Tailwind CSS**: Utility-first styling with custom animations
- **Vue Router**: Client-side routing

## Best Practices

1. **Keep layouts simple**: `AppLayout` should only manage layout state, not business logic
2. **Use slots**: Allow customization through slots instead of complex props
3. **Responsive by default**: All components should work on mobile and desktop
4. **TypeScript interfaces**: Define clear interfaces for props and data structures
5. **Semantic HTML**: Use proper HTML5 elements (`<nav>`, `<main>`, `<header>`)
6. **Accessibility**: Include ARIA labels, screen reader text, and keyboard navigation

## Future Enhancements

- [ ] Add breadcrumb navigation
- [ ] Implement user profile dropdown in header
- [ ] Add notification center
- [ ] Support light/dark theme switching
- [ ] Add command palette (Cmd+K) using Ark UI
- [ ] Implement sidebar collapse on desktop (optional)
