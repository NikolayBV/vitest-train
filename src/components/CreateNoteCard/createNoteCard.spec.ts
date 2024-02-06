import { describe, it, vi, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CreateNoteCard from '@/components/CreateNoteCard/CreateNoteCard.vue'
import { createTestingPinia } from '@pinia/testing'

const mockHandleSubmit = vi.fn()

// vi.mock('vue-hooks-form', async (importOriginal) => {
//   const mod = await importOriginal<typeof import('vue-hooks-form')>()
//   return {
//     ...mod,
//     useForm: () => ({
//       ...mod.useForm(),
//       handleSubmit: mockHandleSubmit
//     })
//   }
// })

describe('createNoteCard', () => {
  const wrapper = mount(CreateNoteCard, {
    global: {
      plugins: [createTestingPinia()]
    }
  })
  it('title should be in component', () => {
    const card = wrapper.get('[data-test="card"]')
    expect(card.find('p').text()).toBe('Create Note')
  })
  it('form should have two input', () => {
    const form = wrapper.get('[data-test="input-container"]')
    expect(form.findAll('input').length).toBe(2)
  })
  it('input sets value and submit it', async () => {
    const input = wrapper.findAll('input')
    for (const input1 of input) {
      await input1.setValue('test')
      expect((input1.element as any).value).toBe('test')
    }
    await wrapper.find('[data-test="input-container"]').trigger('submit.prevent')
    const emit = wrapper.emitted('createNote')
    if (emit) {
      expect(emit[0][0]).toMatchObject({
        title: 'test',
        body: 'test'
      })
    }
  })
  it('error text should render on error', async () => {
    await wrapper.find('[data-test="input-title"]').setValue('')
    expect(wrapper.find('[data-test="error-title"]').exists()).toBe(true)
  })
  it('error warning should not be without warning ', async () => {
    await wrapper.find('[data-test="input-title"]').setValue('test')
    expect(wrapper.find('[data-test="error-title"]').exists()).toBe(false)
  })
  it('button in createNoteCard should not be called on error', async () => {
    await wrapper.find('[data-test="input-title"]').setValue('')
    await wrapper.find('[data-test="input-body"]').setValue('test')
    expect((wrapper.get('button') as any).isDisabled()).toBe(true)
  })
})
