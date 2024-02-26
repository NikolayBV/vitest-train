import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import HomeView from '@/views/HomeView.vue'

const handleLogout = vi.fn()

vi.mock('@auth0/auth0-vue', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@auth0/auth0-vue')>()
  return {
    ...mod,
    useAuth0: () => ({
      logout: handleLogout
    })
  }
})

describe('notesView', () => {
  const wrapper = mount(HomeView, {
    global: {
      plugins: [createTestingPinia()]
    }
  })
  it('should logout be called', async () => {
    await wrapper.find('[data-test="logout-button"]').trigger('click')
    expect(handleLogout).toHaveBeenCalled()
  })
})
