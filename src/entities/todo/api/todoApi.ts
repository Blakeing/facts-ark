/**
 * Todo API
 *
 * Low-level API functions for todo CRUD operations.
 * Uses the mock database for this demo.
 * In a real app, these would be fetch/axios calls to a backend.
 */

import { MockDb } from '@/shared/api/mockDb'
import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'
import type { Todo, CreateTodoDto, UpdateTodoDto, TodoStats } from '../model/types'
import { TodoStatus } from '../model/types'

// Create typed instance for todos
const todosDb = new MockDb<Todo>('facts-ark-todos')

/**
 * Generate a unique ID for a new todo
 */
function generateId(): string {
  return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Fetch all todos
 */
export async function fetchTodos(): Promise<ApiResponse<Todo[]>> {
  return apiClient.execute(async () => {
    const todos = await todosDb.getAll()
    // Sort by creation date (newest first)
    return todos.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  })
}

/**
 * Fetch a single todo by ID
 */
export async function fetchTodoById(id: string): Promise<ApiResponse<Todo>> {
  return apiClient.execute(async () => {
    const todo = await todosDb.getById(id)
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`)
    }
    return todo
  })
}

/**
 * Create a new todo
 */
export async function createTodo(dto: CreateTodoDto): Promise<ApiResponse<Todo>> {
  return apiClient.execute(async () => {
    // Validation
    apiClient.validateRequired(dto.title, 'title')
    apiClient.validateLength(dto.title, 'title', 1, 200)

    if (dto.description) {
      apiClient.validateLength(dto.description, 'description', 0, 1000)
    }

    const now = new Date().toISOString()
    const todo: Todo = {
      id: generateId(),
      title: dto.title.trim(),
      description: dto.description?.trim(),
      status: TodoStatus.PENDING,
      createdAt: now,
      updatedAt: now,
    }

    return todosDb.create(todo)
  })
}

/**
 * Update an existing todo
 */
export async function updateTodo(id: string, dto: UpdateTodoDto): Promise<ApiResponse<Todo>> {
  return apiClient.execute(async () => {
    const existing = await todosDb.getById(id)
    if (!existing) {
      throw new Error(`Todo with id ${id} not found`)
    }

    // Validation
    if (dto.title !== undefined) {
      apiClient.validateRequired(dto.title, 'title')
      apiClient.validateLength(dto.title, 'title', 1, 200)
    }

    if (dto.description !== undefined && dto.description) {
      apiClient.validateLength(dto.description, 'description', 0, 1000)
    }

    const updates: Partial<Todo> = {
      updatedAt: new Date().toISOString(),
    }

    if (dto.title !== undefined) {
      updates.title = dto.title.trim()
    }

    if (dto.description !== undefined) {
      updates.description = dto.description?.trim()
    }

    if (dto.status !== undefined) {
      updates.status = dto.status
      if (dto.status === TodoStatus.COMPLETED) {
        updates.completedAt = new Date().toISOString()
      } else {
        updates.completedAt = undefined
      }
    }

    return todosDb.update(id, updates)
  })
}

/**
 * Delete a todo
 */
export async function deleteTodo(id: string): Promise<ApiResponse<void>> {
  return apiClient.execute(async () => {
    await todosDb.delete(id)
  })
}

/**
 * Toggle todo status (pending <-> completed)
 */
export async function toggleTodoStatus(id: string): Promise<ApiResponse<Todo>> {
  return apiClient.execute(async () => {
    const existing = await todosDb.getById(id)
    if (!existing) {
      throw new Error(`Todo with id ${id} not found`)
    }

    const newStatus =
      existing.status === TodoStatus.COMPLETED ? TodoStatus.PENDING : TodoStatus.COMPLETED

    return todosDb.update(id, {
      status: newStatus,
      completedAt: newStatus === TodoStatus.COMPLETED ? new Date().toISOString() : undefined,
      updatedAt: new Date().toISOString(),
    })
  })
}

/**
 * Calculate todo statistics
 */
export async function fetchTodoStats(): Promise<ApiResponse<TodoStats>> {
  return apiClient.execute(async () => {
    const todos = await todosDb.getAll()
    return {
      total: todos.length,
      pending: todos.filter((t) => t.status === TodoStatus.PENDING).length,
      completed: todos.filter((t) => t.status === TodoStatus.COMPLETED).length,
    }
  })
}

/**
 * Clear all completed todos
 */
export async function clearCompletedTodos(): Promise<ApiResponse<number>> {
  return apiClient.execute(async () => {
    const todos = await todosDb.getAll()
    const completedTodos = todos.filter((t) => t.status === TodoStatus.COMPLETED)

    for (const todo of completedTodos) {
      await todosDb.delete(todo.id)
    }

    return completedTodos.length
  })
}
