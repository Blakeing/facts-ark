# Contributing to Facts Ark

Thank you for your interest in contributing to Facts Ark! This document provides guidelines and best practices for contributing to this project.

## 📋 Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Component Development](#component-development)
- [Code Style](#code-style)
- [Documentation](#documentation)
- [Testing](#testing)
- [Pull Requests](#pull-requests)

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v20.19.0 or >=22.12.0
- **pnpm**: Latest version

### Setup

```bash
# Clone the repository
git clone https://github.com/blakeing/facts-ark.git
cd facts-ark

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## 🔄 Development Workflow

### Available Scripts

```bash
pnpm dev          # Start dev server (Vite)
pnpm build        # Build for production
pnpm preview      # Preview production build
pnpm type-check   # Run TypeScript type checking
pnpm lint         # Run linters (oxlint + eslint)
pnpm format       # Format code with Prettier
pnpm test:unit    # Run unit tests
pnpm test:e2e     # Run E2E tests
```

### Recommended Workflow

1. **Start dev server**: `pnpm dev`
2. **Make changes**: Edit files and see live updates
3. **Check types**: `pnpm type-check`
4. **Lint & format**: `pnpm lint && pnpm format`
5. **Test**: `pnpm test:unit`
6. **Build**: `pnpm build` (verify production build works)

## 🧩 Component Development

### Creating a New Closed Component

Follow our established component folder structure:

#### 1. Create Component Folder

```bash
mkdir -p src/components/ui/my-component
```

#### 2. Create Type File

**File**: `src/components/ui/my-component/my-component.types.ts`

```typescript
/**
 * Props for the MyComponent
 */
export interface MyComponentProps {
  /** Visual style variant */
  variant?: 'default' | 'custom'
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
  /** Additional CSS classes */
  class?: string
}
```

#### 3. Create Component

**File**: `src/components/ui/my-component/MyComponent.vue`

```vue
<!-- eslint-disable vue/multi-word-component-names -->
<!--
  MyComponent
  
  Brief description of what this component does.
  
  @example
  <MyComponent variant="custom" size="lg">Content</MyComponent>
-->
<script setup lang="ts">
import { computed } from 'vue'
import { tv } from 'tailwind-variants'
import type { MyComponentProps } from './my-component.types'

/**
 * Define variants using tailwind-variants
 */
const myComponentVariants = tv({
  base: 'base-classes-here',
  variants: {
    variant: {
      default: 'default-classes',
      custom: 'custom-classes',
    },
    size: {
      sm: 'small-size-classes',
      md: 'medium-size-classes',
      lg: 'large-size-classes',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

const props = defineProps<MyComponentProps>()

const componentClass = computed(() =>
  myComponentVariants({
    variant: props.variant,
    size: props.size,
    class: props.class,
  }),
)
</script>

<template>
  <div :class="componentClass">
    <slot />
  </div>
</template>
```

#### 4. Create Index File

**File**: `src/components/ui/my-component/index.ts`

```typescript
export { default as MyComponent } from './MyComponent.vue'
export type { MyComponentProps } from './my-component.types'
```

#### 5. Update Main Index

**File**: `src/components/ui/index.ts`

```typescript
// Add to existing exports
export { MyComponent } from './my-component'
export type { MyComponentProps } from './my-component'
```

### Component Guidelines

#### ✅ DO

- **Use separate type files** for all component props
- **Document with JSDoc/HTML comments** at the top of each file
- **Use `tailwind-variants`** for variant management
- **Provide examples** in component documentation
- **Follow naming conventions**:
  - Component files: `PascalCase.vue`
  - Type files: `kebab-case.types.ts`
  - Folders: `kebab-case/`
- **Add proper TypeScript types** for all props and emits
- **Use the `cn()` utility** from `tailwind-variants` for class merging
- **Test responsiveness** on mobile and desktop

#### ❌ DON'T

- Don't use `VariantProps` in `.vue` files (causes Vue compiler errors)
- Don't define types inline in component `<script>` sections
- Don't forget to export types from `index.ts`
- Don't skip documentation comments
- Don't use inline styles (use Tailwind classes)
- Don't hardcode colors (use Tailwind color tokens)

### Example Component Structure

```
src/components/ui/button/
├── Button.vue           # Component implementation
├── button.types.ts      # TypeScript interfaces
└── index.ts             # Exports
```

## 📝 Code Style

### TypeScript

- **Strict mode enabled**: All code must pass strict TypeScript checks
- **Explicit types**: Prefer explicit types over inference for public APIs
- **No `any`**: Avoid using `any`; use `unknown` or proper types

### Vue Components

- **Composition API**: Use `<script setup lang="ts">` syntax
- **TypeScript**: All components should use TypeScript
- **Props**: Define using `defineProps<InterfaceName>()`
- **Emits**: Define using `defineEmits<EmitsInterface>()`

### Styling

- **Tailwind CSS v4**: Use Tailwind utility classes
- **No inline styles**: Don't use `style` attribute
- **Variants**: Use `tailwind-variants` for component variants
- **Responsive**: Mobile-first approach with responsive modifiers

### Imports

```typescript
// Group imports logically:
// 1. Vue imports
import { computed, ref } from 'vue'

// 2. External libraries
import { tv } from 'tailwind-variants'
import { UserIcon } from 'lucide-vue-next'

// 3. Internal imports
import type { MyComponentProps } from './my-component.types'
```

## 📚 Documentation

### Component Documentation

Every component should have:

1. **HTML/JSDoc comment** at the top of the file
2. **Type documentation** in `.types.ts` files
3. **Usage examples** in the component comment
4. **Props documentation** using JSDoc `@param` or TypeScript comments

### Example

```vue
<!--
  Avatar Component
  
  Displays a user's profile picture with automatic fallback to initials.
  
  Features:
  - Automatic initials generation from name
  - Fallback icon for single-letter names
  - Multiple size variants
  
  @example
  <Avatar name="John Doe" src="/avatar.jpg" size="md" />
  <Avatar name="Jane Smith" size="lg" />
-->
<script setup lang="ts">
// Component implementation
</script>
```

### Type Documentation

```typescript
/**
 * Props for the Avatar component
 */
export interface AvatarProps {
  /** User's full name - used for alt text and generating initials */
  name: string
  /** Image source URL */
  src?: string
  /** Avatar size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl'
  /** Additional CSS classes */
  class?: string
}
```

### Documentation Files

When adding significant features:

1. **Update relevant docs** in `docs/` folder
2. **Update CHANGELOG.md** with your changes
3. **Update README.md** if adding new features

## 🧪 Testing

### Unit Tests

```bash
# Run all unit tests
pnpm test:unit

# Run tests in watch mode
pnpm test:unit --watch
```

### E2E Tests

```bash
# Run E2E tests
pnpm test:e2e

# Run E2E tests in UI mode
pnpm test:e2e --ui
```

### Test Guidelines

- **Test user behavior**, not implementation details
- **Use accessible queries** (by role, label, text)
- **Write descriptive test names**
- **Mock external dependencies**

## 🔀 Pull Requests

### Before Submitting

- [ ] Code passes all lints (`pnpm lint`)
- [ ] Code is properly formatted (`pnpm format`)
- [ ] TypeScript types are correct (`pnpm type-check`)
- [ ] Tests pass (`pnpm test:unit`)
- [ ] Production build works (`pnpm build`)
- [ ] Documentation is updated
- [ ] CHANGELOG.md is updated (if applicable)

### PR Guidelines

1. **Create a feature branch**: `git checkout -b feature/my-feature`
2. **Write descriptive commits**: Follow conventional commits format
3. **Keep PRs focused**: One feature/fix per PR
4. **Update documentation**: Include relevant doc updates
5. **Add tests**: Test new features and bug fixes
6. **Link issues**: Reference related issues in PR description

### Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation only
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(ui): add Tooltip component

- Implement tooltip with positioning
- Add hover and focus triggers
- Include comprehensive examples

fix(button): resolve loading state issue

The loading spinner wasn't displaying correctly due to z-index conflict.
```

## 🤝 Code Review

### As a Reviewer

- Be constructive and kind
- Suggest improvements, don't demand changes
- Approve when code meets standards
- Ask questions if unclear

### As an Author

- Respond to all comments
- Be open to feedback
- Make requested changes promptly
- Ask for clarification if needed

## 📖 Resources

- [Closed Components Guide](./docs/CLOSED_COMPONENTS.md)
- [Component Folder Structure](./docs/COMPONENT_FOLDER_STRUCTURE.md)
- [Tailwind Variants Guide](./docs/TAILWIND_VARIANTS.md)
- [Component Architecture](./docs/COMPONENT_ARCHITECTURE.md)
- [Ark UI Documentation](https://ark-ui.com/)
- [Vue 3 Documentation](https://vuejs.org/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/)

## ❓ Questions?

If you have questions or need help:

1. Check existing documentation in `docs/`
2. Search for similar issues on GitHub
3. Open a new discussion/issue

Thank you for contributing! 🎉
