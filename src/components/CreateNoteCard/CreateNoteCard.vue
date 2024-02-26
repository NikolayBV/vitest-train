<template>
  <div :class="{ card: true, 'card--isEdit': isEditNote }" data-test="card">
    <p>Create Note</p>
    <form class="card__form" @submit.prevent="onSubmit" data-test="input-container">
      <input v-model="noteTitle.text" placeholder="title" data-test="input-title" />
      <p data-test="error-title" v-if="noteTitle.isError">This field is required</p>
      <input v-model="noteBody.text" placeholder="body" data-test="input-body" />
      <p data-test="error-body" v-if="noteBody.isError">This field is required</p>
      <button
        :disabled="(noteTitle.isError || noteBody.isError) && !isEditNote"
        type="submit"
        data-test="button"
      >
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
import { COMMON_TEXT, EMITS } from '@/utils/constants'

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
  emits: [EMITS.UPDATE_NOTE, EMITS.CREATE_NOTE],
  setup(props, { emit }) {
    const storage = new LocalStorageNotesService(localStorage)
    const userStore = useUserStore()
    const { getUserState } = storeToRefs(userStore)
    const noteTitle = ref({
      text: props.note?.title || '',
      isError: !props.isEditNote
    })
    const noteBody = ref({
      text: props.note?.body || '',
      isError: !props.isEditNote
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
          emit(EMITS.UPDATE_NOTE, updatedNote)
          storage.updateNote(updatedNote)
        } else {
          const note = createNoteEntity({
            title,
            body,
            author: createUserName(getUserState.value) as string,
            authorId: getUserState.value?.sub as string,
            id: new Date().getTime(),
            createdAt: new Date()
          })
          emit(EMITS.CREATE_NOTE, note)
          storage.setNote(note)
        }
      } else {
        alert(COMMON_TEXT.NOTES_HAS_BEEN_CREATED)
      }
      noteTitle.value.text = ''
      noteBody.value.text = ''
    }
    return { noteTitle, noteBody, onSubmit: onNoteCreate }
  }
})
</script>

<style scoped lang="scss">
.card {
  background-color: #c4b988;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border: 1px solid;
  border-radius: 5px;
  margin: 20px 0 40px 0;
  &__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
  }
  &--isEdit {
    width: 30%;
  }
}
</style>
