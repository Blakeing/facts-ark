import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import type { FieldMeta } from 'vee-validate'

// Mock vee-validate
vi.mock('vee-validate', () => {
  const useField = vi.fn()
  return { useField }
})

// Mock Field and FieldTextarea components
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
  FieldTextarea: {
    name: 'FieldTextarea',
    props: {
      modelValue: [String, Number],
      size: String,
      variant: String,
      resize: String,
      rows: Number,
      placeholder: String,
      disabled: Boolean,
      readonly: Boolean,
      required: Boolean,
      name: String,
      class: String,
    },
    emits: ['update:modelValue', 'blur'],
    template:
      '<textarea class="field-textarea" data-testid="field-textarea" :value="modelValue" @input="$emit(\'update:modelValue\', $event.target.value)" @blur="$emit(\'blur\', $event)" v-bind="$attrs"></textarea>',
  },
}))

import Textarea from '../Textarea.vue'
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

describe('Textarea', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('requires name prop for VeeValidate integration', () => {
    mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
      },
    })

    expect(useFieldMock).toHaveBeenCalledExactlyOnceWith(expect.any(Function), expect.any(Object))
    expect(wrapper.exists()).toBe(true)
  })

  it('binds to VeeValidate field via useField', () => {
    mockUseField()

    mount(Textarea, {
      props: {
        name: 'notes',
        label: 'Notes',
      },
    })

    expect(useFieldMock).toHaveBeenCalled()
    const [nameGetter, options] = useFieldMock.mock.calls[0] as [
      () => string,
      { validateOnValueUpdate: boolean },
    ]
    expect(nameGetter()).toBe('notes')
    expect(options.validateOnValueUpdate).toBe(false)
  })

  it('updates field value on input', async () => {
    const { valueRef } = mockUseField({ initialValue: 'initial text' })

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
      },
    })

    const textarea = wrapper.find('textarea.field-textarea')
    await textarea.setValue('updated text')

    expect(valueRef.value).toBe('updated text')
  })

  it('shows validation errors when invalid and touched', () => {
    mockUseField({
      touched: true,
      valid: false,
      errorMessage: 'Description is required',
    })

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        label: 'Description',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('invalid')).toBe(true)
    expect(field.props('errorText')).toBe('Description is required')
  })

  it('displays helper text when valid', () => {
    mockUseField({ touched: false, valid: true })

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        label: 'Description',
        helperText: 'Enter a detailed description',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('helperText')).toBe('Enter a detailed description')
    expect(field.props('invalid')).toBe(false)
  })

  it('handles blur events for validation', async () => {
    const { handleBlur } = mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
      },
    })

    const textarea = wrapper.find('textarea.field-textarea')
    await textarea.trigger('blur')

    expect(handleBlur).toHaveBeenCalled()
  })

  it('handles disabled state correctly', () => {
    mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        disabled: true,
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    const textarea = wrapper.findComponent({ name: 'FieldTextarea' })

    expect(field.props('disabled')).toBe(true)
    expect(textarea.props('disabled')).toBe(true)
  })

  it('handles readonly state correctly', () => {
    mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        readonly: true,
      },
    })

    const textarea = wrapper.findComponent({ name: 'FieldTextarea' })
    expect(textarea.props('readonly')).toBe(true)
  })

  it('applies different sizes', () => {
    mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        size: 'lg',
      },
    })

    const textarea = wrapper.findComponent({ name: 'FieldTextarea' })
    expect(textarea.props('size')).toBe('lg')
  })

  it('applies different variants', () => {
    mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        variant: 'default',
      },
    })

    const textarea = wrapper.findComponent({ name: 'FieldTextarea' })
    expect(textarea.props('variant')).toBe('outline')
  })

  it('applies different resize behaviors', () => {
    mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        resize: 'both',
      },
    })

    const textarea = wrapper.findComponent({ name: 'FieldTextarea' })
    expect(textarea.props('resize')).toBe('both')
  })

  it('passes through rows prop', () => {
    mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        rows: 10,
      },
    })

    const textarea = wrapper.findComponent({ name: 'FieldTextarea' })
    expect(textarea.props('rows')).toBe(10)
  })

  it('defaults to 3 rows', () => {
    mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
      },
    })

    const textarea = wrapper.findComponent({ name: 'FieldTextarea' })
    expect(textarea.props('rows')).toBe(3)
  })

  it('passes through placeholder', () => {
    mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        placeholder: 'Enter your description',
      },
    })

    const textarea = wrapper.findComponent({ name: 'FieldTextarea' })
    expect(textarea.props('placeholder')).toBe('Enter your description')
  })

  it('passes through required prop', () => {
    mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        required: true,
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    const textarea = wrapper.findComponent({ name: 'FieldTextarea' })

    expect(field.props('required')).toBe(true)
    expect(textarea.props('required')).toBe(true)
  })

  it('passes through custom class', () => {
    mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        class: 'custom-class',
      },
    })

    const textarea = wrapper.findComponent({ name: 'FieldTextarea' })
    expect(textarea.props('class')).toBe('custom-class')
  })

  it('passes through id prop', () => {
    mockUseField()

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
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
      errorMessage: 'Description is required',
    })

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        label: 'Description',
        helperText: 'Enter a detailed description',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('errorText')).toBe('Description is required')
    expect(field.props('invalid')).toBe(true)
  })

  it('does not show invalid state if not touched', () => {
    mockUseField({
      touched: false,
      valid: false,
      errorMessage: 'Description is required',
    })

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        label: 'Description',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('invalid')).toBe(false)
  })

  it('uses prop errorText as fallback when field has no error', () => {
    mockUseField({ touched: true, valid: false, errorMessage: '' })

    const wrapper = mount(Textarea, {
      props: {
        name: 'description',
        errorText: 'Prop error text',
      },
    })

    const field = wrapper.findComponent({ name: 'Field' })
    expect(field.props('errorText')).toBe('Prop error text')
  })
})
