import { useEntity } from '@/shared/lib/entity'
import * as todoApi from '../api/todoApi'
import type { Todo, CreateTodoDto } from './types'

export function useTodoEntityWithHooks() {
  return useEntity<CreateTodoDto, Todo>(
    'todo',
    {
      list: async () => (await todoApi.fetchTodos()).data,
      create: async (data) => (await todoApi.createTodo(data)).data,
      update: async (id, data) => (await todoApi.updateTodo(id, data)).data,
      delete: async (id) => await todoApi.deleteTodo(id),
    },
    {
      // Optional hooks - only add when needed!
      beforeSave: async (todo) => {
        // Validation
        if (todo.title.trim().length < 3) {
          throw new Error('Title must be at least 3 characters')
        }

        // Transform data
        todo.title = todo.title.trim()
      },

      afterSave: async (todo, result) => {
        // Notifications
        console.log('Todo saved!', result)

        // Analytics
        // trackEvent('todo_saved', { id: result.id })
      },

      afterDelete: async (id) => {
        console.log('Todo deleted!', id)
      },
    },
  )
}
