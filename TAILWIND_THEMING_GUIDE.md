# 🎨 Tailwind CSS v4 Theming Ecosystem Guide

## What You Now Have Access To

You've unlocked Tailwind CSS v4's **full theming ecosystem** combined with Park UI's design system!

### 🎯 Available Features:

1. **17 Color Scales** from Tailwind (slate, gray, zinc, blue, indigo, violet, purple, emerald, red, amber, teal, etc.)
2. **Park UI Semantic Tokens** (background, foreground, primary, etc.)
3. **Full Shade Range** (50-950) for every color
4. **Spacing Scale** (consistent padding, margin, gap)
5. **Typography Scale** (font sizes with line heights)
6. **Radius Tokens** (consistent border radius)
7. **Dark Mode Support** for all tokens
8. **Responsive Design** tokens and breakpoints

---

## 🚀 Quick Start Examples

### Using Semantic Tokens (Recommended for Consistency)

```vue
<template>
  <!-- ✅ Best Practice: Use semantic tokens for components -->
  <Card class="bg-card text-card-foreground border-border">
    <h2 class="text-foreground">Card Title</h2>
    <p class="text-muted-foreground">Card description</p>
    <Button class="bg-primary text-primary-foreground"> Click Me </Button>
  </Card>
</template>
```

**Why?** Semantic tokens automatically adapt to:

- Light/dark mode
- Theme changes
- Brand color updates

### Using Tailwind Color Scales (For Specific Needs)

```vue
<template>
  <!-- ✅ Great for data visualization, status indicators, specific colors -->
  <div class="space-y-4">
    <!-- Gradient background using Tailwind colors -->
    <div class="bg-gradient-to-r from-blue-500 to-violet-500 text-white p-6">
      Vibrant gradient heading
    </div>

    <!-- Status badges with specific colors -->
    <div class="flex gap-2">
      <span class="bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Active</span>
      <span class="bg-amber-100 text-amber-700 px-2 py-1 rounded">Pending</span>
      <span class="bg-red-100 text-red-700 px-2 py-1 rounded">Error</span>
    </div>

    <!-- Charts with distinct colors -->
    <div class="flex gap-4">
      <div class="h-20 w-20 bg-blue-500"></div>
      <div class="h-20 w-20 bg-purple-500"></div>
      <div class="h-20 w-20 bg-teal-500"></div>
    </div>
  </div>
</template>
```

**When to use:**

- Data visualization (charts, graphs)
- Status indicators with specific colors
- Marketing pages with brand colors
- Decorative elements

---

## 📚 Complete Color Reference

### Park UI Semantic Tokens

