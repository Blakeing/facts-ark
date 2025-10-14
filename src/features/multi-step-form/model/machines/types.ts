/**
 * Multi-Step Form Wizard - Machine Types
 *
 * Demonstrates a complex form wizard with validation, navigation,
 * and integration with Pinia Colada for final submission.
 */

/**
 * Form data for step 1 (Basic Info)
 */
export interface BasicInfoData {
  title: string
  category: 'work' | 'personal' | 'other'
}

/**
 * Form data for step 2 (Details)
 */
export interface DetailsData {
  description: string
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
}

/**
 * Form data for step 3 (Additional)
 */
export interface AdditionalData {
  tags: string[]
  notes?: string
  attachments?: File[]
}

/**
 * Complete form data
 */
export interface FormData {
  basicInfo: BasicInfoData | null
  details: DetailsData | null
  additional: AdditionalData | null
}

/**
 * Machine context
 */
export interface FormWizardContext {
  formData: FormData
  currentStep: number
  totalSteps: number
  error?: Error | string
  validationErrors?: Record<string, string>
}

/**
 * Machine events
 */
export type FormWizardEvent =
  | { type: 'NEXT'; data?: Partial<FormData> }
  | { type: 'BACK' }
  | { type: 'GOTO_STEP'; step: number }
  | { type: 'UPDATE_BASIC_INFO'; data: BasicInfoData }
  | { type: 'UPDATE_DETAILS'; data: DetailsData }
  | { type: 'UPDATE_ADDITIONAL'; data: AdditionalData }
  | { type: 'SUBMIT' }
  | { type: 'SUCCESS'; id: string }
  | { type: 'ERROR'; error: Error | string }
  | { type: 'RETRY' }
  | { type: 'RESET' }
  | { type: 'VALIDATION_ERROR'; errors: Record<string, string> }

/**
 * Machine input
 */
export interface FormWizardInput {
  initialData?: Partial<FormData>
  startStep?: number
}
