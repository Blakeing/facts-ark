export interface ListOptions {
  searchString: string
  searchEnabled: boolean
  title: string
  addButtonText: string
  addEnabled: boolean
  editEnabled: boolean
  sortColumn: string
  sortDescending: boolean
  rows: any[]
  loadError?: string
  loading: boolean
  busy: boolean
}

export interface EditOptions<TModel> {
  model: TModel
  editPanelVisible: boolean
  saveError?: string | null
  modelId: string
  enableSave: boolean
  formTitle: string
  busy: boolean
}

export enum ControllerActionMode {
  None,
  Insert,
  Update,
}

// Lifecycle hooks from Facts pattern
export type BeforeSaveHook<TModel> = (model: TModel) => Promise<void>
export type AfterSaveHook<TModel, TResult> = (model: TModel, result: TResult) => Promise<void>

export interface IdProvider {
  id: string
}

export interface IdSoftDeleteProvider extends IdProvider {
  isDeleted: boolean
}
