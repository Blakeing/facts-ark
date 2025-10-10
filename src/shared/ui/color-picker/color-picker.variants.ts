/**
 * Color Picker component - variant definitions
 *
 * Design inspired by Park UI's color-picker component
 * Uses semantic color tokens for consistency
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Color Picker variants matching Park UI's design system
 */
export const colorPickerVariants = tv({
  slots: {
    root: ['w-full'],

    label: ['text-sm font-medium leading-none', 'text-foreground', 'mb-2', 'block'],

    control: [
      'flex items-center gap-2',
      'rounded-md',
      'border border-input',
      'bg-background',
      'px-3 py-2',
    ],

    trigger: [
      'relative',
      'size-10',
      'rounded',
      'border border-border',
      'cursor-pointer',
      'transition-shadow',
      'hover:shadow-md',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'overflow-hidden',
    ],

    valueText: ['flex-1 text-sm', 'text-foreground'],

    channelInput: [
      'w-20',
      'h-8 rounded px-2 py-1',
      'bg-background',
      'border border-input',
      'text-foreground text-xs',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'transition-colors',
    ],

    positioner: ['relative z-50'],

    content: [
      'mt-1',
      'w-80',
      'rounded-lg',
      'border border-border',
      'bg-popover',
      'text-popover-foreground',
      'shadow-lg',
      'p-4',
      'space-y-4',
      'data-[state=open]:animate-in',
      'data-[state=open]:fade-in-0',
      'data-[state=open]:zoom-in-95',
      'data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0',
      'data-[state=closed]:zoom-out-95',
    ],

    area: ['relative', 'w-full', 'h-48', 'rounded-md', 'overflow-hidden', 'cursor-crosshair'],

    areaBackground: ['absolute inset-0'],

    areaThumb: [
      'absolute',
      'size-5',
      'rounded-full',
      'border-2 border-white',
      'shadow-md',
      'cursor-grab',
      'active:cursor-grabbing',
      'z-10',
      '-translate-x-1/2 -translate-y-1/2',
    ],

    channelSlider: ['relative', 'w-full', 'h-3', 'rounded-full', 'overflow-hidden'],

    channelSliderTrack: ['absolute inset-0'],

    channelSliderThumb: [
      'absolute',
      'size-5',
      'top-1/2',
      '-translate-y-1/2 -translate-x-1/2',
      'rounded-full',
      'border-2 border-white',
      'shadow-md',
      'cursor-grab',
      'active:cursor-grabbing',
      'z-10',
    ],

    transparencyGrid: [
      'absolute inset-0',
      'bg-white',
      'background-image: repeating-conic-gradient(rgb(229, 229, 229) 0% 25%, transparent 0% 50%) 50% / 12px 12px',
    ],

    swatchGroup: ['flex flex-wrap gap-2', 'mt-4'],

    swatchTrigger: [
      'relative',
      'size-8',
      'rounded',
      'cursor-pointer',
      'transition-transform',
      'hover:scale-110',
      'focus-visible:outline-none',
      'focus-visible:ring-2',
      'focus-visible:ring-ring',
      'data-[state=checked]:ring-2',
      'data-[state=checked]:ring-ring',
    ],

    swatch: ['size-full', 'rounded', 'flex items-center justify-center'],

    swatchIndicator: ['text-white text-xs', 'drop-shadow-md'],

    formatTrigger: [
      'inline-flex items-center justify-center',
      'h-8 px-3',
      'rounded-md',
      'text-xs font-medium',
      'bg-muted',
      'hover:bg-accent',
      'hover:text-accent-foreground',
      'transition-colors',
    ],

    eyeDropperTrigger: [
      'inline-flex items-center justify-center',
      'h-9 px-4',
      'rounded-md',
      'text-sm font-medium',
      'bg-muted',
      'hover:bg-accent',
      'hover:text-accent-foreground',
      'transition-colors',
    ],

    view: ['space-y-3'],

    channelSliderLabel: ['text-xs font-medium', 'text-muted-foreground', 'mb-2'],
  },
})
