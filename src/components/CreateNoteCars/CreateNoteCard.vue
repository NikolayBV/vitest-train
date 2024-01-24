<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import { useForm } from 'vue-hooks-form'
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
    const { useField, handleSubmit } = useForm({
      defaultValues: {
        title: props.note?.title,
        body: props.note?.body
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
      noteTitle.value = ''
      noteBody.value = ''
    }
    return { noteTitle, noteBody, onSubmit: handleSubmit(onNoteCreate) }
  }
})
</script>

<template>
  <div class="card-wrapper" data-test="card">
    <p>Create Note</p>
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
