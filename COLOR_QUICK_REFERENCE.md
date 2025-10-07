# 🎨 Color Quick Reference Card

Quick copy-paste reference for your theming system.

## Semantic Tokens (Use These First!)

### Layout

```
bg-background          Main page background
bg-card                Card/panel background
bg-popover             Popover background
bg-muted               Subtle background
bg-accent              Accent background
```

### Text

```
text-foreground        Primary text
text-card-foreground   Card text
text-muted-foreground  Secondary text
text-primary-foreground Primary button text
```

### Interactive

```
bg-primary             Primary button/action
bg-secondary           Secondary button
bg-destructive         Delete/danger button
border-border          All borders
ring-ring              Focus rings
```

### Status

```
bg-success / text-success       Green (success)
bg-warning / text-warning       Amber (warning)
bg-info / text-info             Blue (info)
bg-destructive / text-destructive  Red (error)
```

---

## Tailwind Color Scales

### Neutrals (Text & Backgrounds)

```
slate-50 to slate-950    Cool gray (recommended)
gray-50 to gray-950      True gray
zinc-50 to zinc-950      Cooler gray
```

### Primary/Brand Colors

```
blue-50 to blue-950      Bright blue (trust, tech)
indigo-50 to indigo-950  Blue-purple (current primary)
violet-50 to violet-950  Purple-blue (creative)
purple-50 to purple-950  Vivid purple (luxury)
```

### Status Colors

```
emerald-50 to emerald-950  Success/positive
red-50 to red-950          Error/danger
amber-50 to amber-950      Warning/caution
teal-50 to teal-950        Info/accent
```

---

## Common Patterns

### Card

```vue
<Card class="bg-card border-border">
  <h2 class="text-foreground">Title</h2>
  <p class="text-muted-foreground">Description</p>
</Card>
```

### Button (Semantic)

```vue
<button class="bg-primary text-primary-foreground hover:bg-primary/90">
  Click Me
</button>
```

### Button (Tailwind)

```vue
<button class="bg-blue-600 text-white hover:bg-blue-700">
  Blue Button
</button>
```

### Status Badge

```vue
<span class="bg-emerald-100 text-emerald-700 px-2 py-1 rounded">
  Active
</span>
```

### Alert

```vue
<div class="bg-red-50 border-l-4 border-red-500 p-4">
  <p class="text-red-700">Error message</p>
</div>
```

### Gradient

```vue
<div class="bg-gradient-to-r from-blue-500 to-purple-500">
  Gradient
</div>
```

---

## Opacity Modifiers

```
bg-blue-500/50      50% opacity
bg-blue-500/75      75% opacity
bg-primary/90       90% opacity primary
```

---

## Dark Mode

```vue
<!-- Manual override -->
<div class="bg-slate-100 dark:bg-slate-800">
  Adapts to dark mode
</div>

<!-- Semantic (auto-adapts) -->
<div class="bg-card">
  Auto dark mode
</div>
```

---

## Responsive

```
sm:   ≥640px   (mobile landscape)
md:   ≥768px   (tablet)
lg:   ≥1024px  (desktop)
xl:   ≥1280px  (large desktop)
2xl:  ≥1536px  (extra large)
```

```vue
<div class="p-4 sm:p-6 md:p-8 lg:p-12">
  Responsive padding
</div>
```

---

## Spacing Scale

```
0     0
px    1px
0.5   0.125rem (2px)
1     0.25rem  (4px)
2     0.5rem   (8px)
3     0.75rem  (12px)
4     1rem     (16px)  ← Common
5     1.25rem  (20px)
6     1.5rem   (24px)
8     2rem     (32px)
10    2.5rem   (40px)
12    3rem     (48px)
16    4rem     (64px)
20    5rem     (80px)
24    6rem     (96px)
```

---

## Border Radius

```
rounded-none   0
rounded-sm     Small
rounded-md     Medium  ← Common
rounded-lg     Large
rounded-xl     Extra large
rounded-full   Circular
```

---

## Font Sizes

```
text-xs    0.75rem  (12px)
text-sm    0.875rem (14px)
text-base  1rem     (16px)  ← Body
text-lg    1.125rem (18px)
text-xl    1.25rem  (20px)  ← H4
text-2xl   1.5rem   (24px)  ← H3
text-3xl   1.875rem (30px)  ← H2
text-4xl   2.25rem  (36px)  ← H1
```

---

## Data Attributes (Ark UI)

```vue
<!-- Highlighted state -->
data-[highlighted]:bg-accent

<!-- Checked state -->
data-[state=checked]:text-primary

<!-- Open/closed -->
data-[state=open]:rotate-90

<!-- Disabled -->
data-[disabled]:opacity-50
```

---

## Pro Tips

1. **Start with semantic tokens** for consistency
2. **Use Tailwind colors** for data viz and specific needs
3. **Always test dark mode** with toggle
4. **Use shade scale** for hover states (500→600→700)
5. **Opacity** for overlays (/50, /75, /90)
6. **Group hover** for interactive cards
7. **Responsive** mobile-first (base → sm → md → lg)

---

## Quick Copy-Paste Components

### Primary Button

```vue
<button class="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md">
  Button
</button>
```

### Input

```vue
<input
  class="bg-background border-border text-foreground px-3 py-2 rounded-md focus:ring-2 focus:ring-ring"
/>
```

### Card

```vue
<div class="bg-card border-border p-6 rounded-lg shadow-sm">
  <h3 class="text-foreground font-semibold">Title</h3>
  <p class="text-muted-foreground mt-2">Content</p>
</div>
```

### Badge

```vue
<span class="bg-primary/10 text-primary px-2 py-1 text-sm rounded-full">
  Badge
</span>
```

---

**Bookmark this page for quick reference!** 🔖
