/**
 * Composable for filtering out custom props before forwarding to Ark UI components
 *
 * This utility creates a reactive computed that omits specified keys from props,
 * which is useful when wrapping Ark UI components with custom props that shouldn't
 * be passed down to the underlying Root component.
 *
 * @example
 * ```typescript
 * const arkProps = useOmitProps(props, ['variant', 'class', 'customProp'])
 * const forwarded = useForwardPropsEmits(arkProps, emits)
 * ```
 */

import { computed, type ComputedRef } from 'vue'

export function useOmitProps<T extends object, K extends string>(
  props: T,
  keys: readonly K[],
): ComputedRef<Omit<T, K>> {
  return computed(() => {
    const result = { ...props }
    keys.forEach((key) => {
      delete result[key as unknown as keyof T]
    })
    return result as Omit<T, K>
  })
}
