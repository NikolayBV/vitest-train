<script lang="ts">
import Router from '@/router'
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent, ref, watchEffect } from 'vue'
import { useAuthStore } from '@/store/auth/AuthStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'App',
  props: {},
  setup() {
    const router = Router
    const store = useAuthStore()
    const { getTokenState } = storeToRefs(store)
    watchEffect(() => {
      if (!getTokenState.value) {
        router.push('/login')
      }
    })
    return { router, getTokenState, RouterLink, RouterView }
  }
})
</script>

<template>
  <div class="app-wrapper">
    <header>
      <div class="header-wrapper">
        <nav v-if="getTokenState" class="nav-wrapper">
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/posts">Posts</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
        <nav v-else class="nav-wrapper">Login</nav>
      </div>
    </header>
    <RouterView />
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
