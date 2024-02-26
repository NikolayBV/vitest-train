<script lang="ts">
import { computed, defineComponent } from 'vue'
import { getHeaderLinks } from '@/utils/functions'

export default defineComponent({
  name: 'main-route',
  props: {
    isAuth: {
      type: Boolean,
      required: false
    }
  },
  setup(props) {
    const links = computed(() => getHeaderLinks(props.isAuth))
    return { links }
  }
})
</script>

<template>
  <ul class="route">
    <li class="route__item" :key="link.title" v-for="link in links">
      <RouterLink :to="link.href">{{ link.title }}</RouterLink>
    </li>
  </ul>
</template>

<style scoped lang="scss">
.route {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  &__item {
    list-style-type: none;
  }
}
</style>
