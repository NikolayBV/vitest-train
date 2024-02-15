<template>
  <ul class="routes-links">
    <RouterLink class="routes-links__item routes-links__item_active" to="/">Home</RouterLink>
    <RouterLink class="routes-links__item routes-links__item_active" to="/notes">Notes</RouterLink>
    <RouterLink class="routes-links__item routes-links__item_active" to="/about">About</RouterLink>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PrivateRoute'
})
</script>

<style scoped lang="scss">
.routes-links {
  display: flex;
  justify-content: center;
  font-weight: bold;
  gap: 20px;
  .routes-links__item {
    font-weight: bold;
    &.routes-links__item_active {
      &:hover {
        border-bottom: 1px solid;
      }
    }
  }
}
</style>
