<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { APP_CONSTANTS } from '@/utils/constants'
import type { Post } from '@/utils/interfaces'
import PostItem from '@/components/PostItem/PostItem.vue'
import { usePostsStore } from '@/store/posts/PostsStore'
import { storeToRefs } from 'pinia'

export default defineComponent({
  name: 'PostsView',
  components: { PostItem },
  props: {},
  setup() {
    const postsStore = usePostsStore()
    const { getPostsState } = storeToRefs(postsStore)
    const page = ref<number>(1)
    const limit = ref<number>(10)
    const totalPages = ref()
    watchEffect(async () => {
      const responsePosts = await fetch(
        `${APP_CONSTANTS.BASE_URL}/posts?_page=${page.value}&_limit=${limit.value}`
      )
      totalPages.value = Number(responsePosts.headers.get('X-Total-Count')) / limit.value
      postsStore.setPostsState(await responsePosts.json())
    })
    const setNextPage = () => {
      if (page.value < totalPages.value || !totalPages.value) {
        page.value += 1
      }
    }
    const setPrevPage = () => {
      if (page.value > 1) {
        page.value -= 1
      }
    }

    return { getPostsState, setNextPage, setPrevPage }
  }
})
</script>

<template>
  <div v-if="getPostsState.length">
    <div class="posts-wrapper">
      <PostItem :key="post.id" v-for="post in getPostsState" :post="post" />
    </div>
    <div class="pagination-wrapper">
      <button class="pagination-button" @click="setPrevPage">Prev</button>
      <button class="pagination-button" @click="setNextPage">Next</button>
    </div>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped lang="scss">
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
