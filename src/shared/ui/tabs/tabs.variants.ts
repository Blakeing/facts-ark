/**
 * Tabs component - variant definitions
 *
 * Design inspired by Park UI's tabs component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Tabs variants matching Park UI's design system
 *
 * Features:
 * - Semantic color tokens throughout
 * - Multiple visual styles (line, pills, enclosed, bar)
 * - Proper selected states
 * - Smooth transitions
 */
export const tabsVariants = tv({
  slots: {
    root: '',
    mobileWrapper: 'grid grid-cols-1 sm:hidden',
    desktopWrapper: 'hidden sm:block',
    list: '',
    trigger: '',
    triggerIcon: '',
    content: 'pt-4 text-foreground',
    indicator: '',
  },
  variants: {
    variant: {
      line: {
        list: 'border-b border-border flex space-x-8',
        trigger: [
          'group inline-flex items-center border-b-2 px-1 py-4',
          'text-sm font-medium',
          'border-transparent text-muted-foreground',
          'hover:border-border hover:text-foreground',
          'data-[selected]:border-primary data-[selected]:text-primary',
          'transition-colors',
        ],
        triggerIcon: [
          'text-muted-foreground',
          'group-hover:text-foreground',
          'group-data-[selected]:text-primary',
          'transition-colors',
        ],
        indicator: 'absolute inset-x-0 bottom-0 h-0.5 bg-primary',
      },
      pills: {
        list: 'flex space-x-4',
        trigger: [
          'group rounded-md px-3 py-2',
          'text-sm font-medium',
          'text-muted-foreground hover:text-foreground',
          'data-[selected]:bg-secondary data-[selected]:text-secondary-foreground',
          'transition-colors',
        ],
        triggerIcon: [
          'text-muted-foreground',
          'group-hover:text-foreground',
          'group-data-[selected]:text-secondary-foreground',
          'transition-colors',
        ],
      },
      enclosed: {
        list: 'flex gap-1 border-b border-border',
        trigger: [
          'group px-4 py-2',
          'text-sm font-medium',
          'text-muted-foreground rounded-t-lg',
          'hover:text-foreground',
          'data-[selected]:bg-background data-[selected]:text-primary',
          'data-[selected]:border data-[selected]:border-border',
          'data-[selected]:border-b-background data-[selected]:-mb-px',
          'transition-colors',
        ],
        triggerIcon: [
          'text-muted-foreground',
          'group-hover:text-foreground',
          'group-data-[selected]:text-primary',
          'transition-colors',
        ],
      },
      bar: {
        list: 'isolate flex divide-x divide-border rounded-lg bg-background shadow-sm border border-border',
        trigger: [
          'group relative min-w-0 flex-1 overflow-hidden px-4 py-4',
          'text-center text-sm font-medium',
          'first:rounded-l-lg last:rounded-r-lg',
          'text-muted-foreground hover:text-foreground hover:bg-accent',
          'data-[selected]:text-foreground',
          'transition-colors',
        ],
        triggerIcon: [
          'text-muted-foreground',
          'group-hover:text-foreground',
          'group-data-[selected]:text-foreground',
          'transition-colors',
        ],
        indicator: 'absolute inset-x-0 bottom-0 h-0.5 data-[selected]:bg-primary',
      },
    },
  },
  defaultVariants: {
    variant: 'line',
  },
})
