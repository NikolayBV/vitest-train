<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PrivateRoute',
  props: {},
  setup() {}
})
</script>

<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/posts">Posts</RouterLink>
  <RouterLink to="/about">About</RouterLink>
</template>

<style scoped lang="scss"></style>
