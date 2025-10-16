import { CombinedController } from '@/shared/lib/controller'
import type { Todo, CreateTodoDto } from './types'
import * as todoApi from '../api/todoApi'

export class TodoController extends CombinedController<Todo, CreateTodoDto, Todo, typeof todoApi> {
  constructor() {
    super(todoApi)

    this.listOptions.title = 'Todos'
    this.listOptions.addButtonText = 'Add Todo'
    this.listOptions.searchEnabled = true
  }

  public insertFormTitle = 'Add Todo'
  public updateFormTitle = 'Edit Todo'

  public async getListing(): Promise<Todo[]> {
    const response = await this.api.fetchTodos()
    return response.data
  }

  protected async getAddModel(): Promise<CreateTodoDto> {
    return {
      title: '',
      description: '',
    }
  }

  protected async getEditModel(model: Todo): Promise<CreateTodoDto> {
    return {
      title: model.title,
      description: model.description,
    }
  }

  protected async performInsert(model: CreateTodoDto): Promise<Todo | undefined> {
    const response = await this.api.createTodo(model)
    return response.data
  }

  protected async performUpdate(model: CreateTodoDto, id: string): Promise<Todo | undefined> {
    const response = await this.api.updateTodo(id, model)
    return response.data
  }
}

export const todoController = new TodoController()
