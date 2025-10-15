# Styling Philosophy: Ark-First Approach

## 🎯 Core Principle

**Let Ark UI do what it does best. Add Tailwind only for essential visual polish.**

We've shifted from a 70/30 (Tailwind/Ark) approach to a **90/10 (Ark/Tailwind)** approach.

## Why This Matters

Ark UI provides:
- ✅ Built-in accessibility
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ State management via data attributes
- ✅ Proper ARIA attributes
- ✅ Browser-native behavior

When we override these with custom Tailwind styles, we risk:
- ❌ Breaking accessibility
- ❌ Inconsistent behavior
- ❌ More maintenance burden
- ❌ Fighting the framework

## What We Removed

### ❌ Removed Custom Styles

**Focus Styles:**
```css
/* REMOVED - Let browser/Ark handle it */
focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600
focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
data-[focus]:ring-2 data-[focus]:ring-indigo-500 data-[focus]:ring-offset-2
```

**Animations & Transitions:**
```css
/* REMOVED - No unnecessary animations */
transition-colors duration-200
transition-transform data-[state=open]:rotate-180
data-[state=open]:animate-in data-[state=closed]:animate-out
fade-out-0 fade-in-0 zoom-out-95 zoom-in-95
```

**Complex Outline Systems:**
```css
/* REMOVED - Simple borders instead */
outline-1 -outline-offset-1 outline-gray-300
ring-1 ring-black/5
appearance-none
```

**Redundant State Styling:**
```css
/* REMOVED - Ark handles this */
data-[invalid]:outline-red-600
data-[placeholder-shown]:text-gray-500
data-[state=checked]:font-semibold
```

## What We Kept

### ✅ Essential Styles Only

**Layout & Structure:**
```css
/* Keep - Basic positioning */
relative, absolute, flex, items-center, gap-2
w-full, h-full, size-5
px-3, py-2, rounded-md
```

**Minimal Visual Polish:**
```css
/* Keep - Simple borders and colors */
border border-gray-300
bg-white, text-gray-900
shadow-sm, shadow-lg
```

**Ark UI Data Attributes:**
```css
/* Keep - State management */
data-[highlighted]:bg-indigo-600
data-[disabled]:opacity-50
data-[state=checked]:bg-indigo-600
```

## Component-by-Component Approach

### Interactive Components (Ark-Heavy)

**Select, Checkbox, Switch, Tabs**
- 90% Ark UI - Structure, behavior, states
- 10% Tailwind - Borders, colors, spacing

```typescript
// Minimal styling
control: 'rounded border border-gray-300 bg-white data-[disabled]:opacity-50'
```

### Presentational Components (Tailwind-Heavy)

**Button, Badge, Avatar, Card**
- 70% Tailwind - Visual design
- 30% Ark UI - Basic structure (if applicable)

```typescript
// More custom styling is OK
button: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-sm'
```

## Guidelines

### 1. Start with Ark UI Defaults

```vue
<!-- Start here -->
<Select.Root>
  <Select.Trigger>
    <!-- Ark handles focus, keyboard, ARIA -->
  </Select.Trigger>
</Select.Root>
```

### 2. Add Only Essential Tailwind

```typescript
// Just borders, colors, spacing
trigger: 'rounded-md border border-gray-300 bg-white px-3 py-2'
```

### 3. Use Ark's Data Attributes

```typescript
// Let Ark manage state
trigger: 'data-[highlighted]:bg-indigo-600 data-[disabled]:opacity-50'
```

### 4. Avoid Custom Focus/Transitions

```typescript
// ❌ Don't do this
trigger: 'focus:ring-2 focus:ring-indigo-500 transition-all duration-200'

// ✅ Do this instead
trigger: 'border border-gray-300' // Browser handles focus
```

## Benefits of This Approach

### ✅ Better Accessibility
- Native browser focus indicators
- Proper keyboard navigation
- Screen reader compatibility

### ✅ Less Code
- Fewer custom styles to maintain
- Smaller bundle size
- Cleaner component files

### ✅ More Consistent
- Behavior matches user expectations
- Works across browsers
- Follows web standards

### ✅ Easier to Update
- Ark UI updates "just work"
- Less custom code to migrate
- Fewer breaking changes

## When to Add Custom Styles

### ✅ Do Add Styles For:

1. **Layout & Spacing**
   ```css
   flex, gap-2, px-3, py-2, rounded-md
   ```

2. **Colors & Borders**
   ```css
   bg-white, text-gray-900, border border-gray-300
   ```

3. **Ark Data Attributes**
   ```css
   data-[highlighted]:bg-indigo-600
   data-[disabled]:opacity-50
   ```

4. **Presentational Components**
   ```css
   /* Buttons, badges, cards can be more styled */
   bg-indigo-600 hover:bg-indigo-500 shadow-sm
   ```

### ❌ Don't Add Styles For:

1. **Focus Management**
   - Let browser/Ark handle it

2. **Animations**
   - Keep it simple, no transitions

3. **Complex Outlines/Rings**
   - Use simple borders instead

4. **State Overrides**
   - Trust Ark's data attributes

## Migration Guide

If you have existing components with heavy Tailwind styling:

1. **Remove focus styles** - Let Ark/browser handle it
2. **Remove transitions** - Keep it simple
3. **Simplify borders** - Use `border border-gray-300` instead of outline systems
4. **Trust data attributes** - Use `data-[state]` instead of custom classes
5. **Test accessibility** - Verify keyboard nav and screen readers still work

## Examples

### Before (Too Much Tailwind)

```typescript
trigger: `
  relative w-full cursor-pointer appearance-none rounded-md bg-white pr-8 
  text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 
  focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 
  transition-colors duration-200
  data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 
  data-[invalid]:outline-red-600 data-[placeholder-shown]:text-gray-500
`
```

### After (Ark-First)

```typescript
trigger: `
  w-full cursor-pointer rounded-md bg-white px-3 py-2 
  border border-gray-300 text-gray-900
  data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50
`
```

## Summary

**Old Philosophy:** 70% Tailwind UI aesthetics / 30% Ark UI behavior  
**New Philosophy:** 90% Ark UI behavior / 10% Tailwind polish

This gives us:
- Better accessibility
- Less code
- More maintainable
- Follows web standards
- Respects the framework

**Remember:** Ark UI is the foundation. Tailwind is the paint.