Based on [Radix Colors](https://www.radix-ui.com/colors), these tokens adapt to light/dark mode:

| Token                     | Light Mode | Dark Mode  | Usage                |
| ------------------------- | ---------- | ---------- | -------------------- |
| `bg-background`           | White      | Very Dark  | Main page background |
| `text-foreground`         | Very Dark  | Off-white  | Primary text         |
| `bg-card`                 | White      | Dark Gray  | Card backgrounds     |
| `text-card-foreground`    | Very Dark  | Off-white  | Card text            |
| `bg-primary`              | Indigo     | Light      | Primary actions      |
| `text-primary-foreground` | White      | Dark       | Primary button text  |
| `bg-secondary`            | Light Gray | Dark Gray  | Secondary actions    |
| `bg-muted`                | Light Gray | Dark Gray  | Subtle backgrounds   |
| `text-muted-foreground`   | Gray       | Light Gray | Secondary text       |
| `bg-accent`               | Light Gray | Dark Gray  | Accent elements      |
| `bg-destructive`          | Red        | Bright Red | Destructive actions  |
| `border-border`           | Light Gray | Very Dark  | All borders          |
| `ring-ring`               | Indigo     | Blue       | Focus rings          |

### Tailwind Color Scales

All colors have 11 shades (50-950) in OKLCH format ([see Tailwind docs](https://tailwindcss.com/docs/colors)):

#### Neutral Colors (For Text & Backgrounds)

- `slate-*` - Cool gray (blue undertone)
- `gray-*` - True gray (balanced)
- `zinc-*` - Cooler gray (slightly blue)

```vue
<!-- Using different gray scales -->
<div class="bg-slate-100 text-slate-900">Cool gray background</div>
<div class="bg-gray-100 text-gray-900">True gray background</div>
<div class="bg-zinc-100 text-zinc-900">Cooler gray background</div>
```

#### Brand Colors

- `blue-*` - Bright blue (trust, tech)
- `indigo-*` - Blue-purple (your current primary)
- `violet-*` - Purple-blue (creative)
- `purple-*` - Vivid purple (luxury)

```vue
<!-- Primary buttons with different colors -->
<Button class="bg-blue-600 hover:bg-blue-700">Blue</Button>
<Button class="bg-indigo-600 hover:bg-indigo-700">Indigo</Button>
<Button class="bg-violet-600 hover:bg-violet-700">Violet</Button>
<Button class="bg-purple-600 hover:bg-purple-700">Purple</Button>
```

#### Status Colors

- `emerald-*` - Success/positive
- `red-*` - Error/danger
- `amber-*` - Warning/caution
- `teal-*` - Info/accent

```vue
<!-- Status messages -->
<div class="bg-emerald-50 border-l-4 border-emerald-500 p-4">
  <p class="text-emerald-700">✓ Success message</p>
</div>

<div class="bg-red-50 border-l-4 border-red-500 p-4">
  <p class="text-red-700">✗ Error message</p>
</div>

<div class="bg-amber-50 border-l-4 border-amber-500 p-4">
  <p class="text-amber-700">⚠ Warning message</p>
</div>

<div class="bg-teal-50 border-l-4 border-teal-500 p-4">
  <p class="text-teal-700">ℹ Info message</p>
</div>
```

---

## 🎯 Advanced Theming Patterns

### 1. Mixing Semantic + Tailwind Colors

```vue
<template>
  <!-- Card uses semantic tokens for consistency -->
  <Card class="bg-card border-border">
    <!-- Heading uses semantic token -->
    <h2 class="text-foreground">User Activity</h2>

    <!-- Chart uses specific Tailwind colors for clarity -->
    <div class="mt-4 flex gap-2">
      <div class="bg-blue-500 h-32 flex-1"></div>
      <div class="bg-purple-500 h-24 flex-1"></div>
      <div class="bg-teal-500 h-40 flex-1"></div>
    </div>

    <!-- Legend uses Tailwind colors to match chart -->
    <div class="mt-2 flex gap-4 text-sm">
      <span class="flex items-center gap-1">
        <div class="w-3 h-3 rounded-full bg-blue-500"></div>
        <span class="text-muted-foreground">Views</span>
      </span>
      <span class="flex items-center gap-1">
        <div class="w-3 h-3 rounded-full bg-purple-500"></div>
        <span class="text-muted-foreground">Clicks</span>
      </span>
      <span class="flex items-center gap-1">
        <div class="w-3 h-3 rounded-full bg-teal-500"></div>
        <span class="text-muted-foreground">Conversions</span>
      </span>
    </div>
  </Card>
</template>
```

### 2. Creating Color Variations

```vue
<template>
  <!-- Light to dark gradient using shade scale -->
  <div class="space-y-2">
    <div class="bg-blue-50 p-4">Lightest blue</div>
    <div class="bg-blue-100 p-4">Very light blue</div>
    <div class="bg-blue-200 p-4">Light blue</div>
    <div class="bg-blue-300 p-4">Medium-light blue</div>
    <div class="bg-blue-400 p-4">Medium blue</div>
    <div class="bg-blue-500 p-4 text-white">Base blue</div>
    <div class="bg-blue-600 p-4 text-white">Medium-dark blue</div>
    <div class="bg-blue-700 p-4 text-white">Dark blue</div>
    <div class="bg-blue-800 p-4 text-white">Very dark blue</div>
    <div class="bg-blue-900 p-4 text-white">Darkest blue</div>
    <div class="bg-blue-950 p-4 text-white">Extra dark blue</div>
  </div>
</template>
```

### 3. Hover & State Variations

```vue
<template>
  <!-- Using shade scale for hover states -->
  <button class="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white px-4 py-2">
    Hover me
  </button>

  <!-- Using semantic tokens for hover (adapts to theme) -->
  <button
    class="bg-primary hover:bg-primary/90 active:bg-primary/80 text-primary-foreground px-4 py-2"
  >
    Themed button
  </button>

  <!-- Disabled states -->
  <button disabled class="bg-slate-300 text-slate-500 cursor-not-allowed px-4 py-2">
    Disabled
  </button>
</template>
```

### 4. Dark Mode Specific Overrides

```vue
<template>
  <!-- Different colors in light vs dark mode -->
  <div class="bg-slate-100 dark:bg-slate-800 p-4">
    <h2 class="text-slate-900 dark:text-slate-100">Adaptive heading</h2>
    <p class="text-slate-600 dark:text-slate-400">Adaptive text</p>
  </div>

  <!-- Or use semantic tokens (simpler!) -->
  <div class="bg-card p-4">
    <h2 class="text-foreground">Heading</h2>
    <p class="text-muted-foreground">Text</p>
  </div>
</template>
```

---

## 📐 Spacing & Layout Tokens

### Using Spacing Scale

```vue
<template>
  <!-- Consistent spacing using tokens -->
  <div class="p-4 space-y-4">
    <!-- 4 = 1rem = 16px -->
    <div class="p-2">Small padding</div>
    <!-- 0.5rem = 8px -->
    <div class="p-4">Medium padding</div>
    <!-- 1rem = 16px -->
    <div class="p-6">Large padding</div>
    <!-- 1.5rem = 24px -->
    <div class="p-8">Extra large padding</div>
    <!-- 2rem = 32px -->
  </div>

  <!-- Gaps between flex/grid items -->
  <div class="flex gap-2">...</div>
  <!-- 8px gap -->
  <div class="flex gap-4">...</div>
  <!-- 16px gap -->
  <div class="flex gap-6">...</div>
  <!-- 24px gap -->

  <!-- Margins -->
  <div class="mt-8 mb-4">Content with margins</div>
</template>
```

### Radius Tokens

```vue
<template>
  <!-- Different border radii -->
  <div class="rounded-sm">Small rounded</div>
  <!-- radius-sm -->
  <div class="rounded-md">Medium rounded</div>
  <!-- radius-md -->
  <div class="rounded-lg">Large rounded</div>
  <!-- radius-lg -->
  <div class="rounded-xl">Extra large</div>
  <!-- radius-xl -->
  <div class="rounded-full">Circular</div>
  <!-- radius-full -->

  <!-- Using in components -->
  <Card class="rounded-lg">
    <!-- Consistent with theme -->
    ...
  </Card>
</template>
```

---

## 🎨 Typography Tokens

```vue
<template>
  <div class="space-y-4">
    <h1 class="text-4xl font-bold text-foreground">Heading 1</h1>
    <h2 class="text-3xl font-bold text-foreground">Heading 2</h2>
    <h3 class="text-2xl font-semibold text-foreground">Heading 3</h3>
    <h4 class="text-xl font-semibold text-foreground">Heading 4</h4>
    <p class="text-base text-foreground">Body text</p>
    <p class="text-sm text-muted-foreground">Small text</p>
    <p class="text-xs text-muted-foreground">Extra small text</p>
  </div>
</template>
```

---

## 📱 Responsive Design with Breakpoints

Based on [Tailwind's responsive design docs](https://tailwindcss.com/docs/responsive-design):

```vue
<template>
  <!-- Mobile-first responsive design -->
  <div class="p-4 sm:p-6 md:p-8 lg:p-12">
    <!-- Padding grows on larger screens -->
  </div>

  <!-- Responsive grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <!-- 1 column on mobile, 2 on tablet, 3 on desktop, 4 on large screens -->
    <Card>...</Card>
    <Card>...</Card>
    <Card>...</Card>
  </div>

  <!-- Responsive text -->
  <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Responsive heading</h1>

  <!-- Hide on mobile, show on desktop -->
  <div class="hidden lg:block">Desktop only content</div>

  <!-- Show on mobile, hide on desktop -->
  <div class="block lg:hidden">Mobile only content</div>
</template>
```

### Breakpoints Reference

| Breakpoint     | Width   | Tailwind Prefix |
| -------------- | ------- | --------------- |
| Small          | ≥640px  | `sm:`           |
| Medium         | ≥768px  | `md:`           |
| Large          | ≥1024px | `lg:`           |
| Extra Large    | ≥1280px | `xl:`           |
| 2X Extra Large | ≥1536px | `2xl:`          |

---

## 🎭 Real-World Component Examples

### Dashboard Card with Mixed Tokens

```vue
<script setup lang="ts">
const stats = [
  { label: 'Views', value: '12.5k', change: '+12%', color: 'blue' },
  { label: 'Clicks', value: '3.2k', change: '+8%', color: 'purple' },
  { label: 'Conversions', value: '890', change: '+23%', color: 'emerald' },
]
</script>

<template>
  <Card class="bg-card border-border">
    <h2 class="text-xl font-semibold text-foreground mb-6">Analytics Overview</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="p-4 rounded-lg"
        :class="`bg-${stat.color}-50 dark:bg-${stat.color}-950/20`"
      >
        <p class="text-sm text-muted-foreground">{{ stat.label }}</p>
        <p class="text-2xl font-bold" :class="`text-${stat.color}-700 dark:text-${stat.color}-400`">
          {{ stat.value }}
        </p>
        <p class="text-sm" :class="`text-${stat.color}-600 dark:text-${stat.color}-500`">
          {{ stat.change }}
        </p>
      </div>
    </div>
  </Card>
</template>
```

### Alert Component with Status Colors

```vue
<script setup lang="ts">
const alertVariants = {
  info: {
    bg: 'bg-blue-50 dark:bg-blue-950/20',
    border: 'border-blue-500',
    text: 'text-blue-700 dark:text-blue-400',
    icon: 'ℹ',
  },
  success: {
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    border: 'border-emerald-500',
    text: 'text-emerald-700 dark:text-emerald-400',
    icon: '✓',
  },
  warning: {
    bg: 'bg-amber-50 dark:bg-amber-950/20',
    border: 'border-amber-500',
    text: 'text-amber-700 dark:text-amber-400',
    icon: '⚠',
  },
  error: {
    bg: 'bg-red-50 dark:bg-red-950/20',
    border: 'border-red-500',
    text: 'text-red-700 dark:text-red-400',
    icon: '✗',
  },
}

const props = defineProps<{
  variant: keyof typeof alertVariants
  message: string
}>()
</script>

<template>
  <div
    class="p-4 border-l-4 rounded-lg"
    :class="[alertVariants[variant].bg, alertVariants[variant].border]"
  >
    <p :class="alertVariants[variant].text">
      <span class="font-bold mr-2">{{ alertVariants[variant].icon }}</span>
      {{ message }}
    </p>
  </div>
</template>
```

---

## 🔥 Pro Tips

### 1. Use Opacity Modifiers

```vue
<!-- Add transparency to any color -->
<div class="bg-blue-500/50">50% opacity blue</div>
<div class="bg-blue-500/75">75% opacity blue</div>
<div class="bg-primary/90">90% opacity primary</div>
```

### 2. Arbitrary Values

```vue
<!-- Use custom values when needed -->
<div class="bg-[oklch(0.5_0.2_280)]">Custom OKLCH color</div>
<div class="p-[17px]">Custom padding</div>
```

### 3. Group Hover States

```vue
<div class="group">
  <button class="bg-primary">
    Hover parent
  </button>
  <!-- This changes when parent is hovered -->
  <span class="text-muted-foreground group-hover:text-foreground">
    I change on parent hover
  </span>
</div>
```

### 4. Data Attribute Styling (Ark UI)

```vue
<!-- Style based on Ark UI data attributes -->
<Select.Item class="data-[highlighted]:bg-accent data-[state=checked]:text-primary">
  Option
</Select.Item>
```

---

## 📖 Further Reading

- **Tailwind Colors**: https://tailwindcss.com/docs/colors
- **Tailwind Theme**: https://tailwindcss.com/docs/theme
- **Custom Styles**: https://tailwindcss.com/docs/adding-custom-styles
- **Functions & Directives**: https://tailwindcss.com/docs/functions-and-directives
- **Responsive Design**: https://tailwindcss.com/docs/responsive-design
- **Dark Mode**: https://tailwindcss.com/docs/dark-mode
- **Radix Colors**: https://www.radix-ui.com/colors

---

## 🎯 Decision Framework

### When to use Semantic Tokens?

✅ Components that should adapt to theme  
✅ Text and backgrounds  
✅ Borders and dividers  
✅ Interactive elements (buttons, inputs)

### When to use Tailwind Color Scales?

✅ Data visualization (charts, graphs)  
✅ Status indicators with specific meanings  
✅ Marketing/landing pages with brand colors  
✅ Decorative elements  
✅ Color pickers or swatches

### When to use Both?

✅ Dashboard components (semantic structure + colored data)  
✅ Complex UIs (semantic base + accent colors)  
✅ Themed experiences (semantic for consistency + scale for variety)

---

## 🚀 Next Steps

1. **Explore the color palette** in your app
2. **Try different Tailwind colors** for data visualization
3. **Build a color switcher** to change accent colors
4. **Create custom variants** for your components
5. **Experiment with responsive design** using breakpoints

**Happy theming!** 🎨
