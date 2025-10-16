import { ref, computed, watch, type Ref } from 'vue'

export interface FormDirtyCheckOptions<TModel> {
  initialModel: TModel
  onClose?: () => void
}

export interface ConfirmFunction {
  (title: string, message: string): Promise<boolean>
}

export function useFormDirtyCheck<TModel>(model: Ref<TModel>, confirmFn?: ConfirmFunction) {
  const originalModelJson = ref(JSON.stringify(model.value))

  function modelJson(m: TModel): string {
    return JSON.stringify(m)
  }

  const hasChanges = computed(() => {
    return modelJson(model.value) !== originalModelJson.value
  })

  function markClean() {
    originalModelJson.value = modelJson(model.value)
  }

  async function requireConfirmOnClose(): Promise<boolean> {
    if (hasChanges.value && confirmFn) {
      const shouldClose = await confirmFn(
        'Unsaved Changes',
        'You have unsaved changes. Are you sure you want to close?',
      )
      return shouldClose
    }
    return true
  }

  // Reset when model is replaced externally
  watch(
    () => model.value,
    (_newValue) => {
      // Could add logic to detect external changes
    },
    { deep: false },
  )

  return {
    hasChanges,
    markClean,
    requireConfirmOnClose,
  }
}
