<template>
  <div class="layout">
    <header class="header">
      <div class="header__container">
        <nav>
          <main-route :is-auth="isAuthenticated" />
        </nav>
      </div>
    </header>
    <main>
      <div class="loading" v-if="isLoading">Loading...</div>
      <slot />
    </main>
    <footer class="footer">Vue Test app</footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MainRoute from '@/components/Routes/MainRoute.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { MainRoute },
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .header {
    width: 100%;
    position: fixed;
    top: 0;
    &__container {
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
}
</style>
