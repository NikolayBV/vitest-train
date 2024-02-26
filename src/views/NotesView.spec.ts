import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import NotesView from '@/views/NotesView.vue'
import { createTestingPinia } from '@pinia/testing'

describe('notesView', () => {
  const wrapper = mount(NotesView, {
    global: {
      plugins: [createTestingPinia()]
    }
  })
  it('should NotesView be in document', () => {
    expect(wrapper).toBeDefined()
  })
})
