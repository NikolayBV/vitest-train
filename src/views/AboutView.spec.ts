import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import AboutView from '@/views/AboutView.vue'

describe('notesView', () => {
  it('should be text in component', () => {
    const wrapper = mount(AboutView, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
    expect(wrapper.text()).toBe('About')
  })
})
