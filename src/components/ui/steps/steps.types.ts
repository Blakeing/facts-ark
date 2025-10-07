/**
 * Steps component - type definitions
 */

import type { StepsRootProps } from '@ark-ui/vue/steps'
import type { VariantProps } from 'tailwind-variants'
import type { stepsVariants } from './steps.variants'

/**
 * Steps variant props extracted from stepsVariants
 */
type StepsVariantProps = VariantProps<typeof stepsVariants>

/**
 * Individual step definition
 */
export interface StepItem {
  /** Unique value identifier for the step */
  value: string
  /** Title of the step */
  title: string
  /** Description of the step */
  description?: string
}

/**
 * Steps props
 */
export interface StepsProps extends StepsRootProps {
  /** Array of step items to render */
  items: StepItem[]

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: StepsVariantProps['variant']

  /** Additional CSS classes */
  class?: string
}

export type { StepsRootProps }