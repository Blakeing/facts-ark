/**
 * Accordion component - variant definitions
 *
 * Minimal styling approach - rely on Ark UI's built-in behavior and data attributes
 */

import { tv } from 'tailwind-variants/lite'

export const accordionVariants = tv({
  slots: {
    root: 'w-full',
    item: '',
    trigger: '',
    triggerIcon: '',
    indicator: '',
    content: '',
  },
  variants: {
    variant: {
      default: {
        root: 'divide-y divide-gray-200',
        item: '',
        trigger:
          'group flex w-full items-center justify-between py-4 text-left text-sm font-medium text-gray-900 hover:text-indigo-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        triggerIcon: 'mr-3 text-gray-400 group-hover:text-indigo-500',
        indicator:
          'ml-2 h-5 w-5 text-gray-500 transition-transform duration-200 data-[state=open]:rotate-90',
        content:
          'overflow-hidden text-sm text-gray-600 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-4',
      },
      bordered: {
        root: 'divide-y divide-gray-200 rounded-lg border border-gray-200',
        item: 'px-4 first:pt-0',
        trigger:
          'group flex w-full items-center justify-between py-4 text-left text-sm font-medium text-gray-900 hover:text-indigo-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        triggerIcon: 'mr-3 text-gray-400 group-hover:text-indigo-500',
        indicator:
          'ml-2 h-5 w-5 text-gray-500 transition-transform duration-200 data-[state=open]:rotate-90',
        content:
          'overflow-hidden text-sm text-gray-600 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-4',
      },
      separated: {
        root: 'space-y-2',
        item: 'rounded-lg border border-gray-200 px-4',
        trigger:
          'group flex w-full items-center justify-between py-4 text-left text-sm font-medium text-gray-900 hover:text-indigo-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        triggerIcon: 'mr-3 text-gray-400 group-hover:text-indigo-500',
        indicator:
          'ml-2 h-5 w-5 text-gray-500 transition-transform duration-200 data-[state=open]:rotate-90',
        content:
          'overflow-hidden text-sm text-gray-600 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-4',
      },
      contained: {
        root: 'space-y-2',
        item: 'rounded-lg bg-gray-50 px-4',
        trigger:
          'group flex w-full items-center justify-between py-4 text-left text-sm font-medium text-gray-900 hover:text-indigo-600 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50',
        triggerIcon: 'mr-3 text-gray-400 group-hover:text-indigo-500',
        indicator:
          'ml-2 h-5 w-5 text-gray-500 transition-transform duration-200 data-[state=open]:rotate-90',
        content:
          'overflow-hidden text-sm text-gray-600 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down pb-4',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})
