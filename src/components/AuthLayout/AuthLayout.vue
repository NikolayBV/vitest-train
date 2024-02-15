<template>
  <div class="app-wrapper">
    <header class="header-container">
      <div class="header-wrapper">
        <nav class="nav-wrapper">
          <public-route />
        </nav>
      </div>
    </header>
    <div>
      <div style="display: flex; justify-content: center" v-if="isLoading">Loading...</div>
      <router-view v-else />
    </div>
    <footer class="footer">Vue Test app</footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PublicRoute from '@/components/Routes/PublicRoute.vue'

export default defineComponent({
  name: 'AuthLayout',
  components: { PublicRoute },
  props: {
    isLoading: {
      types: Boolean,
      required: true
    }
  }
})
</script>

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
