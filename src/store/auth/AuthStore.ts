import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('')
  const getTokenState = computed(() => token.value)
  function setToken(tokenAuth: string) {
    token.value = tokenAuth
  }
  function clearToken() {
    token.value = ''
  }
  return { token, getTokenState, setToken, clearToken }
})
