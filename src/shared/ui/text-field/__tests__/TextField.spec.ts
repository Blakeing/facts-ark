import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import type { FieldMeta } from 'vee-validate'

// Mock vee-validate
vi.mock('vee-validate', () => {
  const useField = vi.fn()
  return { useField }
})

// Mock Field and FieldInput components
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
  FieldInput: {
    name: 'FieldInput',
    props: {
      modelValue: [String, Number],
      type: String,
      size: String,
      variant: String,
      placeholder: String,
      disabled: Boolean,
      readonly: Boolean,
      required: Boolean,
      name: String,
      class: String,
    },
    emits: ['update:modelValue', 'blur'],
    template:
      '<input class="field-input" data-testid="field-input" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" @blur="$emit(\'blur\', $event)" v-bind="$attrs" />',
  },
}))

import TextField from '../TextField.vue'
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

describe('TextField', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('requires name prop for VeeValidate integration', () => {
    mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
      },
    })

    expect(useFieldMock).toHaveBeenCalledWith(expect.any(Function), expect.any(Object))
    expect(wrapper.exists()).toBe(true)
  })

  it('binds to VeeValidate field via useField', () => {
    mockUseField()

    mount(TextField, {
      props: {
        name: 'username',
        label: 'Username',
      },
    })

    expect(useFieldMock).toHaveBeenCalled()
    const [nameGetter, options] = useFieldMock.mock.calls[0]
    expect(nameGetter()).toBe('username')
    expect(options.validateOnValueUpdate).toBe(false)
  })

  it('updates field value on input', async () => {
    const { valueRef } = mockUseField({ initialValue: 'initial' })

    const wrapper = mount(TextField, {
      props: {
        name: 'title',
      },
    })

    const input = wrapper.find('input.field-input')
    await input.setValue('updated value')

    expect(valueRef.value).toBe('updated value')
  })

  it('shows validation errors when invalid and touched', () => {
    mockUseField({
      touched: true,
      valid: false,
      errorMessage: 'This field is required',
    })

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        label: 'Email',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('invalid')).toBe(true)
    expect(field.props('errorText')).toBe('This field is required')
  })

  it('displays helper text when valid', () => {
    mockUseField({ touched: false, valid: true })

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        label: 'Email',
        helperText: 'Enter a valid email address',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('helperText')).toBe('Enter a valid email address')
    expect(field.props('invalid')).toBe(false)
  })

  it('handles blur events for validation', async () => {
    const { handleBlur } = mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
      },
    })

    const input = wrapper.find('input.field-input')
    await input.trigger('blur')

    expect(handleBlur).toHaveBeenCalled()
  })

  it('handles disabled state correctly', () => {
    mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        disabled: true,
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    const input = wrapper.findComponent({ name: 'FieldInput' })

    expect(field.props('disabled')).toBe(true)
    expect(input.props('disabled')).toBe(true)
  })

  it('handles readonly state correctly', () => {
    mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        readonly: true,
      },
    })

    const input = wrapper.findComponent({ name: 'FieldInput' })
    expect(input.props('readonly')).toBe(true)
  })

  it('applies different sizes', () => {
    mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        size: 'lg',
      },
    })

    const input = wrapper.findComponent({ name: 'FieldInput' })
    expect(input.props('size')).toBe('lg')
  })

  it('applies different variants', () => {
    mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        variant: 'outline',
      },
    })

    const input = wrapper.findComponent({ name: 'FieldInput' })
    expect(input.props('variant')).toBe('outline')
  })

  it('passes through different input types', () => {
    mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'password',
        type: 'password',
      },
    })

    const input = wrapper.findComponent({ name: 'FieldInput' })
    expect(input.props('type')).toBe('password')
  })

  it('passes through placeholder', () => {
    mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        placeholder: 'Enter your email',
      },
    })

    const input = wrapper.findComponent({ name: 'FieldInput' })
    expect(input.props('placeholder')).toBe('Enter your email')
  })

  it('passes through required prop', () => {
    mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        required: true,
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    const input = wrapper.findComponent({ name: 'FieldInput' })

    expect(field.props('required')).toBe(true)
    expect(input.props('required')).toBe(true)
  })

  it('passes through custom class', () => {
    mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        class: 'custom-class',
      },
    })

    const input = wrapper.findComponent({ name: 'FieldInput' })
    expect(input.props('class')).toBe('custom-class')
  })

  it('passes through id prop', () => {
    mockUseField()

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        id: 'custom-id',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('id')).toBe('custom-id')
  })

  it('shows error text over helper text when invalid', () => {
    mockUseField({
      touched: true,
      valid: false,
      errorMessage: 'Email is required',
    })

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        label: 'Email',
        helperText: 'Enter a valid email',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('errorText')).toBe('Email is required')
    expect(field.props('invalid')).toBe(true)
  })

  it('does not show invalid state if not touched', () => {
    mockUseField({
      touched: false,
      valid: false,
      errorMessage: 'Email is required',
    })

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        label: 'Email',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    // invalid is false because touched is false
    expect(field.props('invalid')).toBe(false)
  })

  it('uses prop errorText as fallback when field has no error', () => {
    mockUseField({ touched: true, valid: false, errorMessage: '' })

    const wrapper = mount(TextField, {
      props: {
        name: 'email',
        errorText: 'Prop error text',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('errorText')).toBe('Prop error text')
  })
})
