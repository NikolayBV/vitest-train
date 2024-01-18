<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import type { Note } from '@/utils/interfaces'
import PostItem from '@/components/PostItem/PostItem.vue'

export default defineComponent({
  name: 'NotesView',
  components: { PostItem },
  props: {},
  setup() {
    const notes = ref<Array<Note>>([])
    watchEffect(() => {
      const storageNotes = localStorage.getItem('notes')
      notes.value = storageNotes as Array<Note>
    })
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
