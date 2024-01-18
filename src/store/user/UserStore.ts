import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Post, User } from '@/utils/interfaces'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>()
  const getUserState = computed(() => user.value)
  function setUserState(currentUser: User) {
    console.log(currentUser)
    user.value = currentUser
  }

  function clearUserState() {
    user.value = null
  }
  return { user, getUserState, setUserState, clearUserState }
})
