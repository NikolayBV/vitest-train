<template>
  <main-layout :is-loading="isLoading" :is-authenticated="isAuthenticated">
    <router-view />
  </main-layout>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { formatUser } from '@/utils/functions'
import { useUserStore } from '@/store/user/UserStore'
import { useAuthStore } from '@/store/auth/AuthStore'
import router from '@/router'
import MainLayout from '@/components/MainLayout/MainLayout.vue'

export default defineComponent({
  name: 'App',
  components: { MainLayout },
  setup() {
    const userStore = useUserStore()
    const authStore = useAuthStore()
    const { isAuthenticated, isLoading, idTokenClaims, getAccessTokenSilently } = useAuth0()
    watchEffect(async () => {
      if (!isAuthenticated.value) {
        await router.push('/login')
      } else {
        const newValue = idTokenClaims.value
        const userToken = await getAccessTokenSilently()
        if (newValue && userToken) {
          authStore.setToken(userToken)
          userStore.setUserState(formatUser(newValue))
        }
      }
    })
    return { isLoading, isAuthenticated }
  }
})
</script>

<style scoped lang="scss"></style>
