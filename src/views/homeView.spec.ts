import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import HomeView from '@/views/HomeView.vue'

vi.mock('@auth0/auth0-vue', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@auth0/auth0-vue')>()
  return {
    ...mod,
    useAuth0: () => ({
      logout: vi.fn()
    })
  }
})

describe('notesView', () => {
  const wrapper = mount(HomeView, {
    global: {
      plugins: [createTestingPinia()]
    }
  })
  it('should HomeView be in document', () => {
    expect(wrapper)
  })
})
