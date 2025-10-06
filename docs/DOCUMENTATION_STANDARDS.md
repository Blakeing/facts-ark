# Documentation Standards

This document outlines the documentation standards and best practices for Facts Ark.

## 📝 Overview

Facts Ark maintains a high standard of documentation to ensure:

- **Developer onboarding** is smooth and efficient
- **Code maintenance** is straightforward
- **Best practices** are clearly communicated
- **Component usage** is well-understood

## 📚 Documentation Structure

### Project-Level Documentation

#### Root Directory

- **`README.md`**: Project overview, quick start, tech stack, features
- **`CONTRIBUTING.md`**: Contribution guidelines, development workflow, code standards
- **`CHANGELOG.md`**: Version history and notable changes (in `docs/`)

#### `/docs` Folder

**Core Guides:**

- `COMPONENT_ARCHITECTURE.md`: Application structure and layout
- `CLOSED_COMPONENTS.md`: Building reusable UI components
- `COMPONENT_FOLDER_STRUCTURE.md`: Organizing component files
- `GETTING_STARTED_CLOSED_COMPONENTS.md`: Quick start guide

**Styling & Utilities:**

- `TAILWIND_VARIANTS.md`: Type-safe variant management
- `CN_UTILITY_GUIDE.md`: Class name merging utility
- `THEMING.md`: Colors and design tokens
- `CUSTOM_DESIGN_SYSTEM.md`: Design philosophy

**Reference:**

- `CHANGELOG.md`: Version history and updates
- `README.md`: Documentation index and navigation
- `DOCUMENTATION_STANDARDS.md`: This document

## 🧩 Code Documentation Standards

### Vue Components

Every `.vue` component should have an HTML comment at the top:

```vue
<!--
  ComponentName

  Brief description of what this component does.

  Features/Responsibilities:
  - Feature 1
  - Feature 2
  - Feature 3

  Props:
  - prop1: Description
  - prop2: Description

  Emits:
  - event1: When it fires

  Slots:
  - slotName: What goes here

  @example
  <ComponentName prop1="value" @event1="handler">
    Content
  </ComponentName>

  @see ./RelatedComponent.vue for related functionality
-->
<script setup lang="ts">
// Component implementation
</script>
```

**Required Elements:**

- ✅ Brief description
- ✅ Key features or responsibilities
- ✅ Usage example
- ✅ Related component references (if applicable)

**Optional Elements:**

- Props list (if complex)
- Emits list (if multiple events)
- Slots list (if component provides slots)

### TypeScript Files

#### Type Definitions (`.types.ts`)

```typescript
/**
 * Type definitions for the ComponentName
 *
 * Brief description of what these types represent.
 *
 * @see ComponentName.vue for component implementation
 */

/**
 * Props for the ComponentName component
 *
 * Detailed description of the props interface,
 * including key features and use cases.
 *
 * @example
 * const props: ComponentProps = {
 *   variant: 'primary',
 *   size: 'md'
 * }
 */
export interface ComponentProps {
  /** Property description */
  prop1: string
  /** Property description with more detail */
  prop2?: number
}
```

**Required Elements:**

- ✅ File-level JSDoc comment
- ✅ Interface-level JSDoc comment
- ✅ Inline comments for each property
- ✅ Reference to related files

#### Utility Files

```typescript
/**
 * UtilityName
 *
 * Description of what this utility does and when to use it.
 *
 * @param param1 - Description
 * @param param2 - Description
 * @returns Description of return value
 *
 * @example
 * const result = utilityFunction('value')
 *
 * @see {@link https://external-docs.com} for more information
 */
export function utilityFunction(param1: string, param2: number): string {
  // Implementation
}
```

### Main Application Files

#### `main.ts`

```typescript
/**
 * Application Entry Point
 *
 * This file initializes the Vue 3 application with:
 * - Dependency 1
 * - Dependency 2
 *
 * The app is mounted to #app in index.html
 *
 * @see {@link https://vuejs.org/guide/}
 */
```

#### `router/index.ts`

```typescript
/**
 * Vue Router Configuration
 *
 * Defines application routing structure.
 *
 * Routes:
 * - / (home): Description
 * - /about: Description
 *
 * @see {@link https://router.vuejs.org/}
 */
```

## ✅ Documentation Checklist

### For New Components

- [ ] Component file has HTML comment header
- [ ] Usage example included in comment
- [ ] Type file has file-level JSDoc
- [ ] Type file has interface-level JSDoc
- [ ] All props have inline comments
- [ ] `index.ts` exports component and types
- [ ] Main `ui/index.ts` updated with exports
- [ ] Component added to relevant documentation

### For New Features

- [ ] Code is properly documented
- [ ] `CHANGELOG.md` updated
- [ ] Relevant guide(s) updated
- [ ] Usage examples provided
- [ ] `README.md` updated (if user-facing feature)

### For Bug Fixes

- [ ] Fix explanation in `CHANGELOG.md`
- [ ] Code comments explain fix (if complex)
- [ ] Test added to prevent regression

## 📐 Comment Style Guidelines

### DO ✅

```typescript
/**
 * Clear, concise description that explains WHY, not just WHAT
 *
 * Additional context when needed.
 */

/** Brief inline comment for single-line documentation */

// Inline comment explaining complex logic
const result = complexCalculation() // Why this is needed
```

### DON'T ❌

```typescript
// Bad: States the obvious
const user = getUser() // Get user

// Bad: Too verbose
/**
 * This function takes a string parameter and returns a boolean
 * value after checking if the string length is greater than zero
 * and if it matches the expected format that we need for validation
 */

// Bad: Outdated or incorrect
// TODO: Fix this later (from 2 years ago)
// This uses the old API (but code was updated)
```

## 🎯 Documentation Principles

### 1. Write for Humans

- Use clear, simple language
- Avoid jargon unless necessary
- Explain acronyms on first use

### 2. Provide Context

- Explain WHY, not just WHAT
- Link to related documentation
- Include usage examples

### 3. Keep It Current

- Update docs when code changes
- Remove outdated comments
- Review docs during code reviews

### 4. Be Consistent

- Follow established patterns
- Use consistent terminology
- Match the style of existing docs

### 5. Add Value

- Don't state the obvious
- Explain complex logic
- Provide helpful examples

## 📊 Documentation Metrics

Good documentation:

- ✅ Can be understood by new contributors
- ✅ Answers "why" not just "what"
- ✅ Includes practical examples
- ✅ Is up-to-date with the code
- ✅ Links to related resources

Poor documentation:

- ❌ States the obvious
- ❌ Is outdated or incorrect
- ❌ Has no examples
- ❌ Uses unclear jargon
- ❌ Is inconsistent

## 🔄 Maintenance

### Regular Reviews

- Review docs quarterly
- Update examples to match current patterns
- Remove deprecated content
- Fix broken links

### Continuous Improvement

- Gather feedback from new contributors
- Update based on common questions
- Refine examples based on real usage
- Keep best practices current

## 📖 Resources

### Internal

- [Contributing Guide](../CONTRIBUTING.md)
- [Component Architecture](./COMPONENT_ARCHITECTURE.md)
- [Component Folder Structure](./COMPONENT_FOLDER_STRUCTURE.md)

### External

- [JSDoc Reference](https://jsdoc.app/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Vue Documentation](https://vuejs.org/guide/)
- [Technical Writing Guide](https://developers.google.com/tech-writing)

---

**Remember**: Good documentation is an investment in the future of the project. Take the time to write it well, and future contributors (including yourself!) will thank you.
