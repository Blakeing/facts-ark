// Universal Entity Pattern
export { useEntity } from './entity'
export type { EntityHooks, EntityApi } from './entity'

// Form utilities
export { createFormMachine } from './createFormMachine'
export { createFormMachineWithMutation } from './createFormMachineWithMutation'
export { useFormMachine } from './useFormMachine'
export { useWizard } from './useWizard'
export { useFormDirtyCheck, type ConfirmFunction } from './useFormDirtyCheck'

// Enum utilities
export { EnumController, type EnumChoice } from './enum'

// Cache utilities (keeping existing)
export { QueryCacheFacade, createQueryCacheFacade } from './cache/QueryCacheFacade'
export type { QueryKey, ItemPredicate, ItemUpdater } from './cache/QueryCacheFacade'
