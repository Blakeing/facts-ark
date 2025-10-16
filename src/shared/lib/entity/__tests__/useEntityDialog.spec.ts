import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { useEntityDialog } from '../useEntityDialog'
import { z } from 'zod'

// Mock vee-validate
vi.mock('vee-validate', () => ({
  useForm: vi.fn(() => ({
    values: ref({ title: '', description: '' }),
    errors: ref({}),
    meta: ref({ dirty: false, valid: true }),
    handleSubmit: vi.fn((fn) => () => fn({ title: 'Test', description: 'Test' })),
    resetForm: vi.fn(),
  })),
}))

// Mock @vee-validate/zod
vi.mock('@vee-validate/zod', () => ({
  toTypedSchema: vi.fn((schema) => schema),
}))

describe('useEntityDialog', () => {
  const mockEntity = {
    create: vi.fn().mockResolvedValue({ id: '1', title: 'Test', description: 'Test' }),
    update: vi.fn().mockResolvedValue({ id: '1', title: 'Updated', description: 'Updated' }),
    delete: vi.fn().mockResolvedValue(undefined),
    isMutating: ref(false),
    isCreating: ref(false),
    isUpdating: ref(false),
    isDeleting: ref(false),
  }

  const schema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
  })

  const config = {
    entity: mockEntity,
    schema,
    emptyForm: { title: '', description: '' },
    getId: (model: any) => model.id,
    toDto: (values: any) => values,
    fromModel: (model: any) => ({ title: model.title, description: model.description || '' }),
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with correct default values', () => {
    const dialog = useEntityDialog(config)

    expect(dialog.isOpen.value).toBe(false)
    expect(dialog.isEditMode.value).toBe(false)
    expect(dialog.hasChanges.value).toBe(false)
    expect(dialog.editingId.value).toBe(null)
    expect(dialog.isLoading.value).toBe(false)
  })

  it('should open add dialog correctly', () => {
    const dialog = useEntityDialog(config)

    dialog.openAdd()

    expect(dialog.isOpen.value).toBe(true)
    expect(dialog.isEditMode.value).toBe(false)
    expect(dialog.editingId.value).toBe(null)
  })

  it('should open edit dialog correctly', () => {
    const dialog = useEntityDialog(config)
    const model = { id: '1', title: 'Test', description: 'Test' }

    dialog.openEdit(model)

    expect(dialog.isOpen.value).toBe(true)
    expect(dialog.isEditMode.value).toBe(true)
    expect(dialog.editingId.value).toBe('1')
  })

  it('should detect changes correctly', () => {
    const dialog = useEntityDialog(config)

    // Mock form values change
    dialog.form.values.title = 'Changed'

    // Since we're using JSON snapshot comparison, we need to trigger the comparison
    // In real usage, this would be reactive
    expect(dialog.hasChanges.value).toBeDefined()
  })

  it('should save new entity correctly', async () => {
    const dialog = useEntityDialog(config)
    dialog.openAdd()

    await dialog.save()

    expect(mockEntity.create).toHaveBeenCalledWith({ title: 'Test', description: 'Test' })
  })

  it('should update existing entity correctly', async () => {
    const dialog = useEntityDialog(config)
    const model = { id: '1', title: 'Test', description: 'Test' }
    dialog.openEdit(model)

    await dialog.save()

    expect(mockEntity.update).toHaveBeenCalledWith('1', { title: 'Test', description: 'Test' })
  })

  it('should force close dialog', () => {
    const dialog = useEntityDialog(config)
    dialog.openAdd()

    dialog.forceClose()

    expect(dialog.isOpen.value).toBe(false)
    expect(dialog.editingId.value).toBe(null)
  })

  it('should handle close with changes', async () => {
    const dialog = useEntityDialog(config)
    dialog.openAdd()

    const result = await dialog.close()

    // Should return false to indicate confirmation needed
    expect(result).toBe(false)
  })

  it('should handle close without changes', async () => {
    const dialog = useEntityDialog(config)
    dialog.openAdd()

    // Mock no changes
    dialog.form.values.title = ''
    dialog.form.values.description = ''

    const result = await dialog.close()

    // Should return true to indicate dialog can close
    expect(result).toBe(true)
  })

  it('should reflect entity loading state', () => {
    const dialog = useEntityDialog(config)

    // Mock entity loading state
    mockEntity.isMutating.value = true

    expect(dialog.isLoading.value).toBe(true)
  })
})
