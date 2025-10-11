import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'
import { mount } from '@vue/test-utils'
import { h, ref } from 'vue'
import type { FieldMeta } from 'vee-validate'

vi.mock('vee-validate', () => {
  const useFormContext = vi.fn(() => ({}))
  const useField = vi.fn()
  return { useFormContext, useField }
})

vi.mock('@/shared/ui/field', () => ({
  Field: {
    props: ['label', 'required', 'invalid'],
    template:
      '<div class="field"><slot name="default"/><slot name="helperText"/><slot name="errorText"/></div>',
  },
  FieldInput: {
    props: ['modelValue'],
    emits: ['update:modelValue'],
    template:
      '<input class="field-input" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" />',
  },
}))

import BaseFormField from '../BaseFormField.vue'
import { useField } from 'vee-validate'

const useFieldMock = useField as unknown as Mock

type MockFieldOptions = {
  initialValue?: string
  touched?: boolean
  errorMessage?: string
}

const createMeta = (touched: boolean): FieldMeta<string> =>
  ({
    touched,
    dirty: touched,
    valid: !touched,
    pending: false,
    initialTouched: false,
    initialDirty: false,
    validatable: true,
    required: false,
    validated: touched,
  }) as unknown as FieldMeta<string>

function mockUseField({ initialValue = '', touched = false, errorMessage }: MockFieldOptions = {}) {
  const valueRef = ref(initialValue)
  const metaRef = ref(createMeta(touched))
  const errorRef = ref<string | undefined>(errorMessage)

  const handleChange = vi.fn((next: string) => {
    valueRef.value = next
  })

  const handleBlur = vi.fn()

  useFieldMock.mockReturnValue({
    value: valueRef,
    meta: metaRef,
    errorMessage: errorRef,
    handleChange,
    handleBlur,
  })

  return { valueRef, metaRef, errorRef, handleChange }
}

beforeEach(() => {
  vi.clearAllMocks()
})

describe('BaseFormField', () => {
  it('renders a default FieldInput when no slot override is provided', () => {
    mockUseField()

    const wrapper = mount(BaseFormField, {
      props: {
        name: 'title',
        label: 'Title',
      },
    })

    expect(wrapper.find('input.field-input').exists()).toBe(true)
  })

  it('shows helper text when untouched and no error', () => {
    mockUseField({ touched: false })

    const wrapper = mount(BaseFormField, {
      props: {
        name: 'title',
        label: 'Title',
      },
      slots: {
        default: ({ field }) => h('input', { value: field.value, class: 'field-input' }),
        description: ({ value }) => h('span', { class: 'helper' }, `${value.length}/200`),
      },
    })

    expect(wrapper.find('.helper').text()).toBe('0/200')
  })

  it('shows error text when touched with error', async () => {
    const { errorRef, metaRef } = mockUseField({ touched: true, errorMessage: 'Title is required' })
    const errorSlot = vi.fn(({ errorMessage }) => h('span', { class: 'error' }, errorMessage))

    const wrapper = mount(BaseFormField, {
      props: {
        name: 'title',
        label: 'Title',
      },
      slots: {
        default: ({ field }) => h('input', { value: field.value, class: 'field-input' }),
        error: errorSlot,
      },
    })

    await wrapper.vm.$nextTick()
    expect(errorSlot).toHaveBeenCalled()
    const errorArgs = errorSlot.mock.calls[0]?.[0]
    expect(errorArgs?.errorMessage).toBe('Title is required')

    errorRef.value = undefined
    metaRef.value.touched = false

    await wrapper.vm.$nextTick()
    expect(wrapper.find('.error').exists()).toBe(false)
  })

  it('allows overriding the default input via slot', async () => {
    const { handleChange } = mockUseField()

    const wrapper = mount(BaseFormField, {
      props: {
        name: 'title',
      },
      slots: {
        default: ({ field }) =>
          h('textarea', {
            class: 'custom-input',
            value: field.value,
            onInput: (event: Event) => {
              const target = event.target as HTMLTextAreaElement
              field.onInput(target.value)
            },
          }),
      },
    })

    const textarea = wrapper.find('textarea.custom-input')
    expect(textarea.exists()).toBe(true)

    await textarea.setValue('updated value')
    expect(handleChange).toHaveBeenCalledExactlyOnceWith('updated value')
  })
})
