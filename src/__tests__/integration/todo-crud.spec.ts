import { describe, beforeEach, it, expect } from 'vitest'

import { resetTestDb, getTestApiUrl } from '@/__tests__/helpers/testServer'
import type { Todo } from '@/entities/todo'

const baseUrl = getTestApiUrl()

async function fetchTodos() {
  const response = await fetch(`${baseUrl}/todos`)
  if (!response.ok) throw new Error('Failed to fetch todos')
  return (await response.json()) as Todo[]
}

describe('Todo CRUD integration', () => {
  beforeEach(async () => {
    await resetTestDb()
  })

  it('performs full CRUD flow', async () => {
    // Initial fetch
    let todos = await fetchTodos()
    expect(todos.length).toBeGreaterThan(0)

    // Create
    const createResponse = await fetch(`${baseUrl}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Integration Todo',
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    })
    expect(createResponse.status).toBe(201)
    const created = (await createResponse.json()) as Todo
    expect(created.title).toBe('Integration Todo')

    // Toggle (PATCH)
    const toggleResponse = await fetch(`${baseUrl}/todos/${created.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        status: 'completed',
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }),
    })
    expect(toggleResponse.ok).toBe(true)
    const toggled = (await toggleResponse.json()) as Todo
    expect(toggled.status).toBe('completed')

    // Update
    const updateResponse = await fetch(`${baseUrl}/todos/${created.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'Updated Integration Todo' }),
    })
    expect(updateResponse.ok).toBe(true)
    const updated = (await updateResponse.json()) as Todo
    expect(updated.title).toBe('Updated Integration Todo')

    // Delete
    const deleteResponse = await fetch(`${baseUrl}/todos/${created.id}`, {
      method: 'DELETE',
    })
    expect(deleteResponse.ok).toBe(true)

    todos = await fetchTodos()
    expect(todos.find((todo) => todo.id === created.id)).toBeUndefined()
  })

  it('handles error when deleting non-existent todo', async () => {
    const response = await fetch(`${baseUrl}/todos/non-existent`, {
      method: 'DELETE',
    })

    expect(response.ok).toBe(false)
  })
})
