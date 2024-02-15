import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NoteItem from '@/components/NoteItem/NoteItem.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/store/user/UserStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

describe('noteItem', () => {
  it('title should be in component', () => {
    const wrapper = mount(NoteItem, {
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
        isAuthorNote: true,
        isAdmin: true
      }
    })
    expect(wrapper.find('[data-test="note-title"]').text()).toBe('newTitle')
  })
  it('body should be in component', () => {
    const wrapper = mount(NoteItem, {
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
        isAuthorNote: true,
        isAdmin: true
      }
    })
    expect(wrapper.find('[data-test="note-body"]').text()).toBe('newBody')
  })
  it('author should be in component', () => {
    const wrapper = mount(NoteItem, {
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
        isAuthorNote: true,
        isAdmin: true
      }
    })
    expect(wrapper.find('[data-test="note-author"]').text()).toBe('Бабкин Николай')
  })
  it('updatedAt should be in component', () => {
    const wrapper = mount(NoteItem, {
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
        isAuthorNote: true,
        isAdmin: true
      }
    })
    expect(wrapper.find('[data-test="note-updatedAt"]').isVisible()).toBe(true)
  })
  it('should handleDeleteNote work on button click', async () => {
    const wrapper = mount(NoteItem, {
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
        isAuthorNote: true,
        isAdmin: true
      }
    })
    await wrapper.find('[data-test="button-delete"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('handleDeleteNote')
  })
  it('should delete button been visible for author and admin', async () => {
    const wrapper = mount(NoteItem, {
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
        isAuthorNote: true,
        isAdmin: true
      }
    })
    expect(wrapper.find('[data-test="button-delete"]').isVisible()).toBe(true)
  })
  it('should delete button been not visible for admin', async () => {
    const wrapper = mount(NoteItem, {
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
        isAuthorNote: false,
        isAdmin: false
      }
    })
    expect(wrapper.find('[data-test="button-delete"]').isVisible()).toBe(false)
  })
  it('should edit button been not visible for admin', async () => {
    const wrapper = mount(NoteItem, {
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
        isAuthorNote: true,
        isAdmin: false
      }
    })
    expect(wrapper.find('[data-test="button-edit"]').isVisible()).toBe(true)
  })
})
