<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useAuthStore } from '@/store/auth/AuthStore'
import Router from '@/router'

export default defineComponent({
  name: 'LoginView',
  props: {},
  setup() {
    const { loginWithRedirect, user, getAccessTokenSilently } = useAuth0()
    const store = useAuthStore()
    const router = Router
    watch(user, async () => {
      const token = await getAccessTokenSilently()
      if (token) {
        store.setToken(token)
        await router.push('/')
      }
    })
    return {
      login: () => {
        loginWithRedirect()
      }
    }
  }
})
</script>

<template>
  <button @click="login">Login</button>
</template>

<style scoped lang="scss"></style>
