import { ref, computed } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import type { ZodSchema } from 'zod'
import type { Ref } from 'vue'

/**
 * Field binding return type for v-bind compatibility
 */
export interface FieldBinding {
  modelValue: unknown
  'onUpdate:modelValue': (value: unknown) => void
  onBlur: () => void
  onChange: () => void
  onInput: () => void
  name: string
}

export interface EntityDialogConfig<TModel, TDto, TFormValues> {
  /** Entity instance from useEntity */
  entity: {
    create: (dto: TDto) => Promise<TModel | void>
    update: (id: string, dto: TDto) => Promise<TModel | void>
    delete?: (id: string) => Promise<void>
    isMutating: Ref<boolean>
    isCreating: Ref<boolean>
    isUpdating: Ref<boolean>
    isDeleting: Ref<boolean>
  }
  /** Zod schema for form validation */
  schema: ZodSchema<TFormValues>
  /** Initial/empty form values */
  emptyForm: TFormValues
  /** Extract ID from model */
  getId: (model: TModel) => string
  /** Convert form values to DTO for API calls */
  toDto: (values: TFormValues) => TDto
  /** Convert model to form values for editing */
  fromModel: (model: TModel) => TFormValues
}

export interface EntityDialogReturn<TModel, TFormValues> {
  /** vee-validate form instance (exposes values, errors, meta, handleSubmit, resetForm, defineField) */
  form: ReturnType<typeof useForm> & {
    values: TFormValues
  }
  /** Helper to create field bindings - returns props for v-bind */
  field: (name: keyof TFormValues & string) => FieldBinding
  /** Dialog open state */
  isOpen: Ref<boolean>
  /** Whether currently editing (vs creating) */
  isEditMode: Ref<boolean>
  /** Whether form has unsaved changes */
  hasChanges: Ref<boolean>
  /** Currently editing model ID */
  editingId: Ref<string | null>
  /** Whether any mutation is in progress */
  isLoading: Ref<boolean>
  /** Open dialog for creating new entity */
  openAdd: () => void
  /** Open dialog for editing existing entity */
  openEdit: (model: TModel) => void
  /** Close dialog with unsaved changes check */
  close: () => Promise<boolean>
  /** Save form (create or update) */
  save: () => Promise<void>
  /** Force close without confirmation */
  forceClose: () => void
}

/**
 * Entity Dialog Composable
 *
 * Provides a complete CRUD dialog pattern inspired by Facts app's factsEditForm.
 * Handles form management, validation, dirty checking, and entity operations.
 *
 * @example
 * ```typescript
 * const todoDialog = useEntityDialog({
 *   entity: todo,
 *   schema: toTypedSchema(createTodoSchema),
 *   emptyForm: { title: '', description: '' },
 *   getId: (t) => t.id,
 *   toDto: (values) => values as CreateTodoDto,
 *   fromModel: (t) => ({ title: t.title, description: t.description || '' }),
 * })
 * ```
 */
export function useEntityDialog<TModel, TDto, TFormValues extends Record<string, unknown>>(
  config: EntityDialogConfig<TModel, TDto, TFormValues>,
): EntityDialogReturn<TModel, TFormValues> {
  const { entity, schema, emptyForm, getId, toDto, fromModel } = config

  // Form management with vee-validate
  const { defineField, ...formInstance } = useForm({
    validationSchema: toTypedSchema(schema),
    initialValues: emptyForm as Record<string, unknown>,
    validateOnMount: false,
  })

  const form = {
    ...formInstance,
    defineField,
  } as ReturnType<typeof useForm> & { values: TFormValues }

  // Dialog state
  const isOpen = ref(false)
  const editingId = ref<string | null>(null)
  const isEditMode = computed(() => editingId.value !== null)

  // Dirty checking (JSON snapshot like Facts app)
  const originalSnapshot = ref('')
  const hasChanges = computed(() => {
    const currentSnapshot = JSON.stringify(form.values)
    return currentSnapshot !== originalSnapshot.value
  })

  // Loading state
  const isLoading = computed(() => entity.isMutating.value)

  /**
   * Mark form as clean (snapshot current values)
   */
  function markClean() {
    originalSnapshot.value = JSON.stringify(form.values)
  }

  /**
   * Open dialog for creating new entity
   */
  function openAdd() {
    editingId.value = null
    form.resetForm({ values: emptyForm as Record<string, unknown> })
    markClean()
    isOpen.value = true
  }

  /**
   * Open dialog for editing existing entity
   */
  function openEdit(model: TModel) {
    editingId.value = getId(model)
    const formValues = fromModel(model)
    form.resetForm({ values: formValues as Record<string, unknown> })
    markClean()
    isOpen.value = true
  }

  /**
   * Close dialog with unsaved changes check
   * @returns true if dialog was closed, false if user cancelled
   */
  async function close(): Promise<boolean> {
    if (hasChanges.value) {
      // Show confirmation dialog - this will be handled by the component
      return false
    }

    forceClose()
    return true
  }

  /**
   * Force close dialog without confirmation
   */
  function forceClose() {
    isOpen.value = false
    editingId.value = null
    form.resetForm({ values: emptyForm as Record<string, unknown> })
    markClean()
  }

  /**
   * Save form (create or update)
   */
  async function save(): Promise<void> {
    const submitHandler = form.handleSubmit(async (values: Record<string, unknown>) => {
      try {
        const dto = toDto(values as TFormValues)

        if (isEditMode.value) {
          await entity.update(editingId.value!, dto)
        } else {
          await entity.create(dto)
        }

        markClean()
        forceClose()
      } catch (error) {
        console.error('Save failed:', error)
        // Error handling is managed by the entity
      }
    })

    await submitHandler()
  }

  /**
   * Helper to create field bindings for v-bind
   * Usage: <TextField v-bind="field('title')" />
   *
   * Validation strategy:
   * - validateOnBlur: false - Don't validate when closing dialog (prevents UX issues)
   * - validateOnChange: true - Validate when value actually changes
   * - validateOnInput: false - Don't validate on every keystroke (better UX)
   */
  function field(name: keyof TFormValues & string): FieldBinding {
    const [modelValue, fieldProps] = form.defineField(name, {
      validateOnBlur: false,
      validateOnChange: true,
      validateOnInput: false,
    })
    const props = fieldProps.value

    return {
      modelValue: modelValue.value as unknown,
      'onUpdate:modelValue': (value: unknown) => {
        modelValue.value = value as typeof modelValue.value
      },
      onBlur: props.onBlur,
      onChange: props.onChange,
      onInput: props.onInput,
      name,
    }
  }

  return {
    form,
    field,
    isOpen,
    isEditMode,
    hasChanges,
    editingId,
    isLoading,
    openAdd,
    openEdit,
    close,
    save,
    forceClose,
  }
}
