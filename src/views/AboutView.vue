<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AboutView',
  props: {},
  setup() {}
})
</script>

<template>
  <div class="about-wrapper">About</div>
</template>

<style scoped lang="scss">
.about-wrapper {
  display: flex;
  justify-content: center;
  margin: 100px 0;
}
</style>
