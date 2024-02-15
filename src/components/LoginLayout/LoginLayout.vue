<template>
  <div class="app-wrapper">
    <header class="header-container">
      <div class="header-wrapper">
        <nav class="nav-wrapper">
          <PrivateRoute />
        </nav>
      </div>
    </header>
    <div>
      <div v-if="isLoading" style="display: flex; justify-content: center">Loading...</div>
      <RouterView v-else />
    </div>
    <footer class="footer">Vue Test app</footer>
  </div>
  >
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PrivateRoute from '@/components/Routes/PrivateRoute.vue'

export default defineComponent({
  name: 'LoginLayout',
  components: { PrivateRoute },
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
