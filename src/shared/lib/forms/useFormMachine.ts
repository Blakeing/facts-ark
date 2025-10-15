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
 * Provides a consistent pattern for all forms:
 * - Zod for validation rules
 * - XState for state management & flow
 * - VeeValidate for UI integration
 *
 * @example
 * const { form, handleSubmit, state, isValid } = useFormMachine({
 *   schema: todoSchema,
 *   machine: todoFormMachine,
 *   onSubmit: async (values) => {
 *     await createTodo(values)
 *   }
 * })
 */
export function useFormMachine<TSchema extends z.ZodType>(options: UseFormMachineOptions<TSchema>) {
  // VeeValidate form with Zod schema
  const form = useForm({
    validationSchema: toTypedSchema(options.schema),
    // Initial state (cast to any for type compatibility)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialValues: options.initialValues as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialErrors: options.initialErrors as any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialTouched: options.initialTouched as any,
  })

  // XState machine
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

  // Sync VeeValidate values to XState context
  watch(
    () => form.values,
    (values) => {
      send({ type: 'UPDATE_FORM_DATA', data: values })
    },
    { deep: true },
  )

  // Sync VeeValidate meta state to XState
  watch(
    () => form.meta.value,
    (meta) => {
      send({
        type: 'UPDATE_FORM_META',
        meta: {
          dirty: meta.dirty,
          touched: meta.touched,
          valid: meta.valid,
          pending: meta.pending,
        },
      })
    },
    { deep: true },
  )

  // Sync XState errors to VeeValidate
  watch(
    () => state.value.context?.errors,
    (errors) => {
      if (errors) {
        // Cast for type compatibility with VeeValidate
        form.setErrors(errors as Record<string, string>)
      }
    },
    { deep: true },
  )

  // Watch for machine reset to sync VeeValidate form
  watch(
    () => state.value.value,
    (newState, oldState) => {
      // Auto-reset VeeValidate when machine transitions from success to idle
      if (oldState === 'success' && newState === 'idle') {
        form.resetForm({
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          values: options.initialValues as any,
        })
      }
    },
  )

  // Handle submit
  const handleSubmit = form.handleSubmit(async (values) => {
    send({ type: 'SUBMIT', data: values })
    await options.onSubmit?.(values)
  })

  return {
    // Core objects
    form, // Full VeeValidate form API
    state, // XState machine state
    send, // Send events to machine
    actorRef, // XState actor reference
    handleSubmit, // Form submission

    // Convenience computed values
    values: computed(() => form.values as z.infer<TSchema>),
    errors: computed(() => form.errors.value),
    meta: computed(() => form.meta.value),

    // Field-level access (VeeValidate features!)
    getFieldState: (name: string) => {
      // VeeValidate doesn't expose getFieldState in v4, use meta instead
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

    // Field manipulation
    setFieldValue: form.setFieldValue,
    setFieldTouched: form.setFieldTouched,
    setFieldError: form.setFieldError,
    resetField: form.resetField,

    // Form-level controls
    resetForm: form.resetForm,
    validate: form.validate,
    validateField: form.validateField,
    setErrors: form.setErrors,
    setValues: form.setValues,
    setTouched: form.setTouched,

    // State checks
    isValid: computed(() => form.meta.value.valid),
    isDirty: computed(() => form.meta.value.dirty),
    isTouched: computed(() => form.meta.value.touched),
    isPending: computed(() => form.meta.value.pending),
    isSubmitting: computed(() => matches('submitting') || matches('success')),
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
