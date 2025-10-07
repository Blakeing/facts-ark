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
    root: 'w-full',
    item: '',
    trigger: '',
    triggerIcon: '',
    indicator: '',
    content: '',
  },
  variants: {
    variant: {
      default: {
        root: 'divide-y divide-border',
        item: '',
        trigger: [
          'group flex w-full items-center justify-between py-4',
          'text-left text-sm font-medium text-foreground',
          'hover:text-primary',
          'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
          'transition-colors',
        ],
        triggerIcon: 'mr-3 text-muted-foreground group-hover:text-primary transition-colors',
        indicator: [
          'ml-2 h-5 w-5 text-muted-foreground',
          'transition-transform duration-200',
          'data-[state=open]:rotate-90',
        ],
        content: [
          'overflow-hidden text-sm text-muted-foreground',
          'data-[state=closed]:animate-accordion-up',
          'data-[state=open]:animate-accordion-down',
          'pb-4',
        ],
      },
      bordered: {
        root: 'divide-y divide-border rounded-lg border border-border',
        item: 'px-4 first:pt-0',
        trigger: [
          'group flex w-full items-center justify-between py-4',
          'text-left text-sm font-medium text-foreground',
          'hover:text-primary',
          'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
          'transition-colors',
        ],
        triggerIcon: 'mr-3 text-muted-foreground group-hover:text-primary transition-colors',
        indicator: [
          'ml-2 h-5 w-5 text-muted-foreground',
          'transition-transform duration-200',
          'data-[state=open]:rotate-90',
        ],
        content: [
          'overflow-hidden text-sm text-muted-foreground',
          'data-[state=closed]:animate-accordion-up',
          'data-[state=open]:animate-accordion-down',
          'pb-4',
        ],
      },
      separated: {
        root: 'space-y-2',
        item: 'rounded-lg border border-border px-4',
        trigger: [
          'group flex w-full items-center justify-between py-4',
          'text-left text-sm font-medium text-foreground',
          'hover:text-primary',
          'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
          'transition-colors',
        ],
        triggerIcon: 'mr-3 text-muted-foreground group-hover:text-primary transition-colors',
        indicator: [
          'ml-2 h-5 w-5 text-muted-foreground',
          'transition-transform duration-200',
          'data-[state=open]:rotate-90',
        ],
        content: [
          'overflow-hidden text-sm text-muted-foreground',
          'data-[state=closed]:animate-accordion-up',
          'data-[state=open]:animate-accordion-down',
          'pb-4',
        ],
      },
      contained: {
        root: 'space-y-2',
        item: 'rounded-lg bg-muted px-4',
        trigger: [
          'group flex w-full items-center justify-between py-4',
          'text-left text-sm font-medium text-foreground',
          'hover:text-primary',
          'data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
          'transition-colors',
        ],
        triggerIcon: 'mr-3 text-muted-foreground group-hover:text-primary transition-colors',
        indicator: [
          'ml-2 h-5 w-5 text-muted-foreground',
          'transition-transform duration-200',
          'data-[state=open]:rotate-90',
        ],
        content: [
          'overflow-hidden text-sm text-muted-foreground',
          'data-[state=closed]:animate-accordion-up',
          'data-[state=open]:animate-accordion-down',
          'pb-4',
        ],
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
