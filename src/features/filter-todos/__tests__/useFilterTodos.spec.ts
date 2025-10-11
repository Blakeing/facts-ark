import { beforeEach, describe, expect, it } from 'vitest'
import { ref } from 'vue'

import { useFilterTodos } from '../model/useFilterTodos'
import { TodoStatus } from '@/entities/todo'
import type { Todo } from '@/entities/todo'
import { withSetup } from '@/__tests__/helpers/withSetup'

describe('useFilterTodos', () => {
  const todos: Todo[] = [
    {
      id: '1',
      title: 'Learn Vue',
      description: 'Study basics',
      status: TodoStatus.PENDING,
      createdAt: '2025-01-01T00:00:00.000Z',
      updatedAt: '2025-01-01T00:00:00.000Z',
    },
    {
      id: '2',
      title: 'Build Todo App',
      description: 'Use Pinia and Colada',
      status: TodoStatus.COMPLETED,
      createdAt: '2025-01-02T00:00:00.000Z',
      updatedAt: '2025-01-02T00:00:00.000Z',
    },
  ]

  beforeEach(() => {
    // Reset any state if needed
  })

  it('returns filtered todos from the store', () => {
    const [result, unmount] = withSetup(() => useFilterTodos(ref(todos)))
    expect(result.filteredTodos.value).toEqual(todos)
    unmount()
  })

  it('updates filter state via setFilter', () => {
    const [{ setFilter, currentFilter }, unmount] = withSetup(() => useFilterTodos(ref(todos)))

    setFilter('completed')

    expect(currentFilter.value).toBe('completed')
    unmount()
  })

  it('updates search query via setSearchQuery', () => {
    const [{ setSearchQuery, searchQuery }, unmount] = withSetup(() => useFilterTodos(ref(todos)))

    setSearchQuery('vue')

    expect(searchQuery.value).toBe('vue')
    unmount()
  })

  it('exposes filter options for UI consumption', () => {
    const [{ filterOptions }, unmount] = withSetup(() => useFilterTodos(ref(todos)))

    expect(filterOptions).toEqual([
      { value: 'all', label: 'All' },
      { value: 'pending', label: 'Active' },
      { value: 'completed', label: 'Completed' },
    ])
    unmount()
  })

  it('filters todos by status', () => {
    const [{ setFilter, filteredTodos }, unmount] = withSetup(() => useFilterTodos(ref(todos)))

    setFilter('pending')

    expect(filteredTodos.value).toEqual([todos[0]])
    unmount()
  })

  it('filters todos by search query', () => {
    const [{ setSearchQuery, filteredTodos }, unmount] = withSetup(() => useFilterTodos(ref(todos)))

    setSearchQuery('Vue')

    expect(filteredTodos.value).toEqual([todos[0]])
    unmount()
  })
})
