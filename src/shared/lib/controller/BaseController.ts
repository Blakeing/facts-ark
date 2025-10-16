import type { ListOptions, EditOptions } from './types'

export abstract class BaseController<TModel, TListing, TApi> {
  private _api: TApi

  constructor(api: TApi) {
    this._api = api
  }

  public get api(): TApi {
    return this._api
  }

  protected _listOptions: ListOptions = {
    searchString: '',
    searchEnabled: true,
    title: 'Untitled',
    addButtonText: 'Add Item',
    addEnabled: true,
    editEnabled: true,
    sortColumn: '',
    sortDescending: false,
    rows: [],
    loadError: undefined,
    loading: true,
    busy: false,
  }

  public get listOptions(): ListOptions {
    return this._listOptions
  }

  public get rows(): TListing[] {
    return this._listOptions.rows as TListing[]
  }

  private _editModel: EditOptions<TModel> = {
    model: {} as TModel,
    editPanelVisible: false,
    saveError: '',
    modelId: '',
    enableSave: true,
    formTitle: '',
    busy: false,
  }

  public get editOptions(): EditOptions<TModel> {
    return this._editModel
  }

  public abstract showAdd(): Promise<void>
  public abstract showEdit(model: TListing): Promise<void>
  public abstract save(item: TModel, id: string): Promise<void>
  public abstract getListing(): Promise<TListing[]>

  public async loadRows(): Promise<void> {
    try {
      this.listOptions.loading = true
      this.listOptions.loadError = ''
      this.listOptions.rows = await this.getListing()
    } catch (error) {
      this.listOptions.loadError = error instanceof Error ? error.message : 'Error loading data'
      this.listOptions.rows = []
    } finally {
      this.listOptions.loading = false
    }
  }
}
