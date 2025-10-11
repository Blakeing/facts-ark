/**
 * Todo Entity Types
 *
 * Core domain types for the Todo entity.
 * These types are used across all layers of the application.
 */

export enum TodoStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export interface Todo {
  id: number
  title: string
  description?: string
  status: TodoStatus
  createdAt: string
  updatedAt: string
  completedAt?: string
}

export interface CreateTodoDto {
  title: string
  description?: string
}

export interface UpdateTodoDto {
  title?: string
  description?: string
  status?: TodoStatus
}

export type TodoFilter = 'all' | 'pending' | 'completed'

export interface TodoStats {
  total: number
  pending: number
  completed: number
}
