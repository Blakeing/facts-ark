/**
 * Fieldset component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior
 */

import { tv } from 'tailwind-variants/lite'

/**
 * Fieldset variant definitions
 * Uses semantic tokens for dark mode and theming support
 */
export const fieldsetVariants = tv({
  slots: {
    root: 'space-y-4 border border-border rounded-md p-4',
    legend: 'text-base font-semibold text-foreground px-2',
    helperText: 'text-sm text-muted-foreground',
    errorText: 'text-sm text-destructive',
  },
})
