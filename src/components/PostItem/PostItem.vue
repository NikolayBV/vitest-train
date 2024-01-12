<script lang='ts'>
import { defineComponent, type PropType } from 'vue'
import type { Post } from '@/utils/interfaces'

export default defineComponent({
  name: 'PostItem',
  props: {
    post: {
      type: Object as PropType<Post>,
      required: true,
    }
  },
  setup() {
  }
})
</script>

<template>
  <div class="post-wrapper">
    <h3>{{post.title}}</h3>
    <p>{{post.body}}</p>
  </div>
</template>

<style scoped lang='scss'>
.post-wrapper {
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: bisque;
  padding: 10px;
  border: 1px solid;
  border-radius: 5px;
}
</style>
