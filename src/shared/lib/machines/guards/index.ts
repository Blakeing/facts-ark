/**
 * Shared Guard Functions
 *
 * Reusable guard factories for common validation patterns across machines.
 * Guards determine whether a transition should be allowed.
 *
 * @see https://stately.ai/docs/guards
 */

/**
 * Create a guard that checks if a value exists (is truthy)
 *
 * @param getValue - Function to extract value from context
 * @returns Guard function
 *
 * @example
 * ```ts
 * guards: {
 *   hasTitle: hasValue(({ context }) => context.title)
 * }
 * ```
 */
export function hasValue<TContext, TEvent>(
  getValue: (args: { context: TContext; event: TEvent }) => unknown,
) {
  return ({ context, event }: { context: TContext; event: TEvent }) => {
    return Boolean(getValue({ context, event }))
  }
}

/**
 * Create a guard that checks if a string is not empty
 *
 * @param getValue - Function to extract string from context
 * @returns Guard function
 *
 * @example
 * ```ts
 * guards: {
 *   hasNonEmptyTitle: isNotEmpty(({ context }) => context.title)
 * }
 * ```
 */
export function isNotEmpty<TContext, TEvent>(
  getValue: (args: { context: TContext; event: TEvent }) => string | undefined | null,
) {
  return ({ context, event }: { context: TContext; event: TEvent }) => {
    const value = getValue({ context, event })
    return value !== null && value !== undefined && value.trim().length > 0
  }
}

/**
 * Create a guard that checks if a number is within a range
 *
 * @param getValue - Function to extract number from context
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Guard function
 *
 * @example
 * ```ts
 * guards: {
 *   isValidPercentage: isInRange(({ context }) => context.progress, 0, 100)
 * }
 * ```
 */
export function isInRange<TContext, TEvent>(
  getValue: (args: { context: TContext; event: TEvent }) => number,
  min: number,
  max: number,
) {
  return ({ context, event }: { context: TContext; event: TEvent }) => {
    const value = getValue({ context, event })
    return value >= min && value <= max
  }
}

/**
 * Create a guard that checks array length
 *
 * @param getValue - Function to extract array from context
 * @param minLength - Minimum length
 * @returns Guard function
 *
 * @example
 * ```ts
 * guards: {
 *   hasItems: hasMinLength(({ context }) => context.items, 1)
 * }
 * ```
 */
export function hasMinLength<TContext, TEvent, T>(
  getValue: (args: { context: TContext; event: TEvent }) => T[],
  minLength: number,
) {
  return ({ context, event }: { context: TContext; event: TEvent }) => {
    const array = getValue({ context, event })
    return array.length >= minLength
  }
}

/**
 * Create a guard that validates against a Zod schema
 *
 * @param schema - Zod schema
 * @param getValue - Function to extract value from context
 * @returns Guard function
 *
 * @example
 * ```ts
 * import { z } from 'zod'
 *
 * const emailSchema = z.string().email()
 *
 * guards: {
 *   isValidEmail: isValidZodSchema(emailSchema, ({ context }) => context.email)
 * }
 * ```
 */
export function isValidZodSchema<TContext, TEvent, TSchema>(
  schema: { safeParse: (value: unknown) => { success: boolean } },
  getValue: (args: { context: TContext; event: TEvent }) => TSchema,
) {
  return ({ context, event }: { context: TContext; event: TEvent }) => {
    const value = getValue({ context, event })
    const result = schema.safeParse(value)
    return result.success
  }
}

/**
 * Combine multiple guards with AND logic
 *
 * @param guards - Array of guard functions
 * @returns Combined guard function
 *
 * @example
 * ```ts
 * guards: {
 *   canSubmit: and([
 *     ({ context }) => Boolean(context.title),
 *     ({ context }) => Boolean(context.description)
 *   ])
 * }
 * ```
 */
export function and<TContext, TEvent>(
  guards: Array<(args: { context: TContext; event: TEvent }) => boolean>,
) {
  return ({ context, event }: { context: TContext; event: TEvent }) => {
    return guards.every((guard) => guard({ context, event }))
  }
}

/**
 * Combine multiple guards with OR logic
 *
 * @param guards - Array of guard functions
 * @returns Combined guard function
 *
 * @example
 * ```ts
 * guards: {
 *   hasContent: or([
 *     ({ context }) => Boolean(context.title),
 *     ({ context }) => Boolean(context.description)
 *   ])
 * }
 * ```
 */
export function or<TContext, TEvent>(
  guards: Array<(args: { context: TContext; event: TEvent }) => boolean>,
) {
  return ({ context, event }: { context: TContext; event: TEvent }) => {
    return guards.some((guard) => guard({ context, event }))
  }
}

/**
 * Negate a guard
 *
 * @param guard - Guard function to negate
 * @returns Negated guard function
 *
 * @example
 * ```ts
 * guards: {
 *   isEmpty: not(({ context }) => Boolean(context.title))
 * }
 * ```
 */
export function not<TContext, TEvent>(
  guard: (args: { context: TContext; event: TEvent }) => boolean,
) {
  return ({ context, event }: { context: TContext; event: TEvent }) => {
    return !guard({ context, event })
  }
}
