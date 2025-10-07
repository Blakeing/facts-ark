/**
 * Field component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Field variant definitions
 * Uses semantic tokens for dark mode and theming support
 */
export const fieldVariants = tv({
  slots: {
    root: 'space-y-2',
    label: 'block text-sm font-medium text-foreground',
    helperText: 'text-sm text-muted-foreground',
    errorText: 'text-sm text-destructive',
    requiredIndicator: 'text-destructive ml-1',
  },
})
