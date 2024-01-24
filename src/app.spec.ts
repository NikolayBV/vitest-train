import { beforeEach, describe, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { createTestingPinia } from '@pinia/testing'

describe('App', () => {
  beforeEach(() => {
    vi.mock('@auth0/auth0-vue', async (importOriginal) => {
      const mod = await importOriginal<typeof import('@auth0/auth0-vue')>()
      return {
        ...mod,
        useAuth0: () => ({
          isAuthenticated: true
        })
      }
    })
  })
  it('App should renders', () => {
    mount(App, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })
})
