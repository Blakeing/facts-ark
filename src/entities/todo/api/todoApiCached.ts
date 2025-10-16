import { CachedApiCall } from '@/shared/lib/cache'
import type { Todo } from '../model/types'

const todoCachedApiCall = new CachedApiCall<Todo, string>(
  'todos-cache',
  () => '/todos',
  null,
  () => console.log('Todos cache loaded'),
)

export async function fetchTodosCached(): Promise<Todo[]> {
  return todoCachedApiCall.getData('')
}

export function refreshTodosCache(): Promise<Todo[]> {
  return todoCachedApiCall.refresh('')
}

export function clearTodosCache(): void {
  todoCachedApiCall.clearCache()
}

export function makeTodosCacheStale(): void {
  todoCachedApiCall.cache.makeStale('')
}
