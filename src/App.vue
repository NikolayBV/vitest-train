<script lang="ts">
import Router from '@/router'
import { RouterLink, RouterView } from 'vue-router'
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  name: 'App',
  props: {},
  setup() {
    const router = Router
    const token = ref()
    watchEffect(() => {
      token.value = localStorage.getItem('token')
      if (!token.value) {
        router.push('/login')
      }
    })
    return { router, token, RouterLink, RouterView }
  }
})
</script>

<template>
  <div class="app-wrapper">
    <header>
      <div class="header-wrapper">
        <nav v-if="token" class="nav-wrapper">
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
