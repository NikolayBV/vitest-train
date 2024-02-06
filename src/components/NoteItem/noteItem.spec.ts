import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NoteItem from '@/components/NoteItem/NoteItem.vue'
import { createTestingPinia } from '@pinia/testing'
import { useUserStore } from '@/store/user/UserStore'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

describe('noteItem', () => {
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
      }
    }
  })
  const userStore = useUserStore()
  const { getUserState, getUserRole } = storeToRefs(userStore)
  const isAuthorNote = wrapper.props().note.authorId === getUserState.value?.sub
  const isAdmin = getUserRole
  it('title should be in component', () => {
    expect(wrapper.find('[data-test="note-title"]').text()).toBe('newTitle')
  })
  it('body should be in component', () => {
    expect(wrapper.find('[data-test="note-body"]').text()).toBe('newBody')
  })
  it('author should be in component', () => {
    expect(wrapper.find('[data-test="note-author"]').text()).toBe('Бабкин Николай')
  })
  it('updatedAt should be in component', () => {
    expect(wrapper.find('[data-test="note-updatedAt"]').isVisible()).toBe(true)
  })
  it('should handleDeleteNote work on button click', async () => {
    await wrapper.find('[data-test="button-delete"]').trigger('click')
    expect(wrapper.emitted()).toHaveProperty('handleDeleteNote')
  })
})
