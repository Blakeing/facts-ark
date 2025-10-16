import { Controller } from './Controller'
import type { EditOptions } from './types'
import { ControllerActionMode } from './types'

export abstract class CombinedController<TListing, TModel, TSaveResult, TApi> extends Controller<
  TListing,
  TModel,
  TSaveResult,
  TModel,
  TSaveResult,
  TApi
> {
  private _editOptions: EditOptions<TModel> = {
    model: {} as TModel,
    editPanelVisible: false,
    saveError: '',
    modelId: '',
    enableSave: true,
    formTitle: '',
    busy: false,
  }

  public get editOptions(): EditOptions<TModel> {
    return this._editOptions
  }

  public get insertOptions(): EditOptions<TModel> {
    return this.editOptions
  }

  public get updateOptions(): EditOptions<TModel> {
    return this.editOptions
  }

  public async save(model: TModel, id: string): Promise<void> {
    await this.saveWithResult(model, id)
    // The base class expects void, so we don't return the result
  }

  public async saveWithResult(model: TModel, id: string): Promise<TSaveResult | undefined> {
    if (this.mode === ControllerActionMode.Insert) {
      return this.insert(model)
    } else if (this.mode === ControllerActionMode.Update) {
      return this.update(model, id)
    }
    return Promise.resolve(undefined)
  }

  public insertFormTitle: string = 'Add'
  public updateFormTitle: string = 'Edit'

  protected prepareInsertOptions(_options: EditOptions<TModel>): Promise<void> {
    this.editOptions.formTitle = this.insertFormTitle
    return Promise.resolve()
  }

  protected prepareUpdateOptions(_options: EditOptions<TModel>): Promise<void> {
    this.editOptions.formTitle = this.updateFormTitle
    return Promise.resolve()
  }
}
