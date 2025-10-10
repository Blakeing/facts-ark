/**
 * Button component - variant definitions
 *
 * Design inspired by Park UI's button component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Button variants matching Park UI's design system
 *
 * Variants:
 * - solid: Default filled button (was "primary")
 * - outline: Button with border
 * - ghost: Transparent with hover state
 * - link: Text-only with underline
 * - destructive: For dangerous actions
 */
export const buttonVariants = tv({
  base: [
    // Layout & Spacing
    'inline-flex items-center justify-center gap-2',

    // Typography
    'font-semibold',

    // Visual
    'rounded-md',

    // Animations & Transitions (using new design system)
    'transition-colors-smooth',
    'active:scale-[0.98]',

    // Focus states (using new focus-ring system)
    'focus-ring',

    // Disabled state
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  variants: {
    variant: {
      // Primary/Solid - default filled button
      solid: ['bg-primary text-primary-foreground', 'hover:bg-primary/90', 'shadow-sm'],

      // Outline - border with transparent background
      outline: [
        'border border-input bg-background',
        'hover:bg-accent hover:text-accent-foreground',
      ],

      // Ghost - transparent with subtle hover
      ghost: ['hover:bg-accent hover:text-accent-foreground'],

      // Link - text only
      link: ['text-primary underline-offset-4 hover:underline'],

      // Destructive - for dangerous actions
      destructive: [
        'bg-destructive text-destructive-foreground',
        'hover:bg-destructive/90',
        'shadow-sm',
      ],

      // Secondary - subtle filled button
      secondary: ['bg-secondary text-secondary-foreground', 'hover:bg-secondary/80', 'shadow-sm'],
    },
    size: {
      xs: 'h-8 px-3 text-xs',
      sm: 'h-9 px-4 text-sm',
      md: 'h-10 px-5 text-sm',
      lg: 'h-11 px-6 text-base',
      xl: 'h-12 px-8 text-base',
    },
    fullWidth: {
      true: 'w-full',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    fullWidth: false,
  },
})
