<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from '@/store/auth/AuthStore'
import { storeToRefs } from 'pinia'

const store = useAuthStore()
const { isAuth, getAuthState } = storeToRefs(store)
console.log(getAuthState.value)
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="nav-wrapper">
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/posts">Posts</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped lang="scss">
.wrapper {
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
</style>
