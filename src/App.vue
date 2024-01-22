<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import PrivateRoute from '@/components/Routes/PrivateRoute.vue'
import PublicRoute from '@/components/Routes/PublicRoute.vue'
import { formatUser } from '@/utils/functions'
import { useUserStore } from '@/store/user/UserStore'
import { useAuthStore } from '@/store/auth/AuthStore'
import router from '@/router'

export default defineComponent({
  name: 'App',
  components: { PublicRoute, PrivateRoute },
  props: {},
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

<template>
  <div class="app-wrapper">
    <header class="header-container">
      <div class="header-wrapper">
        <nav v-if="isAuthenticated" class="nav-wrapper">
          <PrivateRoute />
        </nav>
        <nav v-else class="nav-wrapper">
          <PublicRoute />
        </nav>
      </div>
    </header>
    <div>
      <RouterView v-if="!isLoading" />
      <div style="display: flex; justify-content: center" v-else>Loading...</div>
    </div>
    <footer class="footer">Vue Test app</footer>
  </div>
</template>

<style scoped lang="scss">
.app-wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.header-container {
  width: 100%;
  position: fixed;
  top: 0;
}
.header-wrapper {
  padding: 20px;
  background-color: bisque;
  border-bottom: 1px solid;
}
.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
.footer {
  padding: 10px;
  background-color: #eee;
  text-align: center;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
