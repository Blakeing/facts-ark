import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useMachine } from '@xstate/vue'
import type { z } from 'zod'
import type { AnyStateMachine } from 'xstate'

export interface UseFormMachineOptions<TSchema extends z.ZodType> {
  schema: TSchema
  machine: AnyStateMachine
  onSubmit?: (values: z.infer<TSchema>) => void | Promise<void>

  // VeeValidate validation modes (full control!)
  validateOnMount?: boolean
  validateOnBlur?: boolean
  validateOnChange?: boolean
  validateOnInput?: boolean
  validateOnModelUpdate?: boolean

  // Initial state
  initialValues?: Partial<z.infer<TSchema>>
  initialErrors?: Record<string, string>
  initialTouched?: Record<string, boolean>
}

/**
 * Unified form composable that integrates XState + Zod + VeeValidate
 *
 * Architecture:
 * - VeeValidate: Single source of truth for all field state, validation, and errors
 * - XState: Orchestrates submission flow (idle → submitting → success/error)
 * - Zod: Schema used by VeeValidate for validation
 *
 * @example
 * const { form, handleSubmit, state, isValid } = useFormMachine({
 *   schema: todoSchema,
 *   machine: submissionMachine,
 *   onSubmit: async (values) => {
 *     await createTodo(values)
 *   }
 * })
 */
export function useFormMachine<TSchema extends z.ZodType>(options: UseFormMachineOptions<TSchema>) {
  // VeeValidate form with Zod schema - this is the single source of truth
  const form = useForm({
    validationSchema: toTypedSchema(options.schema),
    // Initial state (cast to any for type compatibility)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialValues: options.initialValues as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialErrors: options.initialErrors as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialTouched: options.initialTouched as any,
    validateOnMount: options.validateOnMount,
  })

  // XState machine for submission flow orchestration only
  const { snapshot, send, actorRef } = useMachine(options.machine)
  const state = snapshot

  const matches = (targetState: string) => {
    const current = state.value
    if (!current) {
      return false
    }

    const matcher = (current as { matches?: (value: string) => boolean }).matches
    if (typeof matcher === 'function') {
      return matcher.call(current, targetState)
    }

    return current.value === targetState
  }

  // Handle submit - VeeValidate validates, then XState manages submission flow
  const handleSubmit = form.handleSubmit(async (values) => {
    // Only submit if form is valid (VeeValidate has already validated)
    if (form.meta.value.valid) {
      send({ type: 'SUBMIT', data: values })
      await options.onSubmit?.(values)
    }
  })

  // Auto-reset form when machine transitions from success back to idle
  watch(
    () => state.value.value,
    (newState, oldState) => {
      if (oldState === 'success' && newState === 'idle') {
        form.resetForm({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          values: options.initialValues as any,
        })
      }
    },
  )

  return {
    // Core objects
    form, // Full VeeValidate form API (source of truth)
    state, // XState machine state (submission flow only)
    send, // Send events to machine
    actorRef, // XState actor reference
    handleSubmit, // Form submission

    // Convenience computed values from VeeValidate
    values: computed(() => form.values as z.infer<TSchema>),
    errors: computed(() => form.errors.value),
    meta: computed(() => form.meta.value),

    // Field-level access (VeeValidate features!)
    getFieldState: (name: string) => {
      const fieldMeta = form.meta.value
      // @ts-expect-error - VeeValidate meta type compatibility
      const touchedMap = fieldMeta.touched as Record<string, boolean>
      // @ts-expect-error - VeeValidate meta type compatibility
      const dirtyMap = fieldMeta.dirty as Record<string, boolean>
      return {
        value: form.values[name],
        touched: touchedMap?.[name] ?? false,
        dirty: dirtyMap?.[name] ?? false,
        valid: fieldMeta.valid ?? false,
        errors: form.errors.value[name] ? [form.errors.value[name]] : [],
        pending: fieldMeta.pending ?? false,
      }
    },

    // Field manipulation (from VeeValidate)
    setFieldValue: form.setFieldValue,
    setFieldTouched: form.setFieldTouched,
    setFieldError: form.setFieldError,
    resetField: form.resetField,

    // Form-level controls (from VeeValidate)
    resetForm: form.resetForm,
    validate: form.validate,
    validateField: form.validateField,
    setErrors: form.setErrors,
    setValues: form.setValues,
    setTouched: form.setTouched,

    // State checks (VeeValidate for validation, XState for submission)
    isValid: computed(() => form.meta.value.valid),
    isDirty: computed(() => form.meta.value.dirty),
    isTouched: computed(() => form.meta.value.touched),
    isPending: computed(() => form.meta.value.pending),
    isSubmitting: computed(() => matches('submitting')),
    isSuccess: computed(() => matches('success')),
    isError: computed(() => matches('error')),
    submitError: computed(() => state.value.context?.submitError ?? null),
    canSubmit: computed(
      () => form.meta.value.valid && !matches('submitting') && !matches('success'),
    ),

    // Field count helpers
    fieldCount: computed(() => Object.keys(form.values).length),
    errorCount: computed(() => Object.keys(form.errors.value).length),
    touchedFieldCount: computed(
      () => Object.values(form.meta.value.touched).filter(Boolean).length,
    ),
    dirtyFieldCount: computed(() => Object.values(form.meta.value.dirty).filter(Boolean).length),
  }
}
