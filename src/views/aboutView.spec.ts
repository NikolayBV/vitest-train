import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import AboutView from '@/views/AboutView.vue'

describe('notesView', () => {
  const wrapper = mount(AboutView, {
    global: {
      plugins: [createTestingPinia()]
    }
  })
  it('should AboutView be in document', () => {
    expect(wrapper)
  })
})
