<template>
  <div>
    <div class="home">
      <button data-test="logout-button" @click="setLogout">Logout</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useAuthStore } from '@/store/auth/AuthStore'

export default defineComponent({
  name: 'HomeView',
  setup() {
    const store = useAuthStore()
    const { logout } = useAuth0()
    const setLogout = () => {
      logout()
      store.clearToken()
    }
    return {
      setLogout
    }
  }
})
</script>

<style scoped lang="scss">
.home {
  display: flex;
  align-items: center;
  padding: 100px 0;
}
</style>
