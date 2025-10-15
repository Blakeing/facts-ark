import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import type { FieldMeta } from 'vee-validate'

// Mock vee-validate
vi.mock('vee-validate', () => {
  const useField = vi.fn()
  return { useField }
})

// Mock Field and Select components
vi.mock('../../field', () => ({
  Field: {
    name: 'Field',
    props: {
      label: String,
      required: Boolean,
      invalid: Boolean,
      disabled: Boolean,
      helperText: String,
      errorText: String,
      id: String,
      readOnly: Boolean,
    },
    template: '<div class="field" data-testid="field"><slot /></div>',
  },
}))

vi.mock('../../select', () => ({
  Select: {
    name: 'Select',
    props: {
      modelValue: Array,
      items: Array,
      placeholder: String,
      size: String,
      indicatorPosition: String,
      disabled: Boolean,
      name: String,
      class: String,
    },
    emits: ['value-change'],
    template:
      '<div class="select" data-testid="select" @click="$emit(\'value-change\', { value: [\'test-value\'] })" v-bind="$attrs"><slot /></div>',
  },
}))

import SelectField from '../SelectField.vue'
import { useField } from 'vee-validate'

const useFieldMock = useField as unknown as Mock

const createMeta = (touched: boolean, valid: boolean): FieldMeta<string> =>
  ({
    touched,
    dirty: touched,
    valid,
    pending: false,
    initialTouched: false,
    initialDirty: false,
    validatable: true,
    required: false,
    validated: touched,
  }) as unknown as FieldMeta<string>

interface MockFieldOptions {
  initialValue?: string
  touched?: boolean
  valid?: boolean
  errorMessage?: string
}

function mockUseField({
  initialValue = '',
  touched = false,
  valid = true,
  errorMessage = '',
}: MockFieldOptions = {}) {
  const valueRef = ref(initialValue)
  const metaRef = ref(createMeta(touched, valid))
  const errorMessageRef = ref(errorMessage)

  const handleBlur = vi.fn()

  useFieldMock.mockReturnValue({
    value: valueRef,
    meta: metaRef,
    errorMessage: errorMessageRef,
    handleBlur,
  })

  return { valueRef, metaRef, errorMessageRef, handleBlur }
}

const mockItems = [
  { value: 'work', label: 'Work' },
  { value: 'personal', label: 'Personal' },
  { value: 'other', label: 'Other' },
]

const mockGroupedItems = [
  {
    label: 'Work',
    items: [
      { value: 'urgent', label: 'Urgent' },
      { value: 'normal', label: 'Normal' },
    ],
  },
  {
    label: 'Personal',
    items: [
      { value: 'home', label: 'Home' },
      { value: 'hobby', label: 'Hobby' },
    ],
  },
]

describe('SelectField', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('requires name prop for VeeValidate integration', () => {
    mockUseField()

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
      },
    })

    expect(useFieldMock).toHaveBeenCalled()
    expect(wrapper.exists()).toBe(true)
  })

  it('binds to VeeValidate field via useField', () => {
    mockUseField()

    mount(SelectField, {
      props: {
        name: 'priority',
        label: 'Priority',
        items: mockItems,
      },
    })

    expect(useFieldMock).toHaveBeenCalled()
    const callArgs = useFieldMock.mock.calls[0]
    if (callArgs) {
      const [nameGetter, options] = callArgs
      expect(nameGetter()).toBe('priority')
      expect(options.validateOnValueUpdate).toBe(false)
    }
  })

  it('handles value change from Ark UI Select', async () => {
    const { valueRef } = mockUseField()

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    await select.trigger('click')

    expect(valueRef.value).toBe('test-value')
  })

  it('converts array format to single string value', async () => {
    const { valueRef } = mockUseField()

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    // Simulate value change event with array format
    await select.vm.$emit('value-change', { value: ['work'] })

    expect(valueRef.value).toBe('work')
  })

  it('shows validation errors when invalid and touched', () => {
    mockUseField({
      touched: true,
      valid: false,
      errorMessage: 'Category is required',
    })

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        label: 'Category',
        items: mockItems,
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('invalid')).toBe(true)
    expect(field.props('errorText')).toBe('Category is required')
  })

  it('displays helper text when valid', () => {
    mockUseField({ touched: false, valid: true })

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        label: 'Category',
        helperText: 'Select a category',
        items: mockItems,
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('helperText')).toBe('Select a category')
    expect(field.props('invalid')).toBe(false)
  })

  it('handles disabled state correctly', () => {
    mockUseField()

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
        disabled: true,
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    const select = wrapper.findComponent({ name: 'Select' })

    expect(field.props('disabled')).toBe(true)
    expect(select.props('disabled')).toBe(true)
  })

  it('applies different sizes', () => {
    mockUseField()

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
        size: 'lg',
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props('size')).toBe('lg')
  })

  it('applies different indicator positions', () => {
    mockUseField()

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
        indicatorPosition: 'left',
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props('indicatorPosition')).toBe('left')
  })

  it('passes through placeholder', () => {
    mockUseField()

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
        placeholder: 'Choose a category',
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props('placeholder')).toBe('Choose a category')
  })

  it('defaults to "Select an option" placeholder', () => {
    mockUseField()

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props('placeholder')).toBe('Select an option')
  })

  it('passes through required prop', () => {
    mockUseField()

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
        required: true,
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('required')).toBe(true)
  })

  it('passes through custom class', () => {
    mockUseField()

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
        class: 'custom-class',
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props('class')).toBe('custom-class')
  })

  it('passes through id prop', () => {
    mockUseField()

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
        id: 'custom-id',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('id')).toBe('custom-id')
  })

  it('works with grouped items', () => {
    mockUseField()

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockGroupedItems,
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props('items')).toEqual(mockGroupedItems)
  })

  it('shows error text over helper text when invalid', () => {
    mockUseField({
      touched: true,
      valid: false,
      errorMessage: 'Category is required',
    })

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        label: 'Category',
        helperText: 'Select a category',
        items: mockItems,
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('errorText')).toBe('Category is required')
    expect(field.props('invalid')).toBe(true)
  })

  it('does not show invalid state if not touched', () => {
    mockUseField({
      touched: false,
      valid: false,
      errorMessage: 'Category is required',
    })

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        label: 'Category',
        items: mockItems,
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('invalid')).toBe(false)
  })

  it('uses prop errorText as fallback when field has no error', () => {
    mockUseField({ touched: true, valid: false, errorMessage: '' })

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
        errorText: 'Prop error text',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('errorText')).toBe('Prop error text')
  })

  it('binds model value as array to Select component', () => {
    mockUseField({ initialValue: 'work' })

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props('modelValue')).toEqual(['work'])
  })

  it('handles undefined value correctly', () => {
    mockUseField({ initialValue: '' })

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    expect(select.props('modelValue')).toBeUndefined()
  })

  it('handles empty value array from select', async () => {
    const { valueRef } = mockUseField({ initialValue: 'work' })

    const wrapper = mount(SelectField, {
      props: {
        name: 'category',
        items: mockItems,
      },
    })

    const select = wrapper.findComponent({ name: 'Select' })
    await select.vm.$emit('value-change', { value: [] })

    expect(valueRef.value).toBe('')
  })
})
