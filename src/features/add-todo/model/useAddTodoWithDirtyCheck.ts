import { computed } from 'vue'
import { useFormDirtyCheck, type ConfirmFunction } from '@/shared/lib/forms'
import { todoController } from '@/entities/todo/model/TodoController'

export function useAddTodoWithDirtyCheck(confirmFn?: ConfirmFunction) {
  const model = computed(() => todoController.editOptions.model)
  const dirtyCheck = useFormDirtyCheck(model, confirmFn)

  async function handleSave() {
    await todoController.save(model.value, todoController.editOptions.modelId)
    dirtyCheck.markClean()
  }

  async function handleClose() {
    const canClose = await dirtyCheck.requireConfirmOnClose()
    if (canClose) {
      todoController.editOptions.editPanelVisible = false
    }
  }

  return {
    model,
    hasChanges: dirtyCheck.hasChanges,
    handleSave,
    handleClose,
    isPending: computed(() => todoController.editOptions.busy),
    formTitle: computed(() => todoController.editOptions.formTitle),
  }
}
