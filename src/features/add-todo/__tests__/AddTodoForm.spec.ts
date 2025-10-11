import { describe, it, expect, beforeEach, vi, type Mock } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { h } from 'vue'
import AddTodoForm from '../ui/AddTodoForm.vue'

// Mock the useAddTodo composable
import { ref, computed } from 'vue'

const mockHandleSubmit = vi.fn()
const mockCanSubmitValue = ref(false)
const mockIsPendingValue = ref(false)
const mockIsErrorValue = ref(false)
const mockErrorValue = ref<unknown>(null)

vi.mock('../model/useAddTodo', () => ({
  useAddTodo: () => ({
    canSubmit: computed(() => mockCanSubmitValue.value),
    isPending: computed(() => mockIsPendingValue.value),
    isError: computed(() => mockIsErrorValue.value),
    error: computed(() => mockErrorValue.value),
    handleSubmit: mockHandleSubmit,
  }),
}))

// Mock BaseFormField to simplify testing
vi.mock('@/shared/ui/form', () => ({
  BaseFormField: {
    props: ['name', 'label', 'required'],
    template: `
      <div :data-field-name="name">
        <label v-if="label">{{ label }}</label>
        <slot :field="{ name, value: '', modelValue: '', onInput: () => {}, onChange: () => {}, 'onUpdate:modelValue': () => {}, onBlur: () => {} }" :meta="{ touched: false, valid: true }" :errorMessage="undefined" :value="''"/>
        <slot name="description" :meta="{ touched: false }" :value="''" :errorMessage="undefined"/>
      </div>
    `,
  },
}))

// Mock Ark UI components
vi.mock('@/shared/ui/field', () => ({
  FieldInput: {
    props: ['placeholder', 'disabled', 'maxlength', 'required', 'name', 'value', 'modelValue'],
    emits: ['input', 'change', 'update:modelValue', 'blur'],
    template: `
      <input
        :name="name"
        :placeholder="placeholder"
        :disabled="disabled"
        :maxlength="maxlength"
        :required="required"
        :value="modelValue || value"
        @input="$emit('update:modelValue', $event.target.value)"
        data-test="field-input"
      />
    `,
  },
}))

vi.mock('@/shared/ui/button', () => ({
  Button: {
    props: ['type', 'disabled', 'loading'],
    setup(props: { type?: string; disabled?: boolean; loading?: boolean }) {
      return { props }
    },
    template: `
      <button
        :type="props.type"
        :disabled="props.disabled"
        data-test="submit-button"
        :data-loading="String(props.loading)"
      >
        <slot/>
      </button>
    `,
  },
}))

describe('AddTodoForm Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockCanSubmitValue.value = true
    mockIsPendingValue.value = false
    mockIsErrorValue.value = false
    mockErrorValue.value = null
    mockHandleSubmit.mockReset()
  })

  it('renders the form with title and description fields', () => {
    const wrapper = mount(AddTodoForm)

    expect(wrapper.find('[data-field-name="title"]').exists()).toBe(true)
    expect(wrapper.find('[data-field-name="description"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="submit-button"]').exists()).toBe(true)
  })

  it('shows correct labels and placeholders', () => {
    const wrapper = mount(AddTodoForm)

    const titleField = wrapper.find('[data-field-name="title"]')
    expect(titleField.find('label').text()).toBe('Title')
    expect(titleField.find('input').attributes('placeholder')).toBe('What needs to be done?')

    const descField = wrapper.find('[data-field-name="description"]')
    expect(descField.find('label').text()).toBe('Description (optional)')
    expect(descField.find('input').attributes('placeholder')).toBe('Add more details...')
  })

  it('calls handleSubmit when form is submitted', async () => {
    const wrapper = mount(AddTodoForm)

    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
  })

  it('emits success event when handleSubmit callback is called', async () => {
    mockHandleSubmit.mockImplementation((callback) => {
      callback()
    })

    const wrapper = mount(AddTodoForm)

    await wrapper.find('form').trigger('submit')
    await flushPromises()

    expect(wrapper.emitted('success')).toBeTruthy()
    expect(wrapper.emitted('success')).toHaveLength(1)
  })

  it('disables submit button when canSubmit is false', () => {
    mockCanSubmitValue.value = false
    const wrapper = mount(AddTodoForm)

    const submitButton = wrapper.find('[data-test="submit-button"]')
    expect(submitButton.attributes('disabled')).toBe('')
  })

  it('enables submit button when canSubmit is true', () => {
    mockCanSubmitValue.value = true
    const wrapper = mount(AddTodoForm)

    const submitButton = wrapper.find('[data-test="submit-button"]')
    expect(submitButton.attributes('disabled')).toBeUndefined()
  })

  it('shows loading state when isPending is true', () => {
    mockIsPendingValue.value = true
    const wrapper = mount(AddTodoForm)

    const submitButton = wrapper.find('[data-test="submit-button"]')
    expect(submitButton.attributes('data-loading')).toBe('true')
    expect(submitButton.text()).toContain('Creating...')
  })

  it('disables inputs when form is pending', () => {
    mockIsPendingValue.value = true
    const wrapper = mount(AddTodoForm)

    const inputs = wrapper.findAll('[data-test="field-input"]')
    inputs.forEach((input) => {
      expect(input.attributes('disabled')).toBeDefined()
    })
  })

  it('shows error message when isError is true', async () => {
    mockIsErrorValue.value = true
    mockErrorValue.value = { message: 'Network error occurred' }

    const wrapper = mount(AddTodoForm)
    await wrapper.vm.$nextTick()

    const errorDiv = wrapper.find('.bg-bg-error-subtle')
    expect(errorDiv.exists()).toBe(true)
    expect(errorDiv.text()).toContain('Network error occurred')
  })

  it('shows default error message when error has no message', async () => {
    mockIsErrorValue.value = true
    mockErrorValue.value = {}

    const wrapper = mount(AddTodoForm)
    await wrapper.vm.$nextTick()

    const errorDiv = wrapper.find('.bg-bg-error-subtle')
    expect(errorDiv.exists()).toBe(true)
    expect(errorDiv.text()).toContain('Failed to create todo')
  })

  it('does not show error message when isError is false', () => {
    mockIsErrorValue.value = false
    const wrapper = mount(AddTodoForm)

    const errorDiv = wrapper.find('.bg-bg-error-subtle')
    expect(errorDiv.exists()).toBe(false)
  })

  it('passes required prop to title field', () => {
    const wrapper = mount(AddTodoForm)

    const titleInput = wrapper.find('[data-field-name="title"] input')
    expect(titleInput.attributes('required')).toBeDefined()
  })

  it('does not pass required prop to description field', () => {
    const wrapper = mount(AddTodoForm)

    const descInput = wrapper.find('[data-field-name="description"] input')
    expect(descInput.attributes('required')).toBeUndefined()
  })

  it('sets correct maxlength attributes', () => {
    const wrapper = mount(AddTodoForm)

    const titleInput = wrapper.find('[data-field-name="title"] input')
    expect(titleInput.attributes('maxlength')).toBe('200')

    const descInput = wrapper.find('[data-field-name="description"] input')
    expect(descInput.attributes('maxlength')).toBe('1000')
  })
})
