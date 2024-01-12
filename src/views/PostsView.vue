<script lang='ts'>
import { defineComponent, ref, watchEffect } from 'vue'
import { APP_CONSTANTS } from '@/utils/constants'
import type { Post } from '@/utils/interfaces'
import PostItem from '@/components/PostItem/PostItem.vue'

export default defineComponent({
  name: 'PostsView',
  components: { PostItem },
  props: {},
  setup() {
    const posts = ref<Array<Post>>([]);
    const page = ref<number>(1);
    const limit = ref<number>(10);
    const totalPages = ref();
    watchEffect(async () => {
      const responsePosts = await fetch(`${APP_CONSTANTS.BASE_URL}/posts?_page=${page.value}&_limit=${limit.value}`);
      totalPages.value = Number(responsePosts.headers.get('X-Total-Count')) / limit.value;
      posts.value = await responsePosts.json();
    });
    const setNextPage = () => {
      if (page.value < totalPages.value || !totalPages.value) {
        page.value += 1;
      }
    }
    const setPrevPage = () => {
      if (page.value > 1) {
        page.value -= 1;
      }
    }

    return {posts, setNextPage, setPrevPage};
  },
})
</script>

<template>
  <div>
    <div class="posts-wrapper">
      <PostItem :key="post.id" v-for="post in posts" :post="post"/>
    </div>
    <div class="pagination-wrapper">
      <button class="pagination-button" @click="setPrevPage" >Prev</button>
      <button class="pagination-button" @click="setNextPage">Next</button>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.posts-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;
}
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.pagination-button {
  width: 60px;
  height: 30px;
  background-color: bisque;
  border: 1px solid;
  border-radius: 5px;
}
</style>
