# Demo Organization

## Overview

Facts-Ark uses a **dual approach** for component demos:

1. **Component Gallery** (`/components`) - Clean catalog overview in the main app
2. **Storybook** (`http://localhost:6007`) - Interactive demos and comprehensive documentation

**Key Decision:** All interactive component demos are **exclusively in Storybook**. The main app provides a catalog-style overview with links to Storybook for hands-on exploration.

---

## Page Structure

### 1. `/components` - **Component Gallery** (Catalog View) ⭐

**Purpose:** Comprehensive catalog of all 41 UI components with direct links to Storybook

**Features:**

- **No Live Demos** - Clean, fast-loading catalog
- **Clickable Cards** - Each card links to the component's Storybook demo
- **5 Categories:**
  - Form Inputs (18 components)
  - Layout & Navigation (8 components)
  - Overlays & Dialogs (5 components)
  - Display & Feedback (6 components)
  - Utilities (4 components)
- **Status Badges** - "NEW" indicators for recently added components
- **Component Descriptions** - Brief explanation of each component
- **Statistics Panel** - Library metrics
- **CTA Section** - Direct links to open Storybook

**Design Philosophy:**

- Keep the main app lightweight
- Storybook is the source of truth for demos
- Gallery serves as a visual index

### 2. `/` - **Dashboard**

**Purpose:** Activity/deployment dashboard view

**Features:**

- Secondary navigation
- Project status indicator
- Deployment statistics
- Activity timeline table

### 3. `/showcase` - **Component Showcase**

**Purpose:** Original Park UI component showcase

**Features:**

- Comprehensive component demonstrations
- Park UI integration examples
- Real-world usage patterns

### 4. `/theme` - **Theme Demo**

**Purpose:** Tailwind CSS v4 theming demonstration

**Features:**

- Theme customization
- Dark mode toggle
- Semantic tokens showcase
- Color palette display

### 5. `/transitions` - **Transitions Demo**

**Purpose:** Vue Transition API demonstrations

**Features:**

- Various transition examples
- Animation patterns
- Vue transition system

### 6. `/about` - **About**

**Purpose:** About the design system

---

## Navigation Structure

### Sidebar Navigation

```
📊 Dashboard (/)
📦 Components (/components) ← Component Catalog
🖼️  Showcase (/showcase)
🎨 Theme (/theme)
✨ Transitions (/transitions)
ℹ️  About (/about)

📚 Resources (dropdown)
   └─ Storybook (http://localhost:6007)
   └─ Getting Started
   └─ Component Architecture
   └─ Component Status
   └─ Styling Guide
```

---

## Component Categories

### Form Inputs (18 components)

Input components for forms and data entry:

- Button, Input, Textarea
- **Password Input** ⭐ NEW
- **Pin Input** ⭐ NEW
- Number Input
- Checkbox, Switch, Select, Radio Group
- Slider
- **Date Picker** ⭐ NEW
- **Color Picker** ⭐ NEW
- **File Upload** ⭐ NEW
- Tags Input, Rating Group
- **Combobox** ⭐ NEW
- **Editable** ⭐ NEW

### Layout & Navigation (8 components)

Components for organizing and navigating content:

- Tabs, Accordion, Collapsible
- Menu, Pagination, Steps
- Segment Group, Carousel

### Overlays & Dialogs (5 components)

Modal and floating UI elements:

- Dialog, Popover, Tooltip
- Hover Card, Toast

### Display & Feedback (6 components)

Components for displaying content and feedback:

- Avatar, Badge, Card
- Progress
- **QR Code** ⭐ NEW
- Clipboard

### Utilities (4 components)

Helper components and wrappers:

- **Toggle** ⭐ NEW
- Toggle Group
- Field, Fieldset

---

## Component Card Layout

Each component card in the gallery:

```
┌─────────────────────────────────────┐
│  Component Name          [NEW]      │
│  Brief description text             │
│                                     │
│  🟢 View in Storybook         ↗    │
└─────────────────────────────────────┘
       ↑ Clickable - opens Storybook
```

**Interaction:**

- Click anywhere on the card to open the component in Storybook
- Hover effect provides visual feedback
- External link icon indicates it opens in a new tab

---

## Implementation Details

### File Structure

```
src/
├── views/
│   ├── ComponentsView.vue      (Catalog gallery - no demos)
│   ├── HomeView.vue            (Dashboard)
│   ├── ComponentShowcaseView.vue
│   ├── ThemeDemo.vue
│   └── AboutView.vue
├── router/
│   └── index.ts                (Routes with meta info)
└── components/
    ├── AppSidebar.vue          (Updated navigation)
    └── ui/                     (All 41 components)
```

