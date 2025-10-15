/**
 * Date Utilities
 *
 * Common date formatting and manipulation functions using date-fns.
 */

import { formatDistanceToNow, format, formatISO, isToday as isTodayFns, isValid } from 'date-fns'

/**
 * Safely converts a value to a Date object
 */
function toDate(date: Date | string | undefined | null): Date | null {
  if (!date) return null
  const dateObj = typeof date === 'string' ? new Date(date) : date
  return isValid(dateObj) ? dateObj : null
}

/**
 * Formats a date to a relative time string (e.g., "2 hours ago")
 * Returns fallback text if date is invalid
 */
export function formatRelativeTime(
  date: Date | string | undefined | null,
  fallback = 'Unknown date',
): string {
  const dateObj = toDate(date)
  if (!dateObj) return fallback
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

/**
 * Formats a date with a custom pattern
 * Returns fallback text if date is invalid
 * @param date - Date to format
 * @param pattern - Format pattern (default: 'PP' for localized date)
 * @param fallback - Text to return if date is invalid
 * @see https://date-fns.org/docs/format
 */
export function formatDate(
  date: Date | string | undefined | null,
  pattern = 'PP',
  fallback = 'Invalid date',
): string {
  const dateObj = toDate(date)
  if (!dateObj) return fallback
  return format(dateObj, pattern)
}

/**
 * Formats a date to ISO string for API communication
 * Returns current date ISO string if date is invalid
 */
export function toISOString(date: Date | string | undefined | null): string {
  const dateObj = toDate(date)
  if (!dateObj) return new Date().toISOString()
  return formatISO(dateObj)
}

/**
 * Checks if a date is today
 * Returns false if date is invalid
 */
export function isToday(date: Date | string | undefined | null): boolean {
  const dateObj = toDate(date)
  if (!dateObj) return false
  return isTodayFns(dateObj)
}
