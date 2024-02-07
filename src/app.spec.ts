import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '@/App.vue'
import { createTestingPinia } from '@pinia/testing'

vi.mock('@auth0/auth0-vue', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@auth0/auth0-vue')>()
  return {
    ...mod,
    useAuth0: () => ({
      isAuthenticated: true
    })
  }
})

describe('App', () => {
  it('App should renders', () => {
    mount(App, {
      global: {
        plugins: [createTestingPinia()]
      }
    })
  })
})
