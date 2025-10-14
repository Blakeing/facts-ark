/**
 * Multi-Step Form Feature - Public API
 *
 * Example feature demonstrating XState integration for complex workflows.
 */

// Machine
export { formWizardMachine } from './model/machines/form-wizard.machine'
export type {
  FormWizardMachine,
  FormWizardActor,
  FormWizardSnapshot,
} from './model/machines/form-wizard.machine'

// Types
export type {
  FormWizardContext,
  FormWizardEvent,
  FormWizardInput,
  FormData,
  BasicInfoData,
  DetailsData,
  AdditionalData,
} from './model/machines/types'

// Composable
export { useFormWizard } from './model/useFormWizard'
export type { UseFormWizardReturn } from './model/useFormWizard'
