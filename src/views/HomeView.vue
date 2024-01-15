<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useAuthStore } from '@/store/auth/AuthStore'

export default defineComponent({
  name: 'HomeView',
  props: {},
  setup() {
    const store = useAuthStore()
    const { logout } = useAuth0()
    const setLogout = () => {
      logout()
      localStorage.clear()
      store.setNonAuth()
    }
    return {
      setLogout
    }
  }
})
</script>

<template>
  <div>
    <div class="">
      <button @click="setLogout">Logout</button>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
