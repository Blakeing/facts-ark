# Facts Ark Documentation

Welcome to the Facts Ark documentation! This folder contains comprehensive guides for understanding and working with the project.

## 📚 Documentation Index

### Getting Started

- **[Getting Started with Closed Components](./GETTING_STARTED_CLOSED_COMPONENTS.md)** ⭐
  - Quick start guide with practical examples
  - Component props reference
  - Common usage patterns
  - Best practices and tips

### Architecture & Design

- **[Component Architecture](./COMPONENT_ARCHITECTURE.md)**
  - Application structure overview
  - Core components documentation
  - Navigation and layout patterns
  - Responsive behavior

- **[Closed Components Guide](./CLOSED_COMPONENTS.md)** ⭐
  - What are closed components?
  - When to use them
  - Architecture patterns
  - Best practices from Ark UI
  - Testing strategies

- **[Component Folder Structure](./COMPONENT_FOLDER_STRUCTURE.md)** ⭐
  - Organized folder-per-component structure
  - Separate type files (solves Vue compiler issues)
  - File responsibilities and naming conventions
  - Migration guide from flat structure

- **[Documentation Standards](./DOCUMENTATION_STANDARDS.md)** ⭐
  - Code documentation guidelines
  - Comment style standards
  - Documentation principles
  - Maintenance practices

### Individual Components

- **[Form Components](./FORM_COMPONENTS.md)** ⭐
  - Input, Textarea, Field, Fieldset
  - Complete form examples
  - Accessibility best practices
  - Validation patterns

- **[Select Component](./SELECT_COMPONENT.md)** ⭐
  - Comprehensive select/dropdown guide
  - Avatar support
  - Status indicators
  - Secondary text
  - All Tailwind UI patterns

### Utilities & Styling

- **[Styling Philosophy](./STYLING_PHILOSOPHY.md)** ⭐
  - Ark-first approach (90/10)
  - What to style vs what to leave to Ark
  - Migration guide
  - Best practices

- **[Tailwind Variants Guide](./TAILWIND_VARIANTS.md)** ⭐
  - Type-safe variant management
  - Compound variants and slots
  - Migration from manual class management
  - Real-world examples

- **[CN Utility Guide](./CN_UTILITY_GUIDE.md)**
  - Class name management with `cn()` utility
  - Conditional styling patterns
  - Integration with Tailwind CSS

- **[Custom Design System](./CUSTOM_DESIGN_SYSTEM.md)**
  - Design philosophy and principles
  - Component design patterns
  - Consistency guidelines

- **[Theming](./THEMING.md)**
  - Color palette and tokens
  - Theme customization
  - CSS variables

### Project History

- **[Changelog](./CHANGELOG.md)**
  - Version history
  - Feature additions
  - Breaking changes
  - Migration guides

## 🎯 Quick Links

### By Use Case

**I want to...**

- **Build UI components** → Start with [Getting Started with Closed Components](./GETTING_STARTED_CLOSED_COMPONENTS.md)
- **Understand the architecture** → Read [Component Architecture](./COMPONENT_ARCHITECTURE.md)
- **Organize components** → See [Component Folder Structure](./COMPONENT_FOLDER_STRUCTURE.md)
- **Learn best practices** → Check [Closed Components Guide](./CLOSED_COMPONENTS.md)
- **Manage variants** → Review [Tailwind Variants Guide](./TAILWIND_VARIANTS.md)
- **Style components** → Review [CN Utility Guide](./CN_UTILITY_GUIDE.md)
- **Customize theme** → See [Theming](./THEMING.md)
- **See component examples** → Visit the `/components` route in the app

### By Role

**Frontend Developers:**

1. [Component Architecture](./COMPONENT_ARCHITECTURE.md)
2. [Getting Started with Closed Components](./GETTING_STARTED_CLOSED_COMPONENTS.md)
3. [Tailwind Variants Guide](./TAILWIND_VARIANTS.md)
4. [CN Utility Guide](./CN_UTILITY_GUIDE.md)

**UI/UX Designers:**

1. [Custom Design System](./CUSTOM_DESIGN_SYSTEM.md)
2. [Theming](./THEMING.md)
3. Component Demo at `/components`

**Project Leads:**

