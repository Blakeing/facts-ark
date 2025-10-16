import { describe, it, expect, beforeEach, vi } from 'vitest'
import { TodoController } from '../TodoController'
import type { Todo, CreateTodoDto } from '../types'

// Mock the todo API
const mockTodoApi = {
  fetchTodos: vi.fn(),
  createTodo: vi.fn(),
  updateTodo: vi.fn(),
  deleteTodo: vi.fn(),
}

// Mock the API module
vi.mock('../../api/todoApi', () => mockTodoApi)

describe('TodoController', () => {
  let controller: TodoController

  beforeEach(() => {
    vi.clearAllMocks()
    controller = new TodoController()
  })

  describe('initialization', () => {
    it('should initialize with correct default values', () => {
      expect(controller.listOptions.title).toBe('Todos')
      expect(controller.listOptions.addButtonText).toBe('Add Todo')
      expect(controller.listOptions.searchEnabled).toBe(true)
      expect(controller.insertFormTitle).toBe('Add Todo')
      expect(controller.updateFormTitle).toBe('Edit Todo')
    })
  })

  describe('getListing', () => {
    it('should fetch todos from API', async () => {
      const mockTodos: Todo[] = [
        {
          id: '1',
          title: 'Test Todo 1',
          description: 'Description 1',
          status: 'pending',
          createdAt: '2024-01-01',
          updatedAt: '2024-01-01',
        },
        {
          id: '2',
          title: 'Test Todo 2',
          description: 'Description 2',
          status: 'completed',
          createdAt: '2024-01-02',
          updatedAt: '2024-01-02',
        },
      ]
      mockTodoApi.fetchTodos.mockResolvedValue({ data: mockTodos })

      const result = await controller.getListing()

      expect(mockTodoApi.fetchTodos).toHaveBeenCalled()
      expect(result).toEqual(mockTodos)
    })

    it('should handle API errors', async () => {
      const error = new Error('API Error')
      mockTodoApi.fetchTodos.mockRejectedValue(error)

      await expect(controller.getListing()).rejects.toThrow('API Error')
    })
  })

  describe('getAddModel', () => {
    it('should return empty todo model for adding', async () => {
      const model = await controller.getAddModel()

      expect(model).toEqual({
        title: '',
        description: '',
      })
    })
  })

  describe('getEditModel', () => {
    it('should return todo model for editing', async () => {
      const todo: Todo = {
        id: '1',
        title: 'Test Todo',
        description: 'Test Description',
        status: 'pending',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      }

      const model = await controller.getEditModel(todo)

      expect(model).toEqual({
        title: 'Test Todo',
        description: 'Test Description',
      })
    })
  })

  describe('performInsert', () => {
    it('should create todo via API', async () => {
      const createDto: CreateTodoDto = {
        title: 'New Todo',
        description: 'New Description',
      }
      const createdTodo: Todo = {
        id: '1',
        title: 'New Todo',
        description: 'New Description',
        status: 'pending',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      }
      mockTodoApi.createTodo.mockResolvedValue({ data: createdTodo })

      const result = await controller.performInsert(createDto)

      expect(mockTodoApi.createTodo).toHaveBeenCalledWith(createDto)
      expect(result).toEqual(createdTodo)
    })

    it('should handle insert errors', async () => {
      const error = new Error('Create failed')
      mockTodoApi.createTodo.mockRejectedValue(error)

      await expect(
        controller.performInsert({ title: 'Test', description: 'Test' }),
      ).rejects.toThrow('Create failed')
    })
  })

  describe('performUpdate', () => {
    it('should update todo via API', async () => {
      const updateDto: CreateTodoDto = {
        title: 'Updated Todo',
        description: 'Updated Description',
      }
      const updatedTodo: Todo = {
        id: '1',
        title: 'Updated Todo',
        description: 'Updated Description',
        status: 'pending',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      }
      mockTodoApi.updateTodo.mockResolvedValue({ data: updatedTodo })

      const result = await controller.performUpdate(updateDto, '1')

      expect(mockTodoApi.updateTodo).toHaveBeenCalledWith('1', updateDto)
      expect(result).toEqual(updatedTodo)
    })

    it('should handle update errors', async () => {
      const error = new Error('Update failed')
      mockTodoApi.updateTodo.mockRejectedValue(error)

      await expect(
        controller.performUpdate({ title: 'Test', description: 'Test' }, '1'),
      ).rejects.toThrow('Update failed')
    })
  })

  describe('lifecycle hooks', () => {
    it('should call beforeSave hook during insert', async () => {
      const beforeSaveHook = vi.fn()
      controller.beforeSave = beforeSaveHook

      const createDto: CreateTodoDto = { title: 'Test', description: 'Test' }
      const createdTodo: Todo = {
        id: '1',
        title: 'Test',
        description: 'Test',
        status: 'pending',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      }
      mockTodoApi.createTodo.mockResolvedValue({ data: createdTodo })

      await controller.showAdd()
      await controller.insert(createDto)

      expect(beforeSaveHook).toHaveBeenCalledWith(createDto)
    })

    it('should call afterSave hook during insert', async () => {
      const afterSaveHook = vi.fn()
      controller.afterSave = afterSaveHook

      const createDto: CreateTodoDto = { title: 'Test', description: 'Test' }
      const createdTodo: Todo = {
        id: '1',
        title: 'Test',
        description: 'Test',
        status: 'pending',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      }
      mockTodoApi.createTodo.mockResolvedValue({ data: createdTodo })

      await controller.showAdd()
      await controller.insert(createDto)

      expect(afterSaveHook).toHaveBeenCalledWith(createDto, createdTodo)
    })
  })

  describe('integration', () => {
    it('should handle complete add workflow', async () => {
      const createDto: CreateTodoDto = { title: 'New Todo', description: 'New Description' }
      const createdTodo: Todo = {
        id: '1',
        title: 'New Todo',
        description: 'New Description',
        status: 'pending',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      }
      const todos: Todo[] = [createdTodo]

      mockTodoApi.createTodo.mockResolvedValue({ data: createdTodo })
      mockTodoApi.fetchTodos.mockResolvedValue({ data: todos })

      // Show add form
      await controller.showAdd()
      expect(controller.mode).toBe(1) // Insert mode
      expect(controller.insertOptions.editPanelVisible).toBe(true)

      // Insert todo
      const result = await controller.insert(createDto)
      expect(result).toEqual(createdTodo)
      expect(controller.mode).toBe(0) // None mode
      expect(controller.insertOptions.editPanelVisible).toBe(false)

      // Verify list was refreshed
      expect(mockTodoApi.fetchTodos).toHaveBeenCalled()
    })

    it('should handle complete edit workflow', async () => {
      const existingTodo: Todo = {
        id: '1',
        title: 'Existing Todo',
        description: 'Existing Description',
        status: 'pending',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-01',
      }
      const updateDto: CreateTodoDto = { title: 'Updated Todo', description: 'Updated Description' }
      const updatedTodo: Todo = {
        ...existingTodo,
        title: 'Updated Todo',
        description: 'Updated Description',
      }

      mockTodoApi.updateTodo.mockResolvedValue({ data: updatedTodo })
      mockTodoApi.fetchTodos.mockResolvedValue({ data: [updatedTodo] })

      // Show edit form
      await controller.showEdit(existingTodo)
      expect(controller.mode).toBe(2) // Update mode
      expect(controller.updateOptions.editPanelVisible).toBe(true)
      expect(controller.updateOptions.modelId).toBe('1')

      // Update todo
      const result = await controller.update(updateDto, '1')
      expect(result).toEqual(updatedTodo)
      expect(controller.mode).toBe(0) // None mode
      expect(controller.updateOptions.editPanelVisible).toBe(false)

      // Verify list was refreshed
      expect(mockTodoApi.fetchTodos).toHaveBeenCalled()
    })
  })
})
