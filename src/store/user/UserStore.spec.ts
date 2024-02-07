import { describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useUserStore } from '@/store/user/UserStore'

describe('UserStore', () => {
  setActivePinia(createPinia())
  const mockUser = {
    email: 'babkinnick95@gmail.com',
    family_name: 'Бабкин',
    given_name: 'Николай',
    picture:
      'https://lh3.googleusercontent.com/a/ACg8ocKmEZ93aacvBRmMqs5ZFzukLzzHydy-WvTXxMuZiztLSqw=s96-c',
    role: 'admin',
    sub: 'google-oauth2|102483884126576221391'
  }
  it('should set user', () => {
    const store = useUserStore()
    store.setUserState(mockUser)
    expect(store.user).toStrictEqual(mockUser)
  })
  it('should clear user', () => {
    const store = useUserStore()
    store.clearUserState()
    expect(store.user).toBeNull()
  })
})
