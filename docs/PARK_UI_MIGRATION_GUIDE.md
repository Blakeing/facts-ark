# Park UI Design System Migration Guide

This guide explains how to adopt Park UI's design cohesion **without migrating to Panda CSS**.

## The Strategy

Instead of switching to Panda CSS, we're **porting Park UI's design decisions** to Tailwind:

1. ✅ Use their color palette (Radix Colors)
2. ✅ Match their spacing/sizing scale
3. ✅ Replicate their component variants
4. ✅ Follow their design patterns
5. ✅ Keep your Tailwind setup

## Step 1: Update Design Tokens

### Option A: Use New Config (Recommended for Consistency)

```bash
# Rename the Park UI-inspired config
mv tailwind.config.park.ts tailwind.config.ts

# Update your base.css imports
```

Then in `src/assets/main.css`:

```css
@import './park-ui-tokens.css';
```

### Option B: Merge into Existing Config

Copy the color system and radius from `tailwind.config.park.ts` into your existing `tailwind.config.ts`.

## Step 2: Update Component Variants

Reference Park UI's component pages and update your variant files. Here's the pattern:

### Example: Button Component

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

## Step 3: Component-by-Component Updates

For each component, follow this process:

1. **Visit Park UI's component page**: [park-ui.com/docs/components/button](https://park-ui.com/docs/components/button)
2. **Study their variants**: Look at solid, outline, ghost, etc.
3. **Note spacing/sizes**: xs, sm, md, lg, xl
4. **Update your `.variants.ts` file**: Match their design decisions
5. **Test in Storybook**: Verify visual consistency

### Components to Update (Priority Order):

#### High Priority (Core components):

- [ ] Button
- [ ] Input
- [ ] Card
- [ ] Badge
- [ ] Dialog

#### Medium Priority:

- [ ] Select
- [ ] Checkbox
- [ ] Switch
- [ ] Tabs
- [ ] Accordion

#### Lower Priority:

- [ ] Avatar
- [ ] Progress
- [ ] Tooltip
- [ ] All others

## Step 4: Theming System

Park UI lets you choose accent colors. We've set up the same system:

### Change Your Accent Color

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

## Step 5: Reference Park UI's Patterns

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

## Benefits of This Approach

✅ **Keep Tailwind** - No migration needed  
✅ **Park UI Design** - Same visual consistency  
✅ **Your Architecture** - Keep your component structure  
✅ **Type Safety** - Keep using `tailwind-variants`  
✅ **Ecosystem** - Keep Tailwind's massive ecosystem  
✅ **Incremental** - Update components one at a time

## Color Palette Reference

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

## Next Steps

1. **Choose an accent color** in `park-ui-tokens.css`
2. **Update Button component** first (most visible)
3. **Update one component per session**
4. **Test in Storybook** after each update
5. **Document your changes** in component `.stories.ts` files

## Resources

- [Park UI Components](https://park-ui.com/docs/components)
- [Radix Colors](https://www.radix-ui.com/colors)
- [tailwind-variants Docs](https://www.tailwind-variants.org/)

---

**Remember**: You're not migrating to Panda CSS. You're adopting Park UI's **design decisions** using Tailwind CSS. This gives you the cohesion without the migration cost.
