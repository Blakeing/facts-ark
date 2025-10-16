/**
 * Todo Entity Public API
 *
 * Exports the public interface of the todo entity.
 * Following FSD principles, only these exports are available to other layers.
 */

// Types
// Existing exports
export { TodoStatus } from './model/types'
export type { Todo, CreateTodoDto, UpdateTodoDto, TodoFilter, TodoStats } from './model/types'

// Universal entity pattern
export { useTodoEntity } from './model/useTodoEntity'
export { useTodoEntityWithHooks } from './model/useTodoEntityWithHooks'
export { todoStatusEnum } from './model/enums'
export { createTodoSchema, type CreateTodoFormValues } from './model/validation'

// Zod Schemas (Unified Form Architecture)
export {
  todoSchema,
  todoBasicInfoSchema,
  todoDetailsSchema,
  todoAdditionalSchema,
} from './model/schemas'
export type { TodoFormData, TodoBasicInfo, TodoDetails, TodoAdditional } from './model/schemas'

// Store
export { useTodoStore } from './model/store'

// State Machine
export { todoLifecycleMachine } from './model/machines/todo-lifecycle.machine'
export type {
  TodoLifecycleMachine,
  TodoLifecycleActor,
  TodoLifecycleSnapshot,
} from './model/machines/todo-lifecycle.machine'
export type {
  TodoMachineContext,
  TodoMachineEvent,
  TodoMachineInput,
  TodoMachineOutput,
  TodoWorkflowState,
} from './model/machines/types'
export { useTodoMachine } from './model/useTodoMachine'
export type { UseTodoMachineReturn } from './model/useTodoMachine'

// API (Pinia Colada)
export { useTodos, useTodoById, useTodoStats, todoQueriesKeys } from './api/todoQueries'

// API Functions
export {
  fetchTodos,
  fetchTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
  toggleTodoStatus,
  fetchTodoStats,
  clearCompletedTodos,
} from './api/todoApi'

// UI
export { default as TodoItem } from './ui/TodoItem.vue'
