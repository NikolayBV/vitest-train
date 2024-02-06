import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import LoginView from '@/views/LoginView.vue'

vi.mock('@auth0/auth0-vue', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@auth0/auth0-vue')>()
  return {
    ...mod,
    useAuth0: () => ({
      loginWithRedirect: vi.fn(),
      getAccessTokenSilently: vi.fn()
    })
  }
})

describe('notesView', () => {
  const wrapper = mount(LoginView, {
    global: {
      plugins: [createTestingPinia()]
    }
  })
  it('should LoginView be in document', () => {
    expect(wrapper)
  })
})
