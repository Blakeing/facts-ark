/**
 * Todo API
 *
 * Low-level API functions for todo CRUD operations.
 * Uses json-server for local development or real backend API in production.
 */

import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'
import {
  TodoStatus,
  type Todo,
  type CreateTodoDto,
  type UpdateTodoDto,
  type TodoStats,
} from '../model/types'

/**
 * Fetch all todos
 */
export async function fetchTodos(): Promise<ApiResponse<Todo[]>> {
  return apiClient.get<Todo[]>('/todos')
}

/**
 * Fetch a single todo by ID
 */
export async function fetchTodoById(id: number): Promise<ApiResponse<Todo>> {
  return apiClient.get<Todo>(`/todos/${id}`)
}

/**
 * Create a new todo
 */
export async function createTodo(dto: CreateTodoDto): Promise<ApiResponse<Todo>> {
  // Client-side validation
  apiClient.validateRequired(dto.title, 'title')
  apiClient.validateLength(dto.title, 'title', 1, 200)

  if (dto.description) {
    apiClient.validateLength(dto.description, 'description', 0, 1000)
  }

  const newTodo = {
    title: dto.title,
    description: dto.description,
    status: TodoStatus.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return apiClient.post<Todo>('/todos', newTodo)
}

/**
 * Update an existing todo
 */
export async function updateTodo(id: number, dto: UpdateTodoDto): Promise<ApiResponse<Todo>> {
  // Client-side validation
  if (dto.title !== undefined) {
    apiClient.validateRequired(dto.title, 'title')
    apiClient.validateLength(dto.title, 'title', 1, 200)
  }

  if (dto.description !== undefined && dto.description) {
    apiClient.validateLength(dto.description, 'description', 0, 1000)
  }

  const updates = {
    ...dto,
    updatedAt: new Date().toISOString(),
  }

  return apiClient.patch<Todo>(`/todos/${id}`, updates)
}

/**
 * Delete a todo
 */
export async function deleteTodo(id: number): Promise<ApiResponse<void>> {
  return apiClient.delete<void>(`/todos/${id}`)
}

/**
 * Toggle todo status (pending <-> completed)
 */
export async function toggleTodoStatus(id: number): Promise<ApiResponse<Todo>> {
  // Fetch current todo, toggle status, then update
  const { data: todo } = await apiClient.get<Todo>(`/todos/${id}`)
  const newStatus = todo.status === TodoStatus.COMPLETED ? TodoStatus.PENDING : TodoStatus.COMPLETED
  const updates: Partial<Todo> = {
    status: newStatus,
    updatedAt: new Date().toISOString(),
  }

  if (newStatus === TodoStatus.COMPLETED) {
    updates.completedAt = new Date().toISOString()
  } else {
    updates.completedAt = undefined
  }

  return apiClient.patch<Todo>(`/todos/${id}`, updates)
}

/**
 * Calculate todo statistics
 */
export async function fetchTodoStats(): Promise<ApiResponse<TodoStats>> {
  // json-server doesn't have aggregation, calculate client-side
  const { data: todos } = await apiClient.get<Todo[]>('/todos')
  const total = todos.length
  const completed = todos.filter((t) => t.status === TodoStatus.COMPLETED).length
  const pending = total - completed

  return {
    data: { total, completed, pending },
    status: 200,
  }
}

/**
 * Clear all completed todos
 */
export async function clearCompletedTodos(): Promise<ApiResponse<number>> {
  // json-server doesn't support bulk delete, delete one by one
  const { data: todos } = await apiClient.get<Todo[]>('/todos')
  const completedTodos = todos.filter((t) => t.status === TodoStatus.COMPLETED)

  for (const todo of completedTodos) {
    await apiClient.delete(`/todos/${todo.id}`)
  }

  return {
    data: completedTodos.length,
    status: 200,
  }
}
