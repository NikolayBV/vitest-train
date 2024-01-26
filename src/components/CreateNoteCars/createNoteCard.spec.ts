import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CreateNoteCard from '@/components/CreateNoteCars/CreateNoteCard.vue'
import { createTestingPinia } from '@pinia/testing'

const mockHandleSubmit = vi.fn()

vi.mock('vue-hooks-form', async (importOriginal) => {
  const mod = await importOriginal<typeof import('vue-hooks-form')>()
  return {
    ...mod,
    useForm: () => ({
      ...mod.useForm(),
      handleSubmit: mockHandleSubmit
    })
  }
})

describe('createNoteCard', () => {
  const wrapper = mount(CreateNoteCard, {
    global: {
      plugins: [createTestingPinia()]
    }
  })
  it('button in createNoteCard should be called', async () => {
    await wrapper.get('button').trigger('click')
    expect(mockHandleSubmit).toHaveBeenCalled()
  })
  it('title should be in component', () => {
    const card = wrapper.get('[data-test="card"]')
    expect(card.find('p').text()).toBe('Create Note')
  })
  it('form should have two input', () => {
    const form = wrapper.get('[data-test="input-container"]')
    expect(form.findAll('input').length).toBe(2)
  })
})
