/**
 * Accordion component - type definitions
 */

import type { AccordionRootProps, AccordionRootEmits } from '@ark-ui/vue/accordion'
import type { VariantProps } from 'tailwind-variants'
import type { Component } from 'vue'
import type { accordionVariants } from './accordion.variants'

/**
 * Accordion variant props extracted from accordionVariants
 */
type AccordionVariantProps = VariantProps<typeof accordionVariants>

/**
 * Individual accordion item definition
 */
export interface AccordionItem {
  /** Unique value identifier for the accordion item */
  value: string
  /** Title/trigger text for the accordion item */
  title: string
  /** Content to display when accordion item is expanded */
  content?: string
  /** Whether this accordion item is disabled */
  disabled?: boolean
  /** Optional icon component to display in the trigger */
  icon?: Component
}

/**
 * Accordion props
 */
export interface AccordionProps extends AccordionRootProps {
  /** Array of accordion items to render */
  items: AccordionItem[]

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: AccordionVariantProps['variant']

  /** Additional CSS classes */
  class?: string
}

export type { AccordionRootEmits }
