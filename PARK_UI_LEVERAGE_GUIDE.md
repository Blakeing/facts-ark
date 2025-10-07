# Leveraging Park UI Theme & Resources

## 🎨 Current Status

You're **already using Park UI's design system**! Here's what you have:

### ✅ What's Implemented:

- **Color Palette**: Radix Colors (same as Park UI) in OKLCH format
- **Semantic Tokens**: Park UI's exact naming (`background`, `foreground`, `muted`, `primary`, etc.)
- **Component Styling**: Park UI design decisions ported to Tailwind CSS
- **26 Components**: All styled with Park UI patterns
- **Dark Mode**: Park UI's light/dark theme system

### 🔄 The Architecture:

```
Park UI = Ark UI (components) + Panda CSS (styling)
Your App = Ark UI (components) + Tailwind CSS (styling) + Park UI Design Tokens
```

---

## 🚀 How to Leverage More Park UI Resources

### Option 1: Install Official Radix Colors (Recommended)

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

### Option 2: Access Park UI Component Examples via MCP

We have **direct access** to Park UI/Ark UI examples:

#### Available Components (55+):

```
✅ Forms: checkbox, radio-group, select, combobox, tags-input,
          file-upload, number-input, password-input, pin-input
✅ Layout: dialog, popover, tabs, accordion, collapsible, splitter
✅ Data: carousel, pagination, progress, rating-group, slider, steps
✅ Advanced: date-picker, time-picker, color-picker, signature-pad,
            qr-code, tree-view, json-tree-view, tour
```

#### Example: Get Advanced Patterns

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

### Option 3: Copy Component Styles from Park UI Website

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

---

## 📦 Option 4: Add More Park UI Inspired Components

We can add components you don't have yet:

### Missing from Your App:

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

---

## 🎯 Recommended Next Steps

### 1. **Install Radix Colors** (5 min)

```bash
pnpm add @radix-ui/colors
```

Benefits:

- More color options (30+ palettes)
- Official P3 wide gamut colors
- Easy to switch accent colors

### 2. **Add Advanced Components** (varies)

Choose from 25+ additional Ark UI components we haven't wrapped yet:

- Date/Time pickers for forms
- Color picker for themes
- File upload for user content
- Tree view for navigation
- Toast for notifications

### 3. **Explore MCP Examples** (ongoing)

Use the MCP tools to get:

- Advanced interaction patterns
- Accessibility patterns
- Form composition examples
- State management patterns

---

## 💡 Best Practices

### Using Park UI Patterns with Tailwind:

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

---

## 🔍 Finding Park UI Styles

### Method 1: Park UI Website

1. Go to https://park-ui.com/docs/components
2. Find component you want
3. Click "View Code"
4. See Panda CSS implementation
5. Convert to Tailwind using semantic tokens

### Method 2: GitHub Source

```bash
# Clone Park UI repo
git clone https://github.com/cschroeter/park-ui.git

# Find component styles in
/components/{framework}/{component}.tsx
```

### Method 3: Use MCP (Fastest)

```typescript
// In Cursor, just ask:
'Show me the advanced select example from Park UI'
'Get the date picker component props'
'Show me how Park UI handles form validation'
```

---

## 🎨 Color System Deep Dive

### Your Current Colors (Radix-based):

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

### Available Radix Color Scales:

```
Gray scales: gray, mauve, slate, sage, olive, sand
Accent scales: tomato, red, ruby, crimson, pink, plum, purple,
               violet, iris, indigo, blue, cyan, teal, jade,
               green, grass, bronze, gold, brown, orange, amber
```

---

## 📚 Additional Resources

- **Park UI Docs**: https://park-ui.com/docs
- **Ark UI Docs**: https://ark-ui.com
- **Radix Colors**: https://www.radix-ui.com/colors
- **Your Migration Docs**:
  - `MIGRATION_STATUS.md` - Component progress
  - `PARK_UI_MIGRATION_GUIDE.md` - Migration steps
  - `VIEWS_UPDATE_SUMMARY.md` - View updates

---

## 🤔 What Should You Do Next?

### If you want **more colors**:

→ Install `@radix-ui/colors` and swap color palettes

### If you want **more components**:

→ Tell me which components you need (date picker, file upload, etc.)

### If you want **advanced patterns**:

→ Ask me to show MCP examples for specific use cases

### If you want **Park UI's exact styling**:

→ We can visit their site and port specific component styles

**What interests you most?** 🎯
