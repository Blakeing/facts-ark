# Changelog

## v0.2.0 - 2025-10-05 - Enhanced Select Component

### ✨ Select Component Enhancements (Tailwind UI Inspired)

**New Features:**

- ✅ **Avatar support** - Display user profile images in select items
- ✅ **Status indicators** - Show online/offline status with colored dots
- ✅ **Secondary text** - Add usernames, emails, or descriptions
- ✅ **Check indicator position** - Choose left or right placement (`indicatorPosition` prop)
- ✅ **Rich item content** - Combine avatars, status, labels, and descriptions

**New Examples:**

- Select with avatars (user assignment)
- Select with status indicators (team member selection)
- Select with secondary text (usernames)
- Select with check on left (alternative layout)

**Documentation:**

- Created comprehensive [SELECT_COMPONENT.md](./SELECT_COMPONENT.md) guide
- Added 5 new live examples to Form Inputs demo page
- Updated component architecture docs

**Technical Improvements:**

- Enhanced `SelectItem` interface with `avatar`, `description`, and `status` properties
- Added `indicatorPosition` prop for flexible check mark placement
- Improved trigger display to show selected item's avatar/status/description
- Added proper TypeScript types for all new features
- Uses Ark UI data attributes for state management

**Design Philosophy:**

- 70% Tailwind UI aesthetics (colors, spacing, interactions)
- 30% Ark UI behavior (structure, accessibility, data attributes)
- All HeadlessUI/Tailwind UI select patterns now supported

## v0.1.0 - 2025-10-05 - Closed Reusable Components

### ✨ Latest Update: Organized Component Folder Structure

- **New folder-per-component structure** - Each component in its own folder with separate type files
- **Solves Vue 3.5 compiler issues** - No more `VariantProps` errors or `/* @vue-ignore */` needed
- **Better organization** - `component/Component.vue`, `component/component.types.ts`, `component/index.ts`
- **New documentation** - [COMPONENT_FOLDER_STRUCTURE.md](./COMPONENT_FOLDER_STRUCTURE.md)

**Structure:**

```
ui/
├── avatar/
│   ├── Avatar.vue           # Component implementation
│   ├── avatar.types.ts      # TypeScript interfaces
│   └── index.ts             # Exports
├── badge/...
├── button/...
└── card/...
```

**Why?**

- ✅ Solves `[@vue/compiler-sfc] Failed to resolve extends base type` errors
- ✅ No `/* @vue-ignore */` comments needed
- ✅ Better organization and scalability
- ✅ Improved developer experience
- ✅ Easier to maintain and extend

### ✅ Solution: Using `tailwind-variants/lite` + Custom `cn()`

