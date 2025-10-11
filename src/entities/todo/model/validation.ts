import { z } from 'zod'

/**
 * Todo Entity Validation Schemas
 */

export const createTodoSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(200, 'Title must be 200 characters or fewer'),
  description: z
    .string()
    .trim()
    .max(1000, 'Description must be 1000 characters or fewer')
    .default(''),
})

export type CreateTodoFormValues = z.infer<typeof createTodoSchema>
