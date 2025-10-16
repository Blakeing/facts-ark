import { BaseController } from './BaseController'
import type { EditOptions, ControllerActionMode, BeforeSaveHook, AfterSaveHook } from './types'
import { ControllerActionMode as Mode } from './types'

export abstract class Controller<
  TListing,
  TAddModel,
  TInsertResult,
  TEditModel,
  TUpdateResult,
  TApi,
> extends BaseController<TAddModel, TListing, TApi> {
  public mode: ControllerActionMode = Mode.None
  public autoCloseOnSave: boolean = true

  // Lifecycle hooks
  protected beforeSave?: BeforeSaveHook<TAddModel | TEditModel>
  protected afterSave?: AfterSaveHook<TAddModel | TEditModel, TInsertResult | TUpdateResult>

  // Insert options
  private _insertOptions: EditOptions<TAddModel> = {
    model: {} as TAddModel,
    editPanelVisible: false,
    saveError: '',
    modelId: '',
    enableSave: true,
    formTitle: '',
    busy: false,
  }

  public get insertOptions(): EditOptions<TAddModel> {
    return this._insertOptions
  }

  // Update options
  private _updateOptions: EditOptions<TEditModel> = {
    model: {} as TEditModel,
    editPanelVisible: false,
    saveError: '',
    modelId: '',
    enableSave: true,
    formTitle: '',
    busy: false,
  }

  public get updateOptions(): EditOptions<TEditModel> {
    return this._updateOptions
  }

  public async showAdd(): Promise<void> {
    try {
      this.listOptions.busy = true
      this.insertOptions.busy = true
      this.mode = Mode.Insert
      this.insertOptions.modelId = ''
      this.insertOptions.saveError = ''
      this.insertOptions.model = await this.getAddModel()
      await this.prepareInsertOptions(this.insertOptions)
      this.insertOptions.busy = false
      this.listOptions.busy = false
      this.insertOptions.editPanelVisible = true
    } catch (error) {
      console.error('Error showing add form:', error)
    } finally {
      this.insertOptions.busy = false
      this.listOptions.busy = false
    }
  }

  public async showEdit(model: TListing): Promise<void> {
    try {
      this.updateOptions.busy = true
      this.listOptions.busy = true
      this.mode = Mode.Update
      const entity = await this.getEditModel(model)
      this.updateOptions.saveError = ''
      this.updateOptions.model = entity
      this.updateOptions.modelId = await this.getEditModelId(model)
      await this.prepareUpdateOptions(this.updateOptions)
      this.updateOptions.busy = false
      this.listOptions.busy = false
      this.updateOptions.editPanelVisible = true
    } catch (error) {
      console.error('Error showing edit form:', error)
    } finally {
      this.updateOptions.busy = false
      this.listOptions.busy = false
    }
  }

  public async insert(model: TAddModel): Promise<TInsertResult | undefined> {
    try {
      this.insertOptions.busy = true
      this.insertOptions.saveError = null
      this.insertOptions.enableSave = false

      // Call beforeSave hook if provided
      if (this.beforeSave) {
        await this.beforeSave(model)
      }

      const result = await this.performInsert(model)

      // Call afterSave hook if provided
      if (this.afterSave && result) {
        await this.afterSave(model, result)
      }

      this.mode = Mode.None
      if (this.autoCloseOnSave) {
        this.insertOptions.editPanelVisible = false
      }
      await this.loadRows()
      return result
    } catch (error) {
      this.insertOptions.saveError = error instanceof Error ? error.message : 'Save failed'
      return undefined
    } finally {
      this.insertOptions.busy = false
      this.insertOptions.enableSave = true
    }
  }

  public async update(model: TEditModel, id: string): Promise<TUpdateResult | undefined> {
    try {
      this.updateOptions.busy = true
      this.updateOptions.enableSave = false
      this.updateOptions.saveError = null

      // Call beforeSave hook if provided
      if (this.beforeSave) {
        await this.beforeSave(model)
      }

      const result = await this.performUpdate(model, id)

      // Call afterSave hook if provided
      if (this.afterSave && result) {
        await this.afterSave(model, result)
      }

      this.mode = Mode.None
      if (this.autoCloseOnSave) {
        this.updateOptions.editPanelVisible = false
      }
      await this.loadRows()
      return result
    } catch (error) {
      this.updateOptions.saveError = error instanceof Error ? error.message : 'Update failed'
      return undefined
    } finally {
      this.updateOptions.busy = false
      this.updateOptions.enableSave = true
    }
  }

  protected prepareInsertOptions(_options: EditOptions<TAddModel>): Promise<void> {
    return Promise.resolve()
  }

  protected prepareUpdateOptions(_options: EditOptions<TEditModel>): Promise<void> {
    return Promise.resolve()
  }

  protected getEditModelId(model: TListing): Promise<string> {
    return Promise.resolve((model as { id?: string }).id || '')
  }

  protected abstract getAddModel(): Promise<TAddModel>
  protected abstract getEditModel(model: TListing): Promise<TEditModel>
  protected abstract performInsert(model: TAddModel): Promise<TInsertResult | undefined>
  protected abstract performUpdate(
    model: TEditModel,
    id: string,
  ): Promise<TUpdateResult | undefined>
}
