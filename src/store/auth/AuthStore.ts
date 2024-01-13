import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const isAuth = ref<boolean>(false)
  const getAuthState = computed(() => isAuth.value)
  function setAuth() {
    isAuth.value = true
  }
  function setNonAuth() {
    isAuth.value = false
  }
  return { isAuth, getAuthState, setNonAuth, setAuth }
})
