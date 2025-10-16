import { EnumController } from '@/shared/lib/enum'
import { TodoStatus } from './types'

export class TodoStatusEnumController extends EnumController<TodoStatus> {
  constructor() {
    super()
    this.choices.push({
      id: TodoStatus.PENDING,
      name: 'Pending',
      description: 'Task not yet completed',
    })
    this.choices.push({
      id: TodoStatus.COMPLETED,
      name: 'Completed',
      description: 'Task finished',
    })
  }
}

export const todoStatusEnum = new TodoStatusEnumController()
