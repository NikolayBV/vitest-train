<template>
  <div class="login">
    <button data-test="login-button" @click="login">Login</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useAuthStore } from '@/store/auth/AuthStore'
import Router from '@/router'

export default defineComponent({
  name: 'LoginView',
  setup() {
    const { loginWithRedirect, getAccessTokenSilently } = useAuth0()
    const store = useAuthStore()
    const router = Router
    watchEffect(async () => {
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

<style scoped lang="scss">
.login {
  display: flex;
  align-items: center;
  padding: 100px 0;
}
</style>
