# Theming Guide

This project uses [shadcn/ui's theming conventions](https://ui.shadcn.com/docs/theming) with CSS variables and the oklch color format.

## How It Works

### CSS Variables

All colors are defined as CSS variables in `src/assets/base.css` using the oklch color format. These variables automatically adapt to light and dark modes.

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... */
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

### Tailwind Integration

The CSS variables are mapped to Tailwind classes in `tailwind.config.ts`:

```ts
colors: {
  background: 'hsl(var(--background))',
  foreground: 'hsl(var(--foreground))',
  primary: {
    DEFAULT: 'hsl(var(--primary))',
    foreground: 'hsl(var(--primary-foreground))',
  },
  // ...
}
```

## Color System

### Convention

We follow the **background/foreground** convention:

- `background` is for the background color
- `foreground` is for the text color on that background

Example:

```vue
<div class="bg-primary text-primary-foreground">
  This text will always be readable on the primary background
</div>
```

### Available Colors

| Color                                    | Usage                        | Example                                      |
| ---------------------------------------- | ---------------------------- | -------------------------------------------- |
| `background` / `foreground`              | Main app background and text | `bg-background text-foreground`              |
| `primary` / `primary-foreground`         | Primary actions, buttons     | `bg-primary text-primary-foreground`         |
| `secondary` / `secondary-foreground`     | Secondary actions            | `bg-secondary text-secondary-foreground`     |
| `muted` / `muted-foreground`             | Muted text, disabled states  | `bg-muted text-muted-foreground`             |
| `accent` / `accent-foreground`           | Highlighted elements         | `bg-accent text-accent-foreground`           |
| `destructive` / `destructive-foreground` | Danger, errors, delete       | `bg-destructive text-destructive-foreground` |
| `card` / `card-foreground`               | Card backgrounds             | `bg-card text-card-foreground`               |
| `popover` / `popover-foreground`         | Popover backgrounds          | `bg-popover text-popover-foreground`         |
| `border`                                 | Borders                      | `border-border`                              |
| `input`                                  | Input borders                | `border-input`                               |
| `ring`                                   | Focus rings                  | `ring-ring`                                  |

### Sidebar Colors

Special colors for the sidebar component:

| Color                | Usage                    |
| -------------------- | ------------------------ |
| `sidebar`            | Sidebar background       |
| `sidebar-foreground` | Sidebar text             |
| `sidebar-primary`    | Sidebar primary elements |
| `sidebar-accent`     | Sidebar hover states     |
| `sidebar-border`     | Sidebar borders          |

### Chart Colors

Five chart colors for data visualization:

```vue
<div class="bg-chart-1">Chart 1</div>
<div class="bg-chart-2">Chart 2</div>
<!-- chart-3, chart-4, chart-5 -->
```

## Usage Examples

### Cards

```vue
<div class="rounded-lg border bg-card p-6 text-card-foreground shadow-sm">
  <h2 class="font-semibold">Card Title</h2>
  <p class="text-muted-foreground">Card description</p>
</div>
```

### Buttons

```vue
<!-- Primary button -->
<button class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2">
  Primary
</button>

<!-- Secondary button -->
<button class="bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2">
  Secondary
</button>

<!-- Destructive button -->
<button
  class="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md px-4 py-2"
>
  Delete
</button>
```

### Muted Text

```vue
<p class="text-sm text-muted-foreground">
  This text is muted and less prominent
</p>
```

### Borders

```vue
<div class="border border-border rounded-lg">
  Bordered container
</div>
```

### Focus States

```vue
<input class="border-input focus-visible:ring-2 focus-visible:ring-ring" type="text" />
```

## Customizing Colors

### Method 1: Edit CSS Variables

Modify the values in `src/assets/base.css`:

```css
:root {
  --primary: oklch(0.488 0.243 264.376); /* Change this */
  --primary-foreground: oklch(0.985 0 0);
}
```

### Method 2: Use Different Base Colors

shadcn/ui provides different base color options:

- Neutral (default)
- Stone
- Zinc
- Gray
- Slate

You can find the color values in the [shadcn theming docs](https://ui.shadcn.com/docs/theming) and copy them to your `base.css`.

### Border Radius

Customize the default border radius:

```css
:root {
  --radius: 0.5rem; /* Adjust this value */
}
```

This affects:

- `rounded-lg` → `var(--radius)`
- `rounded-md` → `calc(var(--radius) - 2px)`
- `rounded-sm` → `calc(var(--radius) - 4px)`

## Dark Mode

Dark mode is automatically supported! The `.dark` class switches all colors:

```css
.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
}
```

To enable dark mode, add the `dark` class to the `<html>` element:

```js
// Add to your app
document.documentElement.classList.add('dark')
```

Or use a dark mode toggle component.

## Understanding oklch()

The `oklch()` color format provides:

- **Better perceptual uniformity** - colors look more consistent
- **Wider color gamut** - access to more vibrant colors
- **Better color manipulation** - easier to adjust lightness/chroma

Format: `oklch(lightness chroma hue / alpha)`

Example:

```css
oklch(0.5 0.2 180) /* Medium teal */
oklch(0.9 0.1 30)  /* Light warm color */
```

## Resources

- [shadcn/ui Theming Docs](https://ui.shadcn.com/docs/theming)
- [oklch Color Picker](https://oklch.com/)
- [CSS oklch() Documentation](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch)

## Tips

1. **Always use foreground colors** - Every background color has a matching foreground color for proper contrast
2. **Use opacity for hover states** - `hover:bg-primary/90` works great
3. **Muted for secondary text** - Use `text-muted-foreground` for descriptions
4. **Border for dividers** - Use `border-border` for consistent borders
5. **Card for elevated content** - Use `bg-card` for content cards
