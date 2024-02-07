import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAuthStore } from '@/store/auth/AuthStore'

describe('AuthStore', () => {
  setActivePinia(createPinia())
  it('should set token', () => {
    const store = useAuthStore()
    store.setToken('testToken')
    expect(store.token).toBe('testToken')
  })
  it('should clear token', () => {
    const store = useAuthStore()
    store.clearToken()
    expect(store.token).toBe('')
  })
})
