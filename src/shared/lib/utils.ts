import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Custom cn utility that combines clsx and tailwind-merge
 * 
 * We use our own implementation because tailwind-variants v3.1.1 has a bug
 * where cn() returns a function instead of a string.
 * 
 * @see https://github.com/heroui-inc/tailwind-variants/issues/268
 * 
 * @param inputs - Class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

