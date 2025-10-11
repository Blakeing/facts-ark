import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useDeleteTodo } from '../model/useDeleteTodo'
import * as todoApi from '@/entities/todo/api/todoApi'
import { withSetup } from '@/__tests__/helpers/withSetup'

describe('useDeleteTodo', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('deletes todo successfully', async () => {
    vi.spyOn(todoApi, 'deleteTodo').mockResolvedValue({ data: undefined, status: 200 })

    const [{ deleteTodo, isPending, isError }, unmount] = withSetup(() => useDeleteTodo())

    const promise = deleteTodo('1')
    expect(isPending.value).toBe(true)

    await promise

    expect(todoApi.deleteTodo).toHaveBeenCalledExactlyOnceWith('1')
    expect(isPending.value).toBe(false)
    expect(isError.value).toBe(false)

    unmount()
  })

  it('sets error state when deletion fails', async () => {
    vi.spyOn(todoApi, 'deleteTodo').mockRejectedValue(new Error('Network error'))

    const [{ deleteTodo, isError }, unmount] = withSetup(() => useDeleteTodo())

    await expect(deleteTodo('1')).rejects.toThrow('Network error')

    expect(isError.value).toBe(true)

    unmount()
  })

  it('exposes error details when mutation fails', async () => {
    const networkError = new Error('Network error')
    vi.spyOn(todoApi, 'deleteTodo').mockRejectedValue(networkError)

    const [{ deleteTodo, error }, unmount] = withSetup(() => useDeleteTodo())

    await expect(deleteTodo('1')).rejects.toThrow()

    expect(error.value).toBe(networkError)

    unmount()
  })
})
