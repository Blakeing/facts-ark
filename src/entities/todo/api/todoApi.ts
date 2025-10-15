/**
 * Todo API
 *
 * Low-level API functions for todo CRUD operations.
 * Uses json-server for local development or real backend API in production.
 */

import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'
import { createRequestBuilder } from '@/shared/api/builders'
import { ValidationStrategy, required, stringLength } from '@/shared/lib/validation'
import {
  TodoStatus,
  type Todo,
  type CreateTodoDto,
  type UpdateTodoDto,
  type TodoStats,
} from '../model/types'

// Validation strategies
const createTodoValidation = new ValidationStrategy()
  .add('title', required('title'))
  .add('title', stringLength('title', 1, 200))
  .add('description', stringLength('description', 0, 1000))

const updateTodoValidation = new ValidationStrategy()
  .add('title', stringLength('title', 1, 200))
  .add('description', stringLength('description', 0, 1000))

/**
 * Fetch all todos
 */
export async function fetchTodos(): Promise<ApiResponse<Todo[]>> {
  return createRequestBuilder(apiClient).get('/todos').execute<Todo[]>()
}

/**
 * Fetch a single todo by ID
 */
export async function fetchTodoById(id: string): Promise<ApiResponse<Todo>> {
  return createRequestBuilder(apiClient).get(`/todos/${id}`).execute<Todo>()
}

/**
 * Create a new todo
 */
export async function createTodo(dto: CreateTodoDto): Promise<ApiResponse<Todo>> {
  // Client-side validation using strategy pattern
  createTodoValidation.validate(dto as unknown as Record<string, unknown>)

  const newTodo = {
    title: dto.title,
    description: dto.description,
    status: TodoStatus.PENDING,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }

  return createRequestBuilder(apiClient).post('/todos').withBody(newTodo).execute<Todo>()
}

/**
 * Update an existing todo
 */
export async function updateTodo(id: string, dto: UpdateTodoDto): Promise<ApiResponse<Todo>> {
  // Client-side validation using strategy pattern
  // Only validate fields that are present
  const fieldsToValidate: Record<string, unknown> = {}
  if (dto.title !== undefined) fieldsToValidate.title = dto.title
  if (dto.description !== undefined) fieldsToValidate.description = dto.description

  if (Object.keys(fieldsToValidate).length > 0) {
    updateTodoValidation.validate(fieldsToValidate)
  }

  const updates = {
    ...dto,
    updatedAt: new Date().toISOString(),
  }

  return createRequestBuilder(apiClient).patch(`/todos/${id}`).withBody(updates).execute<Todo>()
}

/**
 * Delete a todo
 */
export async function deleteTodo(id: string): Promise<ApiResponse<void>> {
  return createRequestBuilder(apiClient).delete(`/todos/${id}`).execute<void>()
}

/**
 * Toggle todo status (pending <-> completed)
 *
 * Optimized: Accepts current status to avoid extra GET request
 */
export async function toggleTodoStatus(
  id: string,
  currentStatus: TodoStatus,
): Promise<ApiResponse<Todo>> {
  const newStatus =
    currentStatus === TodoStatus.COMPLETED ? TodoStatus.PENDING : TodoStatus.COMPLETED
  const updates: Partial<Todo> = {
    status: newStatus,
    updatedAt: new Date().toISOString(),
  }

  if (newStatus === TodoStatus.COMPLETED) {
    updates.completedAt = new Date().toISOString()
  } else {
    updates.completedAt = undefined
  }

  return createRequestBuilder(apiClient).patch(`/todos/${id}`).withBody(updates).execute<Todo>()
}

/**
 * Calculate todo statistics
 */
export async function fetchTodoStats(): Promise<ApiResponse<TodoStats>> {
  // json-server doesn't have aggregation, calculate client-side
  const { data: todos } = await createRequestBuilder(apiClient).get('/todos').execute<Todo[]>()
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
  const { data: todos } = await createRequestBuilder(apiClient).get('/todos').execute<Todo[]>()
  const completedTodos = todos.filter((t) => t.status === TodoStatus.COMPLETED)

  for (const todo of completedTodos) {
    await createRequestBuilder(apiClient).delete(`/todos/${todo.id}`).execute<void>()
  }

  return {
    data: completedTodos.length,
    status: 200,
  }
}
