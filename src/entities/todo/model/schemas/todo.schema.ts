import { z } from 'zod'

/**
 * Core todo validation schema
 *
 * This is the single source of truth for todo validation.
 * Used across forms, API, and XState machines.
 */
export const todoSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  description: z.string().max(1000, 'Description must be less than 1000 characters').optional(),
  status: z.enum(['draft', 'pending', 'completed']).default('draft'),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  category: z.enum(['work', 'personal', 'other']).default('work'),
})

export type TodoFormData = z.infer<typeof todoSchema>

/**
 * Partial schemas for multi-step wizard
 */
export const todoBasicInfoSchema = todoSchema.pick({
  title: true,
  category: true,
})

export type TodoBasicInfo = z.infer<typeof todoBasicInfoSchema>

export const todoDetailsSchema = todoSchema.pick({
  description: true,
  priority: true,
})

export type TodoDetails = z.infer<typeof todoDetailsSchema>

/**
 * Schema for additional wizard step (if needed)
 */
export const todoAdditionalSchema = z.object({
  tags: z.array(z.string()).optional(),
  notes: z.string().optional(),
})

export type TodoAdditional = z.infer<typeof todoAdditionalSchema>
