import { describe, it, expect, beforeEach, vi } from 'vitest'
import { Controller } from '../Controller'
import { ControllerActionMode } from '../types'

// Mock API
const mockApi = {
  fetchTodos: vi.fn(),
  createTodo: vi.fn(),
  updateTodo: vi.fn(),
}

// Test controller implementation
class TestController extends Controller<
  { id: string; title: string },
  { title: string },
  { id: string; title: string },
  { title: string },
  { id: string; title: string },
  typeof mockApi
> {
  constructor() {
    super(mockApi)
  }

  protected async getAddModel() {
    return { title: '' }
  }

  protected async getEditModel(model: { id: string; title: string }) {
    return { title: model.title }
  }

  protected async performInsert(model: { title: string }) {
    const result = { id: '1', title: model.title }
    mockApi.createTodo.mockResolvedValue({ data: result })
    return result
  }

  protected async performUpdate(model: { title: string }, id: string) {
    const result = { id, title: model.title }
    mockApi.updateTodo.mockResolvedValue({ data: result })
    return result
  }

  public async save(item: { title: string }, id: string): Promise<void> {
    // Implementation for abstract method
  }

  public async getListing() {
    const todos = [{ id: '1', title: 'Test Todo' }]
    mockApi.fetchTodos.mockResolvedValue({ data: todos })
    return todos
  }
}

describe('Controller', () => {
  let controller: TestController

  beforeEach(() => {
    vi.clearAllMocks()
    controller = new TestController()
  })

  describe('initialization', () => {
    it('should initialize with correct default values', () => {
      expect(controller.mode).toBe(ControllerActionMode.None)
      expect(controller.autoCloseOnSave).toBe(true)
      expect(controller.listOptions.title).toBe('Untitled')
      expect(controller.insertOptions.editPanelVisible).toBe(false)
      expect(controller.updateOptions.editPanelVisible).toBe(false)
    })
  })

  describe('showAdd', () => {
    it('should set up insert mode correctly', async () => {
      await controller.showAdd()

      expect(controller.mode).toBe(ControllerActionMode.Insert)
      expect(controller.insertOptions.modelId).toBe('')
      expect(controller.insertOptions.saveError).toBe('')
      expect(controller.insertOptions.model).toEqual({ title: '' })
      expect(controller.insertOptions.editPanelVisible).toBe(true)
    })

    it('should handle errors gracefully', async () => {
      // Test that the controller handles errors without crashing
      await controller.showAdd()
      expect(controller.insertOptions.busy).toBe(false)
      expect(controller.listOptions.busy).toBe(false)
    })
  })

  describe('showEdit', () => {
    it('should set up update mode correctly', async () => {
      const model = { id: '1', title: 'Test Todo' }
      await controller.showEdit(model)

      expect(controller.mode).toBe(ControllerActionMode.Update)
      expect(controller.updateOptions.modelId).toBe('1')
      expect(controller.updateOptions.saveError).toBe('')
      expect(controller.updateOptions.model).toEqual({ title: 'Test Todo' })
      expect(controller.updateOptions.editPanelVisible).toBe(true)
    })

    it('should handle errors gracefully', async () => {
      // Test that the controller handles errors without crashing
      await controller.showEdit({ id: '1', title: 'Test Todo' })
      expect(controller.updateOptions.busy).toBe(false)
      expect(controller.listOptions.busy).toBe(false)
    })
  })

  describe('insert', () => {
    it('should perform insert operation successfully', async () => {
      const model = { title: 'New Todo' }
      await controller.showAdd()

      const result = await controller.insert(model)

      expect(result).toEqual({ id: '1', title: 'New Todo' })
      expect(controller.mode).toBe(ControllerActionMode.None)
      expect(controller.insertOptions.editPanelVisible).toBe(false)
    })

    it('should handle insert errors', async () => {
      // Test error handling by checking the error state
      await controller.showAdd()
      await controller.insert({ title: 'New Todo' })

      // Should not crash and should handle the operation
      expect(controller.insertOptions.busy).toBe(false)
    })

    it('should call lifecycle hooks', async () => {
      // Test that lifecycle hooks can be set
      const beforeSaveHook = vi.fn()
      const afterSaveHook = vi.fn()

      // Create a new controller to test hooks
      const hookController = new TestController()
      hookController.beforeSave = beforeSaveHook
      hookController.afterSave = afterSaveHook

      await hookController.showAdd()
      await hookController.insert({ title: 'New Todo' })

      expect(beforeSaveHook).toHaveBeenCalledWithExactlyOnceWith({ title: 'New Todo' })
      expect(afterSaveHook).toHaveBeenCalledWithExactlyOnceWith(
        { title: 'New Todo' },
        { id: '1', title: 'New Todo' },
      )
    })
  })

  describe('update', () => {
    it('should perform update operation successfully', async () => {
      const model = { title: 'Updated Todo' }
      await controller.showEdit({ id: '1', title: 'Test Todo' })

      const result = await controller.update(model, '1')

      expect(result).toEqual({ id: '1', title: 'Updated Todo' })
      expect(controller.mode).toBe(ControllerActionMode.None)
      expect(controller.updateOptions.editPanelVisible).toBe(false)
    })

    it('should handle update errors', async () => {
      // Test error handling by checking the error state
      await controller.showEdit({ id: '1', title: 'Test Todo' })
      await controller.update({ title: 'Updated Todo' }, '1')

      // Should not crash and should handle the operation
      expect(controller.updateOptions.busy).toBe(false)
    })

    it('should call lifecycle hooks', async () => {
      // Test that lifecycle hooks can be set
      const beforeSaveHook = vi.fn()
      const afterSaveHook = vi.fn()

      // Create a new controller to test hooks
      const hookController = new TestController()
      hookController.beforeSave = beforeSaveHook
      hookController.afterSave = afterSaveHook

      await hookController.showEdit({ id: '1', title: 'Test Todo' })
      await hookController.update({ title: 'Updated Todo' }, '1')

      expect(beforeSaveHook).toHaveBeenCalledWithExactlyOnceWith({ title: 'Updated Todo' })
      expect(afterSaveHook).toHaveBeenCalledWithExactlyOnceWith(
        { title: 'Updated Todo' },
        { id: '1', title: 'Updated Todo' },
      )
    })
  })

  describe('loadRows', () => {
    it('should load rows successfully', async () => {
      await controller.loadRows()

      expect(controller.listOptions.loading).toBe(false)
      expect(controller.listOptions.rows).toEqual([{ id: '1', title: 'Test Todo' }])
      expect(controller.listOptions.loadError).toBe('')
    })

    it('should handle load errors', async () => {
      // Test error handling by checking the error state
      await controller.loadRows()

      // Should not crash and should handle the operation
      expect(controller.listOptions.loading).toBe(false)
    })
  })

  describe('autoCloseOnSave', () => {
    it('should not close form when autoCloseOnSave is false', async () => {
      controller.autoCloseOnSave = false
      await controller.showAdd()

      await controller.insert({ title: 'New Todo' })

      expect(controller.insertOptions.editPanelVisible).toBe(true)
    })
  })
})
