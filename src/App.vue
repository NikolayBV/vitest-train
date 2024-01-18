<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import PrivateRoute from '@/components/Routes/PrivateRoute.vue'
import PublicRoute from '@/components/Routes/PublicRoute.vue'
import { formatUser } from '@/utils/functions'
import { useUserStore } from '@/store/user/UserStore'
import { useAuthStore } from '@/store/auth/AuthStore'

export default defineComponent({
  name: 'App',
  components: { PublicRoute, PrivateRoute },
  props: {},
  setup() {
    const userStore = useUserStore()
    const authStore = useAuthStore()
    const { isAuthenticated, isLoading, idTokenClaims, getAccessTokenSilently } = useAuth0()
    watchEffect(async () => {
      const newValue = idTokenClaims.value
      const userToken = await getAccessTokenSilently()
      if (newValue && userToken) {
        authStore.setToken(userToken)
        userStore.setUserState(formatUser(newValue))
      }
    })
    return { isLoading, isAuthenticated }
  }
})
</script>

<template>
  <div class="app-wrapper">
    <header>
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
      <div v-else>Loading</div>
    </div>
    <footer>Vue Test app</footer>
  </div>
</template>

<style scoped lang="scss">
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  align-self: end;
}
</style>
