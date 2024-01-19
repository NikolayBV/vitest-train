<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useForm } from 'vue-hooks-form'
import { useUserStore } from '@/store/user/UserStore'
import { storeToRefs } from 'pinia'
import LocalStorageNotesService from '@/services/LocalStorageNotes.service'
import { createNoteEntity, createUserName, updateNoteEntity } from '@/utils/functions'
import type { Note } from '@/utils/interfaces'

export default defineComponent({
  name: 'CreateNoteCard',
  props: {
    note: {
      type: Object as PropType<Note>,
      required: false
    },
    isEditNote: {
      type: Boolean,
      required: false
    }
  },
  setup({ note, isEditNote }, { emit }) {
    const storage = new LocalStorageNotesService()
    const userStore = useUserStore()
    const { getUserState } = storeToRefs(userStore)
    const { useField, handleSubmit } = useForm({
      defaultValues: {
        title: note?.title || '',
        body: note?.body || ''
      }
    })
    const noteTitle = useField('title', {
      rule: { required: true }
    })
    const noteBody = useField('body', {
      rule: {
        required: true,
        min: 1,
        max: 100
      }
    })

    function onNoteCreate(data: Record<string, any>) {
      const { title, body } = data
      if (isEditNote && note) {
        const updatedNote = updateNoteEntity(title, body, note)
        emit('updatedNote', updatedNote)
        storage.changeNote(updatedNote)
      } else {
        const note = createNoteEntity({
          title,
          body,
          author: createUserName(getUserState.value)
        })
        storage.setNote(note)
      }
      noteTitle.value = ''
      noteBody.value = ''
    }
    return { noteTitle, noteBody, onSubmit: handleSubmit(onNoteCreate) }
  }
})
</script>

<template>
  <div class="card-wrapper">
    <p>Create Post</p>
    <form @submit="onSubmit" class="input-container">
      <input v-model="noteTitle.value" placeholder="title" :ref="noteTitle.ref" />
      <p v-if="noteTitle.error">This field is required</p>
      <input v-model="noteBody.value" placeholder="body" :ref="noteBody.ref" />
      <p v-if="noteBody.error">This field is required</p>
      <button type="submit">Create Note</button>
    </form>
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
