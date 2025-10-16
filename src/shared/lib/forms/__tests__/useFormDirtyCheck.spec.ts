import { describe, it, expect, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useFormDirtyCheck } from '../useFormDirtyCheck'

describe('useFormDirtyCheck', () => {
  interface TestModel {
    title: string
    description: string
  }

  let model: ReturnType<typeof ref<TestModel>>
  let confirmFn: jest.Mock

  beforeEach(() => {
    model = ref<TestModel>({
      title: 'Initial Title',
      description: 'Initial Description',
    })
    confirmFn = jest.fn()
  })

  describe('initialization', () => {
    it('should initialize with no changes', () => {
      const { hasChanges } = useFormDirtyCheck(model)

      expect(hasChanges.value).toBe(false)
    })

    it('should initialize with correct original model', () => {
      const { hasChanges } = useFormDirtyCheck(model)

      expect(hasChanges.value).toBe(false)
    })
  })

  describe('change detection', () => {
    it('should detect changes when model is modified', () => {
      const { hasChanges } = useFormDirtyCheck(model)

      model.value.title = 'Modified Title'

      expect(hasChanges.value).toBe(true)
    })

    it('should detect changes when nested properties are modified', () => {
      const { hasChanges } = useFormDirtyCheck(model)

      model.value.description = 'Modified Description'

      expect(hasChanges.value).toBe(true)
    })

    it('should not detect changes when model is reverted to original', () => {
      const { hasChanges } = useFormDirtyCheck(model)

      model.value.title = 'Modified Title'
      expect(hasChanges.value).toBe(true)

      model.value.title = 'Initial Title'
      expect(hasChanges.value).toBe(false)
    })
  })

  describe('markClean', () => {
    it('should mark model as clean after changes', () => {
      const { hasChanges, markClean } = useFormDirtyCheck(model)

      model.value.title = 'Modified Title'
      expect(hasChanges.value).toBe(true)

      markClean()
      expect(hasChanges.value).toBe(false)
    })

    it('should maintain clean state after marking clean', () => {
      const { hasChanges, markClean } = useFormDirtyCheck(model)

      model.value.title = 'Modified Title'
      markClean()

      model.value.title = 'Another Change'
      expect(hasChanges.value).toBe(true)

      markClean()
      expect(hasChanges.value).toBe(false)
    })
  })

  describe('requireConfirmOnClose', () => {
    it('should return true when no changes', async () => {
      const { requireConfirmOnClose } = useFormDirtyCheck(model, confirmFn)

      const result = await requireConfirmOnClose()

      expect(result).toBe(true)
      expect(confirmFn).not.toHaveBeenCalled()
    })

    it('should return true when no confirm function provided', async () => {
      const { requireConfirmOnClose } = useFormDirtyCheck(model)

      model.value.title = 'Modified Title'

      const result = await requireConfirmOnClose()

      expect(result).toBe(true)
    })

    it('should call confirm function when changes exist', async () => {
      const { requireConfirmOnClose } = useFormDirtyCheck(model, confirmFn)

      model.value.title = 'Modified Title'
      confirmFn.mockResolvedValue(true)

      const result = await requireConfirmOnClose()

      expect(confirmFn).toHaveBeenCalledWith(
        'Unsaved Changes',
        'You have unsaved changes. Are you sure you want to close?',
      )
      expect(result).toBe(true)
    })

    it('should return false when user cancels', async () => {
      const { requireConfirmOnClose } = useFormDirtyCheck(model, confirmFn)

      model.value.title = 'Modified Title'
      confirmFn.mockResolvedValue(false)

      const result = await requireConfirmOnClose()

      expect(result).toBe(false)
    })
  })

  describe('model replacement', () => {
    it('should handle external model replacement', () => {
      const { hasChanges } = useFormDirtyCheck(model)

      // Simulate external model replacement
      model.value = {
        title: 'New Title',
        description: 'New Description',
      }

      // Should detect changes because the model was replaced externally
      expect(hasChanges.value).toBe(true)
    })

    it('should reset dirty state when model is replaced externally', () => {
      const { hasChanges, markClean } = useFormDirtyCheck(model)

      model.value.title = 'Modified Title'
      expect(hasChanges.value).toBe(true)

      // Replace model externally
      model.value = {
        title: 'New Title',
        description: 'New Description',
      }

      // Should still be dirty because it's a different model
      expect(hasChanges.value).toBe(true)

      markClean()
      expect(hasChanges.value).toBe(false)
    })
  })

  describe('complex models', () => {
    interface ComplexModel {
      user: {
        name: string
        email: string
      }
      settings: {
        theme: string
        notifications: boolean
      }
    }

    it('should detect changes in complex nested objects', () => {
      const complexModel = ref<ComplexModel>({
        user: { name: 'John', email: 'john@example.com' },
        settings: { theme: 'light', notifications: true },
      })

      const { hasChanges } = useFormDirtyCheck(complexModel)

      complexModel.value.user.name = 'Jane'

      expect(hasChanges.value).toBe(true)
    })

    it('should detect changes in nested arrays', () => {
      const modelWithArray = ref({
        items: ['item1', 'item2'],
        count: 2,
      })

      const { hasChanges } = useFormDirtyCheck(modelWithArray)

      modelWithArray.value.items.push('item3')

      expect(hasChanges.value).toBe(true)
    })
  })
})