### ComponentsView.vue

**Data Structure:**

```typescript
interface ComponentItem {
  name: string
  description: string
  category: string
  storybookPath: string
  status: 'stable' | 'new'
}
```

**Key Methods:**

- `openStorybook(path)` - Opens Storybook in a new tab
- `getStatusVariant(status)` - Returns badge variant

**State:**

- No component state needed (catalog only)
- Static component list with metadata

### Styling

- Card-based layout with hover effects
- Responsive grid (1/2/3 columns)
- Status badges for new components
- Semantic color tokens throughout

---

## Storybook Integration

### Component Stories

Each component has a dedicated Storybook story at:

```
http://localhost:6007/?path=/story/components-{componentname}--default
```

### Story Features

- Interactive controls for all props
- Multiple story variants (default, variations)
- Code snippets and examples
- Accessibility checks
- Responsive viewport testing

### Path Convention

```typescript
// Example paths from ComponentsView
storybookPath: '?path=/story/components-button--default'
storybookPath: '?path=/story/components-passwordinput--default'
storybookPath: '?path=/story/components-datepicker--default'
```

---

## Statistics

### Component Library Metrics

- **41 Total Components**
- **10 New Components** (Recently added)
- **100% TypeScript Coverage**
- **150+ Storybook Stories**

### New Components Added

1. **Toast** - Notification system with actions
2. **Password Input** - Secure password field
3. **Pin Input** - OTP/verification codes
4. **Toggle** - Binary toggle button
5. **QR Code** - QR code generator with download
6. **Combobox** - Searchable dropdown with autocomplete
7. **Date Picker** - Calendar-based date selection
8. **File Upload** - Drag & drop with preview
9. **Color Picker** - Visual color selection with swatches
10. **Editable** - Inline text editing with save/cancel

---

## Usage

### Running the Demo

```bash
# Start main application
pnpm dev
# → http://localhost:5173

# Start Storybook (in another terminal)
pnpm storybook
# → http://localhost:6007

# Visit the component gallery
# → http://localhost:5173/components
```

### Adding New Components to Gallery

1. **Create the component** in `src/components/ui/`
2. **Add Storybook story** in `src/components/ui/{component}/{Component}.stories.ts`
3. **Update ComponentsView.vue** - Add to `components` array:

```typescript
{
  name: 'New Component',
  description: 'Component description',
  category: 'Form Inputs', // or appropriate category
  storybookPath: '?path=/story/components-newcomponent--default',
  status: 'new', // or 'stable'
}
```

### Customizing Categories

Edit the `components` array in `ComponentsView.vue` to reorganize or add categories. The category list is automatically generated from the component metadata.

---

## Best Practices

### Component Gallery

✅ **Do:**

- Keep descriptions concise (1 line)
- Mark new components with `status: 'new'`
- Use correct Storybook paths
- Group components logically

❌ **Don't:**

- Add interactive demos to the gallery
- Create state management in ComponentsView
- Duplicate Storybook content

### Storybook Stories

✅ **Do:**

- Provide multiple story variants
- Include prop controls
- Add code examples
- Document edge cases

❌ **Don't:**

- Create minimal stories without controls
- Skip accessibility checks
- Forget responsive testing

### Performance

- Gallery loads fast (no component demos)
- Lazy load route components
- Storybook handles heavy interactive demos
- Clean separation of concerns

---

## Future Enhancements

### Planned Features

- [ ] Component search/filter in gallery
- [ ] Category filtering
- [ ] Grid/list view toggle
- [ ] Component dependency graph
- [ ] Usage statistics per component
- [ ] "Recently viewed" in Storybook

### Additional Pages

- [ ] Forms page - Complete form examples
- [ ] Patterns page - Common UI patterns
- [ ] Templates page - Full page templates
- [ ] Playground - Interactive component builder

---

## Benefits of This Approach

### Main App

- ✅ Fast loading - no heavy component demos
- ✅ Clean, scannable interface
- ✅ Easy to navigate
- ✅ SEO-friendly catalog

### Storybook

- ✅ Comprehensive interactive demos
- ✅ Built-in documentation
- ✅ Isolated component testing
- ✅ Shareable component URLs

### Development

- ✅ Single source of truth (Storybook)
- ✅ Easier to maintain
- ✅ Better separation of concerns
- ✅ Faster iteration on demos

---

## Links

- **Component Gallery:** `http://localhost:5173/components`
- **Storybook:** `http://localhost:6007`
- **GitHub:** https://github.com/blakeing/facts-ark
- **Documentation:** `/docs`

---

**Last Updated:** October 9, 2025  
**Status:** ✅ Complete - Catalog + Storybook Integration
