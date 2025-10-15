# Quick Start: Park UI Styling System

## 🎯 You Were Right!

Building a cohesive design IS the hard part. Here's how to get Park UI's design cohesion while keeping Tailwind.

## ⚡ Quick Start (5 Minutes)

### Step 1: Switch to Park UI Config

```bash
# Backup current config
mv tailwind.config.ts tailwind.config.old.ts

# Use new Park UI-inspired config
mv tailwind.config.park.ts tailwind.config.ts
```

### Step 2: Update Your CSS Imports

Edit `src/assets/main.css`:

```css
@import './base.css';
@import './park-ui-tokens.css'; /* ADD THIS LINE */
```

### Step 3: Choose Your Brand Color

Edit `src/assets/park-ui-tokens.css` (line 28-42):

```css
/* Uncomment your preferred color: */
--primary: 221.2 83.2% 53.3%; /* Indigo (default) */
/* --primary: 217.2 91.2% 59.8%; */ /* Blue */
/* --primary: 262.1 83.3% 57.8%; */ /* Violet */
/* --primary: 142.1 76.2% 36.3%; */ /* Green */
```

### Step 4: Test It

```bash
pnpm storybook
```

Navigate to `UI/Button` and see your new Park UI-inspired button variants!

## 🎨 What You Just Got

✅ **Button component** - Updated with Park UI variants (solid, outline, ghost, link, destructive)  
✅ **5 sizes** - xs, sm, md, lg, xl (was only 3)  
✅ **Semantic tokens** - professional color system  
✅ **Focus states** - proper accessibility  
✅ **Design system** - ready to scale

## 📋 Next: Update More Components

Follow this pattern for each component:

### 1. Visit Park UI

`https://park-ui.com/docs/components/[component-name]`

### 2. Look at Their Variants

Study their design decisions (variants, sizes, spacing)

### 3. Update Your `.variants.ts`

Port their design to Tailwind classes using semantic tokens

### 4. Use Semantic Tokens

**Instead of:**

```typescript
'bg-indigo-600 text-white'
```

**Use:**

```typescript
'bg-primary text-primary-foreground'
```

### 5. Test in Storybook

Verify visual consistency

## 🎓 Example: Updating Input Component

```typescript
// src/components/ui/input/input.variants.ts
import { tv } from 'tailwind-variants'

export const inputVariants = tv({
  base: [
    'flex h-10 w-full rounded-md border border-input',
    'bg-background px-3 py-2',
    'text-sm text-foreground',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-muted-foreground',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  variants: {
    size: {
      sm: 'h-9 px-2 text-xs',
      md: 'h-10 px-3 text-sm',
      lg: 'h-11 px-4 text-base',
    },
    variant: {
      default: '',
      error: 'border-destructive focus-visible:ring-destructive',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'default',
  },
})
```

## 🔑 Key Semantic Tokens

| Token         | Usage                     | Example                  |
| ------------- | ------------------------- | ------------------------ |
| `primary`     | Brand color, main actions | Buttons, links           |
| `secondary`   | Alternative actions       | Secondary buttons        |
| `destructive` | Danger/delete actions     | Delete buttons, errors   |
| `muted`       | Subtle backgrounds        | Disabled states, hints   |
| `accent`      | Hover states              | Button hover, menu hover |
| `border`      | All borders               | Cards, inputs, dividers  |
| `input`       | Input borders             | Form fields              |
| `ring`        | Focus indicators          | Focus rings              |

## 📚 Documentation

- **Full Guide**: `docs/PARK_UI_MIGRATION_GUIDE.md`
- **Summary**: `docs/PARK_UI_INTEGRATION_SUMMARY.md`
- **Park UI Site**: https://park-ui.com/docs/components

## 🚀 Recommended Update Order

### Week 1 (Core)

- [x] Button ← Done!
- [ ] Input
- [ ] Card

### Week 2 (Forms)

- [ ] Select
- [ ] Checkbox
- [ ] Switch
- [ ] Textarea

### Week 3 (Layout)

- [ ] Dialog
- [ ] Popover
- [ ] Tabs
- [ ] Accordion

### Week 4+ (Rest)

- [ ] All remaining components

## 💡 Pro Tips

1. **One component at a time** - Don't rush, ensure quality
2. **Test in Storybook** - Visual verification is key
3. **Keep old variants temporarily** - Deprecate gradually
4. **Use semantic tokens everywhere** - Enables easy theming
5. **Reference Park UI docs** - They've done the hard design work

## ❓ FAQ

**Q: Do my old button variants still work?**  
A: No, you'll need to update `variant="primary"` to `variant="solid"` in your code.

**Q: Can I keep both old and new configs?**  
A: Yes! Keep `tailwind.config.old.ts` for reference during migration.

**Q: Will this break my existing components?**  
A: Only Button is updated. Other components work as before until you update them.

**Q: How long will full migration take?**  
A: Depends on pace. ~1 hour per component. With 26 components, could take 4-6 weeks working incrementally.

## 🎉 You're Ready!

You now have Park UI's design cohesion without leaving Tailwind. Start by testing the Button component in Storybook, then update one component per session.

**Happy coding! 🐼✨**
