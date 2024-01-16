import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Post } from '@/utils/interfaces'

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<Array<Post>>([])
  const getPostsState = computed(() => posts.value)
  function setPostsState(postsList: Array<Post>) {
    posts.value = postsList
  }

  function clearPostsState() {
    posts.value = []
  }
  return { posts, getPostsState, setPostsState, clearPostsState }
})
