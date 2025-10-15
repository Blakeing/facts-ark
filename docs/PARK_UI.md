# Park UI Integration Guide

This comprehensive guide covers all aspects of Park UI integration in Facts Ark, including design system adoption, migration strategies, and leveraging Park UI resources.

## Table of Contents

1. [Integration Summary](#integration-summary)
2. [Migration Guide](#migration-guide)
3. [Leveraging Park UI Resources](#leveraging-park-ui-resources)
4. [Best Practices](#best-practices)

## Integration Summary

### TL;DR

**You were right!** Building a cohesive design IS the time-consuming part. We've solved this by **porting Park UI's design decisions to your Tailwind setup** instead of migrating to Panda CSS.

### What We Did

#### ✅ Created Park UI-Inspired Design Tokens

**Files Created:**

- `tailwind.config.park.ts` - Complete Tailwind config matching Park UI's system
- `src/assets/park-ui-tokens.css` - Semantic design tokens (colors, spacing, etc.)
- `docs/PARK_UI_MIGRATION_GUIDE.md` - Step-by-step integration guide

#### ✅ Updated Button Component (Example)

**Before:**

```typescript
// Old variants
variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
size?: 'sm' | 'md' | 'lg'
```

**After (Park UI-inspired):**

```typescript
// New variants matching Park UI
variant?: 'solid' | 'secondary' | 'outline' | 'ghost' | 'link' | 'destructive'
size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
```

**Key Changes:**

- Uses semantic color tokens (`bg-primary`, `text-primary-foreground`)
- Added focus ring states
- Better hover transitions
- More size options (xs, xl)
- Link variant for text-only buttons

### What You Get

#### 🎨 Park UI's Design Cohesion

- ✅ Consistent color palette (Radix-inspired)
- ✅ Semantic tokens (primary, secondary, destructive, muted, etc.)
- ✅ Standardized spacing/sizing
- ✅ Matching component variants
- ✅ Professional design out of the box

#### 💪 Your Technology Stack

- ✅ Keep Tailwind CSS v4
- ✅ Keep your 26+ components
- ✅ Keep `tailwind-variants`
- ✅ Keep Storybook
- ✅ Keep Ark UI
- ✅ No migration pain

### Next Steps

#### Immediate Actions

1. **Choose Your Approach:**

   **Option A (Recommended): Full Switch**

   ```bash
   # Use the new Park UI-inspired config
   mv tailwind.config.ts tailwind.config.old.ts
   mv tailwind.config.park.ts tailwind.config.ts
   ```

   **Option B: Gradual Migration**

   ```bash
   # Keep both configs, merge manually
   # Reference tailwind.config.park.ts when updating components
   ```

2. **Update Base CSS:**

   ```typescript
   // In src/assets/main.css
   @import './park-ui-tokens.css'; // Add this line
   ```

3. **Test Button Component:**
   ```bash
   pnpm storybook
   # Navigate to UI/Button and see the new variants
   ```

#### Component Update Strategy

Update components in this order (highest impact first):

##### Week 1: Core Interactive Components

- [x] Button ← **Already done!**
- [ ] Input
- [ ] Select
- [ ] Checkbox
- [ ] Switch

##### Week 2: Layout Components

- [ ] Card
- [ ] Dialog
- [ ] Popover
- [ ] Tabs

##### Week 3: Form Components

- [ ] Field
- [ ] Fieldset
- [ ] NumberInput
- [ ] TagsInput
- [ ] Textarea

##### Week 4: Complex Components

- [ ] Menu
- [ ] Accordion
- [ ] Carousel
- [ ] Pagination
- [ ] Steps

##### Week 5+: Remaining Components

- [ ] All other components

#### For Each Component:

1. **Visit Park UI's page**: [park-ui.com/docs/components/[component-name]](https://park-ui.com/docs/components)
2. **Study their design**: Note variants, sizes, spacing, states
3. **Update your `.variants.ts`**: Port their styling to Tailwind classes
4. **Update your `.types.ts`**: Match their prop API if needed
5. **Update `.stories.ts`**: Show all new variants
6. **Test in Storybook**: Verify visual consistency

### Example: How to Update Any Component

#### 1. Visit Park UI

Go to: `https://park-ui.com/docs/components/[your-component]`

#### 2. Study Their Design

Note:

- What variants do they have? (solid, outline, ghost, etc.)
- What sizes? (xs, sm, md, lg, xl)
- What states? (hover, focus, disabled, active)
- What spacing? (padding, gaps)

#### 3. Port to Tailwind

```typescript
// Example: Card component
export const cardVariants = tv({
  base: ['rounded-lg', 'border border-border', 'bg-card text-card-foreground', 'shadow-sm'],
  variants: {
    variant: {
      elevated: 'border-0 shadow-md',
      outline: 'shadow-none',
      filled: 'border-0 bg-muted',
    },
    padding: {
      none: 'p-0',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    },
  },
  defaultVariants: {
    variant: 'outline',
    padding: 'md',
  },
})
```

#### 4. Update Types

```typescript
import type { VariantProps } from 'tailwind-variants'
import type { cardVariants } from './card.variants'

type CardVariantProps = VariantProps<typeof cardVariants>

export interface CardProps {
  variant?: CardVariantProps['variant']
  padding?: CardVariantProps['padding']
  class?: string
}
```

### Design Token Reference

#### Colors

Use semantic tokens instead of hardcoded colors:

**Before:**

```typescript
'bg-indigo-600 text-white hover:bg-indigo-500'
```

**After:**

```typescript
'bg-primary text-primary-foreground hover:bg-primary/90'
```

#### Common Patterns

| Use Case          | Token                                        |
| ----------------- | -------------------------------------------- |
| Primary action    | `bg-primary text-primary-foreground`         |
| Secondary action  | `bg-secondary text-secondary-foreground`     |
| Subtle background | `bg-muted text-muted-foreground`             |
| Danger/Delete     | `bg-destructive text-destructive-foreground` |
| Borders           | `border-border`                              |
| Input fields      | `border-input`                               |
| Focus rings       | `ring-ring`                                  |

#### Hover States

| Pattern   | Example                                        |
| --------- | ---------------------------------------------- |
| Darken    | `hover:bg-primary/90`                          |
| Subtle    | `hover:bg-accent hover:text-accent-foreground` |
| Underline | `hover:underline`                              |

### Customization

#### Change Your Brand Color

Edit `src/assets/park-ui-tokens.css`:

```css
:root {
  /* Uncomment your preferred primary color: */

  /* Indigo (default) */
  --primary: 221.2 83.2% 53.3%;

  /* Blue */
  /* --primary: 217.2 91.2% 59.8%; */

  /* Violet */
  /* --primary: 262.1 83.3% 57.8%; */

  /* Green */
  /* --primary: 142.1 76.2% 36.3%; */
}
```

#### Change Border Radius

```css
:root {
  --radius: 0.5rem; /* 8px - Park UI default */
  /* --radius: 0.25rem; */ /* 4px - sharper corners */
  /* --radius: 0.75rem; */ /* 12px - rounder corners */
}
```

### Benefits Summary

#### What You're Getting

✅ **Park UI's design cohesion** - Professional, consistent styling  
✅ **Tailwind CSS** - Keep your preferred technology  
✅ **No migration** - Update incrementally  
✅ **Type safety** - Full TypeScript support  
✅ **Storybook** - Visual documentation  
✅ **Ark UI** - Same headless primitives

#### What You're Avoiding

❌ Complete rewrite (Tailwind → Panda CSS)  
❌ Learning curve of new CSS-in-JS system  
❌ Smaller ecosystem  
❌ Months of migration work

### Questions?

**Q: Do I have to update all components at once?**  
A: No! Update incrementally. Start with Button (done!), then Input, Select, etc.

**Q: Can I keep my old component variants during migration?**  
A: Yes! Add new variants alongside old ones, deprecate gradually.

**Q: Will this work with dark mode?**  
A: Yes! The tokens include dark mode definitions. Add `class="dark"` to test.

**Q: Can I customize the design tokens?**  
A: Absolutely! Edit `park-ui-tokens.css` to match your brand.

**Q: Should I delete my old tailwind.config.ts?**  
A: Keep it as `tailwind.config.old.ts` for reference until migration is complete.

## Migration Guide

This guide explains how to adopt Park UI's design cohesion **without migrating to Panda CSS**.

### The Strategy

Instead of switching to Panda CSS, we're **porting Park UI's design decisions** to Tailwind:

1. ✅ Use their color palette (Radix Colors)
2. ✅ Match their spacing/sizing scale
3. ✅ Replicate their component variants
4. ✅ Follow their design patterns
5. ✅ Keep your Tailwind setup

### Step 1: Update Design Tokens

#### Option A: Use New Config (Recommended for Consistency)

```bash
# Rename the Park UI-inspired config
mv tailwind.config.park.ts tailwind.config.ts

# Update your base.css imports
```

Then in `src/assets/main.css`:

```css
@import './park-ui-tokens.css';
```

#### Option B: Merge into Existing Config

Copy the color system and radius from `tailwind.config.park.ts` into your existing `tailwind.config.ts`.

### Step 2: Update Component Variants

Reference Park UI's component pages and update your variant files. Here's the pattern:

#### Example: Button Component

**Park UI Button Variants (on their site):**

- Solid (default)
- Outline
- Ghost
- Link

**Sizes:**

- xs, sm, md, lg, xl

Update `src/components/ui/button/button.variants.ts`:

```typescript
import { tv } from 'tailwind-variants'

export const buttonVariants = tv({
  base: [
    'inline-flex items-center justify-center gap-2',
    'rounded-md font-semibold',
    'transition-colors',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    variant: {
      // Matches Park UI's "solid" variant
      solid: 'bg-primary text-primary-foreground hover:bg-primary/90',

      // Matches Park UI's "outline" variant
      outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',

      // Matches Park UI's "ghost" variant
      ghost: 'hover:bg-accent hover:text-accent-foreground',

      // Matches Park UI's "link" variant
      link: 'text-primary underline-offset-4 hover:underline',

      // Destructive variant
      destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
    },
    size: {
      xs: 'h-8 px-3 text-xs',
      sm: 'h-9 px-4 text-sm',
      md: 'h-10 px-5 text-sm',
      lg: 'h-11 px-6 text-base',
      xl: 'h-12 px-8 text-base',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
})
```

### Step 3: Component-by-Component Updates

For each component, follow this process:

1. **Visit Park UI's component page**: [park-ui.com/docs/components/button](https://park-ui.com/docs/components/button)
2. **Study their variants**: Look at solid, outline, ghost, etc.
3. **Note spacing/sizes**: xs, sm, md, lg, xl
4. **Update your `.variants.ts` file**: Match their design decisions
5. **Test in Storybook**: Verify visual consistency

#### Components to Update (Priority Order):

##### High Priority (Core components):

- [ ] Button
- [ ] Input
- [ ] Card
- [ ] Badge
- [ ] Dialog

##### Medium Priority:

- [ ] Select
- [ ] Checkbox
- [ ] Switch
- [ ] Tabs
- [ ] Accordion

##### Lower Priority:

- [ ] Avatar
- [ ] Progress
- [ ] Tooltip
- [ ] All others

### Step 4: Theming System

Park UI lets you choose accent colors. We've set up the same system:

#### Change Your Accent Color

Edit `src/assets/park-ui-tokens.css`:

```css
:root {
  /* Uncomment your preferred color: */

  /* Indigo (default) */
  --primary: 221.2 83.2% 53.3%;

  /* Blue */
  /* --primary: 217.2 91.2% 59.8%; */

  /* Violet */
  /* --primary: 262.1 83.3% 57.8%; */

  /* Green */
  /* --primary: 142.1 76.2% 36.3%; */
}
```

### Step 5: Reference Park UI's Patterns

For each component you build, reference Park UI's implementation:

1. **Component Structure**: How they compose Ark UI primitives
2. **Prop API**: What props they expose
3. **Visual Design**: Spacing, colors, states
4. **Accessibility**: ARIA labels, keyboard nav

**Example workflow:**

1. Open [Park UI Select component](https://park-ui.com/docs/components/select)
2. Look at Vue examples
3. Note their prop API
4. Update your `Select.vue` to match the API (not the Panda CSS code)
5. Adapt their styling to Tailwind classes

### Benefits of This Approach

✅ **Keep Tailwind** - No migration needed  
✅ **Park UI Design** - Same visual consistency  
✅ **Your Architecture** - Keep your component structure  
✅ **Type Safety** - Keep using `tailwind-variants`  
✅ **Ecosystem** - Keep Tailwind's massive ecosystem  
✅ **Incremental** - Update components one at a time

### Color Palette Reference

Park UI uses Radix Colors. Here's how they map to Tailwind semantic tokens:

| Park UI    | Tailwind Semantic  | Usage               |
| ---------- | ------------------ | ------------------- |
| `accent.9` | `primary`          | Primary brand color |
| `accent.3` | `primary/10`       | Subtle backgrounds  |
| `gray.12`  | `foreground`       | Primary text        |
| `gray.11`  | `muted-foreground` | Secondary text      |
| `gray.4`   | `border`           | Borders             |
| `gray.3`   | `muted`            | Subtle backgrounds  |
| `red.9`    | `destructive`      | Errors/danger       |

### Next Steps

1. **Choose an accent color** in `park-ui-tokens.css`
2. **Update Button component** first (most visible)
3. **Update one component per session**
4. **Test in Storybook** after each update
5. **Document your changes** in component `.stories.ts` files

## Leveraging Park UI Resources

### 🎨 Current Status

You're **already using Park UI's design system**! Here's what you have:

#### ✅ What's Implemented:

- **Color Palette**: Radix Colors (same as Park UI) in OKLCH format
- **Semantic Tokens**: Park UI's exact naming (`background`, `foreground`, `muted`, `primary`, etc.)
- **Component Styling**: Park UI design decisions ported to Tailwind CSS
- **26 Components**: All styled with Park UI patterns
- **Dark Mode**: Park UI's light/dark theme system

#### 🔄 The Architecture:

```
Park UI = Ark UI (components) + Panda CSS (styling)
Your App = Ark UI (components) + Tailwind CSS (styling) + Park UI Design Tokens
```

### 🚀 How to Leverage More Park UI Resources

#### Option 1: Install Official Radix Colors (Recommended)

Park UI is built on [Radix Colors](https://www.radix-ui.com/colors). Install the official package:

```bash
pnpm add @radix-ui/colors
```

**Benefits:**

- Access to 30+ color scales (slate, mauve, sage, olive, sand, etc.)
- Official OKLCH conversions
- P3 color space support
- Automatic dark mode variants

**Example Usage:**

```typescript
// Import any Radix color scale
import * as slate from '@radix-ui/colors';
import * as violet from '@radix-ui/colors';

// Use in your CSS variables
--color-gray-1: ${slate.slate1};
--color-accent-9: ${violet.violet9};
```

#### Option 2: Access Park UI Component Examples via MCP

We have **direct access** to Park UI/Ark UI examples:

##### Available Components (55+):

```
✅ Forms: checkbox, radio-group, select, combobox, tags-input,
          file-upload, number-input, password-input, pin-input
✅ Layout: dialog, popover, tabs, accordion, collapsible, splitter
✅ Data: carousel, pagination, progress, rating-group, slider, steps
✅ Advanced: date-picker, time-picker, color-picker, signature-pad,
            qr-code, tree-view, json-tree-view, tour
```

##### Example: Get Advanced Patterns

```bash
# Via Cursor MCP
- mcp_ark-ui_list_examples - See all examples for a component
- mcp_ark-ui_get_example - Get full code for any pattern
- mcp_ark-ui_get_component_props - Get TypeScript props
- mcp_ark-ui_styling_guide - Get data attributes for styling
```

**Real Example - Nested Dialogs:**

```vue
<script setup lang="ts">
import { Dialog, useDialog } from '@ark-ui/vue/dialog'

const confirmDialog = useDialog()
const parentDialog = useDialog({
  onOpenChange: (details) => {
    if (!details.open && hasUnsavedChanges) {
      confirmDialog.value.setOpen(true)
    }
  },
})
</script>
```

#### Option 3: Copy Component Styles from Park UI Website

Visit [park-ui.com](https://park-ui.com) and:

1. Find any component you like
2. View the code
3. Copy the Panda CSS styles
4. Convert to Tailwind using our semantic tokens

**Conversion is easy:**

```typescript
// Panda CSS (Park UI)
bg: 'bg.default'
color: 'fg.default'

// Tailwind (Your App)
bg - background
text - foreground
```

### 📦 Option 4: Add More Park UI Inspired Components

We can add components you don't have yet:

#### Missing from Your App:

- **Date Picker** - Calendar selection
- **Time Picker** - Time selection
- **Color Picker** - Color selection with swatches
- **File Upload** - Drag & drop file uploader
- **Number Input** - Stepper input
- **Password Input** - Toggle visibility
- **Pin Input** - OTP/PIN entry
- **QR Code** - Generate QR codes
- **Signature Pad** - Drawing signature
- **Tree View** - Hierarchical data
- **Toast** - Notifications
- **Toggle Group** - Multiple toggles
- **Tour** - Guided user tours

Would you like any of these?

### 🎯 Recommended Next Steps

#### 1. **Install Radix Colors** (5 min)

```bash
pnpm add @radix-ui/colors
```

Benefits:

- More color options (30+ palettes)
- Official P3 wide gamut colors
- Easy to switch accent colors

#### 2. **Add Advanced Components** (varies)

Choose from 25+ additional Ark UI components we haven't wrapped yet:

- Date/Time pickers for forms
- Color picker for themes
- File upload for user content
- Tree view for navigation
- Toast for notifications

#### 3. **Explore MCP Examples** (ongoing)

Use the MCP tools to get:

- Advanced interaction patterns
- Accessibility patterns
- Form composition examples
- State management patterns

### 💡 Best Practices

#### Using Park UI Patterns with Tailwind:

1. **Semantic Tokens Over Raw Colors:**

   ```vue
   <!-- ❌ Bad -->
   <div class="bg-slate-100 text-slate-900"></div>
   ```

2. **Data Attributes for State:**

   ```vue
   <!-- ✅ Use Ark UI's data attributes -->
   <Select.Item
     class="data-[highlighted]:bg-accent data-[state=checked]:text-primary"
   ></Select.Item>
   ```

3. **Consistent Spacing:**

   ```vue
   <!-- Park UI uses consistent spacing -->
   <Card padding="md"></Card>
   ```

4. **Focus Rings:**
   ```css
   /* Park UI style focus rings */
   focus:outline-none focus-visible:ring-2 focus-visible:ring-ring
   focus-visible:ring-offset-2 focus-visible:ring-offset-background
   ```

### 🔍 Finding Park UI Styles

#### Method 1: Park UI Website

1. Go to https://park-ui.com/docs/components
2. Find component you want
3. Click "View Code"
4. See Panda CSS implementation
5. Convert to Tailwind using semantic tokens

#### Method 2: GitHub Source

```bash
# Clone Park UI repo
git clone https://github.com/cschroeter/park-ui.git

# Find component styles in
/components/{framework}/{component}.tsx
```

#### Method 3: Use MCP (Fastest)

```typescript
// In Cursor, just ask:
'Show me the advanced select example from Park UI'
'Get the date picker component props'
'Show me how Park UI handles form validation'
```

### 🎨 Color System Deep Dive

#### Your Current Colors (Radix-based):

**Light Mode:**

- `background`: `oklch(100% 0 0)` - Pure white
- `foreground`: `oklch(14.5% 0.007 285.75)` - Very dark slate
- `muted`: `oklch(96.5% 0.003 264.4)` - Light gray
- `primary`: `oklch(60.5% 0.169 273.5)` - Indigo

**Dark Mode:**

- `background`: `oklch(14.5% 0.007 285.75)` - Very dark slate
- `foreground`: `oklch(98.5% 0.003 264.4)` - Off-white
- `card`: `oklch(20.5% 0.015 256.8)` - Dark gray
- `primary`: `oklch(92.2% 0 0)` - Light gray (inverted)

#### Available Radix Color Scales:

```
Gray scales: gray, mauve, slate, sage, olive, sand
Accent scales: tomato, red, ruby, crimson, pink, plum, purple,
               violet, iris, indigo, blue, cyan, teal, jade,
               green, grass, bronze, gold, brown, orange, amber
```

### 🤔 What Should You Do Next?

#### If you want **more colors**:

→ Install `@radix-ui/colors` and swap color palettes

#### If you want **more components**:

→ Tell me which components you need (date picker, file upload, etc.)

#### If you want **advanced patterns**:

→ Ask me to show MCP examples for specific use cases

#### If you want **Park UI's exact styling**:

→ We can visit their site and port specific component styles

**What interests you most?** 🎯

## Best Practices

### Design Consistency Guidelines

1. **Always use semantic tokens** instead of hardcoded colors
2. **Follow Park UI's component API** for consistency
3. **Use Ark UI's data attributes** for state styling
4. **Test in Storybook** after each component update
5. **Update incrementally** - one component at a time

### Migration Guidelines

1. **Start with high-impact components** (Button, Input, Card)
2. **Keep old variants temporarily** during migration
3. **Reference Park UI's website** for design decisions
4. **Use semantic tokens everywhere** for easy theming
5. **Test dark mode** with each update

### Resources

- [Park UI Components](https://park-ui.com/docs/components)
- [Radix Colors](https://www.radix-ui.com/colors)
- [tailwind-variants Docs](https://www.tailwind-variants.org/)

---

**Remember**: You're getting Park UI's design excellence without leaving Tailwind. This is the best of both worlds!
