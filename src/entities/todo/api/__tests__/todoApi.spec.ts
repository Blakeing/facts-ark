import { beforeEach, describe, expect, it, vi } from 'vitest'

import * as todoApi from '../todoApi'
import { apiClient } from '@/shared/api/client'
import { TodoStatus, type Todo } from '@/entities/todo'

vi.mock('@/shared/api/client', () => ({
  apiClient: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
    validateRequired: vi.fn(),
    validateLength: vi.fn(),
  },
}))

describe('todoApi', () => {
  const todo: Todo = {
    id: '1',
    title: 'Test',
    status: TodoStatus.PENDING,
    createdAt: '2025-01-01T00:00:00.000Z',
    updatedAt: '2025-01-01T00:00:00.000Z',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchTodos retrieves todo list', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: [todo], status: 200 })

    const response = await todoApi.fetchTodos()

    expect(apiClient.get).toHaveBeenCalledWith('/todos')
    expect(response.data).toEqual([todo])
  })

  it('fetchTodoById retrieves single todo', async () => {
    vi.mocked(apiClient.get).mockResolvedValue({ data: todo, status: 200 })

    const response = await todoApi.fetchTodoById('1')

    expect(apiClient.get).toHaveBeenCalledWith('/todos/1')
    expect(response.data).toEqual(todo)
  })

  it('createTodo validates input and creates todo', async () => {
    vi.mocked(apiClient.post).mockResolvedValue({ data: todo, status: 201 })

    const response = await todoApi.createTodo({ title: 'Test', description: 'Details' })

    expect(apiClient.post).toHaveBeenCalledWith(
      '/todos',
      expect.objectContaining({ title: 'Test', description: 'Details' }),
    )
    expect(response.data).toEqual(todo)
  })

  it('updateTodo validates fields and updates todo', async () => {
    vi.mocked(apiClient.patch).mockResolvedValue({ data: todo, status: 200 })

    const response = await todoApi.updateTodo('1', { title: 'Updated' })

    expect(apiClient.patch).toHaveBeenCalledWith(
      '/todos/1',
      expect.objectContaining({ title: 'Updated' }),
    )
    expect(response.data).toEqual(todo)
  })

  it('deleteTodo removes todo', async () => {
    vi.mocked(apiClient.delete).mockResolvedValue({ data: undefined, status: 200 })

    const response = await todoApi.deleteTodo('1')

    expect(apiClient.delete).toHaveBeenCalledWith('/todos/1')
    expect(response.status).toBe(200)
  })

  it('toggleTodoStatus toggles and updates todo', async () => {
    const completedTodo = { ...todo, status: TodoStatus.COMPLETED }
    vi.mocked(apiClient.get).mockResolvedValueOnce({ data: todo, status: 200 })
    vi.mocked(apiClient.patch).mockResolvedValue({ data: completedTodo, status: 200 })

    const response = await todoApi.toggleTodoStatus('1')

    expect(apiClient.get).toHaveBeenCalledWith('/todos/1')
    expect(apiClient.patch).toHaveBeenCalledWith(
      '/todos/1',
      expect.objectContaining({ status: TodoStatus.COMPLETED }),
    )
    expect(response.data).toEqual(completedTodo)
  })

  it('fetchTodoStats returns aggregated stats', async () => {
    const todos = [todo, { ...todo, id: '2', status: TodoStatus.COMPLETED }]
    vi.mocked(apiClient.get).mockResolvedValue({ data: todos, status: 200 })

    const response = await todoApi.fetchTodoStats()

    expect(apiClient.get).toHaveBeenCalledWith('/todos')
    expect(response.data).toEqual({ total: 2, completed: 1, pending: 1 })
  })

  it('clearCompletedTodos deletes completed todos', async () => {
    const todos = [
      { ...todo, id: '1', status: TodoStatus.COMPLETED },
      { ...todo, id: '2', status: TodoStatus.PENDING },
    ]
    vi.mocked(apiClient.get).mockResolvedValue({ data: todos, status: 200 })
    vi.mocked(apiClient.delete).mockResolvedValue({ data: undefined, status: 200 })

    const response = await todoApi.clearCompletedTodos()

    expect(apiClient.get).toHaveBeenCalledWith('/todos')
    expect(apiClient.delete).toHaveBeenCalledWith('/todos/1')
    expect(response.data).toBe(1)
  })
})