1. [Changelog](./CHANGELOG.md)
2. [Component Architecture](./COMPONENT_ARCHITECTURE.md)
3. [Closed Components Guide](./CLOSED_COMPONENTS.md)

## 🚀 Key Features

### Closed Reusable Components

The project includes production-ready closed components:

- **Avatar** - Profile pictures with automatic initials
- **Badge** - Status indicators and labels
- **Button** - Consistent buttons with loading states
- **Card** - Content containers with slots

All components:

- ✅ Extend Ark UI base props
- ✅ Fully TypeScript typed
- ✅ Include JSDoc documentation
- ✅ Follow Vue 3 Composition API patterns
- ✅ Support accessibility (ARIA)
- ✅ Responsive by default

### Live Demo

Visit the [Components Demo](/components) page to see all components in action with:

- Interactive examples
- Code snippets
- Usage patterns
- Real-world compositions

## 🎓 Learning Path

### Beginner (New to the Project)

1. Read the main [README.md](../README.md) in the project root
2. Browse the [Component Demo](/components) page
3. Follow [Getting Started with Closed Components](./GETTING_STARTED_CLOSED_COMPONENTS.md)
4. Review [Component Architecture](./COMPONENT_ARCHITECTURE.md)

### Intermediate (Ready to Build)

1. Study [Closed Components Guide](./CLOSED_COMPONENTS.md) for patterns
2. Review existing components in `src/components/ui/`
3. Practice with [CN Utility Guide](./CN_UTILITY_GUIDE.md)
4. Explore [Ark UI documentation](https://ark-ui.com)

### Advanced (Contributing)

1. Read [Custom Design System](./CUSTOM_DESIGN_SYSTEM.md)
2. Review [Theming](./THEMING.md) for customization
3. Check [Changelog](./CHANGELOG.md) for project evolution
4. Study Ark UI's [Closed Components Guide](https://ark-ui.com/docs/guides/closed-components)

## 🔍 Documentation Standards

All documentation in this folder follows these principles:

- **Practical** - Real-world examples over theory
- **Searchable** - Clear headings and structure
- **Up-to-date** - Reflects current implementation
- **Progressive** - From simple to complex
- **Visual** - Code examples for visual learners

## 🤝 Contributing to Docs

When updating documentation:

1. Keep examples simple and practical
2. Include code snippets with syntax highlighting
3. Update the [Changelog](./CHANGELOG.md)
4. Cross-reference related docs
5. Test all code examples

## 🔗 External Resources

### Ark UI (Component Primitives)

- [Official Documentation](https://ark-ui.com)
- [Closed Components Guide](https://ark-ui.com/docs/guides/closed-components)
- [Vue Components](https://ark-ui.com/docs/components)

### Vue 3

- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)
- [TypeScript Support](https://vuejs.org/guide/typescript/overview.html)
- [Best Practices](https://vuejs.org/style-guide/)

### Tailwind CSS

- [Documentation](https://tailwindcss.com/docs)
- [Utility Classes](https://tailwindcss.com/docs/utility-first)
- [Customization](https://tailwindcss.com/docs/configuration)

### Lucide Icons

- [Icon Library](https://lucide.dev/icons/)
- [Vue Integration](https://lucide.dev/guide/packages/lucide-vue-next)

## 📝 Document Index (Alphabetical)

- [Changelog](./CHANGELOG.md)
- [Closed Components Guide](./CLOSED_COMPONENTS.md)
- [CN Utility Guide](./CN_UTILITY_GUIDE.md)
- [Component Architecture](./COMPONENT_ARCHITECTURE.md)
- [Component Folder Structure](./COMPONENT_FOLDER_STRUCTURE.md)
- [Custom Design System](./CUSTOM_DESIGN_SYSTEM.md)
- [Documentation Standards](./DOCUMENTATION_STANDARDS.md)
- [Getting Started with Closed Components](./GETTING_STARTED_CLOSED_COMPONENTS.md)
- [Tailwind Variants Guide](./TAILWIND_VARIANTS.md)
- [Theming](./THEMING.md)

## 💡 Tips

- Use the browser's search (Cmd+F / Ctrl+F) to find specific topics
- Code examples are ready to copy-paste
- Check the [Component Demo](/components) for visual reference
- The `src/components/ui/` folder has the source code for all closed components

---

**Last Updated:** October 5, 2025  
**Version:** 1.0.0
