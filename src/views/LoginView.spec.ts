import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import LoginView from '@/views/LoginView.vue'

const handleRedirect = vi.fn()

vi.mock('@auth0/auth0-vue', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@auth0/auth0-vue')>()
  return {
    ...mod,
    useAuth0: () => ({
      loginWithRedirect: handleRedirect,
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
  it('should loginWithRedirect be called', async () => {
    await wrapper.find('[data-test="login-button"]').trigger('click')
    expect(handleRedirect).toHaveBeenCalled()
  })
})
