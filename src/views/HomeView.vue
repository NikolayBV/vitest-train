<script lang="ts">
import { defineComponent } from 'vue'
import { useAuth0 } from '@auth0/auth0-vue'
import { useAuthStore } from '@/store/auth/AuthStore'
import CreatePostCard from '@/components/CreatePostCars/CreatePostCard.vue'

export default defineComponent({
  name: 'HomeView',
  components: { CreatePostCard },
  props: {},
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

<template>
  <div>
    <div class="home-container">
      <CreatePostCard />
      <button @click="setLogout">Logout</button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.home-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
}
</style>
