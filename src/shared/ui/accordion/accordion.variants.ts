/**
 * Accordion component - variant definitions
 *
 * Design inspired by Park UI's accordion component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Accordion variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Multiple visual styles
 * - Smooth animations
 * - Disabled state support
 */
export const accordionVariants = tv({
  slots: {
    root: '',
    item: '',
    // Common trigger styles shared by all variants
    trigger: [
      'group flex w-full items-center justify-between py-4',
      'text-left text-sm font-medium text-foreground',
      'hover:text-primary',
      'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
      'transition-colors',
    ],
    // Common icon styles shared by all variants
    triggerIcon: 'mr-3 text-muted-foreground group-hover:text-primary transition-colors',
    // Common indicator styles shared by all variants
    indicator: [
      'ml-2 h-5 w-5 text-muted-foreground',
      'transition-transform duration-200',
      'data-[state=open]:rotate-90',
    ],
    // Common content styles shared by all variants
    content: [
      'overflow-hidden text-sm text-muted-foreground',
      'data-[state=closed]:animate-accordion-up',
      'data-[state=open]:animate-accordion-down',
      'pb-4',
    ],
  },
  variants: {
    variant: {
      default: {
        root: 'w-full divide-y divide-border',
        // item has no unique styles for default
      },
      bordered: {
        root: 'w-full divide-y divide-border rounded-lg border border-border',
        item: 'px-4 first:pt-0',
      },
      separated: {
        root: 'w-full space-y-2',
        item: 'rounded-lg border border-border px-4',
      },
      contained: {
        root: 'w-full space-y-2',
        item: 'rounded-lg bg-muted px-4',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
