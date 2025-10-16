import { useEntity } from '@/shared/lib/entity'
import * as todoApi from '../api/todoApi'
import type { Todo, CreateTodoDto } from './types'

export function useTodoEntity() {
  return useEntity<CreateTodoDto, Todo>(
    'todo',
    {
      list: async () => (await todoApi.fetchTodos()).data,
      create: async (data) => (await todoApi.createTodo(data)).data,
      update: async (id, data) => (await todoApi.updateTodo(id, data)).data,
      delete: async (id) => await todoApi.deleteTodo(id),
    },
    // No hooks needed for simple case!
  )
}
