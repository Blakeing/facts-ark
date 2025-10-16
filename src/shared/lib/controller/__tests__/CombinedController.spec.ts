import { describe, it, expect, beforeEach, vi } from 'vitest'
import { CombinedController } from '../CombinedController'

// Mock API
const mockApi = {
  fetchTodos: vi.fn(),
  createTodo: vi.fn(),
  updateTodo: vi.fn(),
}

// Test combined controller implementation
class TestCombinedController extends CombinedController<
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

  public async getListing() {
    const todos = [{ id: '1', title: 'Test Todo' }]
    mockApi.fetchTodos.mockResolvedValue({ data: todos })
    return todos
  }
}

describe('CombinedController', () => {
  let controller: TestCombinedController

  beforeEach(() => {
    vi.clearAllMocks()
    controller = new TestCombinedController()
  })

  describe('initialization', () => {
    it('should initialize with correct default values', () => {
      expect(controller.insertFormTitle).toBe('Add')
      expect(controller.updateFormTitle).toBe('Edit')
      expect(controller.editOptions).toBeDefined()
    })

    it('should use same edit options for insert and update', () => {
      expect(controller.insertOptions).toBe(controller.editOptions)
      expect(controller.updateOptions).toBe(controller.editOptions)
    })
  })

  describe('save', () => {
    it('should call insert when in Insert mode', async () => {
      const insertSpy = vi.spyOn(controller, 'insert')
      await controller.showAdd()

      await controller.save({ title: 'New Todo' }, '')

      expect(insertSpy).toHaveBeenCalledWith({ title: 'New Todo' })
    })

    it('should call update when in Update mode', async () => {
      const updateSpy = vi.spyOn(controller, 'update')
      await controller.showEdit({ id: '1', title: 'Test Todo' })

      await controller.save({ title: 'Updated Todo' }, '1')

      expect(updateSpy).toHaveBeenCalledWith({ title: 'Updated Todo' }, '1')
    })

    it('should return undefined when in None mode', async () => {
      const result = await controller.save({ title: 'Test' }, '1')

      expect(result).toBeUndefined()
    })
  })

  describe('saveWithResult', () => {
    it('should return insert result when in Insert mode', async () => {
      await controller.showAdd()

      const result = await controller.saveWithResult({ title: 'New Todo' }, '')

      expect(result).toEqual({ id: '1', title: 'New Todo' })
    })

    it('should return update result when in Update mode', async () => {
      await controller.showEdit({ id: '1', title: 'Test Todo' })

      const result = await controller.saveWithResult({ title: 'Updated Todo' }, '1')

      expect(result).toEqual({ id: '1', title: 'Updated Todo' })
    })

    it('should return undefined when in None mode', async () => {
      const result = await controller.saveWithResult({ title: 'Test' }, '1')

      expect(result).toBeUndefined()
    })
  })

  describe('prepareInsertOptions', () => {
    it('should set form title to insertFormTitle', async () => {
      controller.insertFormTitle = 'Add New Item'
      await controller.showAdd()

      expect(controller.editOptions.formTitle).toBe('Add New Item')
    })
  })

  describe('prepareUpdateOptions', () => {
    it('should set form title to updateFormTitle', async () => {
      controller.updateFormTitle = 'Edit Item'
      await controller.showEdit({ id: '1', title: 'Test Todo' })

      expect(controller.editOptions.formTitle).toBe('Edit Item')
    })
  })

  describe('unified edit options', () => {
    it('should maintain single edit options instance', async () => {
      await controller.showAdd()
      const insertOptions = controller.insertOptions

      await controller.showEdit({ id: '1', title: 'Test Todo' })
      const updateOptions = controller.updateOptions

      expect(insertOptions).toBe(updateOptions)
      expect(insertOptions).toBe(controller.editOptions)
    })

    it('should update the same options object for both modes', async () => {
      await controller.showAdd()
      controller.editOptions.model = { title: 'Insert Model' }

      await controller.showEdit({ id: '1', title: 'Test Todo' })
      controller.editOptions.model = { title: 'Update Model' }

      expect(controller.insertOptions.model).toEqual({ title: 'Update Model' })
      expect(controller.updateOptions.model).toEqual({ title: 'Update Model' })
    })
  })
})
