<template>
  <div class="card-wrapper" data-test="card">
    <p>Create Note</p>
    <form @submit.prevent="onSubmit" class="input-container" data-test="input-container">
      <input v-model="noteTitle.text" placeholder="title" data-test="input-title" />
      <p data-test="error-title" v-if="noteTitle.isError">This field is required</p>
      <input v-model="noteBody.text" placeholder="body" data-test="input-body" />
      <p data-test="error-body" v-if="noteBody.isError">This field is required</p>
      <button :disabled="noteTitle.isError || noteBody.isError" type="submit" data-test="button">
        Create Note
      </button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType, ref, watch } from 'vue'
import { useUserStore } from '@/store/user/UserStore'
import { storeToRefs } from 'pinia'
import LocalStorageNotesService from '@/services/LocalStorageNotes.service'
import {
  createNoteEntity,
  createUserName,
  isPossibleNoteBody,
  updateNoteEntity
} from '@/utils/functions'
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
  setup(props, { emit }) {
    const storage = new LocalStorageNotesService()
    const userStore = useUserStore()
    const { getUserState } = storeToRefs(userStore)
    const noteTitle = ref({
      text: props.note?.title || '',
      isError: true
    })
    const noteBody = ref({
      text: props.note?.body || '',
      isError: true
    })

    watch(noteBody.value, () => {
      noteBody.value.isError = !noteBody.value.text.length
    })
    watch(noteTitle.value, () => {
      noteTitle.value.isError = !noteTitle.value.text.length
    })

    function onNoteCreate() {
      const title = noteTitle.value.text
      const body = noteBody.value.text
      const isPossibleUpdateNote = isPossibleNoteBody(
        body,
        storage.getNotes(getUserState.value?.sub)
      )
      if (isPossibleUpdateNote) {
        if (props.isEditNote && props.note) {
          const updatedNote = updateNoteEntity(title, body, props.note)
          emit('updatedNote', updatedNote)
          storage.updateNote(updatedNote)
        } else {
          const note = createNoteEntity({
            title,
            body,
            author: createUserName(getUserState.value),
            authorId: getUserState.value?.sub
          })
          emit('createNote', note)
          storage.setNote(note)
        }
      } else {
        alert('Заметка с таким текстом уже создана')
      }
      noteTitle.value.text = ''
      noteBody.value.text = ''
    }
    return { noteTitle, noteBody, onSubmit: onNoteCreate }
  }
})
</script>

<style scoped lang="scss">
.card-wrapper {
  width: 40%;
  background-color: #c4b988;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px 0;
  border: 1px solid;
  border-radius: 5px;
  margin: 20px 0 40px 0;
}
.input-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
}
</style>
