<template>
  <div class="layout">
    <header class="header">
      <div class="header__container">
        <nav>
          <private-route v-if="isAuthenticated" />
          <public-route v-else />
        </nav>
      </div>
    </header>
    <div>
      <div class="loading" v-if="isLoading">Loading...</div>
      <slot />
    </div>
    <footer class="footer">Vue Test app</footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PublicRoute from '@/components/Routes/PublicRoute.vue'
import PrivateRoute from '@/components/Routes/PrivateRoute.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { PrivateRoute, PublicRoute },
  props: {
    isLoading: {
      types: Boolean,
      required: true
    },
    isAuthenticated: {
      types: Boolean,
      required: true
    }
  }
})
</script>

<style scoped lang="scss">
.layout {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.header {
  width: 100%;
  position: fixed;
  top: 0;
  .header__container {
    height: 60px;
    padding: 20px;
    background-color: bisque;
    border-bottom: 1px solid;
  }
}
.loading {
  display: flex;
  justify-content: center;
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
