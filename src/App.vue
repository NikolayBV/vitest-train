<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import PrivateRoute from '@/components/Routes/PrivateRoute.vue'
import PublicRoute from '@/components/Routes/PublicRoute.vue'

export default defineComponent({
  name: 'App',
  components: { PublicRoute, PrivateRoute },
  props: {},
  setup() {
    const { isAuthenticated, isLoading, idTokenClaims } = useAuth0()
    console.log(idTokenClaims.value?.role)
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