**Problem discovered**: `tailwind-variants` v3.1.1 has a critical bug where `cn()` returns a function instead of a string ([Issue #268](https://github.com/heroui-inc/tailwind-variants/issues/268))

**Smart Solution**: Use the **lite build** for variants + custom `cn` for class merging!

**What we're using:**

1. **`tailwind-variants/lite`** - For component variants (`tv()`)
   - ~80% smaller bundle
   - No broken `cn` function (it doesn't include one)
   - Perfect for variant management

2. **Custom `cn` utility** - For class merging
   - Proven reliable implementation
   - Combines `clsx` + `tailwind-merge`
   - Located in `src/lib/utils.ts`

**Implementation:**

```typescript
// For component variants
import { tv } from 'tailwind-variants/lite'

// For class merging
import { cn } from '@/lib/utils'
```

**Current dependencies:**

```json
{
  "clsx": "^2.1.1",
  "tailwind-merge": "^3.3.1",
  "tailwind-variants": "^3.1.1"
}
```

**Benefits:**

- ✅ Smaller bundle size (~80% reduction in TV code)
- ✅ No broken `cn` function
- ✅ Best of both worlds: lite `tv()` + custom `cn()`
- ✅ Proven reliable solution

**References**:

- [Tailwind Variants Lite Build](https://www.tailwind-variants.org/docs/config#lite-build)
- [GitHub Issue #268](https://github.com/heroui-inc/tailwind-variants/issues/268)

### 🎉 New Features

- **Closed UI Components**: Created reusable Avatar, Badge, Button, and Card components
- **Component Demo Page**: Interactive showcase at `/components` route
- **Comprehensive Documentation**:
  - `CLOSED_COMPONENTS.md` - Architecture and best practices guide
  - `GETTING_STARTED_CLOSED_COMPONENTS.md` - Quick start guide with examples
- **TypeScript Support**: Fully typed components with exported prop types
- **Ark UI Integration**: Components extend Ark UI base props following official patterns

### 📦 New Components

- **Avatar** (`src/components/ui/Avatar.vue`)
  - Automatic initials generation
  - Icon fallback for short names
  - Multiple sizes (sm, md, lg, xl)
  - Extends Ark UI Avatar primitives

- **Badge** (`src/components/ui/Badge.vue`)
  - 5 variants (default, success, warning, error, info)
  - 3 sizes (sm, md, lg)
  - Status indicators and labels

- **Button** (`src/components/ui/Button.vue`)
  - 5 variants (primary, secondary, outline, ghost, danger)
  - Loading states with spinner
  - Disabled states
  - Full width option

- **Card** (`src/components/ui/Card.vue`)
  - Header, body, footer slots
  - 3 variants (default, bordered, elevated)
  - Flexible padding options

### 📚 Documentation Updates

- ✅ Updated `COMPONENT_ARCHITECTURE.md` with closed components section
- ✅ Created `CLOSED_COMPONENTS.md` - Complete guide following Ark UI patterns
- ✅ Created `GETTING_STARTED_CLOSED_COMPONENTS.md` - Quick start examples
- ✅ Updated main `README.md` with components documentation links

### 🎓 Learning Resources

- Followed [Ark UI Closed Components Guide](https://ark-ui.com/docs/guides/closed-components)
- Used Ark UI MCP server to explore component patterns
- Implemented Vue-specific patterns with `useForwardPropsEmits`

### 🎨 Best Practices Implemented

- Extended base Ark UI props for maximum flexibility
- **Tailwind Variants** for type-safe variant management
- TypeScript interfaces with automatic type inference
- Helper functions kept close to usage
- Computed properties for derived state
- Sensible fallbacks for missing data
- Comprehensive JSDoc documentation

## 2025-01-XX - Major Cleanup & Simplification

### 🎉 New Features

- **New App Shell**: Replaced complex sidebar system with simple Tailwind UI-inspired layout
- **Ark UI Integration**: Using Dialog and Collapsible for mobile menu and navigation
- **Lucide Icons**: Switched from custom icons to Lucide icon library
- **Organized Docs**: Created `docs/` folder with comprehensive guides

### 🧹 Removed (Legacy Code)

- ❌ `src/components/ui/sidebar/` - Entire old sidebar component system (23 files)
- ❌ `src/components/AppSidebar.vue` - Legacy sidebar implementation
- ❌ `src/lib/variants/sidebar.ts` - Sidebar variant definitions
- ❌ `NUXT_UI_MIGRATION.md` - Outdated migration guide
- ❌ `TAILWIND_VARIANTS_REFACTOR.md` - Outdated refactoring notes
- ❌ `VUEUSE_IMPROVEMENTS.md` - Outdated improvement notes

### 📚 Documentation Updates

- ✅ Created `docs/README.md` - Documentation hub
- ✅ Moved `CN_UTILITY_GUIDE.md` to docs/
- ✅ Moved `CUSTOM_DESIGN_SYSTEM.md` to docs/
- ✅ Moved `THEMING.md` to docs/
- ✅ Updated main `README.md` - Simplified and modernized

### 🎨 Architecture Changes

- **Before**: Complex component hierarchy with SidebarProvider, multiple context layers, computed state
- **After**: Simple `App.vue` with Ark UI Dialog for mobile, fixed sidebar for desktop
- **State Management**: Reduced from controlled/uncontrolled props to simple `ref(false)`
- **File Count**: Reduced from 39 to 14 linted files (~64% reduction)

### 🛠️ Tech Stack (Current)

- Vue 3 + TypeScript
- Tailwind CSS v4
- Ark UI (Dialog, Collapsible)
- Lucide Icons
- Vue Router
- Pinia
- Vite

### 📦 Dependencies Added

- `tailwindcss-animate` - Animation utilities for Ark UI components

### 💡 Design Philosophy

Shifted from "building a reusable component library" to "building a maintainable application":

- Direct, readable code over abstractions
- Composition over configuration
- Tailwind utilities over custom CSS
- Ark UI primitives for complex interactions
- Simple state management
