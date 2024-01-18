<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CreateNoteCard',
  props: {},
  setup() {}
})
</script>

<template>
  <div class="card-wrapper">
    <p>Create Post</p>
    <div class="input-container">
      <input placeholder="title" />
      <input placeholder="body" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.card-wrapper {
  width: 25%;
  background-color: #c4b988;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border: 1px solid;
  border-radius: 5px;
}
.input-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
}
</style>
