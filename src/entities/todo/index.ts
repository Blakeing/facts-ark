/**
 * Todo Entity Public API
 *
 * Exports the public interface of the todo entity.
 * Following FSD principles, only these exports are available to other layers.
 */

// Types
export { TodoStatus } from './model/types'
export type { Todo, CreateTodoDto, UpdateTodoDto, TodoFilter, TodoStats } from './model/types'

// Store
export { useTodoStore } from './model/store'

// API (Pinia Colada)
export {
  useTodos,
  useTodoById,
  useTodoStats,
  useCreateTodo,
  useUpdateTodo,
  useDeleteTodo,
  useToggleTodo,
  useClearCompleted,
  todoQueriesKeys,
} from './api/todoQueries'

// UI
export { default as TodoItem } from './ui/TodoItem.vue'
