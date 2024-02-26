import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CreateNoteCard from '@/components/CreateNoteCard/CreateNoteCard.vue'
import { createTestingPinia } from '@pinia/testing'

describe('createNoteCard', () => {
  it('title and input should be in component', () => {
    const wrapper = mount(CreateNoteCard, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
    const card = wrapper.get('[data-test="card"]')
    const form = wrapper.get('[data-test="input-container"]')
    expect(card.find('p').text()).toBe('Create Note')
    expect(form.findAll('input').length).toBe(2)
  })
  it('input sets value and submit it', async () => {
    const wrapper = mount(CreateNoteCard, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
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
    const wrapper = mount(CreateNoteCard, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
    await wrapper.find('[data-test="input-title"]').setValue('')
    expect(wrapper.find('[data-test="error-title"]').exists()).toBe(true)
  })
  it('error warning should not be without warning ', async () => {
    const wrapper = mount(CreateNoteCard, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
    await wrapper.find('[data-test="input-title"]').setValue('test')
    expect(wrapper.find('[data-test="error-title"]').exists()).toBe(false)
  })
  it('button in createNoteCard should not be called on error', async () => {
    const wrapper = mount(CreateNoteCard, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
    await wrapper.find('[data-test="input-title"]').setValue('')
    await wrapper.find('[data-test="input-body"]').setValue('test')
    expect((wrapper.get('button') as any).isDisabled()).toBe(true)
  })
  it('emits createNote an event when clicked', async () => {
    const wrapper = mount(CreateNoteCard, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
    await wrapper.find('[data-test="input-container"]').trigger('submit.prevent')

    expect(wrapper.emitted()).toHaveProperty('createNote')
  })
  it('emits updateNote an event when clicked', async () => {
    const wrapper = mount(CreateNoteCard, {
      global: {
        plugins: [createTestingPinia()]
      },
      props: {
        note: {
          author: 'Бабкин Николай',
          authorId: 'google-oauth2|102483884126576221391',
          body: 'newBody',
          createdAt: new Date('2024-01-22T10:05:43.638Z'),
          id: 1705917943638,
          title: 'newTitle',
          updatedAt: new Date('2024-01-23T10:05:43.638Z')
        },
        isEditNote: true
      }
    })
    await wrapper.find('[data-test="input-container"]').trigger('submit.prevent')
    expect(wrapper.emitted()).toHaveProperty('updateNote')
  })
})
