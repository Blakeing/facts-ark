/**
 * Multi-Step Form Feature - Public API
 *
 * Example feature demonstrating XState integration for complex workflows.
 */

// Machine (keeping for reference, but prefer unified pattern)
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

// Unified Form Composable (Recommended)
export { useFormWizardUnified } from './model/useFormWizardUnified'
